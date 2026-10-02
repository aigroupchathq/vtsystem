import React, { useState } from 'react';
import { Terminal, Eye } from 'lucide-react';
import { db } from '../../database/db.js';

export default function AuditLogsView({ tenantContext }) {
  const [selectedLog, setSelectedLog] = useState(null);
  const [filterAction, setFilterAction] = useState('');

  const logs = db.getAuditLogs(tenantContext).filter(l => 
    !filterAction || l.action === filterAction
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-0.5">
            WHERE AM I? • Platform Foundation / Immutable Event Ledger
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            Audit Trail & Event Log
          </h1>
          <p className="text-xs text-slate-400">
            WHAT AM I SEEING? Cryptographically sequenced, append-only ledger capturing all state mutations with diffs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 font-mono"
          >
            <option value="">All Actions</option>
            <option value="CREATE">CREATE</option>
            <option value="LOGIN">LOGIN</option>
            <option value="SWITCH_TENANT">SWITCH_TENANT</option>
            <option value="ATTACH_DOCUMENT">ATTACH_DOCUMENT</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">User Role</th>
                <th className="py-3 px-4">Entity ID</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4 text-right">State Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {logs.map((log) => {
                let badgeClass = 'badge-slate';
                if (log.action === 'CREATE') badgeClass = 'badge-green';
                if (log.action === 'SWITCH_TENANT') badgeClass = 'badge-saffron';
                if (log.action === 'LOGIN') badgeClass = 'badge-slate';

                return (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {log.createdAt ? log.createdAt.replace('T', ' ').slice(0, 19) : 'Just now'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`${badgeClass} px-2 py-0.5 rounded text-[10px] font-semibold`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white font-medium">
                      {log.entityName}
                    </td>
                    <td className="py-3 px-4 text-amber-400">
                      {log.userRole}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] truncate max-w-[140px]">
                      {log.entityId}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {log.ipAddress}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {log.diffAfter ? (
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/50 px-2 py-0.5 rounded transition-colors"
                        >
                          <Eye className="w-3 h-3" /> View Diff
                        </button>
                      ) : (
                        <span className="text-slate-600 text-[10px]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diff Inspector Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Audit Event Snapshot #{selectedLog.id}
                </h3>
                <div className="text-[11px] text-slate-400">
                  {selectedLog.action} on {selectedLog.entityName} ({selectedLog.entityId})
                </div>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {selectedLog.diffBefore && (
                <div>
                  <div className="text-[10px] text-red-400 uppercase tracking-wider mb-1">State Before:</div>
                  <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-red-300 overflow-x-auto text-[11px]">
                    {JSON.stringify(JSON.parse(selectedLog.diffBefore), null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.diffAfter && (
                <div>
                  <div className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1">State After:</div>
                  <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 overflow-x-auto text-[11px]">
                    {JSON.stringify(JSON.parse(selectedLog.diffAfter), null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
