import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects, categories } from '../data/projects';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section-light">
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="section-label">// SELECTED WORK</motion.div>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="section-heading" style={{ color: '#0A0A0A' }}>
            Projects
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} style={{
            fontSize: 18, color: '#777', marginTop: 8, maxWidth: 500
          }}>
            Real-world automation systems built at enterprise scale.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: '10px 24px', borderRadius: 'var(--radius-full)',
              fontSize: 13, fontFamily: 'var(--font-mono)', cursor: 'pointer',
              letterSpacing: 1, textTransform: 'uppercase',
              background: filter === cat ? '#E50914' : 'transparent',
              color: filter === cat ? '#fff' : '#888',
              border: `1px solid ${filter === cat ? '#E50914' : '#DDD'}`,
              transition: 'all 0.3s ease', fontWeight: 500
            }}
              onMouseEnter={e => { if (filter !== cat) { e.target.style.borderColor = '#E50914'; e.target.style.color = '#E50914'; } }}
              onMouseLeave={e => { if (filter !== cat) { e.target.style.borderColor = '#DDD'; e.target.style.color = '#888'; } }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 28, marginTop: 36
        }}>
          {filtered.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#fff', border: '1px solid #E5E5E5',
                borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(229,9,20,0.1)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#E50914';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#E5E5E5';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={project.image} alt={project.title} style={{
                  width: '100%', height: 220, objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <span style={{
                  position: 'absolute', top: 14, right: 14,
                  padding: '5px 14px', borderRadius: 'var(--radius-full)',
                  background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                  fontSize: 11, color: '#fff', fontWeight: 500,
                  fontFamily: 'var(--font-mono)', letterSpacing: 1,
                  textTransform: 'uppercase'
                }}>
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '28px 28px 24px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700,
                  color: '#0A0A0A', marginBottom: 10, letterSpacing: -0.3
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontSize: 15, color: '#666', lineHeight: 1.65, marginBottom: 20
                }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                  {project.tags.map(t => (
                    <span key={t} style={{
                      padding: '4px 12px', fontSize: 11, fontWeight: 500,
                      borderRadius: 'var(--radius-full)',
                      background: '#F5F5F5', color: '#555',
                      fontFamily: 'var(--font-mono)', letterSpacing: 0.5
                    }}>{t}</span>
                  ))}
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div style={{
                    display: 'flex', gap: 0, borderTop: '1px solid #F0F0F0', paddingTop: 16
                  }}>
                    {Object.entries(project.metrics).map(([k, v], mi) => (
                      <div key={k} style={{
                        flex: 1, textAlign: 'center',
                        borderRight: mi < Object.keys(project.metrics).length - 1 ? '1px solid #F0F0F0' : 'none'
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-heading)', fontWeight: 700,
                          fontSize: 20, color: '#E50914'
                        }}>{v}</div>
                        <div style={{
                          fontSize: 10, color: '#AAA', textTransform: 'uppercase',
                          letterSpacing: 1, marginTop: 2,
                          fontFamily: 'var(--font-mono)'
                        }}>{k}</div>
                      </div>
                    ))}
                  </div>
                )}

                {project.links && (
                  <div style={{
                    display: 'flex', gap: 10, paddingTop: 16, borderTop: '1px solid #F0F0F0', marginTop: 16
                  }}>
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer" style={{
                        flex: 1, textAlign: 'center', padding: '8px 16px',
                        background: '#E50914', color: '#fff', borderRadius: 'var(--radius-full)',
                        fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600,
                        textDecoration: 'none', letterSpacing: 1, textTransform: 'uppercase',
                        transition: 'opacity 0.3s'
                      }}
                        onMouseEnter={e => e.target.style.opacity = '0.85'}
                        onMouseLeave={e => e.target.style.opacity = '1'}
                      >Live Demo</a>
                    )}
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={{
                        flex: 1, textAlign: 'center', padding: '8px 16px',
                        background: 'transparent', color: '#555', borderRadius: 'var(--radius-full)',
                        fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600,
                        textDecoration: 'none', letterSpacing: 1, textTransform: 'uppercase',
                        border: '1px solid #DDD', transition: 'all 0.3s'
                      }}
                        onMouseEnter={e => { e.target.style.borderColor = '#E50914'; e.target.style.color = '#E50914'; }}
                        onMouseLeave={e => { e.target.style.borderColor = '#DDD'; e.target.style.color = '#555'; }}
                      >GitHub</a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
