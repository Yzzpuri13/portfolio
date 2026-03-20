import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillGroups, exploring } from '../data/skills';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-light" style={{ background: '#F3F4F6' }}>
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="section-label">// WHAT I WORK WITH</motion.div>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="section-heading" style={{ color: '#1a1a1a' }}>Skills</motion.h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24, marginTop: 48
        }}>
          {skillGroups.map((group, gi) => (
            <motion.div key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              style={{
                background: '#fff', border: '1px solid #E5E5E5',
                borderRadius: 'var(--radius-md)', padding: 28,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                  background: '#EEF2FF', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18
                }}>{group.icon}</span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 18,
                  fontWeight: 700, color: '#1a1a1a'
                }}>{group.title}</h3>
              </div>
              <p style={{ fontSize: 13, color: '#999', marginBottom: 20 }}>{group.description}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {group.skills.map(s => (
                  <span key={s} className="skill-pill">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Currently Exploring */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: '#FFFBEB', border: '1px solid #FDE68A',
              borderRadius: 'var(--radius-md)', padding: 28,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{
                width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                background: '#FEF3C7', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 18
              }}>🚀</span>
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontSize: 18,
                fontWeight: 700, color: '#1a1a1a'
              }}>Currently Exploring</h3>
            </div>
            <p style={{ fontSize: 13, color: '#92400E', marginBottom: 20 }}>Learning and building with these</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {exploring.map(s => (
                <span key={s} className="skill-pill-exploring" style={{
                  display: 'inline-block', padding: '8px 16px', fontSize: 14,
                  borderRadius: 'var(--radius-full)', background: 'transparent',
                  color: '#E50914', border: '1.5px dashed #E50914'
                }}>{s}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
