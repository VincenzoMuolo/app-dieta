import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ShoppingBag, FileText } from 'lucide-react';
import DailyPlan from './components/DailyPlan';
import ShoppingList from './components/ShoppingList';
import Notes from './components/Notes';
import dietData from './data/diet.json';
import './App.css';

function App() {
  const [dietPlan, setDietPlan] = useState(dietData);
  const [activeTab, setActiveTab] = useState('diet'); // diet, shopping, notes
  const [selectedDay, setSelectedDay] = useState('Lunedì');

  useEffect(() => {
    // Set today as default selected day (if Sunday, default to Lunedì)
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const today = new Date().getDay();
    setSelectedDay(today === 0 ? 'Lunedì' : days[today]);
  }, []);

  return (
    <div className="app-container">
      <div className="granitic-overlay"></div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'diet' && (
          <motion.div key="diet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DailyPlan 
              dietPlan={dietPlan} 
              selectedDay={selectedDay} 
              setSelectedDay={setSelectedDay} 
            />
          </motion.div>
        )}
        
        {activeTab === 'shopping' && (
          <motion.div key="shopping" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ShoppingList dietPlan={dietPlan} />
          </motion.div>
        )}

        {activeTab === 'notes' && (
          <motion.div key="notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Notes notes={dietPlan.notes} />
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
          className={`nav-item ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          <FileText size={24} />
          <span>Note</span>
        </button>
      </div>
    </div>
  );
}

export default App;
