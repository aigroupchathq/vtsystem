import React, { useState } from 'react';
import LoginModal from './components/LoginModal.jsx';
import StudentsDirectory from './components/sis/StudentsDirectory.jsx';
import StudentAdmissionModal from './components/sis/StudentAdmissionModal.jsx';
import StudentProfileModal from './components/sis/StudentProfileModal.jsx';
import Student360View from './components/sis/Student360View.jsx';
import EmployeesDirectory from './components/hrms/EmployeesDirectory.jsx';
import EmployeeOnboardModal from './components/hrms/EmployeeOnboardModal.jsx';
import EmployeeProfileModal from './components/hrms/EmployeeProfileModal.jsx';
import AttendanceHub from './components/attendance/AttendanceHub.jsx';
import ApplyLeaveModal from './components/attendance/ApplyLeaveModal.jsx';
import StaffCheckInModal from './components/attendance/StaffCheckInModal.jsx';
import AdmissionsHub from './components/admissions/AdmissionsHub.jsx';
import NewLeadModal from './components/admissions/NewLeadModal.jsx';
import ScheduleVisitModal from './components/admissions/ScheduleVisitModal.jsx';
import AssessmentModal from './components/admissions/AssessmentModal.jsx';
import ConvertStudentModal from './components/admissions/ConvertStudentModal.jsx';
import LeadDetailModal from './components/admissions/LeadDetailModal.jsx';
import TenantHierarchyView from './components/platform/TenantHierarchyView.jsx';
import RbacMatrixView from './components/platform/RbacMatrixView.jsx';
import AuditLogsView from './components/platform/AuditLogsView.jsx';
import { FinanceHub } from './components/finance/FinanceHub.jsx';
import CommunicationHub from './components/communication/CommunicationHub.jsx';
import AcademicsHub from './components/academics/AcademicsHub.jsx';
import { OperationsHub } from './components/operations/index.js';
import { DesignSystemShowcase } from './design-system/showcase/DesignSystemShowcase.jsx';
import { OverviewDashboard } from './components/overview/OverviewDashboard.jsx';
import { AppShell } from './components/shell/index.js';
import { AuthService } from './modules/platform/auth.service.js';

export default function App() {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialNav = urlParams?.get('nav') || 'overview';
  const roleParam = urlParams?.get('role')?.toLowerCase();

  // Resolve user session from roleParam or default to HQ Admin
  let initialSession;
  if (roleParam === 'principal') {
    initialSession = AuthService.login('principal.baner@vedictree.edu.in', 'principal123');
  } else if (roleParam === 'teacher') {
    initialSession = AuthService.login('sunita.patil@vedictree.edu.in', 'teacher123');
  } else if (roleParam === 'parent') {
    initialSession = AuthService.login('priya.deshmukh@gmail.com', 'parent123');
  } else if (roleParam === 'student') {
    initialSession = AuthService.login('aarav.sharma@student.vedictree.edu.in', 'student123');
  } else {
    initialSession = AuthService.login('admin@vedictree.edu.in', 'admin123');
  }

  const initialStudentId = urlParams?.get('studentId') || (roleParam === 'student' ? 'stu-aarav-sharma' : null);

  const [session, setSession] = useState(initialSession);
  const [activeNav, setActiveNav] = useState(initialNav);
  const [toastMessage, setToastMessage] = useState('');
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [isApplyLeaveModalOpen, setIsApplyLeaveModalOpen] = useState(false);
  const [isPunchModalOpen, setIsPunchModalOpen] = useState(false);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isScheduleVisitModalOpen, setIsScheduleVisitModalOpen] = useState(false);
  const [selectedVisitLead, setSelectedVisitLead] = useState(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [selectedAssessmentLead, setSelectedAssessmentLead] = useState(null);
  const [selectedAssessmentApp, setSelectedAssessmentApp] = useState(null);
  const [isConvertStudentModalOpen, setIsConvertStudentModalOpen] = useState(false);
  const [selectedConvertLead, setSelectedConvertLead] = useState(null);
  const [selectedConvertApp, setSelectedConvertApp] = useState(null);
  const [selectedDetailLeadId, setSelectedDetailLeadId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudentId);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

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

  const handleSwitchUser = (email, password) => {
    try {
      const newSession = AuthService.login(email, password);
      handleLoginSuccess(newSession);
    } catch (err) {
      showToast(err.message);
    }
  };

  // Active Context for all service operations
  const activeTenantContext = {
    organizationId: session.tenantContext.organizationId,
    campusId: session.tenantContext.activeCampusId,
    activeCampusId: session.tenantContext.activeCampusId,
    userId: session.user.id,
    userRole: session.user.role
  };

  return (
    <>
      <AppShell
      session={session}
      activeNav={activeNav}
      onSelectNav={(target, params) => {
        if (params?.studentId) setSelectedStudentId(params.studentId);
        if (params?.employeeId) setSelectedEmployeeId(params.employeeId);
        if (params?.leadId) setSelectedDetailLeadId(params.leadId);
        setActiveNav(target);
      }}
      onSwitchCampus={handleSwitchCampus}
      onSwitchUser={handleSwitchUser}
      onLogout={handleLogout}
      toastMessage={toastMessage}
      isScopeModalOpen={isScopeModalOpen}
      onOpenScopeModal={() => setIsScopeModalOpen(true)}
      onCloseScopeModal={() => setIsScopeModalOpen(false)}
    >
      {activeNav === 'overview' && (
        <OverviewDashboard
          tenantContext={activeTenantContext}
          currentUser={session.user}
          onNavigate={(target, params) => {
            if (params?.studentId) setSelectedStudentId(params.studentId);
            if (params?.employeeId) setSelectedEmployeeId(params.employeeId);
            if (params?.leadId) setSelectedDetailLeadId(params.leadId);
            setActiveNav(target);
          }}
          onSwitchCampus={handleSwitchCampus}
          onOpenScopeModal={() => setIsScopeModalOpen(true)}
        />
      )}

      {activeNav === 'operations' && (
        <OperationsHub
          currentCampus={{
            id: session.tenantContext.activeCampusId,
            name: session.tenantContext.campuses?.find(c => c.id === session.tenantContext.activeCampusId)?.name || 'Panvel Campus [Demo Campus]'
          }}
          currentUser={session.user}
        />
      )}

      {activeNav === 'academics' && (
        <AcademicsHub
          context={{
            ...activeTenantContext,
            campusName: session.tenantContext.campuses?.find(c => c.id === session.tenantContext.activeCampusId)?.name || 'Panvel Campus [Demo Campus]'
          }}
          onShowToast={showToast}
            />
          )}

          {activeNav === 'communication' && (
            <CommunicationHub
              context={{
                ...activeTenantContext,
                campusName: session.tenantContext.campuses?.find(c => c.id === session.tenantContext.activeCampusId)?.name || 'Panvel Campus [Demo Campus]'
              }}
              onShowToast={showToast}
            />
          )}

          {activeNav === 'finance' && (
            <FinanceHub
              context={{
                ...activeTenantContext,
                userName: `${session.user.firstName} ${session.user.lastName}`,
                campusName: session.tenantContext.campuses?.find(c => c.id === session.tenantContext.activeCampusId)?.name || 'Panvel Campus [Demo Campus]'
              }}
            />
          )}

          {activeNav === 'admissions' && (
            <AdmissionsHub
              tenantContext={activeTenantContext}
              currentUser={session.user}
              onOpenNewLeadModal={() => setIsNewLeadModalOpen(true)}
              onOpenScheduleVisitModal={(lead) => {
                setSelectedVisitLead(lead);
                setIsScheduleVisitModalOpen(true);
              }}
              onOpenAssessmentModal={(lead, app) => {
                setSelectedAssessmentLead(lead);
                setSelectedAssessmentApp(app);
                setIsAssessmentModalOpen(true);
              }}
              onOpenConvertStudentModal={(lead, app) => {
                setSelectedConvertLead(lead);
                setSelectedConvertApp(app);
                setIsConvertStudentModalOpen(true);
              }}
              onOpenLeadDetailModal={(leadId) => setSelectedDetailLeadId(leadId)}
              onShowToast={showToast}
            />
          )}

          {activeNav === 'students' && (
            session.user.role === 'PARENT' ? (
              <Student360View
                studentId="stu-aarav-sharma"
                tenantContext={activeTenantContext}
                currentUser={session.user}
                onBack={() => setActiveNav('overview')}
                onNavigate={(target, params) => {
                  if (params?.studentId) setSelectedStudentId(params.studentId);
                  setActiveNav(target);
                }}
              />
            ) : session.user.role === 'STUDENT' ? (
              <Student360View
                studentId="stu-aarav-sharma"
                tenantContext={activeTenantContext}
                currentUser={session.user}
                onBack={() => setActiveNav('overview')}
                onNavigate={(target, params) => {
                  if (params?.studentId) setSelectedStudentId(params.studentId);
                  setActiveNav(target);
                }}
              />
            ) : selectedStudentId ? (
              <Student360View
                studentId={selectedStudentId}
                tenantContext={activeTenantContext}
                currentUser={session.user}
                onBack={() => setSelectedStudentId(null)}
                onNavigate={(target, params) => {
                  if (params?.studentId) setSelectedStudentId(params.studentId);
                  setActiveNav(target);
                }}
              />
            ) : (
              <StudentsDirectory
                tenantContext={activeTenantContext}
                currentUser={session.user}
                onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
                onSelectStudent={(id) => setSelectedStudentId(id)}
              />
            )
          )}

          {activeNav === 'student-360' && (
            <Student360View
              studentId={selectedStudentId || 'stu-kabir-deshmukh'}
              tenantContext={activeTenantContext}
              currentUser={session.user}
              onBack={() => setActiveNav('students')}
              onNavigate={(target, params) => {
                if (params?.studentId) setSelectedStudentId(params.studentId);
                setActiveNav(target);
              }}
            />
          )}

          {(activeNav === 'employees' || activeNav === 'hrms') && (
            <EmployeesDirectory
              tenantContext={activeTenantContext}
              currentUser={session.user}
              onOpenOnboardModal={() => setIsOnboardModalOpen(true)}
              onSelectEmployee={(emp) => setSelectedEmployeeId(emp.id)}
            />
          )}

          {activeNav === 'attendance' && (
            <AttendanceHub
              tenantContext={activeTenantContext}
              currentUser={session.user}
              onOpenApplyLeaveModal={() => setIsApplyLeaveModalOpen(true)}
              onOpenPunchModal={() => setIsPunchModalOpen(true)}
              onShowToast={showToast}
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

          {activeNav === 'design-system' && (
            <DesignSystemShowcase onBack={() => setActiveNav('students')} />
          )}
      </AppShell>

      {/* Modals & Dialogs */}
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
        isOpen={Boolean(selectedStudentId) && activeNav !== 'students' && activeNav !== 'student-360'}
        onClose={() => setSelectedStudentId(null)}
        studentId={selectedStudentId}
        tenantContext={activeTenantContext}
        currentUser={session.user}
      />

      <EmployeeOnboardModal
        isOpen={isOnboardModalOpen}
        onClose={() => setIsOnboardModalOpen(false)}
        tenantContext={activeTenantContext}
        onOnboardSuccess={(newEmp) => {
          showToast(`Staff member ${newEmp.employeeCode} onboarded successfully!`);
        }}
      />

      <EmployeeProfileModal
        isOpen={Boolean(selectedEmployeeId)}
        onClose={() => setSelectedEmployeeId(null)}
        employeeId={selectedEmployeeId}
        tenantContext={activeTenantContext}
      />

      <ApplyLeaveModal
        isOpen={isApplyLeaveModalOpen}
        onClose={() => setIsApplyLeaveModalOpen(false)}
        tenantContext={activeTenantContext}
        currentUser={session.user}
        onSuccess={(req) => showToast(`Leave request ${req.id} submitted for approval!`)}
      />

      <StaffCheckInModal
        isOpen={isPunchModalOpen}
        onClose={() => setIsPunchModalOpen(false)}
        tenantContext={activeTenantContext}
        onSuccess={(rec) => showToast(`Punch recorded: ${rec.status}`)}
      />

      {/* Module 03 Admissions Modals */}
      <NewLeadModal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        tenantContext={activeTenantContext}
        onSuccess={() => showToast('New admission lead added to pipeline!')}
        onShowToast={showToast}
      />

      <ScheduleVisitModal
        isOpen={isScheduleVisitModalOpen}
        onClose={() => {
          setIsScheduleVisitModalOpen(false);
          setSelectedVisitLead(null);
        }}
        tenantContext={activeTenantContext}
        lead={selectedVisitLead}
        onSuccess={() => showToast('Campus tour scheduled!')}
        onShowToast={showToast}
      />

      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => {
          setIsAssessmentModalOpen(false);
          setSelectedAssessmentLead(null);
          setSelectedAssessmentApp(null);
        }}
        tenantContext={activeTenantContext}
        lead={selectedAssessmentLead}
        application={selectedAssessmentApp}
        onSuccess={() => showToast('Entrance evaluation recorded!')}
        onShowToast={showToast}
      />

      <ConvertStudentModal
        isOpen={isConvertStudentModalOpen}
        onClose={() => {
          setIsConvertStudentModalOpen(false);
          setSelectedConvertLead(null);
          setSelectedConvertApp(null);
        }}
        tenantContext={activeTenantContext}
        lead={selectedConvertLead}
        application={selectedConvertApp}
        onSuccess={() => showToast('Candidate officially enrolled into Student Core!')}
        onShowToast={showToast}
      />

      <LeadDetailModal
        isOpen={Boolean(selectedDetailLeadId)}
        onClose={() => setSelectedDetailLeadId(null)}
        tenantContext={activeTenantContext}
        leadId={selectedDetailLeadId}
        onOpenScheduleVisit={(lead) => {
          setSelectedVisitLead(lead);
          setIsScheduleVisitModalOpen(true);
        }}
        onOpenAssessment={(lead, app) => {
          setSelectedAssessmentLead(lead);
          setSelectedAssessmentApp(app);
          setIsAssessmentModalOpen(true);
        }}
        onOpenConvertStudent={(lead, app) => {
          setSelectedConvertLead(lead);
          setSelectedConvertApp(app);
          setIsConvertStudentModalOpen(true);
        }}
        onShowToast={showToast}
        onRefresh={() => {}}
      />
    </>
  );
}
