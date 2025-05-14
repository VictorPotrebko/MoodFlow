import { MoodEntry } from '../types/MoodEntry';
import { MoodType } from '../types/MoodType';

const API_BASE = 'http://localhost:5000/api/moods'; // Adjust if backend runs on a different port

export interface MoodStatistics {
  totalEntries: number;
  moodCounts: Record<MoodType, number>;
  mostCommonMood: MoodType | null;
  mostCommonMoodByDay: Record<string, MoodType | null>;
  trend: string;
}

export async function submitMood(name: string, moodType: MoodType, note?: string): Promise<MoodEntry> {
  // Ensure moodType is sent as number
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, moodType: Number(moodType), note })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getMoods(dateFrom?: string, dateTo?: string): Promise<MoodEntry[]> {
  let url = API_BASE;
  if (dateFrom && dateTo) {
    url += `?from=${encodeURIComponent(dateFrom)}&to=${encodeURIComponent(dateTo)}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getMoodStatistics(dateFrom?: string, dateTo?: string): Promise<MoodStatistics> {
  let url = `${API_BASE}/statistics`;
  if (dateFrom && dateTo) {
    url += `?from=${encodeURIComponent(dateFrom)}&to=${encodeURIComponent(dateTo)}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
