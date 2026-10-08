import React from 'react';
import {
  Calendar,
  CalendarCheck,
  BookOpen,
  MessageSquare,
  Users,
  Compass,
  Banknote,
  GraduationCap,
  Sparkles,
  Menu,
  Bell,
  CheckCircle2,
} from 'lucide-react';

export function MobileNav({
  activeNav,
  onSelectNav,
  currentUser,
  onOpenMenu,
}) {
  const role = currentUser.role;

  // Persona-specific mobile primary destinations
  const roleNavItems = {
    TEACHER: [
      { id: 'academics', label: 'My Day', icon: Calendar },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
      { id: 'students', label: 'Classes', icon: Users },
      { id: 'communication', label: 'Messages', icon: MessageSquare },
    ],
    PARENT: [
      { id: 'students', label: 'My Child', icon: GraduationCap },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
      { id: 'academics', label: 'Homework', icon: BookOpen },
      { id: 'finance', label: 'Fees', icon: Banknote },
    ],
    STUDENT: [
      { id: 'academics', label: 'My Day', icon: Calendar },
      { id: 'students', label: 'Classes', icon: BookOpen },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
      { id: 'design-system', label: 'Compass', icon: Sparkles },
    ],
    PRINCIPAL: [
      { id: 'overview', label: 'Overview', icon: Compass },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
      { id: 'admissions', label: 'Admissions', icon: GraduationCap },
      { id: 'operations', label: 'Operations', icon: CheckCircle2 },
    ],
    PARTNER_OPERATOR: [
      { id: 'overview', label: 'Overview', icon: Compass },
      { id: 'finance', label: 'Finance', icon: Banknote },
      { id: 'admissions', label: 'Admissions', icon: GraduationCap },
      { id: 'operations', label: 'Operations', icon: CheckCircle2 },
    ],
    HQ_ADMIN: [
      { id: 'overview', label: 'Overview', icon: Compass },
      { id: 'students', label: 'Students', icon: Users },
      { id: 'admissions', label: 'Admissions', icon: GraduationCap },
      { id: 'finance', label: 'Finance', icon: Banknote },
    ],
  };

  const items = roleNavItems[role] || roleNavItems.HQ_ADMIN;

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B2F29] border-t border-[#154E42]/80 px-3 py-2 flex items-center justify-around shadow-xl"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeNav === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectNav(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors ${
              isActive
                ? 'text-[#DFC679] font-bold'
                : 'text-[#F4EEDC]/75 hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-[#DFC679]' : 'stroke-2 text-[#F4EEDC]/70'}`} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={onOpenMenu}
        className="flex flex-col items-center gap-1 py-1 px-2.5 text-[#F4EEDC]/75 hover:text-white rounded-lg transition-colors"
      >
        <Menu className="w-5 h-5 stroke-2 text-[#F4EEDC]/70" />
        <span className="text-[10px] tracking-tight">More</span>
      </button>
    </nav>
  );
}
