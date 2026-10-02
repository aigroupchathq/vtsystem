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
  INITIAL_AUDIT_LOGS
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
}

export const db = new VedicTreeDatabase();
