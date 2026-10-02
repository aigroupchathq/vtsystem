import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Users
} from 'lucide-react';
import { StudentsService } from '../../modules/sis/students.service.js';
import { RbacService } from '../../modules/platform/rbac.service.js';
import { db } from '../../database/db.js';

export default function StudentsDirectory({
  tenantContext,
  currentUser,
  onOpenAdmissionModal,
  onSelectStudent
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const canCreate = RbacService.hasPermission(currentUser.role, 'students:create');

  // Query students through service with multi-tenant isolation
  const students = StudentsService.list(tenantContext, {
    search: searchTerm,
    gradeId: selectedGrade || undefined,
    status: selectedStatus || undefined
  });

  const grades = db.getGrades();

  // Metrics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'ACTIVE').length;
  const totalDocuments = students.reduce((acc, s) => acc + (s.documents?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* 5 Orientation Answers Banner */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-0.5">
            WHERE AM I? • SIS / Student Master Directory
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            Student Information System (Module 01)
          </h1>
          <p className="text-xs text-slate-400">
            WHAT AM I SEEING? Enrolled student rosters scoped strictly to your current campus tenant.
          </p>
        </div>

        {canCreate ? (
          <button
            onClick={onOpenAdmissionModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Admit New Student (Wizard)
          </button>
        ) : (
          <div className="text-[11px] font-mono bg-slate-800 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700">
            Read-Only Observer Mode
          </div>
        )}
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141E33] border border-[#24324D] rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Enrolled</div>
            <div className="text-xl font-bold text-white font-mono">{totalStudents}</div>
          </div>
        </div>

        <div className="bg-[#141E33] border border-[#24324D] rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Active Status</div>
            <div className="text-xl font-bold text-white font-mono">{activeStudents}</div>
          </div>
        </div>

        <div className="bg-[#141E33] border border-[#24324D] rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Verified Documents</div>
            <div className="text-xl font-bold text-white font-mono">{totalDocuments}</div>
          </div>
        </div>

        <div className="bg-[#141E33] border border-[#24324D] rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Tenant Guard</div>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-1">RLS ENFORCED</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name, admission number, roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Grade filter */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Grades</option>
            {grades.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PROMOTED">Promoted</option>
            <option value="TRANSFERRED">Transferred</option>
          </select>
        </div>
      </div>

      {/* Main Students Table */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-3 px-4">Admission No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Grade & Section</th>
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Campus</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Documents</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-3 text-slate-500">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-semibold text-white">No Students Found</div>
                    <div className="text-xs text-slate-400 mt-1">
                      No records match the current filter or campus boundary.
                    </div>
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr 
                    key={student.id} 
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectStudent(student.id)}
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400">
                      {student.admissionNumber}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] font-semibold text-slate-300">
                          {student.firstName[0]}
                        </div>
                        <div>
                          <div>{student.firstName} {student.lastName}</div>
                          <div className="text-[10px] text-slate-400">{student.gender} • {student.bloodGroup}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {student.gradeName} - {student.divisionName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      #{student.enrollment?.rollNumber || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {student.campusName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="badge-green px-2 py-0.5 rounded-full text-[10px] font-mono font-medium">
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {student.documents?.length || 0} files
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStudent(student.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>360 Profile</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
