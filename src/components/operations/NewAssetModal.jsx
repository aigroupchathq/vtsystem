// VEDIC TREE OS — New Asset Modal (Module 08)
import React, { useState } from 'react';
import { X, Box, HelpCircle } from 'lucide-react';
import { defaultOperationsService } from '../../modules/operations/operations.service.js';

export function NewAssetModal({ isOpen, onClose, context, onSuccess, onShowToast }) {
  const [assetCode, setAssetCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('IT_HARDWARE');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [locationFacilityId, setLocationFacilityId] = useState('fac-001');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const facilities = defaultOperationsService.getFacilities(context);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assetCode.trim() || !name.trim()) {
      setError('Please provide an asset code and name.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const asset = defaultOperationsService.createAsset(context, {
        assetCode: assetCode.trim().toUpperCase(),
        name: name.trim(),
        category,
        purchaseCost: Number(purchaseCost) || 0,
        serialNumber: serialNumber.trim() || null,
        modelNumber: modelNumber.trim() || null,
        locationFacilityId,
        notes: notes.trim() || null
      });

      onShowToast?.(`Asset '${asset.assetCode}' registered in institutional inventory.`);
      onSuccess?.(asset);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-100">Register Institutional Asset</h2>
              <p className="text-xs text-stone-400">Add physical equipment to campus fixed asset register</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Asset Code *</label>
              <input
                type="text"
                placeholder="e.g. AST-IT-006"
                value={assetCode}
                onChange={(e) => setAssetCode(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-blue-500 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-blue-500"
              >
                <option value="IT_HARDWARE">IT & Electronics</option>
                <option value="LAB_EQUIPMENT">Science Lab Apparatus</option>
                <option value="FURNITURE">Furniture & Fixtures</option>
                <option value="ELECTRICAL">Electrical & HVAC</option>
                <option value="SPORTS">Sports Equipment</option>
                <option value="VEHICLE">Fleet Vehicle</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Asset Name & Description *</label>
            <input
              type="text"
              placeholder="e.g. Epson 4K Interactive Ultra Short Throw Projector"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Purchase Cost (₹)</label>
              <input
                type="number"
                placeholder="e.g. 55000"
                value={purchaseCost}
                onChange={(e) => setPurchaseCost(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Serial Number</label>
              <input
                type="text"
                placeholder="SN-10992-B"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Model Number</label>
              <input
                type="text"
                placeholder="e.g. EB-735Fi"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Assigned Facility / Location</label>
            <select
              value={locationFacilityId}
              onChange={(e) => setLocationFacilityId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-blue-500"
            >
              {facilities.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.facilityCode})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Maintenance / Allocation Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Mounted on ceiling bracket; includes 3-year on-site warranty."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-stone-200 rounded-xl hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-md shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
