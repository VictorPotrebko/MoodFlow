import React from 'react';
import { MoodEntry } from '../../types/MoodEntry';

// Helper arrays for display
const moodLabels = ['Happy', 'Calm', 'Neutral', 'Sad', 'Angry'];
const moodIcons = ['😊', '😌', '😐', '😢', '😠'];
const moodColors = [
  'bg-yellow-200',
  'bg-blue-200',
  'bg-gray-200',
  'bg-indigo-200',
  'bg-red-200',
];

interface MoodTrendGraphProps {
  entries: MoodEntry[];
}

// Simple line graph using SVG (no external libs)
export default function MoodTrendGraph({ entries }: MoodTrendGraphProps) {
  if (!entries.length) return <div className="text-center text-gray-400">No data for trend graph.</div>;
  // Sort by timestamp ascending
  const sorted = [...entries].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Map to points: x = index, y = moodType
  const points = sorted.map((entry, i) => ({
    x: i,
    y: entry.moodType,
    label: `${moodIcons[entry.moodType]} ${moodLabels[entry.moodType]}`,
    date: new Date(entry.timestamp).toLocaleDateString()
  }));

  // SVG dimensions
  const width = 320;
  const height = 120;
  const padding = 32;
  const stepX = (width - 2 * padding) / Math.max(points.length - 1, 1);
  const stepY = (height - 2 * padding) / 4; // 5 moods

  // Build SVG polyline
  const polyPoints = points.map((p, i) => `${padding + i * stepX},${padding + p.y * stepY}`).join(' ');

  return (
    <div className="my-4">
      <h3 className="text-md font-semibold mb-2 text-center">Mood Trend Over Time</h3>
      <svg width={width} height={height} className="block mx-auto">
        {/* Mood lines */}
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={polyPoints}
        />
        {/* Mood dots */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={padding + i * stepX}
            cy={padding + p.y * stepY}
            r={6}
            className={moodColors[p.y]}
            stroke="#2563eb"
            strokeWidth="1.5"
          />
        ))}
        {/* Mood labels on Y axis */}
        {moodLabels.map((label, i) => (
          <text
            key={label}
            x={8}
            y={padding + i * stepY + 5}
            fontSize="12"
            fill="#555"
          >
            {moodIcons[i]} {label}
          </text>
        ))}
        {/* Date labels on X axis */}
        {points.map((p, i) => (
          <text
            key={i}
            x={padding + i * stepX}
            y={height - 4}
            fontSize="10"
            fill="#888"
            textAnchor="middle"
          >
            {p.date}
          </text>
        ))}
      </svg>
    </div>
  );
}
