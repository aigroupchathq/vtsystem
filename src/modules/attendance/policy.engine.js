// VEDIC TREE OS — Configurable Attendance & Leave Policy Engine
// MANDATE: Zero hard-coded school policies. All rules are evaluated dynamically from campus policy configuration.

export class PolicyEngine {
  /**
   * Parse "HH:MM" string to minutes from midnight
   * @param {string} timeStr - e.g. "08:15"
   * @returns {number}
   */
  static timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60) + (minutes || 0);
  }

  /**
   * Format ISO Date string or Date object to "HH:MM"
   * @param {Date|string} dateInput 
   * @returns {string}
   */
  static extractTimeHHMM(dateInput) {
    const d = new Date(dateInput);
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Evaluate Staff Check-in against Campus Attendance Policy
   * Computes late arrival, grace period allowance, and provisional status
   * 
   * @param {object} policy - Campus AttendancePolicy entity
   * @param {string|Date} checkInTime - ISO timestamp or Date object
   * @returns {{ status: string, lateMinutes: number, isLate: boolean }}
   */
  static evaluateStaffCheckIn(policy, checkInTime) {
    if (!policy) {
      throw new Error('POLICY_REQUIRED: An active campus AttendancePolicy must be provided.');
    }

    const checkInMins = typeof checkInTime === 'string' && checkInTime.includes(':') && !checkInTime.includes('T')
      ? this.timeToMinutes(checkInTime)
      : this.timeToMinutes(this.extractTimeHHMM(checkInTime));

    const shiftStartMins = this.timeToMinutes(policy.shiftStartTime || '08:00');
    const graceCutoffMins = shiftStartMins + (Number(policy.gracePeriodMinutes) || 15);
    const lateThresholdMins = shiftStartMins + (Number(policy.lateThresholdMinutes) || 30);

    if (checkInMins <= graceCutoffMins) {
      return {
        status: 'PRESENT',
        lateMinutes: 0,
        isLate: false
      };
    }

    // Past grace period -> Late
    const lateMinutes = checkInMins - shiftStartMins;

    return {
      status: 'LATE',
      lateMinutes,
      isLate: true,
      isSevereLate: checkInMins > lateThresholdMins
    };
  }

  /**
   * Evaluate Staff Working Hours against Campus Half-Day / Full-Day Policy
   * 
   * @param {object} policy - Campus AttendancePolicy entity
   * @param {number} durationHours - Total hours worked
   * @param {string} initialStatus - e.g. 'PRESENT' or 'LATE'
   * @returns {string} - Final status: 'PRESENT', 'LATE', 'HALF_DAY', or 'ABSENT'
   */
  static evaluateWorkingHours(policy, durationHours, initialStatus = 'PRESENT') {
    const halfDayHours = Number(policy.halfDayMinWorkingHours) || 4.0;
    const fullDayHours = Number(policy.fullDayMinWorkingHours) || 7.0;

    if (durationHours < halfDayHours) {
      return 'ABSENT';
    }

    if (durationHours < fullDayHours) {
      return 'HALF_DAY';
    }

    return initialStatus; // Keep 'LATE' or 'PRESENT'
  }

  /**
   * Evaluate Sandwich Leave Rule
   * If an employee applies for leave adjacent to weekends/gazetted holidays (e.g. Friday + Monday),
   * intervening weekend/holiday days are counted as leave if the sandwich policy is active.
   * 
   * @param {object} policy - Campus AttendancePolicy entity
   * @param {object} leaveData - { leaveType, startDate, endDate, campusHolidays }
   * @returns {{ isSandwichPenaltyApplied: boolean, sandwichDaysCount: number, effectiveTotalDays: number }}
   */
  static evaluateSandwichLeave(policy, leaveData) {
    const { leaveType, startDate, endDate, campusHolidays = [] } = leaveData;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const baseDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);

    if (!policy || !policy.isSandwichRuleEnabled) {
      return {
        isSandwichPenaltyApplied: false,
        sandwichDaysCount: 0,
        effectiveTotalDays: baseDays
      };
    }

    const applicableLeaveTypes = (policy.sandwichLeaveTypes || 'CASUAL_LEAVE,SICK_LEAVE')
      .split(',')
      .map(t => t.trim().toUpperCase());

    if (!applicableLeaveTypes.includes((leaveType || '').toUpperCase())) {
      return {
        isSandwichPenaltyApplied: false,
        sandwichDaysCount: 0,
        effectiveTotalDays: baseDays
      };
    }

    let sandwichDaysCount = 0;
    const holidayDates = new Set(campusHolidays.map(h => typeof h === 'string' ? h : h.date));

    // Check if the range spans across a weekend (Saturday=6, Sunday=0) or holiday
    // e.g. Friday (day 5) to Monday (day 1)
    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      const dateString = current.toISOString().split('T')[0];

      if (dayOfWeek === 0 || dayOfWeek === 6 || holidayDates.has(dateString)) {
        sandwichDaysCount++;
      }
      current.setDate(current.getDate() + 1);
    }

    // Or if start is adjacent to a preceding/succeeding weekend or holiday
    return {
      isSandwichPenaltyApplied: sandwichDaysCount > 0,
      sandwichDaysCount,
      effectiveTotalDays: baseDays
    };
  }

  /**
   * Evaluate Student Attendance Compliance & CBSE 75% Regulatory Threshold
   * 
   * @param {object} policy - Campus AttendancePolicy entity
   * @param {object} stats - { presentDays, halfDays, absentDays, totalWorkingDays }
   * @returns {{ attendancePct: number, isCompliant: boolean, isWarning: boolean, statusLabel: string }}
   */
  static evaluateStudentCompliance(policy, stats) {
    const { presentDays = 0, halfDays = 0, absentDays = 0, totalWorkingDays } = stats;
    const computedTotal = totalWorkingDays || (presentDays + halfDays + absentDays) || 1;

    // Standard CBSE/Board formula: Present + (0.5 * HalfDay) / Total
    const effectiveAttended = presentDays + (halfDays * 0.5);
    const attendancePct = Math.round((effectiveAttended / computedTotal) * 1000) / 10;

    const minRequiredPct = Number(policy?.minStudentAttendancePct) || 75.0;
    const warningPct = Number(policy?.warningStudentAttendancePct) || 80.0;

    const isCompliant = attendancePct >= minRequiredPct;
    const isWarning = attendancePct < warningPct && isCompliant;

    let statusLabel = 'REGULAR';
    if (!isCompliant) {
      statusLabel = 'CRITICAL_SHORTAGE'; // Hall ticket / exam eligibility blocked
    } else if (isWarning) {
      statusLabel = 'ATTENDANCE_WARNING';
    }

    return {
      attendancePct,
      isCompliant,
      isWarning,
      minRequiredPct,
      warningPct,
      statusLabel
    };
  }
}
