// VEDIC TREE OS — Teacher Remembered Context Bar (Module 06)
// Transformed into calm, prestigious, editorial education OS visual language (Prompt 06)

import React from 'react';
import { BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { db } from '../../database/db.js';

export function TeacherContextBar({ context, teacherContext, onContextChange, isTeacherView = true }) {
  const grades = db.grades || [];
  const divisions = db.divisions.filter(d => d.campusId === context.campusId && (!teacherContext.gradeId || d.gradeId === teacherContext.gradeId));
  const subjects = db.subjects || [];

  return (
    <div className="bg-white border border-[#E6DFD1] rounded-2xl p-4 shadow-2xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Persona & Memory Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F4EEDC] border border-[#DFC679]/60 flex items-center justify-center text-[#8C6B1C] shrink-0">
            <BookOpen className="w-4 h-4 text-[#C49A3A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#60706B]">
                {isTeacherView ? 'Teacher Active Workspace' : 'Academic Context Engine'}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2D705C]/10 text-[#2D705C] border border-[#2D705C]/20 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Remembered Context
              </span>
            </div>
            <p className="text-xs text-[#60706B] mt-0.5">
              Selection is saved automatically across tabs and visits. Zero repetitive dropdown clicks.
            </p>
          </div>
        </div>

        {/* Right: Quick Pickers */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Grade Selector */}
          <div className="flex items-center gap-1.5 bg-[#FBF8EF] border border-[#E6DFD1] rounded-lg px-3 py-1.5 text-xs text-[#102625]">
            <Layers className="w-3.5 h-3.5 text-[#7E8D88]" />
            <span className="text-[#60706B] font-medium">Grade:</span>
            <select
              value={teacherContext.gradeId || 'grd-5'}
              onChange={(e) => {
                const newGradeId = e.target.value;
                const matchingDiv = db.divisions.find(d => d.campusId === context.campusId && d.gradeId === newGradeId);
                onContextChange({
                  ...teacherContext,
                  gradeId: newGradeId,
                  divisionId: matchingDiv ? matchingDiv.id : teacherContext.divisionId
                });
              }}
              className="bg-transparent text-[#0B2F29] font-bold focus:outline-none cursor-pointer"
            >
              {grades.map(g => (
                <option key={g.id} value={g.id} className="bg-white text-[#102625]">
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Division Selector */}
          <div className="flex items-center gap-1.5 bg-[#FBF8EF] border border-[#E6DFD1] rounded-lg px-3 py-1.5 text-xs text-[#102625]">
            <span className="text-[#60706B] font-medium">Sec:</span>
            <select
              value={teacherContext.divisionId || 'div-pune-5a'}
              onChange={(e) => onContextChange({ ...teacherContext, divisionId: e.target.value })}
              className="bg-transparent text-[#0B2F29] font-bold focus:outline-none cursor-pointer"
            >
              {divisions.map(d => (
                <option key={d.id} value={d.id} className="bg-white text-[#102625]">
                  Section {d.name} ({d.roomNumber || 'Room'})
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div className="flex items-center gap-1.5 bg-[#FBF8EF] border border-[#E6DFD1] rounded-lg px-3 py-1.5 text-xs text-[#102625]">
            <BookOpen className="w-3.5 h-3.5 text-[#7E8D88]" />
            <span className="text-[#60706B] font-medium">Subject:</span>
            <select
              value={teacherContext.subjectId || 'subj-math'}
              onChange={(e) => onContextChange({ ...teacherContext, subjectId: e.target.value })}
              className="bg-transparent text-[#0B2F29] font-bold focus:outline-none cursor-pointer"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id} className="bg-white text-[#102625]">
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year Badge */}
          <div className="px-2.5 py-1.5 rounded-lg bg-[#F4EEDC] border border-[#DFC679]/60 text-xs font-mono font-bold text-[#8C6B1C]">
            AY 2026-2027
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherContextBar;
