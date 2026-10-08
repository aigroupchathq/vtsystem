import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Lock, CheckCircle2, User, Clock, MapPin, Eye } from 'lucide-react';
import { db } from '../../database/db';

export function IncidentDetailModal({
  isOpen,
  onClose,
  incidentId,
  userRole,
  userPermissions = [],
  currentCampusId,
  currentUserId,
  onSuccess
}) {
  const [incident, setIncident] = useState(null);
  const [forbiddenError, setForbiddenError] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [status, setStatus] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isOpen || !incidentId) {
      setIncident(null);
      setForbiddenError(null);
      return;
    }

    try {
      const context = {
        role: userRole,
        permissions: userPermissions,
        campusId: currentCampusId,
        userId: currentUserId
      };
      const found = db.getIncidentById(incidentId, context);
      setIncident(found);
      setStatus(found.status);
      setResolutionNotes(found.resolutionNotes || '');
      setForbiddenError(null);
    } catch (err) {
      setForbiddenError(err.message || 'Access restricted to authorized personnel.');
      setIncident(null);
    }
  }, [isOpen, incidentId, userRole, userPermissions, currentCampusId, currentUserId]);

  if (!isOpen) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError('');
    try {
      const context = {
        role: userRole,
        permissions: userPermissions,
        campusId: currentCampusId,
        userId: currentUserId
      };
      db.updateIncident(incidentId, {
        status,
        resolutionNotes
      }, context);
      setIsUpdating(false);
      onSuccess?.();
      onClose();
    } catch (err) {
      setIsUpdating(false);
      setUpdateError(err.message || 'Failed to update incident record.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Incident Dossier</h2>
              <p className="text-xs text-slate-400">Strictly confidential student welfare & safety records</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {forbiddenError ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Restricted Safeguarding File</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                {forbiddenError}
              </p>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-left text-xs text-slate-400">
              <span className="font-semibold text-rose-400 block mb-1">POCSO & Safety Compliance Note:</span>
              Safeguarding and harassment records are sealed to preserve student privacy and adhere to statutory child protection mandates. Only the Principal and authorized safeguarding officers possess decryption keys.
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              Close Dossier
            </button>
          </div>
        ) : incident ? (
          <div className="space-y-4">
            {incident.isSensitive && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs text-amber-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Protected Safeguarding Dossier
                </span>
                <span className="flex items-center gap-1 text-[11px] text-amber-400/80">
                  <Eye className="w-3.5 h-3.5" /> Access logged to audit trail
                </span>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide ${
                  incident.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  incident.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                  incident.severity === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {incident.severity} SEVERITY
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {incident.category}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">{incident.title}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Location: <strong className="text-white">{incident.location || 'Not specified'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Logged: <strong className="text-white">{new Date(incident.createdAt).toLocaleDateString()}</strong></span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Persons involved: <strong className="text-white">
                  {(() => {
                    try {
                      const persons = JSON.parse(incident.personsInvolvedJson || '[]');
                      return persons.length > 0 ? persons.join(', ') : 'None listed';
                    } catch {
                      return incident.personsInvolvedJson || 'None listed';
                    }
                  })()}
                </strong></span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Occurrence Details</label>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {incident.description}
              </div>
            </div>

            {incident.sensitiveNotes && (
              <div>
                <label className="block text-xs font-semibold text-rose-400 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Confidential Safeguarding Vault Notes
                </label>
                <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl text-xs text-rose-200 leading-relaxed whitespace-pre-wrap">
                  {incident.sensitiveNotes}
                </div>
              </div>
            )}

            {updateError && (
              <div className="p-3 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                {updateError}
              </div>
            )}

            <form onSubmit={handleUpdate} className="pt-3 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Workflow Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="INVESTIGATING">INVESTIGATING</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="ESCALATED">ESCALATED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Action & Resolution Notes</label>
                <textarea
                  rows="2"
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Record outcome, parent meetings conducted, or disciplinary sanctions..."
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Save Updates
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}
