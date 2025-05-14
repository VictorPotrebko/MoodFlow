using System;
using System.Collections.Generic;
using Xunit;
using backend.Services;
using backend.DTOs;
using backend.Enums;
using backend.Models;

namespace Backend.Tests
{
    public class MoodServiceTests
    {
        private MoodService GetServiceWithSampleData()
        {
            var store = new MoodDataStore();
            return new MoodService(store);
        }

        [Fact]
        public void AddMoodEntry_AddsEntrySuccessfully()
        {
            // Arrange
            var service = GetServiceWithSampleData();
            var dto = new MoodEntryDto
            {
                Name = "Alice",
                MoodType = MoodType.Calm,
                Note = "A good day"
            };

            // Act
            service.AddMoodEntry(dto);
            var moods = service.GetMoodEntries(null, null);

            // Assert
            Assert.Contains(moods, m => m.Name == "Alice" && m.MoodType == MoodType.Calm && m.Note == "A good day");
        }

        [Fact]
        public void GetMoodEntries_FiltersByDateRange()
        {
            // Arrange
            var service = GetServiceWithSampleData();
            var from = DateTime.UtcNow.AddDays(-2);
            var to = DateTime.UtcNow;

            // Act
            var moods = service.GetMoodEntries(from, to);

            // Assert
            Assert.All(moods, m => Assert.InRange(m.Timestamp, from, to));
        }

        [Fact]
        public void GetMoodStatistics_ReturnsCorrectCounts()
        {
            // Arrange
            var service = GetServiceWithSampleData();

            // Act
            var stats = service.GetMoodStatistics(null, null);

            // Assert
            Assert.True(stats.TotalEntries > 0);
            Assert.NotNull(stats.MoodCounts);
            Assert.True(stats.MoodCounts.ContainsKey(MoodType.Happy));
        }
    }
}
