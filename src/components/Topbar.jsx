import React from 'react';
import { 
  Building2, 
  ChevronDown, 
  Search, 
  Bell, 
  UserCheck, 
  ShieldAlert, 
  LogOut, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function Topbar({
  currentUser,
  tenantContext,
  onOpenTenantSwitcher,
  onOpenCommandPalette,
  onOpenLoginModal,
  onLogout,
  unreadCount = 2
}) {
  const currentCampusName = tenantContext.accessibleCampuses.find(
    c => c.id === tenantContext.activeCampusId
  )?.name || 'Global HQ';

  return (
    <header className="h-16 bg-[#0F172A] border-b border-[#24324D] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Brand & Persistent Tenant / Campus Switcher */}
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg shadow-sm">
            VT
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold tracking-wide text-white flex items-center gap-1.5">
              VEDIC TREE OS
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v2.6
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Education Operating System</div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-slate-800" />

        {/* Active Campus Switcher Button */}
        <button
          onClick={onOpenTenantSwitcher}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all group"
          title="Click to switch school or campus context"
        >
          <Building2 className="w-4 h-4 text-amber-400 group-hover:scale-105 transition-transform" />
          <div className="max-w-[160px] sm:max-w-[220px] truncate">
            <div className="text-xs font-medium text-white truncate flex items-center gap-1">
              {currentCampusName}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {currentUser.role === 'HQ_ADMIN' ? 'Global HQ (Multi-Campus)' : 'Active Campus Scope'}
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Center Search / Command Launcher */}
      <div className="hidden lg:flex items-center">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-4 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-all w-72"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span className="flex-1 text-left">Search students, staff, actions...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Persona Switcher, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Demo Switcher */}
        <button
          onClick={onOpenLoginModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-amber-400 text-xs font-medium transition-colors"
          title="Switch testing persona / role"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Role: {currentUser.role}</span>
          <RefreshCw className="w-3 h-3 opacity-70" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors relative"
            title="Campus Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-[#0F172A]" />
            )}
          </button>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-emerald-800/70 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-semibold text-xs">
            {currentUser.firstName?.[0] || 'U'}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-white leading-tight">
              {currentUser.firstName} {currentUser.lastName}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {currentUser.roleTitle || currentUser.role}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
