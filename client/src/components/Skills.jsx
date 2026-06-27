import { Terminal, Layout, Database, Wrench, Layers } from 'lucide-react';
import './Skills.css';

const skillGroups = [
  {
    category: 'Languages & Core',
    icon: Terminal,
    color: '#7c4dff',
    skills: [
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'HTML5 & CSS3', level: 90 },
    ],
  },
  {
    category: 'Frontend Development',
    icon: Layout,
    color: '#00e676',
    skills: [
      { name: 'React.js & Hooks', level: 82 },
      { name: 'Responsive UI Design', level: 88 },
    ],
  },
  {
    category: 'Backend & Databases',
    icon: Database,
    color: '#2979ff',
    skills: [
      { name: 'Node.js', level: 78 },
      { name: 'Express.js', level: 78 },
      { name: 'MongoDB & Mongoose', level: 75 },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: Wrench,
    color: '#ff4081',
    skills: [
      { name: 'Git & GitHub Workflows', level: 80 },
      { name: 'VS Code & Debugging', level: 95 },
      { name: 'REST APIs & Postman', level: 80 },
    ],
  },
];

const mernStackDetails = [
  {
    letter: 'M',
    name: 'MongoDB',
    subtitle: 'NoSQL Document Database',
    color: '#00e676',
    points: [
      'NoSQL document database',
      'Stores data as JSON-like documents (BSON)',
      'Schema-less & highly scalable',
      'Used with Mongoose ODM in Node.js'
    ]
  },
  {
    letter: 'E',
    name: 'Express.js',
    subtitle: 'Backend Web Framework',
    color: '#a0a0a0',
    points: [
      'Lightweight Node.js web framework',
      'Handles routing, middleware, REST APIs',
      'Easy to integrate with MongoDB via Mongoose'
    ]
  },
  {
    letter: 'R',
    name: 'React.js',
    subtitle: 'Frontend UI Library',
    color: '#00d2ff',
    points: [
      'Frontend UI library by Meta',
      'Component-based architecture',
      'State management: useState, useEffect, Context API, Redux',
      'Tools: React Router, Axios, Tailwind CSS'
    ]
  },
  {
    letter: 'N',
    name: 'Node.js',
    subtitle: 'JavaScript Server Runtime',
    color: '#4caf50',
    points: [
      'JavaScript runtime on the server',
      'Non-blocking, event-driven architecture',
      'Powers the backend alongside Express'
    ]
  }
];

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <p className="section-label">Skills</p>
        <h2 className="section-title">What I work with</h2>

        <div className="skills__grid">
          {skillGroups.map((g, gi) => {
            const Icon = g.icon;
            return (
              <div key={g.category} className="skill-group glass-panel animate-fadeUp" style={{ animationDelay: `${gi * 0.1}s` }}>
                <div className="skill-group__header" style={{ '--group-color': g.color }}>
                  <div className="skill-group__icon-wrapper">
                    <Icon size={18} className="skill-group__icon" />
                  </div>
                  <h3 className="skill-group__title">{g.category}</h3>
                </div>
                
                <div className="skill-group__tags">
                  {g.skills.map(s => (
                    <span key={s.name} className="skill-badge" style={{ '--badge-color': g.color }}>
                      {s.name}
                      <span className="skill-badge__pct">{s.level}%</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="skills__mern glass-panel animate-fadeUp">
          <div className="skills__mern-header">
            <Layers size={20} className="skills__mern-icon" />
            <h3 className="skills__mern-title">MERN Stack Specialization</h3>
          </div>
          <div className="mern-details__grid">
            {mernStackDetails.map((item, idx) => (
              <div key={item.name} className="mern-card" style={{ '--tech-color': item.color }}>
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
      </div>
    </section>
  );
}
