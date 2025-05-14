---
trigger: always_on
---

MoodFlow Implementation Plan (with In-Memory Storage)
Based on your project structure showing a .NET 8 backend and React/Vite/Tailwind frontend, here's a detailed implementation plan with in-memory storage instead of a database:
BACKEND IMPLEMENTATION (.NET 8 Web API)
1. Create Data Models

 Create a Models folder in backend project
 Create MoodEntry.cs class with properties:

Id (int/Guid)
Name (string)
MoodType (enum)
Note (string, max 280 chars)
Timestamp (DateTime)



2. Create MoodType Enum

 Create Enums folder in backend project
 Create MoodType.cs enum with options:

Happy
Calm
Neutral
Sad
Angry



3. Setup In-Memory Data Store

 Create Data folder
 Create MoodDataStore.cs singleton class to store data in-memory
 Implement methods:

Add()
GetAll()
GetByDateRange()


 Initialize with sample data (optional)

4. Create DTOs

 Create DTOs folder
 Create MoodEntryDto.cs for API requests/responses
 Create MoodStatisticsDto.cs for mood insights

5. Create API Controller

 Create Controllers folder (if not exists)
 Create MoodsController.cs with endpoints:

GET /api/moods (with optional date range filters)
GET /api/moods/statistics (for insights)
POST /api/moods (to add new mood)



6. Implement Services

 Create Services folder
 Create IMoodService.cs interface
 Create MoodService.cs implementation with methods:

AddMoodEntry()
GetMoodEntries() (with filtering)
GetMoodStatistics()


 Inject MoodDataStore into MoodService

7. Add Dependency Injection

 Register MoodDataStore as singleton in Program.cs
 Register MoodService in Program.cs

8. Setup CORS

 Configure CORS in Program.cs to allow frontend access

9. Unit Tests (xUnit)

 Create test for MoodService.AddMoodEntry()
 Create test for MoodService.GetMoodEntries()
 Create test for MoodService.GetMoodStatistics()
 Create test for MoodsController endpoints
 use Mock library 

FRONTEND IMPLEMENTATION (React + Vite + Tailwind)
1. Setup Project Structure

 Create components folder structure:

src/components/MoodTracker
src/components/MoodHistory
src/components/MoodInsights



2. Create Types

 Create src/types folder
 Create MoodEntry interface
 Create MoodType enum matching backend

3. Setup API Service

 Create src/services folder
 Create moodService.ts with methods:

submitMood(name, mood, note)
getMoods(dateFrom, dateTo)
getMoodStatistics(dateFrom, dateTo)



4. Implement UI Components
MoodTracker Component

 Create MoodSelector component with 5 mood options
 Create form with name input and optional note textarea
 Add submit button
 Implement form validation (note ≤ 280 chars)
 Add success confirmation message
 Style with Tailwind CSS

MoodHistory Component

 Create date range filter controls
 Create MoodEntryList component
 Style mood entries with appropriate icons/colors
 Implement chronological sorting
 Display notes with entries
 Style with Tailwind CSS

MoodInsights Component

 Create statistics display for mood frequencies
 Create weekly pattern visualization
 Implement trend analysis display
 Style with Tailwind CSS

5. Create Main Page

 Create layout with tabs/sections for:

Record Mood
View History
View Insights


 Implement navigation between sections
 Add responsive design with Tailwind

6. State Management

 Implement React context or state management
 Create hooks for mood data and operations

7. Testing & Refinement

 Test all components
 Verify all acceptance criteria
 Add loading states
 Add error handling

FINAL STEPS

 Connect frontend to backend API
 Test full application flow
 Verify all acceptance criteria
 Final styling adjustments