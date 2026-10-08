import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Package,
  Wrench,
  Building2,
  UserCheck,
  AlertTriangle,
  MessageSquareWarning,
  Bus,
  Plus,
  ArrowRightLeft,
  ShieldCheck,
  ShoppingBag,
  Lock
} from 'lucide-react';
import { db } from '../../database/db';
import { operationsService } from '../../modules/operations/operations.service';
import { NewAssetModal } from './NewAssetModal';
import { StockMovementModal } from './StockMovementModal';
import { BookFacilityModal } from './BookFacilityModal';
import { NewMaintenanceModal } from './NewMaintenanceModal';
import { NewPurchaseOrderModal } from './NewPurchaseOrderModal';
import { NewVisitorModal } from './NewVisitorModal';
import { ReportIncidentModal } from './ReportIncidentModal';
import { IncidentDetailModal } from './IncidentDetailModal';
import { NewComplaintModal } from './NewComplaintModal';

export function OperationsHub({ currentCampus, currentUser }) {
  const [activeTab, setActiveTab] = useState('assets');
  const [summary, setSummary] = useState(null);

  // Modals state
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [isPOModalOpen, setIsPOModalOpen] = useState(false);
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  // Entities state
  const [assets, setAssets] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);

  const userContext = {
    role: currentUser?.role || 'TEACHER',
    permissions: currentUser?.permissions || [],
    campusId: currentCampus?.id,
    userId: currentUser?.id
  };

  const loadAllData = () => {
    if (!currentCampus?.id) return;
    try {
      const summ = operationsService.getOperationsSummary(userContext);
      setSummary(summ);

      setAssets(db.getAssets({ campusId: currentCampus.id }));
      setFacilities(db.getFacilities({ campusId: currentCampus.id }));
      setBookings(db.getFacilityBookings({ campusId: currentCampus.id }));
      setInventory(db.getInventoryItems({ campusId: currentCampus.id }));
      setPurchaseOrders(db.getPurchaseOrders({ campusId: currentCampus.id }));
      setVendors(db.getVendors({ campusId: currentCampus.id }));
      setMaintenance(db.getMaintenanceRequests({ campusId: currentCampus.id }));
      setVisitors(db.getVisitorLogs({ campusId: currentCampus.id }));
      setIncidents(db.getIncidents({ campusId: currentCampus.id }, userContext));
      setComplaints(db.getComplaints({ campusId: currentCampus.id }));
      setVehicles(db.getVehicles({ campusId: currentCampus.id }));
      setRoutes(db.getTransportRoutes({ campusId: currentCampus.id }));
    } catch (err) {
      console.error('Error loading operations data:', err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [currentCampus?.id, currentUser?.role]);

  const handleApprovePO = (poId) => {
    try {
      db.approvePurchaseOrder(poId, userContext);
      loadAllData();
    } catch (err) {
      alert(err.message || 'Approval failed.');
    }
  };

  const handleCheckoutVisitor = (visitorId) => {
    try {
      db.checkoutVisitor(visitorId, userContext);
      loadAllData();
    } catch (err) {
      alert(err.message || 'Checkout failed.');
    }
  };

  const handleResolveMaintenance = (reqId) => {
    try {
      db.updateMaintenanceRequest(reqId, {
        status: 'COMPLETED',
        resolvedAt: new Date().toISOString(),
        cost: 450
      }, userContext);
      loadAllData();
    } catch (err) {
      alert(err.message || 'Update failed.');
    }
  };

  const handleResolveComplaint = (complaintId) => {
    try {
      db.updateComplaint(complaintId, {
        status: 'RESOLVED',
        resolutionNotes: 'Issue reviewed by campus administration and resolved with complainant.'
      }, userContext);
      loadAllData();
    } catch (err) {
      alert(err.message || 'Failed to update grievance.');
    }
  };

  const isLeadership = ['HQ_ADMIN', 'PRINCIPAL'].includes(currentUser?.role) ||
    currentUser?.permissions?.includes('operations:sensitive_incidents_read');

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F4EFEA] text-[#0B2F29] border border-[#E6DFD1]">
              MODULE 08
            </span>
            <span className="text-xs text-[#4A665F]">Vedic Tree ERP Core</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0B2F29] mt-1">School Operations & Facilities</h1>
          <p className="text-xs text-[#4A665F]">
            Physical asset registers, inventory procurement, campus safety safeguarding & transport foundation
          </p>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAssetModalOpen(true)}
            className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
          >
            <Boxes className="w-3.5 h-3.5 text-[#0B2F29]" />
            + Asset
          </button>
          <button
            onClick={() => setIsStockModalOpen(true)}
            className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-700" />
            Stock In/Out
          </button>
          <button
            onClick={() => setIsVisitorModalOpen(true)}
            className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-700" />
            Gate Pass
          </button>
          <button
            onClick={() => setIsIncidentModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Log Incident
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        <div className="p-3.5 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#4A665F] mb-1">
            <span className="text-[11px] font-medium">Assets Active</span>
            <Boxes className="w-4 h-4 text-[#0B2F29]" />
          </div>
          <div className="text-xl font-bold text-[#0B2F29]">{summary?.assets?.totalCount ?? 0}</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
            {summary?.assets?.inServiceCount ?? 0} in active service
          </div>
        </div>

        <div className="p-3.5 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#4A665F] mb-1">
            <span className="text-[11px] font-medium">Low Stock</span>
            <Package className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-xl font-bold text-[#0B2F29]">{summary?.inventory?.lowStockCount ?? 0}</div>
          <div className="text-[10px] text-amber-700 font-medium mt-0.5">Threshold alerts</div>
        </div>

        <div className="p-3.5 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#4A665F] mb-1">
            <span className="text-[11px] font-medium">Pending POs</span>
            <ShoppingBag className="w-4 h-4 text-purple-700" />
          </div>
          <div className="text-xl font-bold text-[#0B2F29]">{summary?.procurement?.pendingApprovalCount ?? 0}</div>
          <div className="text-[10px] text-purple-700 font-medium mt-0.5">Awaiting signoff</div>
        </div>

        <div className="p-3.5 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#4A665F] mb-1">
            <span className="text-[11px] font-medium">Maintenance</span>
            <Wrench className="w-4 h-4 text-orange-700" />
          </div>
          <div className="text-xl font-bold text-[#0B2F29]">{summary?.maintenance?.activeCount ?? 0}</div>
          <div className="text-[10px] text-orange-700 font-medium mt-0.5">Open work orders</div>
        </div>

        <div className="p-3.5 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#4A665F] mb-1">
            <span className="text-[11px] font-medium">Visitors</span>
            <UserCheck className="w-4 h-4 text-cyan-700" />
          </div>
          <div className="text-xl font-bold text-[#0B2F29]">{summary?.visitors?.currentlyOnCampus ?? 0}</div>
          <div className="text-[10px] text-cyan-700 font-medium mt-0.5">Currently on campus</div>
        </div>

        <div className="p-3.5 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#4A665F] mb-1">
            <span className="text-[11px] font-medium">Incidents</span>
            <AlertTriangle className="w-4 h-4 text-rose-700" />
          </div>
          <div className="text-xl font-bold text-[#0B2F29]">{summary?.incidents?.openCount ?? 0}</div>
          <div className="text-[10px] text-rose-700 font-medium mt-0.5">
            {summary?.incidents?.sensitiveCount ?? 0} safeguarding
          </div>
        </div>

        <div className="p-3.5 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#4A665F] mb-1">
            <span className="text-[11px] font-medium">Transport</span>
            <Bus className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-xl font-bold text-[#0B2F29]">{summary?.transport?.activeVehiclesCount ?? 0}</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-0.5">Active school buses</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F4EFEA] border border-[#E6DFD1] rounded-xl overflow-x-auto">
        {[
          { id: 'assets', label: 'Assets & Facilities', icon: Boxes },
          { id: 'inventory', label: 'Inventory & Procurement', icon: Package },
          { id: 'maintenance', label: 'Maintenance & Repairs', icon: Wrench },
          { id: 'visitors', label: 'Visitor Gate Pass', icon: UserCheck },
          { id: 'incidents', label: 'Incidents & Safeguarding', icon: AlertTriangle },
          { id: 'complaints', label: 'Grievance Redressal', icon: MessageSquareWarning },
          { id: 'transport', label: 'Transport Fleet', icon: Bus }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#0B2F29] text-white shadow-xs'
                  : 'text-[#4A665F] hover:text-[#0B2F29] hover:bg-white/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: 1. Assets & Facilities */}
      {activeTab === 'assets' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#0B2F29]">Physical Asset Register</h2>
              <p className="text-xs text-[#4A665F]">Barcode/QR tracked capital items, condition ratings and warranty telemetry</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFacilityModalOpen(true)}
                className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-[#0B2F29]" />
                Reserve Facility
              </button>
              <button
                onClick={() => setIsAssetModalOpen(true)}
                className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Register Asset
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#E6DFD1] rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#0B2F29]">
                <thead className="bg-[#F8F5EE] text-[#4A665F] font-semibold border-b border-[#E6DFD1]">
                  <tr>
                    <th className="p-3">Asset Code / Tag</th>
                    <th className="p-3">Item Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Location / Room</th>
                    <th className="p-3">Condition</th>
                    <th className="p-3">Book Value</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE9DD]">
                  {assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-[#FAF8F3] transition-colors">
                      <td className="p-3 font-mono font-semibold text-[#0B2F29]">{asset.assetTag}</td>
                      <td className="p-3 font-medium text-[#0B2F29]">{asset.name}</td>
                      <td className="p-3 text-[#4A665F]">{asset.category}</td>
                      <td className="p-3 text-[#334E47]">{asset.location || 'Central Store'}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          asset.condition === 'EXCELLENT' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          asset.condition === 'GOOD' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                          'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {asset.condition}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[#334E47]">₹{asset.purchaseCost?.toLocaleString('en-IN') || 0}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          asset.status === 'IN_USE' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          asset.status === 'UNDER_MAINTENANCE' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                          'bg-stone-100 text-stone-700'
                        }`}>
                          {asset.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {assets.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-[#4A665F]">
                        No physical assets registered for this campus.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Campus Facilities & Space Schedule */}
          <div className="pt-4 border-t border-[#E6DFD1]">
            <h2 className="text-base font-bold text-[#0B2F29] mb-1">Campus Facilities & Space Allocation</h2>
            <p className="text-xs text-[#4A665F] mb-4">Auditoriums, laboratories, computer centers and sports complexes</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {facilities.map((fac) => (
                <div key={fac.id} className="p-4 bg-white border border-[#E6DFD1] rounded-xl shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[#0B2F29]">{fac.name}</h3>
                      <p className="text-xs text-[#4A665F]">{fac.building} • {fac.roomNumber || 'Ground Floor'}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200">
                      Cap: {fac.capacity} pax
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {(() => {
                      try {
                        const ams = JSON.parse(fac.amenitiesJson || '[]');
                        return ams.map((a, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-[#F4EFEA] text-[#0B2F29]">
                            {a}
                          </span>
                        ));
                      } catch {
                        return null;
                      }
                    })()}
                  </div>

                  <div className="pt-2 border-t border-[#E6DFD1] flex items-center justify-between text-xs text-[#4A665F]">
                    <span>Active Bookings:</span>
                    <span className="font-semibold text-[#0B2F29]">
                      {bookings.filter(b => b.facilityId === fac.id && b.status === 'CONFIRMED').length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. Inventory & Procurement */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#0B2F29]">Consumables & Inventory Management</h2>
              <p className="text-xs text-[#4A665F]">Stock thresholds, automated purchase requests and live warehouse reconciliation</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsStockModalOpen(true)}
                className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-700" />
                Dispatch / Receive Stock
              </button>
              <button
                onClick={() => setIsPOModalOpen(true)}
                className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Create PO
              </button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white border border-[#E6DFD1] rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#0B2F29]">
                <thead className="bg-[#F8F5EE] text-[#4A665F] font-semibold border-b border-[#E6DFD1]">
                  <tr>
                    <th className="p-3">SKU Code</th>
                    <th className="p-3">Item Description</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3">Current Stock</th>
                    <th className="p-3">Min Threshold</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE9DD]">
                  {inventory.map((item) => {
                    const isLow = item.currentStock <= item.minThreshold;
                    return (
                      <tr key={item.id} className="hover:bg-[#FAF8F3] transition-colors">
                        <td className="p-3 font-mono font-semibold text-[#0B2F29]">{item.sku}</td>
                        <td className="p-3 font-medium text-[#0B2F29]">{item.name}</td>
                        <td className="p-3 text-[#4A665F]">{item.category}</td>
                        <td className="p-3 text-[#4A665F]">{item.unit}</td>
                        <td className="p-3 font-mono font-bold text-[#0B2F29]">{item.currentStock}</td>
                        <td className="p-3 font-mono text-[#4A665F]">{item.minThreshold}</td>
                        <td className="p-3">
                          {isLow ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1 w-fit">
                              <AlertTriangle className="w-3 h-3" /> LOW STOCK
                            </span>
                          ) : (
                            <span className="badge-green px-2 py-0.5 rounded text-[10px] font-semibold">
                              OPTIMAL
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Purchase Orders Table */}
          <div className="pt-4 border-t border-[#E6DFD1] space-y-3">
            <h2 className="text-base font-bold text-[#0B2F29]">Purchase Orders & Invoices</h2>
            <div className="bg-white border border-[#E6DFD1] rounded-xl shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs text-[#0B2F29]">
                <thead className="bg-[#F8F5EE] text-[#4A665F] font-semibold border-b border-[#E6DFD1]">
                  <tr>
                    <th className="p-3">PO Number</th>
                    <th className="p-3">Vendor / Supplier</th>
                    <th className="p-3">Created</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE9DD]">
                  {purchaseOrders.map((po) => {
                    const vendor = vendors.find(v => v.id === po.vendorId);
                    return (
                      <tr key={po.id} className="hover:bg-[#FAF8F3] transition-colors">
                        <td className="p-3 font-mono font-semibold text-[#0B2F29]">{po.poNumber}</td>
                        <td className="p-3 font-medium text-[#0B2F29]">{vendor?.name || 'Approved Supplier'}</td>
                        <td className="p-3 text-[#4A665F]">{new Date(po.createdAt).toLocaleDateString()}</td>
                        <td className="p-3 font-mono font-semibold text-[#334E47]">
                          ₹{po.totalAmount?.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            po.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                            po.status === 'RECEIVED' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                            'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {po.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {po.status === 'PENDING_APPROVAL' && isLeadership && (
                            <button
                              onClick={() => handleApprovePO(po.id)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors border border-emerald-300"
                            >
                              Approve PO
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {purchaseOrders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-[#4A665F]">
                        No purchase orders recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. Maintenance & Repairs */}
      {activeTab === 'maintenance' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#0B2F29]">Facility Maintenance & Repairs</h2>
              <p className="text-xs text-[#4A665F]">Electrical, plumbing, carpentry and HVAC preventive work orders</p>
            </div>
            <button
              onClick={() => setIsMaintenanceModalOpen(true)}
              className="btn-primary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Log Work Order
            </button>
          </div>

          <div className="bg-white border border-[#E6DFD1] rounded-xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs text-[#0B2F29]">
              <thead className="bg-[#F8F5EE] text-[#4A665F] font-semibold border-b border-[#E6DFD1]">
                <tr>
                  <th className="p-3">Ticket ID</th>
                  <th className="p-3">Issue Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Location / Room</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9DD]">
                {maintenance.map((req) => (
                  <tr key={req.id} className="hover:bg-[#FAF8F3] transition-colors">
                    <td className="p-3 font-mono text-[#4A665F]">#{req.id.slice(-6)}</td>
                    <td className="p-3 font-medium text-[#0B2F29]">{req.title}</td>
                    <td className="p-3 text-[#4A665F]">{req.category}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        req.priority === 'CRITICAL' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                        req.priority === 'HIGH' ? 'bg-orange-50 text-orange-800 border border-orange-200' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="p-3 text-[#334E47]">{req.location || 'Main Campus'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        req.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        req.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                        'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {req.status !== 'COMPLETED' && (
                        <button
                          onClick={() => handleResolveMaintenance(req.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-300"
                        >
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {maintenance.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-[#4A665F]">
                      No active maintenance work orders.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. Visitor Gate Pass */}
      {activeTab === 'visitors' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#0B2F29]">Campus Security & Visitor Gate Passes</h2>
              <p className="text-xs text-[#4A665F]">Security checkpoint badge generation, ID proof masking and audit logs</p>
            </div>
            <button
              onClick={() => setIsVisitorModalOpen(true)}
              className="btn-primary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Issue Gate Pass
            </button>
          </div>

          <div className="bg-white border border-[#E6DFD1] rounded-xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs text-[#0B2F29]">
              <thead className="bg-[#F8F5EE] text-[#4A665F] font-semibold border-b border-[#E6DFD1]">
                <tr>
                  <th className="p-3">Badge ID</th>
                  <th className="p-3">Visitor Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Host Staff</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Check-In Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9DD]">
                {visitors.map((vis) => (
                  <tr key={vis.id} className="hover:bg-[#FAF8F3] transition-colors">
                    <td className="p-3 font-mono font-semibold text-[#0B2F29]">{vis.badgeNumber}</td>
                    <td className="p-3 font-medium text-[#0B2F29]">{vis.visitorName}</td>
                    <td className="p-3 font-mono text-[#4A665F]">{vis.phone}</td>
                    <td className="p-3 text-[#334E47]">{vis.hostPerson}</td>
                    <td className="p-3 text-[#4A665F]">{vis.purpose}</td>
                    <td className="p-3 text-[#4A665F]">{new Date(vis.checkInTime).toLocaleTimeString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        vis.status === 'CHECKED_IN'
                          ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {vis.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {vis.status === 'CHECKED_IN' && (
                        <button
                          onClick={() => handleCheckoutVisitor(vis.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#0B2F29] bg-[#F4EFEA] hover:bg-[#EFE9DD] rounded-lg transition-colors border border-[#E6DFD1]"
                        >
                          Check Out
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {visitors.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-[#4A665F]">
                      No visitor check-ins recorded today.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. Incidents & Safeguarding */}
      {activeTab === 'incidents' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#0B2F29]">Incident & Safeguarding Register</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Child Safeguarding Barrier Active
                </span>
              </div>
              <p className="text-xs text-[#4A665F]">
                Campus safety occurrences, disciplinary matters and confidential safeguarding investigations
              </p>
            </div>
            <button
              onClick={() => setIsIncidentModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Report Incident
            </button>
          </div>

          {!isLeadership && (
            <div className="p-3.5 bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#334E47] leading-relaxed">
                <strong className="text-amber-800 block mb-0.5">Safeguarding Privacy Enforcement:</strong>
                As a teaching staff member, sensitive child protection and harassment incidents are encrypted and redacted. Only non-sensitive operational incidents display full records. Detailed dossiers are accessible only by the Principal and Designated Child Safety Officers.
              </div>
            </div>
          )}

          <div className="bg-white border border-[#E6DFD1] rounded-xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs text-[#0B2F29]">
              <thead className="bg-[#F8F5EE] text-[#4A665F] font-semibold border-b border-[#E6DFD1]">
                <tr>
                  <th className="p-3">Classification</th>
                  <th className="p-3">Incident Title</th>
                  <th className="p-3">Severity</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Date Logged</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9DD]">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-[#FAF8F3] transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        {inc.isSensitive && <Lock className="w-3.5 h-3.5 text-rose-700" />}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          inc.isSensitive
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {inc.category}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-[#0B2F29]">
                      {inc.title}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        inc.severity === 'CRITICAL' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                        inc.severity === 'HIGH' ? 'bg-orange-50 text-orange-800 border border-orange-200' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {inc.severity}
                      </span>
                    </td>
                    <td className="p-3 text-[#4A665F]">{inc.location || 'Campus Grounds'}</td>
                    <td className="p-3 text-[#4A665F]">{new Date(inc.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4EFEA] text-[#0B2F29] border border-[#E6DFD1]">
                        {inc.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedIncidentId(inc.id)}
                        className="btn-secondary text-xs px-2.5 py-1"
                      >
                        Inspect Dossier
                      </button>
                    </td>
                  </tr>
                ))}
                {incidents.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-[#4A665F]">
                      No incidents logged for this campus.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 6. Grievance Redressal */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#0B2F29]">Grievance Redressal & Complaints</h2>
              <p className="text-xs text-[#4A665F]">Formal parent, student and staff escalation tickets with SLA tracking</p>
            </div>
            <button
              onClick={() => setIsComplaintModalOpen(true)}
              className="btn-primary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Log Grievance
            </button>
          </div>

          <div className="bg-white border border-[#E6DFD1] rounded-xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs text-[#0B2F29]">
              <thead className="bg-[#F8F5EE] text-[#4A665F] font-semibold border-b border-[#E6DFD1]">
                <tr>
                  <th className="p-3">Ticket</th>
                  <th className="p-3">Complainant</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9DD]">
                {complaints.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF8F3] transition-colors">
                    <td className="p-3 font-mono text-[#4A665F]">#{c.id.slice(-6)}</td>
                    <td className="p-3 font-medium text-[#0B2F29]">{c.complainantName} ({c.complainantType})</td>
                    <td className="p-3 text-[#4A665F]">{c.category}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        c.priority === 'URGENT' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                        c.priority === 'HIGH' ? 'bg-orange-50 text-orange-800 border border-orange-200' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="p-3 text-[#334E47]">{c.subject}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        c.status === 'IN_REVIEW' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                        'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {c.status !== 'RESOLVED' && isLeadership && (
                        <button
                          onClick={() => handleResolveComplaint(c.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-300"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {complaints.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-[#4A665F]">
                      No active grievances found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 7. Transport Fleet */}
      {activeTab === 'transport' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#0B2F29]">Transport Foundation & Fleet Compliance</h2>
              <p className="text-xs text-[#4A665F]">Bus tracking, fitness and RTO certificate validity, driver details and stop rosters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Registered Vehicles */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0B2F29]">Vehicles & Compliance Roster</h3>
              <div className="space-y-3">
                {vehicles.map((v) => (
                  <div key={v.id} className="p-4 bg-white border border-[#E6DFD1] rounded-xl shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bus className="w-4 h-4 text-emerald-700" />
                        <span className="font-mono font-bold text-[#0B2F29]">{v.registrationNumber}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {v.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#4A665F] pt-1">
                      <div>Model: <strong className="text-[#0B2F29]">{v.model}</strong></div>
                      <div>Capacity: <strong className="text-[#0B2F29]">{v.seatingCapacity} Seats</strong></div>
                      <div>GPS Tracker: <strong className="font-mono text-cyan-700">{v.gpsDeviceId || 'Active'}</strong></div>
                      <div>Fitness Valid: <strong className="text-[#0B2F29]">
                        {v.fitnessExpiry ? new Date(v.fitnessExpiry).toLocaleDateString() : 'Compliant'}
                      </strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport Routes */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0B2F29]">Active Bus Routes & Stops</h3>
              <div className="space-y-3">
                {routes.map((r) => (
                  <div key={r.id} className="p-4 bg-white border border-[#E6DFD1] rounded-xl shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0B2F29]">{r.routeName} ({r.routeCode})</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        {r.morningDepartureTime} - {r.eveningDepartureTime}
                      </span>
                    </div>
                    <div className="text-xs text-[#4A665F]">
                      Driver: <strong className="text-[#0B2F29]">{r.driverName}</strong> • Phone: <strong className="font-mono text-[#0B2F29]">{r.driverPhone}</strong>
                    </div>
                    <div className="pt-2 border-t border-[#E6DFD1] text-[11px] text-[#4A665F]">
                      <span className="font-semibold text-[#0B2F29] block mb-1">Stops Sequence:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {(() => {
                          try {
                            const stops = JSON.parse(r.stopsJson || '[]');
                            return stops.map((s, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-[#F8F5EE] border border-[#E6DFD1] rounded text-[#0B2F29]">
                                {idx + 1}. {s.name || s} ({s.time || 'On schedule'})
                              </span>
                            ));
                          } catch {
                            return <span>Standard route map</span>;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Modals */}
      <NewAssetModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        onSuccess={loadAllData}
        currentCampusId={currentCampus?.id}
        currentUserId={currentUser?.id}
      />

      <StockMovementModal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        onSuccess={loadAllData}
        currentCampusId={currentCampus?.id}
        currentUserId={currentUser?.id}
      />

      <BookFacilityModal
        isOpen={isFacilityModalOpen}
        onClose={() => setIsFacilityModalOpen(false)}
        onSuccess={loadAllData}
        currentCampusId={currentCampus?.id}
        currentUserId={currentUser?.id}
      />

      <NewMaintenanceModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
        onSuccess={loadAllData}
        currentCampusId={currentCampus?.id}
        currentUserId={currentUser?.id}
      />

      <NewPurchaseOrderModal
        isOpen={isPOModalOpen}
        onClose={() => setIsPOModalOpen(false)}
        onSuccess={loadAllData}
        currentCampusId={currentCampus?.id}
        currentUserId={currentUser?.id}
      />

      <NewVisitorModal
        isOpen={isVisitorModalOpen}
        onClose={() => setIsVisitorModalOpen(false)}
        onSuccess={loadAllData}
        currentCampusId={currentCampus?.id}
        currentUserId={currentUser?.id}
      />

      <ReportIncidentModal
        isOpen={isIncidentModalOpen}
        onClose={() => setIsIncidentModalOpen(false)}
        onSuccess={loadAllData}
        currentCampusId={currentCampus?.id}
        currentUserId={currentUser?.id}
      />

      <IncidentDetailModal
        isOpen={Boolean(selectedIncidentId)}
        onClose={() => setSelectedIncidentId(null)}
        onSuccess={loadAllData}
        incidentId={selectedIncidentId}
        userRole={currentUser?.role}
        userPermissions={currentUser?.permissions}
        currentCampusId={currentCampus?.id}
        currentUserId={currentUser?.id}
      />

      <NewComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        onSuccess={loadAllData}
        currentCampusId={currentCampus?.id}
        currentUserId={currentUser?.id}
      />
    </div>
  );
}
