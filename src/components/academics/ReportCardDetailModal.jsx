// VEDIC TREE OS — Formal Report Card Modal (Module 06)
import React, { useState } from 'react';
import { X, Award, CheckCircle, Printer } from 'lucide-react';
import { defaultAcademicsService } from '../../modules/academics/academics.service.js';

export function ReportCardDetailModal({ reportCard, isOpen, onClose, context, onPublishSuccess, onShowToast }) {
  const [publishing, setPublishing] = useState(false);

  if (!isOpen || !reportCard) return null;

  const parsed = reportCard.parsedSummary || JSON.parse(reportCard.summaryJson || '{}');
  const subjects = parsed.subjects || [];

  const handlePublish = () => {
    setPublishing(true);
    try {
      defaultAcademicsService.publishReportCard(context, reportCard.id);
      onShowToast?.(`Report Card for ${reportCard.studentName} has been formally published!`);
      onPublishSuccess?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setPublishing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls */}
        <div className="px-6 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Continuous Comprehensive Evaluation (CCE) • Marksheet Document
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Marksheet Body */}
        <div className="p-8 overflow-y-auto space-y-6 bg-white dark:bg-stone-900">
          {/* Institution Header */}
          <div className="text-center pb-6 border-b border-stone-200 dark:border-stone-800">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 mb-2">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 uppercase">
              Vedic Tree International School
            </h2>
            <p className="text-xs text-stone-500">
              CBSE Affiliation No. 1130892 • Baner Campus, Pune, Maharashtra
            </p>
            <div className="inline-block mt-3 px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Cumulative Progress Report Card • {reportCard.term} (AY 2026-2027)
            </div>
          </div>

          {/* Student Profile Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">Student Name</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{reportCard.studentName}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">Admission No.</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{reportCard.admissionNumber}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">Grade & Division</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">{reportCard.gradeName} - {reportCard.divisionName}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">Attendance Rate</span>
              <span className="font-bold text-emerald-500 text-sm">{reportCard.attendancePercentage}%</span>
            </div>
          </div>

          {/* Subject Performance Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Scholastic Achievements (Part 1 - Academic)
            </h4>
            <div className="border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-stone-500">
                  <tr>
                    <th className="py-2.5 px-4">Subject</th>
                    <th className="py-2.5 px-3 text-center">Marks Obtained</th>
                    <th className="py-2.5 px-3 text-center">Max Marks</th>
                    <th className="py-2.5 px-3 text-center">Percentage</th>
                    <th className="py-2.5 px-4 text-center">CCE Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {subjects.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">
                        {sub.subject}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-stone-900 dark:text-stone-100">
                        {sub.marksObtained}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-stone-400">
                        {sub.maxMarks}
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-stone-800 dark:text-stone-200">
                        {sub.percentage}%
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-md font-bold text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {sub.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-stone-50/60 dark:bg-stone-950 font-bold border-t-2 border-stone-200 dark:border-stone-800">
                    <td className="py-3 px-4 text-stone-900 dark:text-stone-100">Overall Cumulative Total</td>
                    <td className="py-3 px-3 text-center font-mono text-amber-600 dark:text-amber-400">
                      {parsed.totalMarks}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-stone-400">
                      {parsed.maxTotalMarks}
                    </td>
                    <td className="py-3 px-3 text-center text-amber-600 dark:text-amber-400">
                      {reportCard.overallPercentage}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-3 py-1 rounded-lg bg-emerald-500 text-white font-extrabold text-xs shadow-sm">
                        {reportCard.overallGrade}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Teacher Remarks */}
          <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block mb-1">
              Class Teacher's Qualitative Appraisal
            </span>
            <p className="text-xs text-stone-700 dark:text-stone-300 italic leading-relaxed">
              "{reportCard.teacherRemarks || 'Consistent academic performance throughout the academic term.'}"
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-dashed border-stone-300 dark:border-stone-800 grid grid-cols-2 gap-8 items-end">
            <div>
              <div className="h-10 border-b border-stone-300 dark:border-stone-700 flex items-end pb-1 font-serif italic text-sm text-stone-700 dark:text-stone-300">
                Sunita Patil
              </div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Class Teacher Signature
              </span>
            </div>

            <div className="text-right">
              {reportCard.publishedAt ? (
                <div className="inline-flex flex-col items-end">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 pb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Digitally Signed by Principal</span>
                  </div>
                  <span className="text-[10px] text-stone-400">
                    Dr. Meenakshi Sundaram • {new Date(reportCard.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
                >
                  {publishing ? 'Publishing...' : 'Sign & Formally Publish'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
