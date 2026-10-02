import React from 'react';
import { ShieldCheck, Check, X, Lock } from 'lucide-react';
import { db } from '../../database/db.js';

export default function RbacMatrixView() {
  const roles = db.roles;
  const permissions = db.permissions;
  const rolePermissions = db.rolePermissions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl p-4">
        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-0.5">
          WHERE AM I? • Platform Foundation / Access Governance
        </div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          RBAC & CASL Permissions Matrix
        </h1>
        <p className="text-xs text-slate-400">
          WHAT AM I SEEING? Granular capability access across system roles. Super Admins inherit unconditional wildcards.
        </p>
      </div>

      {/* Matrix Table */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-3 px-4">Permission Code</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Action</th>
                {roles.map(r => (
                  <th key={r.id} className="py-3 px-4 text-center">
                    <div className="text-white font-semibold">{r.code}</div>
                    <div className="text-[9px] text-slate-500 font-mono">{r.scopeLevel}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {permissions.map((perm) => (
                <tr key={perm.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-200">
                    {perm.code}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 uppercase text-[10px]">
                    {perm.module}
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-400 text-[10px]">
                    {perm.action}
                  </td>
                  {roles.map(role => {
                    const isHq = role.code === 'HQ_ADMIN';
                    const hasPerm = isHq || (rolePermissions[role.code] || []).includes(perm.code);

                    return (
                      <td key={role.id} className="py-3 px-4 text-center">
                        {hasPerm ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-900/60 border border-slate-800 text-slate-600 flex items-center justify-center mx-auto">
                            <X className="w-3 h-3" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
