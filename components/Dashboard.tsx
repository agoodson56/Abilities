
import React from 'react';
import { SystemCategory, Technician } from '../types';
import { SYSTEM_THEMES } from '../constants';

interface DashboardProps {
  onStart: (category: SystemCategory) => void;
  libraryStats: { [key in SystemCategory]?: number };
  activeTech: Technician | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onStart, libraryStats, activeTech }) => {
  const categories = Object.values(SystemCategory);

  const getSubtext = (category: SystemCategory) => {
    switch (category) {
      case SystemCategory.SECURITY: return "Pelco VXS Logic, Genetec Synergis, Milestone Rules, OSHA 1910, Hardware Roles.";
      case SystemCategory.CABLING: return "TIA-568-D, Fluke Versiv Modules, NEC Article 800, Fiber OTDR Logic, OSHA PPE.";
      case SystemCategory.AUDIO_VIDEO: return "Biamp DSP Logic, Q-SYS Designer, Crestron NVX Encoders, ADA, Signal Flow Analysis.";
      case SystemCategory.FIRE_LIFE_SAFETY: return "NFPA 72 (2022), Addressable Loop Programming, SLC Logic, OSHA LOTO, AHJ Liaison.";
      case SystemCategory.NETWORKING: return "L2/L3 Hardware Functions, IGMP Querier, PoE++ Budgeting, NIST 800-53, VLAN Trunking.";
      case SystemCategory.DAS: return "CommScope ION-E, JMA MIMO, Corning ONE, Link Budget, FCC Part 90, Public Safety BDA.";
      case SystemCategory.INTRUSION: return "Bosch B9512G Panels, DS938Z PIR/Microwave, GE Contacts, UL 681, SIA CP-01, Zone Logic.";
      default: return "";
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-3">
        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-2">
          Industrial Competency Matrix
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Technical Mastery Portal</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Comprehensive evaluations for 3D Technology Services.
          Focusing on <span className="text-blue-600 font-bold">Hardware Functionality</span>, <span className="text-blue-600 font-bold">Programming Logic</span>, and <span className="text-blue-600 font-bold">Safety Standards (OSHA/NEC/NFPA)</span>.
        </p>

        {!activeTech && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm font-medium animate-pulse shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            No active profile. Results will not be saved to personnel history.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const inLibrary = libraryStats[category] !== undefined;
          return (
            <div
              key={category}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all border border-slate-200 overflow-hidden cursor-pointer flex flex-col relative"
              onClick={() => onStart(category)}
            >
              <div className={`h-2 ${SYSTEM_THEMES[category]}`} />
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-extrabold text-xl text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {category}
                  </h3>
                  {inLibrary ? (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Matrix Loaded
                    </span>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded">Generate Audit</span>
                  )}
                </div>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Competency: <span className="font-semibold text-slate-700">{getSubtext(category)}</span>
                </p>
                <button className={`mt-auto w-full py-4 px-4 rounded-xl font-black uppercase tracking-widest text-sm text-white transition-all shadow-lg ${SYSTEM_THEMES[category]} hover:brightness-110 active:scale-95 group-hover:-translate-y-1`}>
                  Begin 50-Point Audit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 mt-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="flex-shrink-0 bg-blue-600 p-5 rounded-2xl text-white shadow-xl relative z-10">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        </div>
        <div className="relative z-10 text-center md:text-left">
          <h4 className="font-black text-white text-2xl tracking-tight">System Integrity & Safety Library</h4>
          <p className="text-slate-400 text-lg max-w-xl">
            Audit criteria include deep-dive hardware roles for Pelco, Genetec, and Milestone, alongside mandatory OSHA safety and NEC electrical code compliance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
