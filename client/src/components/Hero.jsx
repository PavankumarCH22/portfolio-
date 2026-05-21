import './Hero.css';

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      {/* Decorative glow blobs */}
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <div className="container hero__inner">
        <div className="hero__badge animate-fadeUp">
          <span className="hero__status-dot" />
          Available for opportunities
        </div>

        <h1 className="hero__title animate-fadeUp delay-1">
          Building the web,<br />
          <span className="hero__title--accent">one commit</span> at a time.
        </h1>

        <p className="hero__sub animate-fadeUp delay-2">
          Hi, I'm <strong>Pavan Kumar Chakali</strong> — a B.Tech AI student & MERN stack developer
          from Visakhapatnam. I craft fast, responsive, and user-focused web applications.
        </p>

        <div className="hero__actions animate-fadeUp delay-3">
          <button className="btn-primary" onClick={() => scrollTo('projects')}>
            See my work
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </button>
          <button className="btn-outline" onClick={() => scrollTo('contact')}>
            Get in touch
          </button>
        </div>

        <div className="hero__stack animate-fadeUp delay-4">
          {['MongoDB', 'Express.js', 'React', 'Node.js'].map(t => (
            <span key={t} className="hero__tag">{t}</span>
          ))}
        </div>

        <div className="hero__scroll animate-fadeUp delay-5">
          <div className="hero__scroll-line" />
          <span>scroll</span>
        </div>
      </div>

      {/* Floating code card */}
      <div className="hero__code-card animate-fadeUp delay-3">
        <div className="code-card__dots">
          <span /><span /><span />
        </div>
        <pre className="code-card__body">
{`const pavan = {
  role: "Full-Stack Dev",
  stack: ["MERN"],
  learning: ["AI/ML", "Java"],
  status: "open to work 🚀"
};`}
        </pre>
      </div>
    </section>
  );
}
