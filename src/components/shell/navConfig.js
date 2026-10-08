import {
  Compass,
  Building,
  School,
  GraduationCap,
  Users,
  CalendarCheck,
  UserPlus,
  BookOpen,
  Banknote,
  Boxes,
  Radio,
  BarChart3,
  Sparkles,
  ShieldCheck,
  History,
  Settings,
  Calendar,
  Heart,
  MessageSquare,
  Award,
  FileCheck,
} from 'lucide-react';

/**
 * Capability Classification Standards:
 * [SOURCE]   - Explicitly supported by client evidence / documents
 * [ENABLER]  - Technically required to make an explicit requirement function reliably
 * [PROPOSED] - Recommended product capability requiring validation
 * 
 * PROPOSED SYSTEM PERSONAS — subject to client validation:
 * HQ_ADMIN, PRINCIPAL, TEACHER, PARENT, STUDENT, PARTNER_OPERATOR, FRANCHISEE
 */
export const getNavGroups = (userRole) => {
  switch (userRole) {
    case 'TEACHER':
      return [
        {
          group: 'TEACHER WORKSPACE [SOURCE]',
          items: [
            { id: 'academics', label: 'My Day & Schedule', subtitle: 'Periods, Timetable & Roster', icon: Calendar, badge: 'Daily', classification: '[SOURCE]' },
            { id: 'attendance', label: 'Daily Attendance', subtitle: 'Classroom roll call & leaves', icon: CalendarCheck, classification: '[SOURCE]' },
            { id: 'students', label: 'My Classes & Students', subtitle: 'Grade 7-A student profiles', icon: Users, classification: '[SOURCE]' },
          ],
        },
        {
          group: 'ACADEMICS & CCE [SOURCE]',
          items: [
            { id: 'academics', label: 'Curriculum & Lessons', subtitle: 'Syllabus & Lesson Plans', icon: BookOpen, classification: '[SOURCE]' },
            { id: 'academics', label: 'Assignments & Homework', subtitle: 'Submissions & evaluations', icon: FileCheck, classification: '[SOURCE]' },
            { id: 'academics', label: 'Student Assessments', subtitle: 'CCE evaluation & progress', icon: Award, classification: '[SOURCE]' },
          ],
        },
        {
          group: 'PARENT PARTNERSHIP [SOURCE]',
          items: [
            { id: 'communication', label: 'Parent Messages', subtitle: 'Direct classroom notices', icon: MessageSquare, classification: '[SOURCE]' },
            { id: 'student-360', label: 'Development Compass', subtitle: 'Holistic growth rubrics', icon: Sparkles, badge: 'VT', classification: '[SOURCE]' },
          ],
        },
      ];

    case 'PARENT':
      return [
        {
          group: 'PARENT PARTNERSHIP [SOURCE]',
          items: [
            { id: 'students', label: 'My Child (Aarav)', subtitle: 'Grade 7-A • Profile & Compass', icon: GraduationCap, badge: 'Aarav', classification: '[SOURCE]' },
            { id: 'attendance', label: 'Attendance Record', subtitle: '96.4% present this term', icon: CalendarCheck, classification: '[SOURCE]' },
            { id: 'academics', label: 'Learning & Timetable', subtitle: 'Daily periods & lessons', icon: BookOpen, classification: '[SOURCE]' },
            { id: 'academics', label: 'Homework & Tasks', subtitle: 'Assigned homework & activities', icon: FileCheck, classification: '[SOURCE]' },
            { id: 'academics', label: 'Progress Reports', subtitle: 'Term evaluation & observations', icon: Award, classification: '[SOURCE]' },
          ],
        },
        {
          group: 'ACCOUNTS & COMMUNICATIONS [SOURCE]',
          items: [
            { id: 'finance', label: 'Fee Collections & Receipts', subtitle: 'Direct fee payment receipts', icon: Banknote, classification: '[SOURCE]' },
            { id: 'communication', label: 'School Notices', subtitle: 'Official circulars & event notes', icon: MessageSquare, classification: '[SOURCE]' },
          ],
        },
      ];

    case 'STUDENT':
      return [
        {
          group: 'STUDENT LEARNING [SOURCE]',
          items: [
            { id: 'academics', label: 'My Day & Timetable', subtitle: 'Class schedule for today', icon: Calendar, badge: 'Active', classification: '[SOURCE]' },
            { id: 'students', label: 'Subjects & Curriculum', subtitle: 'Math, Science, English, Yoga', icon: BookOpen, classification: '[SOURCE]' },
            { id: 'academics', label: 'Assignments & Homework', subtitle: 'Submissions & due dates', icon: FileCheck, classification: '[SOURCE]' },
            { id: 'student-360', label: 'Development Compass', subtitle: 'Character, Wellbeing & Skills', icon: Sparkles, badge: '91%', classification: '[SOURCE]' },
            { id: 'communication', label: 'School Notices', subtitle: 'Classroom circulars & events', icon: MessageSquare, classification: '[SOURCE]' },
          ],
        },
      ];

    case 'PARTNER_OPERATOR':
    case 'FRANCHISEE':
      return [
        {
          group: 'PARTNER & FRANCHISE PORTFOLIO [SOURCE]',
          items: [
            { id: 'overview', label: 'Partner Overview', subtitle: 'Operating units & standards', icon: Compass, badge: 'SPV', classification: '[SOURCE]' },
            { id: 'hierarchy', label: 'Allocated Campuses', subtitle: 'School operating centres', icon: School, classification: '[SOURCE]' },
            { id: 'admissions', label: 'Admissions Funnel', subtitle: 'Enrolment targets & pipeline', icon: UserPlus, classification: '[SOURCE]' },
            { id: 'students', label: 'Active Enrolments', subtitle: 'Student rosters & capacity', icon: GraduationCap, classification: '[SOURCE]' },
          ],
        },
        {
          group: 'FINANCE & COMPLIANCE [SOURCE]',
          items: [
            { id: 'finance', label: 'Collections & Royalty', subtitle: 'Campus fee collections [SOURCE/PROPOSED]', icon: Banknote, classification: '[SOURCE]' },
            { id: 'operations', label: 'Housekeeping & Maintenance', subtitle: 'Campus upkeep & safety', icon: Boxes, classification: '[SOURCE]' },
            { id: 'audit', label: 'Compliance Audit Trail', subtitle: 'Regulatory documentation', icon: History, classification: '[ENABLER]' },
          ],
        },
      ];

    case 'PRINCIPAL':
      return [
        {
          group: 'CENTRE MANAGEMENT [SOURCE]',
          items: [
            { id: 'overview', label: 'Centre Overview', subtitle: 'Operational & academic summary', icon: Compass, badge: 'Live', classification: '[SOURCE]' },
            { id: 'operations', label: 'Campus Command Center', subtitle: 'Daily exceptions & facilities', icon: Boxes, classification: '[SOURCE]' },
            { id: 'students', label: 'Students Directory', subtitle: 'Roll numbers & student records', icon: GraduationCap, classification: '[SOURCE]' },
            { id: 'admissions', label: 'Admissions & Enquiries', subtitle: 'Applications & enrolments', icon: UserPlus, badge: '154', classification: '[SOURCE]' },
          ],
        },
        {
          group: 'ACADEMICS & HR / TRAINING [SOURCE]',
          items: [
            { id: 'academics', label: 'Curriculum & Timetables', subtitle: 'Term plans & report cards', icon: BookOpen, classification: '[SOURCE]' },
            { id: 'attendance', label: 'Attendance & Leaves', subtitle: 'Staff and student rosters', icon: CalendarCheck, classification: '[SOURCE]' },
            { id: 'employees', label: 'Faculty & Training', subtitle: 'Teacher directory & training', icon: Users, classification: '[SOURCE]' },
          ],
        },
        {
          group: 'CENTRE OPERATIONS & SAFETY [SOURCE]',
          items: [
            { id: 'finance', label: 'Fee Collections', subtitle: 'Receipts & accounts', icon: Banknote, classification: '[SOURCE]' },
            { id: 'operations', label: 'Housekeeping & Facilities', subtitle: 'Campus upkeep & employee safety', icon: Boxes, classification: '[SOURCE]' },
            { id: 'communication', label: 'Communications & Events', subtitle: 'Parent notifications & circulars', icon: Radio, classification: '[SOURCE]' },
          ],
        },
      ];

    case 'HQ_ADMIN':
    default:
      return [
        {
          group: 'EXECUTIVE VISIBILITY [SOURCE]',
          items: [
            { id: 'overview', label: 'Network Overview', subtitle: 'Authorised network visibility', icon: Compass, badge: 'Live', classification: '[SOURCE]' },
          ],
        },
        {
          group: 'CENTRAL GOVERNANCE [SOURCE]',
          items: [
            { id: 'design-system', label: 'Development Compass', subtitle: 'Values & Learning Rubrics', icon: Sparkles, badge: 'v2.0', classification: '[SOURCE]' },
            { id: 'hierarchy', label: 'Multi-Centre Network', subtitle: 'Parent IP, SPV & Campus Network', icon: School, badge: '24', classification: '[SOURCE]' },
          ],
        },
        {
          group: 'CURRICULUM & ADMISSIONS [SOURCE]',
          items: [
            { id: 'students', label: 'Student Directory', subtitle: 'Master student records', icon: GraduationCap, classification: '[SOURCE]' },
            { id: 'admissions', label: 'Admissions & Marketing', subtitle: 'Enrolment pipeline & campaigns', icon: UserPlus, badge: 'M-03', classification: '[SOURCE]' },
            { id: 'academics', label: 'Curriculum & Pedagogy', subtitle: 'Gurukul values & modern learning', icon: BookOpen, badge: 'M-06', classification: '[SOURCE]' },
            { id: 'attendance', label: 'Attendance Management', subtitle: 'Daily rosters & tracking', icon: CalendarCheck, badge: 'M-02', classification: '[SOURCE]' },
          ],
        },
        {
          group: 'FINANCE & HR / ADMINISTRATION [SOURCE]',
          items: [
            { id: 'finance', label: 'Finance & Collections', subtitle: 'Accounts, billing & collections', icon: Banknote, badge: 'M-04', classification: '[SOURCE]' },
            { id: 'operations', label: 'Operations & Maintenance', subtitle: 'Housekeeping, safety & facilities', icon: Boxes, badge: 'M-08', classification: '[SOURCE]' },
            { id: 'employees', label: 'HR & Faculty Training', subtitle: 'Teacher standards & onboarding', icon: Users, badge: 'M-01', classification: '[SOURCE]' },
            { id: 'communication', label: 'Parent & Public Comms', subtitle: 'Notices, events & circulars', icon: Radio, badge: 'M-05', classification: '[SOURCE]' },
          ],
        },
        {
          group: 'PLATFORM GOVERNANCE [ENABLER]',
          items: [
            { id: 'rbac', label: 'RBAC & Safeguarding Vault', subtitle: 'Access controls & child safety', icon: ShieldCheck, classification: '[ENABLER]' },
            { id: 'audit', label: 'Immutable Audit Trail', subtitle: 'Compliance event ledger', icon: History, badge: 'Live', classification: '[ENABLER]' },
          ],
        },
      ];
  }
};
