import React from 'react';
import Student360View from './Student360View.jsx';

export default function StudentProfileModal({
  isOpen,
  onClose,
  studentId,
  tenantContext,
  currentUser
}) {
  if (!isOpen || !studentId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl shadow-2xl max-h-[92vh] overflow-y-auto p-4 sm:p-6 my-auto">
        <Student360View
          studentId={studentId}
          tenantContext={tenantContext}
          currentUser={currentUser || { role: tenantContext?.userRole || 'PRINCIPAL', id: tenantContext?.userId || 'usr-principal-baner' }}
          onBack={onClose}
        />
      </div>
    </div>
  );
}
