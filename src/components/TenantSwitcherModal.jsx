import React from 'react';
import { Building2, Check, X, ShieldAlert, Globe } from 'lucide-react';
import { db } from '../database/db.js';

export default function TenantSwitcherModal({
  isOpen,
  onClose,
  tenantContext,
  currentUser,
  onSwitchCampus
}) {
  if (!isOpen) return null;

  const allCampuses = db.getCampuses();
  const accessibleIds = tenantContext.accessibleCampuses.map(c => c.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Campus & Tenant Context</h2>
              <p className="text-xs text-slate-400">Select an operational campus to set query scope</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {currentUser.role !== 'HQ_ADMIN' && (
            <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-300 mb-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>
                Your role (<strong>{currentUser.role}</strong>) is scoped strictly to your home campus. Switching to foreign campuses is restricted by multi-tenant security policies.
              </span>
            </div>
          )}

          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-1">
            Registered School Campuses
          </div>

          <div className="space-y-2">
            {allCampuses.map(campus => {
              const isSelected = campus.id === tenantContext.activeCampusId;
              const hasAccess = currentUser.role === 'HQ_ADMIN' || accessibleIds.includes(campus.id);

              return (
                <div
                  key={campus.id}
                  onClick={() => {
                    if (hasAccess && !isSelected) {
                      onSwitchCampus(campus.id);
                      onClose();
                    }
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/50 shadow-sm'
                      : hasAccess
                      ? 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600 cursor-pointer'
                      : 'bg-slate-900/40 border-slate-800/40 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-semibold ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {campus.code.split('-')[1] || campus.code.slice(0, 3)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        {campus.name}
                        {campus.isPrimary && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            MAIN
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {campus.city}, {campus.state} • Affiliation: CBSE
                      </div>
                    </div>
                  </div>

                  <div>
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : hasAccess ? (
                      <button className="text-xs font-medium text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-600 transition-colors">
                        Select
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        Restricted
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex justify-end">
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
