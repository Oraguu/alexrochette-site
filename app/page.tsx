"use client";
import { useState, useEffect } from 'react';

export default function Homepage() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tick, setTick] = useState(0);
  // @ts-ignore
  const [starField, setStarField] = useState([]);
  const [asteroid, setAsteroid] = useState<{id: number, startX: number, startY: number, size: number} | null>(null);
  
  // Generate stars
  useEffect(() => {
    const sizes = ['lg', 'md', 'sm'];
    const stars = Array.from({ length: 75 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      twinkleSpeed: 1500 + Math.random() * 3000,
      floatSpeed: 6000 + Math.random() * 5000,
      floatRange: 1 + Math.random() * 3,
      charOffset: Math.floor(Math.random() * 3),
      phaseOffset: Math.random() * Math.PI * 2,
      fadeDelay: Math.random() * 8000,
      fadeDuration: 4000 + Math.random() * 6000,
    }));
    // @ts-ignore
    setStarField(stars);
  }, []);

  // Relocate stars when they fade out
  useEffect(() => {
    if (tick % 10 === 0 && starField.length > 0) {
      // @ts-ignore
      setStarField(stars => stars.map(star => {
        const now = tick * 100;
        const fadeProgress = ((now + star.fadeDelay) % star.fadeDuration) / star.fadeDuration;
        const fadeOpacity = Math.sin(fadeProgress * Math.PI);
        
        if (fadeOpacity < 0.05) {
          return {
            ...star,
            x: Math.random() * 100,
            y: Math.random() * 100,
            phaseOffset: Math.random() * Math.PI * 2,
          };
        }
        return star;
      }));
    }
  }, [tick, starField.length]);

  // Asteroid timer
  useEffect(() => {
    const launchAsteroid = () => {
      setAsteroid({
        id: Date.now(),
        startX: 105,
        startY: 10 + Math.random() * 40,
        size: 10 + Math.random() * 8,
      });
      
      setTimeout(() => setAsteroid(null), 4000);
    };

    const firstTimeout = setTimeout(launchAsteroid, 30000);
    const interval = setInterval(launchAsteroid, 120000);
    
    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
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

  const asciiName = 
`    ___    __                ____             __         __  __     
   /   |  / /__  _  __      / __ \\____  _____/ /_  ___  / /_/ /____ 
  / /| | / / _ \\| |/_/     / /_/ / __ \\/ ___/ __ \\/ _ \\/ __/ __/ _ \\
 / ___ |/ /  __/>  <      / _, _/ /_/ / /__/ / / /  __/ /_/ /_/  __/
/_/  |_/_/\\___/_/|_|     /_/ |_|\\____/\\___/_/ /_/\\___/\\__/\\__/\\___/`;

  // @ts-ignore
  const getStarStyle = (star) => {
    const now = tick * 100;
    const floatY = star.y + Math.sin((now / star.floatSpeed) + star.phaseOffset) * star.floatRange;
    
    const fadeProgress = ((now + star.fadeDelay) % star.fadeDuration) / star.fadeDuration;
    const fadeOpacity = Math.sin(fadeProgress * Math.PI);
    
    const twinkle = 0.4 + Math.abs(Math.sin((now / star.twinkleSpeed) + star.phaseOffset)) * 0.6;
    const opacity = twinkle * fadeOpacity;
    
    return {
      left: `${star.x}%`,
      top: `${floatY}%`,
      opacity: Math.max(0, opacity),
      color: star.size === 'lg' ? c.accent : c.dim,
      fontSize: star.size === 'lg' ? '16px' : star.size === 'md' ? '11px' : '8px',
      transition: 'opacity 0.5s ease-out',
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

      {/* Corner accents - hidden on mobile */}
      <pre className="absolute top-4 left-4 text-xs hidden md:block" style={{ color: c.dim, opacity: 0.4 }}>╭───</pre>
      <pre className="absolute top-4 right-4 text-xs hidden md:block" style={{ color: c.dim, opacity: 0.4 }}>───╮</pre>
      <pre className="absolute bottom-4 left-4 text-xs hidden md:block" style={{ color: c.dim, opacity: 0.4 }}>╰───</pre>
      <pre className="absolute bottom-4 right-4 text-xs hidden md:block" style={{ color: c.dim, opacity: 0.4 }}>───╯</pre>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 text-xs z-50 transition-all duration-500 hover:opacity-80"
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

      <nav className="relative z-10 flex justify-between items-center px-4 md:px-12 py-4 md:py-6">
        <pre className="text-xs" style={{ color: c.accent }}>
{`┌─────┐
│ A R │
└─────┘`}
        </pre>
        
        <div className="flex items-center gap-4 md:gap-6 text-sm">
          <a href="/work" className="transition-colors hover:opacity-80" style={{ color: c.muted }}>
            [work]
          </a>
          
          <div className="flex items-center gap-2 pl-2 md:pl-4" style={{ borderLeft: `1px solid ${c.dim}` }}>
           <a href="https://linkedin.com/in/alex-rochette" target="_blank" className="transition-colors hover:opacity-80 text-xs" style={{ color: c.muted }}>[in]</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 md:px-12" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="text-center w-full">
          
          {/* Desktop ASCII name */}
          <pre 
            className="text-xs leading-none hidden md:inline-block transition-colors duration-500"
            style={{ color: c.primary }}
          >
            {asciiName}
          </pre>

          {/* Mobile name */}
          <h1 
            className="md:hidden text-3xl font-mono tracking-tight transition-colors duration-500"
            style={{ color: c.primary }}
          >
            Alex Rochette
          </h1>
          
          {/* Desktop divider */}
          <pre className="text-xs my-6 hidden md:block transition-colors duration-500" style={{ color: c.dim }}>
{'═'.repeat(70)}
          </pre>

          {/* Mobile divider */}
          <div className="md:hidden my-4 mx-auto w-16 h-px" style={{ backgroundColor: c.dim }}></div>
          
          {/* Desktop box */}
          <pre className="text-xs transition-colors duration-500 hidden md:inline-block" style={{ color: c.muted }}>
{`┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Industrial Engineering & Business @ Northeastern               │
│  Building things in robotics and automation.                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘`}
          </pre>

          {/* Mobile bio */}
          <p className="md:hidden text-sm px-4 transition-colors duration-500" style={{ color: c.muted }}>
            Industrial Engineering & Business @ Northeastern<br/>
            Building things in robotics and automation.
          </p>

          <div className="flex gap-4 mt-6 md:mt-4 justify-center flex-wrap">
            <a href="/work" className="text-sm md:text-xs hover:opacity-70 transition-colors" style={{ color: c.accent }}>
              [→ see my work]
            </a>
            <a href="mailto:rochette.a@northeastern.edu" className="text-sm md:text-xs hover:opacity-70 transition-colors" style={{ color: c.accent }}>
              [→ get in touch]
            </a>
          </div>
          
        </div>
      </main>

      <footer 
        className="absolute bottom-4 left-4 md:bottom-6 md:left-12 text-xs z-10"
        style={{ color: c.dim }}
      >
        <div style={{ border: `1px solid ${c.dim}`, padding: '6px 12px', borderRadius: '4px' }}>
          boston, ma · {timeString}
        </div>
      </footer>

      {asteroid && (
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: `${asteroid.startX}%`,
            top: `${asteroid.startY}%`,
            color: c.accent,
            fontSize: `${asteroid.size}px`,
            animation: `asteroidFly 3.5s linear forwards`,
            textShadow: `0 0 10px ${c.accent}, 0 0 20px ${c.accent}`,
          }}
        >
          ☄
          <span 
            style={{ 
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '8px',
              opacity: 0.6,
            }}
          >
            · · ·
          </span>
        </div>
      )}

      <style>{`
        @keyframes asteroidFly {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(-120vw) translateY(30vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}