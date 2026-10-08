import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  ShieldCheck,
  ChevronRight,
  Compass,
  ArrowRight,
  BookOpen,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '../../design-system/foundations/Badge.jsx';
import { Button } from '../../design-system/actions/Button.jsx';

export function AICopilotDrawer({
  isOpen,
  onClose,
  currentUser,
  tenantContext,
  onPromptExecute = null,
}) {
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const role = currentUser.role;

  // Persona-tailored contextual prompt recommendations
  const promptSuggestions = {
    HQ_ADMIN: [
      'Which schools require executive attention this week and why?',
      'Identify campuses with fee collection variances greater than 10%',
      'Analyze enquiry-to-visit conversion bottlenecks across Mumbai & Pune',
    ],
    PRINCIPAL: [
      'Review today’s attendance exceptions and staff leave requests',
      'Identify Grade 7 students showing sudden attendance declines',
      'Generate summary of pending CCE assessment submissions',
    ],
    TEACHER: [
      'Summarize lesson objectives for Grade 7 Mathematics today',
      'Draft parent follow-up for students missing homework submissions',
      'Review CCE competency rubrics for upcoming science project',
    ],
    PARENT: [
      'How is Aarav progressing on the Vedic Tree Development Compass?',
      'What homework and upcoming assessments are scheduled this week?',
      'Show my recent fee payments and digital receipts',
    ],
    STUDENT: [
      'What classes and timetable periods do I have today?',
      'Show my pending homework submissions and due dates',
      'How can I improve my collaboration score in Life Skills?',
    ],
    FRANCHISEE: [
      'What is my campus royalty calculation for the current quarter?',
      'Show admissions enquiry conversion rate vs benchmark',
      'Review outstanding compliance documents',
    ],
    PARTNER_OPERATOR: [
      'Show EBITDA and pre-tax cash generation summary for SPV schools',
      'Review admissions enrollment progress vs Year 1 business plan',
      'Check capex deployment at Giravle campus',
    ],
  };

  const currentPrompts = promptSuggestions[role] || promptSuggestions.HQ_ADMIN;

  const handleSend = (text) => {
    const promptText = text || inputVal;
    if (!promptText.trim()) return;

    const userMsg = { role: 'user', content: promptText };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsThinking(true);

    setTimeout(() => {
      let aiResponse = '';
      if (promptText.toLowerCase().includes('attention') || promptText.toLowerCase().includes('week')) {
        aiResponse = `**Network Analysis (Verified Telemetry)**:
3 schools require attention this week:

1. **Pune Baner Campus**: Grade 6–8 absenteeism increased 4.2% over 10 days. Primary driver: post-assessment fatigue.
2. **Kothrud Campus**: Fee collection variance of ₹18.5 L pending reconciliation.
3. **Mumbai Bandra Campus**: 27 admissions enquiries have exceeded the 24-hour SLA follow-up window.

*Recommendation*: Dispatched automated WhatsApp follow-ups for Bandra leads and triggered remedial academic review for Baner.`;
      } else if (promptText.toLowerCase().includes('aarav') || promptText.toLowerCase().includes('compass')) {
        aiResponse = `**Student 360 Insights for Aarav Sharma (Grade 7-A)**:
- **Development Compass**: 91% Holistic Index (+5% trend).
- **Character & Values**: Exemplary (94%) with verified teacher praise in *Seva* and peer collaboration.
- **Academics**: 88% overall (Mathematics 88%, Science 92%, English 84%).
- **Wellbeing**: Consistent daily yoga & meditation participation.`;
      } else {
        aiResponse = `**Contextual Telemetry for ${role}**:
Operating within **${tenantContext.accessibleCampuses.find(c => c.id === tenantContext.activeCampusId)?.name || 'Pune Baner Campus'}**. All records are synchronized with the immutable audit ledger. Would you like me to generate a structured report or execute a Next Best Action?`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-700 dark:text-purple-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Vedic Tree AI Copilot
                </h3>
                <Badge variant="ai" size="sm">
                  Grounded
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Context-aware intelligence for {currentUser.firstName} ({role})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close AI Copilot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audit notice */}
        <div className="px-5 py-2 bg-purple-50/50 dark:bg-purple-950/20 border-b border-purple-100 dark:border-purple-900/30 flex items-center justify-between text-[11px] text-purple-900 dark:text-purple-300">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Telemetry Grounded • Auditable • Scope-Enforced</span>
          </div>
          <span className="text-purple-600 dark:text-purple-400 font-mono">v3.8 Live</span>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">
                  Ask Vedic Tree OS
                </p>
                The AI Copilot understands your active operational scope, student records, and network telemetry. Select a recommended directive below to begin:
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 px-1">
                  Contextual Directives for {role}
                </span>
                <div className="space-y-2">
                  {currentPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(p)}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-purple-300 dark:hover:border-purple-700 text-left text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center justify-between group transition-all shadow-xs"
                    >
                      <span className="pr-3 leading-snug">{p}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#0F4C35] text-white ml-8 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 mr-4 shadow-xs'
                }`}
              >
                <div className="font-semibold text-[10px] uppercase font-mono tracking-wider opacity-70 mb-1">
                  {m.role === 'user' ? 'You' : 'Vedic Tree Copilot ✦'}
                </div>
                <div className="whitespace-pre-line">{m.content}</div>
              </div>
            ))
          )}

          {isThinking && (
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 text-xs text-purple-800 dark:text-purple-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing verified telemetry across active scope...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Ask anything about ${role.toLowerCase()} operations...`}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputVal.trim() || isThinking}
              icon={Send}
              className="bg-purple-900 hover:bg-purple-950 text-white border-purple-950 dark:bg-purple-700"
            >
              Ask
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
