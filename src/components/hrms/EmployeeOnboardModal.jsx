import React, { useState } from 'react';
import { X, Users, Briefcase, AlertCircle, Fingerprint, Mail, Phone } from 'lucide-react';
import { EmployeesService } from '../../modules/hrms/employees.service.js';
import { db } from '../../database/db.js';

export default function EmployeeOnboardModal({
  isOpen,
  onClose,
  tenantContext,
  onOnboardSuccess
}) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    employeeCode: `VT-EMP-${Math.floor(100 + Math.random() * 900)}`,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'FEMALE',
    departmentId: 'dept-acad',
    designationId: 'des-sr-teacher',
    biometricId: `BIO-${Math.floor(1000 + Math.random() * 9000)}`
  });

  if (!isOpen) return null;

  const departments = db.getDepartments();
  const designations = db.getDesignations();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        campusId: tenantContext.activeCampusId,
        ...formData
      };
      const result = EmployeesService.onboardEmployee(tenantContext, payload);
      onOnboardSuccess(result);
      onClose();
    } catch (err) {
      setError(err.message || 'Employee onboarding failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Onboard New Employee</h2>
              <p className="text-xs text-slate-400">Register staff service book & biometric profile</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Employee Code *</label>
              <input
                type="text"
                value={formData.employeeCode}
                onChange={(e) => handleChange('employeeCode', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Biometric Hardware ID</label>
              <div className="relative">
                <Fingerprint className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.biometricId}
                  onChange={(e) => handleChange('biometricId', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">First Name *</label>
              <input
                type="text"
                placeholder="e.g. Anand"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Last Name *</label>
              <input
                type="text"
                placeholder="e.g. Kulkarni"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Official Email *</label>
              <input
                type="email"
                placeholder="name@vedictree.edu.in"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Mobile Phone *</label>
              <input
                type="tel"
                placeholder="+91 98200 00000"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Department *</label>
              <select
                value={formData.departmentId}
                onChange={(e) => handleChange('departmentId', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
              >
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Designation *</label>
              <select
                value={formData.designationId}
                onChange={(e) => handleChange('designationId', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
              >
                {designations.map(des => (
                  <option key={des.id} value={des.id}>{des.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-semibold shadow transition-colors"
            >
              Confirm Onboarding & Record Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
