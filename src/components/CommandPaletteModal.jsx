import React, { useState, useEffect } from 'react';
import { Search, X, GraduationCap, Users, Building, ShieldCheck, ArrowRight, BookOpen, Boxes } from 'lucide-react';
import { db } from '../database/db.js';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  tenantContext,
  onNavigate
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle palette
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const students = db.getStudents(tenantContext).filter(s => 
    !q || `${s.firstName} ${s.lastName} ${s.admissionNumber}`.toLowerCase().includes(q)
  ).slice(0, 3);

  const employees = db.getEmployees(tenantContext).filter(e => 
    !q || `${e.firstName} ${e.lastName} ${e.employeeCode}`.toLowerCase().includes(q)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type a student name, staff code, or command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-slate-500"
          />
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-1">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => { onNavigate('operations'); onClose(); }}
                className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-white">Operations</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={() => { onNavigate('academics'); onClose(); }}
                className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white">Academics</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={() => { onNavigate('students'); onClose(); }}
                className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-white">Students</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={() => { onNavigate('employees'); onClose(); }}
                className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-white">Staff</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Student Matches */}
          {students.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-1">
                Students
              </div>
              <div className="space-y-1">
                {students.map(s => (
                  <div
                    key={s.id}
                    onClick={() => { onNavigate('students'); onClose(); }}
                    className="p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800 border border-transparent hover:border-slate-700 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-xs font-medium text-white">{s.firstName} {s.lastName}</div>
                      <div className="text-[10px] text-slate-400">Adm: {s.admissionNumber} • {s.gradeName} - {s.divisionName}</div>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Employee Matches */}
          {employees.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-1">
                Employees
              </div>
              <div className="space-y-1">
                {employees.map(e => (
                  <div
                    key={e.id}
                    onClick={() => { onNavigate('employees'); onClose(); }}
                    className="p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800 border border-transparent hover:border-slate-700 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-xs font-medium text-white">{e.firstName} {e.lastName}</div>
                      <div className="text-[10px] text-slate-400">{e.designationTitle} • {e.employeeCode}</div>
                    </div>
                    <span className="text-[10px] font-mono bg-amber-950/80 text-amber-400 border border-amber-800/60 px-1.5 py-0.5 rounded">
                      {e.departmentName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Navigation accelerator</span>
          <span>[Esc] to dismiss</span>
        </div>
      </div>
    </div>
  );
}
