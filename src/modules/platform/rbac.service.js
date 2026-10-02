// VEDIC TREE OS — RBAC & CASL-style Authorization Service
import { db } from '../../database/db.js';

export class RbacService {
  /**
   * Check if a user/role has permission for a specific module action
   * @param {string} userRole
   * @param {string} permissionCode - e.g. 'students:read', 'students:create', 'employees:delete'
   */
  static hasPermission(userRole, permissionCode) {
    if (!userRole) return false;
    if (userRole === 'HQ_ADMIN') return true; // Global Super Admin has all rights

    const permissions = db.rolePermissions[userRole] || [];
    return permissions.includes(permissionCode);
  }

  /**
   * Enforce permission or throw 403 Forbidden
   * @param {string} userRole
   * @param {string} permissionCode
   */
  static enforce(userRole, permissionCode) {
    if (!this.hasPermission(userRole, permissionCode)) {
      const err = new Error(`FORBIDDEN: Role '${userRole}' lacks required permission '${permissionCode}'.`);
      err.code = 'PERMISSION_DENIED';
      err.status = 403;
      throw err;
    }
    return true;
  }

  /**
   * Get all permission codes for a role
   * @param {string} userRole
   */
  static getPermissionsForRole(userRole) {
    if (userRole === 'HQ_ADMIN') {
      return db.permissions.map(p => p.code);
    }
    return db.rolePermissions[userRole] || [];
  }
}
