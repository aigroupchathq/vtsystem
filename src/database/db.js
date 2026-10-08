// VEDIC TREE OS — In-Memory & Persistent Enterprise Multi-Tenant Store
import {
  SEED_ORGANIZATION,
  SEED_REGIONS,
  SEED_SCHOOLS,
  SEED_CAMPUSES,
  SEED_ROLES,
  SEED_PERMISSIONS,
  SEED_ROLE_PERMISSIONS,
  SEED_USERS,
  SEED_ACADEMIC_YEARS,
  SEED_GRADES,
  SEED_DIVISIONS,
  SEED_DEPARTMENTS,
  SEED_DESIGNATIONS,
  SEED_EMPLOYEES,
  SEED_GUARDIANS,
  SEED_STUDENTS,
  INITIAL_AUDIT_LOGS,
  SEED_ATTENDANCE_POLICIES,
  SEED_HOLIDAYS,
  SEED_LEAVE_BALANCES,
  SEED_LEAVE_REQUESTS,
  SEED_STAFF_ATTENDANCE,
  SEED_STUDENT_ATTENDANCE,
  SEED_LEADS,
  SEED_LEAD_TIMELINES,
  SEED_LEAD_FOLLOW_UPS,
  SEED_CAMPUS_VISITS,
  SEED_APPLICATIONS,
  SEED_APPLICATION_DOCUMENTS,
  SEED_ENTRANCE_ASSESSMENTS,
  SEED_ADMISSION_OFFERS,
  SEED_ADMISSION_RECORDS,
  SEED_COMMUNICATION_LOGS,
  WHATSAPP_TEMPLATES,
  SEED_FEE_STRUCTURES,
  SEED_DISCOUNT_RULES,
  SEED_SCHOLARSHIPS,
  SEED_INVOICES,
  SEED_PAYMENTS,
  SEED_RECEIPTS,
  SEED_REFUNDS,
  SEED_LEDGER_ACCOUNTS,
  SEED_LEDGER_ENTRIES,
  SEED_COMMUNICATION_TEMPLATES,
  SEED_COMMUNICATION_MESSAGES,
  SEED_COMMUNICATION_BROADCASTS,
  SEED_NOTIFICATION_PREFERENCES,
  SEED_SUBJECTS,
  SEED_TEACHER_ASSIGNMENTS,
  SEED_TIMETABLE_PERIODS,
  SEED_LESSONS,
  SEED_HOMEWORKS,
  SEED_ASSIGNMENT_SUBMISSIONS,
  SEED_ASSESSMENTS,
  SEED_RESULTS,
  SEED_REPORT_CARDS,
  SEED_ASSETS,
  SEED_INVENTORY_ITEMS,
  SEED_STOCK_TRANSACTIONS,
  SEED_VENDORS,
  SEED_PURCHASE_ORDERS,
  SEED_FACILITIES,
  SEED_FACILITY_BOOKINGS,
  SEED_MAINTENANCE_REQUESTS,
  SEED_VISITOR_LOGS,
  SEED_INCIDENTS,
  SEED_COMPLAINTS,
  SEED_VEHICLES,
  SEED_TRANSPORT_ROUTES,
  SEED_PARTNERS,
  SEED_FRANCHISES,
  SEED_FRANCHISE_CONTRACTS,
  SEED_COMPLIANCE_AUDITS,
  SEED_ROYALTY_INVOICES,
  SEED_SCHOOL_PERFORMANCE,
  SEED_FRANCHISE_SUPPORT_TICKETS
} from './seed-data.js';

class VedicTreeDatabase {
  constructor() {
    this.reset();
  }

  reset() {
    this.organization = { ...SEED_ORGANIZATION };
    this.regions = [...SEED_REGIONS];
    this.schools = [...SEED_SCHOOLS];
    this.campuses = [...SEED_CAMPUSES];
    this.roles = [...SEED_ROLES];
    this.permissions = [...SEED_PERMISSIONS];
    this.rolePermissions = { ...SEED_ROLE_PERMISSIONS };
    this.users = [...SEED_USERS];
    this.academicYears = [...SEED_ACADEMIC_YEARS];
    this.grades = [...SEED_GRADES];
    this.divisions = [...SEED_DIVISIONS];
    this.departments = [...SEED_DEPARTMENTS];
    this.designations = [...SEED_DESIGNATIONS];
    this.employees = JSON.parse(JSON.stringify(SEED_EMPLOYEES));
    this.guardians = JSON.parse(JSON.stringify(SEED_GUARDIANS));
    this.students = JSON.parse(JSON.stringify(SEED_STUDENTS));
    this.auditLogs = JSON.parse(JSON.stringify(INITIAL_AUDIT_LOGS));
    this.attendancePolicies = JSON.parse(JSON.stringify(SEED_ATTENDANCE_POLICIES));
    this.holidays = JSON.parse(JSON.stringify(SEED_HOLIDAYS));
    this.leaveBalances = JSON.parse(JSON.stringify(SEED_LEAVE_BALANCES));
    this.leaveRequests = JSON.parse(JSON.stringify(SEED_LEAVE_REQUESTS));
    this.staffAttendance = JSON.parse(JSON.stringify(SEED_STAFF_ATTENDANCE));
    this.studentAttendance = JSON.parse(JSON.stringify(SEED_STUDENT_ATTENDANCE));
    this.leads = JSON.parse(JSON.stringify(SEED_LEADS));
    this.leadTimelines = JSON.parse(JSON.stringify(SEED_LEAD_TIMELINES));
    this.leadFollowUps = JSON.parse(JSON.stringify(SEED_LEAD_FOLLOW_UPS));
    this.campusVisits = JSON.parse(JSON.stringify(SEED_CAMPUS_VISITS));
    this.applications = JSON.parse(JSON.stringify(SEED_APPLICATIONS));
    this.applicationDocuments = JSON.parse(JSON.stringify(SEED_APPLICATION_DOCUMENTS));
    this.entranceAssessments = JSON.parse(JSON.stringify(SEED_ENTRANCE_ASSESSMENTS));
    this.admissionOffers = JSON.parse(JSON.stringify(SEED_ADMISSION_OFFERS));
    this.admissionRecords = JSON.parse(JSON.stringify(SEED_ADMISSION_RECORDS));
    this.communicationLogs = JSON.parse(JSON.stringify(SEED_COMMUNICATION_LOGS));
    this.whatsappTemplates = JSON.parse(JSON.stringify(WHATSAPP_TEMPLATES));
    this.feeStructures = JSON.parse(JSON.stringify(SEED_FEE_STRUCTURES));
    this.discountRules = JSON.parse(JSON.stringify(SEED_DISCOUNT_RULES));
    this.scholarships = JSON.parse(JSON.stringify(SEED_SCHOLARSHIPS));
    this.invoices = JSON.parse(JSON.stringify(SEED_INVOICES));
    this.payments = JSON.parse(JSON.stringify(SEED_PAYMENTS));
    this.receipts = JSON.parse(JSON.stringify(SEED_RECEIPTS));
    this.refunds = JSON.parse(JSON.stringify(SEED_REFUNDS));
    this.ledgerAccounts = JSON.parse(JSON.stringify(SEED_LEDGER_ACCOUNTS));
    this.ledgerEntries = JSON.parse(JSON.stringify(SEED_LEDGER_ENTRIES));
    this.communicationTemplates = JSON.parse(JSON.stringify(SEED_COMMUNICATION_TEMPLATES));
    this.communicationMessages = JSON.parse(JSON.stringify(SEED_COMMUNICATION_MESSAGES));
    this.communicationBroadcasts = JSON.parse(JSON.stringify(SEED_COMMUNICATION_BROADCASTS));
    this.notificationPreferences = JSON.parse(JSON.stringify(SEED_NOTIFICATION_PREFERENCES));
    this.subjects = JSON.parse(JSON.stringify(SEED_SUBJECTS));
    this.teacherAssignments = JSON.parse(JSON.stringify(SEED_TEACHER_ASSIGNMENTS));
    this.timetablePeriods = JSON.parse(JSON.stringify(SEED_TIMETABLE_PERIODS));
    this.lessons = JSON.parse(JSON.stringify(SEED_LESSONS));
    this.homeworks = JSON.parse(JSON.stringify(SEED_HOMEWORKS));
    this.assignmentSubmissions = JSON.parse(JSON.stringify(SEED_ASSIGNMENT_SUBMISSIONS));
    this.assessments = JSON.parse(JSON.stringify(SEED_ASSESSMENTS));
    this.results = JSON.parse(JSON.stringify(SEED_RESULTS));
    this.reportCards = JSON.parse(JSON.stringify(SEED_REPORT_CARDS));
    this.assets = JSON.parse(JSON.stringify(SEED_ASSETS));
    this.inventoryItems = JSON.parse(JSON.stringify(SEED_INVENTORY_ITEMS));
    this.stockTransactions = JSON.parse(JSON.stringify(SEED_STOCK_TRANSACTIONS));
    this.vendors = JSON.parse(JSON.stringify(SEED_VENDORS));
    this.purchaseOrders = JSON.parse(JSON.stringify(SEED_PURCHASE_ORDERS));
    this.facilities = JSON.parse(JSON.stringify(SEED_FACILITIES));
    this.facilityBookings = JSON.parse(JSON.stringify(SEED_FACILITY_BOOKINGS));
    this.maintenanceRequests = JSON.parse(JSON.stringify(SEED_MAINTENANCE_REQUESTS));
    this.visitorLogs = JSON.parse(JSON.stringify(SEED_VISITOR_LOGS));
    this.incidents = JSON.parse(JSON.stringify(SEED_INCIDENTS));
    this.complaints = JSON.parse(JSON.stringify(SEED_COMPLAINTS));
    this.vehicles = JSON.parse(JSON.stringify(SEED_VEHICLES));
    this.transportRoutes = JSON.parse(JSON.stringify(SEED_TRANSPORT_ROUTES));
    this.partners = JSON.parse(JSON.stringify(SEED_PARTNERS));
    this.franchises = JSON.parse(JSON.stringify(SEED_FRANCHISES));
    this.franchiseContracts = JSON.parse(JSON.stringify(SEED_FRANCHISE_CONTRACTS));
    this.complianceAudits = JSON.parse(JSON.stringify(SEED_COMPLIANCE_AUDITS));
    this.royaltyInvoices = JSON.parse(JSON.stringify(SEED_ROYALTY_INVOICES));
    this.schoolPerformance = JSON.parse(JSON.stringify(SEED_SCHOOL_PERFORMANCE));
    this.franchiseSupportTickets = JSON.parse(JSON.stringify(SEED_FRANCHISE_SUPPORT_TICKETS));
  }

  // ----------------------------------------------------
  // AUDIT LOGGING (Immutable Append-Only Ledger)
  // ----------------------------------------------------
  recordAudit({ organizationId, campusId, userId, userRole, action, entityName, entityId, diffBefore, diffAfter, ipAddress = '127.0.0.1' }) {
    const entry = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      organizationId: organizationId || this.organization.id,
      campusId: campusId || null,
      userId: userId || null,
      userRole: userRole || 'SYSTEM',
      action,
      entityName,
      entityId,
      diffBefore: diffBefore ? JSON.stringify(diffBefore) : null,
      diffAfter: diffAfter ? JSON.stringify(diffAfter) : null,
      ipAddress,
      userAgent: 'VedicTree-Runtime/1.0',
      createdAt: new Date().toISOString()
    };
    this.auditLogs.unshift(entry);
    return entry;
  }

  getAuditLogs(context) {
    let logs = [...this.auditLogs];
    // If not HQ_ADMIN, filter to campus
    if (context && context.userRole !== 'HQ_ADMIN' && context.campusId) {
      logs = logs.filter(l => l.campusId === context.campusId || !l.campusId);
    }
    return logs;
  }

  // ----------------------------------------------------
  // HIERARCHY & TENANT QUERIES
  // ----------------------------------------------------
  getHierarchy() {
    return {
      organization: this.organization,
      regions: this.regions.map(r => ({
        ...r,
        schools: this.schools.filter(s => s.regionId === r.id).map(s => ({
          ...s,
          campuses: this.campuses.filter(c => c.schoolId === s.id)
        }))
      }))
    };
  }

  getCampuses() {
    return [...this.campuses];
  }

  getCampusById(campusId) {
    return this.campuses.find(c => c.id === campusId) || null;
  }

  // ----------------------------------------------------
  // STUDENT MASTER OPERATIONS (WITH CAMPUS ISOLATION)
  // ----------------------------------------------------
  getStudents(context, filters = {}) {
    const { campusId, userRole } = context || {};
    let list = [...this.students];

    // STRICT MULTI-TENANT ISOLATION:
    // If context specifies a campusId and role is NOT global HQ, enforce campus boundary!
    if (campusId && userRole !== 'HQ_ADMIN') {
      list = list.filter(s => s.campusId === campusId);
    } else if (filters.campusId) {
      list = list.filter(s => s.campusId === filters.campusId);
    }

    if (filters.gradeId) {
      list = list.filter(s => s.enrollment?.gradeId === filters.gradeId);
    }
    if (filters.divisionId) {
      list = list.filter(s => s.enrollment?.divisionId === filters.divisionId);
    }
    if (filters.status) {
      list = list.filter(s => s.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(s => 
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.admissionNumber.toLowerCase().includes(q) ||
        (s.emergencyPhone && s.emergencyPhone.includes(q))
      );
    }

    // Attach grade and division labels
    return list.map(student => {
      const grade = this.grades.find(g => g.id === student.enrollment?.gradeId);
      const division = this.divisions.find(d => d.id === student.enrollment?.divisionId);
      const campus = this.campuses.find(c => c.id === student.campusId);
      return {
        ...student,
        gradeName: grade ? grade.name : 'Unassigned',
        divisionName: division ? division.name : '—',
        campusName: campus ? campus.name : 'Unknown Campus'
      };
    });
  }

  getStudentById(context, studentId) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return null;

    // Enforce tenant boundary: A campus principal or teacher from Campus A cannot read student from Campus B!
    if (context && context.userRole !== 'HQ_ADMIN' && context.campusId && student.campusId !== context.campusId) {
      const err = new Error(`CROSS_TENANT_ACCESS_DENIED: Access to student ${studentId} in campus ${student.campusId} is forbidden for active campus ${context.campusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    const grade = this.grades.find(g => g.id === student.enrollment?.gradeId);
    const division = this.divisions.find(d => d.id === student.enrollment?.divisionId);
    const campus = this.campuses.find(c => c.id === student.campusId);
    const academicYear = this.academicYears.find(ay => ay.id === student.enrollment?.academicYearId);
    const guardianDetails = (student.guardians || []).map(gRef => {
      const g = this.guardians.find(item => item.id === gRef.guardianId);
      return { ...g, ...gRef };
    });

    return {
      ...student,
      gradeName: grade ? grade.name : 'Unassigned',
      divisionName: division ? division.name : '—',
      campusName: campus ? campus.name : 'Unknown Campus',
      academicYearName: academicYear ? academicYear.name : '2026-2027',
      guardiansDetailed: guardianDetails
    };
  }

  createStudent(context, studentData) {
    const targetCampusId = studentData.campusId || context.campusId;
    if (!targetCampusId) {
      throw new Error('VALIDATION_ERROR: campusId is required to admit a student.');
    }

    // Check duplicate admission number
    const existing = this.students.find(s => s.admissionNumber.toUpperCase() === studentData.admissionNumber.toUpperCase());
    if (existing) {
      const err = new Error(`CONFLICT: Admission Number ${studentData.admissionNumber} already exists in registry.`);
      err.code = 'DUPLICATE_ADMISSION_NUMBER';
      err.status = 409;
      throw err;
    }

    // Create guardian if passed
    let guardianId = studentData.guardianId;
    if (studentData.guardian && !guardianId) {
      guardianId = `grd-${Date.now()}`;
      this.guardians.push({
        id: guardianId,
        firstName: studentData.guardian.firstName,
        lastName: studentData.guardian.lastName,
        relation: studentData.guardian.relation || 'FATHER',
        phone: studentData.guardian.phone,
        email: studentData.guardian.email || null,
        occupation: studentData.guardian.occupation || null,
        address: studentData.guardian.address || null
      });
    }

    const studentId = `stu-${Date.now()}`;
    const newStudent = {
      id: studentId,
      campusId: targetCampusId,
      admissionNumber: studentData.admissionNumber.toUpperCase(),
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      dob: studentData.dob || '2015-01-01',
      gender: studentData.gender || 'OTHER',
      bloodGroup: studentData.bloodGroup || 'O+',
      aadhaarLastFour: studentData.aadhaarLastFour || null,
      emergencyPhone: studentData.emergencyPhone,
      medicalNotes: studentData.medicalNotes || null,
      status: 'ACTIVE',
      guardians: guardianId ? [{ guardianId, isPrimary: true, isAuthorizedPickup: true }] : [],
      enrollment: {
        academicYearId: studentData.academicYearId || 'ay-2026-2027',
        gradeId: studentData.gradeId,
        divisionId: studentData.divisionId,
        rollNumber: studentData.rollNumber || (this.students.filter(s => s.campusId === targetCampusId).length + 1),
        status: 'ENROLLED'
      },
      documents: studentData.documents || []
    };

    this.students.unshift(newStudent);

    // Record immutable audit log
    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'CREATE',
      entityName: 'Student',
      entityId: studentId,
      diffBefore: null,
      diffAfter: {
        admissionNumber: newStudent.admissionNumber,
        name: `${newStudent.firstName} ${newStudent.lastName}`,
        campusId: targetCampusId,
        gradeId: newStudent.enrollment.gradeId,
        divisionId: newStudent.enrollment.divisionId
      }
    });

    return this.getStudentById(context, studentId);
  }

  // ----------------------------------------------------
  // EMPLOYEE HRMS OPERATIONS (WITH CAMPUS ISOLATION)
  // ----------------------------------------------------
  getEmployees(context, filters = {}) {
    const { campusId, userRole } = context || {};
    let list = [...this.employees];

    if (campusId && userRole !== 'HQ_ADMIN') {
      list = list.filter(e => e.campusId === campusId);
    } else if (filters.campusId) {
      list = list.filter(e => e.campusId === filters.campusId);
    }

    if (filters.departmentId) {
      list = list.filter(e => e.departmentId === filters.departmentId);
    }
    if (filters.designationId) {
      list = list.filter(e => e.designationId === filters.designationId);
    }
    if (filters.status) {
      list = list.filter(e => e.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(e => 
        e.firstName.toLowerCase().includes(q) ||
        e.lastName.toLowerCase().includes(q) ||
        e.employeeCode.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
      );
    }

    return list.map(emp => {
      const dept = this.departments.find(d => d.id === emp.departmentId);
      const des = this.designations.find(d => d.id === emp.designationId);
      const campus = this.campuses.find(c => c.id === emp.campusId);
      return {
        ...emp,
        departmentName: dept ? dept.name : 'General',
        designationTitle: des ? des.title : 'Staff',
        campusName: campus ? campus.name : 'Unknown Campus'
      };
    });
  }

  getEmployeeById(context, employeeId) {
    const emp = this.employees.find(e => e.id === employeeId);
    if (!emp) return null;

    if (context && context.userRole !== 'HQ_ADMIN' && context.campusId && emp.campusId !== context.campusId) {
      const err = new Error(`CROSS_TENANT_ACCESS_DENIED: Access to employee ${employeeId} in campus ${emp.campusId} is forbidden for active campus ${context.campusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    const dept = this.departments.find(d => d.id === emp.departmentId);
    const des = this.designations.find(d => d.id === emp.designationId);
    const campus = this.campuses.find(c => c.id === emp.campusId);

    return {
      ...emp,
      departmentName: dept ? dept.name : 'General',
      designationTitle: des ? des.title : 'Staff',
      campusName: campus ? campus.name : 'Unknown Campus'
    };
  }

  createEmployee(context, employeeData) {
    const targetCampusId = employeeData.campusId || context.campusId;
    if (!targetCampusId) {
      throw new Error('VALIDATION_ERROR: campusId is required to onboard an employee.');
    }

    // Check unique employee code
    const existing = this.employees.find(e => e.employeeCode.toUpperCase() === employeeData.employeeCode.toUpperCase());
    if (existing) {
      const err = new Error(`CONFLICT: Employee Code ${employeeData.employeeCode} already registered.`);
      err.code = 'DUPLICATE_EMPLOYEE_CODE';
      err.status = 409;
      throw err;
    }

    const empId = `emp-${Date.now()}`;
    const newEmp = {
      id: empId,
      campusId: targetCampusId,
      userId: null,
      departmentId: employeeData.departmentId,
      designationId: employeeData.designationId,
      employeeCode: employeeData.employeeCode.toUpperCase(),
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      email: employeeData.email,
      phone: employeeData.phone,
      gender: employeeData.gender || 'OTHER',
      dateOfJoining: employeeData.dateOfJoining || new Date().toISOString().split('T')[0],
      biometricId: employeeData.biometricId || `BIO-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'ACTIVE',
      aadhaarLastFour: employeeData.aadhaarLastFour || null,
      documents: employeeData.documents || []
    };

    this.employees.unshift(newEmp);

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'CREATE',
      entityName: 'Employee',
      entityId: empId,
      diffBefore: null,
      diffAfter: {
        employeeCode: newEmp.employeeCode,
        name: `${newEmp.firstName} ${newEmp.lastName}`,
        departmentId: newEmp.departmentId,
        designationId: newEmp.designationId
      }
    });

    return this.getEmployeeById(context, empId);
  }

  // ----------------------------------------------------
  // ACADEMICS & HR MASTER LOOKUPS
  // ----------------------------------------------------
  getGrades(schoolId) {
    return this.grades.filter(g => !schoolId || g.schoolId === schoolId);
  }

  getDivisions(campusId) {
    return this.divisions.filter(d => !campusId || d.campusId === campusId);
  }

  getDepartments(campusId) {
    return this.departments.filter(d => !campusId || d.campusId === campusId);
  }

  getDesignations(departmentId) {
    return this.designations.filter(d => !departmentId || d.departmentId === departmentId);
  }

  getAcademicYears(schoolId) {
    return this.academicYears.filter(ay => !schoolId || ay.schoolId === schoolId);
  }

  // ----------------------------------------------------
  // MODULE 02: ATTENDANCE POLICIES (DYNAMIC POLICY ENGINE)
  // ----------------------------------------------------
  getAttendancePolicy(campusId) {
    if (!campusId) return null;
    let policy = this.attendancePolicies.find(p => p.campusId === campusId);
    if (!policy) {
      // Create sensible defaults if not yet customized
      policy = {
        id: `pol-${campusId}`,
        campusId,
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.attendancePolicies.push(policy);
    }
    return { ...policy };
  }

  updateAttendancePolicy(context, campusId, updates) {
    const { userRole, campusId: userCampus } = context || {};
    if (userRole !== 'HQ_ADMIN' && userCampus && userCampus !== campusId) {
      const err = new Error(`TENANT_ISOLATION_VIOLATION: Cannot update attendance policy for foreign campus ${campusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    const index = this.attendancePolicies.findIndex(p => p.campusId === campusId);
    let current = index >= 0 ? this.attendancePolicies[index] : this.getAttendancePolicy(campusId);
    const before = { ...current };

    const updated = {
      ...current,
      ...updates,
      campusId, // Immutable
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) {
      this.attendancePolicies[index] = updated;
    } else {
      this.attendancePolicies.push(updated);
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'UPDATE_POLICY',
      entityName: 'AttendancePolicy',
      entityId: updated.id,
      diffBefore: before,
      diffAfter: updated
    });

    return { ...updated };
  }

  // ----------------------------------------------------
  // MODULE 02: STAFF ATTENDANCE
  // ----------------------------------------------------
  getStaffAttendance(context, filters = {}) {
    const { campusId, userRole } = context || {};
    let list = [...this.staffAttendance];

    const targetCampus = filters.campusId || campusId;
    if (targetCampus && userRole !== 'HQ_ADMIN') {
      list = list.filter(a => a.campusId === targetCampus);
    } else if (filters.campusId) {
      list = list.filter(a => a.campusId === filters.campusId);
    }

    if (filters.date) {
      list = list.filter(a => a.date === filters.date);
    }
    if (filters.employeeId) {
      list = list.filter(a => a.employeeId === filters.employeeId);
    }
    if (filters.status) {
      list = list.filter(a => a.status === filters.status);
    }

    return list.map(item => {
      const emp = this.employees.find(e => e.id === item.employeeId);
      const dept = emp ? this.departments.find(d => d.id === emp.departmentId) : null;
      const des = emp ? this.designations.find(d => d.id === emp.designationId) : null;
      return {
        ...item,
        employeeName: emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown Staff',
        employeeCode: emp ? emp.employeeCode : 'N/A',
        departmentName: dept ? dept.name : 'General',
        designationTitle: des ? des.title : 'Staff'
      };
    });
  }

  recordStaffAttendance(context, data) {
    const campusId = data.campusId || context.campusId;
    if (context.userRole !== 'HQ_ADMIN' && context.campusId && context.campusId !== campusId) {
      const err = new Error(`TENANT_ISOLATION_VIOLATION: Cannot record staff attendance in foreign campus ${campusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    const existingIndex = this.staffAttendance.findIndex(
      a => a.employeeId === data.employeeId && a.date === data.date
    );

    let record = null;
    let diffBefore = null;

    if (existingIndex >= 0) {
      diffBefore = { ...this.staffAttendance[existingIndex] };
      this.staffAttendance[existingIndex] = {
        ...this.staffAttendance[existingIndex],
        ...data,
        campusId,
        updatedAt: new Date().toISOString()
      };
      record = this.staffAttendance[existingIndex];
    } else {
      record = {
        id: `sa-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        campusId,
        employeeId: data.employeeId,
        date: data.date,
        checkInTime: data.checkInTime || null,
        checkOutTime: data.checkOutTime || null,
        durationMinutes: data.durationMinutes || 0,
        lateMinutes: data.lateMinutes || 0,
        status: data.status || 'PRESENT',
        source: data.source || 'MANUAL',
        remarks: data.remarks || null,
        verifiedBy: context.userId || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.staffAttendance.unshift(record);
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: existingIndex >= 0 ? 'UPDATE' : 'CREATE',
      entityName: 'StaffAttendance',
      entityId: record.id,
      diffBefore,
      diffAfter: record
    });

    return { ...record };
  }

  // ----------------------------------------------------
  // MODULE 02: STUDENT ATTENDANCE
  // ----------------------------------------------------
  getStudentAttendance(context, filters = {}) {
    const { campusId, userRole } = context || {};
    let list = [...this.studentAttendance];

    const targetCampus = filters.campusId || campusId;
    if (targetCampus && userRole !== 'HQ_ADMIN') {
      list = list.filter(a => a.campusId === targetCampus);
    } else if (filters.campusId) {
      list = list.filter(a => a.campusId === filters.campusId);
    }

    if (filters.divisionId) {
      list = list.filter(a => a.divisionId === filters.divisionId);
    }
    if (filters.date) {
      list = list.filter(a => a.date === filters.date);
    }
    if (filters.studentId) {
      list = list.filter(a => a.studentId === filters.studentId);
    }
    if (filters.status) {
      list = list.filter(a => a.status === filters.status);
    }

    return list.map(item => {
      const student = this.students.find(s => s.id === item.studentId);
      return {
        ...item,
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Student',
        admissionNumber: student ? student.admissionNumber : 'N/A',
        rollNumber: student?.enrollment?.rollNumber || null
      };
    });
  }

  markStudentAttendanceBatch(context, { divisionId, date, records, markedBy }) {
    const division = this.divisions.find(d => d.id === divisionId);
    if (!division) {
      throw new Error(`DIVISION_NOT_FOUND: Division ${divisionId} does not exist.`);
    }

    const campusId = division.campusId;
    if (context.userRole !== 'HQ_ADMIN' && context.campusId && context.campusId !== campusId) {
      const err = new Error(`TENANT_ISOLATION_VIOLATION: Cannot mark student attendance in foreign campus ${campusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    let markedCount = 0;
    const academicYearId = 'ay-2026-2027';

    for (const r of records) {
      const existingIndex = this.studentAttendance.findIndex(
        a => a.divisionId === divisionId && a.studentId === r.studentId && a.date === date
      );

      if (existingIndex >= 0) {
        this.studentAttendance[existingIndex] = {
          ...this.studentAttendance[existingIndex],
          status: r.status,
          remarks: r.remarks || null,
          markedBy: markedBy || context.userId,
          updatedAt: new Date().toISOString()
        };
      } else {
        this.studentAttendance.unshift({
          id: `sta-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          campusId,
          divisionId,
          studentId: r.studentId,
          academicYearId,
          date,
          periodIndex: 0,
          status: r.status || 'PRESENT',
          remarks: r.remarks || null,
          markedBy: markedBy || context.userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      markedCount++;
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'BATCH_ATTENDANCE',
      entityName: 'StudentAttendance',
      entityId: divisionId,
      diffBefore: null,
      diffAfter: { divisionId, date, studentCount: markedCount }
    });

    return { success: true, count: markedCount, date, divisionId };
  }

  // ----------------------------------------------------
  // MODULE 02: LEAVE & LEAVE BALANCES
  // ----------------------------------------------------
  getLeaveBalances(context, employeeId) {
    let list = [...this.leaveBalances];
    if (employeeId) {
      list = list.filter(lb => lb.employeeId === employeeId);
    }
    return list;
  }

  getLeaveRequests(context, filters = {}) {
    const { campusId, userRole } = context || {};
    let list = [...this.leaveRequests];

    const targetCampus = filters.campusId || campusId;
    if (targetCampus && userRole !== 'HQ_ADMIN') {
      list = list.filter(r => r.campusId === targetCampus);
    } else if (filters.campusId) {
      list = list.filter(r => r.campusId === filters.campusId);
    }

    if (filters.status) {
      list = list.filter(r => r.status === filters.status);
    }
    if (filters.applicantId) {
      list = list.filter(r => r.applicantId === filters.applicantId);
    }

    return list.map(req => {
      const emp = this.employees.find(e => e.id === req.applicantId);
      const student = !emp ? this.students.find(s => s.id === req.applicantId) : null;
      return {
        ...req,
        applicantName: emp ? `${emp.firstName} ${emp.lastName}` : (student ? `${student.firstName} ${student.lastName}` : 'Applicant'),
        applicantCode: emp ? emp.employeeCode : (student ? student.admissionNumber : 'N/A')
      };
    });
  }

  createLeaveRequest(context, data) {
    const campusId = data.campusId || context.campusId;
    if (context.userRole !== 'HQ_ADMIN' && context.campusId && context.campusId !== campusId) {
      const err = new Error(`TENANT_ISOLATION_VIOLATION: Cannot submit leave for foreign campus ${campusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    const id = `lr-${Date.now()}`;
    const newRequest = {
      id,
      campusId,
      applicantId: data.applicantId,
      applicantType: data.applicantType || 'EMPLOYEE',
      leaveType: data.leaveType || 'CASUAL_LEAVE',
      startDate: data.startDate,
      endDate: data.endDate,
      totalDays: Number(data.totalDays) || 1.0,
      isHalfDay: Boolean(data.isHalfDay),
      isSandwichPenaltyApplied: Boolean(data.isSandwichPenaltyApplied),
      sandwichDaysCount: Number(data.sandwichDaysCount) || 0,
      reason: data.reason,
      status: 'PENDING',
      approverId: null,
      approverRole: null,
      approverRemarks: null,
      approvedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.leaveRequests.unshift(newRequest);

    // Update pending days in balance if employee
    if (newRequest.applicantType === 'EMPLOYEE') {
      const balance = this.leaveBalances.find(
        b => b.employeeId === newRequest.applicantId && b.leaveType === newRequest.leaveType
      );
      if (balance) {
        balance.pendingDays += newRequest.totalDays;
        balance.remainingDays = Math.max(0, balance.allocatedDays - balance.usedDays - balance.pendingDays);
      }
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'APPLY_LEAVE',
      entityName: 'LeaveRequest',
      entityId: id,
      diffBefore: null,
      diffAfter: newRequest
    });

    return { ...newRequest };
  }

  updateLeaveRequestStatus(context, requestId, { status, approverRemarks, approverId, approverRole }) {
    const request = this.leaveRequests.find(r => r.id === requestId);
    if (!request) {
      const err = new Error(`NOT_FOUND: Leave request ${requestId} does not exist.`);
      err.code = 'LEAVE_NOT_FOUND';
      err.status = 404;
      throw err;
    }

    if (context.userRole !== 'HQ_ADMIN' && context.campusId && context.campusId !== request.campusId) {
      const err = new Error(`TENANT_ISOLATION_VIOLATION: Cannot approve leave for foreign campus ${request.campusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    const before = { ...request };
    request.status = status;
    request.approverId = approverId || context.userId;
    request.approverRole = approverRole || context.userRole;
    request.approverRemarks = approverRemarks || null;
    request.approvedAt = new Date().toISOString();
    request.updatedAt = new Date().toISOString();

    // Adjust leave balance
    if (request.applicantType === 'EMPLOYEE') {
      const balance = this.leaveBalances.find(
        b => b.employeeId === request.applicantId && b.leaveType === request.leaveType
      );
      if (balance) {
        if (status === 'APPROVED') {
          balance.pendingDays = Math.max(0, balance.pendingDays - request.totalDays);
          balance.usedDays += request.totalDays;
          balance.remainingDays = Math.max(0, balance.allocatedDays - balance.usedDays - balance.pendingDays);
        } else if (status === 'REJECTED' || status === 'CANCELLED') {
          balance.pendingDays = Math.max(0, balance.pendingDays - request.totalDays);
          balance.remainingDays = Math.max(0, balance.allocatedDays - balance.usedDays - balance.pendingDays);
        }
      }
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: request.campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: status === 'APPROVED' ? 'APPROVE_LEAVE' : 'REJECT_LEAVE',
      entityName: 'LeaveRequest',
      entityId: request.id,
      diffBefore: before,
      diffAfter: request
    });

    return { ...request };
  }

  getHolidays(campusId, academicYearId) {
    return this.holidays.filter(h => (!campusId || h.campusId === campusId) && (!academicYearId || h.academicYearId === academicYearId));
  }

  // ----------------------------------------------------
  // MODULE 03: ADMISSIONS CRM OPERATIONS
  // ----------------------------------------------------

  getLeads(context, filters = {}) {
    let result = this.leads;
    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(l => l.campusId === activeCampusId);
    } else if (filters.campusId) {
      result = result.filter(l => l.campusId === filters.campusId);
    }

    if (filters.stage) {
      result = result.filter(l => l.stage === filters.stage);
    }
    if (filters.leadSource) {
      result = result.filter(l => l.leadSource === filters.leadSource);
    }
    if (filters.assignedCounselorId) {
      result = result.filter(l => l.assignedCounselorId === filters.assignedCounselorId);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(l => 
        l.studentName.toLowerCase().includes(q) || 
        l.guardianName.toLowerCase().includes(q) || 
        l.phone.includes(q)
      );
    }
    return result;
  }

  getLeadById(context, leadId) {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return null;

    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      if (lead.campusId !== activeCampusId) {
        const err = new Error(`TENANT_ISOLATION_VIOLATION: Cannot access lead ${leadId} belonging to another campus.`);
        err.code = 'TENANT_ISOLATION_VIOLATION';
        err.status = 403;
        throw err;
      }
    }
    return { ...lead };
  }

  createLead(context, leadData) {
    const targetCampusId = leadData.campusId || context.campusId || context.activeCampusId;
    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      if (targetCampusId && targetCampusId !== activeCampusId) {
        const err = new Error(`TENANT_ISOLATION_VIOLATION: Cannot create lead in foreign campus ${targetCampusId}.`);
        err.code = 'TENANT_ISOLATION_VIOLATION';
        err.status = 403;
        throw err;
      }
    }

    const newLead = {
      id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      studentName: leadData.studentName,
      guardianName: leadData.guardianName,
      phone: leadData.phone,
      email: leadData.email || null,
      targetGrade: leadData.targetGrade,
      leadSource: leadData.leadSource || 'WALK_IN',
      stage: leadData.stage || 'LEAD',
      assignedCounselorId: leadData.assignedCounselorId || null,
      priority: leadData.priority || 'MEDIUM',
      notes: leadData.notes || '',
      tags: leadData.tags || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.leads.unshift(newLead);

    // Initial timeline event
    this.addLeadTimelineEvent(context, {
      leadId: newLead.id,
      campusId: targetCampusId,
      eventType: 'STATUS_CHANGE',
      title: 'Lead Created',
      description: `New lead registered via ${newLead.leadSource} for ${newLead.targetGrade}.`,
      metadata: { source: newLead.leadSource, targetGrade: newLead.targetGrade }
    });

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'CREATE_LEAD',
      entityName: 'Lead',
      entityId: newLead.id,
      diffBefore: null,
      diffAfter: newLead
    });

    return { ...newLead };
  }

  updateLead(context, leadId, updates) {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) {
      const err = new Error(`Lead ${leadId} not found.`);
      err.status = 404;
      throw err;
    }

    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      if (lead.campusId !== activeCampusId) {
        const err = new Error(`TENANT_ISOLATION_VIOLATION: Cannot modify lead belonging to foreign campus.`);
        err.code = 'TENANT_ISOLATION_VIOLATION';
        err.status = 403;
        throw err;
      }
    }

    const before = { ...lead };
    const oldStage = lead.stage;
    Object.assign(lead, updates, { updatedAt: new Date().toISOString() });

    // Track stage transition
    if (updates.stage && updates.stage !== oldStage) {
      this.addLeadTimelineEvent(context, {
        leadId: lead.id,
        campusId: lead.campusId,
        eventType: 'STAGE_TRANSITION',
        title: `Stage Changed: ${oldStage} -> ${updates.stage}`,
        description: updates.stageRemarks || `Admissions pipeline advanced to ${updates.stage}.`,
        metadata: { fromStage: oldStage, toStage: updates.stage }
      });
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: lead.campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'UPDATE_LEAD',
      entityName: 'Lead',
      entityId: lead.id,
      diffBefore: before,
      diffAfter: lead
    });

    return { ...lead };
  }

  getLeadTimeline(context, leadId) {
    // Validate lead access
    this.getLeadById(context, leadId);
    return this.leadTimelines
      .filter(t => t.leadId === leadId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  addLeadTimelineEvent(context, eventData) {
    const entry = {
      id: `tl-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      leadId: eventData.leadId,
      campusId: eventData.campusId || context.campusId || context.activeCampusId,
      eventType: eventData.eventType || 'NOTE',
      title: eventData.title,
      description: eventData.description || null,
      metadata: typeof eventData.metadata === 'object' ? JSON.stringify(eventData.metadata) : (eventData.metadata || null),
      authorId: context.userId || 'system',
      authorName: context.userName || context.userRole || 'System',
      createdAt: new Date().toISOString()
    };
    this.leadTimelines.unshift(entry);
    return entry;
  }

  getFollowUps(context, filters = {}) {
    let result = this.leadFollowUps;
    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(f => f.campusId === activeCampusId);
    }
    if (filters.counselorId) {
      result = result.filter(f => f.counselorId === filters.counselorId);
    }
    if (filters.status) {
      result = result.filter(f => f.status === filters.status);
    }
    if (filters.leadId) {
      result = result.filter(f => f.leadId === filters.leadId);
    }
    return result;
  }

  createFollowUp(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const newFollowUp = {
      id: `fu-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      leadId: data.leadId,
      campusId: targetCampusId,
      counselorId: data.counselorId || context.userId,
      title: data.title,
      dueDate: data.dueDate || new Date().toISOString(),
      type: data.type || 'CALL',
      status: 'PENDING',
      remarks: data.remarks || '',
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.leadFollowUps.unshift(newFollowUp);

    this.addLeadTimelineEvent(context, {
      leadId: data.leadId,
      campusId: targetCampusId,
      eventType: 'NOTE',
      title: `Follow-up Scheduled: ${newFollowUp.type}`,
      description: `${newFollowUp.title} due on ${newFollowUp.dueDate}.`,
      metadata: { followUpId: newFollowUp.id, type: newFollowUp.type }
    });

    return { ...newFollowUp };
  }

  updateFollowUp(context, followUpId, updates) {
    const fu = this.leadFollowUps.find(f => f.id === followUpId);
    if (!fu) throw new Error(`Follow-up ${followUpId} not found.`);

    Object.assign(fu, updates, { updatedAt: new Date().toISOString() });
    if (updates.status === 'COMPLETED' && !fu.completedAt) {
      fu.completedAt = new Date().toISOString();
      this.addLeadTimelineEvent(context, {
        leadId: fu.leadId,
        campusId: fu.campusId,
        eventType: 'CALL',
        title: `Follow-up Completed: ${fu.type}`,
        description: updates.remarks || fu.title,
        metadata: { followUpId: fu.id }
      });
    }
    return { ...fu };
  }

  getCampusVisits(context, filters = {}) {
    let result = this.campusVisits;
    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(v => v.campusId === activeCampusId);
    }
    if (filters.status) {
      result = result.filter(v => v.status === filters.status);
    }
    if (filters.leadId) {
      result = result.filter(v => v.leadId === filters.leadId);
    }
    return result;
  }

  scheduleCampusVisit(context, visitData) {
    const targetCampusId = visitData.campusId || context.campusId || context.activeCampusId;
    const newVisit = {
      id: `vis-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      leadId: visitData.leadId,
      campusId: targetCampusId,
      visitorName: visitData.visitorName,
      phone: visitData.phone,
      scheduledAt: visitData.scheduledAt,
      visitorCount: Number(visitData.visitorCount) || 2,
      assignedStaffId: visitData.assignedStaffId || null,
      guideName: visitData.guideName || 'Admissions Desk',
      status: 'SCHEDULED',
      feedback: null,
      rating: null,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.campusVisits.unshift(newVisit);

    // If associated with a lead, update stage to VISIT and log timeline
    if (visitData.leadId) {
      const lead = this.leads.find(l => l.id === visitData.leadId);
      if (lead) {
        lead.stage = 'VISIT';
        lead.updatedAt = new Date().toISOString();
        this.addLeadTimelineEvent(context, {
          leadId: lead.id,
          campusId: targetCampusId,
          eventType: 'VISIT_SCHEDULED',
          title: 'Campus Tour Scheduled',
          description: `Campus visit booked for ${newVisit.visitorName} (${newVisit.visitorCount} guests) on ${newVisit.scheduledAt}.`,
          metadata: { visitId: newVisit.id, scheduledAt: newVisit.scheduledAt }
        });
      }
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'SCHEDULE_CAMPUS_VISIT',
      entityName: 'CampusVisit',
      entityId: newVisit.id,
      diffBefore: null,
      diffAfter: newVisit
    });

    return { ...newVisit };
  }

  updateCampusVisit(context, visitId, updates) {
    const visit = this.campusVisits.find(v => v.id === visitId);
    if (!visit) throw new Error(`Campus visit ${visitId} not found.`);

    const before = { ...visit };
    Object.assign(visit, updates, { updatedAt: new Date().toISOString() });

    if (updates.status === 'COMPLETED') {
      visit.completedAt = new Date().toISOString();
      if (visit.leadId) {
        this.addLeadTimelineEvent(context, {
          leadId: visit.leadId,
          campusId: visit.campusId,
          eventType: 'VISIT_COMPLETED',
          title: 'Campus Tour Completed',
          description: visit.feedback || 'Family completed campus exploration walk.',
          metadata: { rating: visit.rating }
        });
      }
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: visit.campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'UPDATE_CAMPUS_VISIT',
      entityName: 'CampusVisit',
      entityId: visit.id,
      diffBefore: before,
      diffAfter: visit
    });

    return { ...visit };
  }

  getApplications(context, filters = {}) {
    let result = this.applications;
    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(a => a.campusId === activeCampusId);
    }
    if (filters.status) {
      result = result.filter(a => a.status === filters.status);
    }
    if (filters.leadId) {
      result = result.filter(a => a.leadId === filters.leadId);
    }
    return result;
  }

  getApplicationById(context, applicationId) {
    const app = this.applications.find(a => a.id === applicationId);
    if (!app) return null;
    return { ...app };
  }

  createApplication(context, appData) {
    const targetCampusId = appData.campusId || context.campusId || context.activeCampusId;
    const year = new Date().getFullYear();
    const appNumber = appData.applicationNumber || `APP-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApp = {
      id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      leadId: appData.leadId || null,
      applicationNumber: appNumber,
      academicYearId: appData.academicYearId || 'ay-2026-2027',
      gradeId: appData.gradeId || 'grd-5',
      submissionDate: new Date().toISOString(),
      status: appData.status || 'SUBMITTED',
      candidateDob: appData.candidateDob || null,
      candidateGender: appData.candidateGender || 'MALE',
      previousSchool: appData.previousSchool || '',
      siblingInfo: appData.siblingInfo || '',
      emergencyPhone: appData.emergencyPhone || '',
      address: appData.address || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.applications.unshift(newApp);

    if (appData.leadId) {
      const lead = this.leads.find(l => l.id === appData.leadId);
      if (lead) {
        lead.stage = 'APPLICATION';
        lead.updatedAt = new Date().toISOString();
        this.addLeadTimelineEvent(context, {
          leadId: lead.id,
          campusId: targetCampusId,
          eventType: 'APPLICATION_SUBMITTED',
          title: `Application Registered: ${appNumber}`,
          description: `Formal application filed for Grade ${appData.targetGrade || newApp.gradeId}.`,
          metadata: { applicationId: newApp.id, applicationNumber: appNumber }
        });
      }
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'CREATE_APPLICATION',
      entityName: 'Application',
      entityId: newApp.id,
      diffBefore: null,
      diffAfter: newApp
    });

    return { ...newApp };
  }

  updateApplication(context, applicationId, updates) {
    const app = this.applications.find(a => a.id === applicationId);
    if (!app) throw new Error(`Application ${applicationId} not found.`);

    const before = { ...app };
    Object.assign(app, updates, { updatedAt: new Date().toISOString() });

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: app.campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'UPDATE_APPLICATION',
      entityName: 'Application',
      entityId: app.id,
      diffBefore: before,
      diffAfter: app
    });

    return { ...app };
  }

  getApplicationDocuments(context, applicationId) {
    return this.applicationDocuments.filter(d => d.applicationId === applicationId);
  }

  addApplicationDocument(context, docData) {
    const newDoc = {
      id: `app-doc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      applicationId: docData.applicationId,
      campusId: docData.campusId || context.campusId || context.activeCampusId,
      documentType: docData.documentType,
      fileName: docData.fileName,
      fileUrl: docData.fileUrl || `https://vault.vedictree.edu.in/docs/${docData.fileName}`,
      verificationStatus: 'PENDING',
      verifiedBy: null,
      verifiedAt: null,
      remarks: null,
      createdAt: new Date().toISOString()
    };
    this.applicationDocuments.push(newDoc);
    return { ...newDoc };
  }

  verifyApplicationDocument(context, docId, status, remarks) {
    const doc = this.applicationDocuments.find(d => d.id === docId);
    if (!doc) throw new Error(`Application document ${docId} not found.`);

    const before = { ...doc };
    doc.verificationStatus = status; // VERIFIED, REJECTED
    doc.verifiedBy = context.userId;
    doc.verifiedAt = new Date().toISOString();
    doc.remarks = remarks || null;

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: doc.campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: status === 'VERIFIED' ? 'VERIFY_DOCUMENT' : 'REJECT_DOCUMENT',
      entityName: 'ApplicationDocument',
      entityId: doc.id,
      diffBefore: before,
      diffAfter: doc
    });

    return { ...doc };
  }

  getEntranceAssessments(context, applicationId) {
    return this.entranceAssessments.filter(a => !applicationId || a.applicationId === applicationId);
  }

  recordEntranceAssessment(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const subjects = typeof data.subjectsJson === 'string' ? JSON.parse(data.subjectsJson) : (data.subjects || []);
    
    let totalMarks = 0;
    let maxMarks = 0;
    for (const sub of subjects) {
      totalMarks += Number(sub.marks) || 0;
      maxMarks += Number(sub.maxMarks) || 0;
    }
    const percentage = maxMarks > 0 ? Number(((totalMarks / maxMarks) * 100).toFixed(1)) : 0;

    const newAssessment = {
      id: `asmt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      applicationId: data.applicationId,
      leadId: data.leadId || null,
      campusId: targetCampusId,
      assessmentDate: data.assessmentDate || new Date().toISOString(),
      evaluatorId: context.userId || 'evaluator-1',
      evaluatorName: data.evaluatorName || context.userName || 'Faculty Evaluator',
      subjectsJson: JSON.stringify(subjects),
      totalMarks,
      maxMarks,
      percentage,
      remarks: data.remarks || '',
      result: data.result || (percentage >= 50 ? 'RECOMMENDED' : 'PROVISIONAL'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.entranceAssessments.unshift(newAssessment);

    if (data.leadId) {
      const lead = this.leads.find(l => l.id === data.leadId);
      if (lead) {
        lead.stage = 'ASSESSMENT';
        lead.updatedAt = new Date().toISOString();
        this.addLeadTimelineEvent(context, {
          leadId: lead.id,
          campusId: targetCampusId,
          eventType: 'ASSESSMENT_EVALUATED',
          title: `Assessment Completed: ${newAssessment.result}`,
          description: `Score: ${totalMarks}/${maxMarks} (${percentage}%). ${newAssessment.remarks}`,
          metadata: { totalMarks, maxMarks, percentage, result: newAssessment.result }
        });
      }
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'RECORD_ASSESSMENT',
      entityName: 'EntranceAssessment',
      entityId: newAssessment.id,
      diffBefore: null,
      diffAfter: newAssessment
    });

    return { ...newAssessment };
  }

  getAdmissionOffers(context, filters = {}) {
    let result = this.admissionOffers;
    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(o => o.campusId === activeCampusId);
    }
    if (filters.status) {
      result = result.filter(o => o.status === filters.status);
    }
    return result;
  }

  issueAdmissionOffer(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const year = new Date().getFullYear();
    const offerNumber = `OFR-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOffer = {
      id: `ofr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      applicationId: data.applicationId,
      leadId: data.leadId || null,
      campusId: targetCampusId,
      offerNumber,
      validUntil: data.validUntil || new Date(Date.now() + 14 * 86400000).toISOString(),
      offeredGradeId: data.offeredGradeId || 'grd-5',
      feeStructureId: data.feeStructureId || 'fs-standard',
      terms: data.terms || 'Seat reserved subject to fee payment before expiry.',
      status: 'ISSUED',
      issuedBy: context.userId,
      issuedAt: new Date().toISOString(),
      acceptedAt: null,
      createdAt: new Date().toISOString()
    };

    this.admissionOffers.unshift(newOffer);

    if (data.leadId) {
      const lead = this.leads.find(l => l.id === data.leadId);
      if (lead) {
        lead.stage = 'OFFER';
        lead.updatedAt = new Date().toISOString();
        this.addLeadTimelineEvent(context, {
          leadId: lead.id,
          campusId: targetCampusId,
          eventType: 'OFFER_ISSUED',
          title: `Admission Offer Issued: ${offerNumber}`,
          description: `Formal seat offer granted for Grade ${newOffer.offeredGradeId}. Valid until ${newOffer.validUntil.split('T')[0]}.`,
          metadata: { offerId: newOffer.id, offerNumber }
        });
      }
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'ISSUE_ADMISSION_OFFER',
      entityName: 'AdmissionOffer',
      entityId: newOffer.id,
      diffBefore: null,
      diffAfter: newOffer
    });

    return { ...newOffer };
  }

  updateAdmissionOfferStatus(context, offerId, status) {
    const offer = this.admissionOffers.find(o => o.id === offerId);
    if (!offer) throw new Error(`Admission offer ${offerId} not found.`);

    const before = { ...offer };
    offer.status = status;
    if (status === 'ACCEPTED') {
      offer.acceptedAt = new Date().toISOString();
      if (offer.leadId) {
        const lead = this.leads.find(l => l.id === offer.leadId);
        if (lead) {
          lead.stage = 'ADMISSION';
          lead.updatedAt = new Date().toISOString();
        }
      }
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: offer.campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'UPDATE_ADMISSION_OFFER',
      entityName: 'AdmissionOffer',
      entityId: offer.id,
      diffBefore: before,
      diffAfter: offer
    });

    return { ...offer };
  }

  getAdmissionRecords(context, filters = {}) {
    let result = this.admissionRecords;
    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(a => a.campusId === activeCampusId);
    }
    return result;
  }

  confirmAdmissionAndPayFee(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const year = new Date().getFullYear();
    const admissionNo = data.admissionNumber || `VT-${year}-${Math.floor(100 + Math.random() * 900)}`;
    const receiptNo = `RCP-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      id: `adm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      applicationId: data.applicationId,
      leadId: data.leadId || null,
      campusId: targetCampusId,
      admissionNumber: admissionNo,
      admissionDate: new Date().toISOString(),
      admissionFeePaid: Number(data.admissionFeePaid) || 25000.0,
      feeReceiptNumber: receiptNo,
      paymentMethod: data.paymentMethod || 'UPI',
      status: 'CONFIRMED',
      studentId: data.studentId || null, // Linked student created in Student Core
      admittedBy: context.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.admissionRecords.unshift(newRecord);

    if (data.leadId) {
      const lead = this.leads.find(l => l.id === data.leadId);
      if (lead) {
        lead.stage = 'STUDENT';
        lead.updatedAt = new Date().toISOString();
        this.addLeadTimelineEvent(context, {
          leadId: lead.id,
          campusId: targetCampusId,
          eventType: 'ADMISSION_CONFIRMED',
          title: `Admission Confirmed: ${admissionNo}`,
          description: `Fee payment of INR ${newRecord.admissionFeePaid} cleared via ${newRecord.paymentMethod}. Receipt: ${receiptNo}.`,
          metadata: { admissionNumber: admissionNo, receiptNumber: receiptNo, studentId: data.studentId }
        });
      }
    }

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'CONFIRM_ADMISSION',
      entityName: 'AdmissionRecord',
      entityId: newRecord.id,
      diffBefore: null,
      diffAfter: newRecord
    });

    return { ...newRecord };
  }

  getCommunicationLogs(context, filters = {}) {
    let result = this.communicationLogs;
    if (context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(c => c.campusId === activeCampusId);
    }
    if (filters.leadId) {
      result = result.filter(c => c.leadId === filters.leadId);
    }
    if (filters.channel) {
      result = result.filter(c => c.channel === filters.channel);
    }
    return result;
  }

  logCommunication(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const newComm = {
      id: `comm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      leadId: data.leadId || null,
      recipientPhone: data.recipientPhone,
      recipientName: data.recipientName,
      channel: data.channel || 'WHATSAPP',
      provider: data.provider || 'MOCK',
      templateId: data.templateId || null,
      messageContent: data.messageContent,
      status: data.status || 'SENT',
      providerMessageId: data.providerMessageId || `msg-${Date.now()}`,
      errorMessage: data.errorMessage || null,
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    this.communicationLogs.unshift(newComm);

    if (data.leadId) {
      this.addLeadTimelineEvent(context, {
        leadId: data.leadId,
        campusId: targetCampusId,
        eventType: 'WHATSAPP_SENT',
        title: `WhatsApp Dispatched: ${data.templateId || 'Direct Message'}`,
        description: data.messageContent.slice(0, 100) + (data.messageContent.length > 100 ? '...' : ''),
        metadata: { provider: newComm.provider, providerMessageId: newComm.providerMessageId }
      });
    }

    return { ...newComm };
  }

  getWhatsAppTemplates() {
    return this.whatsappTemplates;
  }

  // ==========================================
  // MODULE 04: FINANCE + FEES METHODS
  // ==========================================

  getFeeStructures(context, filters = {}) {
    let result = this.feeStructures.filter(fs => !fs.deletedAt);
    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(fs => fs.campusId === activeCampusId);
    } else if (filters.campusId) {
      result = result.filter(fs => fs.campusId === filters.campusId);
    }
    if (filters.gradeId) {
      result = result.filter(fs => fs.gradeId === filters.gradeId);
    }
    if (filters.academicYearId) {
      result = result.filter(fs => fs.academicYearId === filters.academicYearId);
    }
    return result;
  }

  createFeeStructure(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const items = data.items || [];
    const totalAmount = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    const newStructure = {
      id: `fs-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      academicYearId: data.academicYearId || 'ay-2026-2027',
      gradeId: data.gradeId,
      name: data.name,
      code: data.code || `FS-${Date.now()}`,
      frequency: data.frequency || 'ANNUAL',
      currency: data.currency || 'INR',
      totalAmount,
      isActive: data.isActive !== undefined ? data.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      items: items.map((item, idx) => ({
        id: `fsi-${Date.now()}-${idx}`,
        component: item.component,
        title: item.title,
        amount: Number(item.amount) || 0,
        isOptional: Boolean(item.isOptional),
        orderIndex: idx + 1
      }))
    };

    this.feeStructures.unshift(newStructure);

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'CREATE_FEE_STRUCTURE',
      entityName: 'FeeStructure',
      entityId: newStructure.id,
      diffBefore: null,
      diffAfter: newStructure
    });

    return { ...newStructure };
  }

  getDiscountRules(context, filters = {}) {
    let result = this.discountRules;
    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(d => d.campusId === activeCampusId);
    } else if (filters.campusId) {
      result = result.filter(d => d.campusId === filters.campusId);
    }
    if (filters.isActive !== undefined) {
      result = result.filter(d => d.isActive === filters.isActive);
    }
    return result;
  }

  createDiscountRule(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const newRule = {
      id: `disc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      name: data.name,
      code: data.code || `DISC-${Date.now()}`,
      type: data.type || 'PERCENTAGE',
      criteria: data.criteria || 'SIBLING',
      value: Number(data.value) || 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.discountRules.unshift(newRule);

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'CREATE_DISCOUNT_RULE',
      entityName: 'DiscountRule',
      entityId: newRule.id,
      diffBefore: null,
      diffAfter: newRule
    });

    return { ...newRule };
  }

  getScholarships(context, studentId = null) {
    let result = this.scholarships;
    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(s => s.campusId === activeCampusId);
    }
    if (studentId) {
      result = result.filter(s => s.studentId === studentId);
    }
    return result;
  }

  grantScholarship(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const newScholarship = {
      id: `sch-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      studentId: data.studentId,
      academicYearId: data.academicYearId || 'ay-2026-2027',
      name: data.name,
      sponsor: data.sponsor,
      amount: Number(data.amount) || 0,
      currency: data.currency || 'INR',
      status: 'ACTIVE',
      grantedDate: new Date().toISOString(),
      expiryDate: data.expiryDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.scholarships.unshift(newScholarship);

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'GRANT_SCHOLARSHIP',
      entityName: 'Scholarship',
      entityId: newScholarship.id,
      diffBefore: null,
      diffAfter: newScholarship
    });

    return { ...newScholarship };
  }

  getInvoices(context, filters = {}) {
    let result = this.invoices.filter(i => !i.deletedAt);
    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(i => i.campusId === activeCampusId);
    } else if (filters.campusId) {
      result = result.filter(i => i.campusId === filters.campusId);
    }

    if (filters.studentId) {
      result = result.filter(i => i.studentId === filters.studentId);
    }
    if (filters.status) {
      result = result.filter(i => i.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(i =>
        i.invoiceNumber.toLowerCase().includes(q) ||
        (i.studentName && i.studentName.toLowerCase().includes(q)) ||
        (i.admissionNumber && i.admissionNumber.toLowerCase().includes(q))
      );
    }
    return result;
  }

  getInvoiceById(context, invoiceId) {
    const invoice = this.invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;

    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      if (invoice.campusId !== activeCampusId) {
        const err = new Error(`CROSS_TENANT_ACCESS_DENIED: Access to invoice ${invoiceId} in campus ${invoice.campusId} is forbidden for active campus ${activeCampusId}.`);
        err.code = 'TENANT_ISOLATION_VIOLATION';
        err.status = 403;
        throw err;
      }
    }
    return { ...invoice };
  }

  createInvoice(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    if (!targetCampusId) {
      throw new Error('VALIDATION_ERROR: campusId is required to generate an invoice.');
    }

    const student = this.students.find(s => s.id === data.studentId);
    const invoiceSeq = this.invoices.length + 1;
    const invoiceNumber = data.invoiceNumber || `INV-2026-${String(invoiceSeq).padStart(4, '0')}`;

    const lineItems = (data.lineItems || []).map((li, idx) => {
      const amount = Number(li.amount) || 0;
      const discountAmount = Number(li.discountAmount) || 0;
      return {
        id: `ili-${Date.now()}-${idx}`,
        component: li.component || 'TUITION',
        title: li.title || 'Fee Component',
        amount,
        discountAmount,
        payableAmount: Math.max(0, amount - discountAmount)
      };
    });

    const subtotal = lineItems.reduce((sum, li) => sum + li.amount, 0);
    const discountTotal = lineItems.reduce((sum, li) => sum + li.discountAmount, 0) + (Number(data.additionalDiscount) || 0);
    const lateFeeTotal = Number(data.lateFeeTotal) || 0;
    const totalAmount = Math.max(0, subtotal - discountTotal + lateFeeTotal);
    const paidAmount = 0.0;
    const balanceAmount = totalAmount;

    const newInvoice = {
      id: `inv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      invoiceNumber,
      studentId: data.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : (data.studentName || 'Student'),
      admissionNumber: student ? student.admissionNumber : (data.admissionNumber || 'N/A'),
      gradeName: student?.gradeName || data.gradeName || 'Standard',
      academicYearId: data.academicYearId || 'ay-2026-2027',
      issueDate: data.issueDate || new Date().toISOString(),
      dueDate: data.dueDate || new Date(Date.now() + 15 * 86400000).toISOString(),
      subtotal,
      discountTotal,
      lateFeeTotal,
      totalAmount,
      paidAmount,
      balanceAmount,
      currency: data.currency || 'INR',
      status: balanceAmount === 0 ? 'PAID' : 'UNPAID',
      notes: data.notes || null,
      lineItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null
    };

    this.invoices.unshift(newInvoice);

    // Record Double-Entry Accounting Journal Entry:
    // Debit: Student Accounts Receivable (Asset - 1030)
    // Credit: Tuition / Fee Revenue (Revenue - 4010)
    this.recordLedgerEntry(context, {
      campusId: targetCampusId,
      transactionDate: newInvoice.issueDate,
      referenceType: 'INVOICE',
      referenceId: newInvoice.id,
      debitAccountCode: '1030', // Receivables Dr
      creditAccountCode: '4010', // Fee Revenue Cr
      amount: totalAmount,
      currency: newInvoice.currency,
      narration: `Invoice ${invoiceNumber} issued for ${newInvoice.studentName}`
    });

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'CREATE_INVOICE',
      entityName: 'Invoice',
      entityId: newInvoice.id,
      diffBefore: null,
      diffAfter: { invoiceNumber, totalAmount, studentId: data.studentId }
    });

    return { ...newInvoice };
  }

  getPayments(context, filters = {}) {
    let result = this.payments;
    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(p => p.campusId === activeCampusId);
    } else if (filters.campusId) {
      result = result.filter(p => p.campusId === filters.campusId);
    }
    if (filters.invoiceId) {
      result = result.filter(p => p.invoiceId === filters.invoiceId);
    }
    if (filters.studentId) {
      result = result.filter(p => p.studentId === filters.studentId);
    }
    return result;
  }

  recordPayment(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const invoice = this.invoices.find(i => i.id === data.invoiceId);
    if (!invoice) {
      throw new Error(`INVOICE_NOT_FOUND: Invoice ${data.invoiceId} does not exist.`);
    }

    if (context && context.userRole !== 'HQ_ADMIN' && invoice.campusId !== targetCampusId) {
      const err = new Error(`CROSS_TENANT_ACCESS_DENIED: Cannot record payment for invoice in campus ${invoice.campusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    const payAmount = Number(data.amount);
    if (isNaN(payAmount) || payAmount <= 0) {
      throw new Error('VALIDATION_ERROR: Payment amount must be greater than zero.');
    }

    if (payAmount > invoice.balanceAmount + 0.001) {
      throw new Error(`OVERPAYMENT_ERROR: Payment amount (${payAmount}) exceeds invoice balance (${invoice.balanceAmount}).`);
    }

    const paySeq = this.payments.length + 1;
    const paymentNumber = data.paymentNumber || `PAY-2026-${String(paySeq).padStart(4, '0')}`;
    const paymentId = `pay-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newPayment = {
      id: paymentId,
      campusId: targetCampusId,
      paymentNumber,
      invoiceId: invoice.id,
      studentId: invoice.studentId,
      studentName: invoice.studentName,
      amount: payAmount,
      currency: data.currency || invoice.currency || 'INR',
      method: data.method || 'UPI',
      status: 'SUCCESS',
      transactionRef: data.transactionRef || `TXN-${Date.now()}`,
      gatewayProvider: data.gatewayProvider || (data.method === 'UPI' ? 'RAZORPAY' : 'MANUAL'),
      gatewayOrderId: data.gatewayOrderId || null,
      gatewayPaymentId: data.gatewayPaymentId || null,
      payerName: data.payerName || invoice.studentName,
      payerPhone: data.payerPhone || null,
      paidAt: data.paidAt || new Date().toISOString(),
      remarks: data.remarks || 'Settlement processed at POS cashier counter',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.payments.unshift(newPayment);

    // Update invoice balance and status
    const previousInvoiceState = { ...invoice };
    invoice.paidAmount = Number((invoice.paidAmount + payAmount).toFixed(2));
    invoice.balanceAmount = Number(Math.max(0, invoice.totalAmount - invoice.paidAmount).toFixed(2));
    invoice.status = invoice.balanceAmount <= 0.01 ? 'PAID' : 'PARTIALLY_PAID';
    invoice.updatedAt = new Date().toISOString();

    // Auto-generate immutable Receipt
    const receiptSeq = this.receipts.length + 1;
    const receiptNumber = `RCP-2026-${String(receiptSeq).padStart(4, '0')}`;
    const newReceipt = {
      id: `rcp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      receiptNumber,
      paymentId: newPayment.id,
      invoiceId: invoice.id,
      studentId: invoice.studentId,
      studentName: invoice.studentName,
      admissionNumber: invoice.admissionNumber,
      gradeName: invoice.gradeName,
      amount: payAmount,
      currency: newPayment.currency,
      cashierId: context.userId || 'usr-cashier',
      cashierName: context.userName || 'Accountant / Cashier',
      paymentMethod: newPayment.method,
      breakdownJson: JSON.stringify(invoice.lineItems.map(li => ({
        component: li.component,
        settled: Math.min(payAmount, li.payableAmount)
      }))),
      issuedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    this.receipts.unshift(newReceipt);

    // Record Double-Entry Accounting Journal Entry:
    // Debit: Bank Clearing / Cash (Asset - 1020/1010)
    // Credit: Student Accounts Receivable (Asset - 1030)
    const debitAccount = newPayment.method === 'CASH' ? '1010' : '1020';
    this.recordLedgerEntry(context, {
      campusId: targetCampusId,
      transactionDate: newPayment.paidAt,
      referenceType: 'PAYMENT',
      referenceId: newPayment.id,
      debitAccountCode: debitAccount, // Cash/Bank Dr
      creditAccountCode: '1030', // Receivables Cr
      amount: payAmount,
      currency: newPayment.currency,
      narration: `Payment ${paymentNumber} received for ${invoice.invoiceNumber}. Receipt: ${receiptNumber}`
    });

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'COLLECT_PAYMENT',
      entityName: 'Payment',
      entityId: newPayment.id,
      diffBefore: previousInvoiceState,
      diffAfter: { payment: newPayment, invoice: invoice, receipt: newReceipt }
    });

    return {
      payment: newPayment,
      receipt: newReceipt,
      invoice: { ...invoice }
    };
  }

  getReceipts(context, filters = {}) {
    let result = this.receipts;
    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(r => r.campusId === activeCampusId);
    } else if (filters.campusId) {
      result = result.filter(r => r.campusId === filters.campusId);
    }
    if (filters.studentId) {
      result = result.filter(r => r.studentId === filters.studentId);
    }
    if (filters.paymentId) {
      result = result.filter(r => r.paymentId === filters.paymentId);
    }
    return result;
  }

  getReceiptById(context, receiptId) {
    const receipt = this.receipts.find(r => r.id === receiptId || r.receiptNumber === receiptId);
    if (!receipt) return null;

    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      if (receipt.campusId !== activeCampusId) {
        const err = new Error(`CROSS_TENANT_ACCESS_DENIED: Access to receipt ${receiptId} in campus ${receipt.campusId} is forbidden.`);
        err.code = 'TENANT_ISOLATION_VIOLATION';
        err.status = 403;
        throw err;
      }
    }
    return { ...receipt };
  }

  getRefunds(context, filters = {}) {
    let result = this.refunds;
    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(rf => rf.campusId === activeCampusId);
    } else if (filters.campusId) {
      result = result.filter(rf => rf.campusId === filters.campusId);
    }
    return result;
  }

  processRefund(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const payment = this.payments.find(p => p.id === data.paymentId);
    if (!payment) {
      throw new Error(`PAYMENT_NOT_FOUND: Payment ${data.paymentId} does not exist.`);
    }

    if (context && context.userRole !== 'HQ_ADMIN' && payment.campusId !== targetCampusId) {
      const err = new Error(`CROSS_TENANT_ACCESS_DENIED: Cannot refund payment from campus ${payment.campusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    const refundAmount = Number(data.amount);
    if (isNaN(refundAmount) || refundAmount <= 0) {
      throw new Error('VALIDATION_ERROR: Refund amount must be greater than zero.');
    }

    const existingRefunds = this.refunds
      .filter(rf => rf.paymentId === payment.id && rf.status === 'PROCESSED')
      .reduce((sum, rf) => sum + rf.amount, 0);

    if (refundAmount > payment.amount - existingRefunds) {
      throw new Error(`REFUND_EXCEEDS_PAYMENT: Refund of ${refundAmount} exceeds allowable refundable balance of ${payment.amount - existingRefunds}.`);
    }

    const refSeq = this.refunds.length + 1;
    const refundNumber = `REF-2026-${String(refSeq).padStart(4, '0')}`;

    const newRefund = {
      id: `ref-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      refundNumber,
      paymentId: payment.id,
      invoiceId: payment.invoiceId,
      studentId: payment.studentId,
      amount: refundAmount,
      currency: payment.currency,
      reason: data.reason || 'Parent withdrawal / fee component adjustment',
      status: 'PROCESSED',
      approvedBy: context.userId || 'usr-principal',
      approverRemarks: data.approverRemarks || 'Approved according to school concession policy',
      gatewayRefundId: data.gatewayRefundId || `rfnd_${Date.now()}`,
      refundedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    this.refunds.unshift(newRefund);

    // Adjust invoice balance back up
    const invoice = this.invoices.find(i => i.id === payment.invoiceId);
    if (invoice) {
      invoice.paidAmount = Number(Math.max(0, invoice.paidAmount - refundAmount).toFixed(2));
      invoice.balanceAmount = Number((invoice.totalAmount - invoice.paidAmount).toFixed(2));
      invoice.status = invoice.paidAmount === 0 ? 'UNPAID' : 'PARTIALLY_PAID';
      invoice.updatedAt = new Date().toISOString();
    }

    // Ledger Compensating Double-Entry:
    // Debit: Student Accounts Receivable (Asset - 1030) or Fee Income Reversal
    // Credit: Bank Clearing (Asset - 1020)
    this.recordLedgerEntry(context, {
      campusId: targetCampusId,
      transactionDate: newRefund.refundedAt,
      referenceType: 'REFUND',
      referenceId: newRefund.id,
      debitAccountCode: '1030', // Receivables reinstated Dr
      creditAccountCode: payment.method === 'CASH' ? '1010' : '1020', // Cash/Bank Cr
      amount: refundAmount,
      currency: newRefund.currency,
      narration: `Refund ${refundNumber} for ${payment.paymentNumber} (${newRefund.reason})`
    });

    this.recordAudit({
      organizationId: context.organizationId || this.organization.id,
      campusId: targetCampusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'PROCESS_REFUND',
      entityName: 'Refund',
      entityId: newRefund.id,
      diffBefore: null,
      diffAfter: newRefund
    });

    return { ...newRefund };
  }

  getLedgerAccounts(context) {
    let result = this.ledgerAccounts;
    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(la => la.campusId === activeCampusId);
    }
    return result;
  }

  getLedgerEntries(context, filters = {}) {
    let result = this.ledgerEntries;
    if (context && context.userRole !== 'HQ_ADMIN') {
      const activeCampusId = context.campusId || context.activeCampusId;
      result = result.filter(le => le.campusId === activeCampusId);
    } else if (filters.campusId) {
      result = result.filter(le => le.campusId === filters.campusId);
    }
    if (filters.referenceType) {
      result = result.filter(le => le.referenceType === filters.referenceType);
    }
    if (filters.referenceId) {
      result = result.filter(le => le.referenceId === filters.referenceId);
    }
    return result;
  }

  recordLedgerEntry(context, data) {
    const targetCampusId = data.campusId || context.campusId || context.activeCampusId;
    const amount = Number(data.amount);
    if (isNaN(amount) || amount <= 0) {
      throw new Error('LEDGER_VALIDATION_ERROR: Ledger entry amount must be positive.');
    }

    const debitAcc = this.ledgerAccounts.find(la => la.campusId === targetCampusId && la.code === data.debitAccountCode);
    const creditAcc = this.ledgerAccounts.find(la => la.campusId === targetCampusId && la.code === data.creditAccountCode);

    // Update balances in chart of accounts if registered
    if (debitAcc) {
      // Normal balance: Asset & Expense increase with Debit; Liability & Revenue decrease
      if (debitAcc.type === 'ASSET' || debitAcc.type === 'EXPENSE' || debitAcc.type === 'CONTRA_REVENUE') {
        debitAcc.balance = Number((debitAcc.balance + amount).toFixed(2));
      } else {
        debitAcc.balance = Number((debitAcc.balance - amount).toFixed(2));
      }
      debitAcc.updatedAt = new Date().toISOString();
    }

    if (creditAcc) {
      // Normal balance: Liability & Revenue increase with Credit; Asset & Expense decrease
      if (creditAcc.type === 'LIABILITY' || creditAcc.type === 'REVENUE' || creditAcc.type === 'EQUITY') {
        creditAcc.balance = Number((creditAcc.balance + amount).toFixed(2));
      } else {
        creditAcc.balance = Number((creditAcc.balance - amount).toFixed(2));
      }
      creditAcc.updatedAt = new Date().toISOString();
    }

    const jrnSeq = this.ledgerEntries.length + 1;
    const entryNumber = `JRN-2026-${String(jrnSeq).padStart(4, '0')}`;

    const newEntry = {
      id: `jrn-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId: targetCampusId,
      entryNumber,
      transactionDate: data.transactionDate || new Date().toISOString(),
      referenceType: data.referenceType || 'JOURNAL',
      referenceId: data.referenceId || `REF-${Date.now()}`,
      debitAccountCode: data.debitAccountCode,
      creditAccountCode: data.creditAccountCode,
      amount,
      currency: data.currency || 'INR',
      narration: data.narration || 'Institutional double-entry ledger settlement',
      createdBy: context.userId || 'SYSTEM',
      createdAt: new Date().toISOString()
    };

    this.ledgerEntries.unshift(newEntry);
    return { ...newEntry };
  }

  getOutstandingAging(context, campusId = null) {
    const targetCampusId = campusId || (context && context.userRole !== 'HQ_ADMIN' ? (context.campusId || context.activeCampusId) : null);
    let invoices = this.invoices.filter(i => !i.deletedAt && i.balanceAmount > 0);
    if (targetCampusId) {
      invoices = invoices.filter(i => i.campusId === targetCampusId);
    }

    const now = new Date();
    const buckets = {
      current: { count: 0, totalAmount: 0, invoices: [] },    // Not yet due
      days1To30: { count: 0, totalAmount: 0, invoices: [] },  // 1-30 days overdue
      days31To60: { count: 0, totalAmount: 0, invoices: [] }, // 31-60 days overdue
      days60Plus: { count: 0, totalAmount: 0, invoices: [] }  // 60+ days overdue
    };

    let grandTotalOutstanding = 0;

    for (const inv of invoices) {
      const dueDate = new Date(inv.dueDate);
      const diffTime = now.getTime() - dueDate.getTime();
      const overdueDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const bal = inv.balanceAmount;
      grandTotalOutstanding += bal;

      const summaryItem = {
        invoiceId: inv.id,
        invoiceNumber: inv.invoiceNumber,
        studentName: inv.studentName,
        admissionNumber: inv.admissionNumber,
        gradeName: inv.gradeName,
        balanceAmount: bal,
        currency: inv.currency,
        dueDate: inv.dueDate,
        overdueDays: Math.max(0, overdueDays)
      };

      if (overdueDays <= 0) {
        buckets.current.count++;
        buckets.current.totalAmount += bal;
        buckets.current.invoices.push(summaryItem);
      } else if (overdueDays <= 30) {
        buckets.days1To30.count++;
        buckets.days1To30.totalAmount += bal;
        buckets.days1To30.invoices.push(summaryItem);
      } else if (overdueDays <= 60) {
        buckets.days31To60.count++;
        buckets.days31To60.totalAmount += bal;
        buckets.days31To60.invoices.push(summaryItem);
      } else {
        buckets.days60Plus.count++;
        buckets.days60Plus.totalAmount += bal;
        buckets.days60Plus.invoices.push(summaryItem);
      }
    }

    // Round amounts
    buckets.current.totalAmount = Number(buckets.current.totalAmount.toFixed(2));
    buckets.days1To30.totalAmount = Number(buckets.days1To30.totalAmount.toFixed(2));
    buckets.days31To60.totalAmount = Number(buckets.days31To60.totalAmount.toFixed(2));
    buckets.days60Plus.totalAmount = Number(buckets.days60Plus.totalAmount.toFixed(2));

    return {
      campusId: targetCampusId || 'ALL',
      grandTotalOutstanding: Number(grandTotalOutstanding.toFixed(2)),
      buckets
    };
  }

  // ==========================================
  // MODULE 05: COMMUNICATION CENTER METHODS
  // ==========================================

  // --- TEMPLATES ---
  getCommunicationTemplates(context, filters = {}) {
    let result = [...this.communicationTemplates];
    if (filters.channel) {
      result = result.filter(t => t.channel.toUpperCase() === filters.channel.toUpperCase());
    }
    if (filters.category) {
      result = result.filter(t => t.category.toUpperCase() === filters.category.toUpperCase());
    }
    if (filters.status) {
      result = result.filter(t => t.status === filters.status);
    }
    return result;
  }

  getCommunicationTemplateById(context, id) {
    return this.communicationTemplates.find(t => t.id === id) || null;
  }

  createCommunicationTemplate(context, data) {
    const template = {
      id: `tpl-${data.channel.toLowerCase()}-${Date.now()}`,
      tenantId: context.tenantId || this.organization.id,
      channel: data.channel.toUpperCase(),
      name: data.name,
      category: data.category || 'TRANSACTIONAL',
      subject: data.subject || null,
      body: data.body,
      variablesJson: typeof data.variables === 'string' ? data.variables : JSON.stringify(data.variables || []),
      status: data.status || 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.communicationTemplates.push(template);
    return template;
  }

  updateCommunicationTemplate(context, id, updates) {
    const template = this.getCommunicationTemplateById(context, id);
    if (!template) throw new Error(`Template ${id} not found.`);
    if (updates.variables) {
      updates.variablesJson = typeof updates.variables === 'string' ? updates.variables : JSON.stringify(updates.variables);
      delete updates.variables;
    }
    Object.assign(template, updates, { updatedAt: new Date().toISOString() });
    return template;
  }

  // --- MESSAGES & DELIVERY STATUS ---
  getCommunicationMessages(context, filters = {}) {
    const targetCampusId = context.campusId || context.activeCampusId;
    let list = [...this.communicationMessages];

    if (context.role !== 'HQ_ADMIN' && targetCampusId) {
      list = list.filter(m => m.campusId === targetCampusId);
    } else if (filters.campusId) {
      list = list.filter(m => m.campusId === filters.campusId);
    }

    if (filters.channel) {
      list = list.filter(m => m.channel.toUpperCase() === filters.channel.toUpperCase());
    }
    if (filters.status) {
      list = list.filter(m => m.status.toUpperCase() === filters.status.toUpperCase());
    }
    if (filters.recipientId) {
      list = list.filter(m => m.recipientId === filters.recipientId);
    }
    if (filters.broadcastId) {
      list = list.filter(m => m.broadcastId === filters.broadcastId);
    }

    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getCommunicationMessageById(context, id) {
    const message = this.communicationMessages.find(m => m.id === id);
    if (!message) return null;
    this.validateCampusBoundary(context, message.campusId);
    return message;
  }

  createCommunicationMessage(context, data) {
    const campusId = data.campusId || context.campusId || context.activeCampusId;
    this.validateCampusBoundary(context, campusId);

    const message = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      tenantId: context.tenantId || this.organization.id,
      campusId,
      channel: data.channel.toUpperCase(),
      recipientType: data.recipientType || 'GUARDIAN',
      recipientId: data.recipientId,
      recipientName: data.recipientName,
      recipientAddress: data.recipientAddress,
      subject: data.subject || null,
      body: data.body,
      templateId: data.templateId || null,
      category: data.category || 'TRANSACTIONAL',
      priority: data.priority || 'NORMAL',
      status: data.status || 'QUEUED',
      failureReason: data.failureReason || null,
      retryCount: Number(data.retryCount) || 0,
      maxRetries: Number(data.maxRetries) || 3,
      scheduledFor: data.scheduledFor || null,
      sentAt: data.status === 'SENT' ? new Date().toISOString() : null,
      deliveredAt: null,
      readAt: null,
      provider: data.provider || 'MOCK',
      externalMessageId: data.externalMessageId || null,
      metadataJson: typeof data.metadataJson === 'string' ? data.metadataJson : JSON.stringify(data.metadata || {}),
      broadcastId: data.broadcastId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.communicationMessages.unshift(message);

    // If channel is IN_APP, also ensure it can be queried as a user notification
    return message;
  }

  updateMessageDeliveryStatus(context, id, status, details = {}) {
    const message = this.getCommunicationMessageById(context, id);
    if (!message) throw new Error(`Communication message ${id} not found.`);

    message.status = status.toUpperCase();
    message.updatedAt = new Date().toISOString();

    if (details.externalMessageId) message.externalMessageId = details.externalMessageId;
    if (details.failureReason !== undefined) message.failureReason = details.failureReason;
    if (details.provider) message.provider = details.provider;
    if (typeof details.retryCount === 'number') message.retryCount = details.retryCount;

    if (status === 'SENT' && !message.sentAt) {
      message.sentAt = new Date().toISOString();
    } else if (status === 'DELIVERED') {
      if (!message.sentAt) message.sentAt = new Date().toISOString();
      message.deliveredAt = new Date().toISOString();
    } else if (status === 'READ') {
      if (!message.sentAt) message.sentAt = new Date().toISOString();
      if (!message.deliveredAt) message.deliveredAt = new Date().toISOString();
      message.readAt = new Date().toISOString();
    } else if (status === 'FAILED') {
      message.failureReason = details.failureReason || message.failureReason || 'Delivery failure';
    }

    return message;
  }

  // --- BROADCASTS ---
  getCommunicationBroadcasts(context, filters = {}) {
    const targetCampusId = context.campusId || context.activeCampusId;
    let list = [...this.communicationBroadcasts];

    if (context.role !== 'HQ_ADMIN' && targetCampusId) {
      list = list.filter(b => b.campusId === targetCampusId);
    } else if (filters.campusId) {
      list = list.filter(b => b.campusId === filters.campusId);
    }

    if (filters.status) {
      list = list.filter(b => b.status === filters.status);
    }

    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getCommunicationBroadcastById(context, id) {
    const broadcast = this.communicationBroadcasts.find(b => b.id === id);
    if (!broadcast) return null;
    this.validateCampusBoundary(context, broadcast.campusId);
    return broadcast;
  }

  createCommunicationBroadcast(context, data) {
    const campusId = data.campusId || context.campusId || context.activeCampusId;
    this.validateCampusBoundary(context, campusId);

    const broadcast = {
      id: `bc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      tenantId: context.tenantId || this.organization.id,
      campusId,
      title: data.title,
      channelsJson: typeof data.channels === 'string' ? data.channels : JSON.stringify(data.channels || ['WHATSAPP']),
      templateId: data.templateId || null,
      subject: data.subject || null,
      body: data.body,
      audienceType: data.audienceType || 'ALL_STUDENTS',
      audienceFilterJson: typeof data.audienceFilter === 'string' ? data.audienceFilter : JSON.stringify(data.audienceFilter || {}),
      totalRecipients: Number(data.totalRecipients) || 0,
      sentCount: 0,
      deliveredCount: 0,
      failedCount: 0,
      status: data.scheduledFor ? 'SCHEDULED' : (data.status || 'DRAFT'),
      scheduledFor: data.scheduledFor || null,
      executedAt: null,
      createdById: context.userId || 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.communicationBroadcasts.unshift(broadcast);
    return broadcast;
  }

  updateCommunicationBroadcast(context, id, updates) {
    const broadcast = this.getCommunicationBroadcastById(context, id);
    if (!broadcast) throw new Error(`Broadcast ${id} not found.`);
    Object.assign(broadcast, updates, { updatedAt: new Date().toISOString() });
    return broadcast;
  }

  // --- NOTIFICATION PREFERENCES ---
  getNotificationPreferences(context, userId) {
    return this.notificationPreferences.filter(p => p.userId === userId);
  }

  setNotificationPreference(context, { userId, recipientType = 'GUARDIAN', channel, category, enabled }) {
    let pref = this.notificationPreferences.find(
      p => p.userId === userId && p.channel === channel.toUpperCase() && p.category === category.toUpperCase()
    );

    if (pref) {
      pref.enabled = Boolean(enabled);
      pref.updatedAt = new Date().toISOString();
    } else {
      pref = {
        id: `pref-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        tenantId: context.tenantId || this.organization.id,
        userId,
        recipientType,
        channel: channel.toUpperCase(),
        category: category.toUpperCase(),
        enabled: Boolean(enabled),
        updatedAt: new Date().toISOString()
      };
      this.notificationPreferences.push(pref);
    }
    return pref;
  }

  isChannelEnabled(context, { userId, channel, category, isCritical = false }) {
    // Critical transactional alerts (e.g. emergency closure, fee invoices) bypass opt-outs
    if (isCritical || category === 'ALERT') return true;

    const pref = this.notificationPreferences.find(
      p => p.userId === userId && p.channel === channel.toUpperCase() && p.category === category.toUpperCase()
    );

    // Default to true if no preference is explicitly set
    return pref ? pref.enabled : true;
  }

  validateCampusBoundary(context, targetCampusId) {
    if (!context || context.role === 'HQ_ADMIN' || context.userRole === 'HQ_ADMIN') {
      return true;
    }
    const userCampusId = context.campusId || context.activeCampusId;
    if (userCampusId && targetCampusId && userCampusId !== targetCampusId) {
      const err = new Error(`Access denied to campus '${targetCampusId}'. User belongs to '${userCampusId}'.`);
      err.status = 403;
      err.code = 'CAMPUS_ACCESS_DENIED';
      throw err;
    }
    return true;
  }

  // --- AUDIENCE RESOLUTION ---
  getAudienceRecipients(context, audienceType, filter = {}) {
    const campusId = context.campusId || context.activeCampusId;
    const recipients = [];

    if (audienceType === 'ALL_STUDENTS' || audienceType === 'GRADE' || audienceType === 'DIVISION') {
      let roster = this.students.filter(s => s.campusId === campusId && s.status === 'ACTIVE');

      if (audienceType === 'GRADE' && filter.grade) {
        roster = roster.filter(s => {
          const gradeObj = this.grades.find(g => g.id === s.enrollment?.gradeId);
          const g = s.grade || s.enrollment?.gradeName || gradeObj?.name || '';
          return g.toLowerCase().includes(filter.grade.toLowerCase()) || (gradeObj && gradeObj.id.toLowerCase() === filter.grade.toLowerCase());
        });
      }
      if (audienceType === 'DIVISION' && filter.division) {
        roster = roster.filter(s => {
          const d = s.division || s.enrollment?.divisionName;
          return d && d.toLowerCase() === filter.division.toLowerCase();
        });
      }

      for (const student of roster) {
        const guardianId = student.guardianId || (student.guardians && student.guardians[0]?.guardianId);
        const guardian = this.guardians.find(g => g.id === guardianId) || {
          name: `${student.firstName} Guardian`,
          phone: student.emergencyPhone || '+91 98000 00000',
          email: `${student.firstName.toLowerCase()}.parent@vedictree.edu`
        };

        const rollNo = student.rollNumber || student.enrollment?.rollNumber || student.admissionNumber || student.id;
        const gradeObj = this.grades.find(g => g.id === student.enrollment?.gradeId);
        const gradeName = student.grade || student.enrollment?.gradeName || gradeObj?.name || 'Grade 5';
        const divName = student.division || student.enrollment?.divisionName || 'A';

        recipients.push({
          recipientId: guardian.id || student.id,
          recipientType: 'GUARDIAN',
          recipientName: guardian.name || `${guardian.firstName || ''} ${guardian.lastName || ''}`.trim() || 'Parent',
          studentId: student.id,
          studentName: `${student.firstName} ${student.lastName}`,
          phone: guardian.phone || student.emergencyPhone,
          email: guardian.email || `${String(rollNo).toLowerCase()}@parents.vedictree.edu`,
          pushToken: `fcm_tok_${student.id}`,
          grade: gradeName,
          division: divName,
          rollNumber: rollNo
        });
      }
    } else if (audienceType === 'ALL_STAFF' || audienceType === 'DEPARTMENT') {
      let staff = this.employees.filter(e => e.campusId === campusId && e.status === 'ACTIVE');

      if (audienceType === 'DEPARTMENT' && filter.department) {
        staff = staff.filter(e => {
          const deptObj = this.departments.find(d => d.id === e.departmentId);
          const deptName = e.department || deptObj?.name || '';
          return deptName.toLowerCase().includes(filter.department.toLowerCase());
        });
      }

      for (const emp of staff) {
        const deptObj = this.departments.find(d => d.id === emp.departmentId);
        recipients.push({
          recipientId: emp.id,
          recipientType: 'EMPLOYEE',
          recipientName: `${emp.firstName} ${emp.lastName}`,
          studentId: null,
          studentName: null,
          phone: emp.phone,
          email: emp.email,
          pushToken: `fcm_tok_${emp.id}`,
          department: emp.department || deptObj?.name || 'Academics & Teaching',
          designation: emp.designation || 'Staff'
        });
      }
    }

    return recipients;
  }

  // ==========================================
  // MODULE 06: ACADEMICS DOMAIN OPERATIONS
  // ==========================================

  // --- 1. Subjects ---
  getSubjects(schoolId) {
    if (schoolId) {
      return this.subjects.filter(s => s.schoolId === schoolId);
    }
    return [...this.subjects];
  }

  getSubjectById(id) {
    return this.subjects.find(s => s.id === id) || null;
  }

  createSubject(data) {
    const existing = this.subjects.find(s => s.schoolId === data.schoolId && s.code === data.code);
    if (existing) {
      throw new Error(`Subject with code "${data.code}" already exists in school`);
    }
    const subject = {
      id: data.id || `subj-${Date.now()}`,
      schoolId: data.schoolId,
      name: data.name,
      code: data.code,
      isElective: Boolean(data.isElective),
      departmentId: data.departmentId || null,
      credits: data.credits || 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.subjects.push(subject);
    return subject;
  }

  // --- 2. Teacher Assignments ---
  getTeacherAssignments(campusId, filters = {}) {
    if (campusId && campusId !== 'ALL') {
      this.validateCampusBoundary(campusId);
    }

    let results = this.teacherAssignments.filter(ta => !campusId || campusId === 'ALL' || ta.campusId === campusId);

    if (filters.employeeId) {
      results = results.filter(ta => ta.employeeId === filters.employeeId);
    }
    if (filters.divisionId) {
      results = results.filter(ta => ta.divisionId === filters.divisionId);
    }
    if (filters.subjectId) {
      results = results.filter(ta => ta.subjectId === filters.subjectId);
    }
    if (filters.academicYearId) {
      results = results.filter(ta => ta.academicYearId === filters.academicYearId);
    }

    return results.map(ta => {
      const subject = this.subjects.find(s => s.id === ta.subjectId);
      const employee = this.employees.find(e => e.id === ta.employeeId);
      const division = this.divisions.find(d => d.id === ta.divisionId);
      const grade = division ? this.grades.find(g => g.id === division.gradeId) : null;
      return {
        ...ta,
        subjectName: subject?.name || 'Unknown Subject',
        subjectCode: subject?.code || '',
        employeeName: employee ? `${employee.firstName} ${employee.lastName}` : 'Unassigned',
        divisionName: division?.name || '',
        gradeId: grade?.id || '',
        gradeName: grade?.name || ''
      };
    });
  }

  getTeacherAssignmentById(campusId, id) {
    if (campusId && campusId !== 'ALL') {
      this.validateCampusBoundary(campusId);
    }
    const ta = this.teacherAssignments.find(t => t.id === id);
    if (!ta) return null;
    if (campusId && campusId !== 'ALL' && ta.campusId !== campusId) {
      const err = new Error('Cross-campus access forbidden');
      err.status = 403;
      throw err;
    }
    const subject = this.subjects.find(s => s.id === ta.subjectId);
    const employee = this.employees.find(e => e.id === ta.employeeId);
    const division = this.divisions.find(d => d.id === ta.divisionId);
    const grade = division ? this.grades.find(g => g.id === division.gradeId) : null;
    return {
      ...ta,
      subjectName: subject?.name || 'Unknown Subject',
      subjectCode: subject?.code || '',
      employeeName: employee ? `${employee.firstName} ${employee.lastName}` : 'Unassigned',
      divisionName: division?.name || '',
      gradeId: grade?.id || '',
      gradeName: grade?.name || ''
    };
  }

  createTeacherAssignment(campusId, data) {
    this.validateCampusBoundary(campusId);
    const existing = this.teacherAssignments.find(
      ta => ta.campusId === campusId &&
            ta.divisionId === data.divisionId &&
            ta.subjectId === data.subjectId &&
            ta.academicYearId === (data.academicYearId || 'ay-2026-2027')
    );
    if (existing) {
      throw new Error('TEACHER_ASSIGNMENT_EXISTS: An assignment for this division, subject and academic year already exists.');
    }

    if (data.isClassTeacher) {
      this.teacherAssignments.forEach(ta => {
        if (ta.campusId === campusId && ta.divisionId === data.divisionId && ta.academicYearId === (data.academicYearId || 'ay-2026-2027')) {
          ta.isClassTeacher = false;
        }
      });
    }

    const assignment = {
      id: data.id || `ta-${Date.now()}`,
      campusId,
      employeeId: data.employeeId,
      subjectId: data.subjectId,
      divisionId: data.divisionId,
      academicYearId: data.academicYearId || 'ay-2026-2027',
      isClassTeacher: Boolean(data.isClassTeacher),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.teacherAssignments.push(assignment);
    return assignment;
  }

  deleteTeacherAssignment(campusId, id) {
    this.validateCampusBoundary(campusId);
    const idx = this.teacherAssignments.findIndex(ta => ta.id === id && ta.campusId === campusId);
    if (idx === -1) {
      throw new Error('Teacher assignment not found');
    }
    const [deleted] = this.teacherAssignments.splice(idx, 1);
    return deleted;
  }

  // --- 3. Timetable & Period Management with Clash Invariants ---
  getTimetable(campusId, filters = {}) {
    if (campusId && campusId !== 'ALL') {
      this.validateCampusBoundary(campusId);
    }

    let periods = this.timetablePeriods.filter(p => !campusId || campusId === 'ALL' || p.campusId === campusId);

    if (filters.divisionId) {
      periods = periods.filter(p => p.divisionId === filters.divisionId);
    }
    if (filters.dayOfWeek) {
      periods = periods.filter(p => p.dayOfWeek === filters.dayOfWeek);
    }
    if (filters.teacherAssignmentId) {
      periods = periods.filter(p => p.teacherAssignmentId === filters.teacherAssignmentId);
    }
    if (filters.employeeId) {
      periods = periods.filter(p => {
        const ta = this.teacherAssignments.find(t => t.id === p.teacherAssignmentId);
        return ta && (ta.employeeId === filters.employeeId || p.substituteEmployeeId === filters.employeeId);
      });
    }

    return periods.map(p => {
      const ta = this.teacherAssignments.find(t => t.id === p.teacherAssignmentId);
      const subject = ta ? this.subjects.find(s => s.id === ta.subjectId) : null;
      const teacher = ta ? this.employees.find(e => e.id === ta.employeeId) : null;
      const subTeacher = p.substituteEmployeeId ? this.employees.find(e => e.id === p.substituteEmployeeId) : null;
      const division = this.divisions.find(d => d.id === p.divisionId);
      const grade = division ? this.grades.find(g => g.id === division.gradeId) : null;

      return {
        ...p,
        subjectId: subject?.id || '',
        subjectName: subject?.name || 'Study Period / Free',
        subjectCode: subject?.code || '',
        teacherId: teacher?.id || '',
        teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unassigned',
        substituteName: subTeacher ? `${subTeacher.firstName} ${subTeacher.lastName}` : null,
        divisionName: division?.name || '',
        gradeId: grade?.id || '',
        gradeName: grade?.name || ''
      };
    }).sort((a, b) => a.periodNumber - b.periodNumber);
  }

  createTimetablePeriod(campusId, data) {
    this.validateCampusBoundary(campusId);

    // Invariant 1: Division Double-Booking Clash
    const divisionClash = this.timetablePeriods.find(
      p => p.campusId === campusId &&
           p.divisionId === data.divisionId &&
           p.dayOfWeek === data.dayOfWeek &&
           Number(p.periodNumber) === Number(data.periodNumber)
    );
    if (divisionClash) {
      throw new Error(`TIMETABLE_CLASH: Division already has a scheduled class in Period ${data.periodNumber} on ${data.dayOfWeek}.`);
    }

    // Invariant 2: Teacher Double-Booking Clash
    const targetAssignment = this.teacherAssignments.find(ta => ta.id === data.teacherAssignmentId);
    if (targetAssignment && !data.isSubstitution) {
      const teacherClash = this.timetablePeriods.find(p => {
        if (p.dayOfWeek !== data.dayOfWeek || Number(p.periodNumber) !== Number(data.periodNumber)) return false;
        const pAssignment = this.teacherAssignments.find(ta => ta.id === p.teacherAssignmentId);
        return pAssignment && pAssignment.employeeId === targetAssignment.employeeId;
      });
      if (teacherClash) {
        throw new Error(`TIMETABLE_CLASH: Teacher is already teaching another division during Period ${data.periodNumber} on ${data.dayOfWeek}.`);
      }
    }

    const period = {
      id: data.id || `tt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      divisionId: data.divisionId,
      teacherAssignmentId: data.teacherAssignmentId,
      dayOfWeek: data.dayOfWeek,
      periodNumber: Number(data.periodNumber),
      startTime: data.startTime || '08:30',
      endTime: data.endTime || '09:15',
      roomNumber: data.roomNumber || 'Room 201',
      isSubstitution: Boolean(data.isSubstitution),
      substituteEmployeeId: data.substituteEmployeeId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.timetablePeriods.push(period);
    return period;
  }

  deleteTimetablePeriod(campusId, id) {
    this.validateCampusBoundary(campusId);
    const idx = this.timetablePeriods.findIndex(p => p.id === id && p.campusId === campusId);
    if (idx === -1) {
      throw new Error('Timetable period not found');
    }
    const [deleted] = this.timetablePeriods.splice(idx, 1);
    return deleted;
  }

  // --- 4. Lessons & Instructional Progress ---
  getLessons(campusId, filters = {}) {
    if (campusId && campusId !== 'ALL') {
      this.validateCampusBoundary(campusId);
    }
    let list = this.lessons.filter(l => !campusId || campusId === 'ALL' || l.campusId === campusId);

    if (filters.teacherAssignmentId) {
      list = list.filter(l => l.teacherAssignmentId === filters.teacherAssignmentId);
    }
    if (filters.status) {
      list = list.filter(l => l.status === filters.status);
    }
    if (filters.chapter) {
      list = list.filter(l => l.chapter?.toLowerCase().includes(filters.chapter.toLowerCase()));
    }

    return list.map(l => {
      const ta = this.teacherAssignments.find(t => t.id === l.teacherAssignmentId);
      const subject = ta ? this.subjects.find(s => s.id === ta.subjectId) : null;
      const division = ta ? this.divisions.find(d => d.id === ta.divisionId) : null;
      const grade = division ? this.grades.find(g => g.id === division.gradeId) : null;
      const teacher = ta ? this.employees.find(e => e.id === ta.employeeId) : null;

      return {
        ...l,
        subjectName: subject?.name || 'Subject',
        subjectCode: subject?.code || '',
        divisionName: division?.name || '',
        gradeName: grade?.name || '',
        teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Teacher'
      };
    });
  }

  createLesson(campusId, data) {
    this.validateCampusBoundary(campusId);
    const lesson = {
      id: data.id || `les-${Date.now()}`,
      campusId,
      teacherAssignmentId: data.teacherAssignmentId,
      title: data.title,
      description: data.description || '',
      chapter: data.chapter || 'Unit 1',
      plannedDate: data.plannedDate || new Date().toISOString().split('T')[0],
      completedDate: null,
      status: data.status || 'PLANNED',
      teachingAids: data.teachingAids || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.lessons.push(lesson);
    return lesson;
  }

  updateLesson(campusId, id, data) {
    this.validateCampusBoundary(campusId);
    const lesson = this.lessons.find(l => l.id === id && l.campusId === campusId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    if (data.status) lesson.status = data.status;
    if (data.status === 'COMPLETED' && !lesson.completedDate) {
      lesson.completedDate = new Date().toISOString().split('T')[0];
    }
    if (data.title) lesson.title = data.title;
    if (data.description !== undefined) lesson.description = data.description;
    if (data.chapter !== undefined) lesson.chapter = data.chapter;
    if (data.teachingAids !== undefined) lesson.teachingAids = data.teachingAids;
    lesson.updatedAt = new Date().toISOString();
    return lesson;
  }

  // --- 5. Homework & Assignment Submissions ---
  getHomeworks(campusId, filters = {}) {
    if (campusId && campusId !== 'ALL') {
      this.validateCampusBoundary(campusId);
    }
    let list = this.homeworks.filter(h => !campusId || campusId === 'ALL' || h.campusId === campusId);

    if (filters.divisionId) {
      list = list.filter(h => h.divisionId === filters.divisionId);
    }
    if (filters.subjectId) {
      list = list.filter(h => h.subjectId === filters.subjectId);
    }
    if (filters.teacherId) {
      list = list.filter(h => h.teacherId === filters.teacherId);
    }

    return list.map(h => {
      const subject = this.subjects.find(s => s.id === h.subjectId);
      const division = this.divisions.find(d => d.id === h.divisionId);
      const grade = division ? this.grades.find(g => g.id === division.gradeId) : null;
      const teacher = this.employees.find(e => e.id === h.teacherId);

      const submissions = this.assignmentSubmissions.filter(sub => sub.homeworkId === h.id);
      const studentsInDiv = this.students.filter(s => s.campusId === h.campusId && s.enrollment?.divisionId === h.divisionId);

      const submittedCount = submissions.filter(s => s.status === 'SUBMITTED' || s.status === 'GRADED').length;
      const gradedCount = submissions.filter(s => s.status === 'GRADED').length;

      return {
        ...h,
        subjectName: subject?.name || 'Subject',
        subjectCode: subject?.code || '',
        divisionName: division?.name || '',
        gradeName: grade?.name || '',
        teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Teacher',
        stats: {
          totalStudents: studentsInDiv.length,
          submittedCount,
          gradedCount,
          pendingReviewCount: submittedCount - gradedCount
        }
      };
    });
  }

  createHomework(campusId, data) {
    this.validateCampusBoundary(campusId);
    const hwId = data.id || `hw-${Date.now()}`;
    const homework = {
      id: hwId,
      campusId,
      divisionId: data.divisionId,
      subjectId: data.subjectId,
      teacherId: data.teacherId,
      title: data.title,
      description: data.description || '',
      assignedDate: data.assignedDate || new Date().toISOString().split('T')[0],
      dueDate: data.dueDate,
      maxMarks: Number(data.maxMarks) || 10,
      submissionType: data.submissionType || 'NOTEBOOK',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.homeworks.push(homework);

    // Seed empty pending submission records for students in this division
    const divisionStudents = this.students.filter(
      s => s.campusId === campusId && s.enrollment?.divisionId === data.divisionId
    );
    for (const student of divisionStudents) {
      this.assignmentSubmissions.push({
        id: `sub-${hwId}-${student.id}`,
        homeworkId: hwId,
        studentId: student.id,
        submissionDate: null,
        status: 'PENDING',
        marksObtained: null,
        feedback: null,
        gradedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    return homework;
  }

  getHomeworkSubmissions(homeworkId) {
    const homework = this.homeworks.find(h => h.id === homeworkId);
    if (!homework) return [];

    const subs = this.assignmentSubmissions.filter(s => s.homeworkId === homeworkId);
    return subs.map(sub => {
      const student = this.students.find(s => s.id === sub.studentId);
      return {
        ...sub,
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown Student',
        admissionNumber: student?.admissionNumber || '',
        rollNumber: student?.enrollment?.rollNumber || 0
      };
    });
  }

  submitHomework(homeworkId, studentId, data = {}) {
    let sub = this.assignmentSubmissions.find(s => s.homeworkId === homeworkId && s.studentId === studentId);
    if (!sub) {
      sub = {
        id: `sub-${homeworkId}-${studentId}`,
        homeworkId,
        studentId,
        createdAt: new Date().toISOString()
      };
      this.assignmentSubmissions.push(sub);
    }
    sub.submissionDate = new Date().toISOString();
    sub.status = 'SUBMITTED';
    sub.content = data.content || '';
    sub.updatedAt = new Date().toISOString();
    return sub;
  }

  gradeHomeworkSubmission(homeworkId, studentId, { marksObtained, feedback }) {
    let sub = this.assignmentSubmissions.find(s => s.homeworkId === homeworkId && s.studentId === studentId);
    if (!sub) {
      sub = {
        id: `sub-${homeworkId}-${studentId}`,
        homeworkId,
        studentId,
        createdAt: new Date().toISOString()
      };
      this.assignmentSubmissions.push(sub);
    }
    sub.marksObtained = Number(marksObtained);
    sub.feedback = feedback || '';
    sub.status = 'GRADED';
    sub.gradedAt = new Date().toISOString();
    sub.updatedAt = new Date().toISOString();
    return sub;
  }

  // --- 6. Assessments & Continuous Evaluation (CCE) ---
  getAssessments(campusId, filters = {}) {
    if (campusId && campusId !== 'ALL') {
      this.validateCampusBoundary(campusId);
    }
    let list = this.assessments.filter(a => !campusId || campusId === 'ALL' || a.campusId === campusId);

    if (filters.gradeId) {
      list = list.filter(a => a.gradeId === filters.gradeId);
    }
    if (filters.subjectId) {
      list = list.filter(a => a.subjectId === filters.subjectId);
    }
    if (filters.assessmentType) {
      list = list.filter(a => a.assessmentType === filters.assessmentType);
    }
    if (filters.academicYearId) {
      list = list.filter(a => a.academicYearId === filters.academicYearId);
    }

    return list.map(a => {
      const subject = this.subjects.find(s => s.id === a.subjectId);
      const grade = this.grades.find(g => g.id === a.gradeId);
      const results = this.results.filter(r => r.assessmentId === a.id);

      const gradedCount = results.length;
      const totalMarksSum = results.reduce((acc, r) => acc + (r.isAbsent ? 0 : r.marksObtained), 0);
      const averageMarks = gradedCount > 0 ? (totalMarksSum / gradedCount).toFixed(1) : 0;

      return {
        ...a,
        subjectName: subject?.name || 'Subject',
        subjectCode: subject?.code || '',
        gradeName: grade?.name || '',
        stats: {
          gradedCount,
          averageMarks
        }
      };
    });
  }

  createAssessment(campusId, data) {
    this.validateCampusBoundary(campusId);
    const assessment = {
      id: data.id || `asm-${Date.now()}`,
      campusId,
      academicYearId: data.academicYearId || 'ay-2026-2027',
      gradeId: data.gradeId,
      subjectId: data.subjectId,
      title: data.title,
      assessmentType: data.assessmentType || 'PERIODIC_TEST',
      maxMarks: Number(data.maxMarks) || 40,
      passingMarks: Number(data.passingMarks) || (Number(data.maxMarks) * 0.35),
      date: data.date || new Date().toISOString().split('T')[0],
      weightage: Number(data.weightage) || 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.assessments.push(assessment);
    return assessment;
  }

  getResults(campusId, filters = {}) {
    if (campusId && campusId !== 'ALL') {
      this.validateCampusBoundary(campusId);
    }
    let list = this.results.filter(r => !campusId || campusId === 'ALL' || r.campusId === campusId);

    if (filters.assessmentId) {
      list = list.filter(r => r.assessmentId === filters.assessmentId);
    }
    if (filters.studentId) {
      list = list.filter(r => r.studentId === filters.studentId);
    }

    return list.map(r => {
      const assessment = this.assessments.find(a => a.id === r.assessmentId);
      const student = this.students.find(s => s.id === r.studentId);
      const subject = assessment ? this.subjects.find(s => s.id === assessment.subjectId) : null;

      const percentage = assessment?.maxMarks ? ((r.marksObtained / assessment.maxMarks) * 100).toFixed(1) : 0;

      return {
        ...r,
        assessmentTitle: assessment?.title || '',
        assessmentType: assessment?.assessmentType || '',
        maxMarks: assessment?.maxMarks || 0,
        passingMarks: assessment?.passingMarks || 0,
        percentage,
        subjectName: subject?.name || '',
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown',
        admissionNumber: student?.admissionNumber || ''
      };
    });
  }

  recordResult(campusId, { assessmentId, studentId, marksObtained, remarks = '', isAbsent = false }) {
    this.validateCampusBoundary(campusId);
    const assessment = this.assessments.find(a => a.id === assessmentId && a.campusId === campusId);
    if (!assessment) {
      throw new Error('Assessment not found in this campus');
    }

    const marks = isAbsent ? 0 : Number(marksObtained);
    const pct = assessment.maxMarks > 0 ? (marks / assessment.maxMarks) * 100 : 0;

    let gradeLetter = 'E';
    if (pct >= 91) gradeLetter = 'A1';
    else if (pct >= 81) gradeLetter = 'A2';
    else if (pct >= 71) gradeLetter = 'B1';
    else if (pct >= 61) gradeLetter = 'B2';
    else if (pct >= 51) gradeLetter = 'C1';
    else if (pct >= 41) gradeLetter = 'C2';
    else if (pct >= 33) gradeLetter = 'D';
    else gradeLetter = 'E';

    let result = this.results.find(r => r.assessmentId === assessmentId && r.studentId === studentId);
    if (!result) {
      result = {
        id: `res-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        campusId,
        assessmentId,
        studentId,
        createdAt: new Date().toISOString()
      };
      this.results.push(result);
    }

    result.marksObtained = marks;
    result.gradeLetter = gradeLetter;
    result.remarks = remarks;
    result.isAbsent = Boolean(isAbsent);
    result.updatedAt = new Date().toISOString();
    return result;
  }

  // --- 7. Report Cards & Continuous Summative Aggregation ---
  getReportCards(campusId, filters = {}) {
    if (campusId && campusId !== 'ALL') {
      this.validateCampusBoundary(campusId);
    }
    let list = this.reportCards.filter(rc => !campusId || campusId === 'ALL' || rc.campusId === campusId);

    if (filters.studentId) {
      list = list.filter(rc => rc.studentId === filters.studentId);
    }
    if (filters.academicYearId) {
      list = list.filter(rc => rc.academicYearId === filters.academicYearId);
    }
    if (filters.term) {
      list = list.filter(rc => rc.term === filters.term);
    }

    return list.map(rc => {
      const student = this.students.find(s => s.id === rc.studentId);
      const division = student?.enrollment ? this.divisions.find(d => d.id === student.enrollment.divisionId) : null;
      const grade = division ? this.grades.find(g => g.id === division.gradeId) : null;

      return {
        ...rc,
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Student',
        admissionNumber: student?.admissionNumber || '',
        gradeName: grade?.name || '',
        divisionName: division?.name || '',
        parsedSummary: JSON.parse(rc.summaryJson || '{}')
      };
    });
  }

  generateReportCard(campusId, { studentId, academicYearId = 'ay-2026-2027', term = 'Term 1', teacherRemarks = '' }) {
    this.validateCampusBoundary(campusId);
    const student = this.students.find(s => s.id === studentId && s.campusId === campusId);
    if (!student) {
      throw new Error('Student not found in campus');
    }

    // 1. Compile student results for this academic year
    const studentResults = this.results.filter(r => r.studentId === studentId && r.campusId === campusId);
    const subjectMap = {};

    for (const res of studentResults) {
      const asm = this.assessments.find(a => a.id === res.assessmentId && a.academicYearId === academicYearId);
      if (!asm) continue;
      const subj = this.subjects.find(s => s.id === asm.subjectId);
      const subjName = subj?.name || 'General Subject';

      if (!subjectMap[subjName]) {
        subjectMap[subjName] = { marksObtained: 0, maxMarks: 0, count: 0 };
      }
      subjectMap[subjName].marksObtained += res.marksObtained;
      subjectMap[subjName].maxMarks += asm.maxMarks;
      subjectMap[subjName].count += 1;
    }

    const subjectBreakdown = Object.entries(subjectMap).map(([subjName, data]) => {
      const pct = data.maxMarks > 0 ? (data.marksObtained / data.maxMarks) * 100 : 0;
      let grade = 'E';
      if (pct >= 91) grade = 'A1';
      else if (pct >= 81) grade = 'A2';
      else if (pct >= 71) grade = 'B1';
      else if (pct >= 61) grade = 'B2';
      else if (pct >= 51) grade = 'C1';
      else if (pct >= 41) grade = 'C2';
      else if (pct >= 33) grade = 'D';

      return {
        subject: subjName,
        marksObtained: data.marksObtained,
        maxMarks: data.maxMarks,
        percentage: Number(pct.toFixed(1)),
        grade
      };
    });

    const totalMarks = subjectBreakdown.reduce((acc, s) => acc + s.marksObtained, 0);
    const totalMax = subjectBreakdown.reduce((acc, s) => acc + s.maxMarks, 0);
    const overallPercentage = totalMax > 0 ? Number(((totalMarks / totalMax) * 100).toFixed(1)) : 85.0;

    let overallGrade = 'B1';
    if (overallPercentage >= 91) overallGrade = 'A1';
    else if (overallPercentage >= 81) overallGrade = 'A2';
    else if (overallPercentage >= 71) overallGrade = 'B1';
    else if (overallPercentage >= 61) overallGrade = 'B2';
    else if (overallPercentage >= 51) overallGrade = 'C1';
    else if (overallPercentage >= 41) overallGrade = 'C2';
    else if (overallPercentage >= 33) overallGrade = 'D';
    else overallGrade = 'E';

    // 2. Fetch attendance percentage
    const studentAtt = this.studentAttendance.filter(a => a.studentId === studentId);
    const totalAttDays = studentAtt.length;
    const presentAttDays = studentAtt.filter(a => a.status === 'PRESENT').length;
    const attPct = totalAttDays > 0 ? Number(((presentAttDays / totalAttDays) * 100).toFixed(1)) : 95.0;

    const summaryJson = JSON.stringify({
      subjects: subjectBreakdown,
      totalMarks,
      maxTotalMarks: totalMax,
      percentage: overallPercentage,
      overallGrade,
      attendance: { workingDays: totalAttDays || 90, presentDays: presentAttDays || 86, percentage: attPct }
    });

    let rc = this.reportCards.find(r => r.campusId === campusId && r.studentId === studentId && r.academicYearId === academicYearId && r.term === term);
    if (!rc) {
      rc = {
        id: `rc-${Date.now()}`,
        campusId,
        studentId,
        academicYearId,
        term,
        publishedAt: null,
        principalSignedAt: null,
        createdAt: new Date().toISOString()
      };
      this.reportCards.push(rc);
    }

    rc.summaryJson = summaryJson;
    rc.overallPercentage = overallPercentage;
    rc.overallGrade = overallGrade;
    rc.attendancePercentage = attPct;
    rc.teacherRemarks = teacherRemarks || 'Consistent academic performance throughout the term.';
    rc.updatedAt = new Date().toISOString();
    return rc;
  }

  publishReportCard(campusId, id) {
    this.validateCampusBoundary(campusId);
    const rc = this.reportCards.find(r => r.id === id && r.campusId === campusId);
    if (!rc) {
      throw new Error('Report card not found in this campus');
    }
    rc.principalSignedAt = new Date().toISOString();
    rc.publishedAt = new Date().toISOString();
    rc.updatedAt = new Date().toISOString();
    return rc;
  }

  // --- 8. Teacher & Student Personalized Portals ---
  getTeacherDailySchedule(campusId, employeeId, dayOfWeek = 'MON') {
    this.validateCampusBoundary(campusId);
    // Find timetable periods where this teacher is assigned or substituting
    const periods = this.getTimetable(campusId, { employeeId, dayOfWeek });

    // Active ongoing lessons for this teacher
    const assignments = this.teacherAssignments.filter(ta => ta.campusId === campusId && ta.employeeId === employeeId);
    const taIds = assignments.map(a => a.id);
    const activeLessons = this.lessons.filter(l => l.campusId === campusId && taIds.includes(l.teacherAssignmentId) && l.status !== 'COMPLETED');

    // Homework pending grading
    const homeworks = this.homeworks.filter(h => h.campusId === campusId && h.teacherId === employeeId);
    const hwIds = homeworks.map(h => h.id);
    const pendingGradingSubmissions = this.assignmentSubmissions.filter(s => hwIds.includes(s.homeworkId) && s.status === 'SUBMITTED');

    return {
      teacherId: employeeId,
      dayOfWeek,
      periods,
      activeLessons,
      pendingGradingCount: pendingGradingSubmissions.length
    };
  }

  getStudentAcademicProfile(campusId, studentId) {
    this.validateCampusBoundary(campusId);
    const student = this.students.find(s => s.id === studentId && s.campusId === campusId);
    if (!student) {
      throw new Error('Student not found in this campus');
    }

    const divisionId = student.enrollment?.divisionId;
    const weeklyTimetable = divisionId ? this.getTimetable(campusId, { divisionId }) : [];

    // Homework for student's division
    const divisionHomeworks = divisionId ? this.getHomeworks(campusId, { divisionId }) : [];
    const mySubmissions = this.assignmentSubmissions.filter(s => s.studentId === studentId);

    const enrichedHomework = divisionHomeworks.map(hw => {
      const sub = mySubmissions.find(s => s.homeworkId === hw.id);
      return {
        ...hw,
        mySubmissionStatus: sub?.status || 'PENDING',
        myMarksObtained: sub?.marksObtained ?? null,
        myFeedback: sub?.feedback || null,
        mySubmissionDate: sub?.submissionDate || null
      };
    });

    const myResults = this.getResults(campusId, { studentId });
    const myReportCards = this.getReportCards(campusId, { studentId });

    return {
      student,
      weeklyTimetable,
      homework: enrichedHomework,
      results: myResults,
      reportCards: myReportCards
    };
  }

  // ====================================================
  // MODULE 08: SCHOOL OPERATIONS & LOGISTICS
  // ====================================================

  _resolveCampusId(contextOrCampusId) {
    if (!contextOrCampusId) return null;
    if (typeof contextOrCampusId === 'string') return contextOrCampusId;
    return contextOrCampusId.campusId || contextOrCampusId.activeCampusId || null;
  }

  _validateOperationsCampus(contextOrCampusId, filters = {}) {
    const contextCampusId = this._resolveCampusId(contextOrCampusId);
    const targetCampusId = filters.campusId || contextCampusId;
    if (typeof contextOrCampusId === 'object' && targetCampusId && targetCampusId !== 'ALL') {
      this.validateCampusBoundary(contextOrCampusId, targetCampusId);
    } else if (targetCampusId && targetCampusId !== 'ALL') {
      this.validateCampusBoundary(targetCampusId);
    }
    return targetCampusId;
  }

  _isAuthorizedForSensitive(context) {
    if (!context) return false;
    if (['HQ_ADMIN', 'PRINCIPAL'].includes(context.role || context.userRole)) return true;
    const permissions = context.permissions || this.rolePermissions[context.role || context.userRole] || [];
    return permissions.includes('operations:sensitive_incidents_read');
  }

  // --- ASSETS ---
  getAssets(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.assets.filter(a => !campusId || campusId === 'ALL' || a.campusId === campusId);
    if (filters.category) list = list.filter(a => a.category === filters.category);
    if (filters.status) list = list.filter(a => a.currentStatus === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(q) || a.assetCode.toLowerCase().includes(q));
    }
    return list;
  }

  createAsset(contextOrCampusId, assetData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || assetData.campusId;
    this.validateCampusBoundary(campusId);

    if (this.assets.some(a => a.campusId === campusId && a.assetCode.toLowerCase() === assetData.assetCode.toLowerCase())) {
      throw new Error(`Asset code '${assetData.assetCode}' already exists in this campus.`);
    }

    const newAsset = {
      id: `ast-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      assetCode: assetData.assetCode,
      name: assetData.name,
      category: assetData.category || 'GENERAL',
      serialNumber: assetData.serialNumber || null,
      modelNumber: assetData.modelNumber || null,
      purchaseDate: assetData.purchaseDate || new Date().toISOString(),
      purchaseCost: Number(assetData.purchaseCost) || 0,
      currentStatus: assetData.currentStatus || 'IN_USE',
      locationFacilityId: assetData.locationFacilityId || null,
      assignedToEmployeeId: assetData.assignedToEmployeeId || null,
      warrantyExpiryDate: assetData.warrantyExpiryDate || null,
      notes: assetData.notes || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.assets.push(newAsset);
    return newAsset;
  }

  updateAsset(contextOrCampusId, assetId, updates) {
    const campusId = this._resolveCampusId(contextOrCampusId);
    const asset = this.assets.find(a => a.id === assetId);
    if (!asset) throw new Error(`Asset '${assetId}' not found.`);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    Object.assign(asset, updates, { updatedAt: new Date().toISOString() });
    return asset;
  }

  // --- INVENTORY & STOCK ---
  getInventoryItems(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.inventoryItems.filter(i => !campusId || campusId === 'ALL' || i.campusId === campusId);
    if (filters.category) list = list.filter(i => i.category === filters.category);
    if (filters.lowStockOnly) list = list.filter(i => i.currentStock <= i.minStockLevel);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.itemCode.toLowerCase().includes(q));
    }
    return list;
  }

  createInventoryItem(contextOrCampusId, itemData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || itemData.campusId;
    this.validateCampusBoundary(campusId);

    if (this.inventoryItems.some(i => i.campusId === campusId && i.itemCode.toLowerCase() === itemData.itemCode.toLowerCase())) {
      throw new Error(`Item code '${itemData.itemCode}' already exists in this campus.`);
    }

    const newItem = {
      id: `inv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      itemCode: itemData.itemCode,
      name: itemData.name,
      category: itemData.category || 'GENERAL',
      unit: itemData.unit || 'PIECES',
      currentStock: Number(itemData.currentStock) || 0,
      minStockLevel: Number(itemData.minStockLevel) || 10,
      reorderQuantity: Number(itemData.reorderQuantity) || 50,
      unitCost: Number(itemData.unitCost) || 0,
      storageLocation: itemData.storageLocation || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.inventoryItems.push(newItem);
    return newItem;
  }

  getStockTransactions(contextOrCampusId, itemId) {
    const campusId = this._resolveCampusId(contextOrCampusId);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    let list = this.stockTransactions.filter(t => !campusId || campusId === 'ALL' || t.campusId === campusId);
    if (itemId) list = list.filter(t => t.itemId === itemId);
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  recordStockTransaction(contextOrCampusId, transactionData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || transactionData.campusId;
    this.validateCampusBoundary(campusId);

    const item = this.inventoryItems.find(i => i.id === transactionData.itemId && i.campusId === campusId);
    if (!item) throw new Error(`Inventory item '${transactionData.itemId}' not found in this campus.`);

    const qty = Number(transactionData.quantity);
    if (isNaN(qty) || qty <= 0) throw new Error('Transaction quantity must be a positive number.');

    if (transactionData.type === 'OUTWARD') {
      if (item.currentStock < qty) {
        throw new Error(`Insufficient stock: current stock is ${item.currentStock} ${item.unit}, cannot dispatch ${qty} ${item.unit}.`);
      }
      item.currentStock -= qty;
    } else if (transactionData.type === 'INWARD' || transactionData.type === 'RETURN') {
      item.currentStock += qty;
    } else if (transactionData.type === 'AUDIT_ADJUSTMENT') {
      item.currentStock = qty;
    }
    item.updatedAt = new Date().toISOString();

    const tx = {
      id: `stx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      itemId: item.id,
      type: transactionData.type,
      quantity: qty,
      balanceAfter: item.currentStock,
      referenceNumber: transactionData.referenceNumber || null,
      issuedTo: transactionData.issuedTo || null,
      performedBy: transactionData.performedBy || 'Store Supervisor',
      notes: transactionData.notes || null,
      createdAt: new Date().toISOString()
    };
    this.stockTransactions.push(tx);

    this.recordAudit({
      organizationId: this.organization.id,
      campusId,
      userId: typeof contextOrCampusId === 'object' ? contextOrCampusId.userId : null,
      userRole: typeof contextOrCampusId === 'object' ? contextOrCampusId.role : null,
      action: 'STOCK_TRANSACTION_RECORDED',
      entityName: 'InventoryItem',
      entityId: item.id,
      diffBefore: null,
      diffAfter: { type: tx.type, quantity: tx.quantity, newBalance: item.currentStock }
    });

    return tx;
  }

  // --- VENDORS ---
  getVendors(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.vendors.filter(v => !campusId || campusId === 'ALL' || v.campusId === campusId);
    if (filters.category) list = list.filter(v => v.category === filters.category);
    if (filters.status) list = list.filter(v => v.status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(v => v.name.toLowerCase().includes(q) || v.vendorCode.toLowerCase().includes(q));
    }
    return list;
  }

  createVendor(contextOrCampusId, vendorData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || vendorData.campusId;
    this.validateCampusBoundary(campusId);

    if (this.vendors.some(v => v.campusId === campusId && v.vendorCode.toLowerCase() === vendorData.vendorCode.toLowerCase())) {
      throw new Error(`Vendor code '${vendorData.vendorCode}' already exists in this campus.`);
    }

    const newVendor = {
      id: `vnd-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      vendorCode: vendorData.vendorCode,
      name: vendorData.name,
      category: vendorData.category || 'GENERAL',
      contactPerson: vendorData.contactPerson,
      phone: vendorData.phone,
      email: vendorData.email || null,
      gstNumber: vendorData.gstNumber || null,
      address: vendorData.address || null,
      rating: Number(vendorData.rating) || 4.5,
      status: vendorData.status || 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.vendors.push(newVendor);
    return newVendor;
  }

  updateVendor(contextOrCampusId, vendorId, updates) {
    const campusId = this._resolveCampusId(contextOrCampusId);
    const vendor = this.vendors.find(v => v.id === vendorId);
    if (!vendor) throw new Error(`Vendor '${vendorId}' not found.`);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    Object.assign(vendor, updates, { updatedAt: new Date().toISOString() });
    return vendor;
  }

  // --- PROCUREMENT / PURCHASE ORDERS ---
  getPurchaseOrders(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.purchaseOrders.filter(po => !campusId || campusId === 'ALL' || po.campusId === campusId);
    if (filters.vendorId) list = list.filter(po => po.vendorId === filters.vendorId);
    if (filters.status) list = list.filter(po => po.status === filters.status);
    return list.map(po => {
      const vendor = this.vendors.find(v => v.id === po.vendorId);
      return { ...po, vendorName: vendor ? vendor.name : 'Unknown Vendor' };
    }).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  }

  createPurchaseOrder(contextOrCampusId, poData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || poData.campusId;
    this.validateCampusBoundary(campusId);

    const vendor = this.vendors.find(v => v.id === poData.vendorId);
    if (!vendor) throw new Error(`Vendor '${poData.vendorId}' not found.`);

    const items = Array.isArray(poData.items) ? poData.items : JSON.parse(poData.itemsJson || '[]');
    const subtotal = items.reduce((sum, it) => sum + (Number(it.total) || (Number(it.quantity) * Number(it.unitCost))), 0);
    const taxAmount = Number(poData.taxAmount) || (subtotal * 0.18);
    const totalAmount = subtotal + taxAmount;

    const newPO = {
      id: `po-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      poNumber: poData.poNumber || `PO-2026-${String(this.purchaseOrders.length + 1).padStart(3, '0')}`,
      vendorId: vendor.id,
      orderDate: poData.orderDate || new Date().toISOString(),
      expectedDeliveryDate: poData.expectedDeliveryDate || null,
      itemsJson: JSON.stringify(items),
      subtotal,
      taxAmount,
      totalAmount,
      status: poData.status || 'PENDING_APPROVAL',
      approvedBy: null,
      approvedAt: null,
      receivedAt: null,
      remarks: poData.remarks || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.purchaseOrders.push(newPO);
    return newPO;
  }

  approvePurchaseOrder(contextOrCampusId, poId) {
    const po = this.purchaseOrders.find(p => p.id === poId);
    if (!po) throw new Error(`Purchase order '${poId}' not found.`);
    const campusId = this._resolveCampusId(contextOrCampusId);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    const userId = typeof contextOrCampusId === 'object' ? contextOrCampusId.userId : 'usr-principal-baner';
    po.status = 'APPROVED';
    po.approvedBy = userId;
    po.approvedAt = new Date().toISOString();
    po.updatedAt = new Date().toISOString();

    this.recordAudit({
      organizationId: this.organization.id,
      campusId: po.campusId,
      userId,
      userRole: typeof contextOrCampusId === 'object' ? contextOrCampusId.role : 'PRINCIPAL',
      action: 'OPERATIONS_PURCHASE_ORDER_APPROVED',
      entityName: 'PurchaseOrder',
      entityId: po.id,
      diffBefore: { status: 'PENDING_APPROVAL' },
      diffAfter: { status: 'APPROVED', totalAmount: po.totalAmount }
    });

    return po;
  }

  receivePurchaseOrder(contextOrCampusId, poId) {
    const po = this.purchaseOrders.find(p => p.id === poId);
    if (!po) throw new Error(`Purchase order '${poId}' not found.`);
    const campusId = this._resolveCampusId(contextOrCampusId);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    po.status = 'RECEIVED';
    po.receivedAt = new Date().toISOString();
    po.updatedAt = new Date().toISOString();
    return po;
  }

  // --- FACILITIES & BOOKINGS ---
  getFacilities(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.facilities.filter(f => !campusId || campusId === 'ALL' || f.campusId === campusId);
    if (filters.type) list = list.filter(f => f.type === filters.type);
    if (filters.status) list = list.filter(f => f.status === filters.status);
    return list;
  }

  createFacility(contextOrCampusId, facilityData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || facilityData.campusId;
    this.validateCampusBoundary(campusId);

    if (this.facilities.some(f => f.campusId === campusId && f.facilityCode.toLowerCase() === facilityData.facilityCode.toLowerCase())) {
      throw new Error(`Facility code '${facilityData.facilityCode}' already exists in this campus.`);
    }

    const newFac = {
      id: `fac-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      facilityCode: facilityData.facilityCode,
      name: facilityData.name,
      type: facilityData.type || 'CLASSROOM',
      building: facilityData.building || 'Main Wing',
      floor: facilityData.floor || 'Ground Floor',
      capacity: Number(facilityData.capacity) || 40,
      status: facilityData.status || 'AVAILABLE',
      airConditioned: Boolean(facilityData.airConditioned),
      projectorAvailable: Boolean(facilityData.projectorAvailable),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.facilities.push(newFac);
    return newFac;
  }

  getFacilityBookings(contextOrCampusId, facilityId) {
    const campusId = this._resolveCampusId(contextOrCampusId);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    let list = this.facilityBookings.filter(b => !campusId || campusId === 'ALL' || b.campusId === campusId);
    if (facilityId) list = list.filter(b => b.facilityId === facilityId);
    return list;
  }

  createFacilityBooking(contextOrCampusId, bookingData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || bookingData.campusId;
    this.validateCampusBoundary(campusId);

    const facility = this.facilities.find(f => f.id === bookingData.facilityId && f.campusId === campusId);
    if (!facility) throw new Error(`Facility '${bookingData.facilityId}' not found.`);

    const newStart = new Date(bookingData.startTime).getTime();
    const newEnd = new Date(bookingData.endTime).getTime();
    if (newEnd <= newStart) throw new Error('Booking end time must be strictly after start time.');

    // Invariant: Conflict checking against active bookings
    const hasConflict = this.facilityBookings.some(b => {
      if (b.campusId !== campusId || b.facilityId !== bookingData.facilityId || b.status === 'CANCELLED') return false;
      const existStart = new Date(b.startTime).getTime();
      const existEnd = new Date(b.endTime).getTime();
      return (newStart < existEnd && newEnd > existStart);
    });

    if (hasConflict) {
      throw new Error(`Facility '${facility.name}' is already reserved during the requested time window.`);
    }

    const newBooking = {
      id: `fb-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      facilityId: facility.id,
      title: bookingData.title,
      bookedBy: bookingData.bookedBy || 'Faculty Member',
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.facilityBookings.push(newBooking);
    return newBooking;
  }

  // --- MAINTENANCE REQUESTS ---
  getMaintenanceRequests(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.maintenanceRequests.filter(m => !campusId || campusId === 'ALL' || m.campusId === campusId);
    if (filters.category) list = list.filter(m => m.category === filters.category);
    if (filters.status) list = list.filter(m => m.status === filters.status);
    if (filters.priority) list = list.filter(m => m.priority === filters.priority);
    return list.map(m => {
      const facility = this.facilities.find(f => f.id === m.facilityId);
      const asset = this.assets.find(a => a.id === m.assetId);
      return {
        ...m,
        facilityName: facility ? facility.name : null,
        assetName: asset ? asset.name : null
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createMaintenanceRequest(contextOrCampusId, requestData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || requestData.campusId;
    this.validateCampusBoundary(campusId);

    const newReq = {
      id: `mnt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      ticketNumber: requestData.ticketNumber || `MNT-2026-${String(this.maintenanceRequests.length + 1).padStart(3, '0')}`,
      facilityId: requestData.facilityId || null,
      assetId: requestData.assetId || null,
      title: requestData.title,
      category: requestData.category || 'GENERAL',
      priority: requestData.priority || 'MEDIUM',
      description: requestData.description,
      reportedBy: requestData.reportedBy || 'Staff Member',
      assignedTo: requestData.assignedTo || null,
      status: 'LOGGED',
      estimatedCost: Number(requestData.estimatedCost) || null,
      actualCost: null,
      resolutionNotes: null,
      resolvedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.maintenanceRequests.push(newReq);
    return newReq;
  }

  updateMaintenanceRequest(contextOrCampusId, ticketId, updates) {
    const campusId = this._resolveCampusId(contextOrCampusId);
    const req = this.maintenanceRequests.find(m => m.id === ticketId || m.ticketNumber === ticketId);
    if (!req) throw new Error(`Maintenance ticket '${ticketId}' not found.`);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    if (updates.status === 'RESOLVED' && !updates.resolvedAt) {
      updates.resolvedAt = new Date().toISOString();
    }
    Object.assign(req, updates, { updatedAt: new Date().toISOString() });
    return req;
  }

  // --- VISITOR GATE PASS LOGS ---
  getVisitorLogs(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.visitorLogs.filter(v => !campusId || campusId === 'ALL' || v.campusId === campusId);
    if (filters.status) list = list.filter(v => v.status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(v => v.visitorName.toLowerCase().includes(q) || v.passNumber.toLowerCase().includes(q) || v.phone.includes(q));
    }
    return list.sort((a, b) => new Date(b.checkInTime) - new Date(a.checkInTime));
  }

  createVisitorLog(contextOrCampusId, visitorData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || visitorData.campusId;
    this.validateCampusBoundary(campusId);

    const newPass = {
      id: `vis-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      passNumber: visitorData.passNumber || `VIS-2026-${String(this.visitorLogs.length + 1).padStart(3, '0')}`,
      visitorName: visitorData.visitorName,
      phone: visitorData.phone,
      purpose: visitorData.purpose || 'PARENT_MEETING',
      personToMeet: visitorData.personToMeet,
      idProofType: visitorData.idProofType || 'AADHAAR',
      idProofNumber: visitorData.idProofNumber ? `XXXX-XXXX-${String(visitorData.idProofNumber).slice(-4)}` : null,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      badgeNumber: visitorData.badgeNumber || `V-${String(this.visitorLogs.length + 1).padStart(2, '0')}`,
      status: 'CHECKED_IN',
      vehicleNumber: visitorData.vehicleNumber || null,
      remarks: visitorData.remarks || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.visitorLogs.push(newPass);

    this.recordAudit({
      organizationId: this.organization.id,
      campusId,
      userId: typeof contextOrCampusId === 'object' ? contextOrCampusId.userId : null,
      userRole: typeof contextOrCampusId === 'object' ? contextOrCampusId.role : null,
      action: 'OPERATIONS_VISITOR_CHECKED_IN',
      entityName: 'VisitorLog',
      entityId: newPass.id,
      diffBefore: null,
      diffAfter: { visitorName: newPass.visitorName, passNumber: newPass.passNumber }
    });

    return newPass;
  }

  checkoutVisitor(contextOrCampusId, passId) {
    const pass = this.visitorLogs.find(v => v.id === passId || v.passNumber === passId);
    if (!pass) throw new Error(`Visitor pass '${passId}' not found.`);
    const campusId = this._resolveCampusId(contextOrCampusId);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    pass.status = 'CHECKED_OUT';
    pass.checkOutTime = new Date().toISOString();
    pass.updatedAt = new Date().toISOString();
    return pass;
  }

  // --- INCIDENTS & SENSITIVE INFORMATION SAFEGUARDING ---
  getIncidents(context, filters = {}) {
    const campusId = this._validateOperationsCampus(context, filters);

    const isAuthorized = this._isAuthorizedForSensitive(context);
    let list = this.incidents.filter(inc => !campusId || campusId === 'ALL' || inc.campusId === campusId);

    if (filters.category) list = list.filter(inc => inc.category === filters.category);
    if (filters.severity) list = list.filter(inc => inc.severity === filters.severity);
    if (filters.status) list = list.filter(inc => inc.status === filters.status);

    // Apply strict redaction or privacy barrier for sensitive records
    return list.map(inc => {
      if (inc.isSensitive && !isAuthorized) {
        return {
          id: inc.id,
          campusId: inc.campusId,
          incidentNumber: inc.incidentNumber,
          title: '[Confidential Incident - Restricted Access]',
          category: inc.category,
          severity: inc.severity,
          isSensitive: true,
          occurredAt: inc.occurredAt,
          location: inc.location,
          reportedBy: inc.reportedBy,
          reportedByName: '[Protected Staff Member]',
          personsInvolvedJson: '[]',
          description: '[Redacted - Sensitive Child Protection / Safeguarding Record. Access restricted to authorized safety officers and principal.]',
          immediateActionTaken: '[Action executed under campus safeguarding protocol]',
          status: inc.status,
          designatedOfficer: inc.designatedOfficer,
          sensitiveNotes: null,
          resolutionSummary: null,
          resolvedAt: inc.resolvedAt,
          createdAt: inc.createdAt,
          updatedAt: inc.updatedAt
        };
      }
      return { ...inc };
    }).sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt));
  }

  getIncidentById(context, incidentId) {
    const inc = this.incidents.find(i => i.id === incidentId || i.incidentNumber === incidentId);
    if (!inc) throw new Error(`Incident '${incidentId}' not found.`);

    const campusId = this._resolveCampusId(context);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    if (inc.isSensitive) {
      const isAuthorized = this._isAuthorizedForSensitive(context);
      if (!isAuthorized) {
        const err = new Error('403 Forbidden: Access denied. Sensitive incident safeguarding details are restricted to designated safety officers.');
        err.status = 403;
        err.code = 'SENSITIVE_INCIDENT_ACCESS_RESTRICTED';
        throw err;
      }

      this.recordAudit({
        organizationId: this.organization.id,
        campusId: inc.campusId,
        userId: context ? context.userId : null,
        userRole: context ? (context.role || context.userRole) : null,
        action: 'OPERATIONS_SENSITIVE_INCIDENT_ACCESSED',
        entityName: 'Incident',
        entityId: inc.id,
        diffBefore: null,
        diffAfter: { viewedIncidentNumber: inc.incidentNumber, accessedAt: new Date().toISOString() }
      });
    }

    return inc;
  }

  createIncident(context, incidentData) {
    const campusId = this._resolveCampusId(context) || incidentData.campusId;
    this.validateCampusBoundary(campusId);

    const sensitiveCategories = ['SAFEGUARDING', 'BULLYING', 'HARASSMENT', 'MEDICAL_EMERGENCY'];
    const isSensitive = Boolean(incidentData.isSensitive || sensitiveCategories.includes(incidentData.category));

    const newInc = {
      id: `inc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      incidentNumber: incidentData.incidentNumber || `INC-2026-${String(this.incidents.length + 1).padStart(3, '0')}`,
      title: incidentData.title,
      category: incidentData.category || 'FIRST_AID',
      severity: incidentData.severity || 'LOW',
      isSensitive,
      occurredAt: incidentData.occurredAt || new Date().toISOString(),
      location: incidentData.location || 'Campus Grounds',
      reportedBy: context ? context.userId : (incidentData.reportedBy || 'Staff Member'),
      reportedByName: incidentData.reportedByName || 'Staff Member',
      personsInvolvedJson: typeof incidentData.personsInvolvedJson === 'string'
        ? incidentData.personsInvolvedJson
        : JSON.stringify(incidentData.personsInvolved || []),
      description: incidentData.description,
      immediateActionTaken: incidentData.immediateActionTaken || null,
      status: incidentData.status || 'REPORTED',
      designatedOfficer: incidentData.designatedOfficer || (isSensitive ? 'Child Protection Officer' : null),
      sensitiveNotes: isSensitive ? (incidentData.sensitiveNotes || null) : null,
      resolutionSummary: incidentData.resolutionSummary || null,
      resolvedAt: incidentData.status === 'RESOLVED' ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.incidents.push(newInc);

    this.recordAudit({
      organizationId: this.organization.id,
      campusId,
      userId: context ? context.userId : null,
      userRole: context ? (context.role || context.userRole) : null,
      action: isSensitive ? 'OPERATIONS_SENSITIVE_INCIDENT_LOGGED' : 'OPERATIONS_INCIDENT_LOGGED',
      entityName: 'Incident',
      entityId: newInc.id,
      diffBefore: null,
      diffAfter: { incidentNumber: newInc.incidentNumber, category: newInc.category, severity: newInc.severity, isSensitive }
    });

    return newInc;
  }

  updateIncident(context, incidentId, updates) {
    const inc = this.incidents.find(i => i.id === incidentId || i.incidentNumber === incidentId);
    if (!inc) throw new Error(`Incident '${incidentId}' not found.`);

    const campusId = this._resolveCampusId(context);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    if (inc.isSensitive) {
      const isAuthorized = this._isAuthorizedForSensitive(context);
      if (!isAuthorized) {
        throw new Error('403 Forbidden: Only designated safety officers and administrators can update sensitive incident records.');
      }
    }

    if (updates.status === 'RESOLVED' && !updates.resolvedAt) {
      updates.resolvedAt = new Date().toISOString();
    }
    Object.assign(inc, updates, { updatedAt: new Date().toISOString() });

    this.recordAudit({
      organizationId: this.organization.id,
      campusId: inc.campusId,
      userId: context ? context.userId : null,
      userRole: context ? (context.role || context.userRole) : null,
      action: 'OPERATIONS_INCIDENT_UPDATED',
      entityName: 'Incident',
      entityId: inc.id,
      diffBefore: null,
      diffAfter: { status: inc.status, resolutionSummary: inc.resolutionSummary }
    });

    return inc;
  }

  // --- COMPLAINTS & GRIEVANCE REDRESSAL ---
  getComplaints(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.complaints.filter(c => !campusId || campusId === 'ALL' || c.campusId === campusId);
    if (filters.category) list = list.filter(c => c.category === filters.category);
    if (filters.status) list = list.filter(c => c.status === filters.status);
    if (filters.priority) list = list.filter(c => c.priority === filters.priority);
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createComplaint(contextOrCampusId, complaintData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || complaintData.campusId;
    this.validateCampusBoundary(campusId);

    const newGrievance = {
      id: `grv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      ticketNumber: complaintData.ticketNumber || `GRV-2026-${String(this.complaints.length + 1).padStart(3, '0')}`,
      complainantType: complaintData.complainantType || 'PARENT',
      complainantName: complaintData.complainantName,
      contactPhone: complaintData.contactPhone || null,
      contactEmail: complaintData.contactEmail || null,
      category: complaintData.category || 'ADMIN',
      priority: complaintData.priority || 'MEDIUM',
      subject: complaintData.subject,
      description: complaintData.description,
      status: 'OPEN',
      assignedTo: complaintData.assignedTo || null,
      resolutionSummary: null,
      resolvedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.complaints.push(newGrievance);
    return newGrievance;
  }

  updateComplaint(contextOrCampusId, ticketId, updates) {
    const cmp = this.complaints.find(c => c.id === ticketId || c.ticketNumber === ticketId);
    if (!cmp) throw new Error(`Complaint '${ticketId}' not found.`);
    const campusId = this._resolveCampusId(contextOrCampusId);
    if (campusId && campusId !== 'ALL') this.validateCampusBoundary(campusId);

    if (updates.status === 'RESOLVED' && !updates.resolvedAt) {
      updates.resolvedAt = new Date().toISOString();
    }
    Object.assign(cmp, updates, { updatedAt: new Date().toISOString() });
    return cmp;
  }

  // --- TRANSPORT FOUNDATION ---
  getVehicles(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.vehicles.filter(v => !campusId || campusId === 'ALL' || v.campusId === campusId);
    if (filters.status) list = list.filter(v => v.status === filters.status);
    return list;
  }

  createVehicle(contextOrCampusId, vehicleData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || vehicleData.campusId;
    this.validateCampusBoundary(campusId);

    if (this.vehicles.some(v => v.campusId === campusId && v.vehicleNumber.toLowerCase() === vehicleData.vehicleNumber.toLowerCase())) {
      throw new Error(`Vehicle '${vehicleData.vehicleNumber}' already exists in this campus.`);
    }

    const newVeh = {
      id: `veh-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      vehicleNumber: vehicleData.vehicleNumber,
      vehicleType: vehicleData.vehicleType || 'BUS_40_SEATER',
      makeModel: vehicleData.makeModel,
      capacity: Number(vehicleData.capacity) || 40,
      insuranceExpiryDate: vehicleData.insuranceExpiryDate || null,
      fitnessExpiryDate: vehicleData.fitnessExpiryDate || null,
      pucExpiryDate: vehicleData.pucExpiryDate || null,
      gpsDeviceId: vehicleData.gpsDeviceId || null,
      status: vehicleData.status || 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.vehicles.push(newVeh);
    return newVeh;
  }

  getTransportRoutes(contextOrCampusId, filters = {}) {
    const campusId = this._validateOperationsCampus(contextOrCampusId, filters);

    let list = this.transportRoutes.filter(r => !campusId || campusId === 'ALL' || r.campusId === campusId);
    if (filters.status) list = list.filter(r => r.status === filters.status);
    return list.map(r => {
      const veh = this.vehicles.find(v => v.id === r.vehicleId);
      return {
        ...r,
        vehicleNumber: veh ? veh.vehicleNumber : null,
        vehicleCapacity: veh ? veh.capacity : null
      };
    });
  }

  createTransportRoute(contextOrCampusId, routeData) {
    const campusId = this._resolveCampusId(contextOrCampusId) || routeData.campusId;
    this.validateCampusBoundary(campusId);

    if (this.transportRoutes.some(r => r.campusId === campusId && r.routeNumber.toLowerCase() === routeData.routeNumber.toLowerCase())) {
      throw new Error(`Route '${routeData.routeNumber}' already registered in this campus.`);
    }

    const newRoute = {
      id: `rte-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      campusId,
      routeNumber: routeData.routeNumber,
      routeName: routeData.routeName,
      vehicleId: routeData.vehicleId || null,
      driverName: routeData.driverName,
      driverPhone: routeData.driverPhone,
      attendantName: routeData.attendantName || null,
      attendantPhone: routeData.attendantPhone || null,
      morningStartTime: routeData.morningStartTime || '07:15 AM',
      eveningStartTime: routeData.eveningStartTime || '03:30 PM',
      stopsJson: typeof routeData.stopsJson === 'string' ? routeData.stopsJson : JSON.stringify(routeData.stops || []),
      activeStudentsCount: Number(routeData.activeStudentsCount) || 0,
      status: routeData.status || 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.transportRoutes.push(newRoute);
    return newRoute;
  }
}

export const db = new VedicTreeDatabase();
