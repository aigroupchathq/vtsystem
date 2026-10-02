import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Key, X, AlertCircle, Sparkles } from 'lucide-react';
import { AuthService } from '../modules/platform/auth.service.js';
import { SEED_USERS } from '../database/seed-data.js';

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [email, setEmail] = useState('admin@vedictree.edu.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e?.preventDefault();
    setError('');
    try {
      const res = AuthService.login(email, password);
      onLoginSuccess(res);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleSelectPreset = (preset) => {
    setEmail(preset.email);
    setPassword(preset.passwordHash);
    try {
      const res = AuthService.login(preset.email, preset.passwordHash);
      onLoginSuccess(res);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">VEDIC TREE OS Login</h2>
              <p className="text-xs text-slate-400">Authenticate session or switch persona</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona quick switch buttons */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/40">
          <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Instant Role / Persona Switcher
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SEED_USERS.map(user => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleSelectPreset(user)}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {user.firstName}
                </div>
                <div className="text-[10px] text-amber-400 font-mono font-medium">
                  {user.roleCode}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {user.campusId ? 'Baner Campus' : 'Global HQ'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Manual form */}
        <form onSubmit={handleLogin} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-slate-300 mb-1 block">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            Authenticate & Issue Token
          </button>
        </form>
      </div>
    </div>
  );
}
