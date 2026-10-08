// VEDIC TREE OS — Student Academic View & Parent Portal (Module 06)
import React, { useState } from 'react';
import {
  Calendar,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Eye,
  GraduationCap
} from 'lucide-react';
import { defaultAcademicsService } from '../../modules/academics/academics.service.js';
import { db } from '../../database/db.js';
import { ReportCardDetailModal } from './ReportCardDetailModal.jsx';

export function StudentAcademicView({ context, onShowToast }) {
  const students = db.students.filter(s => s.campusId === context.campusId && s.status === 'ACTIVE');
  const [selectedStudentId, setSelectedStudentId] = useState(() => {
    return students.find(s => s.id === 'stu-aditi-rao')?.id || students[0]?.id || 'stu-aditi-rao';
  });
  const [activeReportCard, setActiveReportCard] = useState(null);

  const profile = defaultAcademicsService.getStudentAcademicView(context, selectedStudentId);
  const activeStudent = profile.student;

  const handleQuickSubmit = (hwId) => {
    defaultAcademicsService.submitStudentHomework(context, hwId, selectedStudentId, {
      content: 'Uploaded completed task via digital student portal.'
    });
    onShowToast?.('Homework submitted successfully to classroom teacher!');
  };

  return (
    <div className="space-y-6">
      {/* Student Switcher Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-stone-100">
                {activeStudent?.firstName} {activeStudent?.lastName}
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-stone-800 text-amber-400 border border-stone-700">
                {activeStudent?.admissionNumber}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Grade 5 • Section A • Roll No: {activeStudent?.enrollment?.rollNumber || 1} • Pune Baner Campus
            </p>
          </div>
        </div>

        {/* Switch Student Dropdown */}
        <div className="flex items-center gap-2 bg-stone-950/80 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-300">
          <span className="text-stone-400 font-medium">Switch Learner:</span>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer"
          >
            {students.map(s => (
              <option key={s.id} value={s.id} className="bg-stone-900 text-stone-100">
                {s.firstName} {s.lastName} ({s.admissionNumber})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Personal Timetable & Assessment History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Class Timetable */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Today's Classes & Timetable (Monday)</span>
              </h3>
              <span className="text-xs text-stone-400 font-mono">Room 201</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {profile.weeklyTimetable.filter(t => t.dayOfWeek === 'MON').map(period => (
                <div
                  key={period.id}
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-stone-400">
                    <span className="font-semibold text-[10px] uppercase">Period {period.periodNumber}</span>
                    <span className="font-mono text-[10px]">{period.startTime}-{period.endTime}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs">
                    {period.subjectName}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">
                    {period.teacherName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment & CCE Scores History */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-950/50">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500" />
                <span>Continuous Assessment & Exam Performance</span>
              </h3>
              <span className="text-xs text-stone-400 font-semibold">Term 1 (AY 2026-2027)</span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-stone-500">
                <tr>
                  <th className="py-2.5 px-4">Assessment</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Score / Max</th>
                  <th className="py-2.5 px-3">Percentage</th>
                  <th className="py-2.5 px-4 text-center">CCE Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {profile.results.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-stone-400 italic">
                      No assessment results published yet.
                    </td>
                  </tr>
                ) : (
                  profile.results.map(res => (
                    <tr key={res.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">
                        {res.assessmentTitle}
                      </td>
                      <td className="py-3 px-3 text-stone-600 dark:text-stone-400">
                        {res.subjectName}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-stone-900 dark:text-stone-100">
                        {res.marksObtained} / {res.maxMarks}
                      </td>
                      <td className="py-3 px-3 text-stone-600 dark:text-stone-300">
                        {res.percentage}%
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded font-extrabold text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {res.gradeLetter}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Homework Planner & Published Report Cards */}
        <div className="space-y-6">
          {/* Official Report Card Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-stone-900 to-stone-900 border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-stone-100">
                  Term 1 Report Card
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Official
              </span>
            </div>

            {profile.reportCards.length > 0 ? (
              <div className="space-y-3">
                <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Overall GPA / Score:</span>
                    <span className="font-extrabold text-amber-400 text-sm">
                      {profile.reportCards[0].overallPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Scholastic Grade:</span>
                    <span className="font-bold text-emerald-400 text-xs px-2 py-0.5 rounded bg-emerald-500/10">
                      Grade {profile.reportCards[0].overallGrade}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Term Attendance:</span>
                    <span className="font-semibold text-stone-200">
                      {profile.reportCards[0].attendancePercentage}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveReportCard(profile.reportCards[0])}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10"
                >
                  <Eye className="w-4 h-4" />
                  <span>View & Print Marksheet</span>
                </button>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-stone-400">
                Term 1 report card generation pending evaluation.
              </div>
            )}
          </div>

          {/* Homework Planner */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Homework Planner</span>
            </h3>

            <div className="space-y-3">
              {profile.homework.map(hw => (
                <div
                  key={hw.id}
                  className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {hw.title}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      Due: {hw.dueDate}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    {hw.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      {hw.mySubmissionStatus === 'GRADED' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Graded: {hw.myMarksObtained}/{hw.maxMarks}
                        </span>
                      )}
                      {hw.mySubmissionStatus === 'SUBMITTED' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Submitted
                        </span>
                      )}
                      {hw.mySubmissionStatus === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" /> Incomplete
                        </span>
                      )}
                    </div>

                    {hw.mySubmissionStatus === 'PENDING' && (
                      <button
                        onClick={() => handleQuickSubmit(hw.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                      >
                        Submit Task
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Card Detail Modal */}
      <ReportCardDetailModal
        reportCard={activeReportCard}
        isOpen={Boolean(activeReportCard)}
        onClose={() => setActiveReportCard(null)}
        context={context}
        onShowToast={onShowToast}
      />
    </div>
  );
}
