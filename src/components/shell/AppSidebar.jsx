import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getNavGroups } from './navConfig.js';

export function AppSidebar({
  activeNav,
  onSelectNav,
  currentUser,
  isCollapsed = false,
  onToggleCollapse = null,
  isMobileOpen = false,
  onCloseMobile = null,
}) {
  const role = currentUser.role;
  const navGroups = getNavGroups(role);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container: Deep Forest Green (#0B2F29) */}
      <aside
        className={`fixed md:sticky top-16 z-40 md:z-20 h-[calc(100vh-64px)] bg-[#0B2F29] border-r border-[#154E42]/70 flex flex-col shrink-0 select-none transition-all duration-200 ${
          isCollapsed ? 'w-16' : 'w-72'
        } ${isMobileOpen ? 'left-0' : '-left-72 md:left-0'}`}
      >
        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-5 overflow-y-auto">
          {navGroups.map((section, idx) => {
            const cleanGroupTitle = section.group.replace(/\s*\[SOURCE\]|\s*\[ENABLER\]|\s*\[PROPOSED\]/g, '');
            return (
              <div key={idx}>
                {!isCollapsed && (
                  <div className="px-2.5 mb-2 text-[11px] font-sans font-bold tracking-wider text-[#DFC679] uppercase">
                    {cleanGroupTitle}
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id;
                    // Filter out technical implementation codes like M-01 from everyday navigation
                    const displayBadge = item.badge && !item.badge.startsWith('M-') ? item.badge : null;

                    return (
                      <button
                        key={`${item.id}-${itemIdx}`}
                        type="button"
                        onClick={() => {
                          onSelectNav(item.id);
                          if (onCloseMobile) onCloseMobile();
                        }}
                        title={isCollapsed ? item.label : undefined}
                        className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors relative cursor-pointer ${
                          isActive
                            ? 'bg-[#154E42]/70 text-white font-semibold border-l-2 border-[#C49A3A] pl-2.5'
                            : 'text-[#F4EEDC]/90 hover:bg-[#154E42]/30 hover:text-white border-l-2 border-transparent'
                        } ${isCollapsed ? 'justify-center px-0 items-center' : ''}`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${isActive ? 'text-[#C49A3A]' : 'text-[#F4EEDC]/70'}`} />
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-1.5">
                              <span className={`text-xs font-semibold leading-snug tracking-normal ${isActive ? 'text-white' : 'text-[#FBF8EF]'}`}>
                                {item.label}
                              </span>
                              {displayBadge && (
                                <span
                                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-medium shrink-0 ${
                                    isActive
                                      ? 'bg-[#0B2F29] text-[#DFC679] border border-[#C49A3A]/40'
                                      : 'bg-[#154E42]/50 text-[#DFC679]/80 border border-[#154E42]'
                                  }`}
                                >
                                  {displayBadge}
                                </span>
                              )}
                            </div>
                            {item.subtitle && (
                              <p className="text-[11px] text-[#F4EEDC]/75 leading-tight mt-0.5">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Collapse Toggle Footer */}
        {onToggleCollapse && (
          <div className="hidden md:flex p-3 border-t border-[#154E42]/70 items-center justify-between bg-[#08221D]">
            {!isCollapsed && (
              <span className="text-[11px] text-[#DFC679] font-mono">
                {currentUser.role}
              </span>
            )}
            <button
              type="button"
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg text-[#F4EEDC]/70 hover:text-white hover:bg-[#154E42]/60 transition-colors ml-auto"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
