import './Skills.css';

const skillGroups = [
  {
    category: 'Languages & Core',
    color: 'accent',
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Java', level: 45 },
    ],
  },
  {
    category: 'Frontend',
    color: 'green',
    skills: [
      { name: 'React.js', level: 82 },
      { name: 'Responsive Design', level: 88 },
    ],
  },
  {
    category: 'Backend & DB',
    color: 'amber',
    skills: [
      { name: 'Node.js', level: 78 },
      { name: 'Express.js', level: 78 },
      { name: 'MongoDB', level: 75 },
    ],
  },
  {
    category: 'Tools',
    color: 'pink',
    skills: [
      { name: 'Git & GitHub', level: 80 },
      { name: 'VS Code', level: 95 },
      { name: 'REST APIs', level: 80 },
    ],
  },
];

const colorMap = {
  accent: '#6c63ff',
  green: '#3ecf8e',
  amber: '#f59e0b',
  pink: '#ec4899',
};

const learning = ['Machine Learning', 'Artificial Intelligence', 'Java (Advanced)', 'DSA'];

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <p className="section-label">Skills</p>
        <h2 className="section-title">What I work with</h2>

        <div className="skills__grid">
          {skillGroups.map(g => (
            <div key={g.category} className="skill-group">
              <h3 className="skill-group__title" style={{ color: colorMap[g.color] }}>
                {g.category}
              </h3>
              <div className="skill-group__bars">
                {g.skills.map(s => (
                  <div key={s.name} className="skill-bar">
                    <div className="skill-bar__header">
                      <span className="skill-bar__name">{s.name}</span>
                      <span className="skill-bar__pct">{s.level}%</span>
                    </div>
                    <div className="skill-bar__track">
                      <div
                        className="skill-bar__fill"
                        style={{
                          '--fill-width': `${s.level}%`,
                          '--fill-color': colorMap[g.color],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills__learning">
          <p className="skills__learning-label">Currently learning</p>
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
