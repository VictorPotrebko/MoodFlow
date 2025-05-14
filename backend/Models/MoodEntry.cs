using System;
using backend.Enums;

namespace backend.Models
{
    public class MoodEntry
    {
        public Guid Id { get; set; } // Unique identifier for each entry
        public string Name { get; set; } // User's name
        public MoodType MoodType { get; set; } // Mood type (enum, to be defined)
        public string Note { get; set; } // Optional note (max 280 chars)
        public DateTime Timestamp { get; set; } // Time of entry
    }

    // MoodType enum will be defined in a separate file as per plan
    // public enum MoodType { Happy, Calm, Neutral, Sad, Angry }
}
