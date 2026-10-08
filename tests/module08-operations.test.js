// VEDIC TREE OS — MODULE 08: SCHOOL OPERATIONS COMPREHENSIVE TEST SUITE
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/db.js';
import { OperationsService } from '../src/modules/operations/index.js';

describe('MODULE 08: SCHOOL OPERATIONS & LOGISTICS TEST SUITE', () => {
  let operations;
  let banerPrincipalContext;
  let banerTeacherContext;
  let kothrudContext;
  let hqContext;

  beforeEach(() => {
    db.reset();
    operations = new OperationsService(db);

    banerPrincipalContext = {
      tenantId: 'org-vedic-tree-foundation',
      schoolId: 'sch-pune-intl',
      campusId: 'cmp-pune-baner',
      role: 'PRINCIPAL',
      userId: 'usr-principal-baner'
    };

    banerTeacherContext = {
      tenantId: 'org-vedic-tree-foundation',
      schoolId: 'sch-pune-intl',
      campusId: 'cmp-pune-baner',
      role: 'TEACHER',
      userId: 'usr-teacher-sunita'
    };

    kothrudContext = {
      tenantId: 'org-vedic-tree-foundation',
      schoolId: 'sch-pune-intl',
      campusId: 'cmp-pune-kothrud',
      role: 'PRINCIPAL',
      userId: 'usr-principal-kothrud'
    };

    hqContext = {
      tenantId: 'org-vedic-tree-foundation',
      campusId: 'ALL',
      role: 'HQ_ADMIN',
      userId: 'usr-hq-admin'
    };
  });

  // ====================================================
  // 1. Physical Asset Register
  // ====================================================
  describe('1. Physical Asset Register', () => {
    it('1.1 Fetches assets in campus and filters by category', () => {
      const allAssets = operations.getAssets(banerPrincipalContext);
      assert.ok(allAssets.length >= 5, 'Should have seed assets');

      const itAssets = operations.getAssets(banerPrincipalContext, { category: 'IT_HARDWARE' });
      assert.ok(itAssets.length >= 2);
      assert.ok(itAssets.every(a => a.category === 'IT_HARDWARE'));
    });

    it('1.2 Creates a new physical asset with unique asset code', () => {
      const newAsset = operations.createAsset(banerPrincipalContext, {
        assetCode: 'AST-SCI-002',
        name: 'Digital Spectrophotometer UV-Vis',
        category: 'LAB_EQUIPMENT',
        purchaseCost: 95000,
        currentStatus: 'IN_USE',
        locationFacilityId: 'fac-002'
      });
      assert.equal(newAsset.assetCode, 'AST-SCI-002');
      assert.equal(newAsset.purchaseCost, 95000);

      // Rejects duplicate code in same campus
      assert.throws(() => {
        operations.createAsset(banerPrincipalContext, {
          assetCode: 'AST-SCI-002',
          name: 'Duplicate Item',
          category: 'LAB_EQUIPMENT'
        });
      }, /already exists in this campus/);
    });

    it('1.3 Updates asset status during maintenance transitions', () => {
      const updated = operations.updateAsset(banerPrincipalContext, 'ast-001', {
        currentStatus: 'UNDER_MAINTENANCE',
        notes: 'Sent to Dell Authorized Service Center for keyboard replacement'
      });
      assert.equal(updated.currentStatus, 'UNDER_MAINTENANCE');
      assert.ok(updated.notes.includes('Dell Authorized'));
    });
  });

  // ====================================================
  // 2. Consumable Inventory & Stock Transactions
  // ====================================================
  describe('2. Consumable Inventory & Stock Transactions', () => {
    it('2.1 Identifies low stock items requiring replenishment', () => {
      const lowStock = operations.getInventoryItems(banerPrincipalContext, { lowStockOnly: true });
      assert.ok(lowStock.length > 0);
      assert.ok(lowStock.some(i => i.itemCode === 'INV-MED-001'), 'First aid kits should be flagged low stock');
    });

    it('2.2 Records INWARD stock movement and increments balance', () => {
      const initialItem = operations.getInventoryItems(banerPrincipalContext).find(i => i.id === 'inv-002');
      const startStock = initialItem.currentStock;

      const tx = operations.recordStockMovement(banerPrincipalContext, {
        itemId: 'inv-002',
        type: 'INWARD',
        quantity: 20,
        referenceNumber: 'PO-2026-003',
        notes: 'Restocked whiteboard markers'
      });

      assert.equal(tx.type, 'INWARD');
      assert.equal(tx.quantity, 20);
      assert.equal(tx.balanceAfter, startStock + 20);

      const refreshed = operations.getInventoryItems(banerPrincipalContext).find(i => i.id === 'inv-002');
      assert.equal(refreshed.currentStock, startStock + 20);
    });

    it('2.3 Blocks OUTWARD dispatch when requested quantity exceeds available stock', () => {
      const item = operations.getInventoryItems(banerPrincipalContext).find(i => i.id === 'inv-004'); // currentStock = 8
      assert.throws(() => {
        operations.recordStockMovement(banerPrincipalContext, {
          itemId: item.id,
          type: 'OUTWARD',
          quantity: 25, // Exceeds 8
          issuedTo: 'Sports Department'
        });
      }, /Insufficient stock/);
    });

    it('2.4 Successfully dispatches stock when quantity is valid', () => {
      const item = operations.getInventoryItems(banerPrincipalContext).find(i => i.id === 'inv-001'); // 120 reams
      const prevStock = item.currentStock;

      const tx = operations.recordStockMovement(banerPrincipalContext, {
        itemId: item.id,
        type: 'OUTWARD',
        quantity: 15,
        issuedTo: 'Administration Office'
      });

      assert.equal(tx.balanceAfter, prevStock - 15);
      assert.equal(item.currentStock, prevStock - 15);
    });
  });

  // ====================================================
  // 3. Vendor Master & Performance
  // ====================================================
  describe('3. Vendor Master & Performance', () => {
    it('3.1 Fetches vendor directory and filters by category', () => {
      const vendors = operations.getVendors(banerPrincipalContext);
      assert.ok(vendors.length >= 5);

      const itVendors = operations.getVendors(banerPrincipalContext, { category: 'IT_SOLUTIONS' });
      assert.ok(itVendors.some(v => v.name.includes('Apex IT')));
    });

    it('3.2 Onboards new vendor and blocks duplicate vendor code', () => {
      const newVendor = operations.createVendor(banerPrincipalContext, {
        vendorCode: 'VND-006',
        name: 'Mahalaxmi Sports Goods & Uniforms',
        category: 'SPORTS',
        contactPerson: 'Mr. Arvind Shinde',
        phone: '+91 98229 11223'
      });
      assert.equal(newVendor.vendorCode, 'VND-006');

      assert.throws(() => {
        operations.createVendor(banerPrincipalContext, {
          vendorCode: 'VND-006',
          name: 'Duplicate Vendor',
          contactPerson: 'Person'
        });
      }, /already exists/);
    });
  });

  // ====================================================
  // 4. Procurement & Purchase Orders
  // ====================================================
  describe('4. Procurement & Purchase Orders', () => {
    it('4.1 Creates purchase order with calculated totals and tax', () => {
      const po = operations.createPurchaseOrder(banerPrincipalContext, {
        vendorId: 'vnd-003',
        orderDate: '2026-10-01T00:00:00Z',
        items: [
          { description: 'Glass Test Tubes 50ml (Pack of 100)', quantity: 10, unitCost: 450, total: 4500 },
          { description: 'Bunsen Burners with Tubing', quantity: 5, unitCost: 800, total: 4000 }
        ],
        taxAmount: 1530 // 18% GST
      });

      assert.ok(po.poNumber.startsWith('PO-2026-'));
      assert.equal(po.subtotal, 8500);
      assert.equal(po.totalAmount, 10030);
      assert.equal(po.status, 'PENDING_APPROVAL');
    });

    it('4.2 Approves purchase order and records immutable audit log', () => {
      const approved = operations.approvePurchaseOrder(banerPrincipalContext, 'po-002');
      assert.equal(approved.status, 'APPROVED');
      assert.equal(approved.approvedBy, banerPrincipalContext.userId);
      assert.ok(approved.approvedAt);

      const logs = db.getAuditLogs(banerPrincipalContext);
      assert.ok(logs.some(l => l.action === 'OPERATIONS_PURCHASE_ORDER_APPROVED' && l.entityId === 'po-002'));
    });

    it('4.3 Marks purchase order as received upon delivery', () => {
      const received = operations.receivePurchaseOrder(banerPrincipalContext, 'po-001');
      assert.equal(received.status, 'RECEIVED');
      assert.ok(received.receivedAt);
    });
  });

  // ====================================================
  // 5. Facilities & Booking Conflict Invariant
  // ====================================================
  describe('5. Facilities & Booking Conflict Invariant', () => {
    it('5.1 Lists campus facilities with amenities', () => {
      const facilities = operations.getFacilities(banerPrincipalContext);
      assert.ok(facilities.length >= 6);
      const auditorium = facilities.find(f => f.type === 'AUDITORIUM');
      assert.ok(auditorium.capacity >= 300);
      assert.equal(auditorium.airConditioned, true);
    });

    it('5.2 Successfully books a facility for a valid time slot', () => {
      const booking = operations.bookFacility(banerPrincipalContext, {
        facilityId: 'fac-002',
        title: 'Science Olympiad Preparatory Session',
        bookedBy: 'Dr. Anand (Faculty)',
        startTime: '2026-10-10T14:00:00Z',
        endTime: '2026-10-10T16:00:00Z'
      });
      assert.equal(booking.status, 'CONFIRMED');
      assert.equal(booking.facilityId, 'fac-002');
    });

    it('5.3 Detects and rejects overlapping booking on same facility (Conflict Invariant)', () => {
      // fb-001 is in fac-003 from 2026-10-05T14:30:00Z to 16:30:00Z
      assert.throws(() => {
        operations.bookFacility(banerPrincipalContext, {
          facilityId: 'fac-003',
          title: 'Conflicting AI Coding Workshop',
          startTime: '2026-10-05T15:00:00Z', // Overlaps with fb-001!
          endTime: '2026-10-05T17:00:00Z'
        });
      }, /already reserved during the requested time window/);
    });
  });

  // ====================================================
  // 6. Maintenance Ticketing
  // ====================================================
  describe('6. Maintenance Ticketing', () => {
    it('6.1 Submits maintenance ticket with priority and category', () => {
      const ticket = operations.reportMaintenanceIssue(banerPrincipalContext, {
        facilityId: 'fac-006',
        title: 'Infirmary Washroom Tap Faucet Leak',
        category: 'PLUMBING',
        priority: 'MEDIUM',
        description: 'Continuous dripping from medical wash basin',
        reportedBy: 'Nurse Archana'
      });
      assert.equal(ticket.status, 'LOGGED');
      assert.equal(ticket.category, 'PLUMBING');
    });

    it('6.2 Resolves maintenance ticket with cost and resolution timestamp', () => {
      const resolved = operations.updateMaintenanceTicket(banerPrincipalContext, 'mnt-001', {
        status: 'RESOLVED',
        actualCost: 3200,
        resolutionNotes: 'Cassette valve repaired and R410A gas recharged to optimal pressure.'
      });
      assert.equal(resolved.status, 'RESOLVED');
      assert.equal(resolved.actualCost, 3200);
      assert.ok(resolved.resolvedAt);
    });
  });

  // ====================================================
  // 7. Visitor Gate Pass Management
  // ====================================================
  describe('7. Visitor Gate Pass Management', () => {
    it('7.1 Generates check-in gate pass and masks government ID proof', () => {
      const pass = operations.checkInVisitor(banerPrincipalContext, {
        visitorName: 'Mr. Arvind Joshi',
        phone: '+91 98220 99881',
        purpose: 'PARENT_MEETING',
        personToMeet: 'Sunita Sharma (Teacher)',
        idProofType: 'AADHAAR',
        idProofNumber: '123456789012'
      });
      assert.equal(pass.status, 'CHECKED_IN');
      assert.equal(pass.idProofNumber, 'XXXX-XXXX-9012', 'Should mask Aadhaar/Govt ID to last 4 digits');
      assert.ok(pass.badgeNumber);
    });

    it('7.2 Checks out visitor and records exit timestamp', () => {
      const checkedOut = operations.checkOutVisitor(banerPrincipalContext, 'vis-001');
      assert.equal(checkedOut.status, 'CHECKED_OUT');
      assert.ok(checkedOut.checkOutTime);
    });
  });

  // ====================================================
  // 8. CRITICAL REQUIREMENT: SENSITIVE INCIDENT PROTECTION
  // ====================================================
  describe('8. Sensitive Incident Protection & Safeguarding', () => {
    it('8.1 Automatically classifies safeguarding categories as sensitive', () => {
      const incident = operations.reportIncident(banerPrincipalContext, {
        title: 'Suspected Cyberbullying Report',
        category: 'BULLYING',
        severity: 'HIGH',
        location: 'Classroom 101',
        description: 'Inappropriate comments made on online homework forum',
        personsInvolved: [{ type: 'STUDENT', id: 'stu-aditi-rao', name: 'Aditi Rao' }]
      });
      assert.equal(incident.isSensitive, true, 'Bullying must automatically be flagged isSensitive');
      assert.ok(incident.designatedOfficer);
    });

    it('8.2 Exposes non-sensitive incident (minor injury) to standard teacher role', () => {
      const incidents = operations.getIncidents(banerTeacherContext);
      const minorInjury = incidents.find(i => i.id === 'inc-001');
      assert.ok(minorInjury);
      assert.equal(minorInjury.title, 'Playground Minor Scraped Knee during Morning Recess');
      assert.ok(minorInjury.description.includes('tripped while running'));
    });

    it('8.3 Strictly REDACTS sensitive incident details when queried by unauthorized teacher role', () => {
      const incidents = operations.getIncidents(banerTeacherContext);
      const sensitiveInc = incidents.find(i => i.id === 'inc-002');
      assert.ok(sensitiveInc);
      assert.equal(sensitiveInc.title, '[Confidential Incident - Restricted Access]');
      assert.ok(sensitiveInc.description.includes('[Redacted - Sensitive Child Protection / Safeguarding Record'));
      assert.equal(sensitiveInc.personsInvolvedJson, '[]');
      assert.equal(sensitiveInc.sensitiveNotes, null);
      assert.equal(sensitiveInc.resolutionSummary, null);
    });

    it('8.4 Throws 403 Forbidden when unauthorized teacher attempts direct getIncidentById on sensitive record', () => {
      assert.throws(() => {
        operations.getIncidentById(banerTeacherContext, 'inc-002');
      }, /403 Forbidden: Access denied. Sensitive incident safeguarding details are restricted/);
    });

    it('8.5 Allows authorized Principal to view full sensitive incident details and logs audit entry', () => {
      const fullIncident = operations.getIncidentById(banerPrincipalContext, 'inc-002');
      assert.equal(fullIncident.title, 'Confidential Safeguarding & Harassment Investigation');
      assert.ok(fullIncident.description.includes('verbal teasing'));
      assert.ok(fullIncident.sensitiveNotes.includes('Internal POCSO/Safeguarding Committee'));

      const auditLogs = db.getAuditLogs(banerPrincipalContext);
      assert.ok(auditLogs.some(l => l.action === 'OPERATIONS_SENSITIVE_INCIDENT_ACCESSED' && l.entityId === 'inc-002'));
    });

    it('8.6 Blocks unauthorized teacher from updating sensitive incident records', () => {
      assert.throws(() => {
        operations.updateIncident(banerTeacherContext, 'inc-002', {
          status: 'RESOLVED',
          resolutionSummary: 'Unauthorized closing'
        });
      }, /403 Forbidden/);
    });
  });

  // ====================================================
  // 9. Complaints & Grievance Redressal
  // ====================================================
  describe('9. Complaints & Grievance Redressal', () => {
    it('9.1 Files complaint with category, priority, and complainant info', () => {
      const complaint = operations.fileComplaint(banerPrincipalContext, {
        complainantType: 'PARENT',
        complainantName: 'Mr. Rajesh Kulkarni',
        contactPhone: '+91 98224 55667',
        category: 'TRANSPORT',
        priority: 'MEDIUM',
        subject: 'AC cooling inadequate in afternoon return bus',
        description: 'Children complained that the bus AC was turned off during the 3:30 PM ride.'
      });
      assert.equal(complaint.status, 'OPEN');
      assert.ok(complaint.ticketNumber.startsWith('GRV-2026-'));
    });

    it('9.2 Resolves complaint with resolution summary', () => {
      const resolved = operations.updateComplaint(banerPrincipalContext, 'grv-001', {
        status: 'RESOLVED',
        resolutionSummary: 'New alternate bypass route implemented. Morning bus arrived on time today.'
      });
      assert.equal(resolved.status, 'RESOLVED');
      assert.ok(resolved.resolvedAt);
    });
  });

  // ====================================================
  // 10. Transport Foundation
  // ====================================================
  describe('10. Transport Foundation', () => {
    it('10.1 Registers school transport vehicle with fitness and insurance compliance', () => {
      const vehicle = operations.registerVehicle(banerPrincipalContext, {
        vehicleNumber: 'MH-12-VT-1003',
        vehicleType: 'VAN_14_SEATER',
        makeModel: 'Force Traveller 14 Seater',
        capacity: 14,
        fitnessExpiryDate: '2027-10-01T00:00:00Z',
        insuranceExpiryDate: '2027-11-01T00:00:00Z',
        pucExpiryDate: '2027-04-01T00:00:00Z'
      });
      assert.equal(vehicle.vehicleNumber, 'MH-12-VT-1003');
      assert.equal(vehicle.capacity, 14);

      // Rejects duplicate vehicle registration
      assert.throws(() => {
        operations.registerVehicle(banerPrincipalContext, {
          vehicleNumber: 'MH-12-VT-1003',
          makeModel: 'Duplicate'
        });
      }, /already exists/);
    });

    it('10.2 Fetches transport routes and links assigned vehicle capacity', () => {
      const routes = operations.getTransportRoutes(banerPrincipalContext);
      assert.ok(routes.length >= 2);
      const route1 = routes.find(r => r.routeNumber === 'RTE-BANER-01');
      assert.equal(route1.vehicleNumber, 'MH-12-VT-1001');
      assert.equal(route1.vehicleCapacity, 40);
      assert.equal(route1.activeStudentsCount, 34);
    });
  });

  // ====================================================
  // 11. Multi-Tenant Campus Isolation Barrier
  // ====================================================
  describe('11. Multi-Tenant Campus Isolation Barrier', () => {
    it('11.1 Prevents Baner principal from accessing Kothrud operational records', () => {
      assert.throws(() => {
        operations.getAssets(banerPrincipalContext, { campusId: 'cmp-pune-kothrud' });
      }, /Access denied to campus/);
    });

    it('11.2 Prevents Kothrud principal from accessing Baner operational records', () => {
      assert.throws(() => {
        operations.getAssets(kothrudContext, { campusId: 'cmp-pune-baner' });
      }, /Access denied to campus/);
    });

    it('11.3 Allows HQ Administrator universal visibility across all campuses', () => {
      const allAssets = operations.getAssets(hqContext);
      const banerAssets = operations.getAssets(banerPrincipalContext);
      assert.ok(allAssets.length >= banerAssets.length);
    });
  });

  // ====================================================
  // 12. Campus Operations Summary KPI
  // ====================================================
  describe('12. Campus Operations Summary KPI', () => {
    it('12.1 Computes aggregated metrics for campus command center', () => {
      const summary = operations.getOperationsSummary(banerPrincipalContext);
      assert.equal(summary.campusId, 'cmp-pune-baner');
      assert.ok(summary.totalAssetsCount >= 5);
      assert.ok(summary.totalInventoryItemsCount >= 5);
      assert.ok(summary.lowStockAlertCount >= 1);
      assert.ok(summary.pendingPOsCount >= 1);
      assert.ok(summary.activeMaintenanceTicketsCount >= 1);
      assert.ok(summary.currentVisitorsOnPremises >= 1);
      assert.ok(summary.openIncidentsCount >= 1);
      assert.ok(summary.openComplaintsCount >= 1);
      assert.ok(summary.totalTransportStudentsCount >= 60);
    });
  });
});
