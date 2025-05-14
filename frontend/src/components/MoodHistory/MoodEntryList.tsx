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
    <div className="bg-gray-50 rounded-lg py-6 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {entries.map(entry => (
          <div
            key={entry.id}
            className={`relative flex flex-col items-start gap-2 rounded-xl shadow-md bg-white p-4 border-l-8 transition-transform hover:scale-[1.03] hover:shadow-lg ${[
              'border-yellow-300',
              'border-blue-300',
              'border-gray-300',
              'border-indigo-300',
              'border-red-300',
            ][entry.moodType]}`}
          >
            <div className={`flex-shrink-0 text-3xl mb-2`}>
              {moodIcons[entry.moodType]}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-lg text-gray-800">{entry.name}</span>
              <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${[
                'bg-yellow-100 text-yellow-700',
                'bg-blue-100 text-blue-700',
                'bg-gray-100 text-gray-700',
                'bg-indigo-100 text-indigo-700',
                'bg-red-100 text-red-700',
              ][entry.moodType]}`}>{moodLabels[entry.moodType]}</span>
            </div>
            {entry.note && (
              <div className="text-sm mt-2 italic text-gray-600">{entry.note}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
