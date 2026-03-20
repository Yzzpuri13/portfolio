import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// Portrait using density — dense chars = dark areas of face, light chars = highlights
const PORTRAIT = [
  '                                              ',
  '                     .:-=+*##                 ',
  '                  .:=+*#%%@@@@#*              ',
  '                .=+#%@@@@@@@@@@@@*            ',
  '              .-*%@@@@@@@@@@@@@@@@@=          ',
  '             :*%@@@@@@@@@@@@@@@@@@@@+         ',
  '            =@@@@@@@@@@@@@@@@@@@@@@@@:        ',
  '           +@@@@@@@@@@@@@@@@@@@@@@@@@#        ',
  '          *@@@@@@@@@@@@@@@@@@@@@@@@@@@@       ',
  '         #@@@@@@@@@%%##**##%%@@@@@@@@@@:      ',
  '        %@@@@@@%*=:.        .:=*%@@@@@@*      ',
  '       %@@@@@#-                  =#@@@@@+     ',
  '      #@@@@%-       .:::..        -%@@@@#     ',
  '     +@@@@#.     .-+*####*+-       .#@@@@:    ',
  '     %@@@%      :*%%@@@@@@%%*:      %@@@%     ',
  '    .@@@@=     -#@@@@@@@@@@@@#-     =@@@@.    ',
  '    :@@@@     .%@@@@@@  @@@@@@%.    .@@@@:    ',
  '    :@@@@     +@@@@@@    @@@@@@+     @@@@:    ',
  '    .@@@@.    *@@@@@@    @@@@@@*    .@@@@.    ',
  '     @@@@-    -@@@@@@    @@@@@@-    -@@@@     ',
  '     =@@@@     =%@@@@    @@@@%=     @@@@=     ',
  '      @@@@-     :*%@@    @@%*:     -@@@@      ',
  '      =@@@@       :-+    +-.       @@@@=      ',
  '       %@@@%                      %@@@%       ',
  '       .@@@@#.     -####+-      .#@@@@.       ',
  '        =@@@@%.    .%@@@@.     .%@@@@=        ',
  '         *@@@@@-    .:--:.    -@@@@@*         ',
  '          #@@@@@*:          :*@@@@@#          ',
  '           %@@@@@@#=-.  .-=#@@@@@@%           ',
  '            *@@@@@@@@@@@@@@@@@@@@*            ',
  '             =#@@@@@@@@@@@@@@@@#=             ',
  '               =*%@@@@@@@@@@%*=               ',
  '                  :-+*##*+-:                  ',
  '                 .:=+*%%*+=:.                 ',
  '               .=*%@@@@@@@@%*=.               ',
  '             :+#@@@@@@@@@@@@@@#+:             ',
  '           .=%@@@@@@@@@@@@@@@@@@@=.           ',
  '          :#@@@@@@@@@@@@@@@@@@@@@@#:          ',
  '         =%@@@@@@@@@@@@@@@@@@@@@@@@%=         ',
  '        +@@@@@@@@@@@@@@@@@@@@@@@@@@@#+        ',
  '       *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#        ',
  '      #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       ',
];

// Brightness: 0 = darkest/densest, 1 = empty
const DENSITY = { '@': 0.05, '%': 0.15, '#': 0.25, '*': 0.35, '+': 0.45, '=': 0.55, '-': 0.65, ':': 0.75, '.': 0.85 };

// Display chars by density tier
const HEAVY = '@%#WMB&';
const MID = '*+x=~-n';
const LITE = ':;,.\'`"';

function pickChar(brightness) {
  if (brightness >= 0.9) return null; // space — skip
  if (brightness >= 0.7) return LITE[Math.floor(Math.random() * LITE.length)];
  if (brightness >= 0.4) return MID[Math.floor(Math.random() * MID.length)];
  return HEAVY[Math.floor(Math.random() * HEAVY.length)];
}

const CHAR_W = 7;
const CHAR_H = 13;
const ROWS = PORTRAIT.length;
const COLS = PORTRAIT[0].length;

export default function AsciiArt() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const [hovering, setHovering] = useState(false);

  // Build grid ONCE — completely static
  const [grid] = useState(() => {
    const g = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        const src = PORTRAIT[r][c];
        const b = DENSITY[src] ?? 1.0;
        const ch = pickChar(b);
        row.push({ ch, density: 1 - b }); // density: 0 = lightest, 1 = darkest
      }
      g.push(row);
    }
    return g;
  });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setMouse({ x: -9999, y: -9999 }); setHovering(false); }}
      animate={{ scale: hovering ? 0.96 : 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        lineHeight: `${CHAR_H}px`,
        whiteSpace: 'pre',
        userSelect: 'none',
        cursor: 'default',
        transformOrigin: 'center center',
      }}
    >
      {grid.map((row, r) => (
        <div key={r} style={{ height: CHAR_H }}>
          {row.map((cell, c) => {
            if (!cell.ch) {
              return <span key={c} style={{ display: 'inline-block', width: CHAR_W }}> </span>;
            }

            const cx = c * CHAR_W + CHAR_W / 2;
            const cy = r * CHAR_H + CHAR_H / 2;
            const dx = mouse.x - cx;
            const dy = mouse.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const radius = 130;
            const raw = Math.max(0, 1 - dist / radius);
            const smooth = raw * raw * raw;

            let color, textShadow;

            if (smooth > 0.005) {
              // HOVER: bright red, denser chars glow brighter
              const intensity = smooth * (0.5 + cell.density * 0.5);
              color = `rgb(229, ${Math.round(60 - 50 * intensity)}, ${Math.round(40 - 30 * intensity)})`;
              textShadow = intensity > 0.08
                ? `0 0 ${Math.round(intensity * 12)}px rgba(229,9,20,${intensity * 0.7})`
                : 'none';
            } else {
              // DEFAULT: always visible — solid white/gray based on density
              // density 1.0 (darkest portrait area) = brightest white
              // density 0.1 (lightest portrait area) = dimmer gray
              const gray = Math.round(100 + cell.density * 155); // range 100-255
              color = `rgb(${gray},${gray},${gray})`;
              textShadow = 'none';
            }

            return (
              <span
                key={c}
                style={{
                  display: 'inline-block',
                  width: CHAR_W,
                  color,
                  textShadow,
                  transition: smooth > 0.005
                    ? 'color 0.12s ease, text-shadow 0.12s ease'
                    : 'color 0.5s ease, text-shadow 0.5s ease',
                }}
              >
                {cell.ch}
              </span>
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}
