import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import GoodFellaButton from './GoodFellaButton';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  const contactMethods = [
    { icon: '✉', label: 'Send me an email', sub: 'yeshupuri1@gmail.com', href: 'mailto:yeshupuri1@gmail.com' },
    { icon: 'in', label: 'Connect on LinkedIn', sub: 'linkedin.com/in/yeshu-puri', href: 'https://www.linkedin.com/in/yeshu-puri-1996yp' },
    { icon: '⌘', label: 'Check my GitHub', sub: 'github.com/yzzpuri13', href: 'https://github.com/yzzpuri13' },
  ];

  return (
    <section id="contact" className="section-light">
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="section-label">// GET IN TOUCH</motion.div>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="section-heading" style={{ color: '#1a1a1a' }}>
            Let's Build Something Together
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} style={{
            fontSize: 18, color: '#666', marginTop: 16, maxWidth: 500
          }}>
            Currently open to automation engineering opportunities across the US.
          </motion.p>
        </motion.div>

        <div style={{ display: 'flex', gap: 48, marginTop: 48, flexWrap: 'wrap' }}>
          {/* Contact methods */}
          <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {contactMethods.map((m, i) => (
              <motion.a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 24px', background: '#fff', border: '1px solid #E5E5E5',
                  borderRadius: 'var(--radius-md)', textDecoration: 'none',
                  transition: 'all 0.3s ease', cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#E50914';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(229,9,20,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E5E5E5';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-sm)',
                    background: '#FFF5F0', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#E50914',
                    fontFamily: m.icon === 'in' ? 'var(--font-heading)' : 'inherit'
                  }}>{m.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: 15 }}>{m.label}</div>
                    <div style={{ fontSize: 13, color: '#999' }}>{m.sub}</div>
                  </div>
                </div>
                <span style={{ color: '#ccc', fontSize: 18, transition: 'transform 0.3s ease' }}>→</span>
              </motion.a>
            ))}
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSubmit}
            style={{
              flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 16
            }}
          >
            {['name', 'email'].map(field => (
              <input key={field} type={field === 'email' ? 'email' : 'text'}
                placeholder={field === 'name' ? 'Your name' : 'Your email'}
                value={form[field]}
                onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                required
                style={{
                  padding: '14px 18px', fontSize: 15, borderRadius: 'var(--radius-md)',
                  border: '1px solid #E5E5E5', background: '#fff', color: '#1a1a1a',
                  fontFamily: 'var(--font-body)', outline: 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                }}
                onFocus={e => { e.target.style.borderColor = '#E50914'; e.target.style.boxShadow = '0 0 0 3px rgba(229,9,20,0.08)'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E5E5'; e.target.style.boxShadow = 'none'; }}
              />
            ))}
            <textarea
              placeholder="Your message"
              rows={5}
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              required
              style={{
                padding: '14px 18px', fontSize: 15, borderRadius: 'var(--radius-md)',
                border: '1px solid #E5E5E5', background: '#fff', color: '#1a1a1a',
                fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onFocus={e => { e.target.style.borderColor = '#E50914'; e.target.style.boxShadow = '0 0 0 3px rgba(229,9,20,0.08)'; }}
              onBlur={e => { e.target.style.borderColor = '#E5E5E5'; e.target.style.boxShadow = 'none'; }}
            />

            {status === 'sent' ? (
              <div style={{
                padding: '14px 24px', textAlign: 'center',
                background: '#F0FDF4', border: '1px solid #86EFAC',
                borderRadius: 'var(--radius-md)', color: '#16A34A',
                fontWeight: 600, fontSize: 15
              }}>
                ✓ Message sent! I'll get back to you soon.
              </div>
            ) : (
              <button type="submit" disabled={status === 'sending'} className="gf-btn" style={{ width: '100%', justifyContent: 'center' }}>
                <span className="gf-btn-text">
                  {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                </span>
                <span className="gf-btn-icon">+</span>
              </button>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
