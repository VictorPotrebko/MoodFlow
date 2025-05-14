import React from 'react';
import { MoodType } from '../../types/MoodType';

interface StatsSummaryProps {
  total: number;
  moodCounts: Record<MoodType, number>;
  mostCommon: MoodType | null;
  trend: string;
}

const moodLabels = ['Happy', 'Calm', 'Neutral', 'Sad', 'Angry'];
const moodIcons = ['😊', '😌', '😐', '😢', '😠'];

function renderMood(mood: number | null) {
  if (mood === null || mood === undefined || isNaN(Number(mood))) return '-';
  return (
    <span className="inline-flex items-center gap-1">
      <span>{moodIcons[mood]}</span>
      <span>{moodLabels[mood]}</span>
    </span>
  );
}

export default function StatsSummary({ total, moodCounts, mostCommon, trend }: StatsSummaryProps) {
  return (
    <div className="mb-4">
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="bg-gray-100 rounded p-2 text-center min-w-[100px]">
          <div className="text-xs text-gray-500">Total Entries</div>
          <div className="font-bold text-lg">{total}</div>
        </div>
        <div className="bg-gray-100 rounded p-2 text-center min-w-[100px]">
          <div className="text-xs text-gray-500">Most Common Mood</div>
          <div className="font-bold text-lg">{renderMood(mostCommon)}</div>
        </div>
        <div className="bg-gray-100 rounded p-2 text-center min-w-[100px]">
          <div className="text-xs text-gray-500">Trend</div>
          <div className="font-bold text-lg">{trend}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {[0,1,2,3,4].map((mood) => (
          <span key={mood} className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            {renderMood(mood)}: {moodCounts[mood] ?? 0}
          </span>
        ))}
      </div>
    </div>
  );
}
