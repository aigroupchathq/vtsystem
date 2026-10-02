// VEDIC TREE OS — Entrance Assessment Evaluation Modal
import React, { useState } from 'react';
import { X, Award, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { AdmissionsService } from '../../modules/admissions/admissions.service.js';

export default function AssessmentModal({
  isOpen,
  onClose,
  tenantContext,
  lead,
  application,
  onSuccess,
  onShowToast
}) {
  const [subjects, setSubjects] = useState([
    { subject: 'Mathematics', maxMarks: 40, marks: 36 },
    { subject: 'English & Comprehension', maxMarks: 40, marks: 35 },
    { subject: 'Logical Reasoning', maxMarks: 20, marks: 18 }
  ]);
  const [evaluatorName, setEvaluatorName] = useState('Sunita Patil (Senior Teacher)');
  const [remarks, setRemarks] = useState('Candidate showed keen grasping and problem solving aptitude.');
  const [result, setResult] = useState('RECOMMENDED');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !lead || !application) return null;

  const totalMarks = subjects.reduce((sum, s) => sum + (Number(s.marks) || 0), 0);
  const maxMarks = subjects.reduce((sum, s) => sum + (Number(s.maxMarks) || 0), 0);
  const percentage = maxMarks > 0 ? Number(((totalMarks / maxMarks) * 100).toFixed(1)) : 0;

  const handleScoreChange = (idx, value) => {
    const updated = [...subjects];
    updated[idx].marks = Math.min(updated[idx].maxMarks, Math.max(0, Number(value) || 0));
    setSubjects(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      const assessment = AdmissionsService.recordEntranceAssessment(
        tenantContext,
        lead.id,
        application.id,
        {
          assessmentDate: new Date().toISOString(),
          evaluatorName,
          subjects,
          remarks,
          result
        }
      );

      setIsSubmitting(false);
      if (onShowToast) onShowToast(`Assessment recorded for ${lead.studentName}: ${percentage}% (${result})`);
      if (onSuccess) onSuccess(assessment);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Failed to record assessment.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Entrance Readiness Assessment</h3>
              <p className="text-xs text-slate-400">{lead.studentName} — App: {application.applicationNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-[#131D31] border border-[#24324D] rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Total Score:</span>
              <p className="text-xl font-extrabold text-white">{totalMarks} / {maxMarks}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Aggregate:</span>
              <p className={`text-xl font-extrabold ${percentage >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {percentage}%
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Subject Score Rubrics
            </label>
            {subjects.map((sub, idx) => (
              <div key={sub.subject} className="flex items-center justify-between gap-3 bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-xs">
                <span className="font-medium text-slate-200">{sub.subject}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={sub.maxMarks}
                    value={sub.marks}
                    onChange={e => handleScoreChange(idx, e.target.value)}
                    className="w-16 bg-[#0F172A] border border-[#24324D] rounded-lg px-2 py-1 text-center text-white font-bold focus:outline-none focus:border-purple-500"
                  />
                  <span className="text-slate-400">/ {sub.maxMarks}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Faculty Evaluator
              </label>
              <input
                type="text"
                value={evaluatorName}
                onChange={e => setEvaluatorName(e.target.value)}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Recommendation Verdict
              </label>
              <select
                value={result}
                onChange={e => setResult(e.target.value)}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="RECOMMENDED">Recommended for Admission</option>
                <option value="PROVISIONAL">Provisional / Bridge Class</option>
                <option value="NOT_RECOMMENDED">Not Recommended</option>
                <option value="WAIVED">Waived (Sibling / Merit)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Evaluator Observations & Remarks
            </label>
            <textarea
              rows={2}
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              className="w-full bg-[#131D31] border border-[#24324D] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-900/40 flex items-center gap-2 transition disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Submit Evaluation & Advance Pipeline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
