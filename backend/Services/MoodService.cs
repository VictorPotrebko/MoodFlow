using backend.Models;
using backend.DTOs;
using backend.Enums;

namespace backend.Services
{
    public class MoodService : IMoodService
    {
        private readonly MoodDataStore _store;

        // Updated constructor to use dependency injection
        public MoodService(MoodDataStore store)
        {
            _store = store;
        }

        public void AddMoodEntry(MoodEntryDto dto)
        {
            var entry = new MoodEntry
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                MoodType = dto.MoodType,
                Note = dto.Note,
                Timestamp = dto.Timestamp == default ? DateTime.UtcNow : dto.Timestamp
            };
            _store.Add(entry);
            dto.Id = entry.Id;
            dto.Timestamp = entry.Timestamp;
        }

        public List<MoodEntryDto> GetMoodEntries(DateTime? from, DateTime? to)
        {
            List<MoodEntry> moods = (from.HasValue && to.HasValue)
                ? _store.GetByDateRange(from.Value, to.Value)
                : _store.GetAll();
                
            return moods.Select(e => new MoodEntryDto
            {
                Id = e.Id,
                Name = e.Name,
                MoodType = e.MoodType,
                Note = e.Note,
                Timestamp = e.Timestamp
            }).ToList();
        }
        
        public MoodStatisticsDto GetMoodStatistics(DateTime? from, DateTime? to)
        {
            List<MoodEntry> moods = (from.HasValue && to.HasValue)
                ? _store.GetByDateRange(from.Value, to.Value)
                : _store.GetAll();
                
            var moodCounts = moods.GroupBy(e => e.MoodType).ToDictionary(g => g.Key, g => g.Count());
            MoodType? mostCommonMood = moodCounts.Count > 0 ? moodCounts.Aggregate((l, r) => l.Value > r.Value ? l : r).Key : (MoodType?)null;
            var mostCommonMoodByDay = moods
                .GroupBy(e => e.Timestamp.DayOfWeek)
                .ToDictionary(
                    g => g.Key,
                    g => g.GroupBy(e => e.MoodType)
                        .OrderByDescending(x => x.Count())
                        .Select(x => (MoodType?)x.Key)
                        .FirstOrDefault()
                );
                
            string trend = "Stable";
            if (moods.Count >= 5)
            {
                int seg = moods.Count / 5;
                double avgStart = moods.Take(seg).Average(e => (int)e.MoodType);
                double avgEnd = moods.Skip(moods.Count - seg).Average(e => (int)e.MoodType);
                if (avgEnd > avgStart) trend = "Improving";
                else if (avgEnd < avgStart) trend = "Declining";
            }
            
            return new MoodStatisticsDto
            {
                TotalEntries = moods.Count,
                MoodCounts = moodCounts,
                MostCommonMood = mostCommonMood,
                MostCommonMoodByDay = mostCommonMoodByDay,
                Trend = trend
            };
        }
    }
}