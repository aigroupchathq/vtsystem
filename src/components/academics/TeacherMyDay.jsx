// VEDIC TREE OS — Teacher My Day Workspace (Module 06)
// Transformed into calm, prestigious, editorial education OS visual language (Prompt 06)

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  Award,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import { defaultAcademicsService } from '../../modules/academics/academics.service.js';
import { GradeHomeworkModal } from './GradeHomeworkModal.jsx';

export function TeacherMyDay({ context, _teacherContext, onShowToast, onOpenPlanLesson }) {
  const [dayOfWeek, setDayOfWeek] = useState('MON');
  const [selectedHwToGrade, setSelectedHwToGrade] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const teacherId = 'emp-sunita'; // Primary demo teacher
  const dailyData = defaultAcademicsService.getTeacherMyDay(context, teacherId, dayOfWeek);
  const homeworks = defaultAcademicsService.getHomeworks(context, { teacherId });

  const weekDays = [
    { code: 'MON', label: 'Monday' },
    { code: 'TUE', label: 'Tuesday' },
    { code: 'WED', label: 'Wednesday' },
    { code: 'THU', label: 'Thursday' },
    { code: 'FRI', label: 'Friday' }
  ];

  const handleCompleteLesson = (lessonId) => {
    defaultAcademicsService.updateLessonProgress(context, lessonId, 'COMPLETED');
    onShowToast?.('Lesson marked as completed in curriculum register!');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div key={refreshKey} className="space-y-6">
      {/* Day Selector Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-xl border border-[#E6DFD1]">
        <div>
          <h2 className="text-base font-sans font-bold text-[#0B2F29] flex items-center gap-2">
            Teacher My Day — Sunita Patil
          </h2>
          <p className="text-xs text-[#334E47] mt-0.5">
            Real-time daily schedule, active lesson tracker, and priority grading queue
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#FBF8EF] p-1 rounded-lg border border-[#E6DFD1] self-start sm:self-auto">
          {weekDays.map(d => (
            <button
              key={d.code}
              onClick={() => setDayOfWeek(d.code)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                dayOfWeek === d.code
                  ? 'bg-[#0B2F29] text-[#DFC679]'
                  : 'text-[#334E47] hover:text-[#0B2F29]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Quick KPI Badges — Continuous 3-Column Surface */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white border border-[#E6DFD1] rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#E6DFD1] text-xs">
        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#FBF8EF] border border-[#E6DFD1] flex items-center justify-center text-[#2D705C] shrink-0">
            <Clock className="w-4 h-4 text-[#2D705C]" />
          </div>
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#334E47]">Classes Today ({dayOfWeek})</span>
            <div className="text-xl font-sans font-bold text-[#0B2F29] mt-0.5 tabular-nums">
              {dailyData.periods.length} Periods
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#F4EEDC] border border-[#DFC679]/60 flex items-center justify-center text-[#8C6B1C] shrink-0">
            <BookOpen className="w-4 h-4 text-[#C49A3A]" />
          </div>
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#334E47]">Curriculum Units in Progress</span>
            <div className="text-xl font-sans font-bold text-[#0B2F29] mt-0.5 tabular-nums">
              {dailyData.activeLessons.length} Topics
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#2D705C]/10 border border-[#2D705C]/20 flex items-center justify-center text-[#2D705C] shrink-0">
            <Award className="w-4 h-4 text-[#2D705C]" />
          </div>
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#334E47]">Submissions Needing Review</span>
            <div className="text-xl font-sans font-bold text-[#0B2F29] mt-0.5 tabular-nums">
              {dailyData.pendingGradingCount} Submissions
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Today's Classroom Periods */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-[#334E47] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2D705C]" />
              Classroom Periods Timeline ({dayOfWeek})
            </h3>
            <span className="text-[11px] text-[#7E8D88] font-mono">
              Room 201 • Pune Baner Campus
            </span>
          </div>

          <div className="space-y-3">
            {dailyData.periods.length === 0 ? (
              <div className="p-8 text-center bg-white border border-dashed border-[#E6DFD1] rounded-xl text-[#7E8D88] text-xs">
                No teaching periods scheduled on {dayOfWeek}. Free planning block.
              </div>
            ) : (
              dailyData.periods.map(period => (
                <div
                  key={period.id}
                  className="bg-white border border-[#E6DFD1] rounded-xl p-4.5 flex items-center justify-between hover:border-[#DFC679] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Period Number Tag */}
                    <div className="w-11 h-11 rounded-lg bg-[#FBF8EF] flex flex-col items-center justify-center border border-[#E6DFD1] shrink-0">
                      <span className="text-[10px] uppercase font-sans font-bold text-[#334E47]">Period</span>
                      <span className="text-sm font-bold text-[#0B2F29] font-mono">{period.periodNumber}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-sans font-bold text-[#0B2F29]">
                          {period.subjectName}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/60">
                          {period.subjectCode}
                        </span>
                      </div>
                      <p className="text-xs text-[#334E47] mt-0.5 flex items-center gap-2">
                        <span>Section {period.divisionName}</span>
                        <span>•</span>
                        <span>{period.roomNumber || 'Room 201'}</span>
                        <span>•</span>
                        <span className="font-mono text-[#7E8D88]">{period.startTime} - {period.endTime}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onShowToast?.(`Class started for Period ${period.periodNumber}!`)}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#0B2F29] hover:bg-[#154E42] text-[#FBF8EF] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-[#DFC679]" />
                      <span>Start Class</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: Active Curriculum & Pending Homework Grading */}
        <div className="space-y-6">
          {/* Active Lessons */}
          <div className="bg-white border border-[#E6DFD1] rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFE9DD]">
              <h3 className="text-xs font-sans font-bold text-[#0B2F29] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2D705C]" />
                Active Curriculum
              </h3>
              <button
                onClick={onOpenPlanLesson}
                className="text-xs font-semibold text-[#0B2F29] hover:underline cursor-pointer"
              >
                + Plan Lesson
              </button>
            </div>

            <div className="space-y-2.5">
              {dailyData.activeLessons.length === 0 ? (
                <div className="p-4 text-center bg-[#FBF8EF] border border-[#E6DFD1] rounded-xl text-[#7E8D88] text-xs">
                  All current lessons completed!
                </div>
              ) : (
                dailyData.activeLessons.map(lesson => (
                  <div
                    key={lesson.id}
                    className="p-3.5 rounded-xl bg-[#FBF8EF]/60 border border-[#E6DFD1] hover:border-[#DFC679] transition-colors text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#102625]">
                        {lesson.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2D705C]/10 text-[#2D705C] font-semibold">
                        {lesson.status}
                      </span>
                    </div>
                    <p className="text-[#334E47] text-xs">
                      {lesson.chapter} • Aids: {lesson.teachingAids || 'None'}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-[#EFE9DD]">
                      <span className="text-[10px] text-[#7E8D88] font-mono">
                        Planned: {lesson.plannedDate}
                      </span>
                      <button
                        onClick={() => handleCompleteLesson(lesson.id)}
                        className="text-[11px] font-semibold text-[#2D705C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mark Complete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pending Grading Queue */}
          <div className="bg-white border border-[#E6DFD1] rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="pb-2 border-b border-[#EFE9DD]">
              <h3 className="text-xs font-sans font-bold text-[#0B2F29] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C49A3A]" />
                Pending Homework Grading
              </h3>
            </div>

            <div className="space-y-2.5">
              {homeworks.map(hw => (
                <div
                  key={hw.id}
                  className="p-3.5 rounded-xl bg-[#FBF8EF]/60 border border-[#E6DFD1] hover:border-[#DFC679] transition-colors text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#102625]">
                      {hw.title}
                    </span>
                    <span className="font-mono text-[#7E8D88] text-[11px]">
                      Due: {hw.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#334E47] text-xs font-mono">
                    <span>Submissions: {hw.stats?.submittedCount || 0} / {hw.stats?.totalStudents || 0}</span>
                    <span className="text-[#8C6B1C] font-semibold">{hw.stats?.pendingReviewCount || 0} to grade</span>
                  </div>
                  <button
                    onClick={() => setSelectedHwToGrade(hw)}
                    className="w-full mt-1 py-1.5 text-center text-xs font-semibold rounded-lg bg-[#F4EEDC] hover:bg-[#EFE9DD] text-[#102625] border border-[#DFC679]/60 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Open Gradebook</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#C49A3A]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grade Homework Modal */}
      <GradeHomeworkModal
        homework={selectedHwToGrade}
        isOpen={Boolean(selectedHwToGrade)}
        onClose={() => setSelectedHwToGrade(null)}
        context={context}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
        onShowToast={onShowToast}
      />
    </div>
  );
}

export default TeacherMyDay;
