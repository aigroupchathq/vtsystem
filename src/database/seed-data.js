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
    ownershipType: 'SELF_OWNED',
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
    status: 'ACTIVE'
  }
];

export const SEED_CAMPUSES = [
  {
    id: 'cmp-pune-baner',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-pune-intl',
    name: 'Pune Baner Campus',
    code: 'PUNE-BNR',
    addressLine1: 'Survey No. 42, Baner-Pashan Link Road',
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '411045',
    phone: '+91 20 6712 4000',
    email: 'baner@vedictree.edu.in',
    isPrimary: true,
    status: 'ACTIVE'
  },
  {
    id: 'cmp-pune-kothrud',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-pune-intl',
    name: 'Pune Kothrud Campus',
    code: 'PUNE-KTR',
    addressLine1: 'Plot 18, Paud Road, Ideal Colony, Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '411038',
    phone: '+91 20 6712 5000',
    email: 'kothrud@vedictree.edu.in',
    isPrimary: false,
    status: 'ACTIVE'
  },
  {
    id: 'cmp-mumbai-bandra',
    organizationId: SEED_ORGANIZATION.id,
    schoolId: 'sch-mumbai-acad',
    name: 'Mumbai Bandra Campus',
    code: 'MUM-BND',
    addressLine1: 'Hill Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    phone: '+91 22 2640 1000',
    email: 'bandra@vedictree.edu.in',
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
  { id: 'perm-employees-delete', code: 'employees:delete', module: 'employees', action: 'delete' }
];

export const SEED_ROLE_PERMISSIONS = {
  HQ_ADMIN: [
    'tenant:manage', 'tenant:switch', 'audit:read',
    'students:read', 'students:create', 'students:update', 'students:delete',
    'employees:read', 'employees:create', 'employees:update', 'employees:delete'
  ],
  PRINCIPAL: [
    'tenant:switch', 'audit:read',
    'students:read', 'students:create', 'students:update',
    'employees:read', 'employees:create', 'employees:update'
  ],
  TEACHER: [
    'students:read',
    'employees:read'
  ],
  PARENT: [
    'students:read'
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
