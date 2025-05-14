import React, { useState, useEffect } from 'react';
import { getMoods } from '../../services/moodService';
import { MoodEntry } from '../../types/MoodEntry';
import MoodEntryList from './MoodEntryList';
import DateRangeFilter from './DateRangeFilter';

export default function MoodHistory() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const moods = await getMoods(from, to);
      setEntries(moods);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch mood history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
    // eslint-disable-next-line
  }, [from, to]);

  return (
    <section className="max-w-2xl w-full mx-auto bg-white shadow rounded-lg p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Mood History</h2>
      <DateRangeFilter from={from} to={to} onChange={(f, t) => { setFrom(f); setTo(t); }} />
      {loading ? (
        <div className="text-center text-blue-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <MoodEntryList entries={entries} />
      )}
    </section>
  );
}
