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
      <div className="bg-white border border-[#E6DFD1] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#0B2F29]/70 uppercase tracking-wider mb-0.5">
            WHERE AM I? • HRMS / Staff & Faculty Master
          </div>
          <h1 className="text-xl font-bold text-[#0B2F29] flex items-center gap-2">
            Staff & Employee Core (Module 01)
          </h1>
          <p className="text-xs text-[#4A665F]">
            WHAT AM I SEEING? Employee service records, biometric assignments, and department mappings.
          </p>
        </div>

        {canCreate ? (
          <button
            onClick={onOpenOnboardModal}
            className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Onboard Employee
          </button>
        ) : (
          <div className="text-[11px] font-mono bg-[#F4EFEA] text-[#0B2F29] px-3 py-1.5 rounded-lg border border-[#E6DFD1]">
            Read-Only Staff Directory
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E6DFD1] rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F3] border border-[#E6DFD1] flex items-center justify-center text-[#0B2F29]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#4A665F] font-medium">Total Employees</div>
            <div className="text-xl font-bold text-[#0B2F29] font-mono">{totalStaff}</div>
          </div>
        </div>

        <div className="bg-white border border-[#E6DFD1] rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#4A665F] font-medium">Teaching Faculty</div>
            <div className="text-xl font-bold text-[#0B2F29] font-mono">{teachingStaff}</div>
          </div>
        </div>

        <div className="bg-white border border-[#E6DFD1] rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#4A665F] font-medium">Admin & Operations</div>
            <div className="text-xl font-bold text-[#0B2F29] font-mono">{nonTeachingStaff}</div>
          </div>
        </div>

        <div className="bg-white border border-[#E6DFD1] rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-800">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#4A665F] font-medium">Biometric Sync</div>
            <div className="text-xs font-bold text-emerald-700 font-mono mt-1">ALL CONNECTED</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E6DFD1] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#4A665F] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by staff name, employee code, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full pl-9 pr-3 py-1.5 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="input-field px-3 py-1.5 text-xs"
          >
            <option value="">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white border border-[#E6DFD1] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6DFD1] bg-[#F8F5EE] text-[11px] font-mono text-[#4A665F] uppercase">
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
            <tbody className="divide-y divide-[#EFE9DD] text-xs">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-[#4A665F]">
                    <div className="w-12 h-12 rounded-full bg-[#FAF8F3] border border-[#E6DFD1] flex items-center justify-center mx-auto mb-3 text-[#4A665F]">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-semibold text-[#0B2F29]">No Employees Found</div>
                    <div className="text-xs text-[#4A665F] mt-1">
                      No staff records found in this campus or filter.
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-[#FAF8F3] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#0B2F29]">
                      {emp.employeeCode}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#0B2F29]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#FAF8F3] border border-[#E6DFD1] flex items-center justify-center text-[11px] font-semibold text-[#0B2F29]">
                          {emp.firstName[0]}
                        </div>
                        <div>
                          <div>{emp.firstName} {emp.lastName}</div>
                          <div className="text-[10px] text-[#4A665F]">{emp.email} • {emp.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-[#0B2F29] font-medium">{emp.designationTitle}</div>
                      <div className="text-[10px] text-[#4A665F]">{emp.departmentName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#334E47]">
                      <span className="flex items-center gap-1 text-[11px] text-emerald-700">
                        <Fingerprint className="w-3.5 h-3.5" />
                        {emp.biometricId || 'Unlinked'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#4A665F] text-[11px]">
                      {emp.campusName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="badge-green px-2 py-0.5 rounded-full text-[10px] font-mono font-medium">
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#4A665F] font-mono text-[11px]">
                      <span className="flex items-center gap-1 text-[#334E47]">
                        <FileCheck className="w-3.5 h-3.5 text-[#0B2F29]" />
                        {emp.documents?.length || 0} files
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectEmployee && onSelectEmployee(emp)}
                        className="btn-secondary text-xs px-2.5 py-1 inline-flex items-center gap-1.5"
                        title="View Employee Profile"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#0B2F29]" />
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
