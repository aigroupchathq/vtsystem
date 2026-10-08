// VEDIC TREE OS — Institutional Academics & CCE Hub (Module 06)
// Transformed into calm, prestigious, editorial education OS visual language (Prompt 06)

import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  LayoutDashboard,
  UserCheck
} from 'lucide-react';
import { defaultAcademicsService } from '../../modules/academics/academics.service.js';
import { TeacherContextBar } from './TeacherContextBar.jsx';
import { TeacherMyDay } from './TeacherMyDay.jsx';
import { AcademicDashboard } from './AcademicDashboard.jsx';
import { StudentAcademicView } from './StudentAcademicView.jsx';
import { PlanLessonModal } from './PlanLessonModal.jsx';

export function AcademicsHub({ context, onShowToast }) {
  const [activePersonaView, setActivePersonaView] = useState('teacher_my_day'); // teacher_my_day | academic_dashboard | student_view
  const [isPlanLessonOpen, setIsPlanLessonOpen] = useState(false);

  // Initialize and remember teacher context
  const teacherId = 'emp-sunita';
  const [teacherContext, setTeacherContext] = useState(() => {
    return defaultAcademicsService.getTeacherContext(context, teacherId);
  });

  const handleContextChange = (updated) => {
    setTeacherContext(updated);
    defaultAcademicsService.saveTeacherContext(teacherId, updated);
    onShowToast?.(`Context remembered: Grade ${updated.gradeId} • Sec ${updated.divisionId} • ${updated.subjectId}`);
  };

  useEffect(() => {
    // Keep context synced
    defaultAcademicsService.saveTeacherContext(teacherId, teacherContext);
  }, [teacherContext]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 5-Orientation Institutional Editorial Header */}
      <div className="bg-white border border-[#E6DFD1] rounded-xl p-4 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans uppercase tracking-wider text-[#334E47] font-bold">
                Module 06 • Academics & CCE
              </span>
              <span className="text-[#C49A3A]">•</span>
              <span className="text-xs font-mono text-[#2D705C] font-semibold">
                {context.campusName || 'Pune Baner Campus'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold text-[#0B2F29] tracking-tight">
              Curriculum, Timetable & Evaluation Engine
            </h1>
            <p className="text-xs sm:text-sm text-[#334E47] max-w-2xl leading-relaxed">
              Unified academic orchestrator spanning weekly timetable matrices, collision-free scheduling,
              daily lesson plans, continuous homework grading, and CBSE/ICSE 9-point CCE report cards.
            </p>
          </div>

          {/* Persona View Switcher */}
          <div className="flex items-center gap-1 bg-[#FBF8EF] p-1 rounded-lg border border-[#E6DFD1] overflow-x-auto max-w-full scrollbar-none">
            <button
              onClick={() => setActivePersonaView('teacher_my_day')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                activePersonaView === 'teacher_my_day'
                  ? 'bg-[#0B2F29] text-[#DFC679]'
                  : 'text-[#334E47] hover:text-[#0B2F29]'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-[#C49A3A]" />
              <span>Teacher My Day</span>
            </button>

            <button
              onClick={() => setActivePersonaView('academic_dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                activePersonaView === 'academic_dashboard'
                  ? 'bg-[#0B2F29] text-[#DFC679]'
                  : 'text-[#334E47] hover:text-[#0B2F29]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#2D705C]" />
              <span>Academic Dashboard</span>
            </button>

            <button
              onClick={() => setActivePersonaView('student_view')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                activePersonaView === 'student_view'
                  ? 'bg-[#0B2F29] text-[#DFC679]'
                  : 'text-[#334E47] hover:text-[#0B2F29]'
              }`}
            >
              <UserCheck className="w-4 h-4 text-[#C49A3A]" />
              <span>Student Academic View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Remembered Teacher Context Bar */}
      <TeacherContextBar
        context={context}
        teacherContext={teacherContext}
        onContextChange={handleContextChange}
        isTeacherView={activePersonaView === 'teacher_my_day'}
      />

      {/* Main Workspace Render */}
      {activePersonaView === 'teacher_my_day' && (
        <TeacherMyDay
          context={context}
          teacherContext={teacherContext}
          onShowToast={onShowToast}
          onOpenPlanLesson={() => setIsPlanLessonOpen(true)}
        />
      )}

      {activePersonaView === 'academic_dashboard' && (
        <AcademicDashboard
          context={context}
          teacherContext={teacherContext}
          onShowToast={onShowToast}
        />
      )}

      {activePersonaView === 'student_view' && (
        <StudentAcademicView
          context={context}
          onShowToast={onShowToast}
        />
      )}

      {/* Plan Lesson Modal triggered from My Day */}
      <PlanLessonModal
        isOpen={isPlanLessonOpen}
        onClose={() => setIsPlanLessonOpen(false)}
        context={context}
        teacherAssignmentId={teacherContext.teacherAssignmentId || 'ta-001'}
        onShowToast={onShowToast}
      />
    </div>
  );
}

export default AcademicsHub;
