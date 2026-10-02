import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Fingerprint, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Upload, 
  Building
} from 'lucide-react';
import { EmployeesService } from '../../modules/hrms/employees.service.js';

export default function EmployeeProfileModal({
  isOpen,
  onClose,
  employeeId,
  tenantContext
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadDocName, setUploadDocName] = useState('');
  const [uploadDocType, setUploadDocType] = useState('SERVICE_RECORD');

  if (!isOpen || !employeeId) return null;

  let employee = null;
  let accessError = null;

  try {
    employee = EmployeesService.getById(tenantContext, employeeId);
  } catch (err) {
    accessError = err;
  }

  const handleAttachDoc = (e) => {
    e.preventDefault();
    if (!uploadDocName.trim()) return;

    EmployeesService.attachDocument(tenantContext, employeeId, {
      fileName: uploadDocName,
      documentType: uploadDocType,
      fileSize: 420000
    });
    setUploadDocName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 font-bold text-lg">
              {employee ? employee.firstName[0] : 'E'}
            </div>
            <div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                Staff 360 Profile • HRMS Core
              </div>
              <h2 className="text-base font-semibold text-white">
                {employee ? `${employee.firstName} ${employee.lastName}` : 'Employee Record'}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tenant Access Violation or Error State */}
        {accessError && (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-base font-semibold text-white">Multi-Tenant Access Restricted</div>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              {accessError.message || 'You do not have permission to view employees from this campus.'}
            </p>
            <div className="mt-4 font-mono text-[11px] text-red-300 bg-red-950/40 py-1.5 px-3 rounded-md inline-block border border-red-800/40">
              Error: {accessError.code || 'ACCESS_DENIED'} (HTTP 403)
            </div>
          </div>
        )}

        {employee && !accessError && (
          <>
            {/* Quick Status Bar */}
            <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="font-mono text-amber-400 font-medium">
                  {employee.employeeCode}
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  {employee.departmentName}
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-300 font-medium">
                  {employee.designationTitle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                  <Fingerprint className="w-3.5 h-3.5" />
                  {employee.biometricId || 'Unlinked'}
                </span>
                <span className="badge-green px-2 py-0.5 rounded-full text-[10px] font-mono">
                  {employee.status}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800 px-6 gap-6 text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Overview & Bio
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-3 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'documents'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Document Vault
                <span className="px-1.5 py-0.2 bg-slate-800 rounded-full text-[10px] font-mono text-slate-300">
                  {employee.documents?.length || 0}
                </span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 max-h-[480px] overflow-y-auto space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Personal & Contact Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                      <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase">Contact Info</div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-200">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-200">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{employee.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Building className="w-3.5 h-3.5 text-slate-500" />
                          <span>Campus: {employee.campusName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                      <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase">Identity & Demographics</div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Gender:</span>
                          <span className="text-white font-medium">{employee.gender || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Joining Date:</span>
                          <span className="text-white font-mono">{employee.joiningDate || '2026-06-01'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Employment Type:</span>
                          <span className="text-emerald-400 font-medium">{employee.employmentType || 'FULL_TIME'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security & Biometrics */}
                  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Fingerprint className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Biometric Device Integration</div>
                        <div className="text-[11px] text-slate-400">
                          Hardware ID mapped for auto-attendance & turnstile access.
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded">
                      {employee.biometricId || 'VT-BIO-PENDING'}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4">
                  {/* Upload new document form */}
                  <form onSubmit={handleAttachDoc} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex gap-2">
                    <input
                      type="text"
                      placeholder="Attach document title (e.g. Police_Verification.pdf)"
                      value={uploadDocName}
                      onChange={(e) => setUploadDocName(e.target.value)}
                      className="input-field text-xs flex-1"
                    />
                    <select
                      value={uploadDocType}
                      onChange={(e) => setUploadDocType(e.target.value)}
                      className="input-field text-xs w-44"
                    >
                      <option value="SERVICE_RECORD">Service Record</option>
                      <option value="POLICE_VERIFICATION">Police Verification</option>
                      <option value="DEGREE_CERTIFICATE">Degree Certificate</option>
                      <option value="APPOINTMENT_LETTER">Appointment Letter</option>
                      <option value="AADHAAR_PAN">Aadhaar / PAN</option>
                    </select>
                    <button type="submit" className="btn-primary text-xs px-3 flex items-center gap-1.5 whitespace-nowrap">
                      <Upload className="w-3.5 h-3.5" />
                      Attach
                    </button>
                  </form>

                  {/* Document List */}
                  {employee.documents && employee.documents.length > 0 ? (
                    <div className="space-y-2">
                      {employee.documents.map((doc) => (
                        <div key={doc.id} className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{doc.fileName}</div>
                              <div className="text-[10px] text-slate-400">
                                {doc.documentType} • {(doc.fileSize / 1024).toFixed(0)} KB • Verified
                              </div>
                            </div>
                          </div>
                          <span className="badge-green text-[10px] font-mono px-2 py-0.5 rounded-full">
                            VERIFIED
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
                      No service records or employee documents attached yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="btn-secondary text-xs px-4 py-2">
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
