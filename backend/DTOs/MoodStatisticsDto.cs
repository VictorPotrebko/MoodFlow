using System;
using System.Collections.Generic;
using backend.Enums;

namespace backend.DTOs
{
    public class MoodStatisticsDto
    {
        public int TotalEntries { get; set; }
        public Dictionary<MoodType, int> MoodCounts { get; set; } // Frequency of each mood
        public MoodType? MostCommonMood { get; set; } // Most frequent mood in the range
        public Dictionary<DayOfWeek, MoodType?> MostCommonMoodByDay { get; set; } // Most common mood for each day of week
        public string Trend { get; set; } // e.g., "Improving", "Declining", "Stable"
    }
}
