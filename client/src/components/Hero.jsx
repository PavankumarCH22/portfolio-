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
    { text: 'loading tech stack dependencies...', delay: 800 },
    { text: 'connecting to database: mongodb://localhost:27017/portfolio...', delay: 1200 },
    { text: 'status: MERN backend connected successfully ✓', delay: 1600 },
    { text: 'compiling portfolio assets with Vite...', delay: 2000 },
    { text: 'success: dev server running at http://localhost:5173', delay: 2400 },
    { text: '> pavan.status: "actively building beautiful web apps! 🚀"', delay: 2800 },
    { text: '> pavan.location: "Visakhapatnam, Andhra Pradesh, India 📍"', delay: 3200 },
    { text: '> pavan.message: "Let\'s collaborate! Drop me an email: pavankumarch326@gmail.com"', delay: 3600 }
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
            Available for developer roles
          </div>

          <h1 className="hero__title animate-fadeUp delay-1">
            Hi, I'm <span className="hero__title--gradient">Pavan Kumar</span><br />
            <span className="hero__title--accent">MERN Stack</span> Developer.
          </h1>

          <p className="hero__sub animate-fadeUp delay-2">
            A B.Tech Artificial Intelligence student from Visakhapatnam, India. I specialize in crafting robust full-stack web applications and exploring intelligence models.
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
            {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AI/ML', 'Java'].map(t => (
              <span key={t} className="hero__tag">{t}</span>
            ))}
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
&nbsp;&nbsp;role<span className="o">:</span> <span className="s">"Full-Stack MERN Developer"</span>,<br />
&nbsp;&nbsp;education<span className="o">:</span> <span className="s">"B.Tech in Artificial Intelligence"</span>,<br />
&nbsp;&nbsp;location<span className="o">:</span> <span className="s">"Visakhapatnam, IN"</span>,<br />
&nbsp;&nbsp;skills<span className="o">:</span> [<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"React"</span>, <span className="s">"Node"</span>, <span className="s">"Express"</span>, <span className="s">"MongoDB"</span><br />
&nbsp;&nbsp;],<br />
&nbsp;&nbsp;learning<span className="o">:</span> [<span className="s">"Machine Learning"</span>, <span className="s">"DSA"</span>, <span className="s">"Java"</span>],<br />
&nbsp;&nbsp;status<span className="o">:</span> <span className="s">"Open to new opportunities 🚀"</span><br />
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
                    <span className="console__symbol">$</span> node pavan.js
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
