---
trigger: always_on
---

1. Product Description
MoodFlow is a minimalist mood tracking application that helps users record, visualize, and analyze their emotional patterns over time.


User Story 1: Recording Daily Mood
As a user, I want to quickly record my current mood so that I can track my emotional state over time.
Acceptance Criteria:

User can select from at least 5 distinct mood options (e.g., Happy, Calm, Neutral, Sad, Angry)
User can submit their mood with a single click after selection
User receives confirmation when mood is successfully recorded
System stores the mood entry with timestamp, name,  mood and note (≤280 characters) 
User can add an optional brief note with their mood entry (≤280 characters)

User Story 2: Viewing Mood History
As a user, I want to view my historical mood data so that I can identify patterns and trends in my emotional wellbeing.
Acceptance Criteria:

User can view their complete mood history in chronological order
System displays moods using both text labels and visual indicators (icons/colors)
User can filter mood history by date range (last week, month, 3 months, year)
System displays a summary of mood distribution for the selected time period
History view includes any notes attached to mood entries

User Story 3: Mood Insights
As a user, I want to receive insights about my mood patterns so that I can better understand factors affecting my emotional wellbeing.
Acceptance Criteria:

System generates basic statistics about mood frequency (e.g., "You felt happy 60% of the time this month")
User can view their most common mood for different days of the week
System identifies potential mood trends (improving, declining, or stable) over selected time periods
Insights update automatically when new mood data is added
