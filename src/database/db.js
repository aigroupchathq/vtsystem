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
  SEED_STUDENT_ATTENDANCE
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
}

export const db = new VedicTreeDatabase();
