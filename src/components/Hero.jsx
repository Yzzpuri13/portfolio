import { motion } from 'framer-motion';
import AsciiArt from './AsciiArt';
import GoodFellaButton from './GoodFellaButton';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh', background: '#0A0A0A',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '120px 0 60px'
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 48, flexWrap: 'wrap'
      }}>
        {/* Left content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ flex: '1 1 500px', maxWidth: 680 }}
        >
          <motion.div variants={fadeUp} className="section-label">
            // SENIOR AUTOMATION ENGINEER
          </motion.div>

          <motion.div variants={fadeUp} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', border: '1px solid #333',
            borderRadius: 'var(--radius-full)', marginBottom: 24, fontSize: 13,
            color: 'rgba(255,255,255,0.7)'
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#22C55E',
              boxShadow: '0 0 8px rgba(34,197,94,0.5)'
            }} />
            Green Card Holder &bull; Open to opportunities
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700,
            fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 0.95,
            color: '#F5F5F5', letterSpacing: -2, marginBottom: 24
          }}>
            YESHU<br/>PURI
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)', color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.5, marginBottom: 16, maxWidth: 520
          }}>
            I build enterprise automation systems that save Fortune 500 companies thousands of hours annually.
          </motion.p>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: '#666', letterSpacing: 1, marginBottom: 32
          }}>
            Senior Automation Engineer at Delta Air Lines | UiPath RPA | SAP GRC | AWS Certified
          </motion.p>

          <motion.div variants={fadeUp} style={{
            display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap'
          }}>
            <GoodFellaButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              SEE MY WORK
            </GoodFellaButton>
            <a href="#" className="text-link" style={{ color: 'rgba(255,255,255,0.5)' }}>
              View my resume <span className="text-link-arrow">→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: ASCII Art */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ flex: '0 1 auto', display: 'flex', justifyContent: 'center' }}
          className="ascii-container"
        >
          <AsciiArt />
        </motion.div>
      </div>

      {/* Bottom: Worked with + Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="container"
        style={{ marginTop: 'auto', paddingTop: 48 }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          paddingBottom: 24, borderBottom: '1px solid #222'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: 2, textTransform: 'uppercase', color: '#555'
          }}>
            WORKED WITH
          </span>
          {['Delta Air Lines', 'USA Management', 'Wiley Edge', 'Braid'].map(name => (
            <span key={name} style={{
              padding: '6px 14px', border: '1px solid #333',
              borderRadius: 'var(--radius-full)', fontSize: 13,
              color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)'
            }}>
              {name}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 8, marginTop: 24, color: '#555', fontSize: 12,
            fontFamily: 'var(--font-mono)', letterSpacing: 2
          }}
        >
          <span>SCROLL</span>
          <span style={{ fontSize: 18 }}>↓</span>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .ascii-container { display: none !important; }
        }
      `}</style>
    </section>
  );
}
