import React from 'react';
import { motion } from 'framer-motion';
import { Info, CheckCircle2 } from 'lucide-react';

const Notes = ({ notes }) => {
  if (!notes || !Array.isArray(notes)) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="content-area"
      style={{ paddingTop: '24px', paddingBottom: '100px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <Info size={28} color="var(--accent-color)" />
        <h2 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0 }}>Linee Guida</h2>
      </div>

      <div className="glass-panel" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {notes.map((rule, idx) => (
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

export default Notes;
