using System;
using System.Collections.Generic;
using Xunit;
using Moq;
using backend.Controllers;
using backend.Services;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Tests
{
    public class MoodsControllerTests
    {
        private MoodsController GetControllerWithMockService()
        {
            var mockService = new Mock<IMoodService>();
            mockService.Setup(s => s.GetMoodEntries(null, null)).Returns(new List<MoodEntryDto>
            {
                new MoodEntryDto { Id = Guid.NewGuid(), Name = "Test", MoodType = backend.Enums.MoodType.Happy, Note = "Yay!", Timestamp = DateTime.UtcNow }
            });
            mockService.Setup(s => s.GetMoodStatistics(null, null)).Returns(new MoodStatisticsDto
            {
                TotalEntries = 1,
                MoodCounts = new Dictionary<backend.Enums.MoodType, int> { { backend.Enums.MoodType.Happy, 1 } },
                MostCommonMood = backend.Enums.MoodType.Happy,
                MostCommonMoodByDay = new Dictionary<DayOfWeek, backend.Enums.MoodType?>(),
                Trend = "Stable"
            });
            return new MoodsController(mockService.Object);
        }

        [Fact]
        public void GetMoods_ReturnsOkResultWithData()
        {
            // Arrange
            var controller = GetControllerWithMockService();

            // Act
            var result = controller.GetMoods(null, null);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var data = Assert.IsAssignableFrom<IEnumerable<MoodEntryDto>>(okResult.Value);
            Assert.Single(data);
        }

        [Fact]
        public void AddMood_ReturnsBadRequest_WhenNameMissing()
        {
            // Arrange
            var controller = GetControllerWithMockService();
            var dto = new MoodEntryDto { Name = "", MoodType = backend.Enums.MoodType.Calm };

            // Act
            var result = controller.AddMood(dto);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public void AddMood_ReturnsBadRequest_WhenNoteTooLong()
        {
            // Arrange
            var controller = GetControllerWithMockService();
            var dto = new MoodEntryDto { Name = "Test", MoodType = backend.Enums.MoodType.Calm, Note = new string('a', 281) };

            // Act
            var result = controller.AddMood(dto);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public void GetStatistics_ReturnsOkResultWithStats()
        {
            // Arrange
            var controller = GetControllerWithMockService();

            // Act
            var result = controller.GetStatistics(null, null);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var stats = Assert.IsType<MoodStatisticsDto>(okResult.Value);
            Assert.Equal(1, stats.TotalEntries);
            Assert.Equal("Stable", stats.Trend);
        }
    }
}
