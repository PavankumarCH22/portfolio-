import { useState, useEffect } from 'react';
import { ChevronRight, Play, RefreshCw, Terminal, Check } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [terminalStatus, setTerminalStatus] = useState('idle'); // idle | running | success
  const [activeTab, setActiveTab] = useState('pavan.js');

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const runCodeLogs = [
    { text: 'initializing developer environment...', delay: 400 },
    { text: 'loading tech stack: React.js, Next.js, TypeScript, Node.js, MongoDB...', delay: 800 },
    { text: 'loading production builds: IntelliHire AI & Kandanavolu Paakashala...', delay: 1200 },
    { text: 'status: MERN backend & cloud deployments verified ✓', delay: 1600 },
    { text: 'loading experience: Full Stack Development Intern @ Thiranex...', delay: 2000 },
    { text: 'success: portfolio live at https://pavankumarchakali.vercel.app', delay: 2400 },
    { text: '> pavan.status: "Seeking Front-End or Full-Stack Developer roles 🚀"', delay: 2800 },
    { text: '> pavan.location: "Visakhapatnam, Andhra Pradesh, India 📍"', delay: 3200 },
    { text: '> pavan.message: "Let\'s collaborate! Email: pavankumarch326@gmail.com"', delay: 3600 }
  ];

  const handleRunCode = () => {
    if (terminalStatus === 'running') return;
    setActiveTab('terminal');
    setTerminalStatus('running');
    setTerminalOutput([]);

    runCodeLogs.forEach((log) => {
      setTimeout(() => {
        setTerminalOutput((prev) => [...prev, log.text]);
        if (log.text.startsWith('> pavan.message')) {
          setTerminalStatus('success');
        }
      }, log.delay);
    });
  };

  const handleResetTerminal = () => {
    setTerminalStatus('idle');
    setTerminalOutput([]);
    setActiveTab('pavan.js');
  };

  return (
    <section className="hero" id="hero">
      {/* Dynamic Amethyst & Emerald Glow Blobs */}
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
      <div className="hero__glow hero__glow--3" />

      <div className="container hero__grid">
        <div className="hero__content">
          <div className="hero__badge animate-fadeUp">
            <span className="hero__status-dot" />
            Open to Front-End & Full-Stack roles
          </div>

          <h1 className="hero__title animate-fadeUp delay-1">
            Hi, I'm <span className="hero__title--gradient">Pavan Kumar</span><br />
            <span className="hero__title--accent">Front-End & MERN</span> Developer.
          </h1>

          <p className="hero__sub animate-fadeUp delay-2">
            B.Tech AI & Computer Science student from Visakhapatnam, India. Experienced in building and deploying production web applications with React, Next.js, TypeScript, and the MERN stack — from AI-powered hiring platforms to live business websites.
          </p>

          <div className="hero__actions animate-fadeUp delay-3">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>
              Explore Projects
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </button>
            <button className="btn-outline" onClick={() => scrollTo('contact')}>
              Let's Talk
            </button>
          </div>

          <div className="hero__stack animate-fadeUp delay-4">
            {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'].map(t => (
              <span key={t} className="hero__tag">{t}</span>
            ))}
          </div>

          <div className="hero__metrics animate-fadeUp delay-5">
            <div className="hero__metric">
              <span className="hero__metric-val">4+</span>
              <span className="hero__metric-label">Deployed Projects</span>
            </div>
            <div className="hero__metric-divider" />
            <div className="hero__metric">
              <span className="hero__metric-val">Thiranex</span>
              <span className="hero__metric-label">Full-Stack Intern</span>
            </div>
            <div className="hero__metric-divider" />
            <div className="hero__metric">
              <span className="hero__metric-val">MERN + AI</span>
              <span className="hero__metric-label">B.Tech CSE (AI)</span>
            </div>
          </div>
        </div>

        {/* Premium VS Code Interactive Terminal Card */}
        <div className="hero__terminal-wrapper animate-fadeUp delay-2">
          <div className="hero__terminal glass-panel">
            <div className="terminal__header">
              <div className="terminal__dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="terminal__tabs">
                <button 
                  className={`terminal__tab ${activeTab === 'pavan.js' ? 'terminal__tab--active' : ''}`}
                  onClick={() => setActiveTab('pavan.js')}
                >
                  <span className="tab-js-icon">JS</span> pavan.js
                </button>
                <button 
                  className={`terminal__tab ${activeTab === 'terminal' ? 'terminal__tab--active' : ''}`}
                  onClick={() => setActiveTab('terminal')}
                >
                  <Terminal size={12} className="tab-term-icon" /> Terminal
                </button>
              </div>
            </div>

            <div className="terminal__body">
              {activeTab === 'pavan.js' ? (
                <div className="terminal__code">
                  <pre>
                    <code>
<span className="k">const</span> pavan <span className="o">=</span> &#123;<br />
&nbsp;&nbsp;role<span className="o">:</span> <span className="s">"Front-End & Full-Stack MERN Developer"</span>,<br />
&nbsp;&nbsp;education<span className="o">:</span> <span className="s">"B.Tech AI & CSE (PIET, 2023–2027)"</span>,<br />
&nbsp;&nbsp;experience<span className="o">:</span> <span className="s">"Full Stack Intern @ Thiranex"</span>,<br />
&nbsp;&nbsp;location<span className="o">:</span> <span className="s">"Visakhapatnam, IN"</span>,<br />
&nbsp;&nbsp;skills<span className="o">:</span> [<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"React"</span>, <span className="s">"Next.js"</span>, <span className="s">"TypeScript"</span>, <span className="s">"Node"</span>, <span className="s">"MongoDB"</span><br />
&nbsp;&nbsp;],<br />
&nbsp;&nbsp;status<span className="o">:</span> <span className="s">"Seeking Front-End / Full-Stack roles 🚀"</span><br />
&#125;;<br />
<br />
<span className="c">// Click run to compile and run developer instance</span><br />
console.<span className="v">log</span>(pavan);
                    </code>
                  </pre>
                  
                  <div className="terminal__run-bar">
                    <button 
                      className={`btn-run ${terminalStatus === 'running' ? 'btn-run--loading' : ''}`}
                      onClick={handleRunCode}
                      disabled={terminalStatus === 'running'}
                    >
                      <Play size={14} fill="currentColor" /> Run Code
                    </button>
                  </div>
                </div>
              ) : (
                <div className="terminal__console">
                  <div className="console__prompt">
                    <span className="console__dir">~/pavan-portfolio</span>
                    <span className="console__branch">git:(main)</span>
                    <span className="console__symbol">$</span> node pavan.js<span className="terminal-cursor" />
                  </div>
                  
                  <div className="console__outputs">
                    {terminalOutput.map((out, idx) => (
                      <div 
                        key={idx} 
                        className={`console__line ${out.startsWith('success') || out.startsWith('status') ? 'console__line--success' : out.startsWith('>') ? 'console__line--data' : ''}`}
                      >
                        {out.startsWith('>') ? (
                          <>
                            <ChevronRight size={12} className="console__line-arrow" />
                            <span>{out.substring(2)}</span>
                          </>
                        ) : (
                          out
                        )}
                      </div>
                    ))}
                    
                    {terminalStatus === 'running' && (
                      <div className="console__spinner-line">
                        <RefreshCw size={14} className="console__spinner" /> Running compiler...
                      </div>
                    )}
                  </div>

                  {terminalStatus === 'success' && (
                    <div className="console__actions">
                      <button className="btn-console-reset" onClick={handleResetTerminal}>
                        <Check size={14} /> Done
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll animate-fadeUp delay-5">
        <div className="hero__scroll-line" />
        <span>Scroll down</span>
      </div>
    </section>
  );
}
