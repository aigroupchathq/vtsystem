import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Lightbulb,
  BookOpen,
  Layers,
  Terminal,
  TrendingUp,
  ShieldCheck,
  Users,
  Zap,
  Globe2,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Clock,
  Sparkles,
  FlaskConical,
  Building2,
  Wrench
} from 'lucide-react';

// ─── Data: The Concept Knowledge Base ───────────────────────────────────────

const CONCEPTS = [
  {
    id: 'what-is-bramha',
    question: 'What is BRAMHA?',
    icon: Sparkles,
    tag: 'Start Here',
    tagColor: 'bg-white text-black',
    summary: 'BRAMHA is a creation engine — a system that turns a rough idea into working software faster than any traditional team.',
    body: `Most people believe building software is complicated, expensive, and only possible for big companies with large teams. That belief is not true — it is the result of an era that is now changing.

BRAMHA is built on a single principle: **every piece of software in the world, from a tiny app to a company like Stripe, follows exactly 4 universal steps** — Thought → Blueprint → Code → Market. Nothing more. Nothing less.

What BRAMHA does is automate the repetitive, time-consuming parts of steps 2, 3, and 4 so that a single focused individual can do what used to require an entire organization.

It is not magic. It is engineering clarity applied at speed.`,
    example: {
      label: 'Simple Analogy',
      text: 'Think of a modern car factory. A human engineer designs the car once. Robots assemble it thousands of times perfectly. BRAMHA is the factory for software — you provide the creative intent, the engine handles the assembly.'
    },
    learnMore: null
  },
  {
    id: 'four-phases',
    question: 'What are the 4 Universal Phases of building anything?',
    icon: Layers,
    tag: 'Core Concept',
    tagColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    summary: 'Every company on Earth — Apple, Stripe, a startup, a solo founder — follows these exact same 4 steps to build software. Understanding this removes all the mystery.',
    body: null,
    phases: [
      {
        number: 1,
        name: 'Thought → Blueprint',
        subtitle: 'The Specification',
        icon: BookOpen,
        plain: 'Someone identifies a problem and writes down exactly what needs to be built — who it is for, what it does, and what "done" looks like.',
        corporate: 'Weeks of meetings, pitch decks, misaligned stakeholders.',
        bramha: 'BRAMHA freezes your rough idea into a precise technical blueprint in minutes — a locked specification the engine can follow without confusion.'
      },
      {
        number: 2,
        name: 'Parts → Code',
        subtitle: 'The Architecture',
        icon: Terminal,
        plain: 'The blueprint is broken into small, specific tasks. Developers (or agents) build each part one at a time — the login system, the database, the payment integration.',
        corporate: 'Teams of 15–20 developers working in parallel, creating coordination overhead and communication debt.',
        bramha: 'BRAMHA spawns a fresh-memory builder for every single task. No coordination debt. No forgetting what was built before.'
      },
      {
        number: 3,
        name: 'Testing & Self-Healing',
        subtitle: 'Verification',
        icon: ShieldCheck,
        plain: 'Every piece of code is checked: does it do exactly what was specified? Does it break under pressure? Are there security holes?',
        corporate: 'Separate QA teams, manual testing stages, bugs that slip into production.',
        bramha: 'BRAMHA runs an automated test crucible for every task. If a bug is found, a repair agent fixes it automatically — often in under 400 milliseconds.'
      },
      {
        number: 4,
        name: 'Market & Distribution',
        subtitle: 'Edge Deployment & Reach',
        icon: TrendingUp,
        plain: 'The finished software is published to the internet so real people can find it, sign up, and pay for it.',
        corporate: '$50,000+ in advertising, a full marketing department, months of brand-building.',
        bramha: 'BRAMHA compiles search-optimized pages and referral systems directly into the codebase at build time — customers find the product through search, not paid ads.'
      }
    ],
    example: null,
    learnMore: null
  },
  {
    id: 'why-solo',
    question: 'Why can one person now outperform a 50-person team?',
    icon: Users,
    tag: 'Key Insight',
    tagColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    summary: 'It is a question of iteration speed, not headcount. The more experiments you can run, the higher your statistical probability of finding a winning product.',
    body: `The old world gave large corporations a structural advantage: they had capital to hire 50 engineers, 5 product managers, and 2 QA leads. A solo creator had none of that.

But that advantage was never about intelligence or creativity — it was purely about **throughput**: how many ideas could be tested per unit of time.

Here is the math: if every product idea has a 3% chance of succeeding in the market, and a corporation tests 6 ideas per year (limited by meetings and approvals), their probability of finding a winning product in a year is roughly 16%.

If a solo creator using an automated engine can test 65 ideas per year (one every ~3 hours of working time), their probability rises to over 85%.

**The automation does not make ideas better. It makes the iteration engine faster.** And a faster iteration engine is the structural advantage that used to belong exclusively to corporations.`,
    example: {
      label: 'Analogy',
      text: 'A chef in a large restaurant kitchen has 20 assistants chopping, plating, and washing up. A chef with a fully automated smart kitchen can produce the same output alone — and experiment with new recipes 10x faster because they are not managing people.'
    },
    learnMore: 'stats'
  },
  {
    id: 'fresh-context',
    question: 'What is "Fresh Context" and why does it matter?',
    icon: FlaskConical,
    tag: 'Technical Insight',
    tagColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    summary: 'Standard AI tools degrade as conversations grow longer — they forget earlier instructions. BRAMHA prevents this by restarting with 100% clean memory for every single task.',
    body: `When you use a standard AI coding tool in a long conversation, something called **context degradation** happens. The AI is holding thousands of lines of previous conversation in its working memory. As that fills up, it starts forgetting earlier instructions, making inconsistent decisions, and writing code that contradicts what it wrote two hours ago.

This is why developers who use AI tools for large projects often report that "it starts well but falls apart halfway through."

BRAMHA solves this with a concept borrowed from professional assembly lines: **task-scoped fresh contexts**. Each task in the build checklist is handed to a completely new agent instance that starts with zero prior conversation — it receives only:
1. The frozen specification (the blueprint)
2. The exact task it needs to complete
3. The test it must pass

This means the 50th task is built with exactly the same quality and precision as the 1st.`,
    example: {
      label: 'Analogy',
      text: 'Imagine a relay race where each runner starts fully rested, with a clear note of exactly what they need to carry and where to run — rather than a marathon runner who is exhausted by mile 20 and has forgotten where the finish line is.'
    },
    learnMore: null
  },
  {
    id: 'creation-gateway-university',
    question: 'What is Creation Gateway University?',
    icon: GraduationCap,
    tag: 'Education',
    tagColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    summary: 'A knowledge sanctum for independent creators. Not a degree program. A direct-transmission curriculum that teaches how software is actually made — without jargon, without corporate gatekeeping.',
    body: `Traditional computer science education was designed for an industrial era: corporations needed thousands of standardized programmers who followed instructions from above. Universities produced what corporations demanded.

Creation Gateway University is built for a different purpose: **to produce independent creators who understand systems, build with precision, and operate without permission from institutions.**

The curriculum is structured around three core truths:

1. **Software is not magical.** It is the mechanical application of 4 universal steps. Once you understand the steps, you can apply them to any problem in any domain.

2. **Clarity beats cleverness.** The most powerful thing a creator can do is freeze their intention into a precise specification before writing a single line of code. This one skill eliminates 80% of the waste in software development.

3. **Machines handle repetition. Humans provide direction.** The role of a creator using BRAMHA is not to write every line of code — it is to define what must be built, verify that it was built correctly, and decide what problem to solve next.

The university teaches these principles through interactive masterclasses, live demonstrations, and guided creation exercises.`,
    example: null,
    learnMore: 'university'
  },
  {
    id: 'automated-testing',
    question: 'Why does automated testing matter so much?',
    icon: ShieldCheck,
    tag: 'Engineering',
    tagColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    summary: 'A test suite is a permanent memory of every decision ever made about how the software should behave. Without it, every change becomes a gamble.',
    body: `Imagine you built a house. You install a front door, and it works perfectly. Three months later, a contractor adds a new window on the second floor. That night, the front door no longer locks properly — because the structural change affected the door frame.

Without a test suite, software breaks the same way. A developer adds a new payment method and accidentally breaks the login screen. Nobody knows until a real customer reports it three days later.

An automated test suite is like a building inspector who checks every door, window, pipe, and electrical circuit every single time anyone changes anything — **automatically, in seconds, before any change goes live.**

BRAMHA writes test specifications alongside every task it builds. The engine does not consider a task complete until all tests pass. This means:
- Bugs are found within seconds of being introduced
- The codebase stays healthy as it grows
- New features cannot accidentally break existing ones

The benchmark for BRAMHA's test crucible is based on the **SWE-bench** standard — the leading academic benchmark for evaluating autonomous software engineering systems.`,
    example: {
      label: 'Real Numbers',
      text: 'In the 42-minute timed demo, BRAMHA ran 22 tests across the full codebase. A simulated concurrent webhook race-condition was injected as a bug. The repair agent identified it, patched the database transaction logic, and re-verified all 22 tests within 380 milliseconds.'
    },
    learnMore: null
  },
  {
    id: 'programmatic-seo',
    question: 'How does the Customer Magnet work without advertising?',
    icon: Globe2,
    tag: 'Distribution',
    tagColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    summary: 'Instead of paying for attention, BRAMHA earns it by generating high-quality, unique search pages for every combination of industry, region, and use-case — built directly into the product at compile time.',
    body: `Traditional digital marketing means paying Google or Meta for every click that brings a potential customer to your product. For a solo creator with limited capital, this is a structural disadvantage.

**Programmatic distribution** takes a fundamentally different approach: it creates useful, search-optimized pages that answer the specific questions your customers are already typing into Google — before they even know your product exists.

For example, if you built a SaaS tool for invoice management, BRAMHA's distribution engine would compile pages like:
- "Invoice management software for freelance photographers in Canada"
- "Automated invoicing for small architecture firms in Germany"
- "Best invoice tool for solo consultants — compliance with UK VAT 2025"

Each page is unique, locally relevant, and answers a real search query. This is called **high-intent organic discovery** — the customer finds you at the exact moment they are looking for a solution.

**Important caveat:** Google's March 2024 Scaled Content Abuse policy penalizes pages that swap city names without providing genuine local value. BRAMHA's engine is designed to inject real local data — regional tax rates, compliance requirements, local case studies — not just template text substitution.`,
    example: {
      label: 'Typical Example',
      text: 'A typical corporate team spends $50,000+ on initial paid advertising to acquire their first 1,000 users. Programmatic distribution, done correctly, can achieve the same reach organically over time — at the cost of server hosting only. (Source: Stripe Developer Coefficient; Standish Group CHAOS)'
    },
    learnMore: 'marketing'
  },
  {
    id: 'bramha-name',
    question: 'What does the name BRAMHA mean?',
    icon: Lightbulb,
    tag: 'Identity',
    tagColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    summary: 'BRAMHA is the principle of creation itself — the force that transforms raw potential into structured, living form. The name was chosen deliberately.',
    body: `In the oldest philosophical traditions of human civilization, **Brahma** represents the creative aspect of consciousness — not a religious figure, but a principle: the capacity to take formless intention and give it precise, structured existence.

This is exactly what the BRAMHA engine does.

A human creator arrives with a formless intention: *"I want to solve this problem for these people."* That intention is formless — it has no structure, no boundaries, no executable specification.

BRAMHA's process gives that intention form:
- Phase 1 freezes intention into a precise technical blueprint (form emerges from formlessness)
- Phase 2 assembles the blueprint into working code (potential becomes actual)
- Phase 3 verifies the creation is sound (integrity is established)
- Phase 4 releases the creation into the world (the creation reaches its purpose)

**The name is not branding. It is a description of the process.**

The typographic wordmark — BRAMHA in uppercase — serves as the sole logo. No religious symbols. No stylized icons. The name itself carries all the meaning it needs.`,
    example: null,
    learnMore: null
  }
];

const DEV_TRACKS = [
  {
    id: 'spec-compiler',
    label: 'Blueprint Compiler',
    phase: 'Phase 1',
    status: 'In Development',
    description: 'Natural-language requirement freezing and deterministic task graph decomposition.',
    eta: 'Active Build'
  },
  {
    id: 'agent-loop',
    label: 'Fresh-Context Agent Orchestrator',
    phase: 'Phase 2',
    status: 'In Development',
    description: 'Sub-agent process boundaries with 100% clean memory per task. Zero context degradation.',
    eta: 'Active Build'
  },
  {
    id: 'test-crucible',
    label: 'Automated Test Crucible',
    phase: 'Phase 3',
    status: 'In Development',
    description: 'Automated unit, E2E, and concurrency fuzzing harness with sub-400ms self-healing.',
    eta: 'Active Build'
  },
  {
    id: 'edge-engine',
    label: 'Edge Distribution Engine',
    phase: 'Phase 4',
    status: 'Planned',
    description: 'Dynamic programmatic search page compiler with local data injection per Google March 2024 guidelines.',
    eta: 'Q1 2027'
  },
  {
    id: 'security-layer',
    label: 'Security & Isolation Layer',
    phase: 'System-wide',
    status: 'Planned',
    description: 'Automated PostgreSQL RLS policies, multi-tenant schema isolation, and secret rotation.',
    eta: 'Q1 2027'
  },
  {
    id: 'university-platform',
    label: 'Creation Gateway University Platform',
    phase: 'Education',
    status: 'Planned',
    description: 'Interactive masterclasses, guided creation exercises, and community knowledge exchange.',
    eta: 'Q2 2027'
  }
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

function PhaseCard({ phase }) {
  const Icon = phase.icon;
  return (
    <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-4 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 tracking-wider select-none">
          PHASE {phase.number}
        </span>
        <Icon className="w-4 h-4 text-zinc-400" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-white">{phase.name}</h3>
        <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{phase.subtitle}</p>
      </div>
      <p className="text-xs text-zinc-300 leading-relaxed">{phase.plain}</p>
      <div className="pt-3 border-t border-white/8 space-y-2">
        <div className="text-[11px] font-mono">
          <span className="text-zinc-500">Typical Corporate Approach: </span>
          <span className="text-zinc-400">{phase.corporate}</span>
        </div>
        <div className="text-[11px] font-mono">
          <span className="text-zinc-400">BRAMHA approach: </span>
          <span className="text-white font-semibold">{phase.bramha}</span>
        </div>
      </div>
    </div>
  );
}

function ConceptCard({ concept, isOpen, onToggle, onNavigate }) {
  const Icon = concept.icon;
  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
      isOpen
        ? 'border-white/25 bg-zinc-950 shadow-xl shadow-black/60'
        : 'border-white/8 bg-black/60 hover:border-white/15'
    }`}>
      {/* Header: always visible — the question */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 flex items-start gap-4"
      >
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
          isOpen ? 'bg-white' : 'bg-white/10'
        }`}>
          <Icon className={`w-4 h-4 ${isOpen ? 'text-black' : 'text-zinc-300'}`} />
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${concept.tagColor}`}>
              {concept.tag}
            </span>
          </div>
          <h3 className={`text-sm sm:text-base font-bold leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>
            {concept.question}
          </h3>
          {!isOpen && (
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
              {concept.summary}
            </p>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Body: revealed on open */}
      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 space-y-5 border-t border-white/10">
          {/* Summary pull-quote */}
          <div className="pt-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <p className="text-sm text-zinc-200 leading-relaxed font-medium">{concept.summary}</p>
          </div>

          {/* 4 phases special layout */}
          {concept.phases && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {concept.phases.map(phase => <PhaseCard key={phase.number} phase={phase} />)}
            </div>
          )}

          {/* Main body text */}
          {concept.body && (
            <div className="prose-custom space-y-3">
              {concept.body.split('\n\n').map((para, i) => {
                // Handle bold markers
                const parts = para.split(/\*\*(.+?)\*\*/g);
                return (
                  <p key={i} className="text-sm text-zinc-300 leading-relaxed">
                    {parts.map((part, j) =>
                      j % 2 === 1
                        ? <strong key={j} className="text-white font-semibold">{part}</strong>
                        : part
                    )}
                  </p>
                );
              })}
            </div>
          )}

          {/* Example callout */}
          {concept.example && (
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-1.5">
              <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                {concept.example.label}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{concept.example.text}</p>
            </div>
          )}

          {/* Navigate CTA */}
          {concept.learnMore && (
            <button
              onClick={() => onNavigate(concept.learnMore)}
              className="flex items-center gap-2 text-xs font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all"
            >
              <span>Explore this in the interactive engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function KnowledgeBase({ onNavigateTab }) {
  const [openConcept, setOpenConcept] = useState('what-is-bramha'); // first open by default
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Concepts' },
    { id: 'Start Here', label: 'Start Here' },
    { id: 'Core Concept', label: 'Core Concept' },
    { id: 'Technical Insight', label: 'Technical' },
    { id: 'Education', label: 'Education' },
    { id: 'Distribution', label: 'Distribution' },
    { id: 'Identity', label: 'Identity' }
  ];

  const filtered = activeFilter === 'all'
    ? CONCEPTS
    : CONCEPTS.filter(c => c.tag === activeFilter);

  return (
    <div className="space-y-10 max-w-4xl mx-auto z-10 relative">

      {/* ── HERO: Plain English Introduction ── */}
      <section className="text-center space-y-5 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/20 text-white text-xs font-mono font-medium tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>BRAMHA • CONCEPT KNOWLEDGE BASE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] max-w-2xl mx-auto">
          Understand before you build.
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Every concept behind BRAMHA — explained in plain English. 
          No jargon. No assumptions. Just clear thinking about how software is really created.
        </p>

        {/* Quick stat row */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          {[
            { label: '8 Concepts', sub: 'Fully explained' },
            { label: '4 Universal Phases', sub: 'Behind all software' },
            { label: '0 Prerequisites', sub: 'Start anywhere' }
          ].map((s, i) => (
            <div key={i} className="px-4 py-2.5 rounded-xl bg-black border border-white/10 text-center">
              <div className="text-sm font-bold text-white font-mono">{s.label}</div>
              <div className="text-[11px] text-zinc-500">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
              activeFilter === f.id
                ? 'bg-white text-black'
                : 'bg-black border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── CONCEPT ACCORDION LIST ── */}
      <div className="space-y-3">
        {filtered.map(concept => (
          <ConceptCard
            key={concept.id}
            concept={concept}
            isOpen={openConcept === concept.id}
            onToggle={() => setOpenConcept(prev => prev === concept.id ? null : concept.id)}
            onNavigate={onNavigateTab}
          />
        ))}
      </div>

      {/* ── PROJECT UNDER DEVELOPMENT SECTION ── */}
      <section className="mono-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                Project Status
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              BRAMHA Engine: Under Active Development
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
              The conceptual foundation is complete and documented above. The autonomous engine modules are being built 
              in parallel — each phase verified against the open-source benchmarks listed in our evidence base.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 font-semibold">Active Build Phase</span>
          </div>
        </div>

        {/* Development Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEV_TRACKS.map(track => (
            <div key={track.id} className="p-4 rounded-xl bg-black border border-white/10 space-y-2.5 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">{track.phase}</div>
                  <h4 className="text-sm font-bold text-white leading-snug">{track.label}</h4>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 mt-0.5 ${
                  track.status === 'In Development'
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                    : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                }`}>
                  {track.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{track.description}</p>
              <div className="text-[11px] font-mono text-zinc-500 pt-1 border-t border-white/8">
                Timeline: <span className="text-zinc-300">{track.eta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Evidence base note */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
          <FlaskConical className="w-4 h-4 text-zinc-400 shrink-0" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every engineering claim in BRAMHA is grounded in published open-source benchmarks and peer-reviewed research — 
            including SWE-bench, Aider, OpenHands, USEPA WNTR, axe-core, and Li et al. (ACM 2025). 
            <button
              onClick={() => onNavigateTab('proof')}
              className="text-white underline underline-offset-2 ml-1 hover:text-zinc-200 transition-colors"
            >
              See the full evidence base →
            </button>
          </p>
        </div>
      </section>

      {/* ── BOTTOM CTA: Where to go next ── */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: Layers,
            title: 'See the 4 Phases Live',
            sub: 'Interactive demo on The Origin tab',
            tab: 'proof',
            badge: null
          },
          {
            icon: GraduationCap,
            title: 'Creation Gateway University',
            sub: 'Masterclasses on systems design',
            tab: 'university',
            badge: null
          },
          {
            icon: Terminal,
            title: 'The Auto-Builder Engine',
            sub: 'Engine tools (under development)',
            tab: 'ralph',
            badge: 'Under Dev'
          }
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.tab}
              onClick={() => onNavigateTab(item.tab)}
              className="p-5 rounded-2xl bg-black border border-white/10 hover:border-white/25 text-left transition-all space-y-2.5 group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    {item.badge}
                  </span>
                )}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{item.title}</div>
                <div className="text-xs text-zinc-500">{item.sub}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors font-mono">
                <span>Open</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </section>

    </div>
  );
}
