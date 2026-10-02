import React, { useState } from 'react';
import { 
  BarChart3, 
  Flame, 
  Sparkles,
  Users,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export default function StatisticalLab() {
  const [iterations, setIterations] = useState(65);
  const [singleProb, setSingleProb] = useState(3);
  const [teamSize, setTeamSize] = useState(50);

  const p = singleProb / 100;
  const soloBreakthroughP = (1 - Math.pow(1 - p, iterations)) * 100;
  
  const corpIterations = 6;
  const corpBreakthroughP = (1 - Math.pow(1 - p, corpIterations)) * 100;

  const corpChannels = (teamSize * (teamSize - 1)) / 2;

  return (
    <div className="space-y-6 max-w-7xl mx-auto z-10 relative">
      
      {/* 1st Level: The Solo Advantage Intro */}
      <div className="mono-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-400">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
              The Mathematical Proof
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Why One Person Outpaces A 50-Person Company
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Success is not random luck. When a corporate team wants to ship a feature, they need 
              5 meetings, 3 approvals, and weeks of debate. When you use an automated engine, 
              you can test 70 ideas in the time they take to plan one.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-zinc-200 shrink-0">
            <div className="text-xs text-zinc-400">The Simple Math:</div>
            <div className="text-sm font-bold text-white mt-0.5">More Tries = Guaranteed Win</div>
          </div>
        </div>
      </div>

      {/* 2nd Level: Interactive Comparison Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Box */}
        <div className="mono-card p-6 space-y-6">
          <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Adjust the Scenarios
          </h2>

          {/* Slider 1 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-zinc-300">How many ideas can you test?</span>
              <span className="font-mono font-bold text-white text-sm">{iterations} tries</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
              className="w-full accent-white cursor-pointer"
            />
            <div className="text-xs text-zinc-500 font-mono">
              With our Auto-Builder: ~3 hours per experiment
            </div>
          </div>

          {/* Slider 2 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-zinc-300">Chance each idea succeeds:</span>
              <span className="font-mono font-bold text-white text-sm">{singleProb}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={singleProb}
              onChange={(e) => setSingleProb(Number(e.target.value))}
              className="w-full accent-white cursor-pointer"
            />
            <div className="text-xs text-zinc-500 font-mono">
              Realistic rate for small product experiments
            </div>
          </div>

          {/* Slider 3 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-zinc-300">Corporate Company Size:</span>
              <span className="font-mono font-bold text-white text-sm">{teamSize} people</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-white cursor-pointer"
            />
            <div className="text-xs text-zinc-500 font-mono">
              Creates internal meeting and alignment friction
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="lg:col-span-2 mono-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Side-by-Side Reality
            </h2>
            <span className="text-xs font-mono text-zinc-400">Interactive Simulation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Solo Card */}
            <div className="p-6 rounded-2xl bg-black border border-white/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-black px-2.5 py-0.5 rounded bg-white">
                  YOU + AUTO-BUILDER
                </span>
                <Sparkles className="w-4 h-4 text-white" />
              </div>

              <div>
                <span className="text-xs text-zinc-400 font-mono">Chance of Finding a Winning Product:</span>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
                  {soloBreakthroughP.toFixed(1)}%
                </div>
                <div className="text-xs text-zinc-300 font-mono mt-1">
                  Statistically bound to win ({iterations} tries)
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/10 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Meeting Friction:</span>
                  <span className="text-white font-bold">0 Meetings (Pure Focus)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Time to Test Idea:</span>
                  <span className="text-white font-bold">3 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Monthly Expense:</span>
                  <span className="text-white font-bold">~$40 (Cloud tools)</span>
                </div>
              </div>
            </div>

            {/* Corporate Card */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-zinc-400 px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  TYPICAL EXAMPLE: 50-PERSON CORP
                </span>
                <Users className="w-4 h-4 text-zinc-500" />
              </div>

              <div>
                <span className="text-xs text-zinc-500 font-mono">Chance of Finding a Winning Product:</span>
                <div className="text-3xl sm:text-4xl font-black text-zinc-600 font-mono mt-1">
                  {corpBreakthroughP.toFixed(1)}%
                </div>
                <div className="text-xs text-zinc-500 font-mono mt-1">
                  Typical cadence ({corpIterations} tries/year)
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/10 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Meeting Friction:</span>
                  <span className="text-zinc-400 font-bold">{corpChannels.toLocaleString()} Connections</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Time to Test Idea:</span>
                  <span className="text-zinc-400 font-bold">6 Months (Typical)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Monthly Expense:</span>
                  <span className="text-zinc-400 font-bold">~${(teamSize * 14000).toLocaleString()}/mo</span>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center pt-1">
            <span className="text-[11px] font-mono text-zinc-500">
              *Note: Corporate comparisons reflect typical enterprise software benchmarks (e.g., Standish Group CHAOS studies, Stripe Developer Coefficient).
            </span>
          </div>

          {/* Visual Velocity Bar */}
          <div className="p-5 rounded-xl bg-black border border-white/10 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-300">Your Speed Advantage Over The Corporation:</span>
              <span className="text-white font-bold">
                {((iterations / corpIterations) * (corpChannels || 1) / 10).toFixed(0)}x Faster Leverage
              </span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-white h-3 transition-all duration-300 shadow-md shadow-white/50" 
                style={{ width: `${Math.min(100, Math.max(10, soloBreakthroughP))}%` }} 
              />
            </div>
          </div>

        </div>

      </div>

      {/* Awakening Manifesto Card */}
      <div className="mono-card p-6 sm:p-8 space-y-2 border-l-4 border-l-white">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Flame className="w-4 h-4 text-white" />
          The Final Proof
        </h3>
        <p className="text-sm text-zinc-300 leading-relaxed">
          You don't need investors, you don't need a massive team, and you don't need permission. 
          When you replace messy meetings with an automated engine that writes, tests, and markets for you, 
          the power shifts back into the hands of <strong>one creative individual with pure intention</strong>.
        </p>
      </div>

    </div>
  );
}
