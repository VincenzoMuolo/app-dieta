import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateDailyNutrition } from '../services/nutritionData';
import { getSubstitutionsFor } from '../services/substitutions';
import { ChevronRight, Droplets, Flame, Beef, Wheat, Clock, ArrowRightLeft, ChevronDown, Edit2, Check, X, PlusCircle } from 'lucide-react';

const DailyPlan = ({ dietPlan, setDietPlan, customSubstitutions, setCustomSubstitutions, selectedDay, setSelectedDay, settings }) => {
  const days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const dayPlan = dietPlan.days[selectedDay];

  const stats = calculateDailyNutrition(dayPlan);

  const processedDayPlan = React.useMemo(() => {
    if (!dayPlan) return null;
    const newPlan = { ...dayPlan };

    // 1. Sposta tutto tranne il caffè dalla Colazione allo Spuntino Mattina
    if (newPlan['Colazione']) {
      const colazioneItems = newPlan['Colazione'];
      const caffe = colazioneItems.filter(item => item.name.toLowerCase().includes('caffè'));
      const extraColazione = colazioneItems.filter(item => !item.name.toLowerCase().includes('caffè'));

      if (extraColazione.length > 0) {
        newPlan['Colazione'] = caffe;
        const currentSnack = newPlan['Spuntino Mattina'] || [];
        newPlan['Spuntino Mattina'] = [...currentSnack, ...extraColazione];
      }
    }

    // 2. Assicuriamoci che l'ordine dei pasti sia coerente
    const orderedPlan = {};
    const mealOrder = ['Colazione', 'Spuntino Mattina', 'Pranzo', 'Spuntino Pomeriggio', 'Cena'];

    mealOrder.forEach(meal => {
      if (newPlan[meal] && newPlan[meal].length > 0) {
        orderedPlan[meal] = newPlan[meal];
      }
    });

    // 3. Ordina Pane e Olio sempre in fondo
    Object.keys(orderedPlan).forEach(meal => {
      orderedPlan[meal] = [...orderedPlan[meal]].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        const isBottomA = nameA.includes('pane') || nameA.includes('olio');
        const isBottomB = nameB.includes('pane') || nameB.includes('olio');

        if (isBottomA && !isBottomB) return 1;
        if (!isBottomA && isBottomB) return -1;
        return 0;
      });
    });

    return orderedPlan;
  }, [dayPlan, selectedDay]);

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const [currentMeal, setCurrentMeal] = useState('');
  const [expandedSubstitutions, setExpandedSubstitutions] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', grams: '' });
  const mealRefs = useRef({});

  const startEditing = (mealName, idx, item, groupName) => {
    setEditingItem(`${selectedDay}-${mealName}-${groupName}-${idx}`);
    setEditForm({ name: '', grams: '' });
  };

  const saveEditing = (mealName, idx, itemName, groupName) => {
    if (!editForm.name.trim()) return;

    setCustomSubstitutions(prev => {
      const existing = prev[itemName] || [];
      return {
        ...prev,
        [itemName]: [...existing, { name: editForm.name, grams: parseInt(editForm.grams, 10) || 0 }]
      };
    });

    setEditingItem(null);
    const key = `${selectedDay}-${mealName}-${groupName}-${idx}`;
    setExpandedSubstitutions(prev => ({ ...prev, [key]: true }));
  };

  const toggleSubstitution = (mealName, idx, groupName) => {
    const key = `${selectedDay}-${mealName}-${groupName}-${idx}`;
    setExpandedSubstitutions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const checkCurrentMeal = () => {
      const now = new Date();
      const currentHours = now.getHours() + now.getMinutes() / 60;

      const parseTime = (timeStr) => {
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(':').map(Number);
        return h + m / 60;
      };

      const mealList = Object.entries(settings.mealTimes)
        .map(([name, timeStr]) => ({ name, time: parseTime(timeStr) }))
        .sort((a, b) => a.time - b.time);

      let current = mealList[0]?.name || '';
      for (let i = 0; i < mealList.length; i++) {
        if (currentHours >= mealList[i].time) {
          current = mealList[i].name;
        } else {
          break;
        }
      }

      setCurrentMeal(current);
    };
    checkCurrentMeal();
    const interval = setInterval(checkCurrentMeal, 60000);
    return () => clearInterval(interval);
  }, [settings.mealTimes]);

  useEffect(() => {
    const todayDays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const today = todayDays[new Date().getDay()];
    if (selectedDay === today && currentMeal && mealRefs.current[currentMeal]) {
      setTimeout(() => {
        if (mealRefs.current[currentMeal]) {
          mealRefs.current[currentMeal].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }
  }, [selectedDay, currentMeal]);

  return (
    <>
      <div className="app-header">
        <h1 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Il Tuo Piano</h1>
        <div className="day-selector-container">
          {days.map(day => (
            <button
              key={day}
              className={`day-bubble ${selectedDay === day ? 'active' : ''}`}
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
              {Object.entries(processedDayPlan).map(([mealName, items]) => {
                const isCurrent = currentMeal === mealName && selectedDay === ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'][new Date().getDay()];

                const mainItems = items.filter(i => !i.name.toLowerCase().includes('pane') && !i.name.toLowerCase().includes('olio'));
                const paneItems = items.filter(i => i.name.toLowerCase().includes('pane'));
                const olioItems = items.filter(i => i.name.toLowerCase().includes('olio'));

                const renderFoodItem = (item, idx, groupName, hideName = false) => {
                  let subs = getSubstitutionsFor(item.name, item.grams) || [];
                  if (customSubstitutions && customSubstitutions[item.name]) {
                    subs = [...subs, ...customSubstitutions[item.name]];
                  }

                  const itemKey = `${selectedDay}-${mealName}-${groupName}-${idx}`;
                  const isExpanded = expandedSubstitutions[itemKey];
                  const isEditing = editingItem === itemKey;

                  // Identify proteins to allow inline editing
                  const proteinKeywords = ['pollo', 'tacchino', 'vitello', 'manzo', 'maiale', 'merluzzo', 'salmone', 'tonno', 'pesce', 'orata', 'spigola', 'branzino', 'uova', 'bresaola', 'fesa', 'polpo', 'calamari', 'seppie'];
                  const isProtein = proteinKeywords.some(k => item.name.toLowerCase().includes(k));

                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: hideName ? '0' : '8px 0' }}>
                      {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px', border: '1px solid var(--accent-color)' }}>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                            placeholder="Nome nuova alternativa"
                            style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', padding: '8px', borderRadius: '8px', width: '100%' }}
                          />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="number"
                              value={editForm.grams}
                              onChange={e => setEditForm({ ...editForm, grams: e.target.value })}
                              placeholder="Grammi"
                              style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', padding: '8px', borderRadius: '8px', flex: 1 }}
                            />
                            <button onClick={() => setEditingItem(null)} style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                              <X size={18} />
                            </button>
                            <button onClick={() => saveEditing(mealName, idx, item.name, groupName)} style={{ padding: '8px', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                              <Check size={18} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="food-item" style={{ padding: 0, justifyContent: hideName ? 'flex-end' : 'space-between' }}>
                          {!hideName && <div className="food-name">{item.name}</div>}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {subs && subs.length > 0 && (
                              <button
                                className="substitution-toggle"
                                onClick={() => toggleSubstitution(mealName, idx, groupName)}
                                title="Vedi alternative"
                                style={{ padding: '4px' }}
                              >
                                <ArrowRightLeft size={16} />
                                <ChevronDown size={14} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                              </button>
                            )}
                            <div className="food-amount">
                              <span className="food-amount-main">{item.grams > 0 ? `${item.grams}g` : (!settings.hidePortions ? item.quantityStr : '')}</span>
                              {!settings.hidePortions && (
                                <div className="muted">{item.quantityStr} {item.unit}</div>
                              )}
                            </div>
                            {isProtein && (
                              <button onClick={() => startEditing(mealName, idx, item, groupName)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }} title="Aggiungi alternativa">
                                <PlusCircle size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {subs && subs.length > 0 && (
                        <div className="substitution-container" style={{ background: 'transparent', padding: 0 }}>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div className="substitution-list">
                                  <div className="substitution-title">Puoi sostituire con:</div>
                                  {subs.map((sub, sIdx) => (
                                    <div key={sIdx} className="substitution-item">
                                      <span className="sub-name">{sub.name}</span>
                                      <span className="sub-amount">{sub.grams > 0 ? `${sub.grams}g` : sub.customLabel}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  );
                };

                return (
                  <div
                    key={mealName}
                    ref={el => mealRefs.current[mealName] = el}
                    className={`glass-panel meal-card ${isCurrent ? 'current-meal-highlight' : ''}`}
                  >
                    <div className="meal-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3>{mealName}</h3>
                        {settings.mealTimes[mealName] && (
                          <span className="meal-time">
                            <Clock size={14} /> {settings.mealTimes[mealName]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="meal-main-items">
                      {mainItems.map((item) => renderFoodItem(item, items.indexOf(item), 'main'))}
                    </div>

                    {paneItems.length > 0 && paneItems.map((item) => (
                      <div key={items.indexOf(item)} className="meal-subsection pane-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                        <div className="subsection-header" style={{ marginBottom: 0 }}>{item.name}</div>
                        {renderFoodItem(item, items.indexOf(item), 'pane', true)}
                      </div>
                    ))}

                    {olioItems.length > 0 && olioItems.map((item) => (
                      <div key={items.indexOf(item)} className="meal-subsection olio-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                        <div className="subsection-header" style={{ marginBottom: 0 }}>{item.name}</div>
                        {renderFoodItem(item, items.indexOf(item), 'olio', true)}
                      </div>
                    ))}
                  </div>
                );
              })}
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
