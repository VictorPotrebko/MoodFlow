import React, { useEffect, useState } from 'react';
import { getMoodStatistics } from '../../services/moodService';
import { MoodType } from '../../types/MoodType';
import StatsSummary from './StatsSummary';
import WeeklyPattern from './WeeklyPattern';

interface MoodStatistics {
  totalEntries: number;
  moodCounts: Record<MoodType, number>;
  mostCommonMood: MoodType | null;
  mostCommonMoodByDay: Record<string, MoodType | null>;
  trend: string;
}

export default function MoodInsights() {
  const [stats, setStats] = useState<MoodStatistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMoodStatistics();
      // Convert keys for mostCommonMoodByDay to day names
      const byDay: Record<string, MoodType | null> = {};
      Object.entries(data.mostCommonMoodByDay).forEach(([key, value]) => {
        // key is number (0=Sunday), convert to label
        const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][parseInt(key,10)] ?? key;
        byDay[day] = value;
      });
      setStats({ ...data, mostCommonMoodByDay: byDay });
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
    <section className="max-w-2xl w-full mx-auto bg-white shadow rounded-lg p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Mood Insights</h2>
      {loading ? (
        <div className="text-center text-blue-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : stats ? (
        <>
          <StatsSummary
            total={stats.totalEntries}
            moodCounts={stats.moodCounts}
            mostCommon={stats.mostCommonMood}
            trend={stats.trend}
          />
          <WeeklyPattern mostCommonMoodByDay={stats.mostCommonMoodByDay} />
        </>
      ) : null}
    </section>
  );
}
