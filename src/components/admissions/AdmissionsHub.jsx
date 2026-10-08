// VEDIC TREE OS — Module 03 Admissions CRM Master Hub
// Transformed into calm, prestigious, editorial education OS visual language (Prompt 06)
// Zero business logic, state, workflow, permission, or content changes.

import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Search, 
  Phone, 
  MessageSquare, 
  Send, 
  ChevronRight, 
  Layers, 
  Calendar,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { AdmissionsService, PIPELINE_STAGES } from '../../modules/admissions/admissions.service.js';
import { CommunicationService } from '../../modules/communication/communication.service.js';
import { db } from '../../database/db.js';

export default function AdmissionsHub({
  tenantContext,
  currentUser,
  onOpenNewLeadModal,
  onOpenScheduleVisitModal,
  onOpenAssessmentModal,
  onOpenConvertStudentModal,
  onOpenLeadDetailModal,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('ALL');
  const [selectedProvider, setSelectedProvider] = useState(() => CommunicationService.activeProviderKey);
  const [testRecipientPhone, setTestRecipientPhone] = useState('+91 98220 12345');
  const [testTemplateId, setTestTemplateId] = useState('tpl_welcome_enquiry');

  const campusId = tenantContext.activeCampusId;
  const leads = db.getLeads(tenantContext, {
    search: searchQuery,
    targetGrade: selectedGradeFilter !== 'ALL' ? selectedGradeFilter : undefined
  });
  const workspace = AdmissionsService.getCounselorWorkspace(tenantContext);
  const visits = db.getCampusVisits(tenantContext);
  const followUps = db.getFollowUps(tenantContext);
  const commLogs = db.getCommunicationLogs(tenantContext);
  const templates = db.getWhatsAppTemplates();

  // Provider Switching Handler (Proves provider-agnostic architecture)
  const handleSwitchProvider = (providerKey) => {
    CommunicationService.setActiveProvider(providerKey);
    setSelectedProvider(providerKey);
    if (onShowToast) onShowToast(`Active communication gateway switched to: ${providerKey}`);
  };

  // Test WhatsApp Dispatch Handler
  const handleTestDispatch = (e) => {
    e.preventDefault();
    try {
      const activeLead = leads[0] || { id: null, guardianName: 'Sample Parent', studentName: 'Sample Student', targetGrade: 'Grade 1' };
      const result = CommunicationService.sendTemplate(tenantContext, {
        leadId: activeLead.id,
        recipientPhone: testRecipientPhone,
        recipientName: activeLead.guardianName,
        templateId: testTemplateId,
        parameters: {
          guardianName: activeLead.guardianName,
          studentName: activeLead.studentName,
          targetGrade: activeLead.targetGrade,
          dateTime: 'Monday at 10:00 AM',
          campusName: 'Pune Baner Campus',
          appNo: 'APP-2026-0099',
          offerNo: 'OFR-2026-0042',
          grade: activeLead.targetGrade,
          validUntil: '2026-10-25',
          receiptNo: 'RCP-2026-9901',
          amount: '35,000',
          link: 'https://vedictree.edu.in/prospectus.pdf'
        }
      });
      if (onShowToast) onShowToast(`WhatsApp test message sent via ${result.provider}! Message ID: ${result.messageId}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAdvanceStageQuick = (lead, nextStage) => {
    try {
      AdmissionsService.advanceStage(tenantContext, lead.id, nextStage, `Quick advanced from Pipeline Kanban`);
      if (onShowToast) onShowToast(`${lead.studentName} advanced to ${nextStage}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Editorial Header Banner */}
      <div className="bg-white border border-[#E6DFD1] rounded-xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#60706B] font-bold">
                Module 03 • Admissions CRM & Enrollment Funnel
              </span>
              <span className="text-[#C49A3A]">•</span>
              <span className="text-[10px] font-mono text-[#2D705C] font-semibold">
                Universal Pipeline
              </span>
            </div>
            <h1 className="text-2xl font-sans font-bold text-[#0B2F29] mt-1 tracking-tight">
              Admissions & Pipeline Operations
            </h1>
            <p className="text-xs text-[#334E47] mt-1 max-w-2xl leading-relaxed">
              10-Stage Candidate Journey: Lead → Enquiry → Counselling → Visit → Application → Assessment → Offer → Admission → Fee → Student. Zero vendor lock-in WhatsApp communication architecture.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenNewLeadModal && onOpenNewLeadModal()}
              className="px-4 py-2 bg-[#0B2F29] hover:bg-[#154E42] text-[#FBF8EF] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#DFC679]" />
              <span>+ New Admission Lead</span>
            </button>
          </div>
        </div>

        {/* 5 Universal Orientation Answers Strip — Editorial Flow */}
        <div className="pt-4 border-t border-[#EFE9DD] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#4A665F] font-bold uppercase tracking-wider">Where Am I:</span>
            <span className="text-[#0B2F29] font-semibold">Admissions Funnel Hub</span>
          </div>
          <span className="text-[#D6CEBF] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#4A665F] font-bold uppercase tracking-wider">What Am I Seeing:</span>
            <span className="text-[#0B2F29] font-semibold">10-Stage Kanban & CRM Leads</span>
          </div>
          <span className="text-[#D6CEBF] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#4A665F] font-bold uppercase tracking-wider">What Matters:</span>
            <span className="text-[#2D705C] font-semibold">{workspace.conversionRate}% Conversion Rate</span>
          </div>
          <span className="text-[#D6CEBF] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#4A665F] font-bold uppercase tracking-wider">What Can I Do:</span>
            <span className="text-[#0B2F29] font-semibold">Counsel, Tour, Assess & Admit</span>
          </div>
          <span className="text-[#D6CEBF] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#4A665F] font-bold uppercase tracking-wider">What Happens Next:</span>
            <span className="text-[#78350F] font-semibold">Auto WhatsApp & SIS Onboard</span>
          </div>
        </div>
      </div>

      {/* Continuous Metric Strip — 4-Column Continuous Surface */}
      <div className="bg-white border border-[#E6DFD1] rounded-xl overflow-hidden grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6DFD1] text-xs">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#334E47]">Total Pipeline Inquiries</span>
            <Users className="w-4 h-4 text-[#2D705C]" />
          </div>
          <p className="text-xl sm:text-2xl font-sans font-bold text-[#0B2F29] mt-1 tabular-nums">{workspace.totalLeads}</p>
          <p className="text-xs text-[#334E47] mt-0.5">Active in admissions funnel</p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#334E47]">Campus Visits Booked</span>
            <MapPin className="w-4 h-4 text-[#C49A3A]" />
          </div>
          <p className="text-xl sm:text-2xl font-sans font-bold text-[#0B2F29] mt-1 tabular-nums">{workspace.scheduledVisitsCount}</p>
          <p className="text-xs text-[#334E47] mt-0.5">Booked discovery tours</p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#334E47]">Counselor Calls Due</span>
            <Phone className="w-4 h-4 text-[#8C6B1C]" />
          </div>
          <p className="text-xl sm:text-2xl font-sans font-bold text-[#0B2F29] mt-1 tabular-nums">{workspace.pendingFollowUpsCount}</p>
          <p className="text-xs text-[#334E47] mt-0.5">Pending parent follow-ups</p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#334E47]">Lead → Student Conversion</span>
            <CheckCircle2 className="w-4 h-4 text-[#2D705C]" />
          </div>
          <p className="text-xl sm:text-2xl font-sans font-bold text-[#0B2F29] mt-1 tabular-nums">{workspace.conversionRate}%</p>
          <p className="text-xs text-[#2D705C] mt-0.5 font-semibold">{workspace.enrolledLeads} students enrolled in Core</p>
        </div>
      </div>

      {/* Navigation Perspective Tabs & Filter Bar */}
      <div className="border-b border-[#E6DFD1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="flex space-x-1 overflow-x-auto">
          {[
            { id: 'pipeline', label: 'Admissions Pipeline (Kanban)', icon: Layers },
            { id: 'directory', label: 'Lead Records & 360 View', icon: Users },
            { id: 'workspace', label: 'Counselor Workspace & Tasks', icon: Clock },
            { id: 'whatsapp', label: 'WhatsApp Architecture & Gateway', icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#0B2F29] text-[#0B2F29] font-bold'
                    : 'border-transparent text-[#60706B] hover:text-[#0B2F29]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0B2F29]' : 'text-[#7E8D88]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 py-1">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#7E8D88] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate, parent, phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-white border border-[#E6DFD1] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#102625] placeholder:text-[#7E8D88] focus:outline-none focus:border-[#0B2F29] focus:ring-1 focus:ring-[#0B2F29] w-48 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* TAB 1: VISUAL PIPELINE (KANBAN) */}
      {activeTab === 'pipeline' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1600px] items-start">
            {PIPELINE_STAGES.map((stage) => {
              const stageLeads = leads.filter(l => l.stage === stage);
              return (
                <div key={stage} className="w-72 bg-white border border-[#E6DFD1] rounded-lg flex flex-col max-h-[720px] overflow-hidden shrink-0">
                  {/* Column Header */}
                  <div className="p-3 border-b border-[#EFE9DD] bg-[#FBF8EF] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2D705C]"></span>
                      <h3 className="text-xs font-sans font-bold text-[#0B2F29] uppercase tracking-wider">{stage}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-sans font-bold bg-[#EFE9DD] text-[#334E47]">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Cards List */}
                  <div className="p-3 space-y-2.5 overflow-y-auto flex-1">
                    {stageLeads.length === 0 ? (
                      <div className="text-center py-8 text-[#7E8D88] text-xs italic">
                        No candidates in this stage
                      </div>
                    ) : (
                      stageLeads.map(lead => (
                        <div 
                          key={lead.id}
                          className="bg-[#FBF8EF]/60 hover:bg-white border border-[#E6DFD1] hover:border-[#DFC679] rounded-md p-3 transition-colors group cursor-default"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 
                                onClick={() => onOpenLeadDetailModal && onOpenLeadDetailModal(lead.id)}
                                className="text-xs font-bold text-[#102625] group-hover:text-[#0B2F29] cursor-pointer transition-colors"
                              >
                                {lead.studentName}
                              </h4>
                              <p className="text-[11px] text-[#60706B] mt-0.5">{lead.guardianName}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              lead.priority === 'HIGH' 
                                ? 'bg-[#E35D52]/10 text-[#E35D52] border border-[#E35D52]/20' 
                                : 'bg-[#EFE9DD] text-[#60706B]'
                            }`}>
                              {lead.priority}
                            </span>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-[#EFE9DD] flex items-center justify-between text-[11px] text-[#60706B]">
                            <span className="px-2 py-0.5 rounded bg-[#F4EEDC] font-semibold text-[#102625] text-[10px]">
                              {lead.targetGrade}
                            </span>
                            <span className="flex items-center gap-1 font-mono text-[10px]">
                              <Phone className="w-3 h-3 text-[#2D705C]" /> {lead.phone}
                            </span>
                          </div>

                          {/* Quick Stage Progression Buttons */}
                          <div className="mt-2.5 pt-2 border-t border-[#EFE9DD] flex items-center justify-between gap-1">
                            <button
                              onClick={() => onOpenLeadDetailModal && onOpenLeadDetailModal(lead.id)}
                              className="text-[10px] text-[#60706B] hover:text-[#0B2F29] font-semibold cursor-pointer transition-colors"
                            >
                              360 Profile
                            </button>
                            {stage !== 'STUDENT' && (
                              <button
                                onClick={() => {
                                  const currentIdx = PIPELINE_STAGES.indexOf(stage);
                                  const nextStage = PIPELINE_STAGES[currentIdx + 1];
                                  if (nextStage) handleAdvanceStageQuick(lead, nextStage);
                                }}
                                className="px-2 py-1 bg-[#F4EEDC] hover:bg-[#EFE9DD] text-[#102625] border border-[#DFC679]/60 rounded-md text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-3 h-3 text-[#C49A3A]" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LEAD RECORDS DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="bg-white border border-[#E6DFD1] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#EFE9DD] bg-[#FBF8EF] flex items-center justify-between">
            <h3 className="text-sm font-sans font-bold text-[#0B2F29]">Admissions Candidate Directory</h3>
            <span className="text-xs text-[#334E47] font-semibold">{leads.length} leads in active campus scope</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#FBF8EF] border-b border-[#E6DFD1] text-[#334E47] uppercase tracking-wider text-xs font-sans font-semibold">
                <tr>
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Parent / Guardian</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Target Grade</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Pipeline Stage</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9DD] text-[#102625]">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-[#FBF8EF]/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#0B2F29]">
                      <button 
                        onClick={() => onOpenLeadDetailModal && onOpenLeadDetailModal(lead.id)}
                        className="hover:underline transition cursor-pointer text-left"
                      >
                        {lead.studentName}
                      </button>
                    </td>
                    <td className="py-3 px-4">{lead.guardianName}</td>
                    <td className="py-3 px-4 text-[#2D705C] font-mono">{lead.phone}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#F4EEDC] text-[#102625] font-semibold text-[11px] border border-[#E6DFD1]">
                        {lead.targetGrade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#60706B]">{lead.leadSource}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2D705C]/10 border border-[#2D705C]/30 text-[#2D705C]">
                        {lead.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.priority === 'HIGH' ? 'bg-[#E35D52]/10 text-[#E35D52]' : 'bg-[#EFE9DD] text-[#60706B]'
                      }`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => onOpenLeadDetailModal && onOpenLeadDetailModal(lead.id)}
                        className="px-2.5 py-1 bg-[#0B2F29] hover:bg-[#154E42] text-[#DFC679] rounded-md text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        View 360
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COUNSELOR WORKSPACE & TOURS */}
      {activeTab === 'workspace' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Pending Follow-ups */}
          <div className="bg-white border border-[#E6DFD1] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DD]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C49A3A]" />
                <h3 className="text-sm font-sans font-bold text-[#0B2F29]">Pending Counselor Tasks & Callbacks</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-sans font-bold bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/50">
                {followUps.filter(f => f.status === 'PENDING').length} pending
              </span>
            </div>

            <div className="space-y-3">
              {followUps.map(fu => {
                const lead = leads.find(l => l.id === fu.leadId);
                return (
                  <div key={fu.id} className="bg-[#FBF8EF]/60 border border-[#E6DFD1] rounded-lg p-3.5 flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#102625]">{fu.title}</p>
                      {lead && (
                        <p className="text-[11px] text-[#60706B] mt-0.5">
                          Candidate: <strong className="text-[#102625]">{lead.studentName}</strong> • {lead.phone}
                        </p>
                      )}
                      <p className="text-[10px] text-[#7E8D88] mt-1 font-mono">
                        Due: {new Date(fu.dueDate).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                      </p>
                    </div>
                    {fu.status === 'PENDING' ? (
                      <button
                        onClick={() => {
                          AdmissionsService.completeFollowUp(tenantContext, fu.id, 'Completed phone callback');
                          if (onShowToast) onShowToast('Follow-up marked completed!');
                        }}
                        className="px-3 py-1 bg-[#0B2F29] hover:bg-[#154E42] text-[#DFC679] rounded-md text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Done
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFE9DD] text-[#60706B]">
                        Completed
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scheduled Campus Tours */}
          <div className="bg-white border border-[#E6DFD1] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DD]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2D705C]" />
                <h3 className="text-sm font-sans font-bold text-[#0B2F29]">Campus Discovery Tours</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-sans font-bold bg-[#F4EEDC] text-[#2D705C] border border-[#DFC679]/50">
                {visits.length} tours booked
              </span>
            </div>

            <div className="space-y-3">
              {visits.map(v => (
                <div key={v.id} className="bg-[#FBF8EF]/60 border border-[#E6DFD1] rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#102625]">{v.visitorName}</h4>
                      <p className="text-[11px] text-[#60706B]">{v.visitorCount} visitors • Contact: {v.phone}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      v.status === 'COMPLETED' ? 'bg-[#2D705C]/10 text-[#2D705C]' : 'bg-[#C49A3A]/15 text-[#8C6B1C]'
                    }`}>
                      {v.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#60706B] flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-[#2D705C]" />
                    <span>{new Date(v.scheduledAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    <span className="text-[#7E8D88] ml-2">Guide: {v.guideName}</span>
                  </p>

                  {v.feedback && (
                    <p className="text-[11px] text-[#60706B] italic bg-[#FBF8EF] p-2 rounded-lg border border-[#E6DFD1]">
                      Feedback: "{v.feedback}" (Rating: {v.rating}/5)
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WHATSAPP ARCHITECTURE & GATEWAY */}
      {activeTab === 'whatsapp' && (
        <div className="space-y-6">
          {/* Provider Selection Card */}
          <div className="bg-white border border-[#E6DFD1] rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EFE9DD]">
              <div>
                <h3 className="text-sm font-sans font-bold text-[#0B2F29] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#2D705C]" />
                  <span>Pluggable Communication Gateway Architecture</span>
                </h3>
                <p className="text-xs text-[#334E47] mt-0.5">
                  Zero vendor lock-in: Switch between Meta Cloud API, Twilio, or Mock Sandbox without touching admissions business logic.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-sans font-bold bg-[#0B2F29] text-[#DFC679] border border-[#C49A3A]/40 shrink-0">
                Active: {selectedProvider}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {[
                { 
                  id: 'MOCK', 
                  title: 'Mock Sandbox Adapter', 
                  desc: 'In-memory test queue with parameter interpolation & event tracking.' 
                },
                { 
                  id: 'META_CLOUD', 
                  title: 'Meta Cloud WhatsApp API', 
                  desc: 'Graph API v18.0 official Cloud API for WhatsApp Business accounts.' 
                },
                { 
                  id: 'TWILIO', 
                  title: 'Twilio WhatsApp Gateway', 
                  desc: 'Enterprise Twilio Programmable Messaging with E.164 routing.' 
                }
              ].map(provider => (
                <div 
                  key={provider.id}
                  onClick={() => handleSwitchProvider(provider.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedProvider === provider.id
                      ? 'bg-[#F4EEDC]/60 border-[#C49A3A]'
                      : 'bg-[#FBF8EF]/60 border-[#E6DFD1] hover:border-[#DFC679]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#102625]">{provider.title}</span>
                    {selectedProvider === provider.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#2D705C]" />
                    )}
                  </div>
                  <p className="text-xs text-[#60706B] mt-2 leading-relaxed">{provider.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Test Dispatch Console & Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Template Directory */}
            <div className="bg-white border border-[#E6DFD1] rounded-xl p-6 space-y-3">
              <div className="pb-3 border-b border-[#EFE9DD]">
                <h3 className="text-sm font-sans font-bold text-[#0B2F29]">Pre-Approved WhatsApp Templates</h3>
                <p className="text-xs text-[#334E47] mt-0.5">Standardized transactional messages across the 10-stage journey</p>
              </div>

              <div className="space-y-3 pt-1">
                {templates.map(tpl => (
                  <div key={tpl.id} className="bg-[#FBF8EF]/60 border border-[#E6DFD1] rounded-lg p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0B2F29]">{tpl.name}</span>
                      <span className="text-[10px] text-[#7E8D88] font-mono">{tpl.id}</span>
                    </div>
                    <p className="text-xs text-[#102625]/85 leading-relaxed">{tpl.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Message Dispatch Stream */}
            <div className="bg-white border border-[#E6DFD1] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DD]">
                <h3 className="text-sm font-sans font-bold text-[#0B2F29]">Dispatch Test Console</h3>
                <span className="text-xs text-[#334E47] font-semibold">{commLogs.length} events logged</span>
              </div>

              <form onSubmit={handleTestDispatch} className="bg-[#FBF8EF] border border-[#E6DFD1] rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#60706B] mb-1">Recipient Phone</label>
                    <input
                      type="text"
                      value={testRecipientPhone}
                      onChange={e => setTestRecipientPhone(e.target.value)}
                      className="w-full bg-white border border-[#E6DFD1] rounded-lg px-2.5 py-1.5 text-xs text-[#102625] focus:outline-none focus:border-[#0B2F29]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#60706B] mb-1">Template</label>
                    <select
                      value={testTemplateId}
                      onChange={e => setTestTemplateId(e.target.value)}
                      className="w-full bg-white border border-[#E6DFD1] rounded-lg px-2.5 py-1.5 text-xs text-[#102625] focus:outline-none focus:border-[#0B2F29]"
                    >
                      {templates.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#0B2F29] hover:bg-[#154E42] text-[#FBF8EF] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#DFC679]" /> Dispatch via {selectedProvider}
                </button>
              </form>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                <h4 className="text-xs font-sans font-bold text-[#0B2F29]">Live Communication Stream</h4>
                {commLogs.map(log => (
                  <div key={log.id} className="bg-[#FBF8EF]/60 border border-[#E6DFD1] rounded-lg p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0B2F29]">WhatsApp ({log.provider})</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EFE9DD] text-[#60706B]">
                        {log.status}
                      </span>
                    </div>
                    <p className="text-[#102625]">{log.messageContent}</p>
                    <p className="text-[10px] text-[#7E8D88] font-mono">
                      To: {log.recipientPhone} ({log.recipientName}) • {new Date(log.sentAt).toLocaleTimeString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
