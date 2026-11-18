import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    role: 'Full Stack Development Intern',
    company: 'Thiranex',
    type: 'Remote',
    period: 'May 2026 – Jun 2026',
    highlights: [
      'Built 4+ responsive React.js front-end components and integrated them with backend services in a mentor-led internship.',
      'Designed and implemented 5+ RESTful API endpoints with Node.js, Express.js, and MongoDB data models for 2 real-world project deliverables.',
      'Completed all tasks, code reviews, and onboarding milestones, meeting 100% of performance-based evaluation criteria.',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  },
];

const education = [
  {
    degree: 'B.Tech, Artificial Intelligence and Computer Science (CSE AI)',
    institution: 'Parul Institute of Engineering & Technology',
    period: '2023 – 2027',
    detail: 'Undergraduate Program · AI, Machine Learning & Full-Stack Engineering',
  },
  {
    degree: 'Intermediate (Class XII), MPC',
    institution: 'Sri Chaitanya Junior College, Visakhapatnam',
    period: 'March 2023',
    detail: 'Marks: 581',
  },
  {
    degree: 'SSC (Class X)',
    institution: 'Ravindra Indian English Medium School, Visakhapatnam',
    period: 'June 2021',
    detail: '577 / 600 · First Division',
  },
];

const certifications = [
  {
    title: 'Full Stack Development – 30 Days MasterClass',
    issuer: 'NoviTech R&D Pvt. Ltd.',
    period: 'Mar – Apr 2026',
  },
  {
    title: 'Introduction to MERN Stack',
    issuer: 'Simplilearn SkillUp',
    period: 'Jun 2026',
  },
  {
    title: 'Front-End Development (HTML5, CSS3, JavaScript)',
    issuer: 'CodeChef',
    period: 'Verified',
  },
];

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div data-reveal="fade-up">
          <p className="section-label">Experience & Credentials</p>
          <h2 className="section-title">Journey so far</h2>
        </div>

        {/* Work Experience */}
        <div className="exp__block" data-reveal="fade-up" data-reveal-delay="80">
          <div className="exp__block-header">
            <div className="exp__icon-wrap exp__icon-wrap--accent">
              <Briefcase size={18} />
            </div>
            <h3 className="exp__block-title">Work Experience</h3>
          </div>

          <div className="exp__list">
            {experiences.map((item) => (
              <div key={item.company} className="exp-card glass-panel" data-reveal="zoom-in" data-reveal-delay="120">
                <div className="exp-card__top">
                  <div>
                    <h4 className="exp-card__role">{item.role}</h4>
                    <p className="exp-card__company">
                      {item.company}
                      <span className="exp-card__dot">·</span>
                      <span className="exp-card__meta-inline">
                        <MapPin size={13} /> {item.type}
                      </span>
                    </p>
                  </div>
                  <span className="exp-card__period">
                    <Calendar size={13} />
                    {item.period}
                  </span>
                </div>

                <ul className="exp-card__points">
                  {item.highlights.map((pt, idx) => (
                    <li key={idx} className="exp-card__point">
                      <CheckCircle2 size={15} className="exp-card__point-icon" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-card__tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="exp-card__tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications 2-column grid */}
        <div className="exp__bottom-grid">
          <div className="exp__block" data-reveal="fade-right">
            <div className="exp__block-header">
              <div className="exp__icon-wrap exp__icon-wrap--blue">
                <GraduationCap size={18} />
              </div>
              <h3 className="exp__block-title">Education</h3>
            </div>

            <div className="edu__list">
              {education.map((edu, idx) => (
                <div
                  key={edu.degree}
                  className="edu-card glass-panel"
                  data-reveal="fade-up"
                  data-reveal-delay={String(idx * 90)}
                >
                  <div className="edu-card__top">
                    <h4 className="edu-card__degree">{edu.degree}</h4>
                    <span className="edu-card__period">{edu.period}</span>
                  </div>
                  <p className="edu-card__inst">{edu.institution}</p>
                  <p className="edu-card__detail">{edu.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="exp__block" data-reveal="fade-left" data-reveal-delay="100">
            <div className="exp__block-header">
              <div className="exp__icon-wrap exp__icon-wrap--green">
                <Award size={18} />
              </div>
              <h3 className="exp__block-title">Certifications</h3>
            </div>

            <div className="cert__list">
              {certifications.map((cert, idx) => (
                <div
                  key={cert.title}
                  className="cert-card glass-panel"
                  data-reveal="fade-up"
                  data-reveal-delay={String(idx * 90)}
                >
                  <div className="cert-card__accent" />
                  <div className="cert-card__body">
                    <h4 className="cert-card__title">{cert.title}</h4>
                    <div className="cert-card__meta">
                      <span className="cert-card__issuer">{cert.issuer}</span>
                      <span className="cert-card__period">{cert.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
