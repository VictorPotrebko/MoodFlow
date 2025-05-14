import React, { useState } from 'react';
import MoodSelector from './MoodSelector';
import { MoodType } from '../../types/MoodType';
import { submitMood } from '../../services/moodService';

export default function MoodTracker() {
  const [name, setName] = useState('');
  const [mood, setMood] = useState(null as MoodType | null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    console.log('MOOD', mood);

    if (mood < 0 || mood > 4) {
      setError('Please select a mood.');
      return;
    }
    if (note.length > 280) {
      setError('Note must be 280 characters or less.');
      return;
    }
    setLoading(true);
    try {
      await submitMood(name, mood, note.trim() ? note : undefined);
      setSuccess(true);
      setName('');
      setMood(null);
      setNote('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit mood.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full bg-white shadow rounded-lg p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Record Your Mood</h2>
      <label className="block">
        <span className="text-gray-700">Name</span>
        <input
          type="text"
          className="mt-1 block w-full rounded border-gray-300 focus:border-blue-400 focus:ring-blue-300"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={50}
          required
        />
      </label>
      <MoodSelector selected={mood} onSelect={setMood} />
      <label className="block">
        <span className="text-gray-700">Note <span className="text-xs text-gray-400">(optional, max 280 chars)</span></span>
        <textarea
          className="mt-1 block w-full rounded border-gray-300 focus:border-blue-400 focus:ring-blue-300 resize-none"
          value={note}
          onChange={e => setNote(e.target.value)}
          maxLength={280}
          rows={3}
        />
      </label>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white font-semibold rounded py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Mood'}
      </button>
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      {success && <div className="text-green-600 text-sm text-center">Mood recorded successfully!</div>}
    </form>
  );
}
