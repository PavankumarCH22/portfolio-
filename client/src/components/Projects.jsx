import { useState, useEffect } from 'react';
import { Folder, Github, ExternalLink, Filter, X, Terminal, Server, Cpu } from 'lucide-react';
import './Projects.css';

const FALLBACK_PROJECTS = [
  {
    _id: '1',
    title: 'IntelliHire AI – AI-Powered Hiring Platform',
    description:
      'Built and deployed a web application that applies AI to hiring and career workflows, featuring a responsive, user-focused interface live on Render. Combines front-end development, API integration, and cloud deployment in a production-style application.',
    techStack: ['React.js', 'AI Integration', 'REST APIs', 'Node.js', 'Render'],
    category: 'AI',
    githubUrl: 'https://github.com/PavankumarCH22',
    liveUrl: 'https://intellihire-frontend-qrtq.onrender.com',
    featured: true,
    setup: 'npm install && npm run build',
    architecture: 'Responsive React front end integrated with AI-assisted hiring & career workflow APIs deployed on Render.',
    learnings: 'Combined AI workflow integration, responsive UI design, and end-to-end cloud deployment for production readiness.'
  },
  {
    _id: '2',
    title: 'Kandanavolu Paakashala – Catering Business Website',
    description:
      'Designed and deployed a production website for a real catering business in Kurnool, Andhra Pradesh, serving active customers. Features multi-language support (English, Telugu, Hindi), a booking system with form validation, WhatsApp API integration, and an admin dashboard for bookings and inquiries.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Firebase', 'WhatsApp API'],
    category: 'Client Work',
    githubUrl: 'https://github.com/PavankumarCH22',
    liveUrl: '',
    featured: true,
    setup: 'firebase deploy',
    architecture: 'Firebase-backed production business site with multi-language localization, WhatsApp API triggers, and a real-time booking admin dashboard.',
    learnings: 'Shipped a live client product handling real customer bookings, trilingual content, form validation, and business operations.'
  },
  {
    _id: '3',
    title: 'Full-Stack Web Application – MERN Stack',
    description:
      'Independently built an end-to-end MERN web application featuring REST APIs with routing, middleware, and error handling in Express.js, paired with a React.js front end with client-side routing and MongoDB CRUD operations.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    category: 'MERN',
    githubUrl: 'https://github.com/PavankumarCH22',
    liveUrl: '',
    featured: false,
    setup: 'npm run install:all && npm run dev',
    architecture: 'Full-stack MERN architecture with Express REST controllers, middleware error handling, MongoDB schema models, and React Router.',
    learnings: 'Engineered scalable CRUD endpoints, clean error-handling middleware, and smooth client-server state synchronization.'
  },
  {
    _id: '4',
    title: 'Personal Portfolio Website',
    description:
      'Built and deployed a responsive developer portfolio showcasing experience, projects, and skills using modern CSS layouts, React, and serverless Node.js endpoints on Vercel.',
    techStack: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    category: 'MERN',
    githubUrl: 'https://github.com/PavankumarCH22/portfolio-',
    liveUrl: 'https://pavankumarchakali.vercel.app',
    featured: false,
    setup: 'cd client && npm install && npm run build',
    architecture: 'Vercel monorepo serving static Vite-built React assets alongside Express serverless API routes.',
    learnings: 'Crafted responsive CSS Flexbox/Grid layouts, interactive UI micro-animations, and serverless contact email delivery.'
  }
];

const categories = ['All', 'AI', 'Client Work', 'MERN'];

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data.length > 0) {
          // Map default seed setup/architecture fields to API projects if not exist
          const mapped = d.data.map(p => ({
            ...p,
            setup: p.setup || 'npm install && npm run dev',
            architecture: p.architecture || 'Three-tier architecture modeling Express API controllers and MongoDB schemas.',
            learnings: p.learnings || 'Established secure REST routes, configured database connection pipelines, and validated inputs.'
          }));
          setProjects(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getCategory = (project) => {
    if (project.category) return project.category;
    const techs = project.techStack;
    if (!techs) return 'MERN';
    const lowerTechs = techs.map(t => t.toLowerCase());
    if (lowerTechs.some(t => t.includes('ai'))) return 'AI';
    if (lowerTechs.includes('firebase')) return 'Client Work';
    return 'MERN';
  };

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true;
    return getCategory(p) === filter;
  });

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div data-reveal="fade-up">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've built</h2>
          <p className="projects__sub">
            Real full-stack and UI solutions built from scratch — demonstrating core engineering capabilities.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="projects__filters" data-reveal="fade-up" data-reveal-delay="80">
          <Filter size={14} className="filter-icon" />
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${filter === cat ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="projects__loading">
            {[1, 2, 3].map(i => <div key={i} className="project-skeleton" />)}
          </div>
        ) : (
          <div className="projects__grid">
            {filteredProjects.map((p, i) => (
              <ProjectCard 
                key={p._id} 
                project={p} 
                index={i} 
                onSelect={() => setSelectedProject(p)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Popup Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}

function ProjectCard({ project, index, onSelect }) {
  return (
    <article
      className={`project-card glass-panel ${project.featured ? 'project-card--featured' : ''}`}
      data-reveal="fade-up"
      data-reveal-delay={String(index * 95)}
      onClick={onSelect}
    >
      {project.featured && <span className="project-card__badge">Featured App</span>}

      <div className="project-card__header">
        <div className="project-card__folder">
          <Folder size={28} strokeWidth={1.5} />
        </div>
        <div className="project-card__links" onClick={e => e.stopPropagation()}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Live demo">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__tags">
        {project.techStack?.slice(0, 4).map(t => (
          <span key={t} className="project-card__tag">{t}</span>
        ))}
        {project.techStack?.length > 4 && (
          <span className="project-card__tag-more">+{project.techStack.length - 4} more</span>
        )}
      </div>

      <div className="project-card__footer">
        <button className="project-card__btn-more">View details & architecture ↗</button>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <p className="modal-subtitle">Project Case Study</p>
          <h3 className="modal-title">{project.title}</h3>
        </div>

        <div className="modal-body">
          <div className="modal-desc-section">
            <p className="modal-desc">{project.description}</p>
            
            <div className="modal-detail-row">
              <Terminal size={16} className="modal-row-icon" />
              <div>
                <p className="modal-row-label">Build / Setup command</p>
                <code className="modal-code">{project.setup}</code>
              </div>
            </div>

            <div className="modal-detail-row">
              <Server size={16} className="modal-row-icon" />
              <div>
                <p className="modal-row-label">System Architecture</p>
                <p className="modal-row-text">{project.architecture}</p>
              </div>
            </div>

            <div className="modal-detail-row">
              <Cpu size={16} className="modal-row-icon" />
              <div>
                <p className="modal-row-label">Core Learnings</p>
                <p className="modal-row-text">{project.learnings}</p>
              </div>
            </div>
          </div>

          <div className="modal-sidebar">
            <p className="sidebar-label">Technologies Used</p>
            <div className="sidebar-tags">
              {project.techStack?.map(t => (
                <span key={t} className="sidebar-tag">{t}</span>
              ))}
            </div>

            <div className="sidebar-links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-primary sidebar-btn">
                  <Github size={16} /> Repository
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-outline sidebar-btn">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
