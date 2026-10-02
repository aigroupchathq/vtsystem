import React, { useState } from 'react';
import { 
  Activity, 
  Terminal, 
  CheckCircle2, 
  Play, 
  RefreshCw,
  ShieldCheck, 
  Zap, 
  ChevronRight,
  TrendingUp,
  Layers
} from 'lucide-react';

export default function ControlRoom({ 
  preset, 
  logs, 
  isLoopRunning, 
  onTriggerIteration, 
  onNavigateTab,
  stats
}) {
  const [filterLevel, setFilterLevel] = useState('ALL');

  const filteredLogs = filterLevel === 'ALL' 
    ? logs 
    : logs.filter(l => l.level === filterLevel);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* 1st Level Visual Priority: The Hero Workstation */}
      <div className="studio-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b2c] border border-[#232c46] text-[#00f2fe] text-xs font-mono font-medium">
              <span className={`w-2 h-2 rounded-full ${isLoopRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              {isLoopRunning ? 'Autonomous Engine Running' : 'Engine Ready'} • {preset.name}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              BRAMHA SaaS Production Foundry
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Synthesizing <strong className="text-white">GSD boundary specs</strong>, 
              the <strong className="text-white">Ralph fresh-context loop</strong>, and 
              <strong className="text-white"> CodeRabbit verification gates</strong> into a continuous autonomous pipeline.
            </p>
          </div>

          {/* Hero Action: The ONE Most Obvious Thing */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onTriggerIteration}
              className="btn-primary flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-bold shadow-lg"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Run Next Engine Cycle</span>
            </button>
          </div>

        </div>

        {/* 2nd Level Visual Priority: Key Health Metrics (High-Contrast, No Clutter) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#1c2236]">
          <div className="p-4 rounded-xl bg-[#0c0e17] border border-[#1a1f33] space-y-1">
            <span className="text-xs font-medium text-slate-400">Total Iterations (n)</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{stats.iterations}</div>
            <span className="text-xs text-emerald-400 font-medium">↑ Fresh context runs</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e17] border border-[#1a1f33] space-y-1">
            <span className="text-xs font-medium text-slate-400">Breakthrough Chance</span>
            <div className="text-2xl sm:text-3xl font-black text-[#00f2fe] font-mono">{stats.breakthroughP}%</div>
            <span className="text-xs text-slate-400 font-medium">1 - (1-p)ⁿ statistical model</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e17] border border-[#1a1f33] space-y-1">
            <span className="text-xs font-medium text-slate-400">Friction Averted</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{stats.channelsAverted}</div>
            <span className="text-xs text-slate-400 font-medium">Coordination channels = 0</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e17] border border-[#1a1f33] space-y-1">
            <span className="text-xs font-medium text-slate-400">Green Test Gate</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{stats.greenRate}%</div>
            <span className="text-xs text-emerald-400 font-medium">Passed test suites</span>
          </div>
        </div>

      </div>

      {/* 3rd Level Visual Priority: 4-Stage Architectural Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stage 1 */}
        <div 
          onClick={() => onNavigateTab('gsd')}
          className="studio-card p-5 cursor-pointer hover:border-[#00f2fe]/40 transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#161a29] text-slate-300 border border-[#232a40]">
              STAGE 01
            </span>
            <Layers className="w-4 h-4 text-[#00f2fe]" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-[#00f2fe] transition-colors">
            GSD Spec Compiler
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Locks PRDs, Prisma schemas, and atomic task graphs to eliminate context rot.
          </p>
          <div className="pt-2 text-xs text-[#00f2fe] font-semibold flex items-center gap-1">
            <span>View {preset.tasks.length} atomic tasks</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Stage 2 */}
        <div 
          onClick={() => onNavigateTab('ralph')}
          className="studio-card p-5 cursor-pointer hover:border-[#00f2fe]/40 transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#161a29] text-slate-300 border border-[#232a40]">
              STAGE 02
            </span>
            <RefreshCw className={`w-4 h-4 text-amber-400 ${isLoopRunning ? 'animate-spin' : ''}`} />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-[#00f2fe] transition-colors">
            Ralph Loop Runner
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Executes fresh-context iterations, runs unit tests, and self-heals regressions.
          </p>
          <div className="pt-2 text-xs text-[#00f2fe] font-semibold flex items-center gap-1">
            <span>Open live runner</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Stage 3 */}
        <div className="studio-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#161a29] text-slate-300 border border-[#232a40]">
              STAGE 03
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-sm font-bold text-white">
            CodeRabbit Quality Gate
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automated AST diff review auditing tenant isolation, auth, and secrets before merge.
          </p>
          <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Policy Compliant</span>
          </div>
        </div>

        {/* Stage 4 */}
        <div 
          onClick={() => onNavigateTab('marketing')}
          className="studio-card p-5 cursor-pointer hover:border-[#00f2fe]/40 transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#161a29] text-slate-300 border border-[#232a40]">
              STAGE 04
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-[#00f2fe] transition-colors">
            Growth & Distribution
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Programmatic SEO generation, viral referral loops, and churn deflection.
          </p>
          <div className="pt-2 text-xs text-[#00f2fe] font-semibold flex items-center gap-1">
            <span>{preset.seoMatrix.generatedCount} Routes ready</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Main Bottom Section: Live Output Stream */}
      <div className="studio-card overflow-hidden">
        
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 bg-[#0c0e17] border-b border-[#1c2236] gap-3">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-[#00f2fe]" />
            <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Live Engine Output Stream
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#151928] text-slate-400 border border-[#20273f]">
              PID: 4092
            </span>
          </div>

          {/* Clear, Accessible Filter Buttons */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            {['ALL', 'RALPH', 'TEST', 'GATE', 'GROWTH'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  filterLevel === lvl 
                    ? 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#141724]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Body with strict high-contrast font colors */}
        <div className="p-5 max-h-[380px] overflow-y-auto font-mono text-xs space-y-2.5 bg-[#07080d]">
          {filteredLogs.map((log, idx) => {
            const badgeClasses = {
              SYS: 'text-slate-300 bg-[#161a29] border-[#22293e]',
              GSD: 'text-indigo-300 bg-indigo-950/60 border-indigo-800',
              RALPH: 'text-amber-300 bg-amber-950/60 border-amber-800',
              ARCH: 'text-sky-300 bg-sky-950/60 border-sky-800',
              CODE: 'text-emerald-300 bg-emerald-950/60 border-emerald-800',
              TEST: 'text-fuchsia-300 bg-fuchsia-950/60 border-fuchsia-800',
              GATE: 'text-cyan-300 bg-cyan-950/60 border-cyan-800',
              GIT: 'text-emerald-300 bg-emerald-950/60 border-emerald-800',
              GROWTH: 'text-teal-300 bg-teal-950/60 border-teal-800'
            };

            return (
              <div key={idx} className="flex items-start gap-3 py-0.5 hover:bg-white/[0.02] rounded px-1.5">
                <span className="text-slate-500 text-[11px] shrink-0">
                  {log.time}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${badgeClasses[log.level] || 'text-slate-400'}`}>
                  {log.level}
                </span>
                <span className="text-slate-200 leading-relaxed break-all">
                  {log.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Terminal Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#0c0e17] border-t border-[#1c2236] text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Context: 0% Memory Decay</span>
          </div>

          <button
            onClick={onTriggerIteration}
            className="text-xs font-semibold text-[#00f2fe] hover:text-white transition-colors font-mono flex items-center gap-1.5"
          >
            <span>Execute 1 Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
