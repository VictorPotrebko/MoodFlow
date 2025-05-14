using System;
using System.Collections.Generic;
using backend.Models;
using backend.DTOs;

namespace backend.Services
{
    public interface IMoodService
    {
        void AddMoodEntry(MoodEntryDto dto);
        List<MoodEntryDto> GetMoodEntries(DateTime? from, DateTime? to);
        MoodStatisticsDto GetMoodStatistics(DateTime? from, DateTime? to);
    }
}
