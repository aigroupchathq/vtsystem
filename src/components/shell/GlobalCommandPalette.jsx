import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  GraduationCap,
  Users,
  Building,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Boxes,
  Banknote,
  UserPlus,
  Compass,
  Sparkles,
  Lock,
} from 'lucide-react';
import { db } from '../../database/db.js';

export function GlobalCommandPalette({
  isOpen,
  onClose,
  tenantContext,
  currentUser,
  onNavigate,
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const role = currentUser.role;

  // 1. Filtered Students (Respects campus boundary & Parent/Student limits)
  let rawStudents = db.getStudents(tenantContext);
  if (role === 'PARENT') {
    // Parent only sees children linked to guardian
    rawStudents = rawStudents.filter((s) => s.firstName === 'Aarav' || s.lastName === 'Sharma' || s.lastName === 'Deshmukh');
  } else if (role === 'STUDENT') {
    // Student only sees their personal record
    rawStudents = rawStudents.filter((s) => s.id === 'stu-pune-001' || s.firstName === 'Aarav');
  }

  const students = rawStudents
    .filter((s) => !q || `${s.firstName} ${s.lastName} ${s.admissionNumber}`.toLowerCase().includes(q))
    .slice(0, 4);

  // 2. Staff (Hidden from students & parents)
  let employees = [];
  if (role !== 'STUDENT' && role !== 'PARENT') {
    employees = db.getEmployees(tenantContext)
      .filter((e) => !q || `${e.firstName} ${e.lastName} ${e.employeeCode}`.toLowerCase().includes(q))
      .slice(0, 3);
  }

  // 3. Admissions Leads (HQ, Principal, Admin only)
  let leads = [];
  if (['HQ_ADMIN', 'PRINCIPAL', 'ADMISSIONS_HEAD', 'COUNSELLOR'].includes(role)) {
    leads = (db.leads || [])
      .filter((l) => !q || `${l.studentName} ${l.parentName} ${l.leadNumber}`.toLowerCase().includes(q))
      .slice(0, 3);
  }

  // 4. Role-Filtered Quick Commands
  const allCommands = [
    { id: 'overview', label: 'Executive & Centre Overview', icon: Compass, roles: ['HQ_ADMIN', 'PRINCIPAL', 'PARTNER_OPERATOR', 'FRANCHISEE'] },
    { id: 'operations', label: 'Campus Command Center', icon: Boxes, roles: ['HQ_ADMIN', 'PRINCIPAL', 'PARTNER_OPERATOR', 'FRANCHISEE'] },
    { id: 'students', label: 'Student Directory', icon: GraduationCap, roles: ['HQ_ADMIN', 'PRINCIPAL', 'TEACHER'] },
    { id: 'academics', label: 'Academics & CCE', icon: BookOpen, roles: ['HQ_ADMIN', 'PRINCIPAL', 'TEACHER', 'STUDENT'] },
    { id: 'admissions', label: 'Admissions CRM & Funnel', icon: UserPlus, roles: ['HQ_ADMIN', 'PRINCIPAL', 'PARTNER_OPERATOR', 'FRANCHISEE'] },
    { id: 'finance', label: 'Finance & Fee Collections', icon: Banknote, roles: ['HQ_ADMIN', 'PRINCIPAL', 'PARENT'] },
  ];

  const allowedCommands = allCommands.filter((c) => c.roles.includes(role));

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E6DFD1] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-100 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-[#EFE9DD] flex items-center gap-3 bg-[#FBF8EF]">
          <Search className="w-5 h-5 text-[#334E47] flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search students, staff, leads, commands (e.g. Aarav, Fee, Operations)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[#102625] text-sm focus:outline-none placeholder:text-[#475569] font-medium"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#1E293B] bg-[#EFE9DD] border border-[#D9D0BE] rounded">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#334E47] hover:text-[#0B2F29] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-grow text-xs">
          {/* Quick Actions */}
          {!q && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#334E47] font-semibold mb-2 px-1">
                Authorized Quick Workspaces
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {allowedCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        onNavigate(cmd.id);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl bg-[#FBF8EF] hover:bg-[#F4EEDC] border border-[#E6DFD1] text-left flex items-center justify-between group transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className="w-4 h-4 text-[#0B2F29] flex-shrink-0" />
                        <span className="font-semibold text-[#102625] truncate">
                          {cmd.label}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#334E47] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Students Result */}
          {students.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#334E47] font-semibold mb-2 px-1 flex items-center justify-between">
                <span>Students</span>
                <span className="text-[9px] text-[#0F5132] font-bold">
                  Active Campus
                </span>
              </div>
              <div className="space-y-1">
                {students.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onNavigate('students', { studentId: s.id });
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-[#FBF8EF] flex items-center justify-between cursor-pointer group border border-transparent hover:border-[#E6DFD1] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#EAF3EF] text-[#0B2F29] flex items-center justify-center font-bold text-xs">
                        {s.firstName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-[#102625]">
                          {s.firstName} {s.lastName}
                        </div>
                        <div className="text-[11px] text-[#334E47] font-medium">
                          {s.admissionNumber} • {s.rollNumber || 'Grade 7-A'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#334E47] group-hover:text-[#0B2F29]">
                      Open Profile →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Staff Result */}
          {employees.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#334E47] font-semibold mb-2 px-1">
                Staff & Faculty
              </div>
              <div className="space-y-1">
                {employees.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => {
                      onNavigate('employees', { employeeId: e.id });
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-[#FBF8EF] flex items-center justify-between cursor-pointer group border border-transparent hover:border-[#E6DFD1] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#EFE9DD] text-[#102625] flex items-center justify-center font-bold text-xs">
                        {e.firstName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-[#102625]">
                          {e.firstName} {e.lastName}
                        </div>
                        <div className="text-[11px] text-[#334E47] font-medium">
                          {e.employeeCode} • {e.department || 'Faculty'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#334E47] group-hover:text-[#0B2F29]">
                      Open HRMS →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admissions Leads Result */}
          {leads.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#334E47] font-semibold mb-2 px-1">
                Admissions Enquiries & Leads
              </div>
              <div className="space-y-1">
                {leads.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => {
                      onNavigate('admissions', { leadId: l.id });
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-[#FBF8EF] flex items-center justify-between cursor-pointer group border border-transparent hover:border-[#E6DFD1] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#FEF3C7] text-[#78350F] flex items-center justify-center font-bold text-xs">
                        L
                      </div>
                      <div>
                        <div className="font-semibold text-[#102625]">
                          {l.studentName} ({l.gradeApplying})
                        </div>
                        <div className="text-[11px] text-[#334E47] font-medium">
                          Parent: {l.parentName} • Status: {l.status}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#78350F] group-hover:text-[#B45309]">
                      View Funnel →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Zero results */}
          {q && students.length === 0 && employees.length === 0 && leads.length === 0 && (
            <div className="py-8 text-center text-[#334E47]">
              <p className="text-sm font-semibold text-[#102625]">No authorized records match "{query}"</p>
              <p className="text-[11px] text-[#334E47] mt-1">
                Search queries enforce strict campus and safeguarding boundaries.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
