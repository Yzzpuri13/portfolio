import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { marqueeSkills } from '../data/skills';

function Counter({ target, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    const dur = 1500;
    const start = Date.now();
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(num * ease));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '5', suffix: '+', label: 'YEARS EXPERIENCE' },
    { value: '100', suffix: '+', label: 'PRODUCTION WORKFLOWS' },
    { value: '70', suffix: '%', label: 'CYCLE TIME REDUCTION' },
    { value: '17', suffix: '', label: 'ENGINEERS MENTORED' },
  ];

  return (
    <section id="about" className="section-light">
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="section-label">// WHO I AM</motion.div>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="section-heading">About Me</motion.h2>

          <div style={{ display: 'flex', gap: 48, marginTop: 40, flexWrap: 'wrap' }}>
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} style={{ flex: '1 1 400px', maxWidth: 600 }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#444', marginBottom: 24 }}>
                Senior Automation Engineer with 5+ years building enterprise RPA and SAP automation systems at Delta Air Lines. I specialize in turning manual, error-prone business processes into scalable automated workflows using UiPath, Python, and Azure AI.
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
                background: '#fff', border: '1px solid #E5E5E5', borderRadius: 'var(--radius-md)'
              }}>
                <span style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                  background: '#EEF2FF', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#4F46E5'
                }}>B</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a1a' }}>B.Sc. Computer Science</div>
                  <div style={{ fontSize: 14, color: '#888' }}>Aston University, Birmingham, UK</div>
                </div>
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 16,
                padding: '12px 20px', background: '#FFFBEB', border: '1px solid #FDE68A',
                borderRadius: 'var(--radius-md)', fontSize: 14, color: '#92400E'
              }}>
                🏅 AWS Certified Cloud Practitioner
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} style={{
              flex: '1 1 300px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20
            }}>
              {stats.map(s => (
                <div key={s.label} style={{
                  background: '#fff', border: '1px solid #E5E5E5',
                  borderRadius: 'var(--radius-md)', padding: 24, textAlign: 'center'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, color: '#1a1a1a'
                  }}>
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
                    color: '#999', marginTop: 4, textTransform: 'uppercase'
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Tech Marquee */}
        <div style={{
          marginTop: 64, overflow: 'hidden', borderTop: '1px solid #E5E5E5',
          borderBottom: '1px solid #E5E5E5', padding: '20px 0'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', color: '#999', textAlign: 'center', marginBottom: 12
          }}>
            TECHNOLOGIES I WORK WITH
          </div>
          <motion.div
            animate={{ x: [0, -50 * marqueeSkills.length] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: 32, whiteSpace: 'nowrap', width: 'max-content' }}
          >
            {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
              <span key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#888'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C7D2FE' }} />
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
