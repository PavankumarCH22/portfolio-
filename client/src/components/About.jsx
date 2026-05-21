import { GraduationCap, MapPin, Layers, Cpu, Mail, Github, Linkedin } from 'lucide-react';
import './About.css';

const highlights = [
  { icon: GraduationCap, label: 'B.Tech AI (CSE)', sub: 'PIET, 2023–2027', color: 'accent' },
  { icon: MapPin, label: 'Visakhapatnam', sub: 'Andhra Pradesh, IN', color: 'green' },
  { icon: Layers, label: 'MERN Stack', sub: 'Full-Stack Developer', color: 'blue' },
  { icon: Cpu, label: 'AI/ML Explorer', sub: 'Deep Learning & ML', color: 'pink' },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <p className="section-label">About me</p>
            <h2 className="section-title">
              A developer who loves<br />
              solving real problems.
            </h2>
            
            <p className="about__text">
              I'm a B.Tech Artificial Intelligence student at Parul Institute of Engineering &
              Technology, currently in my second year (2023–2027). My coding journey began with a deep curiosity about how software and algorithms shape our daily lives. Now, I build full-stack web applications that are highly functional, clean, and accessible.
            </p>
            
            <p className="about__text">
              Outside of classes, I have independently researched, built, and shipped complex MERN applications from scratch, taking responsibility for the database structures, security protocols, and deployments. I'm actively expanding my horizons into advanced Java architectures, machine learning models, and building AI-integrated SaaS products.
            </p>

            <div className="about__links">
              <a href="mailto:pavankumarch326@gmail.com" className="about__link">
                <Mail size={16} />
                <span>pavankumarch326@gmail.com</span>
              </a>
              <a href="https://github.com/PavankumarCH22" target="_blank" rel="noreferrer" className="about__link">
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="about__link">
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="about__highlights">
            {highlights.map((h, i) => {
              const IconComponent = h.icon;
              return (
                <div key={h.label} className={`highlight-card highlight-card--${h.color} animate-fadeUp delay-${i + 1}`}>
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
    </section>
  );
}
