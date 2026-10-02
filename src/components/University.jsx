import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  GraduationCap, 
  Clock, 
  ChevronRight, 
  Flame, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { UNIVERSITY_MODULES } from '../data/presets';

export default function University({ onNavigateTab }) {
  const [selectedModule, setSelectedModule] = useState(UNIVERSITY_MODULES[0]);
  const [activeBrandTab, setActiveBrandTab] = useState('expansion');

  const brandSectors = [
    {
      sector: 'BRAMHA Core',
      domain: 'Autonomous Software Engine',
      impact: 'Shifts digital production from corporate monopolies to independent creators. Enables solo creators to go from concept to a working first version with unprecedented speed.'
    },
    {
      sector: 'Creation Gateway University',
      domain: 'Independent Education & Guild',
      impact: 'Renders slow, expensive corporate degree mills obsolete. Teaches individuals direct creation, systems design, and rapid invention.'
    },
    {
      sector: 'BRAMHA Earth (AquaVeda)',
      domain: 'Planetary Water & Ecology Intelligence',
      impact: 'Channels developer leverage into physical survival challenges: stopping municipal water loss, precision irrigation, and aquifer recharge.'
    },
    {
      sector: 'BRAMHA Guild & Economy',
      domain: 'Decentralized Micro-Enterprise',
      impact: 'Fosters an economic network of independent operators earning recurring revenue without venture debt or corporate servitude.'
    }
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto z-10 relative">
      
      {/* 1. University Header: Creation Gateway University */}
      <div className="mono-card p-6 sm:p-8 space-y-5 animate-shimmer">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
              Creation Gateway University • Direct Knowledge Sanctum
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Creation Gateway University
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Where the awakened learn to create with pure intention. 
              We de-hypnotize builders from corporate servitude and teach how 
              <strong className="text-white"> BRAMHA transforms thought into code, and code into planetary impact</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black border border-white/20 text-center font-mono space-y-1 shrink-0">
            <div className="text-xs text-zinc-400">Core Axiom:</div>
            <div className="text-lg font-bold text-white tracking-wider">BRAMHA = CREATION</div>
            <div className="text-xs text-zinc-400">Zero Bureaucratic Friction</div>
          </div>
        </div>
      </div>

      {/* 2. The Core Lesson: Demystifying What ANY Company Does */}
      <div className="mono-card p-6 sm:p-8 space-y-6">
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
            The Fundamental Truth
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            What Any Company on Earth Actually Does to Build a Concept
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Whether it is Apple, Stripe, a venture-backed startup, or a corporate enterprise, 
            building software is not magic. Stripped of executive jargon, every company follows the exact same 4 universal phases:
          </p>
        </div>

        {/* The 4 Universal Corporate Steps Demystified (Unified Phase Names) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
          
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-3 select-none">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 tracking-wider select-none">
                PHASE 1
              </span>
              <span className="text-xs text-zinc-500 font-mono">The Specification</span>
            </div>
            <h3 className="text-base font-bold text-white">Thought → Blueprint</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Someone realizes a problem: <em>"Farmers are wasting water"</em> or <em>"Freelancers need easier invoices"</em> and specifies the boundaries.
            </p>
            <div className="text-[11px] text-zinc-400 pt-2.5 mt-2 border-t border-white/10 font-mono">
              <span className="text-zinc-500">Typical Corporate Example:</span> 6 weeks of pitch decks.
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-3 select-none">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 tracking-wider select-none">
                PHASE 2
              </span>
              <span className="text-xs text-zinc-500 font-mono">The Architecture</span>
            </div>
            <h3 className="text-base font-bold text-white">Parts → Code</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Break the blueprint down into atomic parts: <em>User auth, database schema, payment webhooks, and UI states.</em>
            </p>
            <div className="text-[11px] text-zinc-400 pt-2.5 mt-2 border-t border-white/10 font-mono">
              <span className="text-zinc-500">Typical Corporate Example:</span> 4 PMs & Jira backlogs.
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-3 select-none">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 tracking-wider select-none">
                PHASE 3
              </span>
              <span className="text-xs text-zinc-500 font-mono">Verification</span>
            </div>
            <h3 className="text-base font-bold text-white">Testing & Self-Healing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Programmers write functions, verify edge-cases with automated tests, and fix bugs before releasing to real users.
            </p>
            <div className="text-[11px] text-zinc-400 pt-2.5 mt-2 border-t border-white/10 font-mono">
              <span className="text-zinc-500">Typical Corporate Example:</span> 20 developers & 3+ months.
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-3 select-none">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 tracking-wider select-none">
                PHASE 4
              </span>
              <span className="text-xs text-zinc-500 font-mono">Distribution</span>
            </div>
            <h3 className="text-base font-bold text-white">Market & Distribution</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Deploy to edge servers and generate search pages so real human beings discover, adopt, and pay for the software.
            </p>
            <div className="text-[11px] text-zinc-400 pt-2.5 mt-2 border-t border-white/10 font-mono">
              <span className="text-zinc-500">Typical Corporate Example:</span> $50K initial ad spend.
            </div>
          </div>

        </div>

        <div className="text-center pt-2">
          <span className="text-[11px] font-mono text-zinc-500">
            *Note: Corporate comparisons reflect typical enterprise software development benchmarks (e.g., Standish Group CHAOS studies, Stripe Developer Coefficient).
          </span>
        </div>

        {/* The Bramha Acceleration Truth Banner (Toned Down) */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">
              Go from Concept to Working Code Faster
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Bramha streamlines and automates the repetitive engineering steps in Phases 2, 3, and 4. You provide the creative direction and problem-solving intention, while the engine accelerates specification, test verification, and edge deployment.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('gsd')}
            className="btn-mono-primary px-6 py-2.5 text-xs font-bold shrink-0"
          >
            Create Your Blueprint Now →
          </button>
        </div>
      </div>

      {/* 3. Strategic Analysis: BRAMHA's Long-Term Vision for Democratizing Creation */}
      <div className="mono-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase font-bold tracking-widest">
              Vision Statement • Long-Term Aspiration
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Our Vision for Democratizing Creation
            </h2>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
            Aspirational Horizon
          </span>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed max-w-4xl">
          In the historical tradition of technologies that democratized human potential—from the printing press expanding literacy to personal computers decentralizing computing power—our vision is to make software creation accessible to any individual with creative problem-solving skills. BRAMHA aspires to lower the barrier so that independent builders, not just well-funded corporations, have the leverage to create production-grade tools.
        </p>

        {/* Future Brand Expansion Sectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {brandSectors.map((sec, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-black border border-white/10 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">SECTOR 0{idx + 1}</span>
                <h3 className="text-base font-bold text-white">{sec.sector}</h3>
                <div className="text-xs font-mono text-zinc-400">{sec.domain}</div>
              </div>
              <p className="text-xs text-zinc-300 pt-3 border-t border-white/10 leading-relaxed">
                {sec.impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. The Interactive Masterclasses & Curriculum */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Module List */}
        <div className="mono-card p-6 space-y-3">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Creation Gateway Modules
          </h3>

          <div className="space-y-2.5">
            {UNIVERSITY_MODULES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedModule.id === mod.id
                    ? 'bg-white text-black border-white font-bold shadow-lg'
                    : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="text-xs font-mono mb-1">{mod.duration}</div>
                <div className="text-sm font-bold leading-snug">{mod.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Module Lesson View */}
        <div className="lg:col-span-2 mono-card p-6 sm:p-8 space-y-6">
          <div className="space-y-2 pb-4 border-b border-white/10">
            <span className="text-xs font-mono text-zinc-400 uppercase font-bold">
              Active Masterclass
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {selectedModule.title}
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {selectedModule.description}
            </p>
          </div>

          <div className="space-y-4">
            {selectedModule.lessons.map((lesson, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-black border border-white/10 space-y-2 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Principle #{idx + 1}: {lesson.name}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-6">
                  {lesson.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
