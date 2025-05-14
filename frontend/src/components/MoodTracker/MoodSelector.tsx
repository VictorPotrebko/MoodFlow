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
          className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all
            ${selected === mood.type ? 'border-blue-500 ring-2 ring-blue-300' : 'border-transparent'} ${mood.color} hover:scale-105`}
          onClick={() => onSelect(mood.type)}
          aria-label={mood.label}
        >
          <span className="text-3xl mb-1">{mood.icon}</span>
          <span className="text-xs font-medium">{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
