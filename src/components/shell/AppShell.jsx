import React, { useState } from 'react';
import { AppTopbar } from './AppTopbar.jsx';
import { AppSidebar } from './AppSidebar.jsx';
import { MobileNav } from './MobileNav.jsx';
import { ScopeSelectorModal } from './ScopeSelectorModal.jsx';
import { GlobalCommandPalette } from './GlobalCommandPalette.jsx';
import { NotificationCenter } from './NotificationCenter.jsx';

export function AppShell({
  children,
  session,
  activeNav,
  onSelectNav,
  onSwitchCampus,
  onSwitchUser,
  onLogout,
  toastMessage = null,
  isScopeModalOpen: controlledScopeModalOpen,
  onOpenScopeModal: controlledOpenScopeModal,
  onCloseScopeModal: controlledCloseScopeModal,
}) {
  const [internalScopeModalOpen, setInternalScopeModalOpen] = useState(false);
  const isScopeModalOpen = controlledScopeModalOpen !== undefined ? controlledScopeModalOpen : internalScopeModalOpen;
  const handleOpenScope = controlledOpenScopeModal || (() => setInternalScopeModalOpen(true));
  const handleCloseScope = controlledCloseScopeModal || (() => setInternalScopeModalOpen(false));

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const activeTenantContext = {
    organizationId: session.tenantContext.organizationId,
    campusId: session.tenantContext.activeCampusId,
    accessibleCampuses: session.tenantContext.accessibleCampuses,
    userId: session.user.id,
    userRole: session.user.role,
  };

  return (
    <div className="min-h-screen bg-[#FBF8EF] text-[#102625] flex flex-col font-sans transition-colors duration-200">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-[#0B2F29] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200 border border-[#C49A3A]/40">
          <span className="w-2 h-2 rounded-full bg-[#DFC679] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Topbar */}
      <AppTopbar
        currentUser={session.user}
        tenantContext={session.tenantContext}
        onOpenScopeSelector={handleOpenScope}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onSwitchUser={onSwitchUser}
        onLogout={onLogout}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Body: Sidebar + Dynamic Content */}
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar
          activeNav={activeNav}
          onSelectNav={onSelectNav}
          currentUser={session.user}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full pb-20 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeNav={activeNav}
        onSelectNav={onSelectNav}
        currentUser={session.user}
        onOpenMenu={() => setIsMobileSidebarOpen(true)}
      />

      {/* Global Overlays & Modals */}
      <ScopeSelectorModal
        isOpen={isScopeModalOpen}
        onClose={handleCloseScope}
        tenantContext={session.tenantContext}
        currentUser={session.user}
        onSwitchCampus={onSwitchCampus}
      />

      <GlobalCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        tenantContext={activeTenantContext}
        currentUser={session.user}
        onNavigate={(target, params) => {
          onSelectNav(target, params);
        }}
      />

      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        currentUser={session.user}
        onActionClick={(target) => {
          onSelectNav(target);
        }}
      />
    </div>
  );
}
