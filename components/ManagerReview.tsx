
import React, { useState } from 'react';
import { Technician, EvaluationResult, Difficulty } from '../types';
import { DIFFICULTY_ORDER, DIFFICULTY_COLORS } from '../constants';

interface ManagerReviewProps {
    technicians: Technician[];
}

const MANAGER_PASSWORD = 'pedersen';

const ManagerReview: React.FC<ManagerReviewProps> = ({ technicians }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
    const [selectedResult, setSelectedResult] = useState<EvaluationResult | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === MANAGER_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password. Access denied.');
        }
    };

    const generateReport = () => {
        const sortedTechs = [...technicians]
            .filter(t => t.results.length > 0)
            .sort((a, b) => a.name.localeCompare(b.name));

        const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const techRows = sortedTechs.map(tech => {
            const avgScore = Math.round(tech.results.reduce((sum, r) => sum + r.percentage, 0) / tech.results.length);
            const categories = [...new Set(tech.results.map(r => r.category))];

            const evalRows = tech.results
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map(r => {
                    const breakdownCells = ['Beginner', 'Intermediate', 'Advanced', 'Expert Journeyman'].map(diff => {
                        const d = r.breakdown?.[diff as Difficulty];
                        if (!d) return '<td style="padding:6px 10px;border:1px solid #e2e8f0;text-align:center;color:#94a3b8;">—</td>';
                        const pct = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
                        return `<td style="padding:6px 10px;border:1px solid #e2e8f0;text-align:center;">${d.correct}/${d.total} (${pct}%)</td>`;
                    }).join('');

                    return `<tr>
                        <td style="padding:6px 10px;border:1px solid #e2e8f0;">${new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td style="padding:6px 10px;border:1px solid #e2e8f0;font-weight:600;">${r.category}</td>
                        <td style="padding:6px 10px;border:1px solid #e2e8f0;text-align:center;font-weight:700;color:${r.percentage >= 75 ? '#059669' : r.percentage >= 50 ? '#d97706' : '#dc2626'};">${r.percentage}%</td>
                        <td style="padding:6px 10px;border:1px solid #e2e8f0;text-align:center;">${r.score}/${r.totalQuestions}</td>
                        <td style="padding:6px 10px;border:1px solid #e2e8f0;">${r.level || 'N/A'}</td>
                        ${breakdownCells}
                    </tr>`;
                }).join('');

            const dispatchStatus = avgScore >= 90 ? '✅ Elite — Lead Tech Ready'
                : avgScore >= 75 ? '✅ Advanced — Standard Dispatch'
                    : avgScore >= 50 ? '⚠️ Qualified — Supervised Only'
                        : '❌ Developing — Not Dispatch Ready';

            return `
                <div style="page-break-inside:avoid;margin-bottom:32px;">
                    <div style="background:#1e293b;color:white;padding:14px 20px;border-radius:8px 8px 0 0;display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <h2 style="margin:0;font-size:18px;font-weight:800;">${tech.name}</h2>
                            <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Joined ${new Date(tech.joinedDate).toLocaleDateString()} • ${tech.results.length} evaluation${tech.results.length !== 1 ? 's' : ''} • Categories: ${categories.join(', ')}</p>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:28px;font-weight:900;color:${avgScore >= 75 ? '#34d399' : avgScore >= 50 ? '#fbbf24' : '#f87171'};">${avgScore}%</div>
                            <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Avg Score</div>
                        </div>
                    </div>
                    <div style="padding:4px 20px 8px;background:#f8fafc;border:1px solid #e2e8f0;font-size:12px;font-weight:700;color:${avgScore >= 75 ? '#059669' : avgScore >= 50 ? '#d97706' : '#dc2626'};">
                        Dispatch Status: ${dispatchStatus}
                    </div>
                    <table style="width:100%;border-collapse:collapse;font-size:12px;">
                        <thead>
                            <tr style="background:#f1f5f9;">
                                <th style="padding:8px 10px;border:1px solid #e2e8f0;text-align:left;font-weight:700;font-size:10px;text-transform:uppercase;color:#64748b;">Date</th>
                                <th style="padding:8px 10px;border:1px solid #e2e8f0;text-align:left;font-weight:700;font-size:10px;text-transform:uppercase;color:#64748b;">Category</th>
                                <th style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;font-weight:700;font-size:10px;text-transform:uppercase;color:#64748b;">Score</th>
                                <th style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;font-weight:700;font-size:10px;text-transform:uppercase;color:#64748b;">Correct</th>
                                <th style="padding:8px 10px;border:1px solid #e2e8f0;text-align:left;font-weight:700;font-size:10px;text-transform:uppercase;color:#64748b;">Level</th>
                                <th style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;font-weight:700;font-size:10px;text-transform:uppercase;color:#64748b;">Beginner</th>
                                <th style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;font-weight:700;font-size:10px;text-transform:uppercase;color:#64748b;">Intermediate</th>
                                <th style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;font-weight:700;font-size:10px;text-transform:uppercase;color:#64748b;">Advanced</th>
                                <th style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;font-weight:700;font-size:10px;text-transform:uppercase;color:#64748b;">Expert</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${evalRows}
                        </tbody>
                    </table>
                </div>`;
        }).join('');

        const reportHtml = `<!DOCTYPE html>
<html><head><title>Technician Competency Report — ${today}</title>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; font-size: 13px; }
    @media print {
        body { padding: 20px; }
        .no-print { display: none !important; }
        @page { margin: 0.5in; }
    }
</style></head><body>
    <div style="text-align:center;margin-bottom:32px;border-bottom:3px solid #1e293b;padding-bottom:20px;">
        <h1 style="font-size:24px;font-weight:900;letter-spacing:-0.5px;">3D Technology Services</h1>
        <p style="font-size:12px;color:#3b82f6;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-top:4px;">Technician Competency Report</p>
        <p style="font-size:11px;color:#94a3b8;margin-top:8px;">Generated: ${today} • ${sortedTechs.length} technician${sortedTechs.length !== 1 ? 's' : ''} with evaluations on record</p>
    </div>

    <div class="no-print" style="text-align:center;margin-bottom:24px;">
        <button onclick="window.print()" style="background:#1e293b;color:white;border:none;padding:12px 32px;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;font-family:Inter,sans-serif;">🖨️ Print / Save as PDF</button>
    </div>

    ${sortedTechs.length === 0 ? '<p style="text-align:center;color:#94a3b8;padding:40px;">No technicians have completed evaluations yet.</p>' : techRows}

    <div style="text-align:center;margin-top:40px;padding-top:20px;border-top:2px solid #e2e8f0;font-size:10px;color:#94a3b8;">
        <p>3D Technology Services — Confidential Personnel Report</p>
        <p>Generated from the Technical Mastery Portal • ${today}</p>
    </div>
</body></html>`;

        const reportWindow = window.open('', '_blank');
        if (reportWindow) {
            reportWindow.document.write(reportHtml);
            reportWindow.document.close();
        }
    };

    // ── Password Gate ──
    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto mt-12">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-slate-900 p-8 text-center">
                        <div className="inline-flex items-center justify-center bg-amber-500 p-3 rounded-xl mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-white">Manager Access</h2>
                        <p className="text-slate-400 text-sm mt-1">Authorized personnel only</p>
                    </div>
                    <form onSubmit={handleLogin} className="p-8 space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter manager password"
                                autoFocus
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-0 outline-none transition-colors text-slate-900 font-medium"
                            />
                        </div>
                        {error && (
                            <div className="bg-rose-50 text-rose-600 text-sm font-medium px-4 py-3 rounded-xl border border-rose-200">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-wider text-sm"
                        >
                            Authenticate
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const selectedTech = technicians.find(t => t.id === selectedTechId);

    // ── Detail view for a specific evaluation ──
    if (selectedResult && selectedTech) {
        return (
            <div className="space-y-6 animate-in fade-in duration-300">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm">
                    <button onClick={() => { setSelectedResult(null); setSelectedTechId(null); }} className="text-blue-600 hover:underline font-bold">All Technicians</button>
                    <span className="text-slate-300">/</span>
                    <button onClick={() => setSelectedResult(null)} className="text-blue-600 hover:underline font-bold">{selectedTech.name}</button>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-500 font-medium">{selectedResult.category}</span>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 text-white p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{selectedTech.name}</p>
                                <h3 className="text-3xl font-black">{selectedResult.category}</h3>
                                <p className="text-blue-400 text-sm font-bold mt-1">
                                    {new Date(selectedResult.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className={`text-5xl font-black ${selectedResult.percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {selectedResult.percentage}%
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                                    {selectedResult.score} / {selectedResult.totalQuestions} Correct
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Level Badge */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Competency Level:</span>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-black uppercase ${selectedResult.percentage >= 90 ? 'bg-indigo-100 text-indigo-700' :
                                selectedResult.percentage >= 75 ? 'bg-emerald-100 text-emerald-700' :
                                    selectedResult.percentage >= 50 ? 'bg-sky-100 text-sky-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                {selectedResult.level}
                            </span>
                        </div>

                        {/* Breakdown */}
                        <div>
                            <h4 className="font-black text-slate-900 text-sm border-b pb-2 uppercase tracking-[0.2em] mb-4">Proficiency Breakdown</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {DIFFICULTY_ORDER.map(diff => {
                                    const data = selectedResult.breakdown[diff];
                                    if (!data) return null;
                                    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                                    return (
                                        <div key={diff} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${DIFFICULTY_COLORS[diff]}`}>{diff}</span>
                                                <span className="text-sm font-black text-slate-700">{data.correct} / {data.total} ({pct}%)</span>
                                            </div>
                                            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${diff === Difficulty.EXPERT_JOURNEYMAN ? 'bg-rose-500' :
                                                        diff === Difficulty.ADVANCED ? 'bg-orange-500' :
                                                            diff === Difficulty.INTERMEDIATE ? 'bg-sky-500' : 'bg-emerald-500'
                                                        }`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Dispatch Recommendation */}
                        <div className={`p-5 rounded-xl border-2 ${selectedResult.percentage >= 75 ? 'bg-emerald-50 border-emerald-200' :
                            selectedResult.percentage >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200'
                            }`}>
                            <h4 className="font-black text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Dispatch Readiness — {selectedResult.category}
                            </h4>
                            <p className="text-sm font-medium leading-relaxed">
                                {selectedResult.percentage >= 90
                                    ? `${selectedTech.name} has demonstrated Elite Master proficiency in ${selectedResult.category}. Fully qualified for lead tech assignments and complex installations.`
                                    : selectedResult.percentage >= 75
                                        ? `${selectedTech.name} shows Advanced Journeyman competency. Ready for standard installations with periodic supervision on complex tasks.`
                                        : selectedResult.percentage >= 50
                                            ? `${selectedTech.name} is at Qualified Technician level. Should be paired with a senior tech on ${selectedResult.category} jobs. Additional training recommended.`
                                            : `${selectedTech.name} is still developing in ${selectedResult.category}. Not recommended for solo dispatch. Assign to apprenticeship roles with direct oversight.`
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setSelectedResult(null)}
                    className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                >
                    ← Back to {selectedTech.name}'s Records
                </button>
            </div>
        );
    }

    // ── Technician folder view (all evaluations for one tech) ──
    if (selectedTech) {
        return (
            <div className="space-y-6 animate-in fade-in duration-300">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm">
                    <button onClick={() => setSelectedTechId(null)} className="text-blue-600 hover:underline font-bold">All Technicians</button>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-500 font-medium">{selectedTech.name}</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedTech.name}</h2>
                        <p className="text-slate-500 text-sm">
                            Joined {new Date(selectedTech.joinedDate).toLocaleDateString()} • {selectedTech.results.length} evaluation{selectedTech.results.length !== 1 ? 's' : ''} on record
                        </p>
                    </div>
                    {selectedTech.certifications.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {selectedTech.certifications.map((cert, i) => (
                                <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-lg border border-emerald-100 uppercase">
                                    {cert}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {selectedTech.results.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                        <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-slate-400 font-medium">No evaluations on file for this technician.</p>
                        <p className="text-slate-300 text-sm mt-1">Results will appear here after they complete an assessment.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {selectedTech.results.map((result, i) => (
                            <div
                                key={result.id || i}
                                onClick={() => setSelectedResult(result)}
                                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-white text-lg ${result.percentage >= 90 ? 'bg-indigo-600' :
                                        result.percentage >= 75 ? 'bg-emerald-600' :
                                            result.percentage >= 50 ? 'bg-sky-600' : 'bg-orange-500'
                                        }`}>
                                        {result.percentage}%
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{result.category}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs text-slate-400 font-bold">
                                                {new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${result.percentage >= 90 ? 'bg-indigo-50 text-indigo-600' :
                                                result.percentage >= 75 ? 'bg-emerald-50 text-emerald-600' :
                                                    result.percentage >= 50 ? 'bg-sky-50 text-sky-600' : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                {result.level}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</p>
                                        <p className="text-lg font-black text-slate-900">{result.score} / {result.totalQuestions}</p>
                                    </div>
                                    <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => setSelectedTechId(null)}
                    className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                >
                    ← Back to All Technicians
                </button>
            </div>
        );
    }

    // ── Main view: All technician "folders" ──
    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-2">
                        Manager Access
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Technician Records</h2>
                    <p className="text-slate-500">Click a technician folder to review their complete evaluation history.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={generateReport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all text-sm font-bold shadow-lg active:scale-[0.98]"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Generate Report
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-700">{technicians.length} Technician{technicians.length !== 1 ? 's' : ''} on File</span>
                    </div>
                </div>
            </div>

            {technicians.length === 0 ? (
                <div className="p-16 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                    <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <p className="text-slate-400 font-bold text-lg">No Technician Records</p>
                    <p className="text-slate-300 text-sm mt-1">Technician folders will appear here after profiles are created and evaluations are completed.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {technicians.map(tech => {
                        const totalEvals = tech.results.length;
                        const latestResult = tech.results[0];
                        const avgScore = totalEvals > 0
                            ? Math.round(tech.results.reduce((sum, r) => sum + r.percentage, 0) / totalEvals)
                            : null;
                        const categoriesTested = [...new Set(tech.results.map(r => r.category))];

                        return (
                            <div
                                key={tech.id}
                                onClick={() => setSelectedTechId(tech.id)}
                                className="bg-white rounded-2xl border-2 border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        {/* Folder icon */}
                                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-black text-slate-900 text-lg truncate group-hover:text-blue-600 transition-colors">{tech.name}</h3>
                                            <p className="text-xs text-slate-400 font-bold">
                                                {totalEvals} evaluation{totalEvals !== 1 ? 's' : ''} on record
                                            </p>
                                        </div>
                                        <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>

                                    {totalEvals > 0 ? (
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-400 font-bold">Average Score</span>
                                                <span className={`font-black ${avgScore! >= 75 ? 'text-emerald-600' : avgScore! >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{avgScore}%</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-400 font-bold">Last Evaluated</span>
                                                <span className="font-bold text-slate-700">{new Date(latestResult.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 pt-1">
                                                {categoriesTested.map((cat, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] font-black rounded uppercase border border-slate-100">
                                                        {String(cat).split(' ')[0]}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-300 italic">No evaluations yet</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ManagerReview;
