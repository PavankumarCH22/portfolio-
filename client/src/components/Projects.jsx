import { useState, useEffect } from 'react';
import { Folder, Github, ExternalLink, Filter, X, Terminal, Server, Cpu } from 'lucide-react';
import './Projects.css';

const FALLBACK_PROJECTS = [
  {
    _id: '1',
    title: 'Full-Stack MERN Application',
    description:
      'End-to-end web application built with MongoDB, Express.js, React, and Node.js. Developed RESTful APIs for smooth client-server communication with dynamic component-based React front-end.',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    githubUrl: 'https://github.com/PavankumarCH22',
    liveUrl: 'https://github.com/PavankumarCH22',
    featured: true,
    setup: 'npm run install:all && npm run dev',
    architecture: 'MERN architecture with client-side proxy routing and Express routing controllers.',
    learnings: 'Engineered robust database models, handled API payloads securely, and configured CORS proxies for smooth React-to-node connectivity.'
  },
  {
    _id: '2',
    title: 'Personal Developer Portfolio',
    description:
      'Responsive portfolio website showcasing projects, skills, and contact. Built with React and deployed on Vercel with smooth animations, dark space theme, and high-performance serverless endpoints.',
    techStack: ['React', 'CSS', 'Vite', 'Vercel', 'MongoDB'],
    githubUrl: 'https://github.com/PavankumarCH22',
    liveUrl: 'https://github.com/PavankumarCH22',
    featured: true,
    setup: 'cd client && npm install && npm run build',
    architecture: 'Single-project Vercel monorepo mapping static assets and Express serverless functions concurrently.',
    learnings: 'Mastered glassmorphism design tokens, engineered real-time database state sync, and refined clean CSS keyframes.'
  },
  {
    _id: '3',
    title: 'Frontend UI Projects',
    description:
      'Collection of front-end projects applying HTML, CSS, and JavaScript to build clean, user-friendly interfaces with modern design patterns and pixel-perfect layouts.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/PavankumarCH22',
    liveUrl: 'https://github.com/PavankumarCH22',
    featured: false,
    setup: 'open index.html in browser',
    architecture: 'Pure semantic HTML5 layout with vanilla CSS custom properties and pure Javascript event emitters.',
    learnings: 'Perfected flexbox/grid alignments, studied performance paint layers, and crafted clean visual micro-interactions.'
  },
];

const categories = ['All', 'MERN', 'React', 'Frontend'];

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

  const getCategory = (techs) => {
    if (!techs) return 'Frontend';
    const lowerTechs = techs.map(t => t.toLowerCase());
    if (lowerTechs.includes('mongodb') && lowerTechs.includes('express.js') && lowerTechs.includes('node.js')) {
      return 'MERN';
    }
    if (lowerTechs.includes('react') || lowerTechs.includes('react.js')) {
      return 'React';
    }
    return 'Frontend';
  };

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true;
    return getCategory(p.techStack) === filter;
  });

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <p className="section-label">Projects</p>
        <h2 className="section-title">Things I've built</h2>
        <p className="projects__sub">
          Real full-stack and UI solutions built from scratch — demonstrating core engineering capabilities.
        </p>

        {/* Filter Category Tabs */}
        <div className="projects__filters animate-fadeUp">
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
      className={`project-card glass-panel ${project.featured ? 'project-card--featured' : ''} animate-fadeUp`}
      style={{ animationDelay: `${index * 0.1}s` }}
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
