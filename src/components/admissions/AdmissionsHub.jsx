// VEDIC TREE OS — Module 03 Admissions CRM Master Hub
import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Clock, 
  Search, 
  Phone, 
  MessageSquare, 
  Send, 
  Sparkles, 
  ChevronRight, 
  Layers, 
  Sliders, 
  Calendar,
  AlertTriangle,
  FileText,
  UserCheck,
  CreditCard
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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 5 Universal Orientation Answers Banner */}
      <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                MODULE 03
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Admissions CRM & Enrollment Funnel
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">Admissions & Pipeline Operations</h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              10-Stage Candidate Journey: Lead $\rightarrow$ Enquiry $\rightarrow$ Counselling $\rightarrow$ Visit $\rightarrow$ Application $\rightarrow$ Assessment $\rightarrow$ Offer $\rightarrow$ Admission $\rightarrow$ Fee $\rightarrow$ Student. Zero vendor lock-in WhatsApp communication architecture.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenNewLeadModal && onOpenNewLeadModal()}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40 flex items-center gap-2 transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ New Admission Lead</span>
            </button>
          </div>
        </div>

        {/* 5 Universal Orientation Answers Guide */}
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Where Am I?</span>
            <span className="text-slate-200 font-medium">Admissions Funnel Hub</span>
          </div>
          <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">What Am I Seeing?</span>
            <span className="text-slate-200 font-medium">10-Stage Kanban & CRM Leads</span>
          </div>
          <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">What Matters?</span>
            <span className="text-emerald-400 font-medium">{workspace.conversionRate}% Conversion Rate</span>
          </div>
          <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">What Can I Do?</span>
            <span className="text-slate-200 font-medium">Counsel, Tour, Assess & Admit</span>
          </div>
          <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">What Happens Next?</span>
            <span className="text-amber-300 font-medium">Auto WhatsApp & SIS Onboard</span>
          </div>
        </div>
      </div>

      {/* Metric Cards Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Total Pipeline Inquiries</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">{workspace.totalLeads}</p>
          <p className="text-[11px] text-slate-400 mt-1">Active in admissions funnel</p>
        </div>

        <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Campus Visits Scheduled</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-cyan-400 mt-2">{workspace.scheduledVisitsCount}</p>
          <p className="text-[11px] text-slate-400 mt-1">Booked discovery tours</p>
        </div>

        <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Counselor Calls Due</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Phone className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-400 mt-2">{workspace.pendingFollowUpsCount}</p>
          <p className="text-[11px] text-slate-400 mt-1">Pending parent follow-ups</p>
        </div>

        <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Lead $\rightarrow$ Student Conversion</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-400 mt-2">{workspace.conversionRate}%</p>
          <p className="text-[11px] text-slate-400 mt-1">{workspace.enrolledLeads} students enrolled in Core</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-[#24324D] flex items-center justify-between">
        <div className="flex space-x-1">
          {[
            { id: 'pipeline', label: 'Admissions Pipeline (Kanban)', icon: Layers },
            { id: 'directory', label: 'Lead Records & 360 View', icon: Users },
            { id: 'workspace', label: 'Counselor Workspace & Tasks', icon: Clock },
            { id: 'whatsapp', label: 'WhatsApp Architecture & Gateway', icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 py-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate, parent, phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-[#131D31] border border-[#24324D] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 w-48 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* TAB 1: VISUAL PIPELINE (KANBAN) */}
      {activeTab === 'pipeline' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1600px]">
            {PIPELINE_STAGES.map((stage) => {
              const stageLeads = leads.filter(l => l.stage === stage);
              return (
                <div key={stage} className="w-72 bg-[#131D31] border border-[#24324D] rounded-2xl flex flex-col max-h-[720px] shadow-lg overflow-hidden shrink-0">
                  {/* Column Header */}
                  <div className="p-3.5 border-b border-[#24324D] bg-[#0F172A] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">{stage}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1E293B] text-slate-300">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Cards List */}
                  <div className="p-3 space-y-3 overflow-y-auto flex-1 scrollbar-thin">
                    {stageLeads.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-xs italic">
                        No candidates in this stage
                      </div>
                    ) : (
                      stageLeads.map(lead => (
                        <div 
                          key={lead.id}
                          className="bg-[#0F172A] border border-[#24324D] hover:border-emerald-500/50 rounded-xl p-3.5 shadow-sm transition group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 
                                onClick={() => onOpenLeadDetailModal && onOpenLeadDetailModal(lead.id)}
                                className="text-xs font-bold text-white group-hover:text-emerald-400 cursor-pointer transition"
                              >
                                {lead.studentName}
                              </h4>
                              <p className="text-[11px] text-slate-400 mt-0.5">{lead.guardianName}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              lead.priority === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                            }`}>
                              {lead.priority}
                            </span>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="px-2 py-0.5 rounded-md bg-[#131D31] font-semibold text-slate-300">
                              {lead.targetGrade}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-400" /> {lead.phone}
                            </span>
                          </div>

                          {/* Quick Stage Progression Buttons */}
                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1">
                            <button
                              onClick={() => onOpenLeadDetailModal && onOpenLeadDetailModal(lead.id)}
                              className="text-[10px] text-slate-400 hover:text-white font-semibold"
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
                                className="px-2 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-3 h-3" />
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
        <div className="bg-[#131D31] border border-[#24324D] rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-[#24324D] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Admissions Candidate Directory</h3>
            <span className="text-xs text-slate-400">{leads.length} leads in active campus scope</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F172A] border-b border-[#24324D] text-slate-400 uppercase tracking-wider text-[10px]">
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
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-bold text-white">
                      <button 
                        onClick={() => onOpenLeadDetailModal && onOpenLeadDetailModal(lead.id)}
                        className="hover:text-emerald-400 transition"
                      >
                        {lead.studentName}
                      </button>
                    </td>
                    <td className="py-3 px-4">{lead.guardianName}</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono">{lead.phone}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 font-semibold text-[11px]">
                        {lead.targetGrade}
                      </span>
                    </td>
                    <td className="py-3 px-4">{lead.leadSource}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        {lead.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.priority === 'HIGH' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => onOpenLeadDetailModal && onOpenLeadDetailModal(lead.id)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] font-semibold transition"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Follow-ups */}
          <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Pending Counselor Tasks & Callbacks</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400">
                {followUps.filter(f => f.status === 'PENDING').length} pending
              </span>
            </div>

            <div className="space-y-3">
              {followUps.map(fu => {
                const lead = leads.find(l => l.id === fu.leadId);
                return (
                  <div key={fu.id} className="bg-[#0F172A] border border-[#24324D] rounded-xl p-3.5 flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{fu.title}</p>
                      {lead && (
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Candidate: <strong className="text-slate-200">{lead.studentName}</strong> • {lead.phone}
                        </p>
                      )}
                      <p className="text-[10px] text-slate-500 mt-1">
                        Due: {new Date(fu.dueDate).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                      </p>
                    </div>
                    {fu.status === 'PENDING' ? (
                      <button
                        onClick={() => {
                          AdmissionsService.completeFollowUp(tenantContext, fu.id, 'Completed phone callback');
                          if (onShowToast) onShowToast('Follow-up marked completed!');
                        }}
                        className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs font-bold transition"
                      >
                        Done
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400">
                        Completed
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scheduled Campus Tours */}
          <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Campus Discovery Tours</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400">
                {visits.length} tours booked
              </span>
            </div>

            <div className="space-y-3">
              {visits.map(v => (
                <div key={v.id} className="bg-[#0F172A] border border-[#24324D] rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{v.visitorName}</h4>
                      <p className="text-[11px] text-slate-400">{v.visitorCount} visitors • Contact: {v.phone}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      v.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'
                    }`}>
                      {v.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{new Date(v.scheduledAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    <span className="text-slate-500 ml-2">Guide: {v.guideName}</span>
                  </p>

                  {v.feedback && (
                    <p className="text-[11px] text-slate-400 italic bg-[#131D31] p-2 rounded-lg border border-slate-800">
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
          <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Pluggable Communication Gateway Architecture</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Zero vendor lock-in: Switch between Meta Cloud API, Twilio, or Mock Sandbox without touching admissions business logic.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Active Provider: {selectedProvider}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
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
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedProvider === provider.id
                      ? 'bg-emerald-950/30 border-emerald-500 shadow-md shadow-emerald-950/50'
                      : 'bg-[#0F172A] border-[#24324D] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{provider.title}</span>
                    {selectedProvider === provider.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{provider.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Test Dispatch Console & Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template Directory */}
            <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-5 shadow-xl space-y-3">
              <h3 className="text-sm font-bold text-white">Pre-Approved WhatsApp Templates</h3>
              <p className="text-xs text-slate-400">Standardized transactional messages across the 10-stage journey</p>

              <div className="space-y-3 mt-3">
                {templates.map(tpl => (
                  <div key={tpl.id} className="bg-[#0F172A] border border-[#24324D] rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400">{tpl.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{tpl.id}</span>
                    </div>
                    <p className="text-xs text-slate-300">{tpl.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Message Dispatch Stream */}
            <div className="bg-[#131D31] border border-[#24324D] rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Dispatch Test Console</h3>
                <span className="text-xs text-slate-400">{commLogs.length} events logged</span>
              </div>

              <form onSubmit={handleTestDispatch} className="bg-[#0F172A] border border-[#24324D] rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Recipient Phone</label>
                    <input
                      type="text"
                      value={testRecipientPhone}
                      onChange={e => setTestRecipientPhone(e.target.value)}
                      className="w-full bg-[#131D31] border border-[#24324D] rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Template</label>
                    <select
                      value={testTemplateId}
                      onChange={e => setTestTemplateId(e.target.value)}
                      className="w-full bg-[#131D31] border border-[#24324D] rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      {templates.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch via {selectedProvider}
                </button>
              </form>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                <h4 className="text-xs font-bold text-slate-300">Live Communication Stream</h4>
                {commLogs.map(log => (
                  <div key={log.id} className="bg-[#0F172A] border border-[#24324D] rounded-xl p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400">WhatsApp ({log.provider})</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                        {log.status}
                      </span>
                    </div>
                    <p className="text-slate-300 mt-1">{log.messageContent}</p>
                    <p className="text-[10px] text-slate-500 mt-1">
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
