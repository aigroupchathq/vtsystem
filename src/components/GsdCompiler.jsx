import React, { useState } from 'react';
import { 
  Layers, 
  FileText, 
  Database, 
  CheckSquare, 
  Sparkles, 
  Copy, 
  Check, 
  Play,
  Clock,
  HelpCircle
} from 'lucide-react';

export default function GsdCompiler({ 
  preset, 
  onPushToRalph, 
  onCompileSpec 
}) {
  const [activeSubTab, setActiveSubTab] = useState('prd');
  const [promptInput, setPromptInput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCompile = () => {
    if (!promptInput.trim()) return;
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      onCompileSpec(promptInput);
      setPromptInput('');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto z-10 relative">
      {/* Under Development Notice */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
        <span className="text-amber-300/90">
          <strong className="text-amber-300">Under Development</strong> — Blueprint Compiler engine module is being built. 
          The interface demonstrates the intended workflow. 
          <button className="underline ml-1 hover:text-white transition-colors" onClick={() => window.dispatchEvent && null}>
            Learn about the concept →
          </button>
        </span>
      </div>


      {/* 1st Level: The Main Goal (Clear & Welcoming) */}
      <div className="mono-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-300">
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>PHASE 1: Thought → Blueprint (The Specification)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Turn Rough Ideas into a Rock-Solid Plan
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              When people build with standard AI, it often forgets instructions or writes conflicting code. 
              Here, we freeze your idea into a <strong className="text-white">clear checklist</strong> first, 
              so the auto-builder can finish without ever getting lost.
            </p>
          </div>

          <button
            onClick={() => onPushToRalph(preset.tasks)}
            className="btn-mono-primary flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Send Tasks to Auto-Builder →</span>
          </button>
        </div>

        {/* Input Sandbox */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
            Type Your Idea (Or Try a Suggestion):
          </label>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Build an AI invoice checker for freelancers with Stripe payments..."
              className="flex-1 bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white min-h-[46px]"
            />
            <button
              onClick={handleRunCompile}
              disabled={isCompiling || !promptInput.trim()}
              className="btn-mono-secondary flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold disabled:opacity-40 shrink-0"
            >
              {isCompiling ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Building Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Generate Plan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2nd Level: The Generated Documents (With Plain Explanations) */}
      <div className="mono-card overflow-hidden">
        
        {/* Document Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-zinc-950/80 border-b border-white/10 gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveSubTab('prd')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all min-h-[40px] ${
                activeSubTab === 'prd'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>1. Product Blueprint (.md)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('schema')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all min-h-[40px] ${
                activeSubTab === 'schema'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>2. Database Structure (.prisma)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('tasks')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all min-h-[40px] ${
                activeSubTab === 'tasks'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>3. Task Checklist ({preset.tasks.length} items)</span>
            </button>
          </div>

          <button
            onClick={() => handleCopy(
              activeSubTab === 'prd' 
                ? preset.prd 
                : activeSubTab === 'schema' 
                  ? preset.schema 
                  : JSON.stringify(preset.tasks, null, 2)
            )}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-mono py-1.5 px-3 rounded-lg hover:bg-white/10 transition-colors self-end sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Document</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="p-6 max-h-[500px] overflow-y-auto font-mono text-xs leading-relaxed bg-black/60">
          {activeSubTab === 'prd' && (
            <div className="prose prose-invert max-w-none font-sans text-zinc-200 whitespace-pre-wrap leading-relaxed text-sm">
              {preset.prd}
            </div>
          )}

          {activeSubTab === 'schema' && (
            <pre className="text-zinc-200 overflow-x-auto whitespace-pre font-mono leading-relaxed">
              {preset.schema}
            </pre>
          )}

          {activeSubTab === 'tasks' && (
            <div className="space-y-3 font-sans">
              <div className="text-xs text-zinc-400 font-mono pb-2 border-b border-white/10 flex justify-between items-center">
                <span>Checklist for the Auto-Builder (Completed one by one)</span>
                <span>Verification standard: 100% Tests Pass</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {preset.tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="p-4 rounded-xl border border-white/10 bg-zinc-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-zinc-900 border border-white/15 text-white shrink-0">
                        {task.id}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-zinc-400 mt-1 font-mono">
                          <span>Role: <strong className="text-zinc-200">{task.mode}</strong></span>
                          <span>Tests: <strong className="text-white">{task.tests}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto font-mono text-xs">
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {task.duration}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${
                        task.status === 'done'
                          ? 'bg-white/10 text-white border border-white/30'
                          : task.status === 'in-progress'
                            ? 'bg-zinc-800 text-zinc-200 border border-zinc-600'
                            : 'bg-black text-zinc-500 border border-zinc-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
