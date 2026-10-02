import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Eye, 
  Briefcase, 
  Fingerprint, 
  Building, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { EmployeesService } from '../../modules/hrms/employees.service.js';
import { RbacService } from '../../modules/platform/rbac.service.js';
import { db } from '../../database/db.js';

export default function EmployeesDirectory({
  tenantContext,
  currentUser,
  onOpenOnboardModal,
  onSelectEmployee
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  const canCreate = RbacService.hasPermission(currentUser.role, 'employees:create');

  const employees = EmployeesService.list(tenantContext, {
    search: searchTerm,
    departmentId: selectedDept || undefined
  });

  const departments = db.getDepartments();

  const totalStaff = employees.length;
  const teachingStaff = employees.filter(e => e.departmentName.includes('Academic') || e.designationTitle.includes('Teacher')).length;
  const nonTeachingStaff = totalStaff - teachingStaff;

  return (
    <div className="space-y-6">
      {/* 5 Orientation Answers Banner */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-0.5">
            WHERE AM I? • HRMS / Staff & Faculty Master
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            Staff & Employee Core (Module 01)
          </h1>
          <p className="text-xs text-slate-400">
            WHAT AM I SEEING? Employee service records, biometric assignments, and department mappings.
          </p>
        </div>

        {canCreate ? (
          <button
            onClick={onOpenOnboardModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-xs shadow-md transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Onboard Employee
          </button>
        ) : (
          <div className="text-[11px] font-mono bg-slate-800 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700">
            Read-Only Staff Directory
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141E33] border border-[#24324D] rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Employees</div>
            <div className="text-xl font-bold text-white font-mono">{totalStaff}</div>
          </div>
        </div>

        <div className="bg-[#141E33] border border-[#24324D] rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Teaching Faculty</div>
            <div className="text-xl font-bold text-white font-mono">{teachingStaff}</div>
          </div>
        </div>

        <div className="bg-[#141E33] border border-[#24324D] rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Admin & Operations</div>
            <div className="text-xl font-bold text-white font-mono">{nonTeachingStaff}</div>
          </div>
        </div>

        <div className="bg-[#141E33] border border-[#24324D] rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Biometric Sync</div>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-1">ALL CONNECTED</div>
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
              placeholder="Search by staff name, employee code, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-3 px-4">Employee Code</th>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Department & Role</th>
                <th className="py-3 px-4">Biometric ID</th>
                <th className="py-3 px-4">Campus</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Service Docs</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-3 text-slate-500">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-semibold text-white">No Employees Found</div>
                    <div className="text-xs text-slate-400 mt-1">
                      No staff records found in this campus or filter.
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-amber-400">
                      {emp.employeeCode}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] font-semibold text-amber-300">
                          {emp.firstName[0]}
                        </div>
                        <div>
                          <div>{emp.firstName} {emp.lastName}</div>
                          <div className="text-[10px] text-slate-400">{emp.email} • {emp.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium">{emp.designationTitle}</div>
                      <div className="text-[10px] text-slate-400">{emp.departmentName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <Fingerprint className="w-3.5 h-3.5" />
                        {emp.biometricId || 'Unlinked'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {emp.campusName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="badge-green px-2 py-0.5 rounded-full text-[10px] font-mono font-medium">
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      <span className="flex items-center gap-1 text-slate-300">
                        <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                        {emp.documents?.length || 0} files
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectEmployee && onSelectEmployee(emp)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5 text-[11px]"
                        title="View Employee Profile"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>View</span>
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
