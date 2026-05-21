import { Terminal, Layout, Database, Wrench, Sparkles } from 'lucide-react';
import './Skills.css';

const skillGroups = [
  {
    category: 'Languages & Core',
    icon: Terminal,
    color: '#7c4dff',
    skills: [
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'Java', level: 60 },
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

const learning = [
  'Machine Learning Models',
  'Neural Networks & AI',
  'Advanced Data Structures',
  'Advanced Java (Spring Boot)'
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

        <div className="skills__learning glass-panel animate-fadeUp">
          <div className="skills__learning-header">
            <Sparkles size={16} className="skills__learning-icon" />
            <p className="skills__learning-label">Currently exploring & learning</p>
          </div>
          <div className="skills__learning-tags">
            {learning.map(l => (
              <span key={l} className="learning-tag">
                <span className="learning-tag__dot" />
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
