import React, { useEffect, useState } from 'react';
import { getMoodStatistics } from '../../services/moodService';
import { MoodType } from '../../types/MoodType';
import StatsSummary from './StatsSummary';
import WeeklyPattern from './WeeklyPattern';
import MoodTrendGraph from './MoodTrendGraph';

interface MoodStatistics {
  totalEntries: number;
  moodCounts: Record<MoodType, number>;
  mostCommonMood: MoodType | null;
  mostCommonMoodByDay: Record<string, MoodType | null>;
  trend: string;
}

import { getMoods } from '../../services/moodService';
import { MoodEntry } from '../../types/MoodEntry';

export default function MoodInsights() {
  const [stats, setStats] = useState<MoodStatistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMoodStatistics();

      console.log('DATA', data);


      const moods = await getMoods();

      console.log('moods', moods);

      // Convert keys for mostCommonMoodByDay to day names
      const byDay: Record<string, MoodType | null> = {};
      Object.entries(data.mostCommonMoodByDay).forEach(([key, value]) => {
        const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][parseInt(key,10)] ?? key;
        byDay[day] = value;
      });
      // Map moodCounts string keys to numeric indices (0-4)
      const moodKeyMap: Record<string, number> = {
        Happy: 0,
        Calm: 1,
        Neutral: 2,
        Sad: 3,
        Angry: 4
      };
      const moodCountsArray = [0, 0, 0, 0, 0];
      Object.entries(data.moodCounts).forEach(([key, count]) => {
        const idx = moodKeyMap[key as keyof typeof moodKeyMap];
        if (typeof idx === 'number') moodCountsArray[idx] = count as number;
      });
      setStats({ ...data, moodCounts: moodCountsArray, mostCommonMoodByDay: byDay });
      setEntries(moods);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch statistics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <section className="max-w-2xl w-full mx-auto bg-white shadow rounded-lg p-0 flex flex-col">
      <h2 className="text-xl font-semibold pt-6 pb-2 text-center">Mood Insights</h2>
      {loading ? (
        <div className="text-center text-blue-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : stats ? (
        <>
          {/* Insights + Weekly Pattern together */}
          <div className="px-6 pt-2 pb-6 flex flex-col md:flex-row gap-6 border-b border-gray-100">
            <div className="flex-1">
              <StatsSummary
                total={stats.totalEntries}
                moodCounts={stats.moodCounts}
                mostCommon={stats.mostCommonMood}
                trend={stats.trend}
              />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <WeeklyPattern mostCommonMoodByDay={stats.mostCommonMoodByDay} />
            </div>
          </div>
          {/* Mood Trend Graph full width */}
          <div className="w-full px-2 pb-4 pt-4">
            <MoodTrendGraph entries={entries} />
          </div>
        </>
      ) : null}
    </section>
  );
}
