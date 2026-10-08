// VEDIC TREE OS — Enter Marks Modal (Module 06)
import React, { useState } from 'react';
import { X, Award, CheckCircle } from 'lucide-react';
import { defaultAcademicsService, AcademicsService } from '../../modules/academics/academics.service.js';
import { db } from '../../database/db.js';

export function EnterMarksModal({ assessment, isOpen, onClose, context, onSuccess, onShowToast }) {
  const students = db.students.filter(
    s => s.campusId === context.campusId && s.status === 'ACTIVE'
  );

  const existingResults = defaultAcademicsService.getResults(context, {
    assessmentId: assessment?.id
  });

  const [marksMap, setMarksMap] = useState(() => {
    const map = {};
    for (const s of students) {
      const res = existingResults.find(r => r.studentId === s.id);
      map[s.id] = {
        marks: res ? String(res.marksObtained) : '',
        remarks: res?.remarks || '',
        isAbsent: Boolean(res?.isAbsent)
      };
    }
    return map;
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen || !assessment) return null;

  const handleScoreChange = (studentId, val) => {
    setMarksMap(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        marks: val,
        isAbsent: false
      }
    }));
  };

  const handleAbsentToggle = (studentId) => {
    setMarksMap(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        isAbsent: !prev[studentId]?.isAbsent,
        marks: !prev[studentId]?.isAbsent ? '0' : ''
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let savedCount = 0;
      for (const [studentId, entry] of Object.entries(marksMap)) {
        if (entry.marks !== '' || entry.isAbsent) {
          defaultAcademicsService.recordResult(context, {
            assessmentId: assessment.id,
            studentId,
            marksObtained: entry.isAbsent ? 0 : Number(entry.marks),
            remarks: entry.remarks,
            isAbsent: entry.isAbsent
          });
          savedCount++;
        }
      }

      onShowToast?.(`Recorded marks for ${savedCount} students!`);
      onSuccess?.();
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Gradebook: {assessment.title}
              </h3>
              <p className="text-xs text-stone-500">
                Max Marks: {assessment.maxMarks} • Pass: {assessment.passingMarks} • Automatic CCE 9-Point Scale
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-stone-500">
                <tr>
                  <th className="py-2.5 px-3">Roll</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Score / {assessment.maxMarks}</th>
                  <th className="py-2.5 px-3">Grade</th>
                  <th className="py-2.5 px-3">Remarks</th>
                  <th className="py-2.5 px-3 text-center">Absent?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {students.map(s => {
                  const entry = marksMap[s.id] || { marks: '', remarks: '', isAbsent: false };
                  const numMarks = Number(entry.marks);
                  const grade = entry.isAbsent ? 'AB' : (entry.marks !== '' ? AcademicsService.calculateCceGrade(numMarks, assessment.maxMarks) : '—');
                  const isPassing = numMarks >= assessment.passingMarks;

                  return (
                    <tr key={s.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="py-2 px-3 font-mono text-stone-400">{s.enrollment?.rollNumber || '-'}</td>
                      <td className="py-2 px-3 font-medium text-stone-900 dark:text-stone-100">
                        {s.firstName} {s.lastName}
                        <span className="block text-[10px] text-stone-400 font-normal">
                          {s.admissionNumber}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max={assessment.maxMarks}
                          disabled={entry.isAbsent}
                          value={entry.marks}
                          onChange={(e) => handleScoreChange(s.id, e.target.value)}
                          placeholder="0"
                          className="w-20 px-2 py-1 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-xs font-semibold text-center focus:outline-none focus:border-purple-500 disabled:opacity-40"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                          grade === 'AB' ? 'bg-rose-500/10 text-rose-500' :
                          grade === 'A1' || grade === 'A2' ? 'bg-emerald-500/10 text-emerald-500' :
                          grade === 'B1' || grade === 'B2' ? 'bg-blue-500/10 text-blue-500' :
                          isPassing ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {grade}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={entry.remarks}
                          onChange={(e) => setMarksMap(prev => ({
                            ...prev,
                            [s.id]: { ...prev[s.id], remarks: e.target.value }
                          }))}
                          placeholder="Teacher feedback..."
                          className="w-full px-2 py-1 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-xs"
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={entry.isAbsent}
                          onChange={() => handleAbsentToggle(s.id)}
                          className="rounded border-stone-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-600/20 disabled:opacity-50 flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              {loading ? 'Saving Gradebook...' : 'Save & Calculate Grades'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
