// VEDIC TREE OS — Canonical Seed Data Fixtures

export const SEED_ORGANIZATION = {
  id: 'org-vedic-tree-foundation',
  name: 'Vedic Tree Foundation',
  code: 'VT-GLOBAL',
  slug: 'vedic-tree-foundation',
  status: 'ACTIVE',
  logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=128&auto=format&fit=crop',
  settings: {
    theme: 'vedic-green',
    currency: 'INR',
    fiscalYearStart: '04-01',
    boardAffiliation: 'CBSE'
  }
};

export const SEED_REGIONS = [
  {
    id: 'reg-west-india',
    organizationId: SEED_ORGANIZATION.id,
    name: 'West India Region',
    code: 'REG-WEST',
    countryCode: 'IN',
    currencyCode: 'INR',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'reg-north-india',
    organizationId: SEED_ORGANIZATION.id,
    name: 'North India Region',
    code: 'REG-NORTH',
    countryCode: 'IN',
    currencyCode: 'INR',
    timezone: 'Asia/Kolkata'
  }
];

export const SEED_SCHOOLS = [
  {
    id: 'sch-pune-intl',
    organizationId: SEED_ORGANIZATION.id,
    regionId: 'reg-west-india',
    name: 'Vedic Tree International School Pune',
    code: 'VTIS-PUNE',
    affiliationNo: 'CBSE/AFF/1130492',
    boardType: 'CBSE',
    ownershipType: 'OWNED',
    status: 'ACTIVE'
  },
  {
    id: 'sch-mumbai-acad',
    organizationId: SEED_ORGANIZATION.id,
    regionId: 'reg-west-india',
    name: 'Vedic Tree Academy Mumbai',
    code: 'VTA-MUMBAI',
    affiliationNo: 'ICSE/AFF/MH-102',
    boardType: 'ICSE',
    ownershipType: 'FRANCHISE',
    franchiseId: 'fr-mumbai-bandra',
    partnerId: 'pt-west-edu',
    status: 'ACTIVE'
  },
  {
    id: 'sch-nagpur-partner',
    organizationId: SEED_ORGANIZATION.id,
    regionId: 'reg-west-india',
    name: 'Vedic Tree Partner School Nagpur',
    code: 'VTPS-NAGPUR',
    affiliationNo: 'CBSE/AFF/214055',
    boardType: 'CBSE',
    ownershipType: 'PARTNER',
    partnerId: 'pt-west-edu',
    status: 'ACTIVE'
  }
];

export const SEED_CAMPUSES = [
  {
    id: 'cmp-pune-baner',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-pune-intl',
    name: 'Panvel Campus [Demo Campus]',
    code: 'PUNE-BNR',
    addressLine1: 'Vedic Tree Educational Hub, Sector 12, Panvel',
    city: 'Panvel',
    state: 'Maharashtra',
    postalCode: '410206',
    phone: '+91 22 2745 4000',
    email: 'panvel@vedictree.edu.in',
    isPrimary: true,
    status: 'ACTIVE'
  },
  {
    id: 'cmp-pune-kothrud',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-pune-intl',
    name: 'Kharghar Campus',
    code: 'PUNE-KTR',
    addressLine1: 'Plot 18, Sector 20, Kharghar',
    city: 'Kharghar',
    state: 'Maharashtra',
    postalCode: '410210',
    phone: '+91 22 2774 5000',
    email: 'kharghar@vedictree.edu.in',
    isPrimary: false,
    status: 'ACTIVE'
  },
  {
    id: 'cmp-mumbai-bandra',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-mumbai-acad',
    name: 'Thane Campus',
    code: 'MUM-BND',
    addressLine1: 'Hill Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    phone: '+91 22 2640 1000',
    email: 'bandra@vedictree.edu.in',
    isPrimary: true,
    status: 'ACTIVE'
  },
  {
    id: 'cmp-nagpur-wardha',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-nagpur-partner',
    name: 'Demo Campus — Nagpur',
    code: 'NGP-DEMO',
    addressLine1: 'Strategic Expansion Hub [DEMO / PROPOSED]',
    city: 'Nagpur',
    state: 'Maharashtra',
    postalCode: '441108',
    phone: '+91 712 2800 100',
    email: 'nagpur@vedictree.edu.in',
    isPrimary: true,
    status: 'ACTIVE'
  }
];

export const SEED_ROLES = [
  {
    id: 'role-hq-admin',
    organizationId: SEED_ORGANIZATION.id,
    name: 'HQ Super Administrator',
    code: 'HQ_ADMIN',
    scopeLevel: 'ORGANIZATION',
    isSystem: true
  },
  {
    id: 'role-partner-operator',
    organizationId: SEED_ORGANIZATION.id,
    name: 'Partner Network Director',
    code: 'PARTNER_OPERATOR',
    scopeLevel: 'PARTNER',
    isSystem: true
  },
  {
    id: 'role-franchisee',
    organizationId: SEED_ORGANIZATION.id,
    name: 'Franchise Owner / Licensee',
    code: 'FRANCHISEE',
    scopeLevel: 'FRANCHISE',
    isSystem: true
  },
  {
    id: 'role-principal',
    organizationId: SEED_ORGANIZATION.id,
    name: 'Campus Principal',
    code: 'PRINCIPAL',
    scopeLevel: 'CAMPUS',
    isSystem: true
  },
  {
    id: 'role-teacher',
    organizationId: SEED_ORGANIZATION.id,
    name: 'Classroom Teacher',
    code: 'TEACHER',
    scopeLevel: 'CAMPUS',
    isSystem: true
  },
  {
    id: 'role-parent',
    organizationId: SEED_ORGANIZATION.id,
    name: 'Parent / Guardian',
    code: 'PARENT',
    scopeLevel: 'CAMPUS',
    isSystem: true
  }
];

export const SEED_PERMISSIONS = [
  // Tenant & System
  { id: 'perm-tenant-manage', code: 'tenant:manage', module: 'tenant', action: 'manage' },
  { id: 'perm-tenant-switch', code: 'tenant:switch', module: 'tenant', action: 'switch' },
  { id: 'perm-audit-read', code: 'audit:read', module: 'audit', action: 'read' },
  
  // Student SIS
  { id: 'perm-students-read', code: 'students:read', module: 'students', action: 'read' },
  { id: 'perm-students-create', code: 'students:create', module: 'students', action: 'create' },
  { id: 'perm-students-update', code: 'students:update', module: 'students', action: 'update' },
  { id: 'perm-students-delete', code: 'students:delete', module: 'students', action: 'delete' },
  
  // Employee HRMS
  { id: 'perm-employees-read', code: 'employees:read', module: 'employees', action: 'read' },
  { id: 'perm-employees-create', code: 'employees:create', module: 'employees', action: 'create' },
  { id: 'perm-employees-update', code: 'employees:update', module: 'employees', action: 'update' },
  { id: 'perm-employees-delete', code: 'employees:delete', module: 'employees', action: 'delete' },

  // Attendance & Policy Engine
  { id: 'perm-attendance-read', code: 'attendance:read', module: 'attendance', action: 'read' },
  { id: 'perm-attendance-mark', code: 'attendance:mark', module: 'attendance', action: 'mark' },
  { id: 'perm-attendance-policy', code: 'attendance:policy_manage', module: 'attendance', action: 'policy_manage' },

  // Leave & Workflow
  { id: 'perm-leaves-read', code: 'leaves:read', module: 'leaves', action: 'read' },
  { id: 'perm-leaves-apply', code: 'leaves:apply', module: 'leaves', action: 'apply' },
  { id: 'perm-leaves-approve', code: 'leaves:approve', module: 'leaves', action: 'approve' },

  // Admissions CRM
  { id: 'perm-admissions-read', code: 'admissions:read', module: 'admissions', action: 'read' },
  { id: 'perm-admissions-create', code: 'admissions:create', module: 'admissions', action: 'create' },
  { id: 'perm-admissions-counsel', code: 'admissions:counsel', module: 'admissions', action: 'counsel' },
  { id: 'perm-admissions-visit', code: 'admissions:visit', module: 'admissions', action: 'visit' },
  { id: 'perm-admissions-apply', code: 'admissions:apply', module: 'admissions', action: 'apply' },
  { id: 'perm-admissions-assess', code: 'admissions:assess', module: 'admissions', action: 'assess' },
  { id: 'perm-admissions-offer', code: 'admissions:offer', module: 'admissions', action: 'offer' },
  { id: 'perm-admissions-admit', code: 'admissions:admit', module: 'admissions', action: 'admit' },
  { id: 'perm-admissions-comm', code: 'admissions:whatsapp_send', module: 'admissions', action: 'whatsapp_send' },

  // Finance & Fees
  { id: 'perm-finance-read', code: 'finance:read', module: 'finance', action: 'read' },
  { id: 'perm-finance-collect', code: 'finance:collect', module: 'finance', action: 'collect' },
  { id: 'perm-finance-invoice-create', code: 'finance:invoice_create', module: 'finance', action: 'invoice_create' },
  { id: 'perm-finance-refund', code: 'finance:refund', module: 'finance', action: 'refund' },
  { id: 'perm-finance-structure-manage', code: 'finance:structure_manage', module: 'finance', action: 'structure_manage' },
  { id: 'perm-finance-ledger-read', code: 'finance:ledger_read', module: 'finance', action: 'ledger_read' },

  // Communication Center
  { id: 'perm-comm-read', code: 'communication:read', module: 'communication', action: 'read' },
  { id: 'perm-comm-broadcast', code: 'communication:send_broadcast', module: 'communication', action: 'send_broadcast' },
  { id: 'perm-comm-transactional', code: 'communication:send_transactional', module: 'communication', action: 'send_transactional' },
  { id: 'perm-comm-templates', code: 'communication:templates_manage', module: 'communication', action: 'templates_manage' },
  { id: 'perm-comm-preferences', code: 'communication:preferences_manage', module: 'communication', action: 'preferences_manage' },

  // Academics, Curriculum, Timetable & CCE
  { id: 'perm-academic-read', code: 'academic:read', module: 'academic', action: 'read' },
  { id: 'perm-academic-manage', code: 'academic:manage', module: 'academic', action: 'manage' },
  { id: 'perm-academic-grades', code: 'academic:grades_manage', module: 'academic', action: 'grades_manage' },
  { id: 'perm-academic-assessments', code: 'academic:assessments_manage', module: 'academic', action: 'assessments_manage' },
  { id: 'perm-academic-reportcards', code: 'academic:report_cards_publish', module: 'academic', action: 'report_cards_publish' },

  // School Operations & Logistics
  { id: 'perm-operations-read', code: 'operations:read', module: 'operations', action: 'read' },
  { id: 'perm-operations-manage', code: 'operations:manage', module: 'operations', action: 'manage' },
  { id: 'perm-operations-procurement', code: 'operations:procurement_manage', module: 'operations', action: 'procurement_manage' },
  { id: 'perm-operations-incidents', code: 'operations:incidents_manage', module: 'operations', action: 'incidents_manage' },
  { id: 'perm-operations-sensitive-read', code: 'operations:sensitive_incidents_read', module: 'operations', action: 'sensitive_incidents_read' },
  { id: 'perm-operations-sensitive-manage', code: 'operations:sensitive_incidents_manage', module: 'operations', action: 'sensitive_incidents_manage' },
  { id: 'perm-operations-complaints', code: 'operations:complaints_manage', module: 'operations', action: 'complaints_manage' },
  { id: 'perm-operations-transport', code: 'operations:transport_manage', module: 'operations', action: 'transport_manage' },

  // Module 10: Partner + Franchise Platform
  { id: 'perm-franchise-read-global', code: 'franchise:read_global', module: 'franchise', action: 'read_global' },
  { id: 'perm-franchise-manage-global', code: 'franchise:manage_global', module: 'franchise', action: 'manage_global' },
  { id: 'perm-partner-read-own', code: 'partner:read_own', module: 'partner', action: 'read_own' },
  { id: 'perm-partner-manage-own', code: 'partner:manage_own', module: 'partner', action: 'manage_own' },
  { id: 'perm-partner-financials-read', code: 'partner:financials_read', module: 'partner', action: 'financials_read' },
  { id: 'perm-franchise-read-own', code: 'franchise:read_own', module: 'franchise', action: 'read_own' },
  { id: 'perm-royalty-calculate', code: 'royalty:calculate_and_invoice', module: 'royalty', action: 'calculate_and_invoice' },
  { id: 'perm-royalty-read-own', code: 'royalty:read_own', module: 'royalty', action: 'read_own' },
  { id: 'perm-compliance-audit', code: 'compliance:audit_and_enforce', module: 'compliance', action: 'audit_and_enforce' },
  { id: 'perm-compliance-view-own', code: 'compliance:view_own', module: 'compliance', action: 'view_own' },
  { id: 'perm-performance-view-own', code: 'performance:view_own', module: 'performance', action: 'view_own' },
  { id: 'perm-support-create', code: 'support:create', module: 'support', action: 'create' },
  { id: 'perm-support-resolve-hq', code: 'support:resolve_hq', module: 'support', action: 'resolve_hq' }
];

export const SEED_ROLE_PERMISSIONS = {
  HQ_ADMIN: [
    'tenant:manage', 'tenant:switch', 'audit:read',
    'students:read', 'students:create', 'students:update', 'students:delete',
    'employees:read', 'employees:create', 'employees:update', 'employees:delete',
    'attendance:read', 'attendance:mark', 'attendance:policy_manage',
    'leaves:read', 'leaves:apply', 'leaves:approve',
    'admissions:read', 'admissions:create', 'admissions:counsel', 'admissions:visit', 'admissions:apply', 'admissions:assess', 'admissions:offer', 'admissions:admit', 'admissions:whatsapp_send',
    'finance:read', 'finance:collect', 'finance:invoice_create', 'finance:refund', 'finance:structure_manage', 'finance:ledger_read',
    'communication:read', 'communication:send_broadcast', 'communication:send_transactional', 'communication:templates_manage', 'communication:preferences_manage',
    'academic:read', 'academic:manage', 'academic:grades_manage', 'academic:assessments_manage', 'academic:report_cards_publish',
    'operations:read', 'operations:manage', 'operations:procurement_manage', 'operations:incidents_manage', 'operations:sensitive_incidents_read', 'operations:sensitive_incidents_manage', 'operations:complaints_manage', 'operations:transport_manage',
    'franchise:read_global', 'franchise:manage_global', 'partner:read_own', 'partner:manage_own', 'partner:financials_read', 'franchise:read_own', 'royalty:calculate_and_invoice', 'royalty:read_own', 'compliance:audit_and_enforce', 'compliance:view_own', 'performance:view_own', 'support:create', 'support:resolve_hq'
  ],
  PARTNER_OPERATOR: [
    'partner:read_own', 'partner:manage_own', 'partner:financials_read',
    'royalty:read_own', 'compliance:view_own', 'performance:view_own', 'support:create'
  ],
  FRANCHISEE: [
    'franchise:read_own', 'royalty:read_own', 'compliance:view_own',
    'performance:view_own', 'support:create'
  ],
  PRINCIPAL: [
    'tenant:switch', 'audit:read',
    'students:read', 'students:create', 'students:update',
    'employees:read', 'employees:create', 'employees:update',
    'attendance:read', 'attendance:mark', 'attendance:policy_manage',
    'leaves:read', 'leaves:apply', 'leaves:approve',
    'admissions:read', 'admissions:create', 'admissions:counsel', 'admissions:visit', 'admissions:apply', 'admissions:assess', 'admissions:offer', 'admissions:admit', 'admissions:whatsapp_send',
    'finance:read', 'finance:collect', 'finance:invoice_create', 'finance:refund', 'finance:structure_manage', 'finance:ledger_read',
    'communication:read', 'communication:send_broadcast', 'communication:send_transactional', 'communication:templates_manage', 'communication:preferences_manage',
    'academic:read', 'academic:manage', 'academic:grades_manage', 'academic:assessments_manage', 'academic:report_cards_publish',
    'operations:read', 'operations:manage', 'operations:procurement_manage', 'operations:incidents_manage', 'operations:sensitive_incidents_read', 'operations:sensitive_incidents_manage', 'operations:complaints_manage', 'operations:transport_manage',
    'compliance:view_own', 'performance:view_own', 'support:create'
  ],
  TEACHER: [
    'students:read',
    'employees:read',
    'attendance:read', 'attendance:mark',
    'leaves:read', 'leaves:apply',
    'admissions:read', 'admissions:assess',
    'finance:read',
    'communication:read', 'communication:send_transactional',
    'academic:read', 'academic:grades_manage', 'academic:assessments_manage',
    'operations:read', 'operations:incidents_manage', 'operations:complaints_manage'
  ],
  PARENT: [
    'students:read',
    'attendance:read',
    'leaves:apply',
    'finance:read',
    'communication:read', 'communication:preferences_manage',
    'academic:read',
    'operations:complaints_manage'
  ],
  STUDENT: [
    'students:read',
    'attendance:read',
    'communication:read',
    'academic:read',
    'operations:complaints_manage'
  ]
};

export const SEED_USERS = [
  {
    id: 'usr-hq-admin',
    organizationId: SEED_ORGANIZATION.id,
    email: 'admin@vedictree.edu.in',
    phone: '+91 98200 11000',
    firstName: 'Raghav',
    lastName: 'Sharma',
    passwordHash: 'admin123', // In demo/seed
    status: 'ACTIVE',
    roleCode: 'HQ_ADMIN',
    campusId: null
  },
  {
    id: 'usr-principal-baner',
    organizationId: SEED_ORGANIZATION.id,
    email: 'principal.baner@vedictree.edu.in',
    phone: '+91 98200 22000',
    firstName: 'Dr. Meenakshi',
    lastName: 'Sundaram',
    passwordHash: 'principal123',
    status: 'ACTIVE',
    roleCode: 'PRINCIPAL',
    campusId: 'cmp-pune-baner'
  },
  {
    id: 'usr-teacher-patil',
    organizationId: SEED_ORGANIZATION.id,
    email: 'sunita.patil@vedictree.edu.in',
    phone: '+91 98200 33000',
    firstName: 'Sunita',
    lastName: 'Patil',
    passwordHash: 'teacher123',
    status: 'ACTIVE',
    roleCode: 'TEACHER',
    campusId: 'cmp-pune-baner'
  },
  {
    id: 'usr-parent-deshmukh',
    organizationId: SEED_ORGANIZATION.id,
    email: 'priya.deshmukh@gmail.com',
    phone: '+91 98200 44000',
    firstName: 'Priya',
    lastName: 'Deshmukh',
    passwordHash: 'parent123',
    status: 'ACTIVE',
    roleCode: 'PARENT',
    campusId: 'cmp-pune-baner'
  },
  {
    id: 'usr-partner-west',
    organizationId: SEED_ORGANIZATION.id,
    email: 'rajesh.partner@vedictree.edu.in',
    phone: '+91 98200 66000',
    firstName: 'Rajesh',
    lastName: 'Kapadia',
    passwordHash: 'partner123',
    status: 'ACTIVE',
    roleCode: 'PARTNER_OPERATOR',
    partnerId: 'pt-west-edu',
    campusId: null
  },
  {
    id: 'usr-franchisee-mumbai',
    organizationId: SEED_ORGANIZATION.id,
    email: 'kavita.franchise@vedictree.edu.in',
    phone: '+91 98200 55000',
    firstName: 'Kavita',
    lastName: 'Singhania',
    passwordHash: 'franchise123',
    status: 'ACTIVE',
    roleCode: 'FRANCHISEE',
    franchiseId: 'fr-mumbai-bandra',
    campusId: 'cmp-mumbai-bandra'
  },
  {
    id: 'usr-student-aarav',
    organizationId: SEED_ORGANIZATION.id,
    email: 'aarav.sharma@student.vedictree.edu.in',
    phone: '+91 98200 77000',
    firstName: 'Aarav',
    lastName: 'Sharma',
    passwordHash: 'student123',
    status: 'ACTIVE',
    roleCode: 'STUDENT',
    campusId: 'cmp-pune-baner'
  }
];

export const SEED_ACADEMIC_YEARS = [
  {
    id: 'ay-2026-2027',
    schoolId: 'sch-pune-intl',
    name: '2026-2027',
    code: 'AY2627',
    startDate: '2026-04-01',
    endDate: '2027-03-31',
    isCurrent: true,
    isLocked: false
  },
  {
    id: 'ay-2025-2026',
    schoolId: 'sch-pune-intl',
    name: '2025-2026',
    code: 'AY2526',
    startDate: '2025-04-01',
    endDate: '2026-03-31',
    isCurrent: false,
    isLocked: true
  }
];

export const SEED_GRADES = [
  { id: 'grd-1', schoolId: 'sch-pune-intl', name: 'Grade 1', levelOrder: 1 },
  { id: 'grd-2', schoolId: 'sch-pune-intl', name: 'Grade 2', levelOrder: 2 },
  { id: 'grd-5', schoolId: 'sch-pune-intl', name: 'Grade 5', levelOrder: 5 },
  { id: 'grd-6', schoolId: 'sch-pune-intl', name: 'Grade 6', levelOrder: 6 },
  { id: 'grd-10', schoolId: 'sch-pune-intl', name: 'Grade 10', levelOrder: 10 }
];

export const SEED_DIVISIONS = [
  { id: 'div-pune-5a', campusId: 'cmp-pune-baner', gradeId: 'grd-5', name: 'A', capacity: 40, roomNumber: 'Room 201' },
  { id: 'div-pune-5b', campusId: 'cmp-pune-baner', gradeId: 'grd-5', name: 'B', capacity: 40, roomNumber: 'Room 202' },
  { id: 'div-pune-6a', campusId: 'cmp-pune-baner', gradeId: 'grd-6', name: 'A', capacity: 40, roomNumber: 'Room 301' },
  { id: 'div-pune-6b', campusId: 'cmp-pune-baner', gradeId: 'grd-6', name: 'B', capacity: 40, roomNumber: 'Room 302' },
  { id: 'div-ktr-6a', campusId: 'cmp-pune-kothrud', gradeId: 'grd-6', name: 'A', capacity: 35, roomNumber: 'Room 101' }
];

export const SEED_DEPARTMENTS = [
  { id: 'dept-acad', campusId: 'cmp-pune-baner', name: 'Academics & Teaching', code: 'ACAD' },
  { id: 'dept-admin', campusId: 'cmp-pune-baner', name: 'Administration & Admissions', code: 'ADMIN' },
  { id: 'dept-sci', campusId: 'cmp-pune-baner', name: 'Science & Robotics', code: 'SCI' },
  { id: 'dept-sports', campusId: 'cmp-pune-baner', name: 'Physical Education & Sports', code: 'SPORTS' }
];

export const SEED_DESIGNATIONS = [
  { id: 'des-principal', departmentId: 'dept-admin', title: 'Principal', code: 'PRIN', payGrade: 'L1' },
  { id: 'des-hod', departmentId: 'dept-acad', title: 'Head of Department', code: 'HOD', payGrade: 'L2' },
  { id: 'des-sr-teacher', departmentId: 'dept-acad', title: 'Senior Teacher', code: 'SR-TCH', payGrade: 'L3' },
  { id: 'des-pri-teacher', departmentId: 'dept-acad', title: 'Primary Teacher', code: 'PRI-TCH', payGrade: 'L4' },
  { id: 'des-admin-officer', departmentId: 'dept-admin', title: 'Registrar & Admin Officer', code: 'REG-OFF', payGrade: 'L3' }
];

export const SEED_EMPLOYEES = [
  {
    id: 'emp-meenakshi',
    campusId: 'cmp-pune-baner',
    userId: 'usr-principal-baner',
    departmentId: 'dept-admin',
    designationId: 'des-principal',
    employeeCode: 'VT-EMP-001',
    firstName: 'Meenakshi',
    lastName: 'Sundaram',
    email: 'principal.baner@vedictree.edu.in',
    phone: '+91 98200 22000',
    gender: 'FEMALE',
    dateOfJoining: '2020-06-01',
    biometricId: 'BIO-1001',
    status: 'ACTIVE',
    aadhaarLastFour: '4892',
    documents: [
      { id: 'doc-emp-1', documentType: 'ID_PROOF', fileName: 'Aadhaar_Card.pdf', fileSize: 420000, verifiedAt: '2020-06-02' },
      { id: 'doc-emp-2', documentType: 'DEGREE', fileName: 'Doctorate_Certificate.pdf', fileSize: 1850000, verifiedAt: '2020-06-02' }
    ]
  },
  {
    id: 'emp-sunita',
    campusId: 'cmp-pune-baner',
    userId: 'usr-teacher-patil',
    departmentId: 'dept-acad',
    designationId: 'des-sr-teacher',
    employeeCode: 'VT-EMP-042',
    firstName: 'Sunita',
    lastName: 'Patil',
    email: 'sunita.patil@vedictree.edu.in',
    phone: '+91 98200 33000',
    gender: 'FEMALE',
    dateOfJoining: '2022-04-15',
    biometricId: 'BIO-1042',
    status: 'ACTIVE',
    aadhaarLastFour: '7124',
    documents: [
      { id: 'doc-emp-3', documentType: 'RESUME', fileName: 'Sunita_Patil_CV.pdf', fileSize: 210000, verifiedAt: '2022-04-15' },
      { id: 'doc-emp-4', documentType: 'DEGREE', fileName: 'BEd_Degree.pdf', fileSize: 980000, verifiedAt: '2022-04-16' }
    ]
  },
  {
    id: 'emp-rajesh',
    campusId: 'cmp-pune-baner',
    userId: null,
    departmentId: 'dept-admin',
    designationId: 'des-admin-officer',
    employeeCode: 'VT-EMP-088',
    firstName: 'Rajesh',
    lastName: 'Verma',
    email: 'rajesh.verma@vedictree.edu.in',
    phone: '+91 98200 55000',
    gender: 'MALE',
    dateOfJoining: '2023-01-10',
    biometricId: 'BIO-1088',
    status: 'ACTIVE',
    aadhaarLastFour: '3319',
    documents: []
  },
  {
    id: 'emp-kothrud-teacher',
    campusId: 'cmp-pune-kothrud', // Different campus!
    userId: null,
    departmentId: 'dept-acad',
    designationId: 'des-pri-teacher',
    employeeCode: 'VT-KTR-012',
    firstName: 'Anand',
    lastName: 'Kulkarni',
    email: 'anand.kulkarni@vedictree.edu.in',
    phone: '+91 98200 66000',
    gender: 'MALE',
    dateOfJoining: '2024-06-01',
    biometricId: 'BIO-2012',
    status: 'ACTIVE',
    aadhaarLastFour: '9081',
    documents: []
  }
];

export const SEED_GUARDIANS = [
  {
    id: 'grd-deshmukh',
    userId: 'usr-parent-deshmukh',
    firstName: 'Priya',
    lastName: 'Deshmukh',
    relation: 'MOTHER',
    phone: '+91 98200 44000',
    email: 'priya.deshmukh@gmail.com',
    occupation: 'Software Architect',
    address: 'Flat 402, Rohan Heights, Baner Road, Pune'
  },
  {
    id: 'grd-sharma',
    userId: null,
    firstName: 'Dr. Vikram',
    lastName: 'Sharma',
    relation: 'FATHER',
    phone: '+91 98230 12345',
    email: 'vikram.sharma@medicare.in',
    occupation: 'Cardiologist',
    address: 'Bungalow 7, Sindh Society, Aundh, Pune'
  },
  {
    id: 'grd-joshi',
    userId: null,
    firstName: 'Sneha',
    lastName: 'Joshi',
    relation: 'MOTHER',
    phone: '+91 98230 98765',
    email: 'sneha.joshi@outlook.com',
    occupation: 'Professor of Literature',
    address: '14/B Mayur Colony, Kothrud, Pune'
  }
];

export const SEED_STUDENTS = [
  {
    id: 'stu-kabir-deshmukh',
    campusId: 'cmp-pune-baner',
    admissionNumber: 'VT-2026-001',
    firstName: 'Kabir',
    lastName: 'Deshmukh',
    dob: '2015-08-14',
    gender: 'MALE',
    bloodGroup: 'B+',
    aadhaarLastFour: '8912',
    emergencyPhone: '+91 98200 44000',
    medicalNotes: 'Mild peanut allergy. Carries inhaler for seasonal bronchitis.',
    status: 'ACTIVE',
    guardians: [
      { guardianId: 'grd-deshmukh', isPrimary: true, isAuthorizedPickup: true }
    ],
    enrollment: {
      academicYearId: 'ay-2026-2027',
      gradeId: 'grd-5',
      divisionId: 'div-pune-5b',
      rollNumber: 14,
      status: 'ENROLLED'
    },
    documents: [
      { id: 'sdoc-1', documentType: 'BIRTH_CERTIFICATE', fileName: 'Kabir_Birth_Cert.pdf', fileSize: 540000, verifiedAt: '2026-03-10' },
      { id: 'sdoc-2', documentType: 'AADHAAR', fileName: 'Kabir_Aadhaar_Masked.pdf', fileSize: 320000, verifiedAt: '2026-03-10' },
      { id: 'sdoc-3', documentType: 'PREVIOUS_MARKSHEET', fileName: 'Grade4_Annual_Report.pdf', fileSize: 810000, verifiedAt: '2026-03-12' }
    ]
  },
  {
    id: 'stu-aarav-sharma',
    campusId: 'cmp-pune-baner',
    admissionNumber: 'VT-2026-042',
    firstName: 'Aarav',
    lastName: 'Sharma',
    dob: '2014-05-22',
    gender: 'MALE',
    bloodGroup: 'O+',
    aadhaarLastFour: '4451',
    emergencyPhone: '+91 98230 12345',
    medicalNotes: 'No known allergies. Standard medical clearance.',
    status: 'ACTIVE',
    guardians: [
      { guardianId: 'grd-sharma', isPrimary: true, isAuthorizedPickup: true }
    ],
    enrollment: {
      academicYearId: 'ay-2026-2027',
      gradeId: 'grd-6',
      divisionId: 'div-pune-6a',
      rollNumber: 3,
      status: 'ENROLLED'
    },
    documents: [
      { id: 'sdoc-4', documentType: 'BIRTH_CERTIFICATE', fileName: 'Aarav_Birth_Certificate.pdf', fileSize: 620000, verifiedAt: '2026-02-15' },
      { id: 'sdoc-5', documentType: 'TRANSFER_CERTIFICATE', fileName: 'DPS_Transfer_Certificate.pdf', fileSize: 450000, verifiedAt: '2026-02-18' }
    ]
  },
  {
    id: 'stu-ananya-joshi',
    campusId: 'cmp-pune-kothrud', // Different campus! (Kothrud)
    admissionNumber: 'VT-KTR-2026-015',
    firstName: 'Ananya',
    lastName: 'Joshi',
    dob: '2014-11-03',
    gender: 'FEMALE',
    bloodGroup: 'A+',
    aadhaarLastFour: '1209',
    emergencyPhone: '+91 98230 98765',
    medicalNotes: 'Wears corrective eyeglasses for reading.',
    status: 'ACTIVE',
    guardians: [
      { guardianId: 'grd-joshi', isPrimary: true, isAuthorizedPickup: true }
    ],
    enrollment: {
      academicYearId: 'ay-2026-2027',
      gradeId: 'grd-6',
      divisionId: 'div-ktr-6a',
      rollNumber: 8,
      status: 'ENROLLED'
    },
    documents: [
      { id: 'sdoc-6', documentType: 'BIRTH_CERTIFICATE', fileName: 'Ananya_Birth_Cert.pdf', fileSize: 490000, verifiedAt: '2026-03-01' }
    ]
  },
  {
    id: 'stu-aditi-rao',
    campusId: 'cmp-pune-baner',
    admissionNumber: 'VT-2026-088',
    firstName: 'Aditi',
    lastName: 'Rao',
    dob: '2015-02-19',
    gender: 'FEMALE',
    bloodGroup: 'B+',
    aadhaarLastFour: '9012',
    emergencyPhone: '+91 98200 77000',
    medicalNotes: 'No known allergies.',
    status: 'ACTIVE',
    guardians: [],
    enrollment: {
      academicYearId: 'ay-2026-2027',
      gradeId: 'grd-5',
      divisionId: 'div-pune-5a',
      rollNumber: 1,
      status: 'ENROLLED'
    },
    documents: []
  },
  {
    id: 'stu-rohan-kulkarni',
    campusId: 'cmp-pune-baner',
    admissionNumber: 'VT-2026-089',
    firstName: 'Rohan',
    lastName: 'Kulkarni',
    dob: '2015-06-11',
    gender: 'MALE',
    bloodGroup: 'A+',
    aadhaarLastFour: '3341',
    emergencyPhone: '+91 98200 88000',
    medicalNotes: 'Asthmatic inhaler on sports days.',
    status: 'ACTIVE',
    guardians: [],
    enrollment: {
      academicYearId: 'ay-2026-2027',
      gradeId: 'grd-5',
      divisionId: 'div-pune-5a',
      rollNumber: 2,
      status: 'ENROLLED'
    },
    documents: []
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'aud-1',
    organizationId: SEED_ORGANIZATION.id,
    campusId: 'cmp-pune-baner',
    userId: 'usr-hq-admin',
    userRole: 'HQ_ADMIN',
    action: 'CREATE',
    entityName: 'Campus',
    entityId: 'cmp-pune-baner',
    diffBefore: null,
    diffAfter: JSON.stringify({ name: 'Pune Baner Campus', code: 'PUNE-BNR' }),
    ipAddress: '192.168.1.10',
    userAgent: 'VedicTree-Agent/2.0',
    createdAt: new Date('2026-03-01T08:00:00Z').toISOString()
  },
  {
    id: 'aud-2',
    organizationId: SEED_ORGANIZATION.id,
    campusId: 'cmp-pune-baner',
    userId: 'usr-principal-baner',
    userRole: 'PRINCIPAL',
    action: 'CREATE',
    entityName: 'Student',
    entityId: 'stu-kabir-deshmukh',
    diffBefore: null,
    diffAfter: JSON.stringify({ admissionNumber: 'VT-2026-001', studentName: 'Kabir Deshmukh' }),
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    createdAt: new Date('2026-03-10T10:15:00Z').toISOString()
  },
  {
    id: 'aud-3',
    organizationId: SEED_ORGANIZATION.id,
    campusId: 'cmp-pune-baner',
    userId: 'usr-principal-baner',
    userRole: 'PRINCIPAL',
    action: 'CREATE',
    entityName: 'Student',
    entityId: 'stu-aarav-sharma',
    diffBefore: null,
    diffAfter: JSON.stringify({ admissionNumber: 'VT-2026-042', studentName: 'Aarav Sharma' }),
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    createdAt: new Date('2026-03-11T11:30:00Z').toISOString()
  }
];

// ==========================================
// MODULE 02: ATTENDANCE & POLICY SEED DATA
// ==========================================

export const SEED_ATTENDANCE_POLICIES = [
  {
    id: 'pol-pune-baner',
    campusId: 'cmp-pune-baner',
    shiftStartTime: '08:00',
    shiftEndTime: '16:00',
    gracePeriodMinutes: 15,
    lateThresholdMinutes: 30,
    halfDayMinWorkingHours: 4.0,
    fullDayMinWorkingHours: 7.0,
    lateDeductionThreshold: 3,
    isSandwichRuleEnabled: true,
    sandwichLeaveTypes: 'CASUAL_LEAVE,SICK_LEAVE',
    minStudentAttendancePct: 75.0,
    warningStudentAttendancePct: 80.0,
    createdAt: new Date('2026-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-01T00:00:00Z').toISOString()
  },
  {
    id: 'pol-pune-kothrud',
    campusId: 'cmp-pune-kothrud',
    shiftStartTime: '08:30',
    shiftEndTime: '16:30',
    gracePeriodMinutes: 15,
    lateThresholdMinutes: 30,
    halfDayMinWorkingHours: 4.0,
    fullDayMinWorkingHours: 7.0,
    lateDeductionThreshold: 3,
    isSandwichRuleEnabled: true,
    sandwichLeaveTypes: 'CASUAL_LEAVE,SICK_LEAVE',
    minStudentAttendancePct: 75.0,
    warningStudentAttendancePct: 80.0,
    createdAt: new Date('2026-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-01T00:00:00Z').toISOString()
  },
  {
    id: 'pol-mumbai-bandra',
    campusId: 'cmp-mumbai-bandra',
    shiftStartTime: '08:15',
    shiftEndTime: '16:15',
    gracePeriodMinutes: 20,
    lateThresholdMinutes: 35,
    halfDayMinWorkingHours: 4.0,
    fullDayMinWorkingHours: 7.0,
    lateDeductionThreshold: 3,
    isSandwichRuleEnabled: true,
    sandwichLeaveTypes: 'CASUAL_LEAVE,SICK_LEAVE',
    minStudentAttendancePct: 75.0,
    warningStudentAttendancePct: 80.0,
    createdAt: new Date('2026-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-01T00:00:00Z').toISOString()
  }
];

export const SEED_HOLIDAYS = [
  {
    id: 'hol-1',
    campusId: 'cmp-pune-baner',
    name: 'Maharashtra Day',
    date: '2026-05-01',
    isGazetted: true,
    academicYearId: 'ay-2026-2027'
  },
  {
    id: 'hol-2',
    campusId: 'cmp-pune-baner',
    name: 'Independence Day',
    date: '2026-08-15',
    isGazetted: true,
    academicYearId: 'ay-2026-2027'
  },
  {
    id: 'hol-3',
    campusId: 'cmp-pune-baner',
    name: 'Gandhi Jayanti',
    date: '2026-10-02',
    isGazetted: true,
    academicYearId: 'ay-2026-2027'
  },
  {
    id: 'hol-4',
    campusId: 'cmp-pune-baner',
    name: 'Diwali Break',
    date: '2026-11-09',
    isGazetted: false,
    academicYearId: 'ay-2026-2027'
  }
];

export const SEED_LEAVE_BALANCES = [
  {
    id: 'lb-sunita-cl',
    campusId: 'cmp-pune-baner',
    employeeId: 'emp-sunita',
    academicYearId: 'ay-2026-2027',
    leaveType: 'CASUAL_LEAVE',
    allocatedDays: 12.0,
    usedDays: 2.0,
    pendingDays: 1.0,
    remainingDays: 9.0
  },
  {
    id: 'lb-sunita-sl',
    campusId: 'cmp-pune-baner',
    employeeId: 'emp-sunita',
    academicYearId: 'ay-2026-2027',
    leaveType: 'SICK_LEAVE',
    allocatedDays: 10.0,
    usedDays: 1.0,
    pendingDays: 0.0,
    remainingDays: 9.0
  },
  {
    id: 'lb-sunita-el',
    campusId: 'cmp-pune-baner',
    employeeId: 'emp-sunita',
    academicYearId: 'ay-2026-2027',
    leaveType: 'EARNED_LEAVE',
    allocatedDays: 15.0,
    usedDays: 0.0,
    pendingDays: 0.0,
    remainingDays: 15.0
  },
  {
    id: 'lb-meenakshi-cl',
    campusId: 'cmp-pune-baner',
    employeeId: 'emp-principal-meenakshi',
    academicYearId: 'ay-2026-2027',
    leaveType: 'CASUAL_LEAVE',
    allocatedDays: 15.0,
    usedDays: 1.0,
    pendingDays: 0.0,
    remainingDays: 14.0
  },
  {
    id: 'lb-anand-cl',
    campusId: 'cmp-pune-baner',
    employeeId: 'emp-anand-hod',
    academicYearId: 'ay-2026-2027',
    leaveType: 'CASUAL_LEAVE',
    allocatedDays: 12.0,
    usedDays: 0.0,
    pendingDays: 0.0,
    remainingDays: 12.0
  }
];

export const SEED_LEAVE_REQUESTS = [
  {
    id: 'lr-101',
    campusId: 'cmp-pune-baner',
    applicantId: 'emp-sunita',
    applicantType: 'EMPLOYEE',
    leaveType: 'CASUAL_LEAVE',
    startDate: '2026-10-08',
    endDate: '2026-10-08',
    totalDays: 1.0,
    isHalfDay: false,
    isSandwichPenaltyApplied: false,
    sandwichDaysCount: 0.0,
    reason: 'Family ceremonial commitment in Kolhapur',
    status: 'PENDING',
    approverId: 'usr-principal-baner',
    approverRole: 'PRINCIPAL',
    approverRemarks: null,
    approvedAt: null,
    createdAt: new Date('2026-10-01T09:00:00Z').toISOString(),
    updatedAt: new Date('2026-10-01T09:00:00Z').toISOString()
  },
  {
    id: 'lr-102',
    campusId: 'cmp-pune-baner',
    applicantId: 'emp-sunita',
    applicantType: 'EMPLOYEE',
    leaveType: 'SICK_LEAVE',
    startDate: '2026-09-15',
    endDate: '2026-09-15',
    totalDays: 1.0,
    isHalfDay: false,
    isSandwichPenaltyApplied: false,
    sandwichDaysCount: 0.0,
    reason: 'Seasonal viral fever',
    status: 'APPROVED',
    approverId: 'usr-principal-baner',
    approverRole: 'PRINCIPAL',
    approverRemarks: 'Approved with medical certificate verified.',
    approvedAt: new Date('2026-09-15T10:00:00Z').toISOString(),
    createdAt: new Date('2026-09-14T18:00:00Z').toISOString(),
    updatedAt: new Date('2026-09-15T10:00:00Z').toISOString()
  }
];

export const SEED_STAFF_ATTENDANCE = [
  {
    id: 'sa-1',
    campusId: 'cmp-pune-baner',
    employeeId: 'emp-principal-meenakshi',
    date: '2026-10-02',
    checkInTime: '2026-10-02T07:48:00Z',
    checkOutTime: '2026-10-02T16:10:00Z',
    durationMinutes: 502,
    lateMinutes: 0,
    status: 'PRESENT',
    source: 'BIOMETRIC',
    remarks: 'Early arrival, campus morning inspection'
  },
  {
    id: 'sa-2',
    campusId: 'cmp-pune-baner',
    employeeId: 'emp-sunita',
    date: '2026-10-02',
    checkInTime: '2026-10-02T08:22:00Z',
    checkOutTime: '2026-10-02T16:05:00Z',
    durationMinutes: 463,
    lateMinutes: 7, // 8:22 AM vs 8:15 AM grace cutoff
    status: 'LATE',
    source: 'BIOMETRIC',
    remarks: 'Pashan traffic congestion'
  },
  {
    id: 'sa-3',
    campusId: 'cmp-pune-baner',
    employeeId: 'emp-anand-hod',
    date: '2026-10-02',
    checkInTime: '2026-10-02T07:55:00Z',
    checkOutTime: '2026-10-02T12:05:00Z',
    durationMinutes: 250, // 4 hours 10 mins -> Half Day
    lateMinutes: 0,
    status: 'HALF_DAY',
    source: 'BIOMETRIC',
    remarks: 'Approved afternoon university symposium'
  }
];

export const SEED_STUDENT_ATTENDANCE = [
  {
    id: 'sta-1',
    campusId: 'cmp-pune-baner',
    divisionId: 'div-pune-5a',
    studentId: 'stu-kabir-deshmukh',
    academicYearId: 'ay-2026-2027',
    date: '2026-10-02',
    periodIndex: 0,
    status: 'PRESENT',
    remarks: null,
    markedBy: 'usr-teacher-patil'
  },
  {
    id: 'sta-2',
    campusId: 'cmp-pune-baner',
    divisionId: 'div-pune-5a',
    studentId: 'stu-aarav-sharma',
    academicYearId: 'ay-2026-2027',
    date: '2026-10-02',
    periodIndex: 0,
    status: 'ABSENT',
    remarks: 'Medical leave requested by parent',
    markedBy: 'usr-teacher-patil'
  },
  {
    id: 'sta-3',
    campusId: 'cmp-pune-baner',
    divisionId: 'div-pune-5a',
    studentId: 'stu-kabir-deshmukh',
    academicYearId: 'ay-2026-2027',
    date: '2026-10-01',
    periodIndex: 0,
    status: 'PRESENT',
    remarks: null,
    markedBy: 'usr-teacher-patil'
  },
  {
    id: 'sta-4',
    campusId: 'cmp-pune-baner',
    divisionId: 'div-pune-5a',
    studentId: 'stu-aarav-sharma',
    academicYearId: 'ay-2026-2027',
    date: '2026-10-01',
    periodIndex: 0,
    status: 'PRESENT',
    remarks: null,
    markedBy: 'usr-teacher-patil'
  }
];

// ==========================================
// MODULE 03: ADMISSIONS CRM SEED DATA
// ==========================================

export const WHATSAPP_TEMPLATES = [
  {
    id: 'tpl_welcome_enquiry',
    name: 'Welcome & Institutional Brochure',
    category: 'MARKETING',
    language: 'en_IN',
    body: 'Namaste {{guardianName}}, thank you for considering Vedic Tree International School for {{studentName}}. We have received your inquiry for Grade {{targetGrade}}. View our curriculum prospectus here: {{link}}'
  },
  {
    id: 'tpl_visit_confirmation',
    name: 'Campus Tour & Visit Scheduled',
    category: 'TRANSACTIONAL',
    language: 'en_IN',
    body: 'Dear {{guardianName}}, your campus discovery visit for {{studentName}} is confirmed on {{dateTime}} at {{campusName}}. Our admissions counselor will welcome you at reception.'
  },
  {
    id: 'tpl_assessment_invite',
    name: 'Entrance Assessment Scheduled',
    category: 'TRANSACTIONAL',
    language: 'en_IN',
    body: 'Dear {{guardianName}}, entrance readiness assessment for {{studentName}} (App: {{appNo}}) is scheduled for {{dateTime}}. Please bring writing instruments and previous report card.'
  },
  {
    id: 'tpl_admission_offer',
    name: 'Admission Offer Letter Issued',
    category: 'TRANSACTIONAL',
    language: 'en_IN',
    body: 'Congratulations {{guardianName}}! An admission offer (No: {{offerNo}}) has been granted to {{studentName}} for Grade {{grade}}. Please confirm enrollment before {{validUntil}}.'
  },
  {
    id: 'tpl_fee_confirmation',
    name: 'Admission Fee Payment Receipt',
    category: 'TRANSACTIONAL',
    language: 'en_IN',
    body: 'Receipt {{receiptNo}}: We acknowledge receipt of INR {{amount}} towards admission confirmation for {{studentName}}. Welcome to the Vedic Tree family!'
  }
];

export const SEED_LEADS = [
  {
    id: 'lead-1',
    campusId: 'cmp-pune-baner',
    studentName: 'Aarohi Joshi',
    guardianName: 'Vikram Joshi',
    phone: '+91 98220 12345',
    email: 'vikram.joshi@example.com',
    targetGrade: 'Grade 1',
    leadSource: 'WEBSITE',
    stage: 'LEAD',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'HIGH',
    notes: 'Inquired online via CBSE primary admissions portal.',
    tags: 'Prospect, Primary, 2026-Intake',
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-15T10:00:00Z'
  },
  {
    id: 'lead-2',
    campusId: 'cmp-pune-baner',
    studentName: 'Reyansh Patel',
    guardianName: 'Sneha Patel',
    phone: '+91 98221 23456',
    email: 'sneha.patel@example.com',
    targetGrade: 'Grade 6',
    leadSource: 'WHATSAPP',
    stage: 'ENQUIRY',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'MEDIUM',
    notes: 'Father works at Hinjewadi IT park; inquired about bus transport.',
    tags: 'Middle-School, Transport-Inquiry',
    createdAt: '2026-09-16T11:30:00Z',
    updatedAt: '2026-09-17T09:15:00Z'
  },
  {
    id: 'lead-3',
    campusId: 'cmp-pune-baner',
    studentName: 'Ananya Kulkarni',
    guardianName: 'Sachin Kulkarni',
    phone: '+91 98222 34567',
    email: 'sachin.kulkarni@example.com',
    targetGrade: 'Grade 5',
    leadSource: 'WALK_IN',
    stage: 'COUNSELLING',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'HIGH',
    notes: 'Completed in-person counseling session. Looking for holistic arts & coding programs.',
    tags: 'Counselled, High-Intent',
    createdAt: '2026-09-18T14:00:00Z',
    updatedAt: '2026-09-20T16:45:00Z'
  },
  {
    id: 'lead-4',
    campusId: 'cmp-pune-baner',
    studentName: 'Ishaan Deshmukh',
    guardianName: 'Amit Deshmukh',
    phone: '+91 98223 45678',
    email: 'amit.d@example.com',
    targetGrade: 'Grade 3',
    leadSource: 'REFERRAL',
    stage: 'VISIT',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'HIGH',
    notes: 'Campus visit completed on Saturday. Parents impressed with robotics lab.',
    tags: 'Visit-Completed, Referral',
    createdAt: '2026-09-21T09:30:00Z',
    updatedAt: '2026-09-22T13:00:00Z'
  },
  {
    id: 'lead-5',
    campusId: 'cmp-pune-baner',
    studentName: 'Diya Agarwal',
    guardianName: 'Manish Agarwal',
    phone: '+91 98224 56789',
    email: 'm.agarwal@example.com',
    targetGrade: 'Grade 9',
    leadSource: 'WEBSITE',
    stage: 'APPLICATION',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'HIGH',
    notes: 'Submitted online application form with past 3 years report cards.',
    tags: 'Secondary, App-Submitted',
    createdAt: '2026-09-22T15:20:00Z',
    updatedAt: '2026-09-24T10:10:00Z'
  },
  {
    id: 'lead-6',
    campusId: 'cmp-pune-baner',
    studentName: 'Vivaan Mehta',
    guardianName: 'Pooja Mehta',
    phone: '+91 98225 67890',
    email: 'pooja.mehta@example.com',
    targetGrade: 'Grade 7',
    leadSource: 'EVENT',
    stage: 'ASSESSMENT',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'MEDIUM',
    notes: 'Entrance readiness assessment completed. Evaluated by Math HOD.',
    tags: 'Assessment-Done, Shortlisted',
    createdAt: '2026-09-25T11:00:00Z',
    updatedAt: '2026-09-27T16:00:00Z'
  },
  {
    id: 'lead-7',
    campusId: 'cmp-pune-baner',
    studentName: 'Saanvi Sen',
    guardianName: 'Debashis Sen',
    phone: '+91 98226 78901',
    email: 'debashis.sen@example.com',
    targetGrade: 'Grade 2',
    leadSource: 'WALK_IN',
    stage: 'OFFER',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'HIGH',
    notes: 'Admission offer letter issued. Parents reviewing fee schedule.',
    tags: 'Offer-Issued',
    createdAt: '2026-09-26T10:00:00Z',
    updatedAt: '2026-09-28T12:00:00Z'
  },
  {
    id: 'lead-8',
    campusId: 'cmp-pune-baner',
    studentName: 'Advait Nair',
    guardianName: 'Radhika Nair',
    phone: '+91 98227 89012',
    email: 'radhika.nair@example.com',
    targetGrade: 'Grade 4',
    leadSource: 'REFERRAL',
    stage: 'ADMISSION',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'HIGH',
    notes: 'Offer accepted. Parent arriving for final document verification & desk fee clearance.',
    tags: 'Ready-To-Admit',
    createdAt: '2026-09-27T14:30:00Z',
    updatedAt: '2026-09-29T11:00:00Z'
  },
  {
    id: 'lead-9',
    campusId: 'cmp-pune-baner',
    studentName: 'Tanvi Rao',
    guardianName: 'Suresh Rao',
    phone: '+91 98228 90123',
    email: 'suresh.rao@example.com',
    targetGrade: 'Grade 5',
    leadSource: 'WEBSITE',
    stage: 'FEE',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'HIGH',
    notes: 'Admission fee payment processing via UPI payment gateway.',
    tags: 'Fee-Pending',
    createdAt: '2026-09-28T09:00:00Z',
    updatedAt: '2026-09-30T15:00:00Z'
  },
  {
    id: 'lead-10',
    campusId: 'cmp-pune-baner',
    studentName: 'Siddharth Roy',
    guardianName: 'Indranil Roy',
    phone: '+91 98229 01234',
    email: 'indranil.roy@example.com',
    targetGrade: 'Grade 8',
    leadSource: 'WALK_IN',
    stage: 'STUDENT',
    assignedCounselorId: 'emp-counselor-anjali',
    priority: 'HIGH',
    notes: 'Complete admission confirmed. Converted to enrolled student VT-2026-003.',
    tags: 'Enrolled, Completed',
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-10-01T14:00:00Z'
  }
];

export const SEED_LEAD_TIMELINES = [
  {
    id: 'tl-1',
    leadId: 'lead-1',
    campusId: 'cmp-pune-baner',
    eventType: 'STATUS_CHANGE',
    title: 'Lead Created',
    description: 'Lead entered system via online website inquiry form.',
    metadata: JSON.stringify({ source: 'WEBSITE', targetGrade: 'Grade 1' }),
    authorId: 'usr-principal-baner',
    authorName: 'System Gateway',
    createdAt: '2026-09-15T10:00:00Z'
  },
  {
    id: 'tl-2',
    leadId: 'lead-1',
    campusId: 'cmp-pune-baner',
    eventType: 'WHATSAPP_SENT',
    title: 'Welcome WhatsApp Dispatched',
    description: 'Sent welcome brochure template to Vikram Joshi (+91 98220 12345)',
    metadata: JSON.stringify({ templateId: 'tpl_welcome_enquiry', provider: 'MOCK' }),
    authorId: 'emp-counselor-anjali',
    authorName: 'Anjali Deshmukh (Counselor)',
    createdAt: '2026-09-15T10:05:00Z'
  },
  {
    id: 'tl-3',
    leadId: 'lead-4',
    campusId: 'cmp-pune-baner',
    eventType: 'VISIT_COMPLETED',
    title: 'Campus Tour Completed',
    description: 'Family visited campus, toured primary science labs, sports court, and dining.',
    metadata: JSON.stringify({ visitorCount: 3, rating: 5 }),
    authorId: 'emp-counselor-anjali',
    authorName: 'Anjali Deshmukh (Counselor)',
    createdAt: '2026-09-22T12:30:00Z'
  },
  {
    id: 'tl-4',
    leadId: 'lead-6',
    campusId: 'cmp-pune-baner',
    eventType: 'ASSESSMENT_EVALUATED',
    title: 'Entrance Assessment Evaluated',
    description: 'Score 87/100 (87.0%). Strong aptitude in Math and Logical Reasoning.',
    metadata: JSON.stringify({ totalMarks: 87, maxMarks: 100, result: 'RECOMMENDED' }),
    authorId: 'usr-teacher-patil',
    authorName: 'Sunita Patil (Senior Teacher)',
    createdAt: '2026-09-27T15:45:00Z'
  }
];

export const SEED_LEAD_FOLLOW_UPS = [
  {
    id: 'fu-1',
    leadId: 'lead-1',
    campusId: 'cmp-pune-baner',
    counselorId: 'emp-counselor-anjali',
    title: 'Initial Discovery Call',
    dueDate: '2026-10-03T10:00:00Z',
    type: 'CALL',
    status: 'PENDING',
    remarks: 'Introduce curriculum highlights and invite for weekend open house.',
    completedAt: null,
    createdAt: '2026-09-15T10:10:00Z',
    updatedAt: '2026-09-15T10:10:00Z'
  },
  {
    id: 'fu-2',
    leadId: 'lead-2',
    campusId: 'cmp-pune-baner',
    counselorId: 'emp-counselor-anjali',
    title: 'Transport Route Confirmation Call',
    dueDate: '2026-10-03T11:30:00Z',
    type: 'CALL',
    status: 'PENDING',
    remarks: 'Share Hinjewadi Phase 1 bus schedule and seat availability.',
    completedAt: null,
    createdAt: '2026-09-17T09:20:00Z',
    updatedAt: '2026-09-17T09:20:00Z'
  },
  {
    id: 'fu-3',
    leadId: 'lead-7',
    campusId: 'cmp-pune-baner',
    counselorId: 'emp-counselor-anjali',
    title: 'Offer Follow-Up & Fee Discussion',
    dueDate: '2026-10-03T14:00:00Z',
    type: 'MEETING',
    status: 'PENDING',
    remarks: 'Discuss sibling discount and payment plan options with father.',
    completedAt: null,
    createdAt: '2026-09-28T12:15:00Z',
    updatedAt: '2026-09-28T12:15:00Z'
  }
];

export const SEED_CAMPUS_VISITS = [
  {
    id: 'vis-1',
    leadId: 'lead-4',
    campusId: 'cmp-pune-baner',
    visitorName: 'Amit Deshmukh',
    phone: '+91 98223 45678',
    scheduledAt: '2026-09-22T10:30:00Z',
    visitorCount: 3,
    assignedStaffId: 'emp-counselor-anjali',
    guideName: 'Anjali Deshmukh',
    status: 'COMPLETED',
    feedback: 'Loved the green campus architecture and experiential math lab.',
    rating: 5,
    completedAt: '2026-09-22T12:30:00Z',
    createdAt: '2026-09-21T09:40:00Z',
    updatedAt: '2026-09-22T12:30:00Z'
  },
  {
    id: 'vis-2',
    leadId: 'lead-3',
    campusId: 'cmp-pune-baner',
    visitorName: 'Sachin Kulkarni',
    phone: '+91 98222 34567',
    scheduledAt: '2026-10-04T11:00:00Z',
    visitorCount: 2,
    assignedStaffId: 'emp-counselor-anjali',
    guideName: 'Anjali Deshmukh',
    status: 'SCHEDULED',
    feedback: null,
    rating: null,
    completedAt: null,
    createdAt: '2026-09-20T17:00:00Z',
    updatedAt: '2026-09-20T17:00:00Z'
  }
];

export const SEED_APPLICATIONS = [
  {
    id: 'app-1',
    campusId: 'cmp-pune-baner',
    leadId: 'lead-5',
    applicationNumber: 'APP-2026-0101',
    academicYearId: 'ay-2026-2027',
    gradeId: 'grd-9',
    submissionDate: '2026-09-24T10:00:00Z',
    status: 'SUBMITTED',
    candidateDob: '2012-05-14T00:00:00Z',
    candidateGender: 'FEMALE',
    previousSchool: 'Delhi Public School Pune',
    siblingInfo: 'None',
    emergencyPhone: '+91 98224 56789',
    address: 'Flat 402, Rohan Viti, Baner, Pune 411045',
    createdAt: '2026-09-24T10:00:00Z',
    updatedAt: '2026-09-24T10:00:00Z'
  },
  {
    id: 'app-2',
    campusId: 'cmp-pune-baner',
    leadId: 'lead-6',
    applicationNumber: 'APP-2026-0102',
    academicYearId: 'ay-2026-2027',
    gradeId: 'grd-7',
    submissionDate: '2026-09-25T14:00:00Z',
    status: 'ACCEPTED',
    candidateDob: '2014-08-20T00:00:00Z',
    candidateGender: 'MALE',
    previousSchool: 'St. Vincent High School',
    siblingInfo: 'Elder sister in Class 10',
    emergencyPhone: '+91 98225 67890',
    address: 'B-12, Kumar Park, Aundh, Pune 411007',
    createdAt: '2026-09-25T14:00:00Z',
    updatedAt: '2026-09-27T16:00:00Z'
  }
];

export const SEED_APPLICATION_DOCUMENTS = [
  {
    id: 'app-doc-1',
    applicationId: 'app-1',
    campusId: 'cmp-pune-baner',
    documentType: 'BIRTH_CERTIFICATE',
    fileName: 'diya_agarwal_birth_cert.pdf',
    fileUrl: 'https://vault.vedictree.edu.in/docs/app1_birth.pdf',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'usr-principal-baner',
    verifiedAt: '2026-09-24T11:00:00Z',
    remarks: 'Verified against Municipal Corporation original document.',
    createdAt: '2026-09-24T10:05:00Z'
  },
  {
    id: 'app-doc-2',
    applicationId: 'app-1',
    campusId: 'cmp-pune-baner',
    documentType: 'PREVIOUS_REPORT_CARD',
    fileName: 'grade_8_final_marksheet.pdf',
    fileUrl: 'https://vault.vedictree.edu.in/docs/app1_report.pdf',
    verificationStatus: 'PENDING',
    verifiedBy: null,
    verifiedAt: null,
    remarks: null,
    createdAt: '2026-09-24T10:08:00Z'
  }
];

export const SEED_ENTRANCE_ASSESSMENTS = [
  {
    id: 'asmt-1',
    applicationId: 'app-2',
    leadId: 'lead-6',
    campusId: 'cmp-pune-baner',
    assessmentDate: '2026-09-27T10:00:00Z',
    evaluatorId: 'emp-sunita',
    evaluatorName: 'Sunita Patil',
    subjectsJson: JSON.stringify([
      { subject: 'Mathematics', maxMarks: 40, marks: 36 },
      { subject: 'English & Comprehension', maxMarks: 40, marks: 35 },
      { subject: 'Logical Reasoning', maxMarks: 20, marks: 16 }
    ]),
    totalMarks: 87.0,
    maxMarks: 100.0,
    percentage: 87.0,
    remarks: 'Exceptional problem-solving abilities and clear communicative English.',
    result: 'RECOMMENDED',
    createdAt: '2026-09-27T15:30:00Z',
    updatedAt: '2026-09-27T15:30:00Z'
  }
];

export const SEED_ADMISSION_OFFERS = [
  {
    id: 'ofr-1',
    applicationId: 'app-2',
    leadId: 'lead-7',
    campusId: 'cmp-pune-baner',
    offerNumber: 'OFR-2026-0042',
    validUntil: '2026-10-15T23:59:59Z',
    offeredGradeId: 'grd-2',
    feeStructureId: 'fs-primary-2026',
    terms: 'Offer valid subject to document verification and seat confirmation fee payment.',
    status: 'ISSUED',
    issuedBy: 'usr-principal-baner',
    issuedAt: '2026-09-28T11:00:00Z',
    acceptedAt: null,
    createdAt: '2026-09-28T11:00:00Z'
  }
];

export const SEED_ADMISSION_RECORDS = [
  {
    id: 'adm-1',
    applicationId: 'app-2',
    leadId: 'lead-10',
    campusId: 'cmp-pune-baner',
    admissionNumber: 'VT-2026-003',
    admissionDate: '2026-10-01T10:00:00Z',
    admissionFeePaid: 35000.0,
    feeReceiptNumber: 'RCP-2026-8801',
    paymentMethod: 'UPI',
    status: 'CONFIRMED',
    studentId: 'stu-siddharth-roy',
    admittedBy: 'usr-principal-baner',
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-01T10:00:00Z'
  }
];

export const SEED_COMMUNICATION_LOGS = [
  {
    id: 'comm-1',
    campusId: 'cmp-pune-baner',
    leadId: 'lead-1',
    recipientPhone: '+91 98220 12345',
    recipientName: 'Vikram Joshi',
    channel: 'WHATSAPP',
    provider: 'MOCK',
    templateId: 'tpl_welcome_enquiry',
    messageContent: 'Namaste Vikram Joshi, thank you for considering Vedic Tree International School for Aarohi Joshi. We have received your inquiry for Grade 1.',
    status: 'DELIVERED',
    providerMessageId: 'mock-wa-msg-101',
    errorMessage: null,
    sentAt: '2026-09-15T10:05:00Z',
    createdAt: '2026-09-15T10:05:00Z'
  },
  {
    id: 'comm-2',
    campusId: 'cmp-pune-baner',
    leadId: 'lead-4',
    recipientPhone: '+91 98223 45678',
    recipientName: 'Amit Deshmukh',
    channel: 'WHATSAPP',
    provider: 'MOCK',
    templateId: 'tpl_visit_confirmation',
    messageContent: 'Dear Amit Deshmukh, your campus discovery visit for Ishaan Deshmukh is confirmed on 2026-09-22 at Pune Baner Campus.',
    status: 'READ',
    providerMessageId: 'mock-wa-msg-102',
    errorMessage: null,
    sentAt: '2026-09-21T09:45:00Z',
    createdAt: '2026-09-21T09:45:00Z'
  }
];

// ==========================================
// MODULE 04: FINANCE + FEES SEED DATA
// ==========================================

export const SEED_FEE_STRUCTURES = [
  {
    id: 'fs-baner-g1',
    campusId: 'cmp-pune-baner',
    academicYearId: 'ay-2026-2027',
    gradeId: 'grd-1',
    name: 'Grade 1 Comprehensive Annual Fee (AY 2026-27)',
    code: 'FS-BNR-G1-2026',
    frequency: 'ANNUAL',
    currency: 'INR',
    totalAmount: 120000.0,
    isActive: true,
    items: [
      { id: 'fsi-g1-tui', component: 'TUITION', title: 'Tuition Fee (Annual)', amount: 85000.0, isOptional: false, orderIndex: 1 },
      { id: 'fsi-g1-trn', component: 'TRANSPORT', title: 'Transport / Bus Route Fee', amount: 20000.0, isOptional: true, orderIndex: 2 },
      { id: 'fsi-g1-lib', component: 'LIBRARY', title: 'Library & Learning Kits', amount: 10000.0, isOptional: false, orderIndex: 3 },
      { id: 'fsi-g1-spr', component: 'SPORTS', title: 'Sports & Wellness Activities', amount: 5000.0, isOptional: false, orderIndex: 4 }
    ]
  },
  {
    id: 'fs-baner-g6',
    campusId: 'cmp-pune-baner',
    academicYearId: 'ay-2026-2027',
    gradeId: 'grd-6',
    name: 'Grade 6 Secondary Fee Structure (AY 2026-27)',
    code: 'FS-BNR-G6-2026',
    frequency: 'ANNUAL',
    currency: 'INR',
    totalAmount: 150000.0,
    isActive: true,
    items: [
      { id: 'fsi-g6-tui', component: 'TUITION', title: 'Tuition & Academic Mentoring', amount: 100000.0, isOptional: false, orderIndex: 1 },
      { id: 'fsi-g6-lab', component: 'LAB', title: 'STEM & Robotics Lab Consumables', amount: 20000.0, isOptional: false, orderIndex: 2 },
      { id: 'fsi-g6-trn', component: 'TRANSPORT', title: 'AC Fleet Transport Service', amount: 15000.0, isOptional: true, orderIndex: 3 },
      { id: 'fsi-g6-lib', component: 'LIBRARY', title: 'Library & Digital Subscriptions', amount: 10000.0, isOptional: false, orderIndex: 4 },
      { id: 'fsi-g6-exm', component: 'EXAMINATION', title: 'Term & Board Assessment Fee', amount: 5000.0, isOptional: false, orderIndex: 5 }
    ]
  }
];

export const SEED_DISCOUNT_RULES = [
  {
    id: 'disc-sib-2',
    campusId: 'cmp-pune-baner',
    name: 'Sibling Concession (2nd Child)',
    code: 'DISC-SIB-15',
    type: 'PERCENTAGE',
    criteria: 'SIBLING',
    value: 15.0, // 15% discount on tuition
    isActive: true
  },
  {
    id: 'disc-merit-90',
    campusId: 'cmp-pune-baner',
    name: 'Academic Excellence Concession',
    code: 'DISC-MERIT-20',
    type: 'PERCENTAGE',
    criteria: 'MERIT',
    value: 20.0,
    isActive: true
  },
  {
    id: 'disc-staff-ward',
    campusId: 'cmp-pune-baner',
    name: 'Staff Ward Scholarship',
    code: 'DISC-STAFF-50',
    type: 'PERCENTAGE',
    criteria: 'STAFF_WARD',
    value: 50.0,
    isActive: true
  },
  {
    id: 'disc-rte-waiver',
    campusId: 'cmp-pune-baner',
    name: 'RTE 25% State Statutory Waiver',
    code: 'DISC-RTE-100',
    type: 'PERCENTAGE',
    criteria: 'RTE',
    value: 100.0,
    isActive: true
  }
];

export const SEED_SCHOLARSHIPS = [
  {
    id: 'sch-kabir-merit',
    campusId: 'cmp-pune-baner',
    studentId: 'stu-kabir-deshmukh',
    academicYearId: 'ay-2026-2027',
    name: "Founder's Vedic STEM Scholarship",
    sponsor: 'Vedic Tree Educational Trust',
    amount: 25000.0,
    currency: 'INR',
    status: 'ACTIVE',
    grantedDate: '2026-03-15T00:00:00Z',
    expiryDate: '2027-03-31T23:59:59Z'
  }
];

export const SEED_INVOICES = [
  {
    id: 'inv-2026-001',
    campusId: 'cmp-pune-baner',
    invoiceNumber: 'INV-2026-0001',
    studentId: 'stu-kabir-deshmukh',
    studentName: 'Kabir Deshmukh',
    admissionNumber: 'VT-2026-001',
    gradeName: 'Grade 6',
    academicYearId: 'ay-2026-2027',
    issueDate: '2026-09-01T00:00:00Z',
    dueDate: '2026-09-20T00:00:00Z',
    subtotal: 75000.0,
    discountTotal: 15000.0,
    lateFeeTotal: 0.0,
    totalAmount: 60000.0,
    paidAmount: 60000.0,
    balanceAmount: 0.0,
    currency: 'INR',
    status: 'PAID',
    notes: 'Term 1 Standard Fee with Sibling Discount',
    createdAt: '2026-09-01T08:30:00Z',
    lineItems: [
      { id: 'ili-1-tui', component: 'TUITION', title: 'Term 1 Tuition Fee', amount: 50000.0, discountAmount: 15000.0, payableAmount: 35000.0 },
      { id: 'ili-1-lab', component: 'LAB', title: 'STEM & Robotics Lab', amount: 15000.0, discountAmount: 0.0, payableAmount: 15000.0 },
      { id: 'ili-1-lib', component: 'LIBRARY', title: 'Library & Digital Media', amount: 10000.0, discountAmount: 0.0, payableAmount: 10000.0 }
    ]
  },
  {
    id: 'inv-2026-002',
    campusId: 'cmp-pune-baner',
    invoiceNumber: 'INV-2026-0002',
    studentId: 'stu-aarav-sharma',
    studentName: 'Aarav Sharma',
    admissionNumber: 'VT-2026-042',
    gradeName: 'Grade 6',
    academicYearId: 'ay-2026-2027',
    issueDate: '2026-09-01T00:00:00Z',
    dueDate: '2026-09-20T00:00:00Z',
    subtotal: 75000.0,
    discountTotal: 0.0,
    lateFeeTotal: 500.0,
    totalAmount: 75500.0,
    paidAmount: 35000.0,
    balanceAmount: 40500.0,
    currency: 'INR',
    status: 'PARTIALLY_PAID',
    notes: 'Term 1 Fee — Second installment outstanding with late fee',
    createdAt: '2026-09-01T08:35:00Z',
    lineItems: [
      { id: 'ili-2-tui', component: 'TUITION', title: 'Term 1 Tuition Fee', amount: 50000.0, discountAmount: 0.0, payableAmount: 50000.0 },
      { id: 'ili-2-lab', component: 'LAB', title: 'STEM & Robotics Lab', amount: 15000.0, discountAmount: 0.0, payableAmount: 15000.0 },
      { id: 'ili-2-trn', component: 'TRANSPORT', title: 'Transport Fee (Zone 2)', amount: 10000.0, discountAmount: 0.0, payableAmount: 10000.0 }
    ]
  },
  {
    id: 'inv-2026-003',
    campusId: 'cmp-pune-baner',
    invoiceNumber: 'INV-2026-0003',
    studentId: 'stu-siddharth-roy',
    studentName: 'Siddharth Roy',
    admissionNumber: 'VT-2026-003',
    gradeName: 'Grade 2',
    academicYearId: 'ay-2026-2027',
    issueDate: '2026-08-01T00:00:00Z',
    dueDate: '2026-08-20T00:00:00Z',
    subtotal: 60000.0,
    discountTotal: 0.0,
    lateFeeTotal: 1500.0,
    totalAmount: 61500.0,
    paidAmount: 0.0,
    balanceAmount: 61500.0,
    currency: 'INR',
    status: 'OVERDUE',
    notes: 'Admission & Term 1 Fee — Due date exceeded 45 days',
    createdAt: '2026-08-01T09:00:00Z',
    lineItems: [
      { id: 'ili-3-adm', component: 'ADMISSION', title: 'Admission & Registration Kit', amount: 20000.0, discountAmount: 0.0, payableAmount: 20000.0 },
      { id: 'ili-3-tui', component: 'TUITION', title: 'Term 1 Tuition Fee', amount: 40000.0, discountAmount: 0.0, payableAmount: 40000.0 }
    ]
  }
];

export const SEED_PAYMENTS = [
  {
    id: 'pay-2026-001',
    campusId: 'cmp-pune-baner',
    paymentNumber: 'PAY-2026-0001',
    invoiceId: 'inv-2026-001',
    studentId: 'stu-kabir-deshmukh',
    studentName: 'Kabir Deshmukh',
    amount: 60000.0,
    currency: 'INR',
    method: 'UPI',
    status: 'SUCCESS',
    transactionRef: 'UPI/2609/9948210341',
    gatewayProvider: 'RAZORPAY',
    gatewayOrderId: 'order_Nx88912Kj',
    gatewayPaymentId: 'pay_Nx88912Zk',
    payerName: 'Suresh Deshmukh',
    payerPhone: '+91 98220 54321',
    paidAt: '2026-09-05T14:22:10Z',
    remarks: 'Settled full Term 1 via Google Pay UPI'
  },
  {
    id: 'pay-2026-002',
    campusId: 'cmp-pune-baner',
    paymentNumber: 'PAY-2026-0002',
    invoiceId: 'inv-2026-002',
    studentId: 'stu-aarav-sharma',
    studentName: 'Aarav Sharma',
    amount: 35000.0,
    currency: 'INR',
    method: 'NETBANKING',
    status: 'SUCCESS',
    transactionRef: 'HDFC/NETB/44019281',
    gatewayProvider: 'RAZORPAY',
    gatewayOrderId: 'order_Nx99014Lk',
    gatewayPaymentId: 'pay_Nx99014Pq',
    payerName: 'Raghav Sharma',
    payerPhone: '+91 98230 12345',
    paidAt: '2026-09-10T11:05:40Z',
    remarks: 'Installment 1 paid via HDFC Net Banking'
  }
];

export const SEED_RECEIPTS = [
  {
    id: 'rcp-2026-001',
    campusId: 'cmp-pune-baner',
    receiptNumber: 'RCP-2026-0001',
    paymentId: 'pay-2026-001',
    invoiceId: 'inv-2026-001',
    studentId: 'stu-kabir-deshmukh',
    studentName: 'Kabir Deshmukh',
    admissionNumber: 'VT-2026-001',
    gradeName: 'Grade 6',
    amount: 60000.0,
    currency: 'INR',
    cashierId: 'usr-principal-baner',
    cashierName: 'Dr. Meenakshi Sundaram',
    paymentMethod: 'UPI',
    breakdownJson: JSON.stringify([
      { component: 'TUITION', settled: 35000.0 },
      { component: 'LAB', settled: 15000.0 },
      { component: 'LIBRARY', settled: 10000.0 }
    ]),
    issuedAt: '2026-09-05T14:23:00Z'
  },
  {
    id: 'rcp-2026-002',
    campusId: 'cmp-pune-baner',
    receiptNumber: 'RCP-2026-0002',
    paymentId: 'pay-2026-002',
    invoiceId: 'inv-2026-002',
    studentId: 'stu-aarav-sharma',
    studentName: 'Aarav Sharma',
    admissionNumber: 'VT-2026-042',
    gradeName: 'Grade 6',
    amount: 35000.0,
    currency: 'INR',
    cashierId: 'usr-principal-baner',
    cashierName: 'Dr. Meenakshi Sundaram',
    paymentMethod: 'NETBANKING',
    breakdownJson: JSON.stringify([
      { component: 'TUITION', settled: 35000.0 }
    ]),
    issuedAt: '2026-09-10T11:06:00Z'
  }
];

export const SEED_REFUNDS = [
  {
    id: 'ref-2026-001',
    campusId: 'cmp-pune-baner',
    refundNumber: 'REF-2026-0001',
    paymentId: 'pay-2026-002',
    invoiceId: 'inv-2026-002',
    studentId: 'stu-aarav-sharma',
    amount: 5000.0,
    currency: 'INR',
    reason: 'Transport opt-out adjustment approved by Principal',
    status: 'PROCESSED',
    approvedBy: 'usr-principal-baner',
    approverRemarks: 'Student shifted to self-commute; route 4 cancellation verified.',
    gatewayRefundId: 'rfnd_Nx99014Rfd',
    refundedAt: '2026-09-18T16:00:00Z'
  }
];

export const SEED_LEDGER_ACCOUNTS = [
  { id: 'la-1010', campusId: 'cmp-pune-baner', code: '1010', name: 'Cash in Hand (Counter)', type: 'ASSET', balance: 45000.0, currency: 'INR' },
  { id: 'la-1020', campusId: 'cmp-pune-baner', code: '1020', name: 'Bank / Gateway Clearing (Razorpay/HDFC)', type: 'ASSET', balance: 890000.0, currency: 'INR' },
  { id: 'la-1030', campusId: 'cmp-pune-baner', code: '1030', name: 'Student Accounts Receivable (Outstanding)', type: 'ASSET', balance: 102000.0, currency: 'INR' },
  { id: 'la-2010', campusId: 'cmp-pune-baner', code: '2010', name: 'Advance Fee Deposits', type: 'LIABILITY', balance: 50000.0, currency: 'INR' },
  { id: 'la-4010', campusId: 'cmp-pune-baner', code: '4010', name: 'Tuition Fee Revenue', type: 'REVENUE', balance: 820000.0, currency: 'INR' },
  { id: 'la-4020', campusId: 'cmp-pune-baner', code: '4020', name: 'Transport Fee Revenue', type: 'REVENUE', balance: 95000.0, currency: 'INR' },
  { id: 'la-4030', campusId: 'cmp-pune-baner', code: '4030', name: 'Admission & Kit Revenue', type: 'REVENUE', balance: 60000.0, currency: 'INR' },
  { id: 'la-4040', campusId: 'cmp-pune-baner', code: '4040', name: 'Lab & STEM Program Revenue', type: 'REVENUE', balance: 45000.0, currency: 'INR' },
  { id: 'la-4090', campusId: 'cmp-pune-baner', code: '4090', name: 'Concessions & Scholarships (Contra)', type: 'CONTRA_REVENUE', balance: 35000.0, currency: 'INR' }
];

export const SEED_LEDGER_ENTRIES = [
  {
    id: 'jrn-2026-001',
    campusId: 'cmp-pune-baner',
    entryNumber: 'JRN-2026-0001',
    transactionDate: '2026-09-01T08:30:00Z',
    referenceType: 'INVOICE',
    referenceId: 'inv-2026-001',
    debitAccountCode: '1030', // Receivables Dr
    creditAccountCode: '4010', // Tuition Income Cr
    amount: 60000.0,
    currency: 'INR',
    narration: 'Invoice INV-2026-0001 raised for Kabir Deshmukh (Term 1)',
    createdBy: 'usr-principal-baner'
  },
  {
    id: 'jrn-2026-002',
    campusId: 'cmp-pune-baner',
    entryNumber: 'JRN-2026-0002',
    transactionDate: '2026-09-05T14:22:10Z',
    referenceType: 'PAYMENT',
    referenceId: 'pay-2026-001',
    debitAccountCode: '1020', // Bank Clearing Dr
    creditAccountCode: '1030', // Receivables Cr
    amount: 60000.0,
    currency: 'INR',
    narration: 'Receipt RCP-2026-0001 via Razorpay UPI for Kabir Deshmukh',
    createdBy: 'usr-principal-baner'
  }
];

export const SEED_COMMUNICATION_TEMPLATES = [
  // WHATSAPP
  {
    id: 'tpl-wa-fee-overdue',
    tenantId: 'org-vedictree',
    channel: 'WHATSAPP',
    name: 'Fee Overdue Alert',
    category: 'FINANCE',
    subject: null,
    body: 'Dear {{guardianName}}, this is a gentle reminder from {{campusName}}. The fee invoice of {{amount}} for {{studentName}} is overdue as of {{dueDate}}. Please settle via UPI or student portal.',
    variablesJson: '["guardianName", "campusName", "amount", "studentName", "dueDate"]',
    status: 'ACTIVE',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'tpl-wa-visit-confirmed',
    tenantId: 'org-vedictree',
    channel: 'WHATSAPP',
    name: 'Campus Tour Confirmation',
    category: 'TRANSACTIONAL',
    subject: null,
    body: 'Namaste {{guardianName}}! Your campus tour for {{studentName}} is scheduled for {{dateTime}} at {{campusName}}. We look forward to welcoming you.',
    variablesJson: '["guardianName", "studentName", "dateTime", "campusName"]',
    status: 'ACTIVE',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z'
  },
  // SMS
  {
    id: 'tpl-sms-student-absent',
    tenantId: 'org-vedictree',
    channel: 'SMS',
    name: 'Student Unexcused Absence',
    category: 'ALERT',
    subject: null,
    body: 'VT-ALERT: {{studentName}} (Roll {{rollNo}}) was marked absent on {{date}} at {{campusName}}. If unplanned, please contact admin.',
    variablesJson: '["studentName", "rollNo", "date", "campusName"]',
    status: 'ACTIVE',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'tpl-sms-emergency-closure',
    tenantId: 'org-vedictree',
    channel: 'SMS',
    name: 'Emergency Campus Weather Closure',
    category: 'ALERT',
    subject: null,
    body: 'URGENT: Due to severe weather advisory, {{campusName}} will remain closed on {{date}}. Online classes will proceed as per timetable.',
    variablesJson: '["campusName", "date"]',
    status: 'ACTIVE',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z'
  },
  // EMAIL
  {
    id: 'tpl-email-invoice-circular',
    tenantId: 'org-vedictree',
    channel: 'EMAIL',
    name: 'Term Fee Invoice & Breakdown',
    category: 'FINANCE',
    subject: 'Fee Invoice {{invoiceNumber}} - {{studentName}} ({{campusName}})',
    body: 'Dear {{guardianName}},\n\nPlease find the itemized tuition fee invoice for {{studentName}} for the upcoming academic term.\n\nTotal Due: {{amount}}\nDue Date: {{dueDate}}\n\nYou may settle this invoice online via the parent portal or UPI QR code.\n\nWarm regards,\nFinance Directorate, {{campusName}}',
    variablesJson: '["guardianName", "studentName", "invoiceNumber", "campusName", "amount", "dueDate"]',
    status: 'ACTIVE',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'tpl-email-sports-meet',
    tenantId: 'org-vedictree',
    channel: 'EMAIL',
    name: 'Annual Sports Meet Invitation',
    category: 'BROADCAST',
    subject: 'Invitation: Annual Athletics & Sports Meet 2026',
    body: 'Dear Vedic Tree Families,\n\nWe are delighted to invite you to our Annual Sports Meet on {{eventDate}} at the {{campusName}} Sports Arena.\n\nEvents commence at 08:30 AM. Please ensure students arrive in their respective House uniforms.\n\nCordially,\nPrincipal & Sports Committee',
    variablesJson: '["eventDate", "campusName"]',
    status: 'ACTIVE',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z'
  },
  // PUSH NOTIFICATION
  {
    id: 'tpl-push-bus-proximity',
    tenantId: 'org-vedictree',
    channel: 'PUSH',
    name: 'School Bus Proximity Alert',
    category: 'ALERT',
    subject: 'School Bus {{routeNo}} Approaching',
    body: 'Bus {{routeNo}} carrying {{studentName}} is 5 minutes away from your stop ({{stopName}}).',
    variablesJson: '["routeNo", "studentName", "stopName"]',
    status: 'ACTIVE',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z'
  },
  // IN-APP NOTIFICATION
  {
    id: 'tpl-inapp-fee-cleared',
    tenantId: 'org-vedictree',
    channel: 'IN_APP',
    name: 'Payment Settlement Receipt',
    category: 'FINANCE',
    subject: 'Payment Received: {{receiptNo}}',
    body: 'Your payment of {{amount}} for {{studentName}} has been cleared. Receipt {{receiptNo}} is available for download.',
    variablesJson: '["receiptNo", "amount", "studentName"]',
    status: 'ACTIVE',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z'
  }
];

export const SEED_COMMUNICATION_MESSAGES = [
  {
    id: 'msg-2026-001',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    channel: 'WHATSAPP',
    recipientType: 'GUARDIAN',
    recipientId: 'grd-001',
    recipientName: 'Dr. Anand Deshmukh',
    recipientAddress: '+91 98200 11223',
    subject: null,
    body: 'Dear Dr. Anand Deshmukh, this is a reminder from Vedic Tree Baner. The fee invoice of INR 60,000.00 for Kabir Deshmukh is overdue as of 2026-09-15.',
    templateId: 'tpl-wa-fee-overdue',
    category: 'FINANCE',
    priority: 'HIGH',
    status: 'READ',
    failureReason: null,
    retryCount: 0,
    maxRetries: 3,
    scheduledFor: null,
    sentAt: '2026-09-16T09:00:00Z',
    deliveredAt: '2026-09-16T09:00:04Z',
    readAt: '2026-09-16T09:12:30Z',
    provider: 'META_CLOUD',
    externalMessageId: 'wamid.HBgMOTE5ODIwMDExMjIzFQIAERgSMzAyNDUy',
    metadataJson: '{"invoiceId":"inv-2026-001"}',
    broadcastId: null,
    createdAt: '2026-09-16T08:59:50Z',
    updatedAt: '2026-09-16T09:12:30Z'
  },
  {
    id: 'msg-2026-002',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    channel: 'SMS',
    recipientType: 'GUARDIAN',
    recipientId: 'grd-002',
    recipientName: 'Meera Sharma',
    recipientAddress: '+91 98200 22334',
    subject: null,
    body: 'VT-ALERT: Aarav Sharma (Roll 102) was marked absent on 2026-09-20 at Vedic Tree Baner. If unplanned, please contact admin.',
    templateId: 'tpl-sms-student-absent',
    category: 'ALERT',
    priority: 'HIGH',
    status: 'DELIVERED',
    failureReason: null,
    retryCount: 0,
    maxRetries: 3,
    scheduledFor: null,
    sentAt: '2026-09-20T09:45:00Z',
    deliveredAt: '2026-09-20T09:45:08Z',
    readAt: null,
    provider: 'MSG91',
    externalMessageId: 'msg91_txn_928172839',
    metadataJson: '{"studentId":"stu-002"}',
    broadcastId: null,
    createdAt: '2026-09-20T09:44:50Z',
    updatedAt: '2026-09-20T09:45:08Z'
  },
  {
    id: 'msg-2026-003',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    channel: 'EMAIL',
    recipientType: 'GUARDIAN',
    recipientId: 'grd-003',
    recipientName: 'Vikram Joshi',
    recipientAddress: 'vikram.joshi@example.com',
    subject: 'Fee Invoice INV-2026-0003 - Ananya Joshi (Vedic Tree Baner)',
    body: 'Dear Vikram Joshi,\n\nPlease find the itemized tuition fee invoice for Ananya Joshi...',
    templateId: 'tpl-email-invoice-circular',
    category: 'FINANCE',
    priority: 'NORMAL',
    status: 'SENT',
    failureReason: null,
    retryCount: 0,
    maxRetries: 3,
    scheduledFor: null,
    sentAt: '2026-09-22T10:15:00Z',
    deliveredAt: null,
    readAt: null,
    provider: 'SENDGRID',
    externalMessageId: 'sg_msg_98471928374',
    metadataJson: '{"invoiceId":"inv-2026-003"}',
    broadcastId: null,
    createdAt: '2026-09-22T10:14:50Z',
    updatedAt: '2026-09-22T10:15:00Z'
  },
  {
    id: 'msg-2026-004',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    channel: 'PUSH',
    recipientType: 'GUARDIAN',
    recipientId: 'grd-001',
    recipientName: 'Dr. Anand Deshmukh',
    recipientAddress: 'fcm_tok_baner_anand_8471',
    subject: 'School Bus Route 4 Approaching',
    body: 'Bus Route 4 carrying Kabir Deshmukh is 5 minutes away from your stop (Someshwarwadi Gate).',
    templateId: 'tpl-push-bus-proximity',
    category: 'ALERT',
    priority: 'HIGH',
    status: 'DELIVERED',
    failureReason: null,
    retryCount: 0,
    maxRetries: 3,
    scheduledFor: null,
    sentAt: '2026-09-25T15:20:00Z',
    deliveredAt: '2026-09-25T15:20:01Z',
    readAt: null,
    provider: 'FCM',
    externalMessageId: 'fcm_projects_vt_messages_8471928',
    metadataJson: '{"routeNo":"Route 4"}',
    broadcastId: null,
    createdAt: '2026-09-25T15:19:50Z',
    updatedAt: '2026-09-25T15:20:01Z'
  },
  {
    id: 'msg-2026-005',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    channel: 'IN_APP',
    recipientType: 'USER',
    recipientId: 'usr-parent-01',
    recipientName: 'Dr. Anand Deshmukh',
    recipientAddress: 'usr-parent-01',
    subject: 'Payment Received: RCP-2026-0001',
    body: 'Your payment of INR 60,000.00 for Kabir Deshmukh has been cleared. Receipt RCP-2026-0001 is available for download.',
    templateId: 'tpl-inapp-fee-cleared',
    category: 'FINANCE',
    priority: 'NORMAL',
    status: 'READ',
    failureReason: null,
    retryCount: 0,
    maxRetries: 3,
    scheduledFor: null,
    sentAt: '2026-09-05T14:22:15Z',
    deliveredAt: '2026-09-05T14:22:15Z',
    readAt: '2026-09-05T15:01:10Z',
    provider: 'IN_APP',
    externalMessageId: 'inapp_msg_001',
    metadataJson: '{"receiptNo":"RCP-2026-0001"}',
    broadcastId: null,
    createdAt: '2026-09-05T14:22:15Z',
    updatedAt: '2026-09-05T15:01:10Z'
  },
  {
    id: 'msg-2026-006',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    channel: 'SMS',
    recipientType: 'GUARDIAN',
    recipientId: 'grd-004',
    recipientName: 'Rohan Kulkarni',
    recipientAddress: '+91 99999 00000',
    subject: null,
    body: 'VT-ALERT: Rohan Kulkarni (Roll 104) was marked absent on 2026-09-24 at Vedic Tree Baner.',
    templateId: 'tpl-sms-student-absent',
    category: 'ALERT',
    priority: 'HIGH',
    status: 'FAILED',
    failureReason: 'PROVIDER_ERROR: Invalid destination MSISDN (Unallocated telecom number)',
    retryCount: 3,
    maxRetries: 3,
    scheduledFor: null,
    sentAt: '2026-09-24T09:30:00Z',
    deliveredAt: null,
    readAt: null,
    provider: 'MSG91',
    externalMessageId: null,
    metadataJson: '{"errorCategory":"PERMANENT"}',
    broadcastId: null,
    createdAt: '2026-09-24T09:29:50Z',
    updatedAt: '2026-09-24T09:31:00Z'
  },
  {
    id: 'msg-2026-007',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    channel: 'WHATSAPP',
    recipientType: 'GUARDIAN',
    recipientId: 'grd-005',
    recipientName: 'Sunita Patil',
    recipientAddress: '+91 98233 44556',
    subject: null,
    body: 'Invitation: Annual Athletics & Sports Meet 2026 on 2026-10-15 at Vedic Tree Baner.',
    templateId: 'tpl-wa-campus-event',
    category: 'BROADCAST',
    priority: 'NORMAL',
    status: 'SCHEDULED',
    failureReason: null,
    retryCount: 0,
    maxRetries: 3,
    scheduledFor: '2026-10-05T09:00:00Z',
    sentAt: null,
    deliveredAt: null,
    readAt: null,
    provider: 'META_CLOUD',
    externalMessageId: null,
    metadataJson: '{"broadcastId":"bc-2026-001"}',
    broadcastId: 'bc-2026-001',
    createdAt: '2026-09-28T11:00:00Z',
    updatedAt: '2026-09-28T11:00:00Z'
  },
  {
    id: 'msg-2026-008',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    channel: 'PUSH',
    recipientType: 'GUARDIAN',
    recipientId: 'grd-002',
    recipientName: 'Meera Sharma',
    recipientAddress: 'fcm_tok_meera_sharma_9918',
    subject: 'Emergency Alert',
    body: 'Urgent Weather Advisory: School bus Route 2 delayed by 15 mins due to road repairs.',
    templateId: null,
    category: 'ALERT',
    priority: 'URGENT',
    status: 'QUEUED',
    failureReason: null,
    retryCount: 0,
    maxRetries: 3,
    scheduledFor: null,
    sentAt: null,
    deliveredAt: null,
    readAt: null,
    provider: 'FCM',
    externalMessageId: null,
    metadataJson: '{"dispatchPriority":"HIGH"}',
    broadcastId: null,
    createdAt: '2026-10-01T08:10:00Z',
    updatedAt: '2026-10-01T08:10:00Z'
  }
];

export const SEED_COMMUNICATION_BROADCASTS = [
  {
    id: 'bc-2026-001',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    title: 'Grade 1 Annual Sports Day Circular',
    channelsJson: '["WHATSAPP", "SMS"]',
    templateId: 'tpl-email-sports-meet',
    subject: 'Annual Sports Meet Invitation',
    body: 'Dear Vedic Tree Families, We are delighted to invite you to our Annual Sports Meet on 2026-10-15 at Vedic Tree Baner.',
    audienceType: 'GRADE',
    audienceFilterJson: '{"grade":"Grade 1"}',
    totalRecipients: 45,
    sentCount: 45,
    deliveredCount: 43,
    failedCount: 2,
    status: 'COMPLETED',
    scheduledFor: '2026-09-28T10:00:00Z',
    executedAt: '2026-09-28T10:00:15Z',
    createdById: 'usr-principal-baner',
    createdAt: '2026-09-28T09:30:00Z',
    updatedAt: '2026-09-28T10:01:00Z'
  },
  {
    id: 'bc-2026-002',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    title: 'Diwali Break & Campus Maintenance Notice',
    channelsJson: '["EMAIL", "IN_APP"]',
    templateId: null,
    subject: 'Diwali Recess 2026 Schedule',
    body: 'Please note that Vedic Tree campuses will observe Diwali recess from Oct 28 to Nov 03. Administrative offices reopen on Nov 04.',
    audienceType: 'ALL_STUDENTS',
    audienceFilterJson: '{}',
    totalRecipients: 120,
    sentCount: 0,
    deliveredCount: 0,
    failedCount: 0,
    status: 'SCHEDULED',
    scheduledFor: '2026-10-20T08:00:00Z',
    executedAt: null,
    createdById: 'usr-principal-baner',
    createdAt: '2026-10-01T14:00:00Z',
    updatedAt: '2026-10-01T14:00:00Z'
  },
  {
    id: 'bc-2026-003',
    tenantId: 'org-vedictree',
    campusId: 'cmp-pune-baner',
    title: 'Staff In-Service Faculty Development Seminar',
    channelsJson: '["EMAIL", "IN_APP"]',
    templateId: null,
    subject: 'Faculty Development Seminar - Oct 12',
    body: 'Mandatory workshop on Experiential Pedagogy and NEP 2020 integration in the Senior Auditorium.',
    audienceType: 'ALL_STAFF',
    audienceFilterJson: '{}',
    totalRecipients: 24,
    sentCount: 0,
    deliveredCount: 0,
    failedCount: 0,
    status: 'DRAFT',
    scheduledFor: null,
    executedAt: null,
    createdById: 'usr-principal-baner',
    createdAt: '2026-10-02T16:00:00Z',
    updatedAt: '2026-10-02T16:00:00Z'
  }
];

export const SEED_NOTIFICATION_PREFERENCES = [
  // Parent 1 (Dr. Anand Deshmukh)
  { id: 'pref-001', tenantId: 'org-vedictree', userId: 'usr-parent-01', recipientType: 'GUARDIAN', channel: 'WHATSAPP', category: 'FEE_ALERTS', enabled: true, updatedAt: '2026-08-01T00:00:00Z' },
  { id: 'pref-002', tenantId: 'org-vedictree', userId: 'usr-parent-01', recipientType: 'GUARDIAN', channel: 'WHATSAPP', category: 'ATTENDANCE_ALERTS', enabled: true, updatedAt: '2026-08-01T00:00:00Z' },
  { id: 'pref-003', tenantId: 'org-vedictree', userId: 'usr-parent-01', recipientType: 'GUARDIAN', channel: 'WHATSAPP', category: 'CAMPUS_EVENTS', enabled: true, updatedAt: '2026-08-01T00:00:00Z' },
  { id: 'pref-004', tenantId: 'org-vedictree', userId: 'usr-parent-01', recipientType: 'GUARDIAN', channel: 'WHATSAPP', category: 'GENERAL_BROADCASTS', enabled: false, updatedAt: '2026-08-10T12:00:00Z' }, // Opted out of broadcasts on WhatsApp
  { id: 'pref-005', tenantId: 'org-vedictree', userId: 'usr-parent-01', recipientType: 'GUARDIAN', channel: 'SMS', category: 'ATTENDANCE_ALERTS', enabled: true, updatedAt: '2026-08-01T00:00:00Z' },
  { id: 'pref-006', tenantId: 'org-vedictree', userId: 'usr-parent-01', recipientType: 'GUARDIAN', channel: 'EMAIL', category: 'FEE_ALERTS', enabled: true, updatedAt: '2026-08-01T00:00:00Z' },
  { id: 'pref-007', tenantId: 'org-vedictree', userId: 'usr-parent-01', recipientType: 'GUARDIAN', channel: 'PUSH', category: 'CAMPUS_EVENTS', enabled: true, updatedAt: '2026-08-01T00:00:00Z' },
  { id: 'pref-008', tenantId: 'org-vedictree', userId: 'usr-parent-01', recipientType: 'GUARDIAN', channel: 'IN_APP', category: 'FEE_ALERTS', enabled: true, updatedAt: '2026-08-01T00:00:00Z' }
];

// ==========================================
// MODULE 06: ACADEMICS SEED DATA
// ==========================================

export const SEED_SUBJECTS = [
  { id: 'subj-math', schoolId: 'sch-pune-intl', name: 'Mathematics', code: 'MATH-101', isElective: false, credits: 4, departmentId: 'dept-acad' },
  { id: 'subj-sci', schoolId: 'sch-pune-intl', name: 'Science & Environmental Studies', code: 'SCI-101', isElective: false, credits: 4, departmentId: 'dept-sci' },
  { id: 'subj-eng', schoolId: 'sch-pune-intl', name: 'English Literature & Grammar', code: 'ENG-101', isElective: false, credits: 3, departmentId: 'dept-acad' },
  { id: 'subj-hin', schoolId: 'sch-pune-intl', name: 'Hindi Second Language', code: 'HIN-101', isElective: false, credits: 3, departmentId: 'dept-acad' },
  { id: 'subj-sst', schoolId: 'sch-pune-intl', name: 'Social Studies & Civics', code: 'SST-101', isElective: false, credits: 3, departmentId: 'dept-acad' },
  { id: 'subj-san', schoolId: 'sch-pune-intl', name: 'Sanskrit & Vedic Heritage', code: 'SAN-101', isElective: true, credits: 2, departmentId: 'dept-acad' },
  { id: 'subj-rob', schoolId: 'sch-pune-intl', name: 'Robotics & STEM AI Lab', code: 'ROB-101', isElective: true, credits: 2, departmentId: 'dept-sci' }
];

export const SEED_TEACHER_ASSIGNMENTS = [
  // Sunita Patil (emp-sunita): Math & Science in Grade 5-A, Math in 5-B, Science in 6-A
  { id: 'ta-001', campusId: 'cmp-pune-baner', employeeId: 'emp-sunita', subjectId: 'subj-math', divisionId: 'div-pune-5a', academicYearId: 'ay-2026-2027', isClassTeacher: true },
  { id: 'ta-002', campusId: 'cmp-pune-baner', employeeId: 'emp-sunita', subjectId: 'subj-sci', divisionId: 'div-pune-5a', academicYearId: 'ay-2026-2027', isClassTeacher: false },
  { id: 'ta-003', campusId: 'cmp-pune-baner', employeeId: 'emp-sunita', subjectId: 'subj-math', divisionId: 'div-pune-5b', academicYearId: 'ay-2026-2027', isClassTeacher: false },
  { id: 'ta-004', campusId: 'cmp-pune-baner', employeeId: 'emp-sunita', subjectId: 'subj-sci', divisionId: 'div-pune-6a', academicYearId: 'ay-2026-2027', isClassTeacher: false },
  // Rajesh Verma (emp-rajesh): English & Social Studies in 5-A & 6-A
  { id: 'ta-005', campusId: 'cmp-pune-baner', employeeId: 'emp-rajesh', subjectId: 'subj-eng', divisionId: 'div-pune-5a', academicYearId: 'ay-2026-2027', isClassTeacher: false },
  { id: 'ta-006', campusId: 'cmp-pune-baner', employeeId: 'emp-rajesh', subjectId: 'subj-sst', divisionId: 'div-pune-5a', academicYearId: 'ay-2026-2027', isClassTeacher: false },
  { id: 'ta-007', campusId: 'cmp-pune-baner', employeeId: 'emp-rajesh', subjectId: 'subj-eng', divisionId: 'div-pune-6a', academicYearId: 'ay-2026-2027', isClassTeacher: true },
  // Kothrud campus assignment
  { id: 'ta-ktr-001', campusId: 'cmp-pune-kothrud', employeeId: 'emp-sunita', subjectId: 'subj-math', divisionId: 'div-ktr-6a', academicYearId: 'ay-2026-2027', isClassTeacher: true }
];

export const SEED_TIMETABLE_PERIODS = [
  // MONDAY — Grade 5 Division A
  { id: 'tt-m-1', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'MON', periodNumber: 1, startTime: '08:30', endTime: '09:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-m-2', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-002', dayOfWeek: 'MON', periodNumber: 2, startTime: '09:15', endTime: '10:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-m-3', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-005', dayOfWeek: 'MON', periodNumber: 3, startTime: '10:15', endTime: '11:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-m-4', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-006', dayOfWeek: 'MON', periodNumber: 4, startTime: '11:00', endTime: '11:45', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-m-5', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'MON', periodNumber: 5, startTime: '12:30', endTime: '01:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-m-6', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-002', dayOfWeek: 'MON', periodNumber: 6, startTime: '01:15', endTime: '02:00', roomNumber: 'Lab 1', isSubstitution: false, substituteEmployeeId: null },

  // TUESDAY — Grade 5 Division A
  { id: 'tt-t-1', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-002', dayOfWeek: 'TUE', periodNumber: 1, startTime: '08:30', endTime: '09:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-t-2', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'TUE', periodNumber: 2, startTime: '09:15', endTime: '10:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-t-3', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-005', dayOfWeek: 'TUE', periodNumber: 3, startTime: '10:15', endTime: '11:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-t-4', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-006', dayOfWeek: 'TUE', periodNumber: 4, startTime: '11:00', endTime: '11:45', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-t-5', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'TUE', periodNumber: 5, startTime: '12:30', endTime: '01:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-t-6', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-005', dayOfWeek: 'TUE', periodNumber: 6, startTime: '01:15', endTime: '02:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },

  // WEDNESDAY — Grade 5 Division A
  { id: 'tt-w-1', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'WED', periodNumber: 1, startTime: '08:30', endTime: '09:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-w-2', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-002', dayOfWeek: 'WED', periodNumber: 2, startTime: '09:15', endTime: '10:00', roomNumber: 'Lab 1', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-w-3', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-006', dayOfWeek: 'WED', periodNumber: 3, startTime: '10:15', endTime: '11:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-w-4', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-005', dayOfWeek: 'WED', periodNumber: 4, startTime: '11:00', endTime: '11:45', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-w-5', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'WED', periodNumber: 5, startTime: '12:30', endTime: '01:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-w-6', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-002', dayOfWeek: 'WED', periodNumber: 6, startTime: '01:15', endTime: '02:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },

  // THURSDAY — Grade 5 Division A
  { id: 'tt-th-1', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-005', dayOfWeek: 'THU', periodNumber: 1, startTime: '08:30', endTime: '09:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-th-2', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'THU', periodNumber: 2, startTime: '09:15', endTime: '10:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-th-3', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-002', dayOfWeek: 'THU', periodNumber: 3, startTime: '10:15', endTime: '11:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-th-4', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-006', dayOfWeek: 'THU', periodNumber: 4, startTime: '11:00', endTime: '11:45', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-th-5', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'THU', periodNumber: 5, startTime: '12:30', endTime: '01:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-th-6', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-002', dayOfWeek: 'THU', periodNumber: 6, startTime: '01:15', endTime: '02:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },

  // FRIDAY — Grade 5 Division A
  { id: 'tt-f-1', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'FRI', periodNumber: 1, startTime: '08:30', endTime: '09:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-f-2', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-002', dayOfWeek: 'FRI', periodNumber: 2, startTime: '09:15', endTime: '10:00', roomNumber: 'Lab 1', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-f-3', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-005', dayOfWeek: 'FRI', periodNumber: 3, startTime: '10:15', endTime: '11:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-f-4', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-006', dayOfWeek: 'FRI', periodNumber: 4, startTime: '11:00', endTime: '11:45', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-f-5', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-001', dayOfWeek: 'FRI', periodNumber: 5, startTime: '12:30', endTime: '01:15', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null },
  { id: 'tt-f-6', campusId: 'cmp-pune-baner', divisionId: 'div-pune-5a', teacherAssignmentId: 'ta-002', dayOfWeek: 'FRI', periodNumber: 6, startTime: '01:15', endTime: '02:00', roomNumber: 'Room 201', isSubstitution: false, substituteEmployeeId: null }
];

export const SEED_LESSONS = [
  {
    id: 'les-001',
    campusId: 'cmp-pune-baner',
    teacherAssignmentId: 'ta-001', // Math 5-A
    title: 'Fractions: Operations & Mixed Numbers',
    description: 'Addition and subtraction of unlike fractions with LCM visualization.',
    chapter: 'Chapter 2: Fractions & Decimals',
    plannedDate: '2026-10-01',
    completedDate: '2026-10-01',
    status: 'COMPLETED',
    teachingAids: 'Interactive Fraction Discs, Smartboard Applet'
  },
  {
    id: 'les-002',
    campusId: 'cmp-pune-baner',
    teacherAssignmentId: 'ta-001', // Math 5-A
    title: 'Multiplication and Division of Decimals',
    description: 'Real-world currency problem solving and place value shifting.',
    chapter: 'Chapter 2: Fractions & Decimals',
    plannedDate: '2026-10-02',
    completedDate: null,
    status: 'IN_PROGRESS',
    teachingAids: 'Digital Decimal Grid, Grid Paper'
  },
  {
    id: 'les-003',
    campusId: 'cmp-pune-baner',
    teacherAssignmentId: 'ta-001', // Math 5-A
    title: 'Geometry: Angles & Triangle Classification',
    description: 'Measuring acute, obtuse, and reflex angles using protractor.',
    chapter: 'Chapter 3: Lines and Angles',
    plannedDate: '2026-10-05',
    completedDate: null,
    status: 'PLANNED',
    teachingAids: 'GeoGebra Software, Protractor Set'
  },
  {
    id: 'les-004',
    campusId: 'cmp-pune-baner',
    teacherAssignmentId: 'ta-002', // Science 5-A
    title: 'Photosynthesis & Plant Transport Systems',
    description: 'Chlorophyll function, stomata respiration, and xylem/phloem flow.',
    chapter: 'Chapter 1: Nutrition in Plants',
    plannedDate: '2026-10-02',
    completedDate: null,
    status: 'IN_PROGRESS',
    teachingAids: 'Microscope Slides, Iodine Starch Test Demonstration'
  }
];

export const SEED_HOMEWORKS = [
  {
    id: 'hw-001',
    campusId: 'cmp-pune-baner',
    divisionId: 'div-pune-5a',
    subjectId: 'subj-math',
    teacherId: 'emp-sunita',
    title: 'Exercise 2.3: Fraction Word Problems',
    description: 'Complete problems 1 to 8 on Page 45 of NCERT Mathematics textbook.',
    assignedDate: '2026-10-01',
    dueDate: '2026-10-04',
    maxMarks: 10,
    submissionType: 'NOTEBOOK'
  },
  {
    id: 'hw-002',
    campusId: 'cmp-pune-baner',
    divisionId: 'div-pune-5a',
    subjectId: 'subj-sci',
    teacherId: 'emp-sunita',
    title: 'Plant Leaf Specimen & Stomata Diagram',
    description: 'Sketch and label a monocot leaf stomatal pore with neat annotations.',
    assignedDate: '2026-10-02',
    dueDate: '2026-10-06',
    maxMarks: 10,
    submissionType: 'WORKSHEET'
  }
];

export const SEED_ASSIGNMENT_SUBMISSIONS = [
  {
    id: 'sub-001',
    homeworkId: 'hw-001',
    studentId: 'stu-aditi-rao',
    submissionDate: '2026-10-02T15:30:00Z',
    status: 'GRADED',
    marksObtained: 9.5,
    feedback: 'Excellent step-by-step problem breakdown and clean simplification.',
    gradedAt: '2026-10-02T17:00:00Z'
  },
  {
    id: 'sub-002',
    homeworkId: 'hw-001',
    studentId: 'stu-rohan-kulkarni',
    submissionDate: '2026-10-02T16:15:00Z',
    status: 'SUBMITTED',
    marksObtained: null,
    feedback: null,
    gradedAt: null
  }
];

export const SEED_ASSESSMENTS = [
  {
    id: 'asm-pt1-math',
    campusId: 'cmp-pune-baner',
    academicYearId: 'ay-2026-2027',
    gradeId: 'grd-5',
    subjectId: 'subj-math',
    title: 'Periodic Test 1 (PT-1) — Mathematics',
    assessmentType: 'PERIODIC_TEST',
    maxMarks: 40,
    passingMarks: 14,
    date: '2026-08-10',
    weightage: 10
  },
  {
    id: 'asm-pt1-sci',
    campusId: 'cmp-pune-baner',
    academicYearId: 'ay-2026-2027',
    gradeId: 'grd-5',
    subjectId: 'subj-sci',
    title: 'Periodic Test 1 (PT-1) — Science',
    assessmentType: 'PERIODIC_TEST',
    maxMarks: 40,
    passingMarks: 14,
    date: '2026-08-12',
    weightage: 10
  },
  {
    id: 'asm-term1-math',
    campusId: 'cmp-pune-baner',
    academicYearId: 'ay-2026-2027',
    gradeId: 'grd-5',
    subjectId: 'subj-math',
    title: 'Term 1 Summative Assessment — Mathematics',
    assessmentType: 'SUMMATIVE',
    maxMarks: 80,
    passingMarks: 28,
    date: '2026-09-22',
    weightage: 40
  },
  {
    id: 'asm-term1-sci',
    campusId: 'cmp-pune-baner',
    academicYearId: 'ay-2026-2027',
    gradeId: 'grd-5',
    subjectId: 'subj-sci',
    title: 'Term 1 Summative Assessment — Science',
    assessmentType: 'SUMMATIVE',
    maxMarks: 80,
    passingMarks: 28,
    date: '2026-09-24',
    weightage: 40
  }
];

export const SEED_RESULTS = [
  // Aditi Rao (stu-aditi-rao)
  {
    id: 'res-001',
    campusId: 'cmp-pune-baner',
    assessmentId: 'asm-pt1-math',
    studentId: 'stu-aditi-rao',
    marksObtained: 38,
    gradeLetter: 'A1',
    remarks: 'Flawless computation and logical presentation.',
    isAbsent: false
  },
  {
    id: 'res-002',
    campusId: 'cmp-pune-baner',
    assessmentId: 'asm-pt1-sci',
    studentId: 'stu-aditi-rao',
    marksObtained: 36,
    gradeLetter: 'A1',
    remarks: 'Strong conceptual grasp of experimental diagrams.',
    isAbsent: false
  },
  {
    id: 'res-003',
    campusId: 'cmp-pune-baner',
    assessmentId: 'asm-term1-math',
    studentId: 'stu-aditi-rao',
    marksObtained: 74,
    gradeLetter: 'A1',
    remarks: 'Consistently exceptional analytical work.',
    isAbsent: false
  },
  {
    id: 'res-004',
    campusId: 'cmp-pune-baner',
    assessmentId: 'asm-term1-sci',
    studentId: 'stu-aditi-rao',
    marksObtained: 71,
    gradeLetter: 'A2',
    remarks: 'Very good understanding of life processes.',
    isAbsent: false
  },
  // Rohan Kulkarni (stu-rohan-kulkarni)
  {
    id: 'res-005',
    campusId: 'cmp-pune-baner',
    assessmentId: 'asm-pt1-math',
    studentId: 'stu-rohan-kulkarni',
    marksObtained: 29,
    gradeLetter: 'B1',
    remarks: 'Good effort, needs more practice with speed.',
    isAbsent: false
  },
  {
    id: 'res-006',
    campusId: 'cmp-pune-baner',
    assessmentId: 'asm-pt1-sci',
    studentId: 'stu-rohan-kulkarni',
    marksObtained: 31,
    gradeLetter: 'A2',
    remarks: 'Active participant in lab experiments.',
    isAbsent: false
  },
  // Kabir Deshmukh (stu-kabir-deshmukh)
  {
    id: 'res-kabir-math',
    campusId: 'cmp-pune-baner',
    assessmentId: 'asm-pt1-math',
    studentId: 'stu-kabir-deshmukh',
    marksObtained: 38,
    gradeLetter: 'A1',
    remarks: 'Flawless computation and logical presentation.',
    isAbsent: false
  },
  {
    id: 'res-kabir-sci',
    campusId: 'cmp-pune-baner',
    assessmentId: 'asm-pt1-sci',
    studentId: 'stu-kabir-deshmukh',
    marksObtained: 37,
    gradeLetter: 'A1',
    remarks: 'Strong conceptual clarity in physics fundamentals.',
    isAbsent: false
  }
];

export const SEED_REPORT_CARDS = [
  {
    id: 'rc-001',
    campusId: 'cmp-pune-baner',
    studentId: 'stu-aditi-rao',
    academicYearId: 'ay-2026-2027',
    term: 'Term 1',
    summaryJson: JSON.stringify({
      subjects: [
        { subject: 'Mathematics', marksObtained: 112, maxMarks: 120, percentage: 93.3, grade: 'A1' },
        { subject: 'Science', marksObtained: 107, maxMarks: 120, percentage: 89.2, grade: 'A2' }
      ],
      totalMarks: 219,
      maxTotalMarks: 240,
      percentage: 91.25,
      overallGrade: 'A1',
      attendance: { workingDays: 95, presentDays: 92, percentage: 96.8 }
    }),
    overallPercentage: 91.25,
    overallGrade: 'A1',
    attendancePercentage: 96.8,
    teacherRemarks: 'Aditi demonstrates commendable academic dedication and peer leadership in collaborative projects.',
    principalSignedAt: '2026-09-30T10:00:00Z',
    publishedAt: '2026-09-30T14:00:00Z'
  },
  {
    id: 'rc-002',
    campusId: 'cmp-pune-baner',
    studentId: 'stu-kabir-deshmukh',
    academicYearId: 'ay-2026-2027',
    term: 'Term 1',
    summaryJson: JSON.stringify({
      subjects: [
        { subject: 'Mathematics', marksObtained: 114, maxMarks: 120, percentage: 95.0, grade: 'A1' },
        { subject: 'Science', marksObtained: 110, maxMarks: 120, percentage: 91.7, grade: 'A1' }
      ],
      totalMarks: 224,
      maxTotalMarks: 240,
      percentage: 93.3,
      overallGrade: 'A1',
      attendance: { workingDays: 60, presentDays: 58, percentage: 96.7 }
    }),
    overallPercentage: 93.3,
    overallGrade: 'A1',
    attendancePercentage: 96.7,
    teacherRemarks: 'Kabir demonstrates commendable dedication, deep mathematical logic, and gentle peer leadership.',
    principalSignedAt: '2026-09-30T10:00:00Z',
    publishedAt: '2026-09-30T14:00:00Z'
  }
];

// ============================================================================
// MODULE 08: SCHOOL OPERATIONS SEED DATA
// ============================================================================

export const SEED_ASSETS = [
  {
    id: 'ast-001',
    campusId: 'cmp-pune-baner',
    assetCode: 'AST-IT-001',
    name: 'Dell Latitude 5440 Faculty Laptop',
    category: 'IT_HARDWARE',
    serialNumber: 'DL-5440-9921',
    modelNumber: 'Latitude 5440 i7',
    purchaseDate: '2025-06-15T00:00:00Z',
    purchaseCost: 78500.0,
    currentStatus: 'IN_USE',
    locationFacilityId: 'fac-001',
    assignedToEmployeeId: 'emp-sunita',
    warrantyExpiryDate: '2028-06-15T00:00:00Z',
    notes: 'Allocated to Sunita Sharma (Grade 5 Class Teacher)'
  },
  {
    id: 'ast-002',
    campusId: 'cmp-pune-baner',
    assetCode: 'AST-IT-002',
    name: 'BenQ 4K Interactive Smart Board 75"',
    category: 'IT_HARDWARE',
    serialNumber: 'BQ-75-4K-1082',
    modelNumber: 'RM7502K',
    purchaseDate: '2025-04-10T00:00:00Z',
    purchaseCost: 145000.0,
    currentStatus: 'IN_USE',
    locationFacilityId: 'fac-001',
    assignedToEmployeeId: null,
    warrantyExpiryDate: '2028-04-10T00:00:00Z',
    notes: 'Installed in Room 101 (Grade 5A)'
  },
  {
    id: 'ast-003',
    campusId: 'cmp-pune-baner',
    assetCode: 'AST-SCI-001',
    name: 'Olympus Binocular Compound Microscope',
    category: 'LAB_EQUIPMENT',
    serialNumber: 'OLY-CX23-441',
    modelNumber: 'CX23LEDRFS1',
    purchaseDate: '2024-11-20T00:00:00Z',
    purchaseCost: 38200.0,
    currentStatus: 'IN_USE',
    locationFacilityId: 'fac-002',
    assignedToEmployeeId: null,
    warrantyExpiryDate: '2027-11-20T00:00:00Z',
    notes: 'Senior Biology & General Science Workstation 1'
  },
  {
    id: 'ast-004',
    campusId: 'cmp-pune-baner',
    assetCode: 'AST-FUR-001',
    name: 'Godrej Library Double-Sided Metal Bookshelf',
    category: 'FURNITURE',
    serialNumber: 'GD-LIB-SH-09',
    modelNumber: 'Archival-D6',
    purchaseDate: '2024-02-14T00:00:00Z',
    purchaseCost: 22000.0,
    currentStatus: 'IN_USE',
    locationFacilityId: 'fac-004',
    assignedToEmployeeId: null,
    warrantyExpiryDate: '2034-02-14T00:00:00Z',
    notes: 'Central Reference & Vedic Literature Stack'
  },
  {
    id: 'ast-005',
    campusId: 'cmp-pune-baner',
    assetCode: 'AST-ELC-001',
    name: 'Blue Star 2.0 Ton Inverter Cassette AC',
    category: 'ELECTRICAL',
    serialNumber: 'BS-CAS-2T-881',
    modelNumber: 'IC524DATU',
    purchaseDate: '2024-08-01T00:00:00Z',
    purchaseCost: 64000.0,
    currentStatus: 'UNDER_MAINTENANCE',
    locationFacilityId: 'fac-003',
    assignedToEmployeeId: null,
    warrantyExpiryDate: '2029-08-01T00:00:00Z',
    notes: 'Computer Lab Cooling Unit 2 (Service Ticket Open)'
  }
];

export const SEED_INVENTORY_ITEMS = [
  {
    id: 'inv-001',
    campusId: 'cmp-pune-baner',
    itemCode: 'INV-STA-001',
    name: 'JK Copier A4 Paper 75 GSM',
    category: 'STATIONERY',
    unit: 'REAMS',
    currentStock: 120,
    minStockLevel: 25,
    reorderQuantity: 100,
    unitCost: 320.0,
    storageLocation: 'Central Store - Rack A2'
  },
  {
    id: 'inv-002',
    campusId: 'cmp-pune-baner',
    itemCode: 'INV-STA-002',
    name: 'Camlin Whiteboard Marker Pens (Set of 10 Assorted)',
    category: 'STATIONERY',
    unit: 'BOXES',
    currentStock: 45,
    minStockLevel: 15,
    reorderQuantity: 50,
    unitCost: 280.0,
    storageLocation: 'Central Store - Bin B1'
  },
  {
    id: 'inv-003',
    campusId: 'cmp-pune-baner',
    itemCode: 'INV-LAB-001',
    name: 'Borosil Glass Beakers 250ml Heat Resistant',
    category: 'LAB_CHEMICALS',
    unit: 'PIECES',
    currentStock: 30,
    minStockLevel: 12,
    reorderQuantity: 25,
    unitCost: 145.0,
    storageLocation: 'Science Prep Room - Cabinet 4'
  },
  {
    id: 'inv-004',
    campusId: 'cmp-pune-baner',
    itemCode: 'INV-MED-001',
    name: 'Trauma & Emergency First Aid Refill Kits',
    category: 'FIRST_AID',
    unit: 'PACKETS',
    currentStock: 8, // Low stock: trigger alert (< 10)
    minStockLevel: 10,
    reorderQuantity: 20,
    unitCost: 850.0,
    storageLocation: 'Infirmary Medical Cupboard'
  },
  {
    id: 'inv-005',
    campusId: 'cmp-pune-baner',
    itemCode: 'INV-HSK-001',
    name: 'Lizol Surface Disinfectant Floor Cleaner 5L Can',
    category: 'HOUSEKEEPING',
    unit: 'LITERS',
    currentStock: 35,
    minStockLevel: 10,
    reorderQuantity: 40,
    unitCost: 650.0,
    storageLocation: 'Facility Store - Bay 1'
  }
];

export const SEED_STOCK_TRANSACTIONS = [
  {
    id: 'stx-001',
    campusId: 'cmp-pune-baner',
    itemId: 'inv-001',
    type: 'INWARD',
    quantity: 100,
    balanceAfter: 130,
    referenceNumber: 'PO-2026-001',
    issuedTo: null,
    performedBy: 'Store Supervisor (Kishore Rao)',
    notes: 'Received bulk consignment from Navneet Supplies',
    createdAt: '2026-09-15T11:00:00Z'
  },
  {
    id: 'stx-002',
    campusId: 'cmp-pune-baner',
    itemId: 'inv-001',
    type: 'OUTWARD',
    quantity: 10,
    balanceAfter: 120,
    referenceNumber: 'REQ-EXAM-44',
    issuedTo: 'Examination Cell',
    performedBy: 'Store Supervisor (Kishore Rao)',
    notes: 'Issued for Periodic Test Question Papers',
    createdAt: '2026-09-20T14:30:00Z'
  }
];

export const SEED_VENDORS = [
  {
    id: 'vnd-001',
    campusId: 'cmp-pune-baner',
    vendorCode: 'VND-001',
    name: 'Apex IT Solutions Pvt Ltd',
    category: 'IT_SOLUTIONS',
    contactPerson: 'Mr. Vivek Deshmukh',
    phone: '+91 98220 55441',
    email: 'contact@apexitsolutions.in',
    gstNumber: '27AABCA1234D1ZP',
    address: 'Plot 45, Hinjewadi Phase 1, Pune',
    rating: 4.8,
    status: 'ACTIVE'
  },
  {
    id: 'vnd-002',
    campusId: 'cmp-pune-baner',
    vendorCode: 'VND-002',
    name: 'Navneet Educational Supplies & Publications',
    category: 'STATIONERY',
    contactPerson: 'Mrs. Rekha Singhania',
    phone: '+91 98231 66772',
    email: 'orders@navneetpune.com',
    gstNumber: '27AABCN8890K1ZR',
    address: 'Shop 12, Appa Balwant Chowk, Pune',
    rating: 4.9,
    status: 'ACTIVE'
  },
  {
    id: 'vnd-003',
    campusId: 'cmp-pune-baner',
    vendorCode: 'VND-003',
    name: 'Shanti Scientific & Educational Instruments',
    category: 'LAB_EQUIPMENT',
    contactPerson: 'Dr. Anand Kulkarni',
    phone: '+91 98900 33211',
    email: 'sales@shantiscientific.com',
    gstNumber: '27AABCS4455F1ZK',
    address: 'Sadashiv Peth, Pune',
    rating: 4.7,
    status: 'ACTIVE'
  },
  {
    id: 'vnd-004',
    campusId: 'cmp-pune-baner',
    vendorCode: 'VND-004',
    name: 'Baner Facility & Electro-Mechanical Services',
    category: 'FACILITY_MANAGEMENT',
    contactPerson: 'Mr. Milind More',
    phone: '+91 99221 44009',
    email: 'helpdesk@banerfacility.in',
    gstNumber: '27AABCB9911E1ZS',
    address: 'Baner Road, Near Pancard Club, Pune',
    rating: 4.5,
    status: 'ACTIVE'
  },
  {
    id: 'vnd-005',
    campusId: 'cmp-pune-baner',
    vendorCode: 'VND-005',
    name: 'Sai Shraddha Transport & Logistics',
    category: 'TRANSPORT',
    contactPerson: 'Mr. Dilip Shinde',
    phone: '+91 98224 88770',
    email: 'info@saishraddhabus.com',
    gstNumber: '27AABCS3322B1ZN',
    address: 'Katraj Bypass, Pune',
    rating: 4.6,
    status: 'ACTIVE'
  }
];

export const SEED_PURCHASE_ORDERS = [
  {
    id: 'po-001',
    campusId: 'cmp-pune-baner',
    poNumber: 'PO-2026-001',
    vendorId: 'vnd-002',
    orderDate: '2026-09-10T10:00:00Z',
    expectedDeliveryDate: '2026-09-15T00:00:00Z',
    itemsJson: JSON.stringify([
      { description: 'JK Copier A4 Paper 75 GSM', quantity: 100, unitCost: 320.0, total: 32000.0 },
      { description: 'Whiteboard Marker Pens (Box of 10)', quantity: 30, unitCost: 280.0, total: 8400.0 }
    ]),
    subtotal: 40400.0,
    taxAmount: 2100.0,
    totalAmount: 42500.0,
    status: 'APPROVED',
    approvedBy: 'usr-principal-baner',
    approvedAt: '2026-09-11T12:00:00Z',
    receivedAt: '2026-09-15T11:00:00Z',
    remarks: 'Annual Exam & Curriculum Paper Stock'
  },
  {
    id: 'po-002',
    campusId: 'cmp-pune-baner',
    poNumber: 'PO-2026-002',
    vendorId: 'vnd-001',
    orderDate: '2026-09-25T14:00:00Z',
    expectedDeliveryDate: '2026-10-10T00:00:00Z',
    itemsJson: JSON.stringify([
      { description: 'Dell OptiPlex 7010 Desktop Systems for Lab', quantity: 5, unitCost: 35000.0, total: 175000.0 },
      { description: 'Cat-6 Gigabit Network Switches 24-Port', quantity: 1, unitCost: 10000.0, total: 10000.0 }
    ]),
    subtotal: 185000.0,
    taxAmount: 33300.0,
    totalAmount: 218300.0,
    status: 'PENDING_APPROVAL',
    approvedBy: null,
    approvedAt: null,
    receivedAt: null,
    remarks: 'Turing Computer Lab Expansion'
  }
];

export const SEED_FACILITIES = [
  {
    id: 'fac-001',
    campusId: 'cmp-pune-baner',
    facilityCode: 'BLD-A-101',
    name: 'Classroom 101 (Grade 5A Home)',
    type: 'CLASSROOM',
    building: 'Building A (Primary Academic Wing)',
    floor: '1st Floor',
    capacity: 40,
    status: 'AVAILABLE',
    airConditioned: true,
    projectorAvailable: true
  },
  {
    id: 'fac-002',
    campusId: 'cmp-pune-baner',
    facilityCode: 'BLD-A-LAB-01',
    name: 'Senior Science Laboratory',
    type: 'SCIENCE_LAB',
    building: 'Building A (Primary Academic Wing)',
    floor: '2nd Floor',
    capacity: 36,
    status: 'AVAILABLE',
    airConditioned: true,
    projectorAvailable: true
  },
  {
    id: 'fac-003',
    campusId: 'cmp-pune-baner',
    facilityCode: 'BLD-B-CLAB-01',
    name: 'Turing Computer Science & AI Lab',
    type: 'COMPUTER_LAB',
    building: 'Building B (STEM & Innovation Wing)',
    floor: 'Ground Floor',
    capacity: 45,
    status: 'AVAILABLE',
    airConditioned: true,
    projectorAvailable: true
  },
  {
    id: 'fac-004',
    campusId: 'cmp-pune-baner',
    facilityCode: 'BLD-B-LIB-01',
    name: 'Central Knowledge & Archival Library',
    type: 'LIBRARY',
    building: 'Building B (STEM & Innovation Wing)',
    floor: '1st Floor',
    capacity: 80,
    status: 'AVAILABLE',
    airConditioned: true,
    projectorAvailable: false
  },
  {
    id: 'fac-005',
    campusId: 'cmp-pune-baner',
    facilityCode: 'BLD-C-AUD-01',
    name: 'Ramanujan Grand Auditorium',
    type: 'AUDITORIUM',
    building: 'Building C (Performing Arts & Cultural Wing)',
    floor: 'Ground Floor',
    capacity: 350,
    status: 'AVAILABLE',
    airConditioned: true,
    projectorAvailable: true
  },
  {
    id: 'fac-006',
    campusId: 'cmp-pune-baner',
    facilityCode: 'BLD-A-INF-01',
    name: 'Campus Health & Infirmary Station',
    type: 'INFIRMARY',
    building: 'Building A (Primary Academic Wing)',
    floor: 'Ground Floor',
    capacity: 6,
    status: 'AVAILABLE',
    airConditioned: true,
    projectorAvailable: false
  }
];

export const SEED_FACILITY_BOOKINGS = [
  {
    id: 'fb-001',
    campusId: 'cmp-pune-baner',
    facilityId: 'fac-003',
    title: 'Inter-House Robotics Club Workshop',
    bookedBy: 'emp-anand',
    startTime: '2026-10-05T14:30:00Z',
    endTime: '2026-10-05T16:30:00Z',
    status: 'CONFIRMED'
  },
  {
    id: 'fb-002',
    campusId: 'cmp-pune-baner',
    facilityId: 'fac-005',
    title: 'Gandhi Jayanti Cultural Assembly Rehearsal',
    bookedBy: 'emp-sunita',
    startTime: '2026-10-06T10:00:00Z',
    endTime: '2026-10-06T12:00:00Z',
    status: 'CONFIRMED'
  }
];

export const SEED_MAINTENANCE_REQUESTS = [
  {
    id: 'mnt-001',
    campusId: 'cmp-pune-baner',
    ticketNumber: 'MNT-2026-001',
    facilityId: 'fac-003',
    assetId: 'ast-005',
    title: 'Cassette AC Unit 2 Cooling Gas Leak & Noise',
    category: 'HVAC',
    priority: 'HIGH',
    description: 'Unit is vibrating and blowing warm air; computer lab temperatures rising during afternoon sessions.',
    reportedBy: 'emp-anand',
    assignedTo: 'Baner Facility Services (Technician Raju)',
    status: 'IN_PROGRESS',
    estimatedCost: 3500.0,
    actualCost: null,
    resolutionNotes: 'Compressor valve inspected; gas recharge scheduled for tomorrow.',
    resolvedAt: null,
    createdAt: '2026-09-28T09:15:00Z'
  },
  {
    id: 'mnt-002',
    campusId: 'cmp-pune-baner',
    ticketNumber: 'MNT-2026-002',
    facilityId: 'fac-001',
    assetId: null,
    title: 'Smart Board HDMI Cable Replacement',
    category: 'ELECTRICAL',
    priority: 'MEDIUM',
    description: 'Wall plate HDMI port loose causing intermittent flickering on projector.',
    reportedBy: 'emp-sunita',
    assignedTo: 'Internal Electrician (Manoj)',
    status: 'RESOLVED',
    estimatedCost: 800.0,
    actualCost: 650.0,
    resolutionNotes: 'Replaced with high-speed gold-plated 4K HDMI cable and tested with teacher laptop.',
    resolvedAt: '2026-09-26T16:00:00Z',
    createdAt: '2026-09-25T11:00:00Z'
  }
];

export const SEED_VISITOR_LOGS = [
  {
    id: 'vis-001',
    campusId: 'cmp-pune-baner',
    passNumber: 'VIS-2026-001',
    visitorName: 'Mr. Sandeep Patil',
    phone: '+91 98221 11223',
    purpose: 'PARENT_MEETING',
    personToMeet: 'Dr. Arundhati Roy (Principal)',
    idProofType: 'AADHAAR',
    idProofNumber: 'XXXX-XXXX-4491',
    checkInTime: '2026-10-02T10:15:00Z',
    checkOutTime: null,
    badgeNumber: 'V-04',
    status: 'CHECKED_IN',
    vehicleNumber: 'MH-12-DE-4412',
    remarks: 'Pre-scheduled appointment regarding Grade 1 admission'
  },
  {
    id: 'vis-002',
    campusId: 'cmp-pune-baner',
    passNumber: 'VIS-2026-002',
    visitorName: 'Mr. Rajesh Kadam',
    phone: '+91 98902 33445',
    purpose: 'VENDOR_VISIT',
    personToMeet: 'Kishore Rao (Store Supervisor)',
    idProofType: 'DRIVING_LICENSE',
    idProofNumber: 'MH-12-2019-9921',
    checkInTime: '2026-10-02T08:45:00Z',
    checkOutTime: '2026-10-02T09:30:00Z',
    badgeNumber: 'V-01',
    status: 'CHECKED_OUT',
    vehicleNumber: 'MH-12-TR-9988',
    remarks: 'Delivered lab consumables shipment and obtained signature'
  }
];

export const SEED_INCIDENTS = [
  {
    id: 'inc-001',
    campusId: 'cmp-pune-baner',
    incidentNumber: 'INC-2026-001',
    title: 'Playground Minor Scraped Knee during Morning Recess',
    category: 'MINOR_INJURY',
    severity: 'LOW',
    isSensitive: false,
    occurredAt: '2026-09-29T10:45:00Z',
    location: 'Primary Football Turf',
    reportedBy: 'emp-sunita',
    reportedByName: 'Sunita Sharma',
    personsInvolvedJson: JSON.stringify([
      { type: 'STUDENT', id: 'stu-rohan-kulkarni', name: 'Rohan Kulkarni' }
    ]),
    description: 'Student tripped while running for a pass on the turf. Minor superficial scrape on left knee.',
    immediateActionTaken: 'Escorted to campus infirmary. Wound cleaned with antiseptic and sterile bandage applied. Student returned to class after 15 mins.',
    status: 'RESOLVED',
    designatedOfficer: null,
    sensitiveNotes: null,
    resolutionSummary: 'Injury treated successfully. Parent informed via daily diary note.',
    resolvedAt: '2026-09-29T11:15:00Z'
  },
  {
    id: 'inc-002',
    campusId: 'cmp-pune-baner',
    incidentNumber: 'INC-2026-002',
    title: 'Confidential Safeguarding & Harassment Investigation',
    category: 'SAFEGUARDING',
    severity: 'CRITICAL',
    isSensitive: true, // SENSITIVE: MUST NEVER BE EXPOSED TO UNAUTHORIZED USERS
    occurredAt: '2026-09-27T15:30:00Z',
    location: 'Senior Wing Corridor / Digital Group',
    reportedBy: 'emp-sunita',
    reportedByName: 'Sunita Sharma',
    personsInvolvedJson: JSON.stringify([
      { type: 'STUDENT', id: 'stu-aditi-rao', name: 'Aditi Rao' }
    ]),
    description: 'Confidential report submitted concerning persistent verbal teasing and unauthorized digital photo sharing in an unofficial student peer group.',
    immediateActionTaken: 'Principal and School Counsellor intervened immediately. Individual counselling sessions initiated with both students under Child Protection guidelines.',
    status: 'UNDER_INVESTIGATION',
    designatedOfficer: 'Dr. Arundhati Roy (Principal) & Child Protection Officer',
    sensitiveNotes: 'Internal POCSO/Safeguarding Committee convened. Guardians of both students met privately. Device logs secured in safe custody. External reporting threshold evaluated and determined internal mediation appropriate with continuous monitoring.',
    resolutionSummary: 'Joint parental undertaking signed. Daily check-in protocol active with school counsellor.',
    resolvedAt: null
  }
];

export const SEED_COMPLAINTS = [
  {
    id: 'grv-001',
    campusId: 'cmp-pune-baner',
    ticketNumber: 'GRV-2026-001',
    complainantType: 'PARENT',
    complainantName: 'Mrs. Sunita Rao (Mother of Aditi Rao)',
    contactPhone: '+91 98200 44321',
    contactEmail: 'sunita.rao@example.com',
    category: 'TRANSPORT',
    priority: 'HIGH',
    subject: 'Bus Route 1 Consistent Morning Delays at Baner Gaon Stop',
    description: 'The school bus has been arriving 20-25 minutes late for the past three consecutive days, causing students to miss morning yoga assembly.',
    status: 'IN_PROGRESS',
    assignedTo: 'Transport Manager (Dilip Shinde)',
    resolutionSummary: 'Contacted traffic police and mapped an alternate bypass route via Sus Road to avoid highway flyover bottleneck.',
    resolvedAt: null,
    createdAt: '2026-09-28T08:30:00Z'
  },
  {
    id: 'grv-002',
    campusId: 'cmp-pune-baner',
    ticketNumber: 'GRV-2026-002',
    complainantType: 'STUDENT',
    complainantName: 'Grade 5 Student Council Representative',
    contactPhone: null,
    contactEmail: null,
    category: 'CANTEEN',
    priority: 'LOW',
    subject: 'Request for Healthy Millet Snacks & Fresh Fruit Juices',
    description: 'Students requested replacing packaged fried snacks with fresh steamed idlis, millet cookies, and seasonal fruit juices in the morning break.',
    status: 'RESOLVED',
    assignedTo: 'Catering Head (Chef Sanjeev)',
    resolutionSummary: 'Canteen menu overhauled from October 1st to include ragi ladoos, steamed corn, and fresh watermelon juice.',
    resolvedAt: '2026-09-30T17:00:00Z',
    createdAt: '2026-09-22T12:00:00Z'
  }
];

export const SEED_VEHICLES = [
  {
    id: 'veh-001',
    campusId: 'cmp-pune-baner',
    vehicleNumber: 'MH-12-VT-1001',
    vehicleType: 'BUS_40_SEATER',
    makeModel: 'Tata Starbus Ultra 40 Seater',
    capacity: 40,
    insuranceExpiryDate: '2027-05-30T00:00:00Z',
    fitnessExpiryDate: '2027-04-15T00:00:00Z',
    pucExpiryDate: '2026-12-31T00:00:00Z',
    gpsDeviceId: 'GPS-VT-1001-A',
    status: 'ACTIVE'
  },
  {
    id: 'veh-002',
    campusId: 'cmp-pune-baner',
    vehicleNumber: 'MH-12-VT-1002',
    vehicleType: 'BUS_32_SEATER',
    makeModel: 'Eicher Skyline Pro 3008',
    capacity: 32,
    insuranceExpiryDate: '2027-06-20T00:00:00Z',
    fitnessExpiryDate: '2027-05-10T00:00:00Z',
    pucExpiryDate: '2027-01-15T00:00:00Z',
    gpsDeviceId: 'GPS-VT-1002-B',
    status: 'ACTIVE'
  }
];

export const SEED_TRANSPORT_ROUTES = [
  {
    id: 'rte-001',
    campusId: 'cmp-pune-baner',
    routeNumber: 'RTE-BANER-01',
    routeName: 'Baner - Aundh - University Circle Loop',
    vehicleId: 'veh-001',
    driverName: 'Mr. Tukaram Shinde',
    driverPhone: '+91 98224 11099',
    attendantName: 'Mrs. Mangala Kamble',
    attendantPhone: '+91 98225 22088',
    morningStartTime: '07:15 AM',
    eveningStartTime: '03:30 PM',
    stopsJson: JSON.stringify([
      { stopNumber: 1, stopName: 'Baner Gaon Maruti Mandir', pickupTime: '07:15 AM', dropTime: '03:45 PM', feeMonthly: 2200 },
      { stopNumber: 2, stopName: 'Aundh D-Mart Junction', pickupTime: '07:30 AM', dropTime: '04:00 PM', feeMonthly: 2400 },
      { stopNumber: 3, stopName: 'Bremen Chowk', pickupTime: '07:42 AM', dropTime: '04:12 PM', feeMonthly: 2600 },
      { stopNumber: 4, stopName: 'Pune University Gate', pickupTime: '07:55 AM', dropTime: '04:25 PM', feeMonthly: 2800 }
    ]),
    activeStudentsCount: 34,
    status: 'ACTIVE'
  },
  {
    id: 'rte-002',
    campusId: 'cmp-pune-baner',
    routeNumber: 'RTE-BANER-02',
    routeName: 'Pashan - Bavdhan - Chandani Chowk Loop',
    vehicleId: 'veh-002',
    driverName: 'Mr. Ramesh Jadhav',
    driverPhone: '+91 98901 77665',
    attendantName: 'Mrs. Rekha More',
    attendantPhone: '+91 98902 88776',
    morningStartTime: '07:20 AM',
    eveningStartTime: '03:30 PM',
    stopsJson: JSON.stringify([
      { stopNumber: 1, stopName: 'Pashan Circle', pickupTime: '07:20 AM', dropTime: '03:45 PM', feeMonthly: 2100 },
      { stopNumber: 2, stopName: 'Bavdhan Windmill Village', pickupTime: '07:35 AM', dropTime: '04:00 PM', feeMonthly: 2300 },
      { stopNumber: 3, stopName: 'Chandani Chowk Flyover', pickupTime: '07:50 AM', dropTime: '04:15 PM', feeMonthly: 2500 }
    ]),
    activeStudentsCount: 28,
    status: 'ACTIVE'
  }
];

// ==========================================
// MODULE 10: PARTNER + FRANCHISE PLATFORM SEED FIXTURES
// ==========================================

export const SEED_PARTNERS = [
  {
    id: 'pt-west-edu',
    organizationId: SEED_ORGANIZATION.id,
    code: 'PT-WEST-01',
    legalName: 'Western Educational Enterprises LLP',
    tradeName: 'Western Edu Group',
    type: 'JOINT_VENTURE',
    contactPerson: 'Mr. Rajesh Kapadia',
    email: 'rajesh.partner@vedictree.edu.in',
    phone: '+91 98200 66000',
    panNumber: 'AAAFW1234K',
    gstin: '27AAAFW1234K1Z5',
    address: 'Nariman Point, Marine Drive, Mumbai, MH',
    equitySharePct: 40.0,
    revenueSharePct: 15.0,
    status: 'ACTIVE',
    joinedDate: '2023-06-15T00:00:00Z'
  },
  {
    id: 'pt-north-vidya',
    organizationId: SEED_ORGANIZATION.id,
    code: 'PT-NORTH-02',
    legalName: 'Vidya Jyoti Educational Trust',
    tradeName: 'Vidya Jyoti Partners',
    type: 'STRATEGIC_ACADEMIC',
    contactPerson: 'Dr. Alok Verma',
    email: 'alok.verma@vidyajyoti.org',
    phone: '+91 98110 44332',
    panNumber: 'AAATV9876P',
    gstin: '07AAATV9876P1ZX',
    address: 'Sector 62, Noida, UP',
    equitySharePct: 25.0,
    revenueSharePct: 10.0,
    status: 'ACTIVE',
    joinedDate: '2024-01-10T00:00:00Z'
  }
];

export const SEED_FRANCHISES = [
  {
    id: 'fr-mumbai-bandra',
    organizationId: SEED_ORGANIZATION.id,
    partnerId: 'pt-west-edu',
    code: 'FR-MUM-01',
    legalEntityName: 'Singhania Learning Solutions Pvt Ltd',
    tradeBrandName: 'Vedic Tree Academy Mumbai',
    franchiseeName: 'Mrs. Kavita Singhania',
    email: 'kavita.franchise@vedictree.edu.in',
    phone: '+91 98200 55000',
    city: 'Mumbai',
    state: 'Maharashtra',
    territory: 'Mumbai West - Bandra, Khar & Santacruz',
    territoryExclusivity: true,
    status: 'ACTIVE',
    onboardingDate: '2024-03-01T00:00:00Z'
  },
  {
    id: 'fr-thane-lake',
    organizationId: SEED_ORGANIZATION.id,
    partnerId: null,
    code: 'FR-THN-02',
    legalEntityName: 'Lakeview Vidya Enterprises',
    tradeBrandName: 'Vedic Tree Pre-School Thane',
    franchiseeName: 'Mr. Deepak Deshpande',
    email: 'deepak.thane@vedictree.edu.in',
    phone: '+91 98200 77112',
    city: 'Thane',
    state: 'Maharashtra',
    territory: 'Thane City - Ghodbunder Road',
    territoryExclusivity: true,
    status: 'ONBOARDING',
    onboardingDate: '2026-01-15T00:00:00Z'
  }
];

export const SEED_FRANCHISE_CONTRACTS = [
  {
    id: 'ctr-001',
    organizationId: SEED_ORGANIZATION.id,
    contractNumber: 'CTR-FR-2024-001',
    franchiseId: 'fr-mumbai-bandra',
    partnerId: 'pt-west-edu',
    contractType: 'FRANCHISE_AGREEMENT',
    startDate: '2024-04-01T00:00:00Z',
    endDate: '2029-03-31T00:00:00Z',
    termYears: 5,
    royaltyModel: 'PERCENT_OF_REVENUE',
    royaltyRatePct: 12.0,
    royaltyPerStudent: 0.0,
    minMonthlyRoyalty: 75000.0,
    upfrontFranchiseFee: 1500000.0,
    securityDeposit: 500000.0,
    status: 'ACTIVE',
    termsJson: JSON.stringify({
      auditFrequency: 'QUARTERLY',
      curriculumMandate: 'VEDIC_TREE_CENTRAL_SYLLABUS',
      teacherTrainingDaysRequired: 15,
      brandCompliancePenaltyInr: 50000
    })
  },
  {
    id: 'ctr-002',
    organizationId: SEED_ORGANIZATION.id,
    contractNumber: 'CTR-PT-2025-014',
    franchiseId: null,
    partnerId: 'pt-west-edu',
    contractType: 'PARTNER_JV',
    startDate: '2025-04-01T00:00:00Z',
    endDate: '2035-03-31T00:00:00Z',
    termYears: 10,
    royaltyModel: 'HYBRID',
    royaltyRatePct: 8.0,
    royaltyPerStudent: 500.0,
    minMonthlyRoyalty: 50000.0,
    upfrontFranchiseFee: 2500000.0,
    securityDeposit: 1000000.0,
    status: 'ACTIVE',
    termsJson: JSON.stringify({
      governanceBoardSeats: 2,
      caPexSharingPct: 50.0,
      annualCurriculumLicensingFee: 200000
    })
  }
];

export const SEED_COMPLIANCE_AUDITS = [
  {
    id: 'aud-001',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-mumbai-acad',
    franchiseId: 'fr-mumbai-bandra',
    auditCode: 'AUD-2026-Q1-01',
    auditDate: '2026-08-15T00:00:00Z',
    auditorName: 'Prof. Anjali Ranade (HQ Quality Cell)',
    category: 'ACADEMIC_STANDARDS',
    score: 92.0,
    maxScore: 100.0,
    passingScore: 75.0,
    status: 'COMPLIANT',
    findings: 'Curriculum delivery meets Vedic Tree national standards. Micro-lesson plans, student workbooks, and robotics labs fully operational.',
    remediationPlan: 'Minor update needed on Grade 3 Sanskrit audio pronunciation aids.',
    remediationDeadline: '2026-10-31T00:00:00Z',
    verifiedAt: '2026-08-18T00:00:00Z'
  },
  {
    id: 'aud-002',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-mumbai-acad',
    franchiseId: 'fr-mumbai-bandra',
    auditCode: 'AUD-2026-Q2-02',
    auditDate: '2026-09-10T00:00:00Z',
    auditorName: 'Er. Hemant Joshi (HQ Safety Cell)',
    category: 'INFRASTRUCTURE_SAFETY',
    score: 68.0,
    maxScore: 100.0,
    passingScore: 75.0,
    status: 'CONDITIONAL_PASS',
    findings: 'Fire extinguisher refit overdue in Chemistry Lab. CCTV coverage blind spot identified near basement sports store.',
    remediationPlan: 'Vendor dispatched for immediate fire suppression maintenance. Camera 14 realigned.',
    remediationDeadline: '2026-10-15T00:00:00Z',
    verifiedAt: null
  }
];

export const SEED_ROYALTY_INVOICES = [
  {
    id: 'roy-inv-001',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-mumbai-acad',
    franchiseId: 'fr-mumbai-bandra',
    invoiceNumber: 'ROY-2026-M08-001',
    billingPeriod: '2026-08',
    grossRevenue: 1250000.0,
    studentCount: 380,
    computedRoyalty: 150000.0,
    appliedFloor: 0.0,
    taxAmount: 27000.0,
    totalPayable: 177000.0,
    status: 'PAID',
    dueDate: '2026-09-10T00:00:00Z',
    paidDate: '2026-09-08T00:00:00Z',
    paymentReference: 'NEFT-HDFC-991208442',
    notes: 'August 2026 monthly royalty settled via net banking.'
  },
  {
    id: 'roy-inv-002',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-mumbai-acad',
    franchiseId: 'fr-mumbai-bandra',
    invoiceNumber: 'ROY-2026-M09-002',
    billingPeriod: '2026-09',
    grossRevenue: 980000.0,
    studentCount: 380,
    computedRoyalty: 117600.0,
    appliedFloor: 0.0,
    taxAmount: 21168.0,
    totalPayable: 138768.0,
    status: 'INVOICED',
    dueDate: '2026-10-10T00:00:00Z',
    paidDate: null,
    paymentReference: null,
    notes: 'September 2026 monthly royalty invoice generated.'
  }
];

export const SEED_SCHOOL_PERFORMANCE = [
  {
    id: 'perf-001',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-pune-intl',
    franchiseId: null,
    currentEnrollment: 520,
    totalCapacity: 600,
    occupancyRatePct: 86.7,
    feeCollectionRatePct: 98.4,
    academicRating: 4.8,
    teacherRetentionPct: 94.0,
    npsScore: 78.0,
    healthGrade: 'A+',
    lastEvaluatedAt: '2026-09-30T00:00:00Z'
  },
  {
    id: 'perf-002',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-mumbai-acad',
    franchiseId: 'fr-mumbai-bandra',
    currentEnrollment: 380,
    totalCapacity: 450,
    occupancyRatePct: 84.4,
    feeCollectionRatePct: 95.8,
    academicRating: 4.5,
    teacherRetentionPct: 89.5,
    npsScore: 68.0,
    healthGrade: 'A',
    lastEvaluatedAt: '2026-09-30T00:00:00Z'
  },
  {
    id: 'perf-003',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-nagpur-partner',
    franchiseId: null,
    currentEnrollment: 210,
    totalCapacity: 350,
    occupancyRatePct: 60.0,
    feeCollectionRatePct: 88.0,
    academicRating: 4.2,
    teacherRetentionPct: 82.0,
    npsScore: 54.0,
    healthGrade: 'B',
    lastEvaluatedAt: '2026-09-30T00:00:00Z'
  }
];

export const SEED_FRANCHISE_SUPPORT_TICKETS = [
  {
    id: 'fst-001',
    organizationId: SEED_ORGANIZATION.id,
    franchiseId: 'fr-mumbai-bandra',
    schoolId: 'sch-mumbai-acad',
    ticketCode: 'FST-2026-0012',
    category: 'ACADEMIC_CURRICULUM',
    priority: 'HIGH',
    subject: 'Grade 9 CBSE Term 2 Exemplar Science Kits Shortage',
    description: 'Require 25 additional robotics and chemistry kits for upcoming CBSE board practical modules.',
    status: 'IN_PROGRESS',
    submittedById: 'usr-franchisee-mumbai',
    assignedHqUserId: 'usr-hq-admin',
    resolutionNotes: 'Dispatched from Central Warehouse via BlueDart Express AWB 88129031.',
    resolvedAt: null,
    createdAt: '2026-09-24T10:30:00Z'
  },
  {
    id: 'fst-002',
    organizationId: SEED_ORGANIZATION.id,
    franchiseId: 'fr-mumbai-bandra',
    schoolId: 'sch-mumbai-acad',
    ticketCode: 'FST-2026-0018',
    category: 'MARKETING_ADMISSIONS',
    priority: 'MEDIUM',
    subject: 'Diwali Open House Co-Branded Creative Assets',
    description: 'Requesting print-ready hoardings and digital social media creatives for Bandra & Khar territory.',
    status: 'RESOLVED',
    submittedById: 'usr-franchisee-mumbai',
    assignedHqUserId: 'usr-hq-admin',
    resolutionNotes: 'High-res creative package uploaded to Brand Asset Portal drive link.',
    resolvedAt: '2026-09-28T16:00:00Z',
    createdAt: '2026-09-26T11:15:00Z'
  }
];



