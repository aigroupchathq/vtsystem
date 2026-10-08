import React, { useState } from 'react';
import { Compass, BookOpen, Heart, Shield, Sparkles, ChevronRight, TrendingUp } from 'lucide-react';
import { Badge } from '../foundations/Badge.jsx';

/**
 * SIGNATURE COMPONENT: Vedic Tree Development Compass
 *
 * Represents the 4-quadrant holistic child development model:
 * 1. Academics (Intellectual mastery & curiosity)
 * 2. Character & Values (Integrity, humility, seva, ethical leadership)
 * 3. Wellbeing (Physical vigor, yoga, meditation, emotional resilience)
 * 4. Life Skills (Communication, collaboration, financial literacy, problem solving)
 */

export function DevelopmentCompass({
  data = {
    academics: { score: 88, trend: '+4%', level: 'Proficient', skills: ['Mathematics', 'Science', 'Languages', 'Logic'] },
    character: { score: 94, trend: '+6%', level: 'Exemplary', skills: ['Integrity', 'Humility', 'Seva (Service)', 'Leadership'] },
    wellbeing: { score: 91, trend: '+2%', level: 'Strong', skills: ['Daily Yoga', 'Meditation', 'Sports', 'Mindfulness'] },
    lifeSkills: { score: 85, trend: '+5%', level: 'Developing', skills: ['Communication', 'Teamwork', 'Critical Thinking', 'Adaptability'] },
  },
  studentName = 'Aarav Sharma',
  onQuadrantClick = null,
  className = '',
}) {
  const [selectedQuadrant, setSelectedQuadrant] = useState('character');

  const quadrants = [
    {
      key: 'character',
      label: 'Character & Values',
      shortLabel: 'CHARACTER',
      position: 'top',
      icon: Shield,
      color: '#D97706', // Saffron Amber
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-300',
      activeRing: 'ring-amber-500',
      details: data.character,
    },
    {
      key: 'academics',
      label: 'Academic Excellence',
      shortLabel: 'ACADEMICS',
      position: 'right',
      icon: BookOpen,
      color: '#0F4C35', // Vedic Green
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300',
      activeRing: 'ring-emerald-500',
      details: data.academics,
    },
    {
      key: 'lifeSkills',
      label: 'Life Skills & Agency',
      shortLabel: 'LIFE SKILLS',
      position: 'bottom',
      icon: Sparkles,
      color: '#0284C7', // Azure Blue
      bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/40 text-sky-900 dark:text-sky-300',
      activeRing: 'ring-sky-500',
      details: data.lifeSkills,
    },
    {
      key: 'wellbeing',
      label: 'Wellbeing & Mindfulness',
      shortLabel: 'WELLBEING',
      position: 'left',
      icon: Heart,
      color: '#C2410C', // Lotus Terra Cotta
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40 text-rose-900 dark:text-rose-300',
      activeRing: 'ring-rose-500',
      details: data.wellbeing,
    },
  ];

  const active = quadrants.find((q) => q.key === selectedQuadrant) || quadrants[0];

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0F4C35]/10 dark:bg-emerald-950/60 flex items-center justify-center text-[#0F4C35] dark:text-emerald-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              Vedic Tree Development Compass
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Four-dimensional development metrics for {studentName}
            </p>
          </div>
        </div>
        <Badge variant="primary" dot size="sm">
          Holistic Growth Engine
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive Visual Compass Visualizer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Compass Axis Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />
              <div className="absolute h-full w-px bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Compass Outer Ring */}
            <div className="absolute inset-2 rounded-full border border-dashed border-slate-300 dark:border-slate-700/60 pointer-events-none" />

            {/* Center Anchor Point */}
            <div className="absolute z-10 w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-[#0F4C35] dark:border-emerald-500 flex flex-col items-center justify-center shadow-md">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">VEDIC</span>
              <span className="text-xs font-bold text-[#0F4C35] dark:text-emerald-400">TREE</span>
            </div>

            {/* North: Character & Values */}
            <button
              type="button"
              onClick={() => {
                setSelectedQuadrant('character');
                if (onQuadrantClick) onQuadrantClick('character');
              }}
              className={`absolute top-0 transform -translate-y-1 z-20 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
                selectedQuadrant === 'character'
                  ? 'bg-amber-600 text-white border-amber-700 scale-105 ring-2 ring-amber-400'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
              }`}
            >
              ▲ Character {data.character.score}%
            </button>

            {/* East: Academics */}
            <button
              type="button"
              onClick={() => {
                setSelectedQuadrant('academics');
                if (onQuadrantClick) onQuadrantClick('academics');
              }}
              className={`absolute right-0 transform translate-x-2 z-20 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
                selectedQuadrant === 'academics'
                  ? 'bg-[#0F4C35] text-white border-emerald-800 scale-105 ring-2 ring-emerald-400'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              Academics {data.academics.score}% ►
            </button>

            {/* South: Life Skills */}
            <button
              type="button"
              onClick={() => {
                setSelectedQuadrant('lifeSkills');
                if (onQuadrantClick) onQuadrantClick('lifeSkills');
              }}
              className={`absolute bottom-0 transform translate-y-1 z-20 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
                selectedQuadrant === 'lifeSkills'
                  ? 'bg-sky-600 text-white border-sky-700 scale-105 ring-2 ring-sky-400'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400'
              }`}
            >
              ▼ Life Skills {data.lifeSkills.score}%
            </button>

            {/* West: Wellbeing */}
            <button
              type="button"
              onClick={() => {
                setSelectedQuadrant('wellbeing');
                if (onQuadrantClick) onQuadrantClick('wellbeing');
              }}
              className={`absolute left-0 transform -translate-x-2 z-20 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
                selectedQuadrant === 'wellbeing'
                  ? 'bg-rose-600 text-white border-rose-700 scale-105 ring-2 ring-rose-400'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400'
              }`}
            >
              ◄ Wellbeing {data.wellbeing.score}%
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 text-center">
            Click any quadrant to inspect holistic observation evidence
          </p>
        </div>

        {/* Selected Quadrant Deep-Dive Card */}
        <div className="lg:col-span-6 bg-slate-50/75 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-700/60 mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-white"
                style={{ backgroundColor: active.color }}
              >
                <active.icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{active.label}</h4>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Development Stage: <strong className="text-slate-700 dark:text-slate-200">{active.details.level}</strong>
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                {active.details.score}%
              </span>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 justify-end">
                <TrendingUp className="w-3 h-3" />
                <span>{active.details.trend}</span>
              </div>
            </div>
          </div>

          <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            Key Competencies & Observations
          </h5>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {active.details.skills.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.color }} />
                <span className="truncate">{skill}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Verified by 3 teacher observations</span>
            <span className="text-[#0F4C35] dark:text-emerald-400 font-medium inline-flex items-center hover:underline cursor-pointer">
              Full Evidence Portfolio <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
