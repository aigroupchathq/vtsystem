// VEDIC TREE OS — New Assessment Modal (Module 06)
import React, { useState } from 'react';
import { X, Award, Calendar, HelpCircle } from 'lucide-react';
import { defaultAcademicsService } from '../../modules/academics/academics.service.js';

export function NewAssessmentModal({ isOpen, onClose, context, teacherContext, onSuccess, onShowToast }) {
  const [title, setTitle] = useState('');
  const [assessmentType, setAssessmentType] = useState('PERIODIC_TEST');
  const [maxMarks, setMaxMarks] = useState(40);
  const [passingMarks, setPassingMarks] = useState(14);
  const [weightage, setWeightage] = useState(10);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an assessment title.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      defaultAcademicsService.createAssessment(context, {
        gradeId: teacherContext.gradeId,
        subjectId: teacherContext.subjectId,
        title: title.trim(),
        assessmentType,
        maxMarks: Number(maxMarks) || 40,
        passingMarks: Number(passingMarks) || 14,
        weightage: Number(weightage) || 10,
        date
      });

      onShowToast?.(`Assessment "${title}" scheduled successfully!`);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Create Assessment / Exam
              </h3>
              <p className="text-xs text-stone-500">
                Setup Continuous Comprehensive Evaluation (CCE) test
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-500 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Assessment Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Periodic Test 2 (PT-2) — Term 1"
              className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Evaluation Type
              </label>
              <select
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
              >
                <option value="PERIODIC_TEST">Periodic Test (PT)</option>
                <option value="FORMATIVE">Formative Assessment (FA)</option>
                <option value="SUMMATIVE">Summative Assessment (SA)</option>
                <option value="HALF_YEARLY">Half-Yearly Examination</option>
                <option value="ANNUAL">Annual Board Examination</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Date of Examination *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                  required
                />
                <Calendar className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Maximum Marks
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={maxMarks}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMaxMarks(val);
                  setPassingMarks(Math.round(val * 0.35));
                }}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Passing Marks (35%)
              </label>
              <input
                type="number"
                min="1"
                max={maxMarks}
                value={passingMarks}
                onChange={(e) => setPassingMarks(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Term Weightage (%)
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={weightage}
                onChange={(e) => setWeightage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-600/20 disabled:opacity-50 transition-all flex items-center gap-1.5"
            >
              {loading ? 'Creating...' : 'Schedule Assessment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
