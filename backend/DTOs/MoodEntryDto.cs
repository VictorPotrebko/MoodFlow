using System;
using backend.Enums;

namespace backend.DTOs
{
    public class MoodEntryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public MoodType MoodType { get; set; }
        public string Note { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
