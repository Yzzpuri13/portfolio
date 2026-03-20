export default function Footer() {
  return (
    <footer style={{
      background: '#0A0A0A', color: '#F5F5F5',
      padding: '64px 0 32px',
      borderTop: '1px solid #222'
    }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: 32, marginBottom: 48
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, marginBottom: 8
            }}>
              Yeshu Puri
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 2, color: '#666', textTransform: 'uppercase' }}>
              Senior Automation Engineer
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'GitHub', href: 'https://github.com/yzzpuri13' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yeshu-puri-1996yp' },
              { label: 'Email', href: 'mailto:yeshupuri1@gmail.com' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '10px 20px', border: '1px solid #333',
                  borderRadius: 'var(--radius-full)', fontSize: 13,
                  color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.target.style.borderColor = '#E50914';
                  e.target.style.color = '#E50914';
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = '#333';
                  e.target.style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #222', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16
        }}>
          <div style={{ fontSize: 13, color: '#555' }}>
            &copy; {new Date().getFullYear()} Yeshu Puri. All rights reserved.
          </div>
          <div style={{ fontSize: 12, color: '#444', fontFamily: 'var(--font-mono)' }}>
            Designed & Built by Yeshu Puri
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              width: 40, height: 40, borderRadius: '50%', border: '1px solid #333',
              background: 'transparent', color: '#888', fontSize: 16,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#E50914';
              e.currentTarget.style.borderColor = '#E50914';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#333';
              e.currentTarget.style.color = '#888';
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
