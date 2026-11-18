import { useEffect, useRef, useState } from 'react';

const SHOTS = [
  { src: '/lambo-rear.jpg', cls: 'supercar-shot--rear' },
  { src: '/lambo-front.jpg', cls: 'supercar-shot--front' },
];

export default function SupercarBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0, scrollShift: 0 });
  const streakCanvasRef = useRef(null);

  // Smoothly crossfade between the two real Lamborghini rolling shots
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOTS.length);
    }, 9500);
    return () => window.clearInterval(id);
  }, []);

  // Subtle cinematic camera parallax following mouse & scroll
  useEffect(() => {
    let frameId = null;
    const target = { x: 0, y: 0, scrollShift: 0 };

    const applyParallax = () => {
      setParallax({ ...target });
      frameId = null;
    };

    const schedule = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(applyParallax);
      }
    };

    const onMouseMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * -18;
      target.y = (e.clientY / window.innerHeight - 0.5) * -10;
      schedule();
    };

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      target.scrollShift = (window.scrollY / maxScroll) * -28;
      schedule();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  // Ultra-subtle photographic highway light-streaks & night-mist motion overlay
  useEffect(() => {
    const canvas = streakCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const streaks = Array.from({ length: 34 }, () => ({
      x: Math.random() * width,
      y: height * 0.45 + Math.random() * height * 0.55,
      len: 45 + Math.random() * 140,
      speed: 7 + Math.random() * 13,
      angle: 0.16 + Math.random() * 0.12,
      color:
        Math.random() < 0.45
          ? 'rgba(0, 212, 255,'
          : Math.random() < 0.78
            ? 'rgba(255, 196, 110,'
            : 'rgba(255, 42, 85,',
      alpha: 0.05 + Math.random() * 0.11,
      width: 0.8 + Math.random() * 1.4,
    }));

    let frameId = null;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (const s of streaks) {
        s.x -= s.speed;
        s.y += s.speed * s.angle;

        if (s.x + s.len < -40 || s.y > height + 40) {
          s.x = width + 40 + Math.random() * 260;
          s.y = height * 0.38 + Math.random() * height * 0.55;
        }

        const endX = s.x + s.len;
        const endY = s.y - s.len * s.angle;
        const grad = ctx.createLinearGradient(s.x, s.y, endX, endY);
        grad.addColorStop(0, `${s.color} 0)`);
        grad.addColorStop(0.5, `${s.color} ${s.alpha})`);
        grad.addColorStop(1, `${s.color} 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', onResize);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="supercar-bg-stage" aria-hidden="true">
      <div
        className="supercar-bg-parallax"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y + parallax.scrollShift}px, 0)`,
        }}
      >
        {SHOTS.map((shot, idx) => (
          <div
            key={shot.src}
            className={`supercar-shot ${shot.cls} ${idx === activeIndex ? 'supercar-shot--active' : ''}`}
            style={{ backgroundImage: `url(${shot.src})` }}
          />
        ))}
      </div>

      {/* Subtle realistic high-speed night bokeh light streaks */}
      <canvas ref={streakCanvasRef} className="supercar-streaks" />

      {/* Balanced dark cinematic tint so Lamborghini shines while text stays crystal-clear */}
      <div className="supercar-vignette" />
    </div>
  );
}
