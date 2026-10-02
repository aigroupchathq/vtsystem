import React, { useState } from 'react';
import Topbar from './components/Topbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import TenantSwitcherModal from './components/TenantSwitcherModal.jsx';
import CommandPaletteModal from './components/CommandPaletteModal.jsx';
import LoginModal from './components/LoginModal.jsx';
import StudentsDirectory from './components/sis/StudentsDirectory.jsx';
import StudentAdmissionModal from './components/sis/StudentAdmissionModal.jsx';
import StudentProfileModal from './components/sis/StudentProfileModal.jsx';
import EmployeesDirectory from './components/hrms/EmployeesDirectory.jsx';
import EmployeeOnboardModal from './components/hrms/EmployeeOnboardModal.jsx';
import TenantHierarchyView from './components/platform/TenantHierarchyView.jsx';
import RbacMatrixView from './components/platform/RbacMatrixView.jsx';
import AuditLogsView from './components/platform/AuditLogsView.jsx';
import { AuthService } from './modules/platform/auth.service.js';

export default function App() {
  // Initial default authentication (HQ Administrator)
  const initialSession = AuthService.login('admin@vedictree.edu.in', 'admin123');

  const [session, setSession] = useState(initialSession);
  const [activeNav, setActiveNav] = useState('students');
  const [toastMessage, setToastMessage] = useState('');

  // Modals state
  const [isTenantSwitcherOpen, setIsTenantSwitcherOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSwitchCampus = (campusId) => {
    try {
      const updated = AuthService.switchCampus(session.token, campusId);
      setSession(prev => ({
        ...prev,
        token: updated.token,
        tenantContext: {
          ...prev.tenantContext,
          activeCampusId: updated.activeCampusId
        }
      }));
      showToast(`Switched active operational campus context`);
    } catch (err) {
      showToast(err.message);
    }
  };

  const handleLoginSuccess = (newSession) => {
    setSession(newSession);
    showToast(`Logged in as ${newSession.user.firstName} (${newSession.user.role})`);
  };

  const handleLogout = () => {
    setIsLoginModalOpen(true);
  };

  // Active Context for all service operations
  const activeTenantContext = {
    organizationId: session.tenantContext.organizationId,
    campusId: session.tenantContext.activeCampusId,
    userId: session.user.id,
    userRole: session.user.role
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans">
      {/* Toast banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-300 px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Topbar with Persistent Tenant Switcher */}
      <Topbar
        currentUser={session.user}
        tenantContext={session.tenantContext}
        onOpenTenantSwitcher={() => setIsTenantSwitcherOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Layout Body: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeNav={activeNav}
          onSelectNav={setActiveNav}
          currentUser={session.user}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeNav === 'students' && (
            <StudentsDirectory
              tenantContext={activeTenantContext}
              currentUser={session.user}
              onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
              onSelectStudent={(id) => setSelectedStudentId(id)}
            />
          )}

          {activeNav === 'employees' && (
            <EmployeesDirectory
              tenantContext={activeTenantContext}
              currentUser={session.user}
              onOpenOnboardModal={() => setIsOnboardModalOpen(true)}
              onSelectEmployee={() => {}}
            />
          )}

          {activeNav === 'hierarchy' && (
            <TenantHierarchyView
              tenantContext={session.tenantContext}
              onSwitchCampus={handleSwitchCampus}
            />
          )}

          {activeNav === 'rbac' && (
            <RbacMatrixView />
          )}

          {activeNav === 'audit' && (
            <AuditLogsView tenantContext={activeTenantContext} />
          )}
        </main>
      </div>

      {/* Modals & Dialogs */}
      <TenantSwitcherModal
        isOpen={isTenantSwitcherOpen}
        onClose={() => setIsTenantSwitcherOpen(false)}
        tenantContext={session.tenantContext}
        currentUser={session.user}
        onSwitchCampus={handleSwitchCampus}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        tenantContext={activeTenantContext}
        onNavigate={(target) => setActiveNav(target)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <StudentAdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
        tenantContext={activeTenantContext}
        onAdmissionSuccess={(newStudent) => {
          showToast(`Student ${newStudent.admissionNumber} admitted & enrolled successfully!`);
        }}
      />

      <StudentProfileModal
        isOpen={Boolean(selectedStudentId)}
        onClose={() => setSelectedStudentId(null)}
        studentId={selectedStudentId}
        tenantContext={activeTenantContext}
      />

      <EmployeeOnboardModal
        isOpen={isOnboardModalOpen}
        onClose={() => setIsOnboardModalOpen(false)}
        tenantContext={activeTenantContext}
        onOnboardSuccess={(newEmp) => {
          showToast(`Staff member ${newEmp.employeeCode} onboarded successfully!`);
        }}
      />
    </div>
  );
}
