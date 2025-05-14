import React from 'react';

interface DateRangeFilterProps {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
}

export default function DateRangeFilter({ from, to, onChange }: DateRangeFilterProps) {
  return (
    <div className="flex gap-2 items-center mb-4">
      <label className="flex flex-col text-xs">
        From
        <input
          type="date"
          className="rounded border-gray-300 focus:border-blue-400 focus:ring-blue-300 px-2 py-1"
          value={from}
          onChange={e => onChange(e.target.value, to)}
        />
      </label>
      <label className="flex flex-col text-xs">
        To
        <input
          type="date"
          className="rounded border-gray-300 focus:border-blue-400 focus:ring-blue-300 px-2 py-1"
          value={to}
          onChange={e => onChange(from, e.target.value)}
        />
      </label>
    </div>
  );
}
