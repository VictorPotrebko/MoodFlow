import React from 'react';
import { MoodType } from '../../types/MoodType';

const moods: { type: MoodType; label: string; icon: string; color: string }[] = [
  { type: MoodType.Happy, label: 'Happy', icon: '😊', color: 'bg-yellow-200' },
  { type: MoodType.Calm, label: 'Calm', icon: '😌', color: 'bg-blue-200' },
  { type: MoodType.Neutral, label: 'Neutral', icon: '😐', color: 'bg-gray-200' },
  { type: MoodType.Sad, label: 'Sad', icon: '😢', color: 'bg-indigo-200' },
  { type: MoodType.Angry, label: 'Angry', icon: '😠', color: 'bg-red-200' },
];

interface MoodSelectorProps {
  selected: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

export default function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div className="flex justify-center gap-4 my-4">
      {moods.map((mood) => (
        <button
          key={mood.type}
          type="button"
          className={
            `flex flex-col items-center gap-1 px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ` +
            (selected === mood.type
              ? 'border-2 border-gray-500 bg-gray-300 text-gray-800 shadow-lg ring-2 ring-gray-400 scale-105'
              : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 opacity-60 hover:opacity-100')
          }
          onClick={() => onSelect(mood.type)}
          aria-pressed={selected === mood.type ? true : false}
          tabIndex={0}
        >
          <span className="text-2xl">{mood.icon}</span>
          <span className="text-xs font-medium">{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
