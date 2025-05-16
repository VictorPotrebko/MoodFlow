# MoodFlow

MoodFlow is a minimalist mood tracking application that helps users record, visualize, and analyze their emotional patterns over time.

MoodFlow allows users to:
- Record their daily mood with optional notes
- View their historical mood data in chronological order
- Get insights about their mood patterns

### Frontend Implementation (React + Vite + Tailwind)

### Backend Implementation (.NET 8)

The backend uses an in-memory data store instead of a database for simplicity:

- **Note**: At least 5 mood entries are required for the trend analysis to work properly## Application Features

## Application Features

### Record Mood
Users can:
- Enter their name
- Select from 5 distinct mood options (Happy, Calm, Neutral, Sad, Angry)
- Add an optional note (limited to 280 characters)
- Submit their mood with a single click

### View History
- Displays mood entries chronologically
- Shows mood with both text and emoji indicators
- Allows filtering by date range
- Displays any notes attached to mood entries

### Mood Insights
- Shows total number of mood entries
- Identifies most common mood
- Displays trend analysis (Improving, Declining, or Stable)
- Counts of each mood type
- Weekly mood pattern display
- Mood trend over time visualization
- **Note**: At least 5 mood entries are required for the trend analysis to work properly# MoodFlow


## Installation and Setup

#### Backend

1. Open the solution file in Visual Studio or your preferred IDE:
   ```
   mood-flow.sln
   ```

2. Restore NuGet packages:
   ```
   dotnet restore
   ```

3. Build the solution:
   ```
   dotnet build
   ```

4. Run the backend:
   ```
   dotnet run --project backend
   ```


#### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm i
   ```

3. Start the development server:
   ```
   npm run dev
   ```


## AI Hackathon: MoodFlow Project using WindSurf

During the hackathon, we worked with WindSurf and Claude AI to build MoodFlow. Our process:

1. We started by generating business acceptance criteria with Claude AI
2. We used Claude to create a detailed implementation plan based on those criteria, specifying our .NET backend and React/Vite frontend technologies
3. We followed WindSurf's process, feeding both the plan and acceptance criteria into the rules
4. The AI was able to follow the plan very well with only minor bugs in the backend and frontend
5. AI maintained context throughout the development process and successfully delivered a complete working application with functioning backend and frontend components


## Project Files

- `acceptance-criteria.md`: Detailed acceptance criteria for the application
- `api-rule.md`: Rules for the API implementation
- `moodflow.postman_collection.json`: Postman collection for testing API endpoints
- `Plan.md`: Detailed implementation plan
- `ui-rule.md`: Rules for the UI implementation (set to "Always On")

