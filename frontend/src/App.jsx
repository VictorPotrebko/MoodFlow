import React, { useState } from 'react';
import MoodTracker from './components/MoodTracker';
import MoodHistory from './components/MoodHistory';
import MoodInsights from './components/MoodInsights';
import './App.css';

const tabs = [
  { key: 'tracker', label: 'Record Mood' },
  { key: 'history', label: 'View History' },
  { key: 'insights', label: 'View Insights' },
];

function App() {
  const [activeTab, setActiveTab] = useState('tracker');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="py-6 text-center text-2xl font-bold tracking-tight">
        MoodFlow
      </header>
      <nav className="flex justify-center gap-4 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all
              ${activeTab === tab.key ? 'bg-blue-500 text-white shadow' : 'bg-white text-blue-500 border border-blue-200 hover:bg-blue-50'}`}
            onClick={() => setActiveTab(tab.key)}
            aria-current={activeTab === tab.key ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <main className="flex-1 flex flex-col items-center justify-start p-4">
        {activeTab === 'tracker' && <MoodTracker />}
        {activeTab === 'history' && <MoodHistory />}
        {activeTab === 'insights' && <MoodInsights />}
      </main>
    </div>
  );
}

export default App;
