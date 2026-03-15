"use client";
import { useState, useEffect } from 'react';

export default function WorkPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [tick, setTick] = useState(0);
  const [activeSection, setActiveSection] = useState('experience');
  // @ts-ignore
  const [starField, setStarField] = useState([]);

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
    const anim = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(anim);
  }, []);

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
    const sizeChars = { lg: ['✦', '✧', '⋆'], md: ['✧', '°', '*'], sm: ['·', '˚', '°'] };
   // @ts-ignore
    const chars = sizeChars[star.size];
    const now = tick * 100;
    return chars[Math.floor((now / star.twinkleSpeed) + star.charOffset) % chars.length];
  };

  const experience = [
    {
      company: 'Mowze',
      role: 'Assembly Technician',
      date: 'Feb 2025 – Sep 2025',
      location: 'Olney, MD',
      bullets: [
        'Built 5 autonomous mower prototypes from the ground up, including chassis assembly, custom Li-ion battery pack fabrication, and full electrical integration',
        'Logged 300+ hours of field testing across internal validation and client deployments',
        'Contributed to product development by recommending mobile app features and supporting business model development',
      ],
    },
    {
      company: 'Professional eSports – Apex Legends',
      role: 'In-Game Leader',
      date: '2022 – 2024',
      location: 'Remote',
      bullets: [
        'Earned $5K+ in tournament winnings and reached peak #12 global ranking',
        'Led competitive roster to top 40 in North America as shot-caller and primary strategist',
      ],
    },
  ];

  const projects = [
    {
      name: 'IronAxis',
      subtitle: 'Barbell Form Tracker',
      description: 'BLE-enabled wearable barbell sensor for real-time form feedback. ESP32-C3, MPU6050 IMU, SolidWorks enclosure, Arduino firmware, MATLAB analytics. Led 4-person team through three prototype iterations.',
    },
    {
      name: 'FPV Racing Drone',
      subtitle: 'Custom Build',
      description: 'Built from component-level kit. Soldered ESCs, flight controller, and VTX. Troubleshot solder joint failures and goggle firmware. Tuned and flew using Betaflight.',
    },
  ];

  const sections = ['experience', 'projects'];

  return (
    <div 
      className="min-h-screen relative font-mono overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: c.bg }}
    >
      {starField.map((star, i) => (
        <div key={i} className="absolute pointer-events-none" style={getStarStyle(star)}>
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
        <a href="/" className="text-xs transition-colors duration-500" style={{ color: c.accent }}>
          <pre>
{`┌─────┐
│ A R │
└─────┘`}
          </pre>
        </a>
        
        <div className="flex items-center gap-6 text-sm">
          <a href="/" className="transition-colors hover:opacity-80" style={{ color: c.muted }}>[home]</a>
          <a href="/work" className="transition-colors hover:opacity-80" style={{ color: c.accent }}>[work]</a>
          <div className="flex items-center gap-2 ml-2 pl-4" style={{ borderLeft: `1px solid ${c.dim}` }}>
             <a href="https://linkedin.com/in/alex-rochette" target="_blank" className="transition-colors hover:opacity-80 text-xs" style={{ color: c.muted }}>[in]</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 px-6 md:px-12 pt-4 pb-24">
        <pre className="text-xs mb-6" style={{ color: c.accent }}>
{`┌─────────┐
│  WORK   │
└─────────┘`}
        </pre>

        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-2 flex-wrap">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className="text-xs px-3 py-1 rounded transition-colors"
                style={{
                  backgroundColor: activeSection === section ? c.accent : 'transparent',
                  color: activeSection === section ? c.bg : c.muted,
                  border: `1px solid ${activeSection === section ? c.accent : c.dim}`,
                }}
              >
                {section}
              </button>
            ))}
          </div>
          
          <a 
            href="/resume.pdf"
            download
            className="text-xs transition-colors hover:opacity-80"
            style={{ color: c.accent }}
          >
            [↓ resume]
          </a>
        </div>

        {activeSection === 'experience' && (
          <div className="max-w-3xl space-y-6">
            {experience.map((exp, i) => (
              <div 
                key={i}
                className="border rounded-lg p-4"
                style={{ borderColor: c.dim, backgroundColor: c.faint }}
              >
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <div>
                    <div className="text-sm font-medium" style={{ color: c.primary }}>{exp.company}</div>
                    <div className="text-xs" style={{ color: c.accent }}>{exp.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs" style={{ color: c.muted }}>{exp.date}</div>
                    <div className="text-xs" style={{ color: c.dim }}>{exp.location}</div>
                  </div>
                </div>
                <div className="space-y-2 mt-3">
                  {exp.bullets.map((bullet, j) => (
                    <div key={j} className="text-xs flex gap-2" style={{ color: c.muted }}>
                      <span style={{ color: c.dim }}>•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="max-w-3xl space-y-6">
            {projects.map((project, i) => (
              <div 
                key={i}
                className="border rounded-lg p-4"
                style={{ borderColor: c.dim, backgroundColor: c.faint }}
              >
                <div className="mb-2">
                  <span className="text-sm font-medium" style={{ color: c.primary }}>{project.name}</span>
                  <span className="text-xs ml-2" style={{ color: c.accent }}>{project.subtitle}</span>
                </div>
                <div className="text-xs" style={{ color: c.muted }}>
                  {project.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}