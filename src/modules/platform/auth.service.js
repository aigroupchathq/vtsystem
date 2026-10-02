// VEDIC TREE OS — Authentication Service & Session Token Management
import { db } from '../../database/db.js';

export class AuthService {
  /**
   * Authenticate user with credentials
   * @param {string} email
   * @param {string} password
   */
  static login(email, password) {
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      const err = new Error('INVALID_CREDENTIALS: User not found with provided email.');
      err.code = 'AUTH_FAILED';
      err.status = 401;
      throw err;
    }

    if (user.passwordHash !== password) {
      const err = new Error('INVALID_CREDENTIALS: Password does not match.');
      err.code = 'AUTH_FAILED';
      err.status = 401;
      throw err;
    }

    if (user.status !== 'ACTIVE') {
      const err = new Error('ACCOUNT_SUSPENDED: User account is inactive or suspended.');
      err.code = 'ACCOUNT_INACTIVE';
      err.status = 403;
      throw err;
    }

    // Determine user role and accessible scopes
    const userRole = user.roleCode || 'PARENT';
    const roleDef = db.roles.find(r => r.code === userRole);

    // Build accessible campuses
    let accessibleCampuses = [];
    if (userRole === 'HQ_ADMIN') {
      accessibleCampuses = db.campuses.map(c => ({ id: c.id, name: c.name, code: c.code, schoolId: c.schoolId }));
    } else if (user.campusId) {
      const c = db.getCampusById(user.campusId);
      if (c) accessibleCampuses = [{ id: c.id, name: c.name, code: c.code, schoolId: c.schoolId }];
    } else {
      // Default to Baner
      const c = db.campuses[0];
      accessibleCampuses = [{ id: c.id, name: c.name, code: c.code, schoolId: c.schoolId }];
    }

    const initialCampus = user.campusId || accessibleCampuses[0]?.id || 'cmp-pune-baner';

    // Generate lightweight JWT-like session token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      userRole,
      scopeLevel: roleDef?.scopeLevel || 'CAMPUS',
      organizationId: user.organizationId,
      campusId: initialCampus,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24h
    };

    const token = btoa(JSON.stringify(tokenPayload));

    // Record login audit
    db.recordAudit({
      organizationId: user.organizationId,
      campusId: initialCampus,
      userId: user.id,
      userRole,
      action: 'LOGIN',
      entityName: 'User',
      entityId: user.id,
      diffBefore: null,
      diffAfter: { email: user.email, campusId: initialCampus }
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: userRole,
        roleTitle: roleDef?.name || userRole,
        avatarUrl: user.avatarUrl
      },
      tenantContext: {
        organizationId: user.organizationId,
        activeCampusId: initialCampus,
        accessibleCampuses
      }
    };
  }

  /**
   * Decode and verify session token
   * @param {string} token
   */
  static verifyToken(token) {
    if (!token) {
      const err = new Error('UNAUTHORIZED: No authentication token provided.');
      err.code = 'NO_TOKEN';
      err.status = 401;
      throw err;
    }

    try {
      const payload = JSON.parse(atob(token));
      if (Date.now() > payload.expiresAt) {
        const err = new Error('TOKEN_EXPIRED: Session has expired. Please re-login.');
        err.code = 'TOKEN_EXPIRED';
        err.status = 401;
        throw err;
      }
      return payload;
    } catch {
      const err = new Error('INVALID_TOKEN: Failed to parse token payload.');
      err.code = 'INVALID_TOKEN';
      err.status = 401;
      throw err;
    }
  }

  /**
   * Switch active campus within session token
   * @param {string} token
   * @param {string} targetCampusId
   */
  static switchCampus(token, targetCampusId) {
    const payload = this.verifyToken(token);

    // Verify user has access to target campus
    if (payload.userRole !== 'HQ_ADMIN') {
      const targetCampus = db.getCampusById(targetCampusId);
      if (!targetCampus || payload.campusId !== targetCampusId) {
        const err = new Error(`ACCESS_DENIED: Role ${payload.userRole} cannot switch to campus ${targetCampusId}.`);
        err.code = 'CAMPUS_SWITCH_FORBIDDEN';
        err.status = 403;
        throw err;
      }
    }

    const updatedPayload = {
      ...payload,
      campusId: targetCampusId,
      issuedAt: Date.now()
    };

    const newToken = btoa(JSON.stringify(updatedPayload));

    db.recordAudit({
      organizationId: payload.organizationId,
      campusId: targetCampusId,
      userId: payload.userId,
      userRole: payload.userRole,
      action: 'SWITCH_TENANT',
      entityName: 'Campus',
      entityId: targetCampusId,
      diffBefore: { previousCampusId: payload.campusId },
      diffAfter: { newCampusId: targetCampusId }
    });

    return {
      token: newToken,
      activeCampusId: targetCampusId
    };
  }
}
