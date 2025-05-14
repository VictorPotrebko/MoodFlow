import React from 'react';
import { MoodEntry } from '../../types/MoodEntry';
import { MoodType } from '../../types/MoodType';

const moodLabels = ['Happy', 'Calm', 'Neutral', 'Sad', 'Angry'];
const moodIcons = ['😊', '😌', '😐', '😢', '😠'];
const moodColors = [
  'bg-yellow-100 text-yellow-700',
  'bg-blue-100 text-blue-700',
  'bg-gray-100 text-gray-700',
  'bg-indigo-100 text-indigo-700',
  'bg-red-100 text-red-700',
];

interface MoodEntryListProps {
  entries: MoodEntry[];
}

export default function MoodEntryList({ entries }: MoodEntryListProps) {
  if (!entries.length) {
    return <div className="text-center text-gray-400">No mood entries found.</div>;
  }
  return (
    <ul className="flex flex-col gap-3">
      {entries.map(entry => (
        <li key={entry.id} className={`flex items-start gap-3 p-3 rounded shadow-sm ${moodColors[entry.moodType]}`}>
          <span className="text-2xl mt-1">{moodIcons[entry.moodType]}</span>
          <div className="flex-1">
            <div className="font-medium">
              {entry.name} <span className="ml-2 text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
            </div>
            <div className="text-xs font-semibold">{moodLabels[entry.moodType]}</div>
            {entry.note && <div className="text-sm mt-1 italic">{entry.note}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}
