import React, { useState, useMemo } from 'react';
import {
  Building2,
  Users,
  GraduationCap,
  CalendarCheck,
  UserPlus,
  Banknote,
  Boxes,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Info,
  MapPin,
  Flame,
  Check,
  TrendingUp,
  BarChart3,
  Layers,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import { OverviewService, METRIC_PROVENANCE } from '../../modules/overview/overview.service.js';
import { Badge } from '../../design-system/foundations/Badge.jsx';
import { Button } from '../../design-system/actions/Button.jsx';
import { Modal } from '../../design-system/layout/Modal.jsx';

export function OverviewDashboard({
  tenantContext,
  currentUser,
  onNavigate,
  onSwitchCampus,
  onOpenScopeModal,
}) {
  const isHqAdmin = currentUser.role === 'HQ_ADMIN';
  
  // View mode: 'NETWORK' | 'CENTRE' (HQ can toggle; centre staff is locked to CENTRE)
  const [viewScope, setViewScope] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('scope') === 'CENTRE') return 'CENTRE';
      if (p.get('scope') === 'NETWORK') return 'NETWORK';
    }
    return isHqAdmin ? 'NETWORK' : 'CENTRE';
  });
  const [isProvenanceModalOpen, setIsProvenanceModalOpen] = useState(false);

  // Compute overview data safely
  const effectiveCampusId = tenantContext?.activeCampusId || tenantContext?.campusId || 'cmp-pune-baner';

  const overviewData = useMemo(() => {
    try {
      if (viewScope === 'NETWORK' && isHqAdmin) {
        return OverviewService.getNetworkOverview({
          userRole: currentUser.role,
          userId: currentUser.id,
          organizationId: tenantContext.organizationId,
          campusId: effectiveCampusId
        });
      } else {
        return OverviewService.getCentreOverview(
          {
            userRole: currentUser.role,
            userId: currentUser.id,
            organizationId: tenantContext.organizationId,
            campusId: effectiveCampusId
          },
          effectiveCampusId
        );
      }
    } catch (err) {
      console.warn('Overview fallback to centre scope:', err.message);
      return OverviewService.getCentreOverview(
        {
          userRole: currentUser.role,
          userId: currentUser.id,
          organizationId: tenantContext.organizationId,
          campusId: effectiveCampusId
        },
        effectiveCampusId
      );
    }
  }, [viewScope, isHqAdmin, currentUser, tenantContext, effectiveCampusId]);

  const { metrics, funnel, attentionItems = [], actNowActions = [], recentActivity = [], developmentSummary, centreHealth } = overviewData;

  const attentionCount = attentionItems.length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 pb-24 text-[#102625]">
      {/* ==================================================== */}
      {/* 1. TOP HEADER: Scope Title, Metadata & Scope Controls */}
      {/* Minimalist, high-contrast, uncluttered typography   */}
      {/* ==================================================== */}
      {/* ==================================================== */}
      {/* 1. TOP HEADER: Scope Title, Metadata & Scope Controls */}
      {/* Coherent editorial hierarchy: EYEBROW • TITLE • DESC  */}
      {/* ==================================================== */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6DFD1] pb-5">
        <div className="space-y-1">
          {/* Unified Eyebrow: Context, Geography & Environment Note */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-wider uppercase font-semibold text-[#60706B]">
            <span className="text-[#0B2F29]">
              {overviewData.scopeType === 'NETWORK' ? 'NETWORK GOVERNANCE' : 'CENTRE OPERATIONS'}
            </span>
            <span className="text-[#E6DFD1]">•</span>
            <span>{overviewData.scopeLocation}</span>
            <span className="text-[#E6DFD1]">•</span>
            <span className="text-[#8C6B1C] font-sans font-medium normal-case">
              Sample operational data
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-[#0B2F29]">
            {overviewData.scopeTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#334E47] font-medium max-w-2xl leading-relaxed">
            {overviewData.scopeSubtitle}
          </p>
        </div>

        {/* Scope Actions & Segmented Control (Unified h-9 baseline) */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Metric Provenance Link */}
          <button
            type="button"
            onClick={() => setIsProvenanceModalOpen(true)}
            className="h-9 inline-flex items-center gap-1.5 px-3 rounded-lg text-xs font-medium text-[#334E47] hover:text-[#0B2F29] bg-[#FBF8EF] hover:bg-[#F4EEDC] border border-[#E6DFD1] transition-colors cursor-pointer"
            title="Inspect metric sources, classifications, and audit provenance"
          >
            <Info className="w-3.5 h-3.5 text-[#C49A3A]" />
            <span>ⓘ Metric provenance</span>
          </button>

          {/* Network vs Centre Scope Switch (HQ Admin Only) */}
          {isHqAdmin && (
            <div className="h-9 flex items-center p-0.5 rounded-lg bg-[#F4EEDC] border border-[#E6DFD1]" role="group" aria-label="Scope view selector">
              <button
                type="button"
                onClick={() => setViewScope('NETWORK')}
                className={`h-full px-3 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  viewScope === 'NETWORK'
                    ? 'bg-[#0B2F29] text-[#DFC679] font-bold'
                    : 'text-[#334E47] hover:text-[#0B2F29]'
                }`}
                aria-pressed={viewScope === 'NETWORK'}
              >
                Network
              </button>
              <button
                type="button"
                onClick={() => setViewScope('CENTRE')}
                className={`h-full px-3 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  viewScope === 'CENTRE'
                    ? 'bg-[#0B2F29] text-[#DFC679] font-bold'
                    : 'text-[#334E47] hover:text-[#0B2F29]'
                }`}
                aria-pressed={viewScope === 'CENTRE'}
              >
                Centre
              </button>
            </div>
          )}

          {/* Change Operating Campus Button */}
          <button
            type="button"
            onClick={onOpenScopeModal}
            className="h-9 inline-flex items-center gap-1.5 px-3.5 rounded-lg text-xs font-semibold bg-[#0B2F29] hover:bg-[#154E42] text-[#FBF8EF] border border-[#0B2F29] transition-colors cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-[#DFC679]" />
            <span>Switch Scope</span>
          </button>
        </div>
      </header>

      {/* ==================================================== */}
      {/* 2. OPERATIONAL BRIEFING — "TODAY'S PRIORITIES"        */}
      {/* Editorial briefing: 2x2 grid, inline links, no lasagna */}
      {/* ==================================================== */}
      <section 
        aria-labelledby="today-priorities-heading"
        className="rounded-xl border border-[#E6DFD1] bg-[#F4EEDC]/35 p-5 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E6DFD1]/80">
          <div>
            <div className="text-xs font-sans uppercase tracking-wider text-[#334E47] font-bold mb-0.5">
              OPERATIONAL PRIORITIES
            </div>
            <h2 
              id="today-priorities-heading"
              className="text-base sm:text-lg font-sans font-bold tracking-tight text-[#0B2F29] leading-snug"
            >
              {attentionCount > 0 
                ? `Today — ${attentionCount} ${attentionCount === 1 ? 'item requires' : 'items require'} leadership review`
                : 'Today — All operational systems on track'
              }
            </h2>
            <p className="text-xs text-[#334E47] font-medium mt-0.5">
              {overviewData.scopeType === 'NETWORK' 
                ? 'Operational exceptions aggregated across active campuses awaiting review.'
                : `Operational exceptions for ${overviewData.campusDetails?.name || 'this campus'} awaiting review.`
              }
            </p>
          </div>

          {attentionCount > 0 && (
            <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/60 self-start sm:self-auto shrink-0">
              {attentionCount} Action{attentionCount === 1 ? '' : 's'} Required
            </span>
          )}
        </div>

        {/* Empty State: Everything is on track */}
        {attentionCount === 0 ? (
          <div className="p-4 rounded-lg bg-[#2D705C]/10 border border-[#2D705C]/25 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2D705C] shrink-0" />
            <div>
              <h3 className="text-xs font-semibold text-[#102625]">
                Everything is currently on track.
              </h3>
              <p className="text-xs text-[#60706B] mt-0.5">
                No critical enquiries, attendance exceptions, or maintenance items require immediate leadership triage.
              </p>
            </div>
          </div>
        ) : (
          /* Balanced 2x2 Grid: Zero orphan cards, clean editorial cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {attentionItems.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-lg bg-white border border-[#E6DFD1] flex flex-col justify-between gap-3 hover:border-[#C49A3A]/60 transition-colors"
              >
                <div>
                  {/* Item Header: Priority + Category + Scope */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold uppercase ${
                        item.urgency === 'HIGH' 
                          ? 'bg-[#E35D52]/10 text-[#E35D52] border border-[#E35D52]/20' 
                          : 'bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/50'
                      }`}>
                        {item.urgency || item.priority}
                      </span>
                      <span className="text-xs font-semibold text-[#102625]">
                        {item.category}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#60706B] font-mono truncate max-w-[140px]" title={item.scope}>
                      {item.scope}
                    </span>
                  </div>

                  {/* Item Issue Headline */}
                  <h3 className="text-sm font-semibold text-[#102625] leading-snug">
                    {item.issue || item.title}
                  </h3>

                  {/* Context / Reason */}
                  <p className="text-xs text-[#60706B] mt-1 leading-relaxed">
                    {item.reason || item.description}
                  </p>
                </div>

                {/* Footer: Responsible Role + Inline Text Action (No Heavy Block Button) */}
                <div className="pt-2.5 border-t border-[#EFE9DD] flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#60706B] truncate" title={`Assigned: ${item.responsibleRole}`}>
                    Role: {item.responsibleRole}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.targetNav)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B2F29] hover:text-[#154E42] group/link transition-colors cursor-pointer shrink-0"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C49A3A] group-hover/link:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ==================================================== */}
      {/* 3. EXECUTIVE KPI RIBBON (UNIFIED ANALYTICAL STRIP)    */}
      {/* Replaces 6 heavy individual boxes with a unified strip */}
      {/* ==================================================== */}
      <section aria-label="Operational Snapshot">
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h2 className="text-[11px] font-bold tracking-wider uppercase text-[#60706B] font-mono">
            {overviewData.scopeType === 'NETWORK' ? 'Network Operational Pulse' : 'Centre Operational Pulse'}
          </h2>
          <span className="text-[11px] text-[#60706B] font-mono">Current Term • Live Reconciled</span>
        </div>

        {/* Continuous Analytical Ribbon */}
        <div className="bg-white rounded-xl border border-[#E6DFD1] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-[#EFE9DD] overflow-hidden">
          {/* Active Centres (Only at Network View) */}
          {overviewData.scopeType === 'NETWORK' && (
            <div 
              onClick={() => onNavigate('hierarchy')}
              className="p-4 sm:p-5 hover:bg-[#FBF8EF]/60 transition-colors cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label="Active centres"
            >
              <div className="flex items-center justify-between text-[#334E47] mb-2">
                <span className="text-xs font-sans uppercase tracking-wider text-[#334E47] font-semibold">Centres</span>
                <Building2 className="w-3.5 h-3.5 text-[#2D705C] group-hover:scale-105 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-sans font-bold text-[#0B2F29] tabular-nums tracking-tight">
                {metrics.activeCentres}
              </div>
              <div className="text-xs text-[#334E47] font-medium mt-1 flex items-center justify-between">
                <span>Active Campuses</span>
                <ArrowUpRight className="w-3 h-3 text-[#C49A3A] group-hover:text-[#0B2F29] transition-colors" />
              </div>
            </div>
          )}

          {/* Students */}
          <div 
            onClick={() => onNavigate('students')}
            className="p-4 sm:p-5 hover:bg-[#FBF8EF]/60 transition-colors cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label="Enrolled students"
          >
            <div className="flex items-center justify-between text-[#334E47] mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-[#334E47] font-semibold">Students</span>
              <GraduationCap className="w-3.5 h-3.5 text-[#2D705C] group-hover:scale-105 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-sans font-bold text-[#0B2F29] tabular-nums tracking-tight">
              {metrics.totalStudents}
            </div>
            <div className="text-xs text-[#334E47] font-medium mt-1 flex items-center justify-between">
              <span>Active Enrolments</span>
              <ArrowUpRight className="w-3 h-3 text-[#C49A3A] group-hover:text-[#0B2F29] transition-colors" />
            </div>
          </div>

          {/* Teachers / Faculty */}
          <div 
            onClick={() => onNavigate('employees')}
            className="p-4 sm:p-5 hover:bg-[#FBF8EF]/60 transition-colors cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label="Teaching faculty"
          >
            <div className="flex items-center justify-between text-[#334E47] mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-[#334E47] font-semibold">Faculty</span>
              <Users className="w-3.5 h-3.5 text-[#2D705C] group-hover:scale-105 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-sans font-bold text-[#0B2F29] tabular-nums tracking-tight">
              {metrics.totalFaculty}
            </div>
            <div className="text-xs text-[#334E47] font-medium mt-1 flex items-center justify-between">
              <span>Academic Staff</span>
              <ArrowUpRight className="w-3 h-3 text-[#C49A3A] group-hover:text-[#0B2F29] transition-colors" />
            </div>
          </div>

          {/* Admissions / Enquiries */}
          <div 
            onClick={() => onNavigate('admissions')}
            className="p-4 sm:p-5 hover:bg-[#FBF8EF]/60 transition-colors cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label="Admissions pipeline"
          >
            <div className="flex items-center justify-between text-[#334E47] mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-[#334E47] font-semibold">Enquiries</span>
              <UserPlus className="w-3.5 h-3.5 text-[#C49A3A] group-hover:scale-105 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-sans font-bold text-[#0B2F29] tabular-nums tracking-tight">
              {metrics.admissionsEnquiries}
            </div>
            <div className="text-xs text-[#334E47] font-medium mt-1 flex items-center justify-between">
              <span>Active Pipeline</span>
              <ArrowUpRight className="w-3 h-3 text-[#C49A3A] group-hover:text-[#0B2F29] transition-colors" />
            </div>
          </div>

          {/* Attendance (With Configured Benchmark Language) */}
          <div 
            onClick={() => onNavigate('attendance')}
            className="p-4 sm:p-5 hover:bg-[#FBF8EF]/60 transition-colors cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label="Attendance rate"
          >
            <div className="flex items-center justify-between text-[#334E47] mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-[#334E47] font-semibold">Attendance</span>
              <CalendarCheck className="w-3.5 h-3.5 text-[#2D705C] group-hover:scale-105 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-sans font-bold text-[#0B2F29] tabular-nums tracking-tight">
              {metrics.attendanceRatePct}%
            </div>
            <div className="text-xs text-[#2D705C] mt-1 flex items-center justify-between font-semibold">
              <span>Benchmark: {metrics.configuredBenchmarkPct || 75}%</span>
              <ArrowUpRight className="w-3 h-3 text-[#C49A3A] group-hover:text-[#0B2F29] transition-colors" />
            </div>
          </div>

          {/* Campus Fee Collections */}
          <div 
            onClick={() => onNavigate('finance')}
            className="p-4 sm:p-5 hover:bg-[#FBF8EF]/60 transition-colors cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label="Campus collections"
          >
            <div className="flex items-center justify-between text-[#334E47] mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-[#334E47] font-semibold">Collections</span>
              <Banknote className="w-3.5 h-3.5 text-[#2D705C] group-hover:scale-105 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-sans font-bold text-[#0B2F29] tabular-nums tracking-tight">
              ₹{(metrics.collectedRevenueINR / 100000).toFixed(1)}L
            </div>
            <div className="text-xs text-[#334E47] font-medium mt-1 flex items-center justify-between">
              <span>School Fee Pool</span>
              <ArrowUpRight className="w-3 h-3 text-[#C49A3A] group-hover:text-[#0B2F29] transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. MAIN OPERATING SURFACE ACCORDING TO ACTIVE SCOPE  */}
      {/* ==================================================== */}
      {viewScope === 'NETWORK' ? (
        /* -------------------------------------------------- */
        /* A. NETWORK SCOPE: MULTI-CENTRE HEALTH & COMPARISON */
        /* -------------------------------------------------- */
        <div className="space-y-8">
          {/* Centre Health & Comparison (Reconciling MMR vs Strategic Growth Geography) */}
          {centreHealth && (
            <section className="bg-white rounded-xl border border-[#E6DFD1] p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                    Centre Health & Comparison
                  </h3>
                  <p className="text-xs text-[#334E47] font-medium mt-0.5">
                    3 Campuses in Mumbai MMR Operating Scope · 1 Seed/Demo Record in Strategic Growth Geography (Nagpur)
                  </p>
                </div>
                <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded bg-[#F4EEDC] text-[#334E47] border border-[#E6DFD1]">
                  All four configured demo/seed campus records are preserved
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FBF8EF] text-[#334E47] uppercase font-sans font-bold text-xs border-b border-[#E6DFD1]">
                    <tr>
                      <th className="py-2.5 px-3">Centre / Campus</th>
                      <th className="py-2.5 px-3">Operating Scope</th>
                      <th className="py-2.5 px-3">Model</th>
                      <th className="py-2.5 px-3 text-right">Students</th>
                      <th className="py-2.5 px-3 text-right">Attendance</th>
                      <th className="py-2.5 px-3 text-right">Enquiries</th>
                      <th className="py-2.5 px-3 text-right">Collections</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE9DD]">
                    {centreHealth.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FBF8EF]/60 transition-colors">
                        <td className="py-3 px-3 font-semibold text-[#0B2F29]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans font-bold text-[#0B2F29]">{c.name}</span>
                            {c.isDemoGrowthGeography && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/60 font-bold">
                                DEMO
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#60706B] font-normal">
                            {c.city} • {c.code}
                            {c.demoProvenanceNote && (
                              <span className="block text-[10px] text-[#8C6B1C] italic mt-0.5">
                                [{c.demoProvenanceNote}]
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                            c.geographicCluster === 'MUMBAI_MMR'
                              ? 'bg-[#F4EEDC] text-[#102625]'
                              : 'bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/50'
                          }`}>
                            {c.clusterLabel}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            c.ownershipType === 'OWNED' ? 'bg-[#2D705C]/15 text-[#2D705C] border border-[#2D705C]/30' :
                            c.ownershipType === 'FRANCHISE' ? 'bg-[#5D27E8]/10 text-[#5D27E8] border border-[#5D27E8]/20' :
                            'bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/60'
                          }`}>
                            {c.ownershipType}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-medium tabular-nums text-[#102625]">{c.studentsCount ?? 0}</td>
                        <td className="py-3 px-3 text-right font-mono font-medium tabular-nums text-[#102625]">{c.attendanceRatePct ?? c.attendanceRate ?? 95}%</td>
                        <td className="py-3 px-3 text-right font-mono font-medium tabular-nums text-[#102625]">{c.activeLeadsCount ?? c.admissionsPipelineCount ?? 0}</td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-[#2D705C] tabular-nums">
                          ₹{(((c.collectionsINR ?? c.collectedAmount ?? 0)) / 1000).toFixed(0)}k
                        </td>
                        <td className="py-3 px-3 text-center">
                          <Badge variant={c.status === 'HEALTHY' ? 'success' : 'warning'} size="sm">
                            {c.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              onSwitchCampus(c.id);
                              setViewScope('CENTRE');
                            }}
                            className="text-xs"
                          >
                            Centre View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Operational Movement: Admissions Funnel + Campus Collections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admissions Sophisticated Conversion Pipeline */}
            <div className="bg-white rounded-xl border border-[#E6DFD1] p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                    Admissions Conversion Pipeline
                  </h3>
                  <button 
                    type="button"
                    onClick={() => onNavigate('admissions')}
                    className="text-xs text-[#0B2F29] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View CRM <ChevronRight className="w-3 h-3 text-[#C49A3A]" />
                  </button>
                </div>
                <p className="text-xs text-[#334E47] font-medium mb-4">Stage retention and student conversion progression</p>

                {/* Analytical Funnel Stepped Pipeline */}
                <div className="space-y-3">
                  {/* Stage 1 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#102625] font-medium">1. Leads & Enquiries</span>
                      <span className="font-bold text-[#0B2F29] font-mono tabular-nums">{funnel.enquiries}</span>
                    </div>
                    <div className="w-full bg-[#F4EEDC] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#7E8D88] h-full rounded-full w-full" />
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#102625] font-medium">2. Applications Submitted</span>
                        <span className="text-[10px] font-mono text-[#60706B]">
                          {funnel.enquiries > 0 ? `${Math.round((funnel.applications / funnel.enquiries) * 100)}% of pipeline` : '0%'}
                        </span>
                      </div>
                      <span className="font-bold text-[#0B2F29] font-mono tabular-nums">{funnel.applications}</span>
                    </div>
                    <div className="w-full bg-[#F4EEDC] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#2D705C] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${funnel.enquiries > 0 ? Math.min(100, (funnel.applications / funnel.enquiries) * 100) : 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#102625] font-medium">3. Assessment / Visits</span>
                        <span className="text-[10px] font-mono text-[#60706B]">
                          {funnel.enquiries > 0 ? `${Math.round((funnel.assessments / funnel.enquiries) * 100)}% of pipeline` : '0%'}
                        </span>
                      </div>
                      <span className="font-bold text-[#0B2F29] font-mono tabular-nums">{funnel.assessments}</span>
                    </div>
                    <div className="w-full bg-[#F4EEDC] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#C49A3A] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${funnel.enquiries > 0 ? Math.min(100, (funnel.assessments / funnel.enquiries) * 100) : 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Stage 4: Enrolled */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#0B2F29] font-bold">4. Confirmed Admissions</span>
                        <span className="text-[10px] font-mono font-semibold text-[#2D705C]">
                          {funnel.enquiries > 0 ? `${Math.round((funnel.admissions / funnel.enquiries) * 100)}% net conversion` : '0%'}
                        </span>
                      </div>
                      <span className="font-extrabold text-[#0B2F29] font-mono tabular-nums">{funnel.admissions}</span>
                    </div>
                    <div className="w-full bg-[#F4EEDC] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#0B2F29] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${funnel.enquiries > 0 ? (funnel.admissions / funnel.enquiries) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EFE9DD] flex items-center justify-between text-[11px] text-[#60706B]">
                <span>Total Funnel Volume: <strong className="font-mono text-[#102625]">{funnel.enquiries}</strong> enquiries</span>
                <span className="font-mono text-[#0B2F29] font-bold">{funnel.admissions} enrolled</span>
              </div>
            </div>

            {/* Campus Fee Collections with Strict Financial Boundary */}
            <div className="bg-white rounded-xl border border-[#E6DFD1] p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                    Campus Fee Collections
                  </h3>
                  <button 
                    type="button"
                    onClick={() => onNavigate('finance')}
                    className="text-xs text-[#0B2F29] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Fee Ledger <ChevronRight className="w-3 h-3 text-[#C49A3A]" />
                  </button>
                </div>
                <p className="text-xs text-[#334E47] font-medium mb-3">Tuition and operational fees reconciled to date</p>

                {/* Explicit Corporate Boundary Notice: Editorial Footnote Style */}
                <div className="p-3 mb-4 rounded-lg bg-[#F4EEDC]/80 border-l-2 border-[#C49A3A] text-xs text-[#0B2F29] leading-relaxed">
                  <strong className="font-bold text-[#0B2F29]">Parent/SPV Boundary:</strong> This view represents school/SPV operational collections only. Parent-level platform, brand, curriculum, technology and related IP economics are outside this view and must be accounted for according to the final legal and commercial structure.
                </div>

                {/* Key Numbers Grid */}
                <div className="grid grid-cols-2 gap-3.5 mb-3">
                  <div className="p-3 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1]">
                    <span className="text-xs font-sans text-[#334E47] uppercase tracking-wider font-semibold block">Reconciled Collections</span>
                    <span className="text-lg sm:text-xl font-bold font-sans text-[#2D705C] tabular-nums">
                      ₹{(metrics.collectedRevenueINR).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1]">
                    <span className="text-xs font-sans text-[#334E47] uppercase tracking-wider font-semibold block">Outstanding Balance</span>
                    <span className="text-lg sm:text-xl font-bold font-sans text-[#E35D52] tabular-nums">
                      ₹{(metrics.outstandingRevenueINR).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Progress Meter */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#334E47] font-medium">Collection Progress</span>
                    <span className="font-sans font-bold text-[#0B2F29]">{metrics.collectionProgressPct}%</span>
                  </div>
                  <div className="w-full bg-[#F4EEDC] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#0B2F29] h-full rounded-full transition-all duration-500"
                      style={{ width: `${metrics.collectionProgressPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EFE9DD] flex justify-between items-center text-xs text-[#334E47] font-mono">
                <span>Total Term Invoiced: ₹{((metrics.collectedRevenueINR + metrics.outstandingRevenueINR) / 100000).toFixed(1)}L</span>
                <span className="text-[#2D705C] font-semibold">{metrics.collectionProgressPct}% reconciled</span>
              </div>
            </div>
          </div>

          {/* Student Development Pulse (Concise 4 Dimensions) */}
          <section className="bg-white rounded-xl border border-[#E6DFD1] p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C49A3A]" />
                <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                  Student Development Pulse
                </h3>
              </div>
              <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-[#F4EEDC] text-[#2D705C] border border-[#DFC679]/60">
                Formative Pulse
              </span>
            </div>
            <p className="text-xs text-[#334E47] font-medium mb-4 max-w-2xl">
              Organisational development indicators across four core Vedic Tree dimensions. Individual formative rubrics reside in the developmental portal.
            </p>

            {/* 4 Holistic Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
              {developmentSummary?.holisticDimensions?.map((dim, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#0B2F29]">{dim.dimension}</span>
                    <span className="text-xs font-sans font-bold text-[#0B2F29] tabular-nums">{dim.progressPct}%</span>
                  </div>
                  <div className="w-full bg-[#F4EEDC] h-1.5 rounded-full overflow-hidden mb-2">
                    <div 
                      className="bg-[#2D705C] h-full rounded-full transition-all duration-500" 
                      style={{ width: `${dim.progressPct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-[#334E47] font-medium truncate flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#2D705C] shrink-0" />
                    <span className="truncate">{dim.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mandatory Safeguarding & Formative Observations Notice */}
            <div className="pt-3 border-t border-[#EFE9DD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="text-[#334E47] font-medium flex items-center gap-1.5 italic">
                <ShieldCheck className="w-4 h-4 text-[#2D705C] shrink-0" />
                <span>{developmentSummary?.safeguardingNote}</span>
              </div>
              <button
                onClick={() => onNavigate('design-system')}
                className="text-xs font-semibold text-[#0B2F29] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>View Development Pulse →</span>
              </button>
            </div>
          </section>

          {/* Activity Feed & Subordinate Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Operational Activity Feed (8 cols) */}
            <div className="md:col-span-8 bg-white rounded-xl border border-[#E6DFD1] p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                  Recent Operational Activity
                </h3>
                <span className="text-xs text-[#334E47] font-mono">Audit Ledger</span>
              </div>

              <div className="space-y-2">
                {recentActivity.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#334E47] italic">No recent activity logged.</div>
                ) : (
                  recentActivity.map((act) => (
                    <div key={act.id} className="p-2.5 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <Clock className="w-3.5 h-3.5 text-[#C49A3A] shrink-0" />
                        <div>
                          <div className="font-semibold text-[#0B2F29]">{act.title}</div>
                          <div className="text-[11px] text-[#334E47] font-medium">Initiated by {act.userRole}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#334E47]">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Subordinate General Shortcuts (4 cols) */}
            <div className="md:col-span-4 bg-white rounded-xl border border-[#E6DFD1] p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-sans font-semibold text-[#0B2F29] mb-2">
                  General Shortcuts
                </h3>
                <p className="text-xs text-[#334E47] font-medium mb-3">Subordinate standard navigation actions.</p>

                <div className="space-y-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => onNavigate('admissions')}
                    className="justify-start text-xs cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5 mr-2 text-[#C49A3A]" />
                    New Admission Enquiry
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => onNavigate('attendance')}
                    className="justify-start text-xs cursor-pointer"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 mr-2 text-[#2D705C]" />
                    Record Classroom Attendance
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => onNavigate('finance')}
                    className="justify-start text-xs cursor-pointer"
                  >
                    <Banknote className="w-3.5 h-3.5 mr-2 text-[#2D705C]" />
                    Campus Fee Ledgers
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => onNavigate('operations')}
                    className="justify-start text-xs cursor-pointer"
                  >
                    <Boxes className="w-3.5 h-3.5 mr-2 text-[#60706B]" />
                    Campus Facilities
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EFE9DD] text-[10px] text-[#60706B]">
                Permission-filtered based on your active role.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* -------------------------------------------------- */
        /* B. CENTRE SCOPE: PRINCIPAL'S DAILY OPERATIONAL VIEW */
        /* -------------------------------------------------- */
        <div className="space-y-8">
          {/* Priority 1 & 2: Attendance Operations + Admissions Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Attendance Operations */}
            <div className="bg-white rounded-xl border border-[#E6DFD1] p-5 sm:p-6 flex flex-col justify-between hover:border-[#DFC679] transition-all">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                    Daily Attendance Operations
                  </h3>
                  <button 
                    type="button"
                    onClick={() => onNavigate('attendance')}
                    className="text-xs text-[#154E42] font-semibold hover:text-[#0B2F29] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Roll Call <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-[#334E47] font-medium mb-4">
                  Classroom attendance tracking against configured benchmark ({metrics.configuredBenchmarkPct || 75}%)
                </p>

                <div className="p-4 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] mb-4 text-center">
                  <div className="text-3xl sm:text-4xl font-sans font-bold text-[#0B2F29] tabular-nums">
                    {metrics.attendanceRatePct}%
                  </div>
                  <div className="text-xs text-[#334E47] mt-1 font-medium">Average Daily Attendance</div>
                </div>

                <div className="text-xs text-[#0B2F29] space-y-2">
                  <div className="flex justify-between p-2.5 rounded-lg bg-[#F4EEDC]/50 border border-[#E6DFD1]/60">
                    <span className="text-[#334E47] font-medium">Configured Minimum:</span>
                    <span className="font-mono font-bold text-[#0B2F29]">{metrics.configuredBenchmarkPct || 75}%</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-[#E35D52]/10 border border-[#E35D52]/20">
                    <span className="text-[#E35D52] font-semibold">Attendance Exceptions:</span>
                    <span className="font-bold text-[#E35D52]">1 flagged today</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E6DFD1] flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('attendance')}
                  className="text-xs bg-[#154E42] hover:bg-[#0B2F29] text-white"
                >
                  Open Attendance Roster →
                </Button>
              </div>
            </div>

            {/* Local Admissions Pipeline */}
            <div className="bg-white rounded-xl border border-[#E6DFD1] p-5 sm:p-6 flex flex-col justify-between hover:border-[#DFC679] transition-all">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                    Campus Admissions Pipeline
                  </h3>
                  <button 
                    type="button"
                    onClick={() => onNavigate('admissions')}
                    className="text-xs text-[#154E42] font-semibold hover:text-[#0B2F29] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Admissions <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-[#334E47] font-medium mb-4">Local campus student intake and enquiry conversions</p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1]/70">
                    <span className="text-[#60706B]">New Enquiries (Awaiting Call):</span>
                    <span className="font-bold text-[#102625] font-mono tabular-nums">{funnel.enquiries}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1]/70">
                    <span className="text-[#60706B]">Applications Under Review:</span>
                    <span className="font-bold text-[#102625] font-mono tabular-nums">{funnel.applications}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1]/70">
                    <span className="text-[#60706B]">Campus Visits Scheduled:</span>
                    <span className="font-bold text-[#102625] font-mono tabular-nums">{funnel.assessments}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F4EEDC] border border-[#DFC679]">
                    <span className="text-[#0B2F29] font-bold">Enrolled Students:</span>
                    <span className="font-bold text-[#0B2F29] font-mono tabular-nums">{funnel.admissions}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E6DFD1] flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('admissions')}
                  className="text-xs bg-[#F4EEDC] text-[#0B2F29] hover:bg-[#E6DFD1] border border-[#DFC679]"
                >
                  Manage Admissions CRM →
                </Button>
              </div>
            </div>
          </div>

          {/* Priority 3 & 4: Facilities Upkeep + Campus Receipts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facilities & Physical Maintenance */}
            <div className="bg-white rounded-xl border border-[#E6DFD1] p-5 flex flex-col justify-between hover:border-[#DFC679] transition-all">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                    Facilities & Maintenance
                  </h3>
                  <button 
                    type="button"
                    onClick={() => onNavigate('operations')}
                    className="text-xs text-[#154E42] font-semibold hover:text-[#0B2F29] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Facilities <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-[#334E47] font-medium mb-3">Campus upkeep, classroom repairs, and physical infrastructure</p>

                <div className="p-3.5 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#334E47] font-medium">Active Work Orders:</span>
                    <span className="font-bold text-[#0B2F29] font-mono">2 tickets open</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#334E47] font-medium">Urgency Level:</span>
                    <span className="font-mono text-[#C49A3A] font-bold bg-[#F4EEDC] px-2 py-0.5 rounded border border-[#DFC679]">MEDIUM (Inspecting)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#334E47] font-medium">Inspection Lead:</span>
                    <span className="text-[#0B2F29] font-medium">Campus Admin</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E6DFD1] flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('operations')}
                  className="text-xs bg-[#F4EEDC] text-[#0B2F29] hover:bg-[#E6DFD1] border border-[#DFC679]"
                >
                  Inspect Work Orders →
                </Button>
              </div>
            </div>

            {/* Campus Fee Collections with Boundary Notice */}
            <div className="bg-white rounded-xl border border-[#E6DFD1] p-5 flex flex-col justify-between hover:border-[#DFC679] transition-all">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                    Campus Fee Receipts
                  </h3>
                  <button 
                    type="button"
                    onClick={() => onNavigate('finance')}
                    className="text-xs text-[#154E42] font-semibold hover:text-[#0B2F29] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Ledgers <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-[#334E47] font-medium mb-2">Tuition and operational receipts for this campus</p>

                {/* Explicit Corporate Boundary Notice: Editorial Footnote Style */}
                <div className="p-3 mb-3 rounded-lg bg-[#FBF8EF] border-l-2 border-[#C49A3A] border-y border-r border-[#E6DFD1] text-xs text-[#0B2F29] leading-relaxed">
                  <strong className="font-semibold text-[#0B2F29]">Parent/SPV Boundary:</strong> This view represents school/SPV operational collections only. Parent-level platform, brand, curriculum, technology and related IP economics are outside this view and must be accounted for according to the final legal and commercial structure.
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#334E47] font-medium">Reconciled Collections:</span>
                    <span className="font-bold text-[#0B2F29] font-mono tabular-nums">₹{(metrics.collectedRevenueINR).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#334E47] font-medium">Outstanding Term Balance:</span>
                    <span className="font-bold text-[#E35D52] font-mono tabular-nums">₹{(metrics.outstandingRevenueINR).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full bg-[#F4EEDC] h-2 rounded-full overflow-hidden mt-2 border border-[#E6DFD1]">
                    <div 
                      className="bg-[#154E42] h-full rounded-full transition-all duration-500"
                      style={{ width: `${metrics.collectionProgressPct}%` }}
                    />
                  </div>
                  <div className="text-xs text-[#334E47] text-right mt-1 font-mono">
                    {metrics.collectionProgressPct}% collected
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E6DFD1] flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('finance')}
                  className="text-xs bg-[#F4EEDC] text-[#0B2F29] hover:bg-[#E6DFD1] border border-[#DFC679]"
                >
                  Review Fee Ledgers →
                </Button>
              </div>
            </div>
          </div>

          {/* Student Development Pulse (Campus Scope) */}
          <section className="bg-white rounded-xl border border-[#E6DFD1] p-5 sm:p-6 hover:border-[#DFC679] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C49A3A]" />
                <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                  Student Development Pulse
                </h3>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-[#F4EEDC] text-[#0B2F29] border border-[#DFC679]">Campus Pulse</span>
            </div>
            <p className="text-xs text-[#334E47] font-medium mb-4 max-w-2xl">
              Campus formative observations across the four core dimensions. Detailed developmental portfolios are managed in the learning workspace.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
              {developmentSummary?.holisticDimensions?.map((dim, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#0B2F29]">{dim.dimension}</span>
                    <span className="text-xs font-mono font-bold text-[#154E42] tabular-nums">{dim.progressPct}%</span>
                  </div>
                  <div className="w-full bg-[#F4EEDC] h-1.5 rounded-full overflow-hidden mb-2">
                    <div 
                      className="bg-[#154E42] h-full rounded-full transition-all duration-500"
                      style={{ width: `${dim.progressPct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-[#334E47] font-medium truncate flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#2D705C] shrink-0" />
                    <span className="truncate">{dim.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E6DFD1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="text-[#334E47] font-medium flex items-center gap-1.5 italic">
                <ShieldCheck className="w-4 h-4 text-[#2D705C] shrink-0" />
                <span>{developmentSummary?.safeguardingNote}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('design-system')}
                className="text-xs shrink-0 bg-[#F4EEDC] text-[#0B2F29] hover:bg-[#E6DFD1] border border-[#DFC679]"
              >
                View Development Pulse →
              </Button>
            </div>
          </section>

          {/* Activity Feed & Subordinate Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-white rounded-xl border border-[#E6DFD1] p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-sans font-semibold text-[#0B2F29]">
                  Recent Campus Activity
                </h3>
                <span className="text-xs text-[#334E47] font-mono">Campus Audit Stream</span>
              </div>

              <div className="space-y-2">
                {recentActivity.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#334E47] italic">No recent activity logged for this campus.</div>
                ) : (
                  recentActivity.map((act) => (
                    <div key={act.id} className="p-2.5 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <Clock className="w-3.5 h-3.5 text-[#334E47] shrink-0" />
                        <div>
                          <div className="font-semibold text-[#0B2F29]">{act.title}</div>
                          <div className="text-[11px] text-[#334E47] font-medium">Initiated by {act.userRole}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#334E47]">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="md:col-span-4 bg-white rounded-xl border border-[#E6DFD1] p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-sans font-semibold text-[#0B2F29] mb-2">
                  Campus Shortcuts
                </h3>
                <p className="text-xs text-[#334E47] font-medium mb-3">Subordinate standard navigation actions.</p>

                <div className="space-y-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => onNavigate('attendance')}
                    className="justify-start text-xs bg-[#F4EEDC] text-[#0B2F29] hover:bg-[#E6DFD1] border border-[#DFC679]"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 mr-2 text-[#2D705C]" />
                    Record Daily Attendance
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => onNavigate('admissions')}
                    className="justify-start text-xs bg-[#F4EEDC] text-[#0B2F29] hover:bg-[#E6DFD1] border border-[#DFC679]"
                  >
                    <UserPlus className="w-3.5 h-3.5 mr-2 text-[#C49A3A]" />
                    Add Admission Lead
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => onNavigate('students')}
                    className="justify-start text-xs bg-[#F4EEDC] text-[#0B2F29] hover:bg-[#E6DFD1] border border-[#DFC679]"
                  >
                    <GraduationCap className="w-3.5 h-3.5 mr-2 text-[#154E42]" />
                    Student Directory
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => onNavigate('operations')}
                    className="justify-start text-xs bg-[#F4EEDC] text-[#0B2F29] hover:bg-[#E6DFD1] border border-[#DFC679]"
                  >
                    <Boxes className="w-3.5 h-3.5 mr-2 text-[#2D705C]" />
                    Campus Maintenance Log
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E6DFD1] text-[10px] text-[#60706B]">
                Permission-filtered based on your active role.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 5. METRIC PROVENANCE MODAL (REDUCED VISUAL NOISE)    */}
      {/* ==================================================== */}
      <Modal
        isOpen={isProvenanceModalOpen}
        onClose={() => setIsProvenanceModalOpen(false)}
        title="Metric Provenance & Capability Classification"
        subtitle="Source Authority Order: Client Evidence → Approved Requirements → Master Client Context → Architecture Decisions → Proposed Extensions"
        size="lg"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FBF8EF] border border-[#E6DFD1] text-[#102625] leading-relaxed">
            <strong className="text-[#0B2F29]">Product Interpretation Statement:</strong> We are translating the client's stated educational and operating model into a multi-centre education operating system. This is our product architecture interpretation, not a verbatim client claim.
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E6DFD1] rounded-xl overflow-hidden">
              <thead className="bg-[#F4EEDC] text-[10px] uppercase font-mono text-[#0B2F29]">
                <tr>
                  <th className="p-2.5">Metric / Capability</th>
                  <th className="p-2.5">Classification</th>
                  <th className="p-2.5">Data Source</th>
                  <th className="p-2.5">Scope</th>
                  <th className="p-2.5">Validation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DFD1] bg-white">
                {METRIC_PROVENANCE.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#FBF8EF]">
                    <td className="p-2.5 font-semibold text-[#0B2F29]">{p.metric}</td>
                    <td className="p-2.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        p.classification === '[SOURCE]' ? 'bg-[#F4EEDC] text-[#0B2F29] border border-[#DFC679]' :
                        p.classification === '[ENABLER]' ? 'bg-[#2D705C]/10 text-[#154E42] border border-[#2D705C]/30' :
                        'bg-[#5D27E8]/10 text-[#5D27E8] border border-[#5D27E8]/30'
                      }`}>
                        {p.classification}
                      </span>
                    </td>
                    <td className="p-2.5 text-[#60706B] font-mono text-[11px]">{p.dataSource}</td>
                    <td className="p-2.5 text-[#102625]">{p.scope}</td>
                    <td className="p-2.5 text-[#60706B] text-[11px]">{p.validationStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-[#60706B] italic">
            * Every capability is categorized: [SOURCE] = directly from client documents; [ENABLER] = technically required; [PROPOSED] = recommended extension subject to validation.
          </div>
        </div>
      </Modal>
    </div>
  );
}
