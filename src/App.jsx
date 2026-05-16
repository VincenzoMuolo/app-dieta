import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ShoppingBag, Settings as SettingsIcon } from 'lucide-react';
import DailyPlan from './components/DailyPlan';
import ShoppingList from './components/ShoppingList';
import Settings from './components/Settings';
import dietData from './data/diet.json';
import './App.css';

function App() {
  const [dietPlan, setDietPlan] = useState(() => {
    const saved = localStorage.getItem('custom_diet_plan');
    return saved ? JSON.parse(saved) : dietData;
  });
  const [customSubstitutions, setCustomSubstitutions] = useState(() => {
    const saved = localStorage.getItem('custom_substitutions');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeTab, setActiveTab] = useState('diet'); // diet, shopping, settings
  const [selectedDay, setSelectedDay] = useState('Lunedì');

  const defaultSettings = {
    mealTimes: {
      'Colazione': '09:00',
      'Spuntino Mattina': '10:30',
      'Pranzo': '13:00',
      'Spuntino Pomeriggio': '16:30',
      'Cena': '19:30'
    },
    hidePortions: false
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('diet_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('diet_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('custom_diet_plan', JSON.stringify(dietPlan));
  }, [dietPlan]);

  useEffect(() => {
    localStorage.setItem('custom_substitutions', JSON.stringify(customSubstitutions));
  }, [customSubstitutions]);

  useEffect(() => {
    // Set today as default selected day (if Sunday, default to Lunedì)
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const today = new Date();
    const dayIndex = today.getDay();
    setSelectedDay(dayIndex === 0 ? 'Lunedì' : days[dayIndex]);

    // Randomize accent color based on the current date
    const accentColors = [
      { color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)' }, // Blue
      { color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.4)' }, // Purple
      { color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' }, // Emerald
      { color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' }, // Amber
      { color: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)' },  // Red
      { color: '#ec4899', glow: 'rgba(236, 72, 153, 0.4)' }, // Pink
      { color: '#14b8a6', glow: 'rgba(20, 184, 166, 0.4)' }, // Teal
      { color: '#f97316', glow: 'rgba(249, 115, 22, 0.4)' }  // Orange
    ];

    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const colorIndex = (dateSeed * 13) % accentColors.length;
    const selectedAccent = accentColors[colorIndex];

    document.documentElement.style.setProperty('--accent-color', selectedAccent.color);
    document.documentElement.style.setProperty('--accent-glow', selectedAccent.glow);
  }, []);

  return (
    <div className="app-container">
      <div className="granitic-overlay"></div>

      <AnimatePresence mode="wait">
        {activeTab === 'diet' && (
          <motion.div key="diet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DailyPlan
              dietPlan={dietPlan}
              setDietPlan={setDietPlan}
              customSubstitutions={customSubstitutions}
              setCustomSubstitutions={setCustomSubstitutions}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              settings={settings}
            />
          </motion.div>
        )}

        {activeTab === 'shopping' && (
          <motion.div key="shopping" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ShoppingList dietPlan={dietPlan} />
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Settings notes={dietPlan.notes} settings={settings} setSettings={setSettings} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-panel bottom-nav">
        <button
          className={`nav-item ${activeTab === 'diet' ? 'active' : ''}`}
          onClick={() => setActiveTab('diet')}
        >
          <Calendar size={24} />
          <span>Piano</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'shopping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shopping')}
        >
          <ShoppingBag size={24} />
          <span>Spesa</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <SettingsIcon size={24} />
          <span>Impostazioni</span>
        </button>
      </div>
    </div>
  );
}

export default App;
