// VEDIC TREE OS — Institutional Communication Center Hub (Module 05)
import React, { useState } from 'react';
import {
  Send,
  MessageSquare,
  Smartphone,
  Mail,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Radio,
  RefreshCw,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  Shield,
  Sliders
} from 'lucide-react';
import { defaultCommunicationHub } from '../../modules/communication/communication-hub.service.js';
import { defaultProviderRegistry } from '../../modules/communication/provider.registry.js';
import { NewBroadcastModal } from './NewBroadcastModal.jsx';
import { CreateTemplateModal } from './CreateTemplateModal.jsx';
import { MessageDetailModal } from './MessageDetailModal.jsx';

export function CommunicationHub({ context, onShowToast }) {
  const [activeTab, setActiveTab] = useState('broadcasts'); // broadcasts | ledger | templates | preferences
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isNewBroadcastOpen, setIsNewBroadcastOpen] = useState(false);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Trigger state refresh
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  // Queries
  const allMessages = defaultCommunicationHub.getHistory(context);
  const broadcasts = defaultCommunicationHub.getBroadcasts(context);
  const templates = defaultCommunicationHub.getTemplates(context);
  const providerList = defaultProviderRegistry.listProviders();

  // Filtered Messages
  const filteredMessages = allMessages.filter(m => {
    if (channelFilter !== 'ALL' && m.channel !== channelFilter) return false;
    if (statusFilter !== 'ALL' && m.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = m.recipientName?.toLowerCase().includes(q);
      const matchAddr = m.recipientAddress?.toLowerCase().includes(q);
      const matchBody = m.body?.toLowerCase().includes(q);
      if (!matchName && !matchAddr && !matchBody) return false;
    }
    return true;
  });

  // KPI Metrics Calculation
  const totalOutbound = allMessages.length;
  const deliveredOrRead = allMessages.filter(m => m.status === 'DELIVERED' || m.status === 'READ').length;
  const deliveryRate = totalOutbound > 0 ? ((deliveredOrRead / totalOutbound) * 100).toFixed(1) : '100.0';
  const failedCount = allMessages.filter(m => m.status === 'FAILED').length;
  const scheduledCount = allMessages.filter(m => m.status === 'SCHEDULED').length;

  const handleProviderSwitch = (channel, providerId) => {
    try {
      defaultProviderRegistry.setActiveProvider(channel, providerId);
      onShowToast?.(`Active provider for ${channel} switched to ${providerId}!`);
      triggerRefresh();
    } catch (err) {
      onShowToast?.(err.message);
    }
  };

  const getChannelIcon = (ch) => {
    switch (ch) {
      case 'WHATSAPP': return MessageSquare;
      case 'SMS': return Smartphone;
      case 'EMAIL': return Mail;
      case 'PUSH': return Bell;
      case 'IN_APP': return CheckCircle2;
      default: return MessageSquare;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
      case 'READ':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
            <CheckCircle className="w-3 h-3" />
            {status}
          </span>
        );
      case 'SENT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
            <Send className="w-3 h-3" />
            SENT
          </span>
        );
      case 'SCHEDULED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
            <Clock className="w-3 h-3" />
            SCHEDULED
          </span>
        );
      case 'SENDING':
      case 'QUEUED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
            <RefreshCw className="w-3 h-3 animate-spin" />
            {status}
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300">
            <XCircle className="w-3 h-3" />
            FAILED
          </span>
        );
      default:
        return <span className="text-xs text-stone-500 font-mono">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" key={refreshTrigger}>
      {/* Universal 5-Orientation System Banner */}
      <div className="bg-white text-[#0B2F29] p-5 rounded-xl border border-[#E6DFD1] shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-[#F5F2EB] text-[#0B2F29] font-mono text-[10px] tracking-wide uppercase font-semibold border border-[#E6DFD1]">
                Module 05 • Unified Dispatch Engine
              </span>
              <span className="text-xs text-[#5C6460] font-medium">
                • {context.campusName || 'Pune Baner Campus'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B2F29] flex items-center gap-2">
              <Radio className="w-6 h-6 text-[#107E5B]" />
              Institutional Communication Center
            </h1>
            <p className="text-xs text-[#5C6460] mt-1 max-w-2xl leading-relaxed">
              Multi-channel orchestration across WhatsApp, SMS, Email, Push & In-App. Pluggable provider adapters with smart retries, preference enforcement, and dynamic audience broadcasting.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsNewBroadcastOpen(true)}
              className="px-4 py-2 bg-[#0B2F29] hover:bg-[#12423A] text-[#FBF8EF] text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              New Broadcast
            </button>
            <button
              onClick={() => setIsCreateTemplateOpen(true)}
              className="px-3.5 py-2 bg-white hover:bg-[#FBF8EF] text-[#0B2F29] text-xs font-medium rounded-xl border border-[#E6DFD1] shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              New Template
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Summary Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-[#E6DFD1] p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5C6460] mb-1">
            <span className="font-medium">Total Dispatched</span>
            <Send className="w-4 h-4 text-[#0B2F29]" />
          </div>
          <p className="text-2xl font-bold text-[#0B2F29] font-mono">
            {totalOutbound}
          </p>
          <span className="text-[11px] text-[#107E5B] font-medium">
            Across 5 channels
          </span>
        </div>

        <div className="bg-white border border-[#E6DFD1] p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5C6460] mb-1">
            <span className="font-medium">Delivery Rate</span>
            <CheckCircle2 className="w-4 h-4 text-[#107E5B]" />
          </div>
          <p className="text-2xl font-bold text-[#107E5B] font-mono">
            {deliveryRate}%
          </p>
          <span className="text-[11px] text-[#5C6460]">
            {deliveredOrRead} confirmed delivered
          </span>
        </div>

        <div className="bg-white border border-[#E6DFD1] p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5C6460] mb-1">
            <span className="font-medium">Scheduled Campaigns</span>
            <Clock className="w-4 h-4 text-[#C29B38]" />
          </div>
          <p className="text-2xl font-bold text-[#C29B38] font-mono">
            {scheduledCount}
          </p>
          <span className="text-[11px] text-[#5C6460]">
            Awaiting dispatch time
          </span>
        </div>

        <div className="bg-white border border-[#E6DFD1] p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5C6460] mb-1">
            <span className="font-medium">Failed / Retry Queue</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-rose-600 font-mono">
            {failedCount}
          </p>
          <span className="text-[11px] text-[#5C6460]">
            Eligible for auto-retry
          </span>
        </div>
      </div>

      {/* Navigation Tabs Header */}
      <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {[
            { id: 'broadcasts', label: 'Broadcasts & Circulars', count: broadcasts.length },
            { id: 'ledger', label: 'Delivery Ledger & History', count: allMessages.length },
            { id: 'templates', label: 'Template Studio', count: templates.length },
            { id: 'preferences', label: 'Multi-Channel Providers & Preferences' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0B2F29] text-[#FBF8EF] shadow-xs'
                  : 'text-[#5C6460] hover:bg-[#F5F2EB]'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F5F2EB] text-[#5C6460]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: BROADCASTS & CAMPAIGNS                                */}
      {/* ============================================================ */}
      {activeTab === 'broadcasts' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {broadcasts.map(bc => {
              let channels = [];
              try {
                channels = typeof bc.channelsJson === 'string' ? JSON.parse(bc.channelsJson) : (bc.channelsJson || []);
              } catch {
                channels = ['WHATSAPP'];
              }

              const percent = bc.totalRecipients > 0 ? Math.round((bc.sentCount / bc.totalRecipients) * 100) : 0;

              return (
                <div
                  key={bc.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase font-semibold text-stone-400 tracking-wider">
                          {bc.audienceType}
                        </span>
                        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                          {bc.title}
                        </h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono ${
                        bc.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : (bc.status === 'SCHEDULED'
                              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                              : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400')
                      }`}>
                        {bc.status}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {bc.body}
                    </p>

                    {/* Channels Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {channels.map(ch => {
                        const Icon = getChannelIcon(ch);
                        return (
                          <span
                            key={ch}
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-md border border-stone-200 dark:border-stone-700"
                          >
                            <Icon className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            {ch}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Progress Meter & Stats */}
                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500">Recipients Delivered</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200 font-mono">
                        {bc.sentCount} / {bc.totalRecipients} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                      <span>{bc.scheduledFor ? `Scheduled: ${new Date(bc.scheduledFor).toLocaleDateString('en-IN')}` : `Executed: ${new Date(bc.createdAt).toLocaleDateString('en-IN')}`}</span>
                      {bc.failedCount > 0 && (
                        <span className="text-rose-600 dark:text-rose-400 font-medium">
                          {bc.failedCount} Failed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: DELIVERY LEDGER & HISTORY                             */}
      {/* ============================================================ */}
      {activeTab === 'ledger' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200 dark:border-stone-800">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search recipient, address or text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none font-medium"
              >
                <option value="ALL">All Channels</option>
                <option value="WHATSAPP">WhatsApp</option>
                <option value="SMS">SMS</option>
                <option value="EMAIL">Email</option>
                <option value="PUSH">App Push</option>
                <option value="IN_APP">In-App</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none font-medium"
              >
                <option value="ALL">All Statuses</option>
                <option value="SENT">Sent</option>
                <option value="DELIVERED">Delivered</option>
                <option value="READ">Read</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50/80 dark:bg-stone-800/40 text-stone-500 font-semibold border-b border-stone-200 dark:border-stone-800">
                  <tr>
                    <th className="px-4 py-3">Channel & Provider</th>
                    <th className="px-4 py-3">Recipient</th>
                    <th className="px-4 py-3">Subject / Body Preview</th>
                    <th className="px-4 py-3">Delivery Status</th>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {filteredMessages.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-stone-400">
                        No communication messages found matching the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredMessages.map(msg => {
                      const Icon = getChannelIcon(msg.channel);
                      return (
                        <tr
                          key={msg.id}
                          onClick={() => setSelectedMessage(msg)}
                          className="hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <span className="font-semibold text-stone-800 dark:text-stone-200 block text-[11px]">{msg.channel}</span>
                                <span className="text-[10px] text-stone-400 font-mono">{msg.provider}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium text-stone-800 dark:text-stone-200 block">{msg.recipientName}</span>
                            <span className="text-[11px] text-stone-500 font-mono">{msg.recipientAddress}</span>
                          </td>
                          <td className="px-4 py-3 max-w-xs truncate text-stone-600 dark:text-stone-400">
                            {msg.subject && <span className="font-semibold text-stone-800 dark:text-stone-200 block truncate">{msg.subject}</span>}
                            <span className="truncate block">{msg.body}</span>
                          </td>
                          <td className="px-4 py-3">
                            {getStatusBadge(msg.status)}
                            {msg.status === 'FAILED' && msg.failureReason && (
                              <span className="block text-[10px] text-rose-600 dark:text-rose-400 mt-0.5 truncate max-w-[140px]">
                                {msg.failureReason}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-stone-500 text-[11px] font-mono">
                            {new Date(msg.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMessage(msg);
                              }}
                              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 p-1"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: TEMPLATE STUDIO                                       */}
      {/* ============================================================ */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(tpl => {
              const Icon = getChannelIcon(tpl.channel);
              let variables = [];
              try {
                variables = typeof tpl.variablesJson === 'string' ? JSON.parse(tpl.variablesJson) : (tpl.variablesJson || []);
              } catch {
                variables = [];
              }

              return (
                <div
                  key={tpl.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{tpl.name}</h4>
                          <span className="text-[10px] text-stone-400 uppercase font-medium">{tpl.category}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-mono">
                        {tpl.channel}
                      </span>
                    </div>

                    {tpl.subject && (
                      <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/40 p-2 rounded-lg border border-stone-200/60 dark:border-stone-700/60">
                        {tpl.subject}
                      </p>
                    )}

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed whitespace-pre-wrap">
                      {tpl.body}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block">
                      Variables ({variables.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {variables.map(v => (
                        <span key={v} className="px-1.5 py-0.5 text-[10px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-800 font-mono">
                          {`{{${v}}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: PREFERENCES & PROVIDER MATRIX                         */}
      {/* ============================================================ */}
      {activeTab === 'preferences' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Provider Adapter Configuration Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Active Multi-Channel Provider Rails
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Dynamic gateway resolver: switch vendor adapters without touching business logic
              </p>
            </div>

            <div className="space-y-3">
              {[
                { channel: 'WHATSAPP', label: 'WhatsApp Provider', icon: MessageSquare, options: ['MOCK', 'META_CLOUD', 'TWILIO'] },
                { channel: 'SMS', label: 'SMS Provider (DLT/Global)', icon: Smartphone, options: ['MSG91', 'MOCK_SMS', 'TWILIO_SMS'] },
                { channel: 'EMAIL', label: 'Email Provider (Transactional/Bulk)', icon: Mail, options: ['SENDGRID', 'MOCK_EMAIL', 'AWS_SES'] },
                { channel: 'PUSH', label: 'Push Provider (Mobile/Web)', icon: Bell, options: ['FCM', 'MOCK_PUSH'] },
                { channel: 'IN_APP', label: 'In-App Notification Center', icon: CheckCircle2, options: ['IN_APP'] }
              ].map(rail => {
                const Icon = rail.icon;
                const active = providerList[rail.channel]?.active || rail.options[0];
                return (
                  <div key={rail.channel} className="p-3.5 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">{rail.label}</span>
                        <span className="text-[10px] text-stone-400 font-mono">Channel: {rail.channel}</span>
                      </div>
                    </div>

                    <select
                      value={active}
                      onChange={(e) => handleProviderSwitch(rail.channel, e.target.value)}
                      className="px-2.5 py-1 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none font-semibold text-indigo-600 dark:text-indigo-400 font-mono shadow-xs"
                    >
                      {rail.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Granular Notification Categories & Preference Policy Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Notification Preference Policy & Overrides
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Transactional alerts bypass opt-outs; marketing and circular broadcasts enforce recipient choices
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { category: 'EMERGENCY_ALERTS', label: 'Emergency Closures & Weather Alerts', override: true, desc: 'Critical life-safety alerts bypass user opt-outs across all channels.' },
                { category: 'FEE_INVOICES', label: 'Tuition Fee Invoices & Receipts', override: true, desc: 'Statutory receipts and invoices dispatched directly to primary guardian.' },
                { category: 'ATTENDANCE_ALERTS', label: 'Student Absence & Gate Logs', override: true, desc: 'Automated SMS/WhatsApp notification on student unexcused absence.' },
                { category: 'CAMPUS_EVENTS', label: 'Campus Sports & Event Circulars', override: false, desc: 'Recipient opt-in required; respected during bulk broadcast resolution.' },
                { category: 'GENERAL_BROADCASTS', label: 'Marketing & Parent Association Circulars', override: false, desc: 'Strict opt-in compliance; suppressed if guardian unchecks.' }
              ].map(cat => (
                <div key={cat.category} className="p-3 bg-stone-50 dark:bg-stone-800/30 rounded-xl border border-stone-200/80 dark:border-stone-700/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{cat.label}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      cat.override
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                    }`}>
                      {cat.override ? 'Mandatory Override' : 'Strict Preference'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <NewBroadcastModal
        isOpen={isNewBroadcastOpen}
        onClose={() => setIsNewBroadcastOpen(false)}
        context={context}
        onSuccess={() => triggerRefresh()}
        onShowToast={onShowToast}
      />

      <CreateTemplateModal
        isOpen={isCreateTemplateOpen}
        onClose={() => setIsCreateTemplateOpen(false)}
        context={context}
        onSuccess={() => triggerRefresh()}
        onShowToast={onShowToast}
      />

      <MessageDetailModal
        message={selectedMessage}
        isOpen={Boolean(selectedMessage)}
        onClose={() => setSelectedMessage(null)}
        context={context}
        onRetrySuccess={() => triggerRefresh()}
        onShowToast={onShowToast}
      />
    </div>
  );
}

export default CommunicationHub;
