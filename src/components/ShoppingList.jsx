import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateShoppingList } from '../services/shoppingList';
import { ShoppingBag, CheckCircle, Circle, Trash2 } from 'lucide-react';

const ShoppingList = ({ dietPlan }) => {
  const [period, setPeriod] = useState('week'); // week, today
  const [statusTab, setStatusTab] = useState('to_buy'); // to_buy, bought
  
  // State for checked items, synced to localStorage
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('checkedShoppingItems');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('checkedShoppingItems', JSON.stringify(checkedItems));
  }, [checkedItems]);
  
  const days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  
  const getSelectedDays = () => {
    if (period === 'week') return days;
    const todayIndex = new Date().getDay(); // 0 = Sunday
    if (todayIndex === 0) return []; // Sunday is free
    return [days[todayIndex - 1]];
  };

  const fullList = generateShoppingList(dietPlan, getSelectedDays());

  const toggleCheck = (itemName) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const clearChecked = () => {
    if (confirm("Vuoi svuotare la lista delle cose prese?")) {
      setCheckedItems({});
    }
  };

  // Filter based on active tab
  const toBuyList = fullList.filter(item => !checkedItems[item.name]);
  const boughtList = fullList.filter(item => checkedItems[item.name]);

  const activeList = statusTab === 'to_buy' ? toBuyList : boughtList;

  // Group active list by category
  const groupedList = activeList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedList).sort();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="content-area"
      style={{ paddingTop: '24px', paddingBottom: '100px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShoppingBag size={28} color="var(--accent-color)" />
          <h2 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0 }}>Spesa</h2>
        </div>
        {statusTab === 'bought' && boughtList.length > 0 && (
          <button onClick={clearChecked} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}>
            <Trash2 size={20} />
          </button>
        )}
      </div>

      {/* Period Toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button 
          className={`glass-button ${period === 'week' ? 'active' : ''}`}
          onClick={() => setPeriod('week')}
          style={{ flex: 1, fontSize: '0.85rem', padding: '8px' }}
        >
          Settimana
        </button>
        <button 
          className={`glass-button ${period === 'today' ? 'active' : ''}`}
          onClick={() => setPeriod('today')}
          style={{ flex: 1, fontSize: '0.85rem', padding: '8px' }}
        >
          Oggi
        </button>
      </div>

      {/* Status Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', marginBottom: '16px' }}>
        <div 
          onClick={() => setStatusTab('to_buy')}
          style={{ 
            flex: 1, textAlign: 'center', padding: '12px', cursor: 'pointer',
            borderBottom: statusTab === 'to_buy' ? '2px solid var(--accent-color)' : '2px solid transparent',
            color: statusTab === 'to_buy' ? 'var(--text-color)' : 'var(--text-muted)',
            fontWeight: statusTab === 'to_buy' ? '600' : '400'
          }}
        >
          Da Comprare ({toBuyList.length})
        </div>
        <div 
          onClick={() => setStatusTab('bought')}
          style={{ 
            flex: 1, textAlign: 'center', padding: '12px', cursor: 'pointer',
            borderBottom: statusTab === 'bought' ? '2px solid var(--accent-color)' : '2px solid transparent',
            color: statusTab === 'bought' ? 'var(--text-color)' : 'var(--text-muted)',
            fontWeight: statusTab === 'bought' ? '600' : '400'
          }}
        >
          Prese ({boughtList.length})
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence mode="popLayout">
          {sortedCategories.length > 0 ? (
            sortedCategories.map(category => (
              <motion.div 
                key={category}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel" 
                style={{ padding: '0', overflow: 'hidden' }}
              >
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  padding: '8px 16px', 
                  borderBottom: '1px solid var(--glass-border)',
                  fontWeight: '600',
                  color: 'var(--accent-color)',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {category}
                </div>
                {groupedList[category].map((item, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={item.name} 
                    className="food-item" 
                    onClick={() => toggleCheck(item.name)}
                    style={{ 
                      padding: '12px 16px', 
                      borderBottom: idx < groupedList[category].length - 1 ? '1px solid var(--glass-border)' : 'none',
                      cursor: 'pointer',
                      opacity: statusTab === 'bought' ? 0.6 : 1
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {statusTab === 'bought' ? (
                        <CheckCircle size={22} color="#10b981" />
                      ) : (
                        <Circle size={22} color="var(--text-muted)" />
                      )}
                      <span className="food-name" style={{ 
                        textTransform: 'capitalize',
                        textDecoration: statusTab === 'bought' ? 'line-through' : 'none'
                      }}>
                        {item.name}
                      </span>
                    </div>
                    <div className="food-amount-main">{item.grams}g</div>
                  </motion.div>
                ))}
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              style={{ padding: '32px', textAlign: 'center' }} 
              className="muted"
            >
              {period === 'today' && getSelectedDays().length === 0 
                ? 'Nessuna spesa per la giornata libera' 
                : 'Nessun elemento in questa lista'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ShoppingList;
