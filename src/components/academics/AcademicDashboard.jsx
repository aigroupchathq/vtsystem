// VEDIC TREE OS — Campus Academic Dashboard & CCE Center (Module 06)
import React, { useState } from 'react';
import {
  Calendar,
  BookOpen,
  FileText,
  Award,
  Plus,
  Clock,
  CheckCircle2,
  Eye,
  FileCheck
} from 'lucide-react';
import { defaultAcademicsService } from '../../modules/academics/academics.service.js';
import { db } from '../../database/db.js';
import { PlanLessonModal } from './PlanLessonModal.jsx';
import { NewHomeworkModal } from './NewHomeworkModal.jsx';
import { GradeHomeworkModal } from './GradeHomeworkModal.jsx';
import { NewAssessmentModal } from './NewAssessmentModal.jsx';
import { EnterMarksModal } from './EnterMarksModal.jsx';
import { ReportCardDetailModal } from './ReportCardDetailModal.jsx';

export function AcademicDashboard({ context, teacherContext, onShowToast }) {
  const [activeTab, setActiveTab] = useState('timetable'); // timetable | lessons | homework | assessments | reportcards
  const [refreshKey, setRefreshKey] = useState(0);

  // Modals state
  const [isPlanLessonOpen, setIsPlanLessonOpen] = useState(false);
  const [isNewHomeworkOpen, setIsNewHomeworkOpen] = useState(false);
  const [selectedHwToGrade, setSelectedHwToGrade] = useState(null);
  const [isNewAssessmentOpen, setIsNewAssessmentOpen] = useState(false);
  const [selectedAssessmentForMarks, setSelectedAssessmentForMarks] = useState(null);
  const [selectedReportCard, setSelectedReportCard] = useState(null);

  // Data queries
  const divisionId = teacherContext.divisionId || 'div-pune-5a';
  const gradeId = teacherContext.gradeId || 'grd-5';
  const subjectId = teacherContext.subjectId || 'subj-math';

  const timetable = defaultAcademicsService.getTimetable(context, { divisionId });
  const lessons = defaultAcademicsService.getLessons(context, { divisionId });
  const homeworks = defaultAcademicsService.getHomeworks(context, { divisionId });
  const assessments = defaultAcademicsService.getAssessments(context, { gradeId });
  const reportCards = defaultAcademicsService.getReportCards(context, {});

  // Find active teacher assignment ID for lesson planning
  const activeAssignment = db.teacherAssignments.find(
    ta => ta.campusId === context.campusId && ta.divisionId === divisionId && ta.subjectId === subjectId
  );

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const dayNames = { MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday', THU: 'Thursday', FRI: 'Friday' };
  const periodNumbers = [1, 2, 3, 4, 5, 6];

  const handleGenerateReportCards = () => {
    try {
      const students = db.students.filter(s => s.campusId === context.campusId && s.status === 'ACTIVE');
      let count = 0;
      for (const st of students) {
        defaultAcademicsService.generateReportCard(context, {
          studentId: st.id,
          academicYearId: 'ay-2026-2027',
          term: 'Term 1',
          teacherRemarks: 'Commendable scholastic effort and consistent classroom discipline.'
        });
        count++;
      }
      onShowToast?.(`Generated Term 1 CCE Report Cards for ${count} students!`);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div key={refreshKey} className="space-y-6">
      {/* Sub-Nav Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'timetable', label: 'Weekly Timetable', icon: Calendar },
            { id: 'lessons', label: 'Curriculum & Lessons', icon: BookOpen, count: lessons.length },
            { id: 'homework', label: 'Homework & Tasks', icon: FileText, count: homeworks.length },
            { id: 'assessments', label: 'Assessments & Gradebook', icon: Award, count: assessments.length },
            { id: 'reportcards', label: 'Term Report Cards', icon: FileCheck, count: reportCards.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/10'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-stone-950/20 text-stone-950 font-bold' : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab-Specific Action Button */}
        <div>
          {activeTab === 'lessons' && (
            <button
              onClick={() => setIsPlanLessonOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10"
            >
              <Plus className="w-4 h-4" />
              <span>Plan Lesson</span>
            </button>
          )}
          {activeTab === 'homework' && (
            <button
              onClick={() => setIsNewHomeworkOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/10"
            >
              <Plus className="w-4 h-4" />
              <span>Assign Homework</span>
            </button>
          )}
          {activeTab === 'assessments' && (
            <button
              onClick={() => setIsNewAssessmentOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/10"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Assessment</span>
            </button>
          )}
          {activeTab === 'reportcards' && (
            <button
              onClick={handleGenerateReportCards}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/10"
            >
              <FileCheck className="w-4 h-4" />
              <span>Batch Generate Report Cards</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: WEEKLY TIMETABLE MATRIX */}
      {activeTab === 'timetable' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-950/50">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Weekly Class Timetable Matrix
              </h3>
              <p className="text-xs text-stone-500">
                Showing schedule for Section {teacherContext.divisionId} • Double-booking clash protection active
              </p>
            </div>
            <div className="text-xs font-mono text-stone-400">
              6 Periods / Day • 08:30 to 14:00
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-stone-500">
                  <th className="py-3 px-4 font-bold text-stone-700 dark:text-stone-300 w-28">Day</th>
                  {periodNumbers.map(p => (
                    <th key={p} className="py-3 px-3 text-center border-l border-stone-200 dark:border-stone-800">
                      <span className="block font-bold text-stone-800 dark:text-stone-200">Period {p}</span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {p === 1 && '08:30-09:15'}
                        {p === 2 && '09:15-10:00'}
                        {p === 3 && '10:15-11:00'}
                        {p === 4 && '11:00-11:45'}
                        {p === 5 && '12:30-13:15'}
                        {p === 6 && '13:15-14:00'}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {days.map(day => (
                  <tr key={day} className="hover:bg-stone-50/40 dark:hover:bg-stone-800/20">
                    <td className="py-3 px-4 font-bold text-stone-900 dark:text-stone-100 bg-stone-50/30 dark:bg-stone-950/30">
                      {dayNames[day]}
                    </td>
                    {periodNumbers.map(pNum => {
                      const entry = timetable.find(t => t.dayOfWeek === day && t.periodNumber === pNum);
                      return (
                        <td key={pNum} className="py-2 px-2 border-l border-stone-200 dark:border-stone-800 text-center">
                          {entry ? (
                            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left space-y-1">
                              <span className="font-bold text-stone-900 dark:text-stone-100 block text-[11px] truncate">
                                {entry.subjectName}
                              </span>
                              <span className="text-[10px] text-stone-500 block truncate">
                                {entry.teacherName}
                              </span>
                              <div className="flex items-center justify-between text-[10px] text-stone-400">
                                <span>{entry.roomNumber || 'Room 201'}</span>
                                <span className="font-mono text-amber-500 font-semibold">{entry.subjectCode}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-[11px] text-stone-400 italic">Free / Study</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CURRICULUM & LESSONS */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map(lesson => (
            <div
              key={lesson.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all space-y-3 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-500">
                    {lesson.subjectCode || 'ACAD'}
                  </span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    lesson.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' :
                    lesson.status === 'IN_PROGRESS' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-stone-500/10 text-stone-400'
                  }`}>
                    {lesson.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {lesson.title}
                </h4>
                <p className="text-xs text-stone-500">
                  {lesson.description || 'Instructional unit breakdown.'}
                </p>
                <div className="text-[11px] text-stone-400">
                  <span className="font-semibold text-stone-300">Chapter:</span> {lesson.chapter || 'Unit 1'}
                  {lesson.teachingAids && (
                    <span className="block mt-0.5"><span className="font-semibold text-stone-300">Aids:</span> {lesson.teachingAids}</span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  Planned: {lesson.plannedDate}
                </span>
                {lesson.status !== 'COMPLETED' && (
                  <button
                    onClick={() => {
                      defaultAcademicsService.updateLessonProgress(context, lesson.id, 'COMPLETED');
                      onShowToast?.(`Lesson "${lesson.title}" marked as completed!`);
                      setRefreshKey(prev => prev + 1);
                    }}
                    className="text-xs font-semibold text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: HOMEWORK & ASSIGNMENTS */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-stone-500">
                <tr>
                  <th className="py-3 px-4">Assignment Title</th>
                  <th className="py-3 px-3">Subject</th>
                  <th className="py-3 px-3">Assigned Date</th>
                  <th className="py-3 px-3">Due Date</th>
                  <th className="py-3 px-3">Submission Progress</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {homeworks.map(hw => (
                  <tr key={hw.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                    <td className="py-3 px-4">
                      <span className="font-bold text-stone-900 dark:text-stone-100 text-sm block">
                        {hw.title}
                      </span>
                      <span className="text-[11px] text-stone-500 truncate block max-w-xs">
                        {hw.description}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-800 dark:text-stone-200">
                      {hw.subjectName}
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-400">{hw.assignedDate}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-amber-500">{hw.dueDate}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{
                              width: `${hw.stats?.totalStudents ? ((hw.stats.submittedCount / hw.stats.totalStudents) * 100) : 0}%`
                            }}
                          />
                        </div>
                        <span className="text-[11px] text-stone-400 font-mono">
                          {hw.stats?.submittedCount || 0}/{hw.stats?.totalStudents || 0}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedHwToGrade(hw)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-semibold text-xs transition-colors"
                      >
                        Grade Submissions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ASSESSMENTS & GRADEBOOK */}
      {activeTab === 'assessments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {assessments.map(asm => (
              <div
                key={asm.id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 hover:border-purple-500/40 transition-all space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-500/10 text-purple-400">
                      {asm.assessmentType}
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-400">
                      Max: {asm.maxMarks}m
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {asm.title}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {asm.subjectName} • Passing: {asm.passingMarks}m • Weight: {asm.weightage}%
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400 font-mono">
                    Date: {asm.date}
                  </span>
                  <button
                    onClick={() => setSelectedAssessmentForMarks(asm)}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 hover:bg-purple-100 transition-colors"
                  >
                    Enter Marks
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: REPORT CARDS */}
      {activeTab === 'reportcards' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-stone-500">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-3">Grade & Section</th>
                  <th className="py-3 px-3">Term</th>
                  <th className="py-3 px-3">Attendance</th>
                  <th className="py-3 px-3">Overall Percentage</th>
                  <th className="py-3 px-3">CCE Grade</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {reportCards.map(rc => (
                  <tr key={rc.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                    <td className="py-3 px-4">
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">
                        {rc.studentName}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {rc.admissionNumber}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-800 dark:text-stone-200">
                      {rc.gradeName} - {rc.divisionName}
                    </td>
                    <td className="py-3 px-3 font-medium text-stone-500">{rc.term}</td>
                    <td className="py-3 px-3 font-semibold text-emerald-500">{rc.attendancePercentage}%</td>
                    <td className="py-3 px-3 font-bold text-stone-900 dark:text-stone-100">
                      {rc.overallPercentage}%
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded font-extrabold text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        {rc.overallGrade}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {rc.publishedAt ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="text-[11px] text-stone-400 italic">Draft</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedReportCard(rc)}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-semibold text-xs transition-colors flex items-center gap-1.5 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Marksheet</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <PlanLessonModal
        isOpen={isPlanLessonOpen}
        onClose={() => setIsPlanLessonOpen(false)}
        context={context}
        teacherAssignmentId={activeAssignment?.id || 'ta-001'}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
        onShowToast={onShowToast}
      />

      <NewHomeworkModal
        isOpen={isNewHomeworkOpen}
        onClose={() => setIsNewHomeworkOpen(false)}
        context={context}
        teacherContext={teacherContext}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
        onShowToast={onShowToast}
      />

      <GradeHomeworkModal
        homework={selectedHwToGrade}
        isOpen={Boolean(selectedHwToGrade)}
        onClose={() => setSelectedHwToGrade(null)}
        context={context}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
        onShowToast={onShowToast}
      />

      <NewAssessmentModal
        isOpen={isNewAssessmentOpen}
        onClose={() => setIsNewAssessmentOpen(false)}
        context={context}
        teacherContext={teacherContext}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
        onShowToast={onShowToast}
      />

      <EnterMarksModal
        assessment={selectedAssessmentForMarks}
        isOpen={Boolean(selectedAssessmentForMarks)}
        onClose={() => setSelectedAssessmentForMarks(null)}
        context={context}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
        onShowToast={onShowToast}
      />

      <ReportCardDetailModal
        reportCard={selectedReportCard}
        isOpen={Boolean(selectedReportCard)}
        onClose={() => setSelectedReportCard(null)}
        context={context}
        onPublishSuccess={() => setRefreshKey(prev => prev + 1)}
        onShowToast={onShowToast}
      />
    </div>
  );
}
