import { Terminal, Layout, Server, Database, Cloud, BarChart3, Layers, Sparkles } from 'lucide-react';
import './Skills.css';

const skillGroups = [
  {
    category: 'Languages',
    icon: Terminal,
    color: '#7c4dff',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Java (Learning)'],
  },
  {
    category: 'Frontend Development',
    icon: Layout,
    color: '#00e676',
    skills: [
      'React.js',
      'Next.js',
      'Responsive Web Design',
      'Component-Based Architecture',
      'DOM Manipulation',
      'UI/UX',
    ],
  },
  {
    category: 'Backend Development',
    icon: Server,
    color: '#2979ff',
    skills: [
      'Node.js',
      'Express.js',
      'RESTful API Development',
      'Server-Side Rendering',
      'Middleware',
    ],
  },
  {
    category: 'Databases',
    icon: Database,
    color: '#ff4081',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'CRUD Operations', 'Schema Modeling'],
  },
  {
    category: 'Platforms & CMS',
    icon: Cloud,
    color: '#00d2ff',
    skills: ['Firebase', 'Vercel', 'Render', 'Shopify', 'WordPress', 'Wix Studio'],
  },
  {
    category: 'Analytics & Tools',
    icon: BarChart3,
    color: '#f59e0b',
    skills: [
      'Google Analytics 4 (GA4)',
      'Google Tag Manager (GTM)',
      'Meta Pixel',
      'Git & GitHub',
      'VS Code',
      'npm',
    ],
  },
];

const currentlyLearning = [
  'Java',
  'Machine Learning',
  'Artificial Intelligence',
  'Deep Learning',
];

const mernStackDetails = [
  {
    letter: 'M',
    name: 'MongoDB',
    subtitle: 'NoSQL Document Database',
    color: '#00e676',
    points: [
      'NoSQL document database storing JSON-like BSON records',
      'Schema modeling & CRUD operations for real-world apps',
      'Paired with Mongoose ODM in Node.js backends',
      'Complemented by SQL experience in MySQL & PostgreSQL',
    ],
  },
  {
    letter: 'E',
    name: 'Express.js',
    subtitle: 'Backend Web Framework',
    color: '#a0a0a0',
    points: [
      'Lightweight, flexible Node.js web framework',
      'RESTful API routing, middleware & structured error handling',
      'Seamless integration with MongoDB & cloud serverless functions',
    ],
  },
  {
    letter: 'R',
    name: 'React.js & Next.js',
    subtitle: 'Frontend UI & SSR',
    color: '#00d2ff',
    points: [
      'Component-based architecture with React Hooks & TypeScript',
      'Responsive UI/UX design & client-side routing',
      'Server-Side Rendering & production builds with Next.js',
    ],
  },
  {
    letter: 'N',
    name: 'Node.js',
    subtitle: 'JavaScript Server Runtime',
    color: '#4caf50',
    points: [
      'Non-blocking, event-driven server runtime',
      'Powers REST APIs, webhooks & serverless endpoints',
      'Deployed cleanly across Vercel & Render environments',
    ],
  },
];

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div data-reveal="fade-up">
          <p className="section-label">Skills</p>
          <h2 className="section-title">What I work with</h2>
        </div>

        <div className="skills__grid">
          {skillGroups.map((g, gi) => {
            const Icon = g.icon;
            return (
              <div
                key={g.category}
                className="skill-group glass-panel"
                data-reveal="fade-up"
                data-reveal-delay={String(gi * 75)}
              >
                <div className="skill-group__header" style={{ '--group-color': g.color }}>
                  <div className="skill-group__icon-wrapper">
                    <Icon size={18} className="skill-group__icon" />
                  </div>
                  <h3 className="skill-group__title">{g.category}</h3>
                </div>

                <div className="skill-group__tags">
                  {g.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-badge"
                      style={{ '--badge-color': g.color }}
                    >
                      <span className="skill-badge__dot" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="skills__mern glass-panel" data-reveal="fade-up" data-reveal-delay="80">
          <div className="skills__mern-header">
            <Layers size={20} className="skills__mern-icon" />
            <h3 className="skills__mern-title">MERN Stack Specialization</h3>
          </div>
          <div className="mern-details__grid">
            {mernStackDetails.map((item, idx) => (
              <div
                key={item.name}
                className="mern-card"
                style={{ '--tech-color': item.color }}
                data-reveal="zoom-in"
                data-reveal-delay={String(idx * 85)}
              >
                <div className="mern-card__badge-wrapper">
                  <span className="mern-card__letter">{item.letter}</span>
                </div>
                <div className="mern-card__content">
                  <h4 className="mern-card__title">{item.name}</h4>
                  <p className="mern-card__subtitle">{item.subtitle}</p>
                  <ul className="mern-card__list">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="mern-card__item">{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills__learning glass-panel" data-reveal="fade-up" data-reveal-delay="120">
          <div className="skills__learning-header">
            <Sparkles size={18} className="skills__learning-icon" />
            <span className="skills__learning-label">Currently Exploring & Learning</span>
          </div>
          <div className="skills__learning-tags">
            {currentlyLearning.map((topic) => (
              <span key={topic} className="learning-tag">
                <span className="learning-tag__dot" />
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
