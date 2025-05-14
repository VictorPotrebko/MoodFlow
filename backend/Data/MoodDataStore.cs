using backend.Enums;
using backend.Models;

public class MoodDataStore
{
    private readonly List<MoodEntry> _moodEntries;

    // Public constructor for DI
    public MoodDataStore()
    {
        // Initialize with sample data
        _moodEntries = new List<MoodEntry>
        {
            new MoodEntry
            {
                Id = Guid.NewGuid(),
                Name = "John",
                MoodType = MoodType.Happy,
                Note = "Feeling great!",
                Timestamp = DateTime.UtcNow.AddDays(-1)
            },
            new MoodEntry
            {
                Id = Guid.NewGuid(),
                Name = "John",
                MoodType = MoodType.Sad,
                Note = "Had a tough day.",
                Timestamp = DateTime.UtcNow
            }
        };
    }

    // The rest of your methods remain the same
    public void Add(MoodEntry entry)
    {
        _moodEntries.Add(entry);
    }

    public List<MoodEntry> GetAll()
    {
        return _moodEntries.OrderByDescending(e => e.Timestamp).ToList();
    }

    public List<MoodEntry> GetByDateRange(DateTime from, DateTime to)
    {
        return _moodEntries
            .Where(e => e.Timestamp >= from && e.Timestamp <= to)
            .OrderByDescending(e => e.Timestamp)
            .ToList();
    }
}