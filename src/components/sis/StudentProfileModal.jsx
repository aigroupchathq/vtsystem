import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  FileText, 
  Users, 
  Calendar, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Upload, 
  Clock,
  HeartPulse,
  Award
} from 'lucide-react';
import { StudentsService } from '../../modules/sis/students.service.js';

export default function StudentProfileModal({
  isOpen,
  onClose,
  studentId,
  tenantContext
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadDocName, setUploadDocName] = useState('');

  if (!isOpen || !studentId) return null;

  let student = null;
  let accessError = null;

  try {
    student = StudentsService.getById(tenantContext, studentId);
  } catch (err) {
    accessError = err;
  }

  const handleAttachDoc = (e) => {
    e.preventDefault();
    if (!uploadDocName.trim()) return;

    StudentsService.attachDocument(tenantContext, studentId, {
      fileName: uploadDocName,
      documentType: 'CERTIFICATE',
      fileSize: 350000
    });
    setUploadDocName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold">
              {student ? student.firstName[0] : 'S'}
            </div>
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                WHERE AM I? • Student 360 Explorer
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {student ? `${student.firstName} ${student.lastName}` : 'Restricted Student'}
                {student && (
                  <span className="text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {student.admissionNumber}
                  </span>
                )}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Access Restriction Check */}
        {accessError ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Cross-Tenant Access Forbidden</h3>
            <p className="text-xs text-red-300 max-w-md mx-auto">
              {accessError.message}
            </p>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-400 max-w-md mx-auto">
              PostgreSQL Row Level Security (RLS) and Tenant Interceptors block cross-campus record leakage.
            </div>
          </div>
        ) : (
          <>
            {/* The 5 Orientation Answers Bar */}
            <div className="px-6 py-2.5 bg-slate-900/60 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-500 block">CAMPUS:</span>
                <span className="text-white truncate block">{student.campusName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">PLACEMENT:</span>
                <span className="text-white block">{student.gradeName} - {student.divisionName} (#{student.enrollment?.rollNumber})</span>
              </div>
              <div>
                <span className="text-slate-500 block">WHAT MATTERS:</span>
                <span className="text-emerald-400 block font-semibold">Verified Active • 100% Docs</span>
              </div>
              <div>
                <span className="text-slate-500 block">SESSION:</span>
                <span className="text-amber-400 block font-semibold">{student.academicYearName}</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 border-b border-slate-800 flex gap-4 text-xs font-medium">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Overview & Bio
              </button>
              <button
                onClick={() => setActiveTab('guardians')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'guardians'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Guardians & Family
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'documents'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Document Vault ({student.documents?.length || 0})
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 max-h-[55vh] overflow-y-auto space-y-4">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 font-mono">DATE OF BIRTH</div>
                      <div className="text-xs font-semibold text-white mt-0.5">{student.dob}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 font-mono">GENDER & BLOOD</div>
                      <div className="text-xs font-semibold text-white mt-0.5">{student.gender} • {student.bloodGroup}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 font-mono">EMERGENCY PHONE</div>
                      <div className="text-xs font-semibold text-emerald-400 mt-0.5">{student.emergencyPhone}</div>
                    </div>
                  </div>

                  {student.medicalNotes && (
                    <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5">
                      <HeartPulse className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-amber-300">Medical Notes & Health Alerts</div>
                        <div className="text-xs text-amber-200/80 mt-0.5">{student.medicalNotes}</div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-400" />
                      Academic Enrollment Verification
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Assigned to <strong>{student.gradeName}</strong>, Section <strong>{student.divisionName}</strong>. 
                      Roll Number <strong>#{student.enrollment?.rollNumber}</strong>. Status confirmed as active scholar in good standing.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'guardians' && (
                <div className="space-y-3">
                  {student.guardiansDetailed?.map((g, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs">
                          {g.firstName[0]}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">
                            {g.firstName} {g.lastName}
                            <span className="ml-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
                              {g.relation}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {g.occupation || 'Guardian'} • {g.address || 'Local Resident'}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-mono font-medium text-slate-300">{g.phone}</div>
                        {g.email && <div className="text-[10px] text-slate-400">{g.email}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4">
                  {/* Upload new doc form */}
                  <form onSubmit={handleAttachDoc} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Attach new document title (e.g. Immunization_Record.pdf)..."
                      value={uploadDocName}
                      onChange={(e) => setUploadDocName(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5" /> Attach
                    </button>
                  </form>

                  <div className="space-y-2">
                    {(student.documents || []).map((doc, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-emerald-400" />
                          <div>
                            <div className="text-xs font-medium text-white">{doc.fileName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              Type: {doc.documentType} • Size: {(doc.fileSize / 1024).toFixed(0)} KB
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          VERIFIED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
