// VEDIC TREE OS — MODULE 08: SCHOOL OPERATIONS & LOGISTICS SERVICE
import { db } from '../../database/db.js';

export class OperationsService {
  constructor(database = db) {
    this.db = database;
  }

  // ====================================================
  // 1. PHYSICAL ASSETS MANAGEMENT
  // ====================================================
  getAssets(context, filters = {}) {
    return this.db.getAssets(context, filters);
  }

  createAsset(context, assetData) {
    return this.db.createAsset(context, assetData);
  }

  updateAsset(context, assetId, updates) {
    return this.db.updateAsset(context, assetId, updates);
  }

  // ====================================================
  // 2. INVENTORY & STOCK TRANSACTIONS
  // ====================================================
  getInventoryItems(context, filters = {}) {
    return this.db.getInventoryItems(context, filters);
  }

  createInventoryItem(context, itemData) {
    return this.db.createInventoryItem(context, itemData);
  }

  getStockTransactions(context, itemId) {
    return this.db.getStockTransactions(context, itemId);
  }

  recordStockMovement(context, transactionData) {
    return this.db.recordStockTransaction(context, transactionData);
  }

  // ====================================================
  // 3. VENDOR MANAGEMENT
  // ====================================================
  getVendors(context, filters = {}) {
    return this.db.getVendors(context, filters);
  }

  createVendor(context, vendorData) {
    return this.db.createVendor(context, vendorData);
  }

  updateVendor(context, vendorId, updates) {
    return this.db.updateVendor(context, vendorId, updates);
  }

  // ====================================================
  // 4. PROCUREMENT & PURCHASE ORDERS
  // ====================================================
  getPurchaseOrders(context, filters = {}) {
    return this.db.getPurchaseOrders(context, filters);
  }

  createPurchaseOrder(context, poData) {
    return this.db.createPurchaseOrder(context, poData);
  }

  approvePurchaseOrder(context, poId) {
    return this.db.approvePurchaseOrder(context, poId);
  }

  receivePurchaseOrder(context, poId) {
    return this.db.receivePurchaseOrder(context, poId);
  }

  // ====================================================
  // 5. FACILITIES & SPACE BOOKINGS
  // ====================================================
  getFacilities(context, filters = {}) {
    return this.db.getFacilities(context, filters);
  }

  createFacility(context, facilityData) {
    return this.db.createFacility(context, facilityData);
  }

  getFacilityBookings(context, facilityId) {
    return this.db.getFacilityBookings(context, facilityId);
  }

  bookFacility(context, bookingData) {
    return this.db.createFacilityBooking(context, bookingData);
  }

  // ====================================================
  // 6. MAINTENANCE TICKETING
  // ====================================================
  getMaintenanceRequests(context, filters = {}) {
    return this.db.getMaintenanceRequests(context, filters);
  }

  reportMaintenanceIssue(context, requestData) {
    return this.db.createMaintenanceRequest(context, requestData);
  }

  updateMaintenanceTicket(context, ticketId, updates) {
    return this.db.updateMaintenanceRequest(context, ticketId, updates);
  }

  // ====================================================
  // 7. VISITOR GATE PASS LOGGING
  // ====================================================
  getVisitorLogs(context, filters = {}) {
    return this.db.getVisitorLogs(context, filters);
  }

  checkInVisitor(context, visitorData) {
    return this.db.createVisitorLog(context, visitorData);
  }

  checkOutVisitor(context, passId) {
    return this.db.checkoutVisitor(context, passId);
  }

  // ====================================================
  // 8. INCIDENTS & SAFEGUARDING (SENSITIVE PROTECTION)
  // ====================================================
  getIncidents(context, filters = {}) {
    return this.db.getIncidents(context, filters);
  }

  getIncidentById(context, incidentId) {
    return this.db.getIncidentById(context, incidentId);
  }

  reportIncident(context, incidentData) {
    return this.db.createIncident(context, incidentData);
  }

  updateIncident(context, incidentId, updates) {
    return this.db.updateIncident(context, incidentId, updates);
  }

  // ====================================================
  // 9. COMPLAINTS & GRIEVANCE REDRESSAL
  // ====================================================
  getComplaints(context, filters = {}) {
    return this.db.getComplaints(context, filters);
  }

  fileComplaint(context, complaintData) {
    return this.db.createComplaint(context, complaintData);
  }

  updateComplaint(context, ticketId, updates) {
    return this.db.updateComplaint(context, ticketId, updates);
  }

  // ====================================================
  // 10. TRANSPORT FLEET & BUS ROUTES
  // ====================================================
  getVehicles(context, filters = {}) {
    return this.db.getVehicles(context, filters);
  }

  registerVehicle(context, vehicleData) {
    return this.db.createVehicle(context, vehicleData);
  }

  getTransportRoutes(context, filters = {}) {
    return this.db.getTransportRoutes(context, filters);
  }

  createTransportRoute(context, routeData) {
    return this.db.createTransportRoute(context, routeData);
  }

  // ====================================================
  // 11. OPERATIONS KPI SUMMARY (CAMPUS OVERVIEW)
  // ====================================================
  getOperationsSummary(context) {
    const campusId = context.campusId || context.activeCampusId;
    const assets = this.getAssets(context);
    const inventory = this.getInventoryItems(context);
    const lowStock = inventory.filter(i => i.currentStock <= i.minStockLevel);
    const pos = this.getPurchaseOrders(context);
    const pendingPOs = pos.filter(p => p.status === 'PENDING_APPROVAL');
    const maintenance = this.getMaintenanceRequests(context);
    const activeMaintenance = maintenance.filter(m => ['LOGGED', 'IN_PROGRESS', 'PENDING_PARTS'].includes(m.status));
    const visitors = this.getVisitorLogs(context);
    const onPremisesVisitors = visitors.filter(v => v.status === 'CHECKED_IN');
    const incidents = this.getIncidents(context);
    const openIncidents = incidents.filter(i => ['REPORTED', 'UNDER_INVESTIGATION'].includes(i.status));
    const complaints = this.getComplaints(context);
    const openComplaints = complaints.filter(c => ['OPEN', 'IN_PROGRESS'].includes(c.status));
    const routes = this.getTransportRoutes(context);
    const totalBusStudents = routes.reduce((sum, r) => sum + (r.activeStudentsCount || 0), 0);

    return {
      campusId,
      totalAssetsCount: assets.length,
      totalInventoryItemsCount: inventory.length,
      lowStockAlertCount: lowStock.length,
      pendingPOsCount: pendingPOs.length,
      activeMaintenanceTicketsCount: activeMaintenance.length,
      currentVisitorsOnPremises: onPremisesVisitors.length,
      openIncidentsCount: openIncidents.length,
      openComplaintsCount: openComplaints.length,
      activeTransportRoutesCount: routes.length,
      totalTransportStudentsCount: totalBusStudents
    };
  }
}

export const defaultOperationsService = new OperationsService();
export const operationsService = defaultOperationsService;

