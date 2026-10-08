import React, { useState } from 'react';
import {
  Compass,
  Shield,
  BookOpen,
  Sparkles,
  Heart,
  Award,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  UserCheck,
  ArrowLeft,
  Plus,
  Filter,
  ChevronRight,
  TrendingUp,
  Info,
  Lock,
  ShieldAlert,
  GraduationCap,
  Building2,
  Phone,
  Mail,
  MapPin,
  X,
  Target,
  Smile,
  ListChecks,
  Eye,
  HelpCircle
} from 'lucide-react';
import { Student360Service, NON_CLINICAL_SAFEGUARDING_DISCLAIMER } from '../../modules/sis/student-360.service.js';
import { RbacService } from '../../modules/platform/rbac.service.js';

export default function Student360View({
  studentId,
  tenantContext,
  currentUser,
  onBack,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('compass');
  const [selectedAxisKey, setSelectedAxisKey] = useState('character');
  const [isObservationModalOpen, setIsObservationModalOpen] = useState(false);
  const [observationForm, setObservationForm] = useState({
    axisKey: 'character',
    facetName: 'Character & Values',
    title: '',
    observation: '',
    rubricLevel: 'PROFICIENT',
    context: 'Classroom Activity'
  });
  const [obsError, setObsError] = useState('');
  const [obsSuccess, setObsSuccess] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Retrieve comprehensive student 360 data via domain service
  let data = null;
  let accessError = null;

  try {
    data = Student360Service.getStudent360(tenantContext, studentId);
  } catch (err) {
    accessError = err;
  }

  if (accessError) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students Directory</span>
        </button>

        <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-xl p-8 sm:p-12 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tenant Access Restricted</h2>
          <p className="text-xs text-red-600 dark:text-red-300 mt-2 font-mono">
            {accessError.message}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            PostgreSQL Row Level Security (RLS) and Tenant Context Guards block cross-campus and unlinked guardian record queries.
          </p>
        </div>
      </div>
    );
  }

  const { student, developmentCompass, academics, attendance, financials, pastoral, documents } = data;
  const axes = developmentCompass.axes;
  const activeAxis = axes[selectedAxisKey] || axes.character;

  const canAddObservation =
    RbacService.hasPermission(currentUser.role, 'students:update') ||
    RbacService.hasPermission(currentUser.role, 'academic:grades_manage');

  const isTeacher = currentUser.role === 'TEACHER';
  const isParent = currentUser.role === 'PARENT';
  const isStudent = currentUser.role === 'STUDENT';
  const isPrincipal = ['PRINCIPAL', 'HQ_ADMIN', 'DIRECTOR'].includes(currentUser.role);

  const handleRecordObservation = (e) => {
    e.preventDefault();
    setObsError('');
    setObsSuccess('');

    try {
      Student360Service.recordFormativeObservation(tenantContext, studentId, {
        ...observationForm,
        teacherName: `${currentUser.firstName || ''} ${currentUser.lastName || ''} (${currentUser.role})`
      });
      setObsSuccess('Formative observation recorded in development ledger.');
      setIsObservationModalOpen(false);
      setObservationForm({
        axisKey: 'character',
        facetName: 'Character & Values',
        title: '',
        observation: '',
        rubricLevel: 'PROFICIENT',
        context: 'Classroom Activity'
      });
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      setObsError(err.message);
    }
  };

  // Helper for stage styling aligned to Vedic Tree visual hierarchy
  const getStageBadge = (stage) => {
    switch (stage) {
      case 'Exemplary':
      case 'EXEMPLARY':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0B2F29] text-[#DFC679] border border-[#C49A3A]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#87E51F]" />
            <span>Exemplary</span>
          </span>
        );
      case 'Proficient':
      case 'PROFICIENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2D705C]/15 text-[#2D705C] border border-[#2D705C]/35">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D705C]" />
            <span>Proficient</span>
          </span>
        );
      case 'Developing':
      case 'DEVELOPING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49A3A]" />
            <span>Developing</span>
          </span>
        );
      case 'Emerging':
      case 'EMERGING':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFE9DD] text-[#60706B] border border-[#E6DFD1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7E8D88]" />
            <span>Emerging</span>
          </span>
        );
    }
  };

  const getAxisDisplayName = (key) => {
    switch (key) {
      case 'character': return 'Character & Values';
      case 'academics': return 'Academic Excellence';
      case 'lifeSkills': return 'Life Skills & Agency';
      case 'wellbeing': return 'Mindfulness, Composure & Reflection';
      default: return key;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#60706B] hover:text-[#0B2F29] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Students Directory</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Persona View Indicator */}
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/60 font-bold">
            VIEW: {isPrincipal ? 'PRINCIPAL DOSSIER' : isTeacher ? 'TEACHER COCKPIT' : isParent ? 'PARENT PORTAL' : 'STUDENT JOURNAL'}
          </span>

          {canAddObservation && (
            <button
              onClick={() => setIsObservationModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2F29] hover:bg-[#154E42] text-[#FBF8EF] text-xs font-semibold border border-[#C49A3A]/40 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#DFC679]" />
              <span>Record <span className="hidden sm:inline">Formative </span>Observation</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. STUDENT IDENTITY & BASELINE RIBBON */}
      <div className="bg-white border border-[#E6DFD1] rounded-xl overflow-hidden">
        <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#E6DFD1]">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#0B2F29] border border-[#C49A3A]/40 flex items-center justify-center text-lg font-bold text-[#DFC679] font-sans shrink-0">
              {student.initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-sans text-[#0B2F29] tracking-tight">
                  {student.fullName}
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F4EEDC] text-[#102625] border border-[#E6DFD1]">
                  {student.admissionNumber}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2D705C]/15 text-[#2D705C] border border-[#2D705C]/30 font-semibold">
                  {student.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-[#334E47] font-medium">
                <span>Placement: <strong className="text-[#102625]">{student.gradeName} - {student.divisionName} (Roll #{student.enrollment?.rollNumber || '—'})</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#60706B]" />
                  <span>{student.campusName}</span>
                </span>
                <span>•</span>
                <span>DOB: <strong className="text-[#102625]">{student.dob}</strong> ({student.gender} • {student.bloodGroup})</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-right">
            <div className="text-left sm:text-right">
              <div className="text-[10px] font-mono uppercase text-[#60706B] tracking-wider">Formative Portfolio</div>
              <div className="text-base font-bold text-[#0B2F29] font-mono tabular-nums">
                {developmentCompass.totalEvidenceCount} Observations
                <span className="text-xs font-semibold text-[#2D705C] ml-1.5 font-sans">
                  • Active Term
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Vital Signs Strip — Objective Quantitative Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6DFD1] text-xs bg-[#FBF8EF]/60">
          <div className="p-3.5 sm:px-5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#60706B]">Term Attendance</div>
            <div className="text-base font-bold text-[#0B2F29] font-mono mt-0.5 tabular-nums">
              {attendance.percentage}%
            </div>
            <div className="text-[10px] text-[#2D705C] mt-0.5 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#2D705C]" />
              <span>{attendance.presentDays}/{attendance.totalWorkingDays} days ({attendance.streakDays}d streak)</span>
            </div>
          </div>

          <div className="p-3.5 sm:px-5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#60706B]">Curricular Evaluation</div>
            <div className="text-base font-bold text-[#0B2F29] font-mono mt-0.5">
              Grade {academics.reportCards[0]?.overallGrade || 'A1'} ({academics.reportCards[0]?.overallPercentage || 93.3}%)
            </div>
            <div className="text-[10px] text-[#60706B] mt-0.5">
              Term 1 Summative Assessment
            </div>
          </div>

          {/* Fee Strip: Masked for Teacher and Student */}
          <div className="p-3.5 sm:px-5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#60706B]">School Tuition Status</div>
            {financials.isRestricted ? (
              <>
                <div className="text-sm font-semibold text-[#60706B] mt-0.5">
                  Restricted Access
                </div>
                <div className="text-[10px] text-[#7E8D88] mt-0.5">
                  Administration & Guardian Portal Only
                </div>
              </>
            ) : (
              <>
                <div className="text-base font-bold text-[#0B2F29] font-mono mt-0.5">
                  {financials.balanceDueINR === 0 ? 'Cleared (₹0 Due)' : `₹${financials.balanceDueINR?.toLocaleString('en-IN')} Due`}
                </div>
                <div className="text-[10px] text-[#60706B] mt-0.5">
                  SPV Campus Operational Fee
                </div>
              </>
            )}
          </div>

          <div className="p-3.5 sm:px-5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#60706B]">Emergency & Pickup</div>
            <div className="text-base font-bold text-[#0B2F29] mt-0.5 truncate">
              {student.guardiansDetailed[0]?.firstName ? `${student.guardiansDetailed[0].firstName} ${student.guardiansDetailed[0].lastName}` : 'Guardian on file'}
            </div>
            <div className="text-[10px] text-[#60706B] mt-0.5 truncate font-mono">
              {student.emergencyPhone}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Perspective Tabs — Role-Filtered */}
      <div className="flex items-center gap-1 border-b border-[#E6DFD1] overflow-x-auto text-xs font-semibold pb-px scrollbar-none">
        <button
          onClick={() => setActiveTab('compass')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === 'compass'
              ? 'border-[#0B2F29] text-[#0B2F29] font-bold'
              : 'border-transparent text-[#60706B] hover:text-[#0B2F29]'
          }`}
        >
          <Compass className="w-4 h-4 text-[#2D705C]" />
          <span>Developmental Matrix & Evidence</span>
        </button>

        <button
          onClick={() => setActiveTab('academics')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === 'academics'
              ? 'border-[#0B2F29] text-[#0B2F29] font-bold'
              : 'border-transparent text-[#60706B] hover:text-[#0B2F29]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#2D705C]" />
          <span>Curricular & CCE Performance</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === 'attendance'
              ? 'border-[#0B2F29] text-[#0B2F29] font-bold'
              : 'border-transparent text-[#60706B] hover:text-[#0B2F29]'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#2D705C]" />
          <span>Attendance Ledger</span>
        </button>

        {/* Fees Tab: Hidden from Teacher and Student */}
        {!financials.isRestricted && (
          <button
            onClick={() => setActiveTab('financials')}
            className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'financials'
                ? 'border-[#0B2F29] text-[#0B2F29] font-bold'
                : 'border-transparent text-[#60706B] hover:text-[#0B2F29]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#2D705C]" />
            <span>School Fees Ledger</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('family')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === 'family'
              ? 'border-[#0B2F29] text-[#0B2F29] font-bold'
              : 'border-transparent text-[#60706B] hover:text-[#0B2F29]'
          }`}
        >
          <UserCheck className="w-4 h-4 text-[#2D705C]" />
          <span>Guardians & Documents ({documents.length})</span>
        </button>

        {/* Pastoral Tab: Visible to Principal, Redacted to others */}
        {(isPrincipal || pastoral.accessGranted) && (
          <button
            onClick={() => setActiveTab('pastoral')}
            className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'pastoral'
                ? 'border-[#0B2F29] text-[#0B2F29] font-bold'
                : 'border-transparent text-[#60706B] hover:text-[#0B2F29]'
            }`}
          >
            <Lock className="w-4 h-4 text-[#E35D52]" />
            <span>Pastoral & Safeguarding</span>
          </button>
        )}
      </div>

      {/* 2. TAB CONTENT PANES */}

      {/* TAB 1: LINEAR DEVELOPMENTAL CONTINUUM MATRIX */}
      {activeTab === 'compass' && (
        <div className="space-y-6">
          {/* Main Matrix Stage */}
          <div className="bg-white border border-[#E6DFD1] rounded-xl overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-[#EFE9DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FBF8EF]/60">
              <div>
                <h3 className="text-base font-sans font-bold text-[#0B2F29] flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#2D705C]" />
                  <span>Vedic Tree Holistic Development Continuum</span>
                </h3>
                <p className="text-xs text-[#334E47] mt-0.5">
                  Qualitative formative progression across 4 cardinal areas. Formative stages reflect documented classroom and campus evidence — not numeric rankings.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#2D705C] bg-[#F4EEDC] px-3 py-1 rounded-full border border-[#DFC679]/50 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#87E51F]" />
                <span>Formative Qualitative Model</span>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E6DFD1] text-[10px] font-mono text-[#60706B] uppercase bg-[#FBF8EF]">
                    <th className="py-3 px-5">Development Area</th>
                    <th className="py-3 px-4">Formative Stage</th>
                    <th className="py-3 px-4 text-right">Verified Evidence</th>
                    <th className="py-3 px-4">Last Observed</th>
                    <th className="py-3 px-5">Educator Scaffolding Focus</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE9DD]">
                  {Object.entries(axes).map(([key, axis]) => {
                    const isSelected = selectedAxisKey === key;
                    return (
                      <tr
                        key={key}
                        onClick={() => setSelectedAxisKey(key)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#F4EEDC]/45 font-medium border-l-2 border-[#C49A3A]'
                            : 'hover:bg-[#FBF8EF]/75'
                        }`}
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <span
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#FBF8EF] text-xs font-bold shrink-0"
                              style={{ backgroundColor: axis.color }}
                            >
                              {axis.direction === 'North' ? '▲' : axis.direction === 'East' ? '►' : axis.direction === 'South' ? '▼' : '◄'}
                            </span>
                            <div>
                              <div className="font-sans font-bold text-[#0B2F29] text-sm">
                                {getAxisDisplayName(key)}
                              </div>
                              <div className="text-xs text-[#334E47]">
                                {axis.direction} Orientation • Gurukul Pillar
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 min-w-[280px]">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              {getStageBadge(axis.stage)}
                            </div>
                            <div className="pt-1.5 pb-1 px-1">
                              <div className="h-1 w-full bg-[#E6DFD1] rounded-full relative flex items-center justify-between">
                                {['Emerging', 'Developing', 'Proficient', 'Exemplary'].map((stg, idx) => {
                                  const currentIdx = ['Emerging', 'Developing', 'Proficient', 'Exemplary'].findIndex(
                                    s => s.toLowerCase() === (axis.stage || '').toLowerCase()
                                  );
                                  const activeIndex = currentIdx >= 0 ? currentIdx : 0;
                                  const isCurrent = idx === activeIndex;
                                  const isPassed = idx <= activeIndex;
                                  return (
                                    <div key={stg} className="relative flex flex-col items-center">
                                      <span
                                        className={`rounded-full transition-all ${
                                          isCurrent
                                            ? 'w-3 h-3 bg-[#0B2F29] ring-2 ring-[#C49A3A]'
                                            : isPassed
                                            ? 'w-2 h-2 bg-[#2D705C]'
                                            : 'w-2 h-2 bg-[#D6CEBF]'
                                        }`}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="flex justify-between text-[10px] text-[#4A665F] font-medium pt-1.5 select-none">
                                <span className="w-16 text-left">Emerging</span>
                                <span className="w-16 text-center">Developing</span>
                                <span className="w-16 text-center">Proficient</span>
                                <span className="w-16 text-right">Exemplary</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right font-mono tabular-nums text-[#102625]">
                          <span className="font-bold text-[#0B2F29]">{axis.evidenceCount}</span> verified entries
                        </td>

                        <td className="py-4 px-4 text-[#60706B] font-mono text-[11px]">
                          {axis.lastObservedDate || 'Term 1'}
                        </td>

                        <td className="py-4 px-5 text-[#102625]/85 text-xs max-w-xs">
                          <span className="line-clamp-2">{axis.educatorNextStep}</span>
                        </td>

                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAxisKey(key);
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#0B2F29] text-[#DFC679]'
                                : 'bg-[#F4EEDC] text-[#102625] hover:bg-[#EFE9DD]'
                            }`}
                          >
                            <span>Inspect</span>
                            <ChevronRight className="w-3 h-3 text-[#C49A3A]" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#FBF8EF] border-t border-[#EFE9DD] text-xs text-[#60706B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#C49A3A]" />
                <span>Select an area row above to inspect granular formative observations and pedagogical evidence.</span>
              </span>
              <span className="text-[10px] font-mono text-[#60706B] font-semibold">
                Zero Normative Benchmarks • Individual Growth Trajectory
              </span>
            </div>
          </div>

          {/* Drill-down Detail Pane for Selected Axis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Granular Facet Descriptors */}
            <div className="lg:col-span-5 bg-white border border-[#E6DFD1] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DD]">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#FBF8EF] text-xs font-bold"
                    style={{ backgroundColor: activeAxis.color }}
                  >
                    {activeAxis.direction === 'North' ? '▲' : activeAxis.direction === 'East' ? '►' : activeAxis.direction === 'South' ? '▼' : '◄'}
                  </span>
                  <div>
                    <h4 className="text-sm font-sans font-bold text-[#0B2F29]">
                      {getAxisDisplayName(selectedAxisKey)}
                    </h4>
                    <span className="text-xs text-[#334E47]">
                      {activeAxis.direction} Cardinal Focus Area
                    </span>
                  </div>
                </div>
                {getStageBadge(activeAxis.stage)}
              </div>

              {/* Linear Developmental Continuum Tracker */}
              <div className="p-3.5 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#60706B]">
                  <span>Continuum Progression</span>
                  <span className="font-bold text-[#0B2F29]">{activeAxis.stage}</span>
                </div>
                <div className="relative py-1 px-1">
                  <div className="h-0.5 w-full bg-[#E6DFD1] relative flex items-center justify-between">
                    {['Emerging', 'Developing', 'Proficient', 'Exemplary'].map((stg, idx) => {
                      const currentIdx = ['Emerging', 'Developing', 'Proficient', 'Exemplary'].findIndex(
                        s => s.toLowerCase() === (activeAxis.stage || '').toLowerCase()
                      );
                      const activeIndex = currentIdx >= 0 ? currentIdx : 0;
                      const isCurrent = idx === activeIndex;
                      const isPassed = idx <= activeIndex;
                      return (
                        <div key={stg} className="flex flex-col items-center">
                          <span
                            className={`rounded-full transition-all ${
                              isCurrent
                                ? 'w-3.5 h-3.5 bg-[#0B2F29] ring-2 ring-[#C49A3A]'
                                : isPassed
                                ? 'w-2 h-2 bg-[#2D705C]'
                                : 'w-2 h-2 bg-[#D6CEBF]'
                            }`}
                          />
                          <span className={`text-[9px] mt-1.5 font-mono ${isCurrent ? 'font-bold text-[#0B2F29]' : 'text-[#7E8D88]'}`}>
                            {stg}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-[10px] text-[#60706B] font-mono flex items-center justify-between pt-1 border-t border-[#EFE9DD]">
                  <span>{activeAxis.evidenceCount} verified observations</span>
                  <span>Last: {activeAxis.lastObservedDate || 'Term 1'}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#60706B] font-bold">
                  Observed Holistic Dimensions
                </h5>

                {activeAxis.facets.map((facet, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-[#E6DFD1] bg-[#FBF8EF]/60 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeAxis.color }} />
                        <span className="text-xs font-bold text-[#102625]">{facet.name}</span>
                      </div>
                      {getStageBadge(facet.stage)}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {facet.observablePractices.map((practice, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#F4EEDC] border border-[#E6DFD1] text-[#102625] font-medium"
                        >
                          {practice}
                        </span>
                      ))}
                    </div>

                    <div className="text-[10px] text-[#60706B] pt-1 flex items-center justify-between font-mono">
                      <span>Evidence Count: {facet.evidenceCount} verified entries</span>
                      <span>Last: {facet.lastObservedDate}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Educator Next Step Card */}
              <div className="p-3.5 rounded-lg bg-[#F4EEDC]/60 border border-[#DFC679]/60 text-xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#2D705C] font-bold flex items-center gap-1.5 mb-1">
                  <Target className="w-3.5 h-3.5 text-[#2D705C]" />
                  <span>Educator Scaffolding Next Step</span>
                </div>
                <p className="text-[#102625] leading-relaxed">
                  {activeAxis.educatorNextStep}
                </p>
              </div>
            </div>

            {/* Right: Chronological Formative Observations Ledger */}
            <div className="lg:col-span-7 bg-white border border-[#E6DFD1] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DD]">
                <div>
                  <h4 className="text-sm font-sans font-bold text-[#0B2F29] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C49A3A]" />
                    <span>Formative Pedagogical Evidence Ledger</span>
                  </h4>
                  <p className="text-xs text-[#334E47]">
                    Chronological teacher entries recorded during classroom, assembly, seva, and laboratory activities
                  </p>
                </div>

                <span className="text-xs font-mono text-[#60706B] font-semibold">
                  {developmentCompass.observations.length} Observations on Record
                </span>
              </div>

              {developmentCompass.observations.length === 0 ? (
                <div className="py-12 text-center text-[#60706B]">
                  <Sparkles className="w-8 h-8 mx-auto text-[#C49A3A] mb-2" />
                  <p className="text-xs font-semibold text-[#102625]">No Formative Observations Recorded Yet</p>
                  <p className="text-[11px] text-[#60706B] mt-0.5">Authorized teachers can record rubric-based milestone notes.</p>
                </div>
              ) : (
                <div className="divide-y divide-[#EFE9DD]">
                  {developmentCompass.observations.map((obs) => (
                    <div key={obs.id} className="py-4 first:pt-0 last:pb-0 hover:bg-[#FBF8EF]/60 rounded-lg px-2 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#102625]">{obs.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4EEDC] text-[#102625] border border-[#E6DFD1]">
                            {obs.facetName}
                          </span>
                          {getStageBadge(obs.rubricLevel)}
                        </div>
                        <span className="text-[11px] font-mono text-[#60706B]">{obs.date}</span>
                      </div>

                      <p className="text-xs text-[#102625]/90 leading-relaxed italic">
                        "{obs.observation}"
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-[11px] text-[#60706B] font-mono">
                        <span>Context: <strong className="text-[#102625]">{obs.context}</strong></span>
                        <span>•</span>
                        <span>Recorded by: <strong className="text-[#102625]">{obs.teacherName}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CURRICULAR & CCE PERFORMANCE (Objective Marks Preserved) */}
      {activeTab === 'academics' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E6DFD1] rounded-xl p-6">
            <h3 className="text-sm font-sans font-bold text-[#0B2F29] mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2D705C]" />
              <span>Assessment & Examination Results (Objective Curricular Marks)</span>
            </h3>

            {academics.results.length === 0 ? (
              <div className="py-8 text-center text-[#60706B] text-xs">
                No formal examination marks recorded for this academic term yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E6DFD1] text-[10px] font-mono text-[#60706B] uppercase bg-[#FBF8EF]">
                      <th className="py-2.5 px-3">Assessment Title</th>
                      <th className="py-2.5 px-3">Marks Obtained</th>
                      <th className="py-2.5 px-3">Max Marks</th>
                      <th className="py-2.5 px-3">Grade</th>
                      <th className="py-2.5 px-3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE9DD] font-mono">
                    {academics.results.map((res) => (
                      <tr key={res.id} className="hover:bg-[#FBF8EF]/60">
                        <td className="py-3 px-3 font-semibold text-[#102625] font-sans">{res.title || res.assessmentId}</td>
                        <td className="py-3 px-3 font-bold text-[#2D705C]">{res.marksObtained}</td>
                        <td className="py-3 px-3 text-[#60706B]">{res.maxMarks || 40}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4EEDC] text-[#2D705C] border border-[#2D705C]/30">
                            {res.gradeLetter}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-sans text-[#60706B]">{res.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Published Report Card */}
          {academics.reportCards.length > 0 && (
            <div className="bg-white border border-[#E6DFD1] rounded-xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DD] mb-4">
                <div>
                  <h4 className="text-sm font-sans font-bold text-[#0B2F29]">Published Term 1 CCE Report Card</h4>
                  <p className="text-xs text-[#334E47]">Continuous Comprehensive Evaluation • Certified by Principal</p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#0B2F29] text-[#DFC679] border border-[#C49A3A]/40">
                  Grade {academics.reportCards[0].overallGrade} ({academics.reportCards[0].overallPercentage}%)
                </span>
              </div>
              <p className="text-xs text-[#102625]/90 leading-relaxed italic">
                "{academics.reportCards[0].teacherRemarks}"
              </p>
              <div className="mt-4 pt-3 border-t border-[#EFE9DD] text-[11px] font-mono text-[#60706B] flex items-center justify-between">
                <span>Principal Signed: {academics.reportCards[0].principalSignedAt?.split('T')[0] || 'Verified'}</span>
                <span>Term Attendance: {academics.reportCards[0].attendancePercentage}%</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ATTENDANCE LEDGER */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E6DFD1] rounded-xl p-6">
            <h3 className="text-sm font-sans font-bold text-[#0B2F29] mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2D705C]" />
              <span>Attendance & Punctuality Ledger</span>
            </h3>
            <p className="text-xs text-[#60706B] mb-6">{attendance.benchmarkNote}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-[#E6DFD1] bg-[#FBF8EF]">
                <div className="text-[10px] font-mono text-[#60706B] uppercase">Working Days</div>
                <div className="text-2xl font-bold font-mono text-[#102625] mt-1">{attendance.totalWorkingDays}</div>
              </div>
              <div className="p-4 rounded-lg border border-[#2D705C]/30 bg-[#2D705C]/10">
                <div className="text-[10px] font-mono text-[#2D705C] uppercase font-bold">Present Days</div>
                <div className="text-2xl font-bold font-mono text-[#2D705C] mt-1">{attendance.presentDays}</div>
              </div>
              <div className="p-4 rounded-lg border border-[#C49A3A]/40 bg-[#F4EEDC]">
                <div className="text-[10px] font-mono text-[#8C6B1C] uppercase font-bold">Late Arrivals</div>
                <div className="text-2xl font-bold font-mono text-[#8C6B1C] mt-1">{attendance.lateDays}</div>
              </div>
              <div className="p-4 rounded-lg border border-[#E35D52]/30 bg-[#E35D52]/10">
                <div className="text-[10px] font-mono text-[#E35D52] uppercase font-bold">Absent Days</div>
                <div className="text-2xl font-bold font-mono text-[#E35D52] mt-1">{attendance.absentDays}</div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[#E6DFD1] bg-[#FBF8EF] text-xs text-[#102625] flex items-center justify-between">
              <span>Overall Term Rate: <strong className="text-[#0B2F29] font-mono font-bold">{attendance.percentage}%</strong></span>
              <span className="font-semibold text-[#2D705C]">Compliant with statutory 75% CBSE benchmark</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SCHOOL FEES LEDGER (Strictly masked from Teacher and Student) */}
      {activeTab === 'financials' && !financials.isRestricted && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E6DFD1] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFE9DD] gap-2 mb-4">
              <div>
                <h3 className="text-sm font-sans font-bold text-[#0B2F29] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2D705C]" />
                  <span>Campus Tuition Fee Ledger [SOURCE]</span>
                </h3>
                <p className="text-xs text-[#334E47]">School operational collections and tuition clearance</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#2D705C]/15 text-[#2D705C] border border-[#2D705C]/30">
                {financials.feeStatus}
              </span>
            </div>

            {/* Corporate Boundary Note per Constitution Section 14 */}
            <div className="p-3.5 rounded-lg bg-[#F4EEDC]/60 border border-[#DFC679]/50 text-xs text-[#102625] mb-6 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#102625] block mb-0.5">Corporate Boundary & IP Separation Notice [SOURCE]</span>
                <p className="text-[11px] leading-relaxed text-[#60706B]">{financials.corporateBoundaryNote}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-[#E6DFD1] bg-[#FBF8EF]">
                <div className="text-[10px] font-mono text-[#60706B] uppercase">Total Invoiced</div>
                <div className="text-xl font-bold font-mono text-[#102625] mt-1">₹{financials.totalInvoicedINR?.toLocaleString('en-IN')}</div>
              </div>
              <div className="p-4 rounded-lg border border-[#2D705C]/30 bg-[#2D705C]/10">
                <div className="text-[10px] font-mono text-[#2D705C] uppercase font-bold">Collected / Cleared</div>
                <div className="text-xl font-bold font-mono text-[#2D705C] mt-1">₹{financials.totalPaidINR?.toLocaleString('en-IN')}</div>
              </div>
              <div className="p-4 rounded-lg border border-[#E6DFD1] bg-[#FBF8EF]">
                <div className="text-[10px] font-mono text-[#60706B] uppercase">Balance Due</div>
                <div className="text-xl font-bold font-mono text-[#102625] mt-1">₹{financials.balanceDueINR?.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {financials.invoices.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#60706B] font-mono">
                No outstanding invoice records found for this student.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E6DFD1] text-[10px] font-mono text-[#60706B] uppercase bg-[#FBF8EF]">
                      <th className="py-2 px-3">Invoice Number</th>
                      <th className="py-2 px-3">Due Date</th>
                      <th className="py-2 px-3">Total Amount</th>
                      <th className="py-2 px-3">Paid Amount</th>
                      <th className="py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE9DD] font-mono">
                    {financials.invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#FBF8EF]/60">
                        <td className="py-2.5 px-3 font-semibold text-[#102625]">{inv.invoiceNumber}</td>
                        <td className="py-2.5 px-3 text-[#60706B]">{inv.dueDate}</td>
                        <td className="py-2.5 px-3">₹{inv.totalAmount?.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-[#2D705C] font-bold">₹{inv.paidAmount?.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4EEDC] text-[#2D705C] border border-[#2D705C]/30">
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: GUARDIANS & DOCUMENTS */}
      {activeTab === 'family' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E6DFD1] rounded-xl p-6">
              <h3 className="text-sm font-sans font-bold text-[#0B2F29] mb-4 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#2D705C]" />
                <span>Primary Guardian Details</span>
              </h3>

              {student.guardiansDetailed.length === 0 ? (
                <div className="text-xs text-[#60706B]">No primary guardian registered.</div>
              ) : (
                <div className="space-y-3 text-xs">
                  {student.guardiansDetailed.map((g, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-[#E6DFD1] bg-[#FBF8EF] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#102625] text-sm">{g.firstName} {g.lastName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2D705C]/15 text-[#2D705C] border border-[#2D705C]/30 font-semibold">
                          {g.relation} • Authorized Pickup
                        </span>
                      </div>
                      <div className="text-[#60706B] flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#60706B]" />
                        <span>{g.phone || student.emergencyPhone}</span>
                      </div>
                      <div className="text-[#60706B] flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#60706B]" />
                        <span>{g.email || 'guardian@email.com'}</span>
                      </div>
                      <div className="text-[#60706B] flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#60706B]" />
                        <span>{g.address || 'Address on file with campus admin.'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-[#E6DFD1] rounded-xl p-6">
              <h3 className="text-sm font-sans font-bold text-[#0B2F29] mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2D705C]" />
                <span>Verified Document Vault ({documents.length})</span>
              </h3>

              {documents.length === 0 ? (
                <div className="text-xs text-[#60706B]">No documents attached.</div>
              ) : (
                <div className="space-y-2.5">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-lg border border-[#E6DFD1] bg-[#FBF8EF] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[#2D705C]" />
                        <div>
                          <div className="font-semibold text-[#102625]">{doc.fileName}</div>
                          <div className="text-[10px] text-[#60706B] font-mono">{doc.documentType} • Verified {doc.verifiedAt}</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#2D705C] font-bold">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PASTORAL & SAFEGUARDING DOSSIER (RBAC TIER 4) */}
      {activeTab === 'pastoral' && (isPrincipal || pastoral.accessGranted) && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E6DFD1] rounded-xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DD] mb-4">
              <div>
                <h3 className="text-sm font-sans font-bold text-[#0B2F29] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#E35D52]" />
                  <span>Tier 4 Confidential Pastoral & Safeguarding Dossier</span>
                </h3>
                <p className="text-xs text-[#60706B]">
                  Protected under Child Protection Invariant II & Statutory POCSO Safeguarding Standards
                </p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#E35D52]/15 text-[#E35D52] border border-[#E35D52]/30 font-bold">
                RESTRICTED ACCESS
              </span>
            </div>

            {!pastoral.accessGranted ? (
              <div className="p-8 text-center bg-[#FBF8EF] rounded-lg border border-dashed border-[#E6DFD1]">
                <Lock className="w-8 h-8 text-[#60706B] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#102625]">Confidential Dossier Redacted</h4>
                <p className="text-xs text-[#60706B] max-w-md mx-auto mt-1 leading-relaxed">
                  {pastoral.redactionReason}
                </p>
              </div>
            ) : (
              <div>
                {pastoral.records.length === 0 ? (
                  <div className="text-xs text-[#60706B] py-6 text-center">
                    No confidential pastoral concerns or health management protocols recorded.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pastoral.records.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-4 rounded-lg border border-[#E35D52]/30 bg-[#FBF8EF] space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#E35D52]">{rec.summary}</span>
                          <span className="text-[10px] font-mono text-[#60706B]">{rec.date}</span>
                        </div>
                        <p className="text-[#102625]/85 leading-relaxed">{rec.notes}</p>
                        <div className="text-[10px] font-mono text-[#60706B] pt-1 flex items-center justify-between">
                          <span>Recorded by: {rec.recordedBy}</span>
                          <span>Next Review: {rec.reviewDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MANDATORY SAFEGUARDING BANNER AT BOTTOM */}
      <div className="p-4 rounded-lg bg-[#F4EEDC] border border-[#DFC679]/70 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5 text-[#102625]">
          <Shield className="w-4 h-4 text-[#2D705C] shrink-0" />
          <div>
            <span className="font-bold text-[#0B2F29] block">
              {NON_CLINICAL_SAFEGUARDING_DISCLAIMER}
            </span>
            <span className="text-[10px] text-[#60706B]">
              Formative developmental stages reflect educational milestones and classroom observations, not clinical classifications or psychometric rankings.
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-[#8C6B1C] font-bold uppercase tracking-wider shrink-0">
          Vedic Tree OS Invariant II
        </span>
      </div>

      {/* RECORD FORMATIVE OBSERVATION MODAL */}
      {isObservationModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B2F29]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E6DFD1] rounded-xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-[#EFE9DD] bg-[#FBF8EF] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B2F29] flex items-center justify-center text-[#DFC679] font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-sans font-bold text-[#0B2F29]">Record Formative Observation</h3>
                  <p className="text-xs text-[#334E47]">Student: {student.fullName} ({student.admissionNumber})</p>
                </div>
              </div>
              <button
                onClick={() => setIsObservationModalOpen(false)}
                className="p-1 rounded-lg text-[#60706B] hover:text-[#102625] hover:bg-[#F4EEDC] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordObservation} className="p-5 space-y-4 text-xs">
              {obsError && (
                <div className="p-3 rounded-lg bg-[#E35D52]/10 border border-[#E35D52]/30 text-[#E35D52] text-xs font-medium">
                  {obsError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#60706B] mb-1">DEVELOPMENT AREA</label>
                  <select
                    value={observationForm.axisKey}
                    onChange={(e) => {
                      const axis = e.target.value;
                      const facet = axis === 'character' ? 'Character & Values' :
                                    axis === 'academics' ? 'Curricular Mastery' :
                                    axis === 'lifeSkills' ? 'Life Skills & Agency' : 'Mindfulness, Composure & Reflection';
                      setObservationForm({ ...observationForm, axisKey: axis, facetName: facet });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] text-[#102625] focus:outline-hidden focus:ring-1 focus:ring-[#0B2F29]"
                  >
                    <option value="character">▲ North: Character & Values</option>
                    <option value="academics">► East: Academic Excellence</option>
                    <option value="lifeSkills">▼ South: Life Skills & Agency</option>
                    <option value="wellbeing">◄ West: Mindfulness, Composure & Reflection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#60706B] mb-1">FORMATIVE STAGE</label>
                  <select
                    value={observationForm.rubricLevel}
                    onChange={(e) => setObservationForm({ ...observationForm, rubricLevel: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] text-[#102625] focus:outline-hidden focus:ring-1 focus:ring-[#0B2F29]"
                  >
                    <option value="EXEMPLARY">Exemplary (Consistently models)</option>
                    <option value="PROFICIENT">Proficient (Independent agency)</option>
                    <option value="DEVELOPING">Developing (Occasional scaffolding)</option>
                    <option value="EMERGING">Emerging (Active support)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#60706B] mb-1">OBSERVATION TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. Peer Collaboration during Science Experiment"
                  value={observationForm.title}
                  onChange={(e) => setObservationForm({ ...observationForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] text-[#102625] focus:outline-hidden focus:ring-1 focus:ring-[#0B2F29]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#60706B] mb-1">PEDAGOGICAL OBSERVATION (NON-CLINICAL ONLY)</label>
                <textarea
                  rows="3"
                  placeholder="Describe observable student behavior, peer dynamics, or learning milestones..."
                  value={observationForm.observation}
                  onChange={(e) => setObservationForm({ ...observationForm, observation: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] text-[#102625] focus:outline-hidden focus:ring-1 focus:ring-[#0B2F29]"
                  required
                />
                <p className="text-[10px] text-[#60706B] mt-1">
                  Non-clinical mandate: Educational observations only. Never enter medical or psychiatric diagnoses.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#60706B] mb-1">ACTIVITY CONTEXT</label>
                <select
                  value={observationForm.context}
                  onChange={(e) => setObservationForm({ ...observationForm, context: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] text-[#102625] focus:outline-hidden focus:ring-1 focus:ring-[#0B2F29]"
                >
                  <option value="Classroom Activity">Classroom Activity</option>
                  <option value="Morning Assembly">Morning Assembly & Dhyana</option>
                  <option value="Science Laboratory">Science Laboratory</option>
                  <option value="Campus Shramdaan & Seva">Campus Shramdaan & Seva</option>
                  <option value="Yoga & Physical Education">Yoga & Physical Education</option>
                  <option value="Courtyard & Playground">Courtyard & Playground</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#EFE9DD] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsObservationModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#E6DFD1] text-[#60706B] hover:text-[#102625] font-medium hover:bg-[#F4EEDC] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0B2F29] hover:bg-[#154E42] text-[#DFC679] font-bold shadow-xs border border-[#C49A3A]/40 transition-colors cursor-pointer"
                >
                  Save Formative Observation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
