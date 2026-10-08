import React, { useState } from 'react';
import {
  Building2,
  ChevronDown,
  Search,
  Bell,
  Sparkles,
  RefreshCw,
  LogOut,
  User,
  ShieldAlert,
  Menu,
  Check,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { db } from '../../database/db.js';
import { SEED_USERS } from '../../database/seed-data.js';
import { Dropdown, DropdownItem } from '../../design-system/actions/Dropdown.jsx';
import { Badge } from '../../design-system/foundations/Badge.jsx';
import { Avatar } from '../../design-system/foundations/Avatar.jsx';

export function AppTopbar({
  currentUser,
  tenantContext,
  onOpenScopeSelector,
  onOpenCommandPalette,
  onOpenNotifications,
  onSwitchUser,
  onLogout,
  onToggleMobileSidebar,
  unreadNotificationCount = 4,
}) {
  const activeCampus = db.getCampusById(tenantContext.activeCampusId) || db.campuses[0];
  const activeSchool = db.schools.find((s) => s.id === activeCampus?.schoolId) || db.schools[0];

  const handleSelectUserPreset = (userPreset) => {
    onSwitchUser(userPreset.email, userPreset.passwordHash);
  };

  return (
    <header className="h-16 bg-white border-b border-[#E6DFD1] px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Mobile Hamburger + Brand + Sovereign Scope Selector */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-[#60706B] hover:text-[#0B2F29] hover:bg-[#F4EEDC] cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0B2F29] border border-[#C49A3A]/40 flex items-center justify-center text-[#DFC679] font-bold text-xs flex-shrink-0">
            VT
          </div>
          <div className="hidden xl:block">
            <div className="text-sm font-bold tracking-tight text-[#0B2F29] font-sans flex items-center gap-1.5 leading-none">
              <span>VEDIC TREE OS</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/50">
                ENTERPRISE
              </span>
            </div>
            <div className="text-[11px] text-[#334E47] font-medium tracking-normal mt-0.5">Indian wisdom. Modern learning.</div>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="hidden sm:block h-6 w-px bg-[#E6DFD1]" />

        {/* Persistent Scope Breadcrumb & Selector Button (h-9 unified height) */}
        <button
          type="button"
          onClick={onOpenScopeSelector}
          className="h-9 flex items-center gap-2 px-3 rounded-lg bg-[#FBF8EF] hover:bg-[#F4EEDC] border border-[#E6DFD1] text-left transition-colors group cursor-pointer"
          title="Click to switch Sovereign Scope (Region, School, Campus)"
        >
          <Building2 className="w-3.5 h-3.5 text-[#2D705C] flex-shrink-0" />
          <div className="max-w-[130px] sm:max-w-[200px] lg:max-w-[260px] truncate">
            <div className="text-xs font-semibold text-[#102625] truncate flex items-center gap-1.5 leading-none">
              <span>{activeCampus?.name || 'All Campuses'}</span>
            </div>
            <div className="text-[10px] text-[#60706B] truncate leading-none mt-0.5">
              {currentUser.role === 'HQ_ADMIN' ? 'Global HQ • Universal Scope' : `${activeSchool?.name || 'Vedic Tree'}`}
            </div>
          </div>
          <ChevronDown className="w-3 h-3 text-[#60706B] group-hover:text-[#0B2F29] transition-colors flex-shrink-0" />
        </button>
      </div>

      {/* Center: Global Search & Command Launcher (h-9 unified height) */}
      <div className="hidden md:flex items-center mx-4">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="h-9 flex items-center gap-2.5 px-3.5 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] hover:border-[#D9D0BE] text-[#60706B] hover:text-[#102625] text-xs transition-colors w-64 lg:w-80 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-[#60706B]" />
          <span className="flex-1 text-left truncate">Search students, staff, actions...</span>
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[#60706B] bg-[#F4EEDC] rounded border border-[#E6DFD1]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Notifications, Persona Switcher, Profile (all h-9 unified height) */}
      <div className="flex items-center gap-2">
        {/* Search icon button for mobile */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-[#60706B] hover:text-[#0B2F29] hover:bg-[#F4EEDC] cursor-pointer"
          aria-label="Open search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Actionable Notifications (h-9 unified height) */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative h-9 w-9 flex items-center justify-center rounded-lg text-[#102625] hover:bg-[#F4EEDC] border border-[#E6DFD1] transition-colors cursor-pointer"
          title="Notifications & SLA Alerts"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E35D52] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
              {unreadNotificationCount}
            </span>
          )}
        </button>

        {/* Hairline Divider */}
        <div className="h-6 w-px bg-[#E6DFD1] hidden sm:block" />

        {/* Persona Switcher Dropdown (h-9 unified height) */}
        <Dropdown
          align="right"
          trigger={
            <button
              type="button"
              className="h-9 flex items-center gap-2 px-2.5 rounded-lg bg-[#FBF8EF] hover:bg-[#F4EEDC] border border-[#E6DFD1] transition-colors cursor-pointer"
            >
              <Avatar name={`${currentUser.firstName} ${currentUser.lastName}`} size="sm" />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-[#102625] leading-none">
                  {currentUser.firstName}
                </div>
                <div className="text-[10px] text-[#8C6B1C] font-mono font-semibold leading-none mt-0.5">
                  {currentUser.role}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-[#60706B] ml-0.5" />
            </button>
          }
        >
          {({ close }) => (
            <>
              <div className="px-3.5 py-2 border-b border-[#E6DFD1] bg-[#FBF8EF]">
                <p className="text-xs font-semibold text-[#102625]">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-[11px] text-[#60706B] truncate">{currentUser.email}</p>
                <Badge variant="primary" size="sm" className="mt-1.5 bg-[#F4EEDC] text-[#0B2F29] border-[#DFC679]">
                  Role: {currentUser.role}
                </Badge>
              </div>

              <div className="py-1 bg-white">
                <div className="px-3.5 py-1 text-[10px] font-mono uppercase text-[#60706B] tracking-wider">
                  SYSTEM PERSONAS
                </div>
                {SEED_USERS.map((u) => {
                  const isCurrent = u.email === currentUser.email;
                  return (
                    <DropdownItem
                      key={u.id}
                      onClick={() => {
                        handleSelectUserPreset(u);
                        close();
                      }}
                      className={isCurrent ? 'bg-[#F4EEDC] font-semibold text-[#0B2F29]' : 'text-[#102625] hover:bg-[#FBF8EF]'}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div>{u.firstName} ({u.roleCode})</div>
                          <div className="text-[10px] text-[#60706B] font-normal">{u.email}</div>
                        </div>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-[#154E42]" />}
                      </div>
                    </DropdownItem>
                  );
                })}
              </div>

              <div className="border-t border-[#E6DFD1] py-1 bg-[#FBF8EF]">
                <DropdownItem
                  icon={LogOut}
                  tone="danger"
                  onClick={() => {
                    close();
                    onLogout();
                  }}
                  className="text-[#E35D52] hover:bg-[#E35D52]/10"
                >
                  Sign Out
                </DropdownItem>
              </div>
            </>
          )}
        </Dropdown>
      </div>
    </header>
  );
}
