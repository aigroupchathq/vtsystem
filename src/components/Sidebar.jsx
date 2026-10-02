import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Layers, 
  ShieldCheck, 
  History, 
  Building, 
  ChevronRight,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';

export default function Sidebar({
  activeNav,
  onSelectNav,
  currentUser
}) {
  const isHq = currentUser.role === 'HQ_ADMIN';

  const navItems = [
    {
      group: 'PRIMARY MODULES',
      items: [
        {
          id: 'students',
          label: 'Students (SIS Core)',
          subtitle: 'Admissions & Master Records',
          icon: GraduationCap,
          badge: 'M-01'
        },
        {
          id: 'employees',
          label: 'Staff & HRMS Core',
          subtitle: 'Directory & Biometrics',
          icon: Users,
          badge: 'M-01'
        }
      ]
    },
    {
      group: 'PLATFORM FOUNDATION',
      items: [
        {
          id: 'hierarchy',
          label: 'Tenant Hierarchy',
          subtitle: 'Org, Region, School, Campus',
          icon: Building
        },
        {
          id: 'rbac',
          label: 'RBAC & Permissions',
          subtitle: 'Role Access Policies',
          icon: ShieldCheck
        },
        {
          id: 'audit',
          label: 'Immutable Audit Trail',
          subtitle: 'Compliance Event Ledger',
          icon: History,
          badge: 'Live'
        }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-[#24324D] flex flex-col shrink-0 min-h-[calc(100vh-64px)] select-none">
      {/* Navigation Groups */}
      <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
        {navItems.map((section, idx) => (
          <div key={idx}>
            <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
              {section.group}
            </div>
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium leading-tight truncate">{item.label}</div>
                      <div className="text-[10px] text-slate-400 truncate">{item.subtitle}</div>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                        isActive 
                          ? 'bg-emerald-500/20 text-emerald-300' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-[#24324D] bg-slate-900/50">
        <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-slate-300">RLS Active</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
            ISOLATED
          </span>
        </div>
      </div>
    </aside>
  );
}
