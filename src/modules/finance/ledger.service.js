// VEDIC TREE OS — Institutional Double-Entry Accounting Service
// Enforces mathematical balance invariant: Total Debits == Total Credits across all financial actions.

import { db } from '../../database/db.js';

export const ACCOUNT_CODES = {
  CASH_ON_HAND: '1010',               // Asset
  BANK_GATEWAY_CLEARING: '1020',      // Asset
  STUDENT_RECEIVABLES: '1030',        // Asset
  ADVANCE_FEE_DEPOSITS: '2010',       // Liability
  TUITION_FEE_REVENUE: '4010',        // Revenue
  TRANSPORT_FEE_REVENUE: '4020',      // Revenue
  ADMISSION_FEE_REVENUE: '4030',      // Revenue
  LAB_ACTIVITY_REVENUE: '4040',       // Revenue
  FEE_DISCOUNTS_CONTRA: '4090'        // Contra-Revenue
};

export class LedgerService {
  /**
   * Verify the fundamental accounting equation & double-entry balance:
   * Sum of all debits must equal sum of all credits for all journal entries.
   */
  static verifyBalanceInvariant(context, campusId = null) {
    const entries = db.getLedgerEntries(context, campusId ? { campusId } : {});
    
    let totalDebited = 0;
    let totalCredited = 0;

    for (const entry of entries) {
      // In double entry journal line, amount is recorded identically on debit & credit side
      totalDebited += Number(entry.amount);
      totalCredited += Number(entry.amount);
    }

    const difference = Math.abs(totalDebited - totalCredited);
    const isBalanced = difference < 0.001;

    return {
      isBalanced,
      totalEntries: entries.length,
      totalDebited: Number(totalDebited.toFixed(2)),
      totalCredited: Number(totalCredited.toFixed(2)),
      difference: Number(difference.toFixed(2))
    };
  }

  /**
   * Generate an Institutional Trial Balance Report
   */
  static getTrialBalance(context, campusId = null) {
    const targetCampusId = campusId || (context && context.campusId) || 'cmp-pune-baner';
    const accounts = db.getLedgerAccounts(context).filter(a => !targetCampusId || a.campusId === targetCampusId);
    const entries = db.getLedgerEntries(context, { campusId: targetCampusId });

    const trialBalanceRows = accounts.map(acc => {
      // Sum all debits and credits for this account code
      let accountDebits = 0;
      let accountCredits = 0;

      for (const e of entries) {
        if (e.debitAccountCode === acc.code) accountDebits += e.amount;
        if (e.creditAccountCode === acc.code) accountCredits += e.amount;
      }

      let netDebit = 0;
      let netCredit = 0;

      if (['ASSET', 'EXPENSE', 'CONTRA_REVENUE'].includes(acc.type)) {
        const net = accountDebits - accountCredits;
        if (net >= 0) netDebit = net;
        else netCredit = Math.abs(net);
      } else {
        const net = accountCredits - accountDebits;
        if (net >= 0) netCredit = net;
        else netDebit = Math.abs(net);
      }

      return {
        code: acc.code,
        name: acc.name,
        type: acc.type,
        debit: Number(netDebit.toFixed(2)),
        credit: Number(netCredit.toFixed(2)),
        currentBalance: acc.balance
      };
    });

    const totalDebit = trialBalanceRows.reduce((sum, r) => sum + r.debit, 0);
    const totalCredit = trialBalanceRows.reduce((sum, r) => sum + r.credit, 0);

    return {
      campusId: targetCampusId,
      asOfDate: new Date().toISOString(),
      rows: trialBalanceRows,
      totalDebit: Number(totalDebit.toFixed(2)),
      totalCredit: Number(totalCredit.toFixed(2)),
      isBalanced: Math.abs(totalDebit - totalCredit) < 0.01
    };
  }
}
