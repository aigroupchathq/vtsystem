import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Square, 
  RotateCw, 
  ShieldCheck, 
  GitCommit, 
  Bug, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';

export default function RalphRunner({ 
  tasks, 
  isLoopRunning, 
  toggleLoop, 
  onStepTask, 
  activeTaskIndex,
  onInjectBug
}) {
  const [activeMode, setActiveMode] = useState('Code');
  const [commits, setCommits] = useState([
    { sha: '8f921e0', msg: 'Built database tables and multi-tenant security rules [PASSED]', tests: '5 passed', time: '14m ago' },
    { sha: '4b102a9', msg: 'Built Stripe customer checkout and billing portal [PASSED]', tests: '8 passed', time: '8m ago' },
    { sha: 'd92a10c', msg: 'Built automated search landing page generator [PASSED]', tests: '12 passed', time: '2m ago' }
  ]);

  const activeTask = tasks[activeTaskIndex] || tasks[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto z-10 relative">
      
      {/* 1st Level: The Auto-Builder Hero */}
      <div className="mono-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-white" />
              <span>PHASE 2 & 3: Parts → Code & Testing & Self-Healing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              The Unstoppable Auto-Builder
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Standard AI sessions slow down and forget things as conversations get too long. 
              Our loop restarts with <strong className="text-white">100% fresh memory for every single task</strong>, 
              verifies that tests pass, and saves your progress automatically.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleLoop}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs tracking-wide transition-all min-h-[46px] ${
                isLoopRunning
                  ? 'bg-zinc-800 text-white border border-white/20 hover:bg-zinc-700'
                  : 'btn-mono-primary'
              }`}
            >
              {isLoopRunning ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Builder</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Auto-Builder</span>
                </>
              )}
            </button>

            <button
              onClick={onStepTask}
              disabled={isLoopRunning}
              className="btn-mono-secondary flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold disabled:opacity-40"
              title="Execute a single discrete task"
            >
              <RotateCw className="w-4 h-4 text-zinc-400" />
              <span className="hidden sm:inline">Build 1 Task</span>
            </button>
          </div>
        </div>

        {/* Current Active Task Card */}
        <div className="p-5 rounded-2xl bg-black/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-white font-bold">{activeTask.id}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Context Memory: <strong className="text-white">100% Fresh (Zero Memory Rot)</strong></span>
            </div>
            <h3 className="text-base font-bold text-white">
              {activeTask.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
              isLoopRunning 
                ? 'bg-white/10 text-white border-white/30 animate-pulse'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}>
              {isLoopRunning ? '⚡ Currently Building' : 'Waiting for Click'}
            </span>
          </div>
        </div>

      </div>

      {/* 2nd Level: Mode Separation & Auto-Testing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Testing Sandbox */}
        <div className="lg:col-span-2 mono-card p-6 space-y-6">
          
          {/* Sub-Agent Role Display */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="uppercase font-semibold">Specialized Sub-Agent Roles:</span>
              <span className="text-white">Separation of Duties</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className={`p-4 rounded-xl border transition-all ${
                activeMode === 'Architect' 
                  ? 'bg-zinc-900 border-white text-white'
                  : 'bg-black/40 border-white/10 text-zinc-400'
              }`}>
                <div className="text-xs font-mono font-bold">1. THE PLANNER</div>
                <div className="text-xs text-zinc-400 mt-1">Locks interfaces & data</div>
              </div>

              <div className={`p-4 rounded-xl border transition-all ${
                activeMode === 'Code' 
                  ? 'bg-zinc-900 border-white text-white'
                  : 'bg-black/40 border-white/10 text-zinc-400'
              }`}>
                <div className="text-xs font-mono font-bold">2. THE BUILDER</div>
                <div className="text-xs text-zinc-400 mt-1">Writes code & features</div>
              </div>

              <div className={`p-4 rounded-xl border transition-all ${
                activeMode === 'Debug' 
                  ? 'bg-zinc-900 border-white text-white'
                  : 'bg-black/40 border-white/10 text-zinc-400'
              }`}>
                <div className="text-xs font-mono font-bold">3. THE REPAIRER</div>
                <div className="text-xs text-zinc-400 mt-1">Fixes broken tests</div>
              </div>
            </div>
          </div>

          {/* Test Verification Display */}
          <div className="p-5 rounded-2xl bg-black/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Automated Quality Check
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-white">
                12 of 12 Tests Passing
              </span>
            </div>

            <div className="w-full bg-zinc-900 rounded-full h-2.5 overflow-hidden">
              <div className="bg-white h-2.5 rounded-full w-full" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center font-mono text-xs">
              <div className="p-3 rounded-xl bg-zinc-950 border border-white/10">
                <div className="text-zinc-400">Features Tested</div>
                <div className="font-bold text-white text-sm mt-0.5">32 Verified</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-white/10">
                <div className="text-zinc-400">Payment Tests</div>
                <div className="font-bold text-white text-sm mt-0.5">8 Verified</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-white/10">
                <div className="text-zinc-400">Security Check</div>
                <div className="font-bold text-white text-sm mt-0.5">0 Holes</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-white/10">
                <div className="text-zinc-400">Speed</div>
                <div className="font-bold text-zinc-300 text-sm mt-0.5">420ms</div>
              </div>
            </div>

            {/* Test Auto-Repair Simulation */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-zinc-400">
                Test the self-healing engine right now:
              </span>
              <button
                onClick={onInjectBug}
                className="btn-mono-secondary flex items-center justify-center gap-2 px-4 py-2.5 text-xs text-white"
              >
                <Bug className="w-4 h-4 text-white" />
                <span>Simulate a Bug & Watch It Auto-Heal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Quality Inspection & Verified History */}
        <div className="space-y-6">
          
          {/* Security Gate Box */}
          <div className="mono-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Automated Security Guard
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 font-bold">
                PROTECTED
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/60 border border-white/10">
                <span className="text-zinc-400">Customer Data Privacy</span>
                <span className="text-white font-bold">✓ LOCKED</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/60 border border-white/10">
                <span className="text-zinc-400">Stripe Payment Security</span>
                <span className="text-white font-bold">✓ VERIFIED</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/60 border border-white/10">
                <span className="text-zinc-400">Secret Keys Exposed</span>
                <span className="text-white font-bold">0 LEAKS</span>
              </div>
            </div>
          </div>

          {/* Verified History Stream */}
          <div className="mono-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-white" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Saved Work History
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                Auto-Saved
              </span>
            </div>

            <div className="space-y-3">
              {commits.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{c.sha}</span>
                    <span className="text-zinc-500">{c.time}</span>
                  </div>
                  <div className="text-zinc-300 text-xs leading-snug">
                    {c.msg}
                  </div>
                  <div className="text-xs text-white font-medium pt-0.5">
                    {c.tests}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
