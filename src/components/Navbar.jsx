import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoodFellaButton from './GoodFellaButton';

const NAV_ITEMS = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const isDark = !scrolled;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '16px 0',
        background: isDark ? 'transparent' : 'rgba(255,255,255,0.92)',
        backdropFilter: isDark ? 'none' : 'blur(16px)',
        borderBottom: isDark ? 'none' : '1px solid #E5E5E5',
        transition: 'all 0.4s ease',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700,
            fontSize: 18, color: isDark ? '#F5F5F5' : '#1A1A1A',
            transition: 'color 0.3s ease'
          }}>
            Yeshu Puri
          </a>

          {/* Desktop nav */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 32
          }} className="desktop-nav">
            {NAV_ITEMS.map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{
                fontFamily: 'var(--font-body)', fontSize: 15,
                color: isDark ? 'rgba(255,255,255,0.7)' : '#666',
                transition: 'color 0.3s ease', background: 'none', border: 'none', cursor: 'pointer'
              }}
                onMouseEnter={e => e.target.style.color = isDark ? '#fff' : '#1a1a1a'}
                onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.7)' : '#666'}
              >
                {item}
              </button>
            ))}
            <GoodFellaButton onClick={() => scrollTo('contact')}>
              GET IN TOUCH
            </GoodFellaButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', flexDirection: 'column', gap: 5,
              background: 'none', border: 'none', cursor: 'pointer', padding: 8
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: 24, height: 2,
                background: isDark ? '#fff' : '#1a1a1a',
                transition: 'all 0.3s ease',
                transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px,5px)' : i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)') : 'none'
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(10,10,10,0.97)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 32
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(item.toLowerCase())}
                style={{
                  fontFamily: 'var(--font-heading)', fontSize: 32,
                  fontWeight: 700, color: '#F5F5F5',
                  background: 'none', border: 'none', cursor: 'pointer'
                }}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
