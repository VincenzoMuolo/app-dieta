import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateDailyNutrition } from '../services/nutritionData';
import { ChevronRight, Droplets, Flame, Beef, Wheat } from 'lucide-react';

const DailyPlan = ({ dietPlan, selectedDay, setSelectedDay }) => {
  const days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const dayPlan = dietPlan.days[selectedDay];

  const stats = calculateDailyNutrition(dayPlan);

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <>
      <div className="app-header">
        <h1 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Il Tuo Piano</h1>
        <div className="day-selector">
          {days.map(day => (
            <button
              key={day}
              className={`day-item glass-button ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="content-area"
        >
          {dayPlan && Object.keys(dayPlan).length > 0 ? (
            <>
              {/* Daily Stats */}
              <div className="glass-panel daily-stats">
                <div className="stat-item">
                  <Flame size={20} color="#ef4444" />
                  <span className="stat-value">{stats.kcal}</span>
                  <span className="stat-label">Kcal</span>
                </div>
                <div className="stat-item">
                  <Beef size={20} color="#3b82f6" />
                  <span className="stat-value">{stats.p}g</span>
                  <span className="stat-label">Pro</span>
                </div>
                <div className="stat-item">
                  <Wheat size={20} color="#eab308" />
                  <span className="stat-value">{stats.c}g</span>
                  <span className="stat-label">Carb</span>
                </div>
                <div className="stat-item">
                  <Droplets size={20} color="#10b981" />
                  <span className="stat-value">{stats.f}g</span>
                  <span className="stat-label">Fat</span>
                </div>
              </div>

              {/* Meals */}
              {Object.entries(dayPlan).map(([mealName, items]) => (
                <div key={mealName} className="glass-panel meal-card">
                  <div className="meal-header">
                    <h3>{mealName}</h3>
                  </div>

                  {items.map((item, idx) => (
                    <div key={idx} className="food-item">
                      <div className="food-name">{item.name}</div>
                      <div className="food-amount">
                        <span className="food-amount-main">{item.grams > 0 ? `${item.grams}g` : item.quantityStr}</span>
                        <div className="muted">{item.quantityStr} {item.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
              <p className="muted">Nessun piano trovato per questo giorno.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default DailyPlan;
