import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Gift, 
  AlertCircle,
  Copy,
  Check,
  Search,
  ChevronRight
} from 'lucide-react';

export default function MarketingEngine({ preset }) {
  const [activeSubTab, setActiveSubTab] = useState('seo');
  const [selectedIndustry, setSelectedIndustry] = useState(preset.seoMatrix.industries[0]);
  const [selectedRegion, setSelectedRegion] = useState(preset.seoMatrix.regions[0]);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showChurnModal, setShowChurnModal] = useState(false);

  const activeSlug = `/solutions/${preset.seoMatrix.seed
    .replace('{Industry}', selectedIndustry.toLowerCase())
    .replace('{Region}', selectedRegion.toLowerCase())
    .replace('{Compliance}', selectedIndustry.toLowerCase())
    .replace('{Framework}', selectedRegion.toLowerCase())
    .replace('{Platform}', selectedIndustry.toLowerCase())
    .replace('{Year}', selectedRegion.toLowerCase())
    .replace(/\s+/g, '-')}`;

  const activeTitle = preset.seoMatrix.seed
    .replace('{Industry}', selectedIndustry)
    .replace('{Region}', selectedRegion)
    .replace('{Compliance}', selectedIndustry)
    .replace('{Framework}', selectedRegion)
    .replace('{Platform}', selectedIndustry)
    .replace('{Year}', selectedRegion);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto z-10 relative">
      
      {/* 1st Level: The Friendly Intro */}
      <div className="mono-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-300">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
              <span>PHASE 4: Market & Distribution (Edge Deployment & Reach)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Marketing Built Right Into The Code
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Most indie products fail not because their code was bad, but because nobody found them. 
              Our engine automatically generates <strong className="text-white">dozens of Google-friendly search pages</strong> and 
              viral referral rewards so real users find your app with zero ad spend.
            </p>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex items-center gap-1.5 bg-black p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveSubTab('seo')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[40px] ${
                activeSubTab === 'seo'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              1. Search Pages (SEO)
            </button>
            <button
              onClick={() => setActiveSubTab('referral')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[40px] ${
                activeSubTab === 'referral'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              2. Viral Referrals
            </button>
            <button
              onClick={() => setActiveSubTab('churn')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[40px] ${
                activeSubTab === 'churn'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              3. Keep Customers
            </button>
          </div>
        </div>
      </div>

      {/* 2nd Level: Active Tab Showcase */}
      {activeSubTab === 'seo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Variable Selectors */}
          <div className="mono-card p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Keyword Recipe
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/10 text-white border border-white/20 font-bold">
                {preset.seoMatrix.generatedCount} Ready Pages
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black border border-white/10 font-mono text-xs text-zinc-300">
              {preset.seoMatrix.seed}
            </div>

            {/* Variable A Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                Click an Industry:
              </label>
              <div className="flex flex-wrap gap-2">
                {preset.seoMatrix.industries.map(item => (
                  <button
                    key={item}
                    onClick={() => setSelectedIndustry(item)}
                    className={`text-xs px-3.5 py-2 rounded-xl border font-mono transition-all min-h-[38px] ${
                      selectedIndustry === item
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-black border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Variable B Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                Click a Region:
              </label>
              <div className="flex flex-wrap gap-2">
                {preset.seoMatrix.regions.map(reg => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`text-xs px-3.5 py-2 rounded-xl border font-mono transition-all min-h-[38px] ${
                      selectedRegion === reg
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-black border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 2 Cols: Live Generated Landing Page Preview */}
          <div className="lg:col-span-2 mono-card overflow-hidden flex flex-col">
            
            {/* Browser Mockup Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-black/80 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                </div>
                <div className="px-3 py-1 rounded-lg bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300">
                  https://myapp.com{activeSlug}
                </div>
              </div>

              <button
                onClick={() => handleCopy(`https://myapp.com${activeSlug}`)}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedUrl ? 'Copied' : 'Copy Route'}</span>
              </button>
            </div>

            {/* Generated Page Canvas */}
            <div className="p-8 space-y-6 bg-black text-white flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Generated Static Page (Loads in under 0.1 seconds)</span>
              </div>

              <div className="space-y-3 max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {activeTitle}
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Tailored specifically for businesses in <strong className="text-white">{selectedIndustry}</strong> operating 
                  across <strong className="text-white">{selectedRegion}</strong>. Launch without waiting for months of development.
                </p>
              </div>

              <div className="pt-2">
                <button className="btn-mono-primary px-7 py-3 text-xs font-bold">
                  Get Started with {selectedIndustry} Now →
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Referral Loops Sub-tab */}
      {activeSubTab === 'referral' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mono-card p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <Gift className="w-5 h-5 text-white" />
              <h2 className="text-base font-bold text-white">
                Turn Every User Into A Free Promoter
              </h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              When someone loves your tool and shares it with a coworker, give them both an automatic reward. 
              No expensive marketing agencies needed.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-black border border-white/10 space-y-1">
                <div className="text-xs font-mono text-zinc-400">The Person Inviting Gets:</div>
                <div className="text-sm font-bold text-white font-mono">$25 in Free Credits + 20% Monthly Commission</div>
              </div>

              <div className="p-4 rounded-xl bg-black border border-white/10 space-y-1">
                <div className="text-xs font-mono text-zinc-400">Their Friend Gets:</div>
                <div className="text-sm font-bold text-white font-mono">1,000 Free Credits to Try The Tool</div>
              </div>
            </div>
          </div>

          <div className="mono-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white">
                Free Word-of-Mouth Badge
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                A tiny, discreet badge in the corner of free accounts that invites other people to check out your product.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-black border border-white/10 flex flex-col items-center justify-center gap-4 text-center">
              <span className="text-xs text-zinc-500 font-mono">How It Looks to Your Visitors</span>

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900 border border-white/20 hover:border-white transition-all cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-medium text-white">
                  Built with <strong className="text-white">{preset.name}</strong>
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white text-black font-bold">
                  Make Yours →
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-zinc-400 flex items-center justify-between pt-2 border-t border-white/10">
              <span>Viral Growth Rate:</span>
              <span className="text-white font-bold">Self-Sustaining Spread</span>
            </div>
          </div>
        </div>
      )}

      {/* Churn Deflection Sub-tab */}
      {activeSubTab === 'churn' && (
        <div className="mono-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <h2 className="text-base font-bold text-white">
                Never Lose a Customer Silently
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                If a user clicks "Cancel Subscription", don't let them leave without asking why. 
                Offer them an instant temporary discount or a cheaper plan to keep their business.
              </p>
            </div>

            <button
              onClick={() => setShowChurnModal(true)}
              className="btn-mono-primary px-5 py-2.5 text-xs font-bold shrink-0"
            >
              Test The Cancellation Offer
            </button>
          </div>

          {showChurnModal && (
            <div className="p-6 rounded-2xl bg-black border border-white/30 space-y-4 max-w-lg mx-auto shadow-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-white">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Before you cancel...</h3>
                    <p className="text-xs text-zinc-400">We want to keep helping you build your business.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChurnModal(false)}
                  className="text-xs text-zinc-500 hover:text-white font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-white/15 space-y-1">
                <span className="text-xs font-bold text-white">
                  ⚡ Special Retention Offer:
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Take <strong className="text-white">50% off for the next 3 months</strong> while you keep building.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowChurnModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel Anyway
                </button>
                <button
                  onClick={() => {
                    alert('Deflection Successful! 50% discount applied.');
                    setShowChurnModal(false);
                  }}
                  className="btn-mono-primary px-4 py-2 text-xs font-bold"
                >
                  Claim 50% Off & Stay
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
