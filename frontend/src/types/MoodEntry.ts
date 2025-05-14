import { MoodType } from './MoodType';

export interface MoodEntry {
  id: string;
  name: string;
  moodType: MoodType;
  note?: string;
  timestamp: string; // ISO string for Date
}
