import React from 'react';
import { MoodType } from '../../types/MoodType';

interface WeeklyPatternProps {
  mostCommonMoodByDay: Record<string, MoodType | null>;
}

const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const moodIcons: Record<MoodType, string> = {
  Happy: '😊',
  Calm: '😌',
  Neutral: '😐',
  Sad: '😢',
  Angry: '😠',
};

export default function WeeklyPattern({ mostCommonMoodByDay }: WeeklyPatternProps) {
  return (
    <div className="mb-4">
      <h3 className="text-md font-semibold mb-2 text-center">Weekly Mood Pattern</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {dayLabels.map((day, idx) => {
          const mood = mostCommonMoodByDay[day] || null;
          return (
            <div key={day} className="flex flex-col items-center bg-gray-50 rounded px-3 py-2 min-w-[70px]">
              <span className="text-xs text-gray-500 mb-1">{day.slice(0,3)}</span>
              <span className="text-2xl">
                {mood ? moodIcons[mood] : '–'}
              </span>
              <span className="text-xs mt-1">{mood ?? '-'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
