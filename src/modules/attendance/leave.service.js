// VEDIC TREE OS — Leave Management & Multi-Stage Approval Workflow Service
import { db } from '../../database/db.js';
import { RbacService } from '../platform/rbac.service.js';
import { TenantContext } from '../platform/tenant.context.js';
import { PolicyEngine } from './policy.engine.js';
import { Logger } from '../platform/logger.service.js';

export class LeaveService {
  /**
   * Submit a new leave request (Staff or Student)
   * Evaluates sandwich leave rules dynamically and reserves pending balance
   * @param {object} context - Tenant security context
   * @param {object} leaveData - { applicantId, applicantType, leaveType, startDate, endDate, reason, isHalfDay }
   */
  static applyLeave(context, leaveData) {
    RbacService.enforce(context.userRole, 'leaves:apply');

    const campusId = leaveData.campusId || context.campusId;
    TenantContext.validateCampusBoundary(context, campusId);

    const { applicantId, leaveType, startDate, endDate, isHalfDay, reason } = leaveData;

    if (!applicantId || !startDate || !endDate || !reason) {
      throw new Error('VALIDATION_ERROR: applicantId, startDate, endDate, and reason are required.');
    }

    const policy = db.getAttendancePolicy(campusId);
    const holidays = db.getHolidays(campusId);

    // Evaluate sandwich leave penalty dynamically
    const sandwichEvaluation = PolicyEngine.evaluateSandwichLeave(policy, {
      leaveType,
      startDate,
      endDate,
      campusHolidays: holidays
    });

    const totalDays = isHalfDay ? 0.5 : sandwichEvaluation.effectiveTotalDays;

    // Check balance if applicant is employee
    if (leaveData.applicantType !== 'STUDENT') {
      const balances = db.getLeaveBalances(context, applicantId);
      const balance = balances.find(b => b.leaveType === leaveType);

      if (balance && balance.remainingDays < totalDays) {
        const err = new Error(`INSUFFICIENT_LEAVE_BALANCE: Requested ${totalDays} days of ${leaveType}, but only ${balance.remainingDays} days remain.`);
        err.code = 'INSUFFICIENT_LEAVE_BALANCE';
        err.status = 400;
        throw err;
      }
    }

    const request = db.createLeaveRequest(context, {
      ...leaveData,
      campusId,
      totalDays,
      isSandwichPenaltyApplied: sandwichEvaluation.isSandwichPenaltyApplied,
      sandwichDaysCount: sandwichEvaluation.sandwichDaysCount
    });

    Logger.info('LeaveService', `Leave request submitted: ${request.id} for ${applicantId} (${totalDays} days)`);
    return request;
  }

  /**
   * List leave requests with tenant filtering
   * @param {object} context
   * @param {object} filters
   */
  static listRequests(context, filters = {}) {
    RbacService.enforce(context.userRole, 'leaves:read');
    if (filters.campusId) {
      TenantContext.validateCampusBoundary(context, filters.campusId);
    }
    return db.getLeaveRequests(context, filters);
  }

  /**
   * Get employee leave balances
   * @param {object} context
   * @param {string} employeeId
   */
  static getBalances(context, employeeId) {
    RbacService.enforce(context.userRole, 'leaves:read');
    return db.getLeaveBalances(context, employeeId);
  }

  /**
   * Approve a pending leave request
   * Enforces 'leaves:approve' permission and deducts quota
   * @param {object} context
   * @param {string} requestId
   * @param {string} approverRemarks
   */
  static approveLeave(context, requestId, approverRemarks = 'Approved by administrator') {
    RbacService.enforce(context.userRole, 'leaves:approve');

    const updated = db.updateLeaveRequestStatus(context, requestId, {
      status: 'APPROVED',
      approverRemarks,
      approverId: context.userId,
      approverRole: context.userRole
    });

    // Mark staff attendance ledger as 'LEAVE' for the approved dates if employee
    if (updated.applicantType === 'EMPLOYEE') {
      const start = new Date(updated.startDate);
      const end = new Date(updated.endDate);
      const current = new Date(start);

      while (current <= end) {
        const dateStr = current.toISOString().split('T')[0];
        db.recordStaffAttendance(context, {
          campusId: updated.campusId,
          employeeId: updated.applicantId,
          date: dateStr,
          status: 'LEAVE',
          source: 'MANUAL',
          remarks: `Approved ${updated.leaveType} (${approverRemarks})`
        });
        current.setDate(current.getDate() + 1);
      }
    }

    Logger.info('LeaveService', `Leave request approved: ${requestId}`, { approver: context.userId });
    return updated;
  }

  /**
   * Reject a pending leave request
   * Enforces 'leaves:approve' permission and restores pending balance
   * @param {object} context
   * @param {string} requestId
   * @param {string} approverRemarks
   */
  static rejectLeave(context, requestId, approverRemarks = 'Rejected per administrative policy') {
    RbacService.enforce(context.userRole, 'leaves:approve');

    const updated = db.updateLeaveRequestStatus(context, requestId, {
      status: 'REJECTED',
      approverRemarks,
      approverId: context.userId,
      approverRole: context.userRole
    });

    Logger.info('LeaveService', `Leave request rejected: ${requestId}`, { remarks: approverRemarks });
    return updated;
  }
}
