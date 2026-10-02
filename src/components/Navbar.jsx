import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Terminal, 
  Share2, 
  BarChart3, 
  Download, 
  Play, 
  Square,
  Droplets,
  GraduationCap,
  ChevronDown,
  BookOpen,
  Wrench
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  presets, 
  selectedPreset, 
  setSelectedPreset, 
  isLoopRunning, 
  toggleLoop,
  onOpenExport
}) {
  const tabs = [
    { id: 'learn', label: 'Knowledge Base', icon: BookOpen },
    { id: 'proof', label: 'The Origin', icon: Sparkles },
    { id: 'university', label: 'University', icon: GraduationCap },
    { id: 'gsd', label: 'Blueprint', icon: Layers, dev: true },
    { id: 'ralph', label: 'Auto-Builder', icon: Terminal, badge: isLoopRunning ? 'ACTIVE' : null, dev: true },
    { id: 'marketing', label: 'Customer Magnet', icon: Share2, dev: true },
    { id: 'stats', label: 'Solo Advantage', icon: BarChart3, dev: true }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 gap-4">
        
        {/* Brand: Pure Typographic BRAMHA Wordmark (No external icons, the name itself is the logo) */}
        <div 
          onClick={() => setActiveTab('proof')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex items-center">
            <span className="font-display font-black text-2xl tracking-[0.2em] text-white uppercase group-hover:text-zinc-200 transition-colors">
              BRAMHA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white ml-2 animate-pulse" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20 uppercase hidden sm:inline-block">
            Engine
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-950 p-1.5 rounded-2xl border border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={tab.dev ? 'Under Development — engine modules being built' : undefined}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-black shadow-md font-bold'
                    : tab.dev
                      ? 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : tab.dev ? 'text-zinc-600' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                )}
                {tab.dev && !isActive && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-500 border border-amber-400/15 ml-0.5 leading-none">
                    DEV
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Preset Selector */}
          <div className="relative hidden xl:block">
            <select
              value={selectedPreset.id}
              onChange={(e) => {
                const found = presets.find(p => p.id === e.target.value);
                if (found) setSelectedPreset(found);
              }}
              aria-label="Select Bramha Preset"
              className="appearance-none bg-zinc-950 text-xs font-medium text-white border border-white/15 rounded-xl pl-3.5 pr-8 py-2.5 cursor-pointer hover:border-white/30 focus:outline-none"
            >
              {presets.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name.split(':')[0]}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Primary Action Button */}
          <button
            onClick={toggleLoop}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold transition-all ${
              isLoopRunning
                ? 'bg-zinc-800 text-white border border-white/30 hover:bg-zinc-700 rounded-xl min-h-[44px]'
                : 'btn-mono-primary flex items-center justify-center'
            }`}
          >
            {isLoopRunning ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Pause Bramha</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Bramha</span>
              </>
            )}
          </button>

          {/* Export Action */}
          <button
            onClick={onOpenExport}
            className="btn-mono-secondary flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold"
            title="Export repository & CLI commands"
          >
            <Download className="w-4 h-4 text-zinc-400" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>

      </div>

      {/* Mobile Nav Strip */}
      <div className="flex lg:hidden items-center overflow-x-auto py-2.5 border-t border-white/10 text-xs gap-1">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-1.5 px-2.5 rounded-lg font-medium whitespace-nowrap shrink-0 flex items-center gap-1 ${
              activeTab === tab.id
                ? 'text-black bg-white font-bold'
                : tab.dev
                  ? 'text-zinc-600'
                  : 'text-zinc-400'
            }`}
          >
            {tab.label}
            {tab.dev && activeTab !== tab.id && (
              <span className="text-[9px] font-mono text-amber-500">DEV</span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
}
