// VEDIC TREE OS — Grade Homework Modal (Module 06)
import React, { useState } from 'react';
import { X, CheckCircle, Clock, AlertCircle, Award } from 'lucide-react';
import { defaultAcademicsService } from '../../modules/academics/academics.service.js';

export function GradeHomeworkModal({ homework, isOpen, onClose, context, onSuccess, onShowToast }) {
  const [submissions, setSubmissions] = useState(() => {
    if (!homework) return [];
    return defaultAcademicsService.getHomeworkSubmissions(context, homework.id);
  });
  const [selectedSub, setSelectedSub] = useState(null);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !homework) return null;

  const handleGrade = (e) => {
    e.preventDefault();
    if (!selectedSub) return;
    setLoading(true);

    try {
      defaultAcademicsService.gradeStudentHomework(context, homework.id, selectedSub.studentId, {
        marksObtained: Number(marks),
        feedback
      });

      const updated = defaultAcademicsService.getHomeworkSubmissions(context, homework.id);
      setSubmissions(updated);
      setSelectedSub(null);
      setMarks('');
      setFeedback('');
      onShowToast?.(`Graded ${selectedSub.studentName}: ${marks}/${homework.maxMarks} marks`);
      onSuccess?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Grade Submissions: {homework.title}
              </h3>
              <p className="text-xs text-stone-500">
                Max Marks: {homework.maxMarks} • Due Date: {homework.dueDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-stone-500">
                <tr>
                  <th className="py-2.5 px-3">Roll</th>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {submissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40">
                    <td className="py-2.5 px-3 font-mono text-stone-400">{sub.rollNumber || '-'}</td>
                    <td className="py-2.5 px-3 font-medium text-stone-900 dark:text-stone-100">
                      {sub.studentName}
                    </td>
                    <td className="py-2.5 px-3">
                      {sub.status === 'GRADED' && (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                          <CheckCircle className="w-3 h-3" /> Graded
                        </span>
                      )}
                      {sub.status === 'SUBMITTED' && (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium">
                          <Clock className="w-3 h-3" /> Needs Review
                        </span>
                      )}
                      {sub.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-stone-500/10 text-stone-400 font-medium">
                          <AlertCircle className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-stone-900 dark:text-stone-100">
                      {sub.marksObtained !== null ? `${sub.marksObtained} / ${homework.maxMarks}` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedSub(sub);
                          setMarks(sub.marksObtained !== null ? String(sub.marksObtained) : '');
                          setFeedback(sub.feedback || '');
                        }}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                      >
                        {sub.status === 'GRADED' ? 'Edit Score' : 'Grade'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Grading Sub-Drawer */}
          {selectedSub && (
            <form onSubmit={handleGrade} className="p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Grading: {selectedSub.studentName}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="text-stone-400 hover:text-stone-600 text-xs"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Marks (out of {homework.maxMarks})
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max={homework.maxMarks}
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    placeholder={`0 - ${homework.maxMarks}`}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Feedback / Teacher Remarks
                  </label>
                  <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="e.g. Well formulated steps, neat handwriting"
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                >
                  {loading ? 'Saving...' : 'Record Grade'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
