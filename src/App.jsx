import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KnowledgeBase from './components/KnowledgeBase';
import ProofStudio from './components/ProofStudio';
import University from './components/University';
import WaterSolutions from './components/WaterSolutions';
import GsdCompiler from './components/GsdCompiler';
import RalphRunner from './components/RalphRunner';
import MarketingEngine from './components/MarketingEngine';
import StatisticalLab from './components/StatisticalLab';
import ExportModal from './components/ExportModal';
import ParticleBackground from './components/ParticleBackground';
import { SAAS_PRESETS, INITIAL_TERMINAL_LOGS } from './data/presets';

export default function App() {
  const [activeTab, setActiveTab] = useState('learn'); // Knowledge Base is the default landing
  const [presets, setPresets] = useState(SAAS_PRESETS);
  const [selectedPreset, setSelectedPreset] = useState(SAAS_PRESETS[0]); // AquaVeda by default!
  const [logs, setLogs] = useState(INITIAL_TERMINAL_LOGS);
  const [isLoopRunning, setIsLoopRunning] = useState(false);
  const [activeTaskIndex, setActiveTaskIndex] = useState(3);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [stats, setStats] = useState({
    iterations: 87,
    breakthroughP: 94.8,
    channelsAverted: '1,225',
    greenRate: 96.4
  });

  // Simulated Autonomous Loop with Bramha logs
  useEffect(() => {
    if (!isLoopRunning) return;

    const interval = setInterval(() => {
      const now = new Date().toTimeString().split(' ')[0];
      const cycleId = Math.floor(Math.random() * 900) + 100;
      
      const sequence = [
        { time: now, level: 'BRAMHA', text: `Creation cycle #${cycleId} spawned with fresh memory (0 decay).` },
        { time: now, level: 'PLAN', text: `Axiom locked: Mapping human intention into 4 modular parts.` },
        { time: now, level: 'BUILD', text: `Synthesized environmental telemetry listener for zone sensors.` },
        { time: now, level: 'TEST', text: `Test crucible: 14/14 tests passing without meetings or alignment delays.` },
        { time: now, level: 'GATE', text: `Security inspection: Zero auth holes, zero secret leaks.` },
        { time: now, level: 'SAVE', text: `Saved progress automatically [VERIFIED MILESTONE #${cycleId}]` }
      ];

      setLogs(prev => [...sequence, ...prev].slice(0, 80));
      setStats(prev => {
        const nextN = prev.iterations + 1;
        const nextP = (1 - Math.pow(1 - 0.03, nextN)) * 100;
        return {
          ...prev,
          iterations: nextN,
          breakthroughP: Number(nextP.toFixed(1))
        };
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isLoopRunning]);

  const handleToggleLoop = () => {
    setIsLoopRunning(prev => !prev);
  };

  const handleTriggerIteration = () => {
    const now = new Date().toTimeString().split(' ')[0];
    const newLogs = [
      { time: now, level: 'BRAMHA', text: `Triggered 1 discrete creation cycle with clean context.` },
      { time: now, level: 'BUILD', text: `Implemented feature: ${selectedPreset.tasks[activeTaskIndex]?.title || 'active task'}.` },
      { time: now, level: 'TEST', text: `Automated test run: 100% verified green.` },
      { time: now, level: 'SAVE', text: `Milestone verified and saved [PASSED].` }
    ];
    setLogs(prev => [...newLogs, ...prev].slice(0, 80));
    setStats(prev => ({
      ...prev,
      iterations: prev.iterations + 1
    }));
  };

  const handleCompileNewSpec = (promptText) => {
    const now = new Date().toTimeString().split(' ')[0];
    const newPreset = {
      id: `bramha-${Date.now()}`,
      name: promptText.slice(0, 24) + '...',
      tagline: `Creation plan for: "${promptText}"`,
      category: 'Creator Concept',
      prd: `# ${promptText}\n\n## 1. Simple Summary\nConcept mapped through Bramha for: "${promptText}".\n\n## 2. Who it is for\nAwakened creators and real-world communities.\n\n## 3. Impact & Value\nSustainable, self-reliant utility with direct positive impact.`,
      schema: `// Database Schema\nmodel Tenant {\n  id    String @id @default(uuid())\n  name  String\n  users User[]\n}\n\nmodel User {\n  id       String @id @default(uuid())\n  tenantId String\n  tenant   Tenant @relation(fields: [tenantId], references: [id])\n}`,
      tasks: [
        { id: 'B-01', title: 'Lock data boundary and privacy rules', status: 'done', mode: 'Planner', tests: '4/4 passed', duration: '1.1m' },
        { id: 'B-02', title: 'Assemble core application modules and telemetry', status: 'in-progress', mode: 'Builder', tests: 'Testing', duration: 'Running' },
        { id: 'B-03', title: 'Deploy public search pages and impact ledger', status: 'queued', mode: 'Builder', tests: 'Queued', duration: '-' }
      ],
      seoMatrix: {
        seed: `Solutions for ${promptText.slice(0, 15)} in {Region}`,
        industries: ['Clean Water', 'Agriculture', 'Renewables', 'Community'],
        regions: ['Global', 'North America', 'India', 'Europe'],
        generatedCount: 16,
        sampleUrls: [`/solutions/${promptText.slice(0, 10).toLowerCase().replace(/\s+/g, '-')}-global`]
      }
    };

    setPresets(prev => [newPreset, ...prev]);
    setSelectedPreset(newPreset);
    
    setLogs(prev => [
      { time: now, level: 'BRAMHA', text: `Created blueprint from concept: "${promptText}".` },
      ...prev
    ]);
  };

  const handlePushToRalph = () => {
    setActiveTab('ralph');
    setIsLoopRunning(true);
    const now = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [
      { time: now, level: 'BRAMHA', text: `Tasks dispatched to Auto-Builder. Starting creation loop...` },
      ...prev
    ]);
  };

  const handleInjectBug = () => {
    const now = new Date().toTimeString().split(' ')[0];
    const failureLogs = [
      { time: now, level: 'TEST', text: `⚠️ Test caught a simulated anomaly in telemetry logic!` },
      { time: now, level: 'BRAMHA', text: `Auto-repair triggered. Spawning Repair Agent...` },
      { time: now, level: 'BUILD', text: `Repaired code: Restored sensor calibration verification.` },
      { time: now, level: 'TEST', text: `✓ Re-ran tests: 14 of 14 tests passing. Code is healthy and green.` },
      { time: now, level: 'SAVE', text: `Saved auto-healed code [VERIFIED].` }
    ];
    setLogs(prev => [...failureLogs, ...prev].slice(0, 80));
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      
      {/* Interactive Starlight VFX Particle Canvas */}
      <ParticleBackground />

      {/* Bramha Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        presets={presets}
        selectedPreset={selectedPreset}
        setSelectedPreset={setSelectedPreset}
        isLoopRunning={isLoopRunning}
        toggleLoop={handleToggleLoop}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Experience Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 z-10 relative">
        
        {/* Knowledge Base: Interactive Concept Hub (Default Landing) */}
        {activeTab === 'learn' && (
          <KnowledgeBase onNavigateTab={setActiveTab} />
        )}

        {/* The Origin (Home & Demystification) */}
        {activeTab === 'proof' && (
          <ProofStudio
            preset={selectedPreset}
            onNavigateTab={setActiveTab}
            onRunCycle={handleTriggerIteration}
            isLoopRunning={isLoopRunning}
            stats={stats}
          />
        )}

        {/* Smart University for Awakened Ones */}
        {activeTab === 'university' && (
          <University
            onNavigateTab={setActiveTab}
          />
        )}

        {/* Water & Earth Solutions (Standalone Case Study Page) */}
        {activeTab === 'water' && (
          <WaterSolutions onNavigateTab={setActiveTab} />
        )}

        {/* Idea to Blueprint (GSD) */}
        {activeTab === 'gsd' && (
          <GsdCompiler
            preset={selectedPreset}
            onPushToRalph={handlePushToRalph}
            onCompileSpec={handleCompileNewSpec}
          />
        )}

        {/* The Auto-Builder Loop (Ralph) */}
        {activeTab === 'ralph' && (
          <RalphRunner
            tasks={selectedPreset.tasks}
            isLoopRunning={isLoopRunning}
            toggleLoop={handleToggleLoop}
            onStepTask={handleTriggerIteration}
            activeTaskIndex={activeTaskIndex}
            onInjectBug={handleInjectBug}
          />
        )}

        {/* Customer Magnet (Growth & SEO) */}
        {activeTab === 'marketing' && (
          <MarketingEngine
            preset={selectedPreset}
          />
        )}

        {/* Solo Advantage (Company vs You) */}
        {activeTab === 'stats' && (
          <StatisticalLab />
        )}

      </main>

      {/* Clean Monochrome Footer */}
      <footer className="border-t border-white/10 bg-black/90 backdrop-blur-md py-6 px-6 text-center text-xs text-zinc-500 font-mono z-10 relative">
        BRAMHA • Autonomous Creation Engine • Under Active Development •{' '}
        <button onClick={() => document.dispatchEvent(new CustomEvent('navigate', { detail: 'learn' }))} className="underline hover:text-zinc-300 transition-colors">
          Concept Knowledge Base
        </button>
      </footer>

      {/* Export / Deploy Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        preset={selectedPreset}
      />

    </div>
  );
}
