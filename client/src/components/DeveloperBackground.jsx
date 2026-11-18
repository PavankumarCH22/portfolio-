import { useEffect, useRef } from 'react';

const CODE_TOKENS = [
  { text: 'const stack = ["MERN", "AI"];', top: '10%', left: '4%', color: 'cyan' },
  { text: '</>', top: '18%', right: '6%', color: 'violet' },
  { text: 'async () => await deploy()', top: '44%', left: '3%', color: 'emerald' },
  { text: 'git commit -m "ship"', top: '62%', right: '4%', color: 'pink' },
  { text: '{ status: 200, ok: true }', top: '80%', left: '7%', color: 'amber' },
  { text: 'npm run build ✓', top: '72%', right: '18%', color: 'emerald' },
];

export default function DeveloperBackground() {
  const canvasRef = useRef(null);
  const spotlightRef = useRef(null);
  const systemStageRef = useRef(null);
  const tokensRef = useRef(null);

  // Smooth interactive cursor spotlight + 3D parallax for the animated computer system
  useEffect(() => {
    const spotlight = spotlightRef.current;
    const systemStage = systemStageRef.current;
    const tokens = tokensRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let frameId = null;
    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.38;
    let scrollY = window.scrollY;

    const update = () => {
      const normX = mouseX / Math.max(1, window.innerWidth) - 0.5;
      const normY = mouseY / Math.max(1, window.innerHeight) - 0.5;

      if (spotlight) {
        spotlight.style.background = `radial-gradient(640px circle at ${mouseX}px ${mouseY}px, rgba(0, 229, 255, 0.14), rgba(139, 92, 246, 0.09) 38%, rgba(244, 63, 94, 0.04) 58%, transparent 74%)`;
      }
      if (systemStage) {
        const shiftY = Math.max(-70, scrollY * -0.045);
        const rx = (-normY * 6).toFixed(2);
        const ry = (normX * 8).toFixed(2);
        const tx = (-normX * 16).toFixed(1);
        systemStage.style.transform = `translate3d(${tx}px, ${shiftY}px, 0) perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      if (tokens) {
        const shiftY = Math.max(-110, scrollY * -0.07);
        tokens.style.transform = `translate3d(0, ${shiftY}px, 0)`;
      }
      frameId = null;
    };

    const schedule = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      schedule();
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      schedule();
    };

    update();
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  // Vibrant Multi-Color AI Neural Network + Circuit Grid Data-Beam Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const gridSize = 64;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const nodeCount = width < 768 ? 32 : 56;
    const maxDist = width < 768 ? 140 : 185;
    const palette = [
      { r: 0, g: 229, b: 255 },   // electric cyan
      { r: 168, g: 85, b: 247 },  // vivid violet
      { r: 16, g: 230, b: 148 },  // bright emerald
      { r: 244, g: 63, b: 142 },  // neon rose-pink
      { r: 251, g: 191, b: 36 },  // warm amber
    ];

    const nodes = Array.from({ length: nodeCount }, (_, idx) => {
      const col = palette[idx % palette.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.58,
        vy: (Math.random() - 0.5) * 0.58,
        radius: 1.8 + Math.random() * 2,
        color: col,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const createBeam = () => {
      const horizontal = Math.random() > 0.45;
      const col = palette[Math.floor(Math.random() * palette.length)];
      if (horizontal) {
        const row = Math.floor(Math.random() * Math.ceil(height / gridSize));
        return {
          horizontal: true,
          x: -160 - Math.random() * 240,
          y: row * gridSize,
          len: 100 + Math.random() * 140,
          speed: 2.3 + Math.random() * 2.4,
          color: col,
        };
      }
      const colIdx = Math.floor(Math.random() * Math.ceil(width / gridSize));
      return {
        horizontal: false,
        x: colIdx * gridSize,
        y: -160 - Math.random() * 240,
        len: 100 + Math.random() * 140,
        speed: 2.1 + Math.random() * 2.2,
        color: col,
      };
    };

    const gridBeams = Array.from({ length: width < 768 ? 6 : 11 }, createBeam);
    const pulses = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    let frameId = null;
    let isHidden = document.hidden;

    const onVisibility = () => {
      isHidden = document.hidden;
    };

    let tickCount = 0;

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      tickCount += 1;

      if (!reducedMotion) {
        for (let i = 0; i < gridBeams.length; i += 1) {
          const b = gridBeams[i];
          const { r, g, b: bl } = b.color;

          if (b.horizontal) {
            b.x += b.speed;
            const grad = ctx.createLinearGradient(b.x, b.y, b.x + b.len, b.y);
            grad.addColorStop(0, `rgba(${r}, ${g}, ${bl}, 0)`);
            grad.addColorStop(0.7, `rgba(${r}, ${g}, ${bl}, 0.4)`);
            grad.addColorStop(1, `rgba(255, 255, 255, 0.7)`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(b.x + b.len, b.y);
            ctx.stroke();

            if (b.x > width + 60) gridBeams[i] = createBeam();
          } else {
            b.y += b.speed;
            const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.len);
            grad.addColorStop(0, `rgba(${r}, ${g}, ${bl}, 0)`);
            grad.addColorStop(0.7, `rgba(${r}, ${g}, ${bl}, 0.38)`);
            grad.addColorStop(1, `rgba(255, 255, 255, 0.65)`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(b.x, b.y + b.len);
            ctx.stroke();

            if (b.y > height + 60) gridBeams[i] = createBeam();
          }
        }
      }

      for (const n of nodes) {
        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];

        if (mouse.active) {
          const mdx = mouse.x - a.x;
          const mdy = mouse.y - a.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 210) {
            const alpha = (1 - mdist / 210) * 0.38;
            const { r, g, b } = a.color;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${alpha.toFixed(3)})`);
            grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha.toFixed(3)})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            if (!reducedMotion && pulses.length < 16 && tickCount % 15 === 0 && Math.random() < 0.08) {
              pulses.push({
                from: a,
                to: b,
                t: 0,
                speed: 0.015 + Math.random() * 0.014,
                color: a.color,
              });
            }
          }
        }
      }

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const px = p.from.x + (p.to.x - p.from.x) * p.t;
        const py = p.from.y + (p.to.y - p.from.y) * p.t;
        const glow = Math.sin(p.t * Math.PI);
        const { r, g, b } = p.color;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(glow * 0.38).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, 6.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${(glow * 0.92).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        const pulse = reducedMotion ? 0.75 : 0.54 + 0.36 * Math.sin(tickCount * 0.028 + n.phase);
        const { r, g, b } = n.color;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(pulse * 0.25).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pulse.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!isHidden) drawFrame();
      if (!reducedMotion) frameId = window.requestAnimationFrame(loop);
    };

    drawFrame();
    if (!reducedMotion) frameId = window.requestAnimationFrame(loop);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="dev-bg-stage" aria-hidden="true">
      {/* Vibrant multi-color drifting developer aurora waves */}
      <div className="dev-bg-aurora dev-bg-aurora--primary" />
      <div className="dev-bg-aurora dev-bg-aurora--secondary" />
      <div className="dev-bg-aurora dev-bg-aurora--emerald" />
      <div className="dev-bg-aurora dev-bg-aurora--pink" />

      {/* Crisp engineering coordinate grid & dot matrix */}
      <div className="dev-bg-grid" />
      <div className="dev-bg-dots" />

      {/* Interactive vibrant AI neural network + circuit-trace light beams */}
      <canvas ref={canvasRef} className="dev-bg-network" />

      {/* Animated Glowing Developer Computer System / Dual-Monitor Workstation */}
      <div ref={systemStageRef} className="dev-system-scene">
        <svg
          className="dev-system-svg"
          viewBox="0 0 1100 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sysFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10e694" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="sysScreenBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c1934" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#050b18" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="sysGlowFloor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
              <stop offset="25%" stopColor="#00e5ff" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.65" />
              <stop offset="75%" stopColor="#f43f8e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10e694" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sysScanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="mainScreenClip">
              <rect x="275" y="106" width="540" height="314" rx="10" />
            </clipPath>
            <clipPath id="sideScreenClip">
              <rect x="852" y="144" width="176" height="276" rx="10" />
            </clipPath>
            <clipPath id="leftHudClip">
              <rect x="76" y="164" width="164" height="248" rx="10" />
            </clipPath>
          </defs>

          {/* Desk Horizon RGB Light Bar */}
          <rect x="110" y="516" width="880" height="4" rx="2" fill="url(#sysGlowFloor)" className="sys-rgb-bar" />
          <ellipse cx="550" cy="534" rx="390" ry="26" fill="url(#sysGlowFloor)" opacity="0.24" />

          {/* Left Holographic CPU / System Telemetry Monitor */}
          <g className="sys-monitor sys-monitor--left">
            <rect x="68" y="156" width="180" height="264" rx="14" fill="url(#sysScreenBg)" stroke="url(#sysFrameGrad)" strokeWidth="2" />
            <g clipPath="url(#leftHudClip)">
              <circle cx="92" cy="178" r="3.5" fill="#f43f8e" />
              <circle cx="105" cy="178" r="3.5" fill="#fbbf24" />
              <circle cx="118" cy="178" r="3.5" fill="#10e694" />
              <text x="134" y="182" fill="#7dd3fc" fontSize="9.5" fontFamily="monospace" opacity="0.85">SYS_MON</text>

              {/* Animated CPU / GPU / RAM Bars */}
              <text x="90" y="212" fill="#38bdf8" fontSize="9" fontFamily="monospace">CPU</text>
              <rect x="90" y="218" width="136" height="7" rx="3.5" fill="#1e293b" />
              <rect x="90" y="218" width="102" height="7" rx="3.5" fill="#00e5ff" className="sys-bar sys-bar--1" />

              <text x="90" y="246" fill="#c084fc" fontSize="9" fontFamily="monospace">AI_NPU</text>
              <rect x="90" y="252" width="136" height="7" rx="3.5" fill="#1e293b" />
              <rect x="90" y="252" width="118" height="7" rx="3.5" fill="#a855f7" className="sys-bar sys-bar--2" />

              <text x="90" y="280" fill="#34d399" fontSize="9" fontFamily="monospace">MEM</text>
              <rect x="90" y="286" width="136" height="7" rx="3.5" fill="#1e293b" />
              <rect x="90" y="286" width="84" height="7" rx="3.5" fill="#10e694" className="sys-bar sys-bar--3" />

              {/* Animated Waveform */}
              <polyline
                className="sys-wave"
                points="88,358 104,344 118,364 134,330 150,356 168,324 184,352 200,336 224,348"
                stroke="#00e5ff"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                className="sys-wave sys-wave--2"
                points="88,378 106,368 124,384 142,360 162,380 182,356 202,374 224,366"
                stroke="#f43f8e"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </g>
            {/* Left stand */}
            <path d="M148 420 L148 468 M120 468 L176 468" stroke="url(#sysFrameGrad)" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          </g>

          {/* Center Main Ultrawide Developer Monitor */}
          <g className="sys-monitor sys-monitor--main">
            {/* Outer Bezel */}
            <rect x="262" y="92" width="566" height="342" rx="18" fill="url(#sysScreenBg)" stroke="url(#sysFrameGrad)" strokeWidth="2.6" />
            {/* Inner Screen */}
            <g clipPath="url(#mainScreenClip)">
              {/* IDE Top Bar */}
              <rect x="275" y="106" width="540" height="28" fill="#0f1c38" opacity="0.9" />
              <circle cx="294" cy="120" r="4.5" fill="#f43f8e" />
              <circle cx="310" cy="120" r="4.5" fill="#fbbf24" />
              <circle cx="326" cy="120" r="4.5" fill="#10e694" />
              <rect x="352" y="114" width="96" height="12" rx="4" fill="#1e3a5f" />
              <rect x="458" y="114" width="80" height="12" rx="4" fill="#172554" />
              <circle cx="786" cy="120" r="4" fill="#10e694" className="sys-led-blink" />

              {/* Left Sidebar File Tree */}
              <rect x="275" y="134" width="92" height="286" fill="#091326" opacity="0.88" />
              <rect x="290" y="152" width="54" height="6" rx="3" fill="#38bdf8" opacity="0.7" />
              <rect x="296" y="170" width="46" height="5" rx="2.5" fill="#94a3b8" opacity="0.45" />
              <rect x="296" y="186" width="58" height="5" rx="2.5" fill="#a855f7" opacity="0.75" />
              <rect x="296" y="202" width="40" height="5" rx="2.5" fill="#94a3b8" opacity="0.45" />
              <rect x="296" y="218" width="52" height="5" rx="2.5" fill="#10e694" opacity="0.75" />
              <rect x="296" y="234" width="44" height="5" rx="2.5" fill="#94a3b8" opacity="0.45" />
              <rect x="296" y="250" width="56" height="5" rx="2.5" fill="#f43f8e" opacity="0.65" />

              {/* Animated Scrolling Syntax-Highlighted Code Lines */}
              <g className="sys-code-scroll">
                <rect x="386" y="154" width="74" height="7" rx="3.5" fill="#c084fc" />
                <rect x="470" y="154" width="110" height="7" rx="3.5" fill="#38bdf8" />
                <rect x="590" y="154" width="66" height="7" rx="3.5" fill="#fbbf24" />

                <rect x="404" y="176" width="96" height="7" rx="3.5" fill="#10e694" />
                <rect x="510" y="176" width="142" height="7" rx="3.5" fill="#94a3b8" opacity="0.65" />

                <rect x="404" y="198" width="62" height="7" rx="3.5" fill="#f43f8e" />
                <rect x="476" y="198" width="128" height="7" rx="3.5" fill="#38bdf8" />
                <rect x="614" y="198" width="84" height="7" rx="3.5" fill="#c084fc" />

                <rect x="422" y="220" width="160" height="7" rx="3.5" fill="#fbbf24" opacity="0.88" />
                <rect x="592" y="220" width="94" height="7" rx="3.5" fill="#10e694" />

                <rect x="422" y="242" width="88" height="7" rx="3.5" fill="#38bdf8" />
                <rect x="520" y="242" width="154" height="7" rx="3.5" fill="#f43f8e" opacity="0.82" />

                <rect x="404" y="264" width="120" height="7" rx="3.5" fill="#c084fc" />
                <rect x="534" y="264" width="98" height="7" rx="3.5" fill="#10e694" />

                <rect x="386" y="286" width="66" height="7" rx="3.5" fill="#38bdf8" />
                <rect x="462" y="286" width="188" height="7" rx="3.5" fill="#94a3b8" opacity="0.6" />

                <rect x="404" y="308" width="136" height="7" rx="3.5" fill="#10e694" />
                <rect x="550" y="308" width="112" height="7" rx="3.5" fill="#fbbf24" />
                <rect x="670" y="307" width="8" height="10" rx="1" fill="#00e5ff" className="sys-cursor-blink" />
              </g>

              {/* Bottom Integrated Terminal Strip */}
              <rect x="367" y="346" width="448" height="74" fill="#060d1d" opacity="0.92" />
              <line x1="367" y1="346" x2="815" y2="346" stroke="#38bdf8" strokeOpacity="0.3" />
              <text x="384" y="368" fill="#10e694" fontSize="10.5" fontFamily="monospace">$ vite build --mode production</text>
              <text x="384" y="388" fill="#7dd3fc" fontSize="10.5" fontFamily="monospace">✓ modules bundled · AI &amp; MERN online</text>
              <text x="384" y="406" fill="#c084fc" fontSize="10.5" fontFamily="monospace">&gt; listening on localhost:5173 _</text>

              {/* Animated Holographic Scan Beam */}
              <rect x="275" y="106" width="540" height="44" fill="url(#sysScanGrad)" className="sys-scanline" />
            </g>

            {/* Monitor Neck & Base Stand */}
            <path d="M518 434 L506 492 L584 492 L572 434 Z" fill="#0b152a" stroke="url(#sysFrameGrad)" strokeWidth="2" />
            <rect x="454" y="492" width="182" height="10" rx="5" fill="#0d1b36" stroke="url(#sysFrameGrad)" strokeWidth="1.8" />
          </g>

          {/* Right Vertical Coding & Server Terminal Monitor */}
          <g className="sys-monitor sys-monitor--right">
            <rect x="844" y="136" width="192" height="292" rx="14" fill="url(#sysScreenBg)" stroke="url(#sysFrameGrad)" strokeWidth="2" />
            <g clipPath="url(#sideScreenClip)">
              <text x="868" y="168" fill="#c084fc" fontSize="10" fontFamily="monospace">API_CLUSTER</text>
              <circle cx="1008" cy="164" r="4" fill="#10e694" className="sys-led-blink" />

              {/* Animated Server Rack Status Pills */}
              <rect x="868" y="186" width="144" height="26" rx="6" fill="#0f1e3a" stroke="#38bdf8" strokeOpacity="0.45" />
              <circle cx="882" cy="199" r="3.5" fill="#00e5ff" className="sys-led-blink" />
              <rect x="896" y="196" width="76" height="6" rx="3" fill="#38bdf8" opacity="0.8" />

              <rect x="868" y="224" width="144" height="26" rx="6" fill="#0f1e3a" stroke="#a855f7" strokeOpacity="0.45" />
              <circle cx="882" cy="237" r="3.5" fill="#a855f7" className="sys-led-blink" />
              <rect x="896" y="234" width="92" height="6" rx="3" fill="#c084fc" opacity="0.8" />

              <rect x="868" y="262" width="144" height="26" rx="6" fill="#0f1e3a" stroke="#10e694" strokeOpacity="0.45" />
              <circle cx="882" cy="275" r="3.5" fill="#10e694" className="sys-led-blink" />
              <rect x="896" y="272" width="64" height="6" rx="3" fill="#34d399" opacity="0.8" />

              {/* Animated Circular AI Core Ring */}
              <circle cx="940" cy="354" r="36" stroke="#1e293b" strokeWidth="5" />
              <circle cx="940" cy="354" r="36" stroke="#00e5ff" strokeWidth="4" strokeDasharray="70 160" strokeLinecap="round" className="sys-ring-spin" />
              <circle cx="940" cy="354" r="24" stroke="#f43f8e" strokeWidth="3" strokeDasharray="44 110" strokeLinecap="round" className="sys-ring-spin-rev" />
              <circle cx="940" cy="354" r="7" fill="#10e694" className="sys-led-blink" />
            </g>
            <path d="M940 428 L940 472 M912 472 L968 472" stroke="url(#sysFrameGrad)" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          </g>

          {/* Futuristic Glowing RGB Mechanical Keyboard & Mouse */}
          <g className="sys-keyboard">
            <polygon points="366,536 704,536 728,576 342,576" fill="#091326" stroke="url(#sysFrameGrad)" strokeWidth="1.8" />
            <rect x="380" y="544" width="310" height="6" rx="3" fill="#00e5ff" opacity="0.45" className="sys-rgb-bar" />
            <rect x="372" y="555" width="326" height="6" rx="3" fill="#a855f7" opacity="0.45" className="sys-rgb-bar" />
            <rect x="424" y="565" width="218" height="6" rx="3" fill="#10e694" opacity="0.5" className="sys-rgb-bar" />
            {/* Glowing Mouse */}
            <rect x="758" y="544" width="34" height="28" rx="14" fill="#091326" stroke="#f43f8e" strokeWidth="1.8" />
            <line x1="775" y1="548" x2="775" y2="556" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Syntax-colored floating monospace code snippets */}
      <div ref={tokensRef} className="dev-bg-tokens">
        {CODE_TOKENS.map((item, idx) => (
          <span
            key={idx}
            className={`dev-bg-token dev-bg-token--${item.color}`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animationDelay: `${idx * 1.05}s`,
            }}
          >
            {item.text}
          </span>
        ))}
      </div>

      {/* Interactive multi-tone cursor spotlight */}
      <div ref={spotlightRef} className="dev-bg-spotlight" />

      {/* Balanced edge vignette so foreground typography & cards stay ultra-sharp */}
      <div className="dev-bg-vignette" />
    </div>
  );
}
