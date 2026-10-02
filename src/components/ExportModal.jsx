import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Rocket, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ExportModal({ isOpen, onClose, preset }) {
  const [copiedCLI, setCopiedCLI] = useState(false);
  const [deployed, setDeployed] = useState(false);

  if (!isOpen) return null;

  const cliCommand = `npx saas-foundry init ${preset.id} --db=supabase --billing=stripe --seo=programmatic`;

  const handleCopyCLI = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCLI(true);
    setTimeout(() => setCopiedCLI(false), 2000);
  };

  const handleDeployStaging = () => {
    setDeployed(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setDeployed(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl mono-card p-6 sm:p-8 space-y-6 shadow-2xl bg-black border border-white/20">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white text-black font-bold">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Take Your Code Home
              </h3>
              <p className="text-xs text-zinc-400">
                You own 100% of the code: {preset.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CLI Command */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
            1. One-Line Terminal Setup (Copy & Paste):
          </label>
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-white/10 font-mono text-xs text-white">
            <span className="truncate mr-3">{cliCommand}</span>
            <button
              onClick={handleCopyCLI}
              className="btn-mono-secondary flex items-center gap-1.5 px-3 py-1.5 text-xs text-white transition-colors shrink-0 min-h-[36px]"
            >
              {copiedCLI ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Where You Can Deploy */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
            2. Ready to Launch On:
          </label>
          <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
              <div className="text-white font-bold">Vercel</div>
              <div className="text-xs text-zinc-400">Instant Hosting</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
              <div className="text-white font-bold">Supabase</div>
              <div className="text-xs text-zinc-400">Free Database</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
              <div className="text-white font-bold">Stripe</div>
              <div className="text-xs text-zinc-400">Payments Ready</div>
            </div>
          </div>
        </div>

        {/* Deploy Simulator */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Automated Inspection: Passed</span>
          </div>

          <button
            onClick={handleDeployStaging}
            disabled={deployed}
            className="btn-mono-primary w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold"
          >
            {deployed ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Launched to Staging! 🎉</span>
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 fill-current" />
                <span>Simulate Launch</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
