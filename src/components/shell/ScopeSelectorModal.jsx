import React, { useState } from 'react';
import { Building2, Globe, MapPin, Check, X, ShieldAlert, ChevronRight, Layers, School } from 'lucide-react';
import { db } from '../../database/db.js';
import { Modal } from '../../design-system/layout/Modal.jsx';
import { Button } from '../../design-system/actions/Button.jsx';
import { Badge } from '../../design-system/foundations/Badge.jsx';

/**
 * SCOPE SELECTOR MODAL
 * 
 * Implements the full Sovereign Hierarchy:
 * Organization -> Region -> School -> Campus -> Cohort/Class
 * With progressive disclosure and strict multi-tenant boundary checks.
 */

export function ScopeSelectorModal({
  isOpen,
  onClose,
  tenantContext,
  currentUser,
  onSwitchCampus,
  activeCohort = null,
  onSelectCohort = null,
}) {
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);

  const org = db.organization;
  const regions = db.regions;
  const schools = db.schools;
  const campuses = db.campuses;
  const accessibleCampusIds = tenantContext.accessibleCampuses.map((c) => c.id);
  const isHq = currentUser.role === 'HQ_ADMIN';

  const activeCampus = db.getCampusById(tenantContext.activeCampusId) || campuses[0];
  const activeSchool = schools.find((s) => s.id === activeCampus?.schoolId) || schools[0];
  const activeRegion = regions.find((r) => r.id === activeSchool?.regionId) || regions[0];

  const handleSelectCampus = (campus) => {
    const hasAccess = isHq || accessibleCampusIds.includes(campus.id);
    if (!hasAccess) return;
    onSwitchCampus(campus.id);
    onClose();
  };

  const sampleCohorts = [
    { id: 'coh-g7-a', name: 'Grade 7 • Division A', grade: 'Grade 7', division: 'Div A' },
    { id: 'coh-g7-b', name: 'Grade 7 • Division B', grade: 'Grade 7', division: 'Div B' },
    { id: 'coh-g8-a', name: 'Grade 8 • Division A', grade: 'Grade 8', division: 'Div A' },
    { id: 'coh-g6-a', name: 'Grade 6 • Division A', grade: 'Grade 6', division: 'Div A' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sovereign Scope & Campus Hierarchy"
      subtitle="Select your organizational operational scope"
      size="lg"
    >
      <div className="space-y-6">
        {/* Active Scope Summary Banner */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
            Active Scope Breadcrumbs
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <span className="text-[#0F4C35] dark:text-emerald-400">{org.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>{activeRegion.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>{activeSchool.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Badge variant="primary" dot size="sm">
              {activeCampus.name}
            </Badge>
          </div>
        </div>

        {!isHq && (
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-300">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <span>
              Your role (<strong>{currentUser.role}</strong>) is scoped strictly to your home campus.
              Cross-campus switching is restricted by multi-tenant security policies.
            </span>
          </div>
        )}

        {/* Schools & Campuses Hierarchy Grid */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Available Campuses in Network
          </div>

          <div className="space-y-3">
            {schools.map((school) => {
              const schoolCampuses = campuses.filter((c) => c.schoolId === school.id);
              const isSchoolActive = activeSchool.id === school.id;

              return (
                <div
                  key={school.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900"
                >
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                      <School className="w-4 h-4 text-[#0F4C35] dark:text-emerald-400" />
                      <span>{school.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">({school.code})</span>
                    </div>
                    <Badge variant={school.ownershipType === 'OWNED' ? 'primary' : school.ownershipType === 'FRANCHISE' ? 'accent' : 'default'} size="sm">
                      {school.ownershipType}
                    </Badge>
                  </div>

                  <div className="p-3 space-y-2">
                    {schoolCampuses.map((campus) => {
                      const isSelected = campus.id === tenantContext.activeCampusId;
                      const hasAccess = isHq || accessibleCampusIds.includes(campus.id);

                      return (
                        <div
                          key={campus.id}
                          onClick={() => hasAccess && !isSelected && handleSelectCampus(campus)}
                          className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-[#EAF3EF] border-[#2D705C] shadow-sm'
                              : hasAccess
                              ? 'bg-white border-[#E6DFD1] hover:border-[#0B2F29] cursor-pointer'
                              : 'bg-[#EAE6D6] border-[#D9D0BE] text-[#334E47] cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                              isSelected
                                ? 'bg-[#0B2F29] text-white'
                                : 'bg-[#EFE9DD] text-[#1E293B] border border-[#D9D0BE]'
                            }`}>
                              {campus.code.slice(0, 3)}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#102625] flex items-center gap-2">
                                {campus.name}
                                {campus.isPrimary && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#EFE9DD] text-[#334E47] font-semibold border border-[#D9D0BE]">
                                    MAIN
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-[#334E47] font-medium">
                                {campus.city}, {campus.state} • {campus.phone}
                              </div>
                            </div>
                          </div>

                          {isSelected ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2F29]">
                              <Check className="w-4 h-4" /> Active
                            </span>
                          ) : hasAccess ? (
                            <span className="text-xs font-semibold text-[#0B2F29] hover:underline">
                              Switch Scope
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#D9D0BE] text-[#334E47]">Restricted</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional Cohort / Division Scope for Teachers and Principals */}
        {onSelectCohort && (
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Class / Cohort Scope
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleCohorts.map((coh) => (
                <button
                  key={coh.id}
                  type="button"
                  onClick={() => onSelectCohort(coh)}
                  className={`p-2 rounded-lg border text-left text-xs transition-all ${
                    activeCohort?.id === coh.id
                      ? 'bg-[#0F4C35] text-white border-emerald-800 font-semibold'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="truncate">{coh.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
