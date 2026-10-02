// VEDIC TREE OS — Tenant Context & Multi-Tenant Boundary Enforcement
import { db } from '../../database/db.js';

export class TenantContext {
  /**
   * Validate that the active context has permission to query or mutate target entity
   * @param {object} context - { organizationId, campusId, userRole }
   * @param {string} targetCampusId
   */
  static validateCampusBoundary(context, targetCampusId) {
    if (!context) {
      const err = new Error('UNAUTHORIZED: No tenant security context attached.');
      err.code = 'NO_TENANT_CONTEXT';
      err.status = 401;
      throw err;
    }

    // HQ Admin can view/act across all campuses
    if (context.userRole === 'HQ_ADMIN') {
      return true;
    }

    if (context.campusId && targetCampusId && context.campusId !== targetCampusId) {
      const err = new Error(`TENANT_ISOLATION_VIOLATION: Cross-tenant operation blocked. User is scoped to campus ${context.campusId}, but attempted to access campus ${targetCampusId}.`);
      err.code = 'TENANT_ISOLATION_VIOLATION';
      err.status = 403;
      throw err;
    }

    return true;
  }

  /**
   * Resolve campus information from context
   * @param {string} campusId
   */
  static getCampusDetails(campusId) {
    return db.getCampusById(campusId);
  }
}
