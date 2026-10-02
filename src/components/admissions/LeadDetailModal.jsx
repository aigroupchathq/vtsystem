// VEDIC TREE OS — Lead 360 Detail & Timeline Modal
import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  GraduationCap, 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  Send, 
  FileText, 
  MessageSquare, 
  UserCheck, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AdmissionsService, PIPELINE_STAGES } from '../../modules/admissions/admissions.service.js';
import { CommunicationService } from '../../modules/communication/communication.service.js';

export default function LeadDetailModal({
  isOpen,
  onClose,
  tenantContext,
  leadId,
  onOpenScheduleVisit,
  onOpenAssessment,
  onOpenConvertStudent,
  onShowToast,
  onRefresh
}) {
  const [activeTab, setActiveTab] = useState('timeline');
  const [newNote, setNewNote] = useState('');
  const [whatsAppText, setWhatsAppText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !leadId) return null;

  let leadDetail;
  try {
    leadDetail = AdmissionsService.getLeadDetail(tenantContext, leadId);
  } catch (err) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl p-6 text-white max-w-md">
          <p className="text-sm text-rose-400">Error loading lead: {err.message}</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-xs">Close</button>
        </div>
      </div>
    );
  }

  const { lead, timeline, followUps, visits, applications, communicationLogs } = leadDetail;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setIsSubmitting(true);
      AdmissionsService.recordCounsellingNotes(tenantContext, lead.id, newNote);
      setNewNote('');
      setIsSubmitting(false);
      if (onShowToast) onShowToast('Counselling note logged to timeline!');
      if (onRefresh) onRefresh();
    } catch (err) {
      setIsSubmitting(false);
      alert(err.message);
    }
  };

  const handleStageChange = (newStage) => {
    try {
      AdmissionsService.advanceStage(tenantContext, lead.id, newStage, `Advanced from Lead 360 workspace to ${newStage}`);
      if (onShowToast) onShowToast(`Lead stage updated to ${newStage}`);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSendDirectWhatsApp = (e) => {
    e.preventDefault();
    if (!whatsAppText.trim()) return;

    try {
      CommunicationService.sendDirectMessage(tenantContext, {
        leadId: lead.id,
        recipientPhone: lead.phone,
        recipientName: lead.guardianName,
        text: whatsAppText
      });
      setWhatsAppText('');
      if (onShowToast) onShowToast('WhatsApp message dispatched!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleIssueOffer = () => {
    try {
      const activeApp = applications[0];
      if (!activeApp) {
        alert('Please create a formal application before issuing an offer.');
        return;
      }
      AdmissionsService.issueAdmissionOffer(tenantContext, lead.id, activeApp.id, {
        offeredGradeId: lead.targetGrade
      });
      if (onShowToast) onShowToast('Official Admission Offer generated and WhatsApp notice sent!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-[#131D31] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
              {lead.studentName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{lead.studentName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  {lead.stage}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300">
                  {lead.targetGrade}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span>Parent: <strong className="text-slate-200">{lead.guardianName}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" /> {lead.phone}</span>
                <span>•</span>
                <span>Source: <strong className="text-slate-200">{lead.leadSource}</strong></span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStageChange('LOST')}
              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-semibold transition"
            >
              Mark Lost
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pipeline Progression Ribbon */}
        <div className="bg-[#0B132B] px-6 py-2.5 border-b border-slate-800 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
          {PIPELINE_STAGES.map((stg, idx) => {
            const isCurrent = lead.stage === stg;
            const isPassed = PIPELINE_STAGES.indexOf(lead.stage) >= idx;
            return (
              <button
                key={stg}
                onClick={() => handleStageChange(stg)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition whitespace-nowrap ${
                  isCurrent 
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' 
                    : isPassed 
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-slate-900/60 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>{stg}</span>
                {idx < PIPELINE_STAGES.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-600 opacity-60 ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Tabs */}
        <div className="flex border-b border-slate-800 bg-[#0F172A] px-6">
          {[
            { id: 'timeline', label: 'Timeline & Interactions', count: timeline.length },
            { id: 'actions', label: 'Quick Operations', count: null },
            { id: 'whatsapp', label: 'WhatsApp Logs', count: communicationLogs.length },
            { id: 'applications', label: 'Application & Docs', count: applications.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              {/* Note / Call Input */}
              <form onSubmit={handleAddNote} className="bg-[#131D31] border border-[#24324D] rounded-xl p-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Log counselling note, parent phone callback, or meeting summary..."
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-1 text-xs text-white focus:outline-none placeholder-slate-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newNote.trim()}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition disabled:opacity-40"
                >
                  Log Note
                </button>
              </form>

              {/* Chronological Timeline */}
              <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                {timeline.map((evt) => (
                  <div key={evt.id} className="relative flex items-start gap-4 ml-1">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs text-emerald-400 z-10 shrink-0">
                      •
                    </div>
                    <div className="flex-1 bg-[#131D31] border border-[#24324D] rounded-xl p-3 shadow-sm">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{evt.title}</span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(evt.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                      </div>
                      {evt.description && (
                        <p className="text-xs text-slate-300 mt-1">{evt.description}</p>
                      )}
                      <p className="text-[10px] text-slate-500 mt-2">Author: {evt.authorName || 'System'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Action 1: Schedule Visit */}
              <div className="bg-[#131D31] border border-[#24324D] rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Campus Discovery Tour</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Schedule an in-person walkthrough of classrooms, experiential labs, and sports arenas.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenScheduleVisit(lead);
                  }}
                  className="mt-4 w-full py-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 rounded-xl text-xs font-bold transition"
                >
                  Schedule Campus Tour
                </button>
              </div>

              {/* Action 2: Record Assessment */}
              <div className="bg-[#131D31] border border-[#24324D] rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <Award className="w-4 h-4" />
                    <span>Entrance Assessment</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Record evaluation scores for Math, English, and Logical Aptitude with faculty recommendation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const activeApp = applications[0] || AdmissionsService.submitApplication(tenantContext, lead.id, {
                      targetGrade: lead.targetGrade
                    });
                    onClose();
                    onOpenAssessment(lead, activeApp);
                  }}
                  className="mt-4 w-full py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold transition"
                >
                  Evaluate Assessment
                </button>
              </div>

              {/* Action 3: Issue Offer Letter */}
              <div className="bg-[#131D31] border border-[#24324D] rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                    <FileText className="w-4 h-4" />
                    <span>Generate Admission Offer</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Issue formal seat offer letter with validity window and instant WhatsApp link.
                  </p>
                </div>
                <button
                  onClick={handleIssueOffer}
                  className="mt-4 w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-bold transition"
                >
                  Issue Offer Letter
                </button>
              </div>

              {/* Action 4: Confirm Admission & Convert to Student */}
              <div className="bg-[#131D31] border border-[#24324D] rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <UserCheck className="w-4 h-4" />
                    <span>Fee Clearance & Student Core</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Clear admission fee and onboard candidate directly into Student Core with section allocation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const activeApp = applications[0] || AdmissionsService.submitApplication(tenantContext, lead.id, {
                      targetGrade: lead.targetGrade
                    });
                    onClose();
                    onOpenConvertStudent(lead, activeApp);
                  }}
                  className="mt-4 w-full py-2 bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition"
                >
                  Confirm Fee & Convert to Student
                </button>
              </div>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div className="space-y-4">
              <form onSubmit={handleSendDirectWhatsApp} className="bg-[#131D31] border border-[#24324D] rounded-xl p-3 flex gap-2">
                <input
                  type="text"
                  placeholder={`Send direct WhatsApp message to ${lead.phone}...`}
                  value={whatsAppText}
                  onChange={e => setWhatsAppText(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-1 text-xs text-white focus:outline-none placeholder-slate-500"
                />
                <button
                  type="submit"
                  disabled={!whatsAppText.trim()}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </form>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300">Message Dispatch Ledger</h4>
                {communicationLogs.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3">No messages logged yet.</p>
                ) : (
                  communicationLogs.map(log => (
                    <div key={log.id} className="bg-[#131D31] border border-[#24324D] rounded-xl p-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-400">WhatsApp ({log.provider})</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                          {log.status}
                        </span>
                      </div>
                      <p className="text-slate-300 mt-1">{log.messageContent}</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        To: {log.recipientPhone} • {new Date(log.sentAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-4">
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-400">No formal application registered for this lead yet.</p>
                  <button
                    onClick={() => {
                      AdmissionsService.submitApplication(tenantContext, lead.id, {
                        targetGrade: lead.targetGrade
                      });
                      if (onRefresh) onRefresh();
                    }}
                    className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Register Application Now
                  </button>
                </div>
              ) : (
                applications.map(app => (
                  <div key={app.id} className="bg-[#131D31] border border-[#24324D] rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{app.applicationNumber}</h4>
                        <p className="text-xs text-slate-400">Previous School: {app.previousSchool || 'None specified'}</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400">
                        {app.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 grid grid-cols-2 gap-2 bg-[#0F172A] p-2.5 rounded-lg">
                      <div>Gender: <strong>{app.candidateGender || 'N/A'}</strong></div>
                      <div>Emergency Contact: <strong>{app.emergencyPhone || lead.phone}</strong></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
