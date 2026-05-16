import React from 'react';
import { motion } from 'framer-motion';
import { Info, CheckCircle2, Settings as SettingsIcon, Clock, EyeOff } from 'lucide-react';

const Settings = ({ notes, settings, setSettings }) => {
  const handleTimeChange = (meal, newTime) => {
    setSettings(prev => ({
      ...prev,
      mealTimes: {
        ...prev.mealTimes,
        [meal]: newTime
      }
    }));
  };

  const toggleHidePortions = () => {
    setSettings(prev => ({
      ...prev,
      hidePortions: !prev.hidePortions
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="content-area"
      style={{ paddingTop: '24px', paddingBottom: '100px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <SettingsIcon size={28} color="var(--accent-color)" />
        <h2 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0 }}>Impostazioni</h2>
      </div>

      <div className="glass-panel" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-color)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} /> Orari dei Pasti
        </h3>
        
        {Object.entries(settings.mealTimes).map(([meal, time]) => (
          <div key={meal} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>{meal}</span>
            <input 
              type="time" 
              value={time}
              onChange={(e) => handleTimeChange(meal, e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>
        ))}

        <div style={{ height: '1px', background: 'var(--glass-border)', margin: '8px 0' }}></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={toggleHidePortions}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EyeOff size={18} color="var(--accent-color)" />
            <span style={{ fontWeight: 600 }}>Nascondi quantità testuali</span>
          </div>
          <div style={{
            width: '40px',
            height: '24px',
            background: settings.hidePortions ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            position: 'relative',
            transition: 'all 0.3s'
          }}>
            <div style={{
              position: 'absolute',
              top: '2px',
              left: settings.hidePortions ? '18px' : '2px',
              width: '20px',
              height: '20px',
              background: 'white',
              borderRadius: '50%',
              transition: 'all 0.3s'
            }}></div>
          </div>
        </div>
        <p className="muted" style={{ fontSize: '0.75rem', marginTop: '-12px' }}>
          Nasconde voci come "1 fetta", "1 porzione", ecc. mostrando solo i grammi.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <Info size={28} color="var(--accent-color)" />
        <h2 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0 }}>Linee Guida</h2>
      </div>

      <div className="glass-panel" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {notes && Array.isArray(notes) && notes.map((rule, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ marginTop: '2px' }}>
              <CheckCircle2 size={20} color="var(--accent-color)" />
            </div>
            <p style={{ lineHeight: '1.6', fontSize: '0.95rem', margin: 0, color: 'var(--text-color)' }}>
              {rule}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Settings;
