import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { experiences } from '../data/experiences';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

function TimelineCard({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState(false);

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp} transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', gap: 32, marginBottom: 32 }}
    >
      {/* Card */}
      <div style={{
        flex: 1, background: '#fff',
        borderRadius: 16, padding: '32px 36px',
        border: '1px solid #E5E5E5',
        borderLeft: '4px solid #E50914',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default'
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(229,9,20,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {/* Period badge */}
        <div style={{
          display: 'inline-block', padding: '4px 14px',
          background: '#FEF2F2', borderRadius: 'var(--radius-full)',
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: 1.5, color: '#E50914', fontWeight: 500,
          marginBottom: 16
        }}>
          {exp.period}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700,
          color: '#0A0A0A', marginBottom: 6, letterSpacing: -0.5
        }}>
          {exp.title}
        </h3>

        <div style={{
          display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 14,
          marginBottom: 16
        }}>
          <span style={{ color: '#E50914', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>{exp.company}</span>
          <span style={{ color: '#999' }}>📍 {exp.location}</span>
        </div>

        <p style={{
          fontSize: 16, color: '#555', lineHeight: 1.7,
          marginBottom: 20, fontFamily: 'var(--font-body)'
        }}>
          {exp.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {exp.tags.map(t => (
            <span key={t} style={{
              padding: '5px 14px', fontSize: 12, fontWeight: 500,
              borderRadius: 'var(--radius-full)',
              background: '#F8F8F8', color: '#444',
              border: '1px solid #EEE',
              fontFamily: 'var(--font-mono)', letterSpacing: 0.5
            }}>{t}</span>
          ))}
        </div>

        {/* Expand toggle */}
        <button onClick={() => setOpen(!open)} style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: '#E50914',
          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'none', border: '1px solid #FECACA', borderRadius: 'var(--radius-full)',
          padding: '6px 16px', letterSpacing: 1, textTransform: 'uppercase',
          transition: 'all 0.3s ease'
        }}
          onMouseEnter={e => { e.target.style.background = '#E50914'; e.target.style.color = '#fff'; e.target.style.borderColor = '#E50914'; }}
          onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = '#E50914'; e.target.style.borderColor = '#FECACA'; }}
        >
          {open ? 'HIDE' : 'SHOW'} HIGHLIGHTS
          <span style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : '', display: 'inline-block' }}>↓</span>
        </button>

        {open && (
          <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            style={{
              marginTop: 16, paddingLeft: 0, listStyle: 'none',
              display: 'flex', flexDirection: 'column', gap: 8
            }}>
            {exp.highlights.map((h, i) => (
              <li key={i} style={{
                fontSize: 14, color: '#555', lineHeight: 1.6,
                paddingLeft: 20, position: 'relative'
              }}>
                <span style={{
                  position: 'absolute', left: 0, top: 8,
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#E50914', opacity: 0.5
                }} />
                {h}
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Timeline dot + line */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        flexShrink: 0, width: 28
      }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 300 }}
          style={{
            width: 16, height: 16, borderRadius: '50%',
            border: '3px solid #E50914',
            background: inView ? '#E50914' : '#fff',
            transition: 'background 0.5s ease',
            flexShrink: 0, boxShadow: inView ? '0 0 12px rgba(229,9,20,0.3)' : 'none'
          }}
        />
        <div style={{
          width: 2, flex: 1,
          background: inView ? 'linear-gradient(to bottom, #E50914, #E5E5E5)' : '#E5E5E5',
          transition: 'background 0.5s ease'
        }} />
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-light" style={{ background: '#F5F5F5' }}>
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="section-label">// WHERE I'VE WORKED</motion.div>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="section-heading" style={{ color: '#0A0A0A' }}>
            Experience
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} style={{
            fontSize: 18, color: '#777', marginTop: 8, maxWidth: 500
          }}>
            Building automation systems across industries and continents.
          </motion.p>
        </motion.div>

        <div style={{ marginTop: 48 }}>
          {experiences.map((exp, i) => <TimelineCard key={exp.id} exp={exp} index={i} />)}
        </div>
      </div>
    </section>
  );
}
