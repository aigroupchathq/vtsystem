import React from 'react';
import { Building2, Globe, MapPin, School, ChevronRight, ShieldCheck, Check } from 'lucide-react';
import { db } from '../../database/db.js';

export default function TenantHierarchyView({ tenantContext, onSwitchCampus }) {
  const hierarchy = db.getHierarchy();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0F172A] border border-[#24324D] rounded-xl p-4">
        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-0.5">
          WHERE AM I? • Platform Foundation / Multi-Tenant Topology
        </div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          Enterprise Tenant Hierarchy
        </h1>
        <p className="text-xs text-slate-400">
          WHAT AM I SEEING? Strict hierarchical topology mapping Organization → Region → School → Physical Campuses.
        </p>
      </div>

      {/* Root Organization Card */}
      <div className="bg-[#141E33] border border-[#24324D] rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
              VT
            </div>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                {hierarchy.organization.name}
                <span className="badge-green px-2 py-0.5 rounded text-[10px] font-mono">
                  GLOBAL ROOT
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Code: {hierarchy.organization.code} • Slug: {hierarchy.organization.slug}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-mono text-emerald-400">CURRENCY: INR (₹)</div>
            <div className="text-[10px] text-slate-500">FISCAL CYCLE: APR - MAR</div>
          </div>
        </div>

        {/* Regions */}
        <div className="space-y-4">
          {hierarchy.regions.map(region => (
            <div key={region.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
                  <Globe className="w-4 h-4" />
                  <span>{region.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                    {region.code}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">{region.timezone}</div>
              </div>

              {/* Schools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2 sm:pl-4 border-l-2 border-slate-800">
                {region.schools.map(school => (
                  <div key={school.id} className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <School className="w-4 h-4 text-emerald-400" />
                        {school.name}
                      </div>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                        {school.boardType}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Affiliation: {school.affiliationNo || 'Affiliated'} • Ownership: {school.ownershipType}
                    </div>

                    {/* Campuses inside school */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                      <div className="text-[10px] font-mono uppercase text-slate-400">
                        Operational Campuses:
                      </div>
                      {school.campuses.map(campus => {
                        const isActive = campus.id === tenantContext.activeCampusId;
                        return (
                          <div
                            key={campus.id}
                            className={`p-2 rounded-md flex items-center justify-between text-xs transition-colors ${
                              isActive
                                ? 'bg-emerald-950/60 border border-emerald-500/50 text-white'
                                : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                              <span className="font-medium">{campus.name}</span>
                            </div>

                            {isActive ? (
                              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                                <Check className="w-3 h-3" /> Active Scope
                              </span>
                            ) : (
                              <button
                                onClick={() => onSwitchCampus(campus.id)}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              >
                                Switch
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
