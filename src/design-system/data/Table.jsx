import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * VEDIC TREE OS — Table Primitive (Prompt 06)
 * Calm editorial data presentation with hairline dividers, tabular numerals,
 * and warm ivory table headers.
 */

export function Table({
  columns,
  data,
  keyExtractor = (item, idx) => item.id || idx,
  onRowClick = null,
  emptyMessage = 'No records found',
  sortColumn = null,
  sortDirection = 'asc', // 'asc' | 'desc'
  onSort = null,
  className = '',
}) {
  return (
    <div className={`w-full overflow-x-auto border border-[#E6DFD1] rounded-lg sm:rounded-xl bg-white ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-[#E6DFD1] bg-[#FBF8EF]">
            {columns.map((col, idx) => {
              const isSorted = sortColumn === col.key;
              return (
                <th
                  key={col.key || idx}
                  className={`px-4 py-3 text-[10px] font-mono font-bold text-[#60706B] uppercase tracking-wider ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.sortable ? 'cursor-pointer select-none hover:text-[#0B2F29]' : ''} ${
                    col.headerClassName || ''
                  }`}
                  onClick={() => col.sortable && onSort && onSort(col.key)}
                >
                  <div className={`inline-flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : ''}`}>
                    <span>{col.title}</span>
                    {col.sortable && isSorted && (
                      <span className="text-[#0B2F29]">
                        {sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EFE9DD] text-[#102625]">
          {data && data.length > 0 ? (
            data.map((item, rowIdx) => (
              <tr
                key={keyExtractor(item, rowIdx)}
                onClick={() => onRowClick && onRowClick(item)}
                className={`transition-colors duration-100 ${
                  onRowClick
                    ? 'cursor-pointer hover:bg-[#FBF8EF]/75'
                    : 'hover:bg-[#FBF8EF]/45'
                }`}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={col.key || colIdx}
                    className={`px-4 py-3 ${
                      col.align === 'right' ? 'text-right font-mono tabular-nums' : col.align === 'center' ? 'text-center' : 'text-left'
                    } ${col.className || ''}`}
                  >
                    {col.render ? col.render(item, rowIdx) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-xs text-[#7E8D88] italic">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
