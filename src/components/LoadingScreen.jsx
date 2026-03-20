import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem('yp-loaded');
  });

  useEffect(() => {
    if (!visible) { onComplete?.(); return; }
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
      else setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('yp-loaded', 'true');
        onComplete?.();
      }, 400);
    };
    requestAnimationFrame(tick);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#E50914',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 24,
            overflow: 'hidden'
          }}
        >
          {/* Scrolling LOADING text */}
          <div style={{
            overflow: 'hidden', width: '100%',
            display: 'flex', justifyContent: 'center'
          }}>
            <motion.div
              animate={{ x: [0, -200] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                display: 'flex', gap: 48, whiteSpace: 'nowrap',
                fontFamily: 'var(--font-mono)', fontSize: 14,
                letterSpacing: 6, textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)'
              }}
            >
              {Array(8).fill('LOADING').map((t, i) => <span key={i}>{t}</span>)}
            </motion.div>
          </div>

          {/* Percentage */}
          <motion.div
            style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 10vw, 80px)',
              fontWeight: 700, color: 'white', lineHeight: 1
            }}
          >
            {progress}%
          </motion.div>

          {/* Progress bar */}
          <div style={{
            width: 200, height: 2, background: 'rgba(255,255,255,0.2)',
            borderRadius: 1, overflow: 'hidden'
          }}>
            <motion.div style={{
              height: '100%', background: 'white', borderRadius: 1,
              width: `${progress}%`, transition: 'width 0.1s linear'
            }} />
          </div>

          {/* Name */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: 4, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', marginTop: 8
          }}>
            YESHU PURI — PORTFOLIO
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
