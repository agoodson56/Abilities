
import React, { useState } from 'react';
import { Technician } from '../types';
import { createTechnician as createTechAPI, deleteTechnician as deleteTechAPI, updateTechnician as updateTechAPI } from '../services/dataService';

interface ProfileManagerProps {
  technicians: Technician[];
  activeTechId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (techs: Technician[]) => void;
  onRefresh: () => void;
  onClearLibrary: () => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({
  technicians,
  activeTechId,
  onSelect,
  onUpdate,
  onRefresh,
  onClearLibrary
}) => {
  const [newTechName, setNewTechName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewingTechId, setViewingTechId] = useState<string | null>(null);

  const addTechnician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechName.trim()) return;

    try {
      await createTechAPI(newTechName.trim());
      onRefresh(); // Reload from cloud
      setNewTechName('');
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to create technician:', err);
      alert('Failed to create technician. Please try again.');
    }
  };

  const handleDeleteTechnician = async (id: string) => {
    const password = prompt("Enter admin password to delete this technician record:");
    if (!password) return;

    if (password !== 'G00ds0n') {
      alert("Incorrect password. Deletion denied.");
      return;
    }

    if (confirm("Password verified. Permanently delete this technician profile and all history?")) {
      try {
        await deleteTechAPI(id);
        onRefresh(); // Reload from cloud
        if (activeTechId === id) onSelect(null);
        if (viewingTechId === id) setViewingTechId(null);
      } catch (err) {
        console.error('Failed to delete technician:', err);
        alert('Failed to delete technician. Please try again.');
      }
    }
  };

  const addCertification = async (techId: string) => {
    const cert = prompt("Enter Certification Name (e.g., Genetec Certified, NFPA 72 Trained):");
    if (cert) {
      try {
        const tech = technicians.find(t => t.id === techId);
        if (tech) {
          await updateTechAPI(techId, { certifications: [...tech.certifications, cert] });
          onRefresh(); // Reload from cloud
        }
      } catch (err) {
        console.error('Failed to add certification:', err);
        alert('Failed to add certification. Please try again.');
      }
    }
  };

  const viewingTech = technicians.find(t => t.id === viewingTechId);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Personnel Management</h2>
          <p className="text-slate-500">Manage 3DTS staff profiles, certifications, and evaluation history.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Technician
          </button>
          <button
            onClick={onClearLibrary}
            className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200 transition-all text-sm flex items-center gap-2"
          >
            Purge Lib
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={addTechnician} className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-black uppercase text-slate-400 mb-1">Technician Full Name</label>
              <input
                autoFocus
                type="text"
                value={newTechName}
                onChange={(e) => setNewTechName(e.target.value)}
                placeholder="e.g., Robert Harrison"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-bold text-slate-800"
              />
            </div>
            <div className="flex items-end gap-2">
              <button type="submit" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-md">Create Profile</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 bg-slate-100 text-slate-500 font-bold rounded-xl">Cancel</button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {technicians.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium italic">No technician profiles found in local database.</p>
          </div>
        ) : (
          technicians.map(tech => (
            <div
              key={tech.id}
              className={`p-6 rounded-2xl bg-white border-2 transition-all group ${activeTechId === tech.id ? 'border-blue-600 shadow-lg' : 'border-slate-100 hover:border-slate-200 shadow-sm'
                }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white ${activeTechId === tech.id ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    {tech.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{tech.name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                      Joined {new Date(tech.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewingTechId(tech.id)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View History"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteTechnician(tech.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Profile"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Last Evaluated:</span>
                  <span className="font-bold text-slate-700">{tech.lastEvaluated ? new Date(tech.lastEvaluated).toLocaleDateString() : 'Never'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Evaluations Run:</span>
                  <span className="font-bold text-slate-700">{tech.results.length}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tech.certifications.slice(0, 3).map((cert, i) => (
                    <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded uppercase">
                      {cert}
                    </span>
                  ))}
                  {tech.certifications.length > 3 && (
                    <span className="text-[10px] font-black text-slate-400">+{tech.certifications.length - 3} more</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onSelect(activeTechId === tech.id ? null : tech.id)}
                className={`w-full py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${activeTechId === tech.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {activeTechId === tech.id ? 'Active for Testing' : 'Select for Testing'}
              </button>
            </div>
          ))
        )}
      </div>

      {viewingTechId && viewingTech && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-black">{viewingTech.name}</h3>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mt-1">Master Competency Record</p>
              </div>
              <button
                onClick={() => setViewingTechId(null)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <section className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">Valid Certifications</h4>
                  <button
                    onClick={() => addCertification(viewingTech.id)}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    + Add New
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {viewingTech.certifications.length === 0 ? (
                    <p className="text-slate-400 italic text-sm">No documented certifications.</p>
                  ) : (
                    viewingTech.certifications.map((c, i) => (
                      <span key={i} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-black rounded-lg border border-emerald-100 uppercase">
                        {c}
                      </span>
                    ))
                  )}
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="font-black text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-widest text-sm">Evaluation History</h4>
                <div className="space-y-3">
                  {viewingTech.results.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                      <p className="text-slate-400 italic">No evaluation records found for this technician.</p>
                    </div>
                  ) : (
                    viewingTech.results.map((res, i) => (
                      <div key={res.id || i} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:border-blue-200 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white ${res.percentage >= 90 ? 'bg-indigo-600' :
                            res.percentage >= 75 ? 'bg-emerald-600' :
                              res.percentage >= 50 ? 'bg-sky-600' : 'bg-orange-500'
                            }`}>
                            {res.percentage}%
                          </div>
                          <div>
                            <h5 className="font-black text-slate-900">{res.category}</h5>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{new Date(res.date).toLocaleDateString()} &bull; {res.level}</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-center">
                          <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Score</p>
                            <p className="text-lg font-black text-slate-900">{res.score} / {res.totalQuestions}</p>
                          </div>
                          <div className="h-8 w-px bg-slate-100" />
                          <button className="text-blue-600 font-black uppercase text-[10px] tracking-widest hover:underline">
                            Audit Log
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">3D Technology Services Internal Competency Record</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManager;
