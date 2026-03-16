"use client";
import { useState, useEffect } from 'react';

export default function Homepage() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tick, setTick] = useState(0);
  // @ts-ignore
  const [starField, setStarField] = useState([]);
  
  
  // Generate stars only on client side
  useEffect(() => {
    const sizes = ['lg', 'md', 'sm'];
    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      twinkleSpeed: 2000 + Math.random() * 4000,
      floatSpeed: 8000 + Math.random() * 6000,
      floatRange: 1 + Math.random() * 2,
      charOffset: Math.floor(Math.random() * 3),
      phaseOffset: Math.random() * Math.PI * 2,
    }));
    // @ts-ignore
    setStarField(stars);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const anim = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(anim);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  });

  const dark = {
    bg: '#1c1917',
    primary: '#f5f5f4',
    accent: '#d4a257',
    muted: '#78716c',
    dim: '#44403c',
    faint: '#292524',
  };

  const light = {
    bg: '#ddd5c8',
    primary: '#1c1917',
    accent: '#b45309',
    muted: '#4a453d',
    dim: '#7a7468',
    faint: '#c9c1b4',
  };

  const c = darkMode ? dark : light;

  const asciiName = `    ___    __                ____             __         __  __     
   /   |  / /__  _  __      / __ \\____  _____/ /_  ___  / /_/ /____ 
  / /| | / / _ \\| |/_/     / /_/ / __ \\/ ___/ __ \\/ _ \\/ __/ __/ _ \\
 / ___ |/ /  __/>  <      / _, _/ /_/ / /__/ / / /  __/ /_/ /_/  __/
/_/  |_/_/\\___/_/|_|     /_/ |_|\\____/\\___/_/ /_/\\___/\\__/\\__/\\___/`;
// @ts-ignore
  const getStarStyle = (star) => {
    const now = tick * 100;
    const floatY = star.y + Math.sin((now / star.floatSpeed) + star.phaseOffset) * star.floatRange;
    const opacity = 0.15 + Math.abs(Math.sin((now / star.twinkleSpeed) + star.phaseOffset)) * 0.35;
    
    return {
      left: `${star.x}%`,
      top: `${floatY}%`,
      opacity,
      color: star.size === 'lg' ? c.accent : c.dim,
      fontSize: star.size === 'lg' ? '14px' : star.size === 'md' ? '10px' : '8px',
    };
  };
// @ts-ignore
  const getStarChar = (star) => {
    const sizeChars = {
      lg: ['✦', '✧', '⋆'],
      md: ['✧', '°', '*'],
      sm: ['·', '˚', '°'],
    };
    // @ts-ignore
    const chars = sizeChars[star.size];
    const now = tick * 100;
    const index = Math.floor((now / star.twinkleSpeed) + star.charOffset) % chars.length;
    return chars[index];
  };

  return (
    <div 
      className="min-h-screen relative font-mono overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: c.bg }}
    >
      {starField.map((star, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={getStarStyle(star)}
        >
          {getStarChar(star)}
        </div>
      ))}

      <pre className="absolute top-4 left-4 text-xs" style={{ color: c.dim, opacity: 0.4 }}>╭───</pre>
      <pre className="absolute top-4 right-4 text-xs" style={{ color: c.dim, opacity: 0.4 }}>───╮</pre>
      <pre className="absolute bottom-4 left-4 text-xs" style={{ color: c.dim, opacity: 0.4 }}>╰───</pre>
      <pre className="absolute bottom-4 right-4 text-xs" style={{ color: c.dim, opacity: 0.4 }}>───╯</pre>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 text-xs z-50 transition-all duration-500 hover:opacity-80"
        style={{ color: c.muted }}
      >
        <pre>
{darkMode ? 
`┌─────┐
│ ☀︎   │
└─────┘` : 
`┌─────┐
│ ☾   │
└─────┘`}
        </pre>
      </button>

      <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6">
        <pre className="text-xs" style={{ color: c.accent }}>
{`┌─────┐
│ A R │
└─────┘`}
        </pre>
        
        <div className="flex items-center gap-6 text-sm">
          <a href="/work" className="transition-colors hover:opacity-80" style={{ color: c.muted }}>
            [work]
          </a>
          
          <div className="flex items-center gap-2 ml-2 pl-4" style={{ borderLeft: `1px solid ${c.dim}` }}>
           <a href="https://linkedin.com/in/alex-rochette" target="_blank" className="transition-colors hover:opacity-80 text-xs" style={{ color: c.muted }}>[in]</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="text-center">
          
          <pre 
            className="text-xs leading-none inline-block transition-colors duration-500"
            style={{ color: c.primary }}
          >
            {asciiName}
          </pre>
          
          <pre className="text-xs my-6 transition-colors duration-500" style={{ color: c.dim }}>
{'═'.repeat(70)}
          </pre>
          
          <div className="text-xs inline-block" style={{ color: c.muted }}>
  <pre>
{`┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Industrial Engineering & Business @ Northeastern               │
│  Building things in robotics and automation.                    │
│                                                                 │`}
  </pre>
  <div className="flex gap-3 pl-3">
    <a href="/work" className="hover:opacity-70 transition-colors" style={{ color: c.accent }}>
      <pre>{`┌─────────────────┐
│  → see my work  │
└─────────────────┘`}</pre>
    </a>
    <a href="mailto:rochette.a@northeastern.edu" className="hover:opacity-70 transition-colors" style={{ color: c.accent }}>
      <pre>{`┌─────────────────┐
│  → get in touch │
└─────────────────┘`}</pre>
    </a>
  </div>
  <pre>
{`│                                                                 │
└─────────────────────────────────────────────────────────────────┘`}
  </pre>
</div>
          
        </div>
      </main>

      <footer 
        className="absolute bottom-6 left-6 md:left-12 text-xs z-10"
        style={{ color: c.dim }}
      >
        <div style={{ border: `1px solid ${c.dim}`, padding: '6px 12px', borderRadius: '4px' }}>
          boston, ma · {timeString}
        </div>
      </footer>
    </div>
  );
}