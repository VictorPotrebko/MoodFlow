using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoodsController : ControllerBase
    {
        private readonly IMoodService _moodService;

        public MoodsController(IMoodService moodService)
        {
            _moodService = moodService;
        }

        // GET /api/moods?from=2025-01-01&to=2025-01-31
        [HttpGet]
        public ActionResult<IEnumerable<MoodEntryDto>> GetMoods([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var result = _moodService.GetMoodEntries(from, to);
            return Ok(result);
        }

        // GET /api/moods/statistics?from=2025-01-01&to=2025-01-31
        [HttpGet("statistics")]
        public ActionResult<MoodStatisticsDto> GetStatistics([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var stats = _moodService.GetMoodStatistics(from, to);
            return Ok(stats);
        }

        // POST /api/moods
        [HttpPost]
        public ActionResult<MoodEntryDto> AddMood([FromBody] MoodEntryDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Name is required.");
            if (dto.Note != null && dto.Note.Length > 280)
                return BadRequest("Note must be 280 characters or less.");
            _moodService.AddMoodEntry(dto);
            return Ok(dto);
        }
    }
}
