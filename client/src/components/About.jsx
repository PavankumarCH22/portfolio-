import { useState, useRef, useEffect } from 'react';
import { GraduationCap, MapPin, Briefcase, Cpu, Mail, Github, Linkedin, Code2, Sparkles } from 'lucide-react';
import './About.css';

const highlights = [
  { icon: Briefcase, label: 'Full Stack Intern', sub: 'Thiranex · May–Jun 2026', color: 'green' },
  { icon: GraduationCap, label: 'B.Tech AI & CSE', sub: 'PIET · 2023–2027', color: 'accent' },
  { icon: MapPin, label: 'Visakhapatnam', sub: 'Andhra Pradesh, India', color: 'blue' },
  { icon: Cpu, label: 'MERN & AI/ML', sub: 'Front-End & Full-Stack', color: 'pink' },
];

// 4x4 real photo tile grid — each tile carries an exact 1/16th slice of the portrait
const PHOTO_TILES = Array.from({ length: 16 }, (_, idx) => {
  const row = Math.floor(idx / 4);
  const col = idx % 4;
  return {
    id: idx,
    row,
    col,
    delay: (row + col) * 90,
  };
});

export default function About() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [morphCycle, setMorphCycle] = useState(1);
  const [isMorphing, setIsMorphing] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkReady, setBlinkReady] = useState(true);
  const cardRef = useRef(null);

  // Trigger 3D photo-into-boxes morph wave on load and periodically every 6.5s
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsMorphing(false);
      return;
    }

    const endInitial = window.setTimeout(() => setIsMorphing(false), 1850);

    const intervalId = window.setInterval(() => {
      setIsMorphing(true);
      setMorphCycle((c) => c + 1);
      window.setTimeout(() => setIsMorphing(false), 1850);
    }, 6500);

    return () => {
      window.clearTimeout(endInitial);
      window.clearInterval(intervalId);
    };
  }, []);

  // Natural, clearly visible eye-blink loop (every ~2.4s + occasional double-blink)
  useEffect(() => {
    if (!blinkReady) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timerId;
    let blinkOffId;
    let secondBlinkId;
    let secondOffId;
    let cancelled = false;

    const triggerBlink = () => {
      if (cancelled) return;
      setIsBlinking(true);
      blinkOffId = window.setTimeout(() => {
        if (cancelled) return;
        setIsBlinking(false);

        // ~30% chance of a natural quick double-blink
        if (Math.random() < 0.3) {
          secondBlinkId = window.setTimeout(() => {
            if (cancelled) return;
            setIsBlinking(true);
            secondOffId = window.setTimeout(() => {
              if (!cancelled) setIsBlinking(false);
            }, 200);
          }, 170);
        }
      }, 230);

      const nextDelay = 2200 + Math.random() * 1400;
      timerId = window.setTimeout(triggerBlink, nextDelay);
    };

    timerId = window.setTimeout(triggerBlink, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
      window.clearTimeout(blinkOffId);
      window.clearTimeout(secondBlinkId);
      window.clearTimeout(secondOffId);
    };
  }, [blinkReady]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: (-y * 18).toFixed(2), ry: (x * 22).toFixed(2) });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const triggerBoxMorph = () => {
    setIsMorphing(true);
    setMorphCycle((c) => c + 1);
    window.setTimeout(() => setIsMorphing(false), 1850);
  };

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          {/* Profile Picture Column with Real 4x4 Photo Box-Morph + Natural Eye Blink + 3D Tilt */}
          <div className="about__profile-column" data-reveal="fade-right">
            <div
              ref={cardRef}
              className={`about__image-container ${isMorphing ? 'about__image-container--morphing' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={triggerBoxMorph}
              title="Click to replay 3D box-morph animation"
              style={{
                '--rx': `${tilt.rx}deg`,
                '--ry': `${tilt.ry}deg`,
              }}
            >
              <div className="about__image-glow" />
              <div className="about__image-border" />

              {/* Decorative floating mini cubes around portrait */}
              <span className="about__float-box about__float-box--1" aria-hidden="true" />
              <span className="about__float-box about__float-box--2" aria-hidden="true" />
              <span className="about__float-box about__float-box--3" aria-hidden="true" />

              <div className="about__image-wrapper">
                {/* Continuous 3D Head/Portrait Rotation Stage + Natural Eye Blink */}
                <div className="about__head-3d-stage">
                  <img src="/pavan.jpg" alt="Pavan Kumar Chakali" className="about__image" />
                  {blinkReady && (
                    <img
                      src="/pavan-blink.jpg"
                      alt=""
                      aria-hidden="true"
                      className={`about__image about__image--blink ${isBlinking ? 'about__image--blinking' : ''}`}
                      onError={() => setBlinkReady(false)}
                    />
                  )}
                </div>

                {/* 4x4 Real Photo-Split 3D Box-Morph Layer */}
                {isMorphing && (
                  <div key={morphCycle} className="about__tile-grid" aria-hidden="true">
                    {PHOTO_TILES.map((tile) => (
                      <div
                        key={tile.id}
                        className="about__tile"
                        style={{ '--tile-delay': `${tile.delay}ms` }}
                      >
                        <img
                          src={isBlinking && blinkReady ? '/pavan-blink.jpg' : '/pavan.jpg'}
                          alt=""
                          className="about__tile-img"
                          style={{
                            transform: `translate(${-tile.col * 25}%, ${-tile.row * 25}%)`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="about__image-sheen" aria-hidden="true" />
                <div className="about__image-overlay" />
                <div className="about__image-badge">
                  <Sparkles size={12} className="about__badge-icon" />
                  <span>Full-Stack MERN</span>
                </div>
              </div>
            </div>

            <div className="about__links" data-reveal="fade-up" data-reveal-delay="180">
              <a href="mailto:pavankumarch326@gmail.com" className="about__link">
                <Mail size={16} />
                <span>Email</span>
              </a>
              <a href="https://github.com/PavankumarCH22" target="_blank" rel="noreferrer" className="about__link">
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/chakalipavankumar" target="_blank" rel="noreferrer" className="about__link">
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a href="https://leetcode.com/u/pavan1429" target="_blank" rel="noreferrer" className="about__link">
                <Code2 size={16} />
                <span>LeetCode</span>
              </a>
            </div>
          </div>

          {/* Biography & Achievements Column */}
          <div className="about__info-column" data-reveal="fade-left" data-reveal-delay="120">
            <div className="about__content">
              <p className="section-label">About me</p>
              <h2 className="section-title">
                Building production web apps<br />
                that solve real problems.
              </h2>

              <p className="about__text">
                I'm a Front-End and Full-Stack Developer pursuing my B.Tech in Artificial Intelligence and Computer Science (CSE AI) at Parul Institute of Engineering & Technology (2023–2027). I specialize in building and deploying production web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js), Next.js, and TypeScript.
              </p>

              <p className="about__text">
                I delivered a live business website (Kandanavolu Paakashala) serving active customers with multi-language support, a booking system, WhatsApp integration, and an admin dashboard, built IntelliHire AI — an AI-powered hiring platform on Render — and completed a Full Stack Development Internship at Thiranex. I'm currently seeking a Front-End or Full-Stack Developer role.
              </p>
            </div>

            <div className="about__highlights">
              {highlights.map((h, i) => {
                const IconComponent = h.icon;
                return (
                  <div
                    key={h.label}
                    className={`highlight-card highlight-card--${h.color}`}
                    data-reveal="zoom-in"
                    data-reveal-delay={String(i * 90)}
                  >
                    <div className="highlight-card__icon-wrapper">
                      <IconComponent size={22} className="highlight-card__icon" />
                    </div>
                    <div>
                      <p className="highlight-card__label">{h.label}</p>
                      <p className="highlight-card__sub">{h.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
