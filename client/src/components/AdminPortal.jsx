import { useState, useEffect } from 'react';
import { Sliders, Database, Inbox, Plus, RefreshCw, X, ShieldCheck, Mail, Calendar, Trash } from 'lucide-react';
import './AdminPortal.css';

export default function AdminPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox'); // inbox | seed | add-project | manage-projects
  const [dbConnected, setDbConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [submittingProject, setSubmittingProject] = useState(false);

  // Authentication State
  const [showToggle, setShowToggle] = useState(window.location.hash === '#admin');
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('portfolio_admin_token') === 'authenticated_portfolio_session');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // New Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

  // Check URL hash for admin keyword dynamically
  useEffect(() => {
    const checkHash = () => {
      setShowToggle(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', checkHash);
    checkHash();
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Verify MongoDB Connection status on render
  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          // If source is not 'fallback', database is fully connected!
          setDbConnected(d.source !== 'fallback');
        }
      })
      .catch(() => setDbConnected(false));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setAuthError('');
    
    fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput })
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          sessionStorage.setItem('portfolio_admin_token', d.token);
          setIsAuthenticated(true);
          setAuthError('');
          setPasswordInput('');
        } else {
          setAuthError(d.error || 'Incorrect password.');
        }
      })
      .catch(() => setAuthError('Network authentication failure.'))
      .finally(() => setLoggingIn(false));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('portfolio_admin_token');
    setIsAuthenticated(false);
    setIsOpen(false);
  };

  // Fetch messages from MongoDB/memory
  const fetchMessages = () => {
    setLoadingMessages(true);
    fetch('/api/messages')
      .then(r => r.json())
      .then(d => {
        if (d.success) setMessages(d.data);
      })
      .catch(() => {})
      .finally(() => setLoadingMessages(false));
  };

  // Fetch projects from MongoDB
  const fetchProjects = () => {
    setLoadingProjects(true);
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => {
        if (d.success) setProjects(d.data);
      })
      .catch(() => {})
      .finally(() => setLoadingProjects(false));
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      fetchProjects();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && activeTab === 'manage-projects') {
      fetchProjects();
    }
  }, [activeTab, isOpen]);

  const handleDeleteMessage = (id) => {
    if (!window.confirm('Are you sure you want to delete this recruiter message permanently?')) {
      return;
    }
    
    fetch(`/api/messages/${id}`, { method: 'DELETE' })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setMessages(prev => prev.filter(m => m._id !== id));
        } else {
          alert('Failed to delete message: ' + (d.error || 'Server error'));
        }
      })
      .catch(() => alert('Network error deleting message.'));
  };

  const handleDeleteProject = (id) => {
    if (!window.confirm('Are you sure you want to delete this project from the database permanently?')) {
      return;
    }
    
    fetch(`/api/projects/${id}`, { method: 'DELETE' })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setProjects(prev => prev.filter(p => p._id !== id));
        } else {
          alert('Failed to delete project. In memory-fallback mode projects cannot be deleted.\nError: ' + d.error);
        }
      })
      .catch(() => alert('Network error deleting project.'));
  };

  const handleSeed = () => {
    setSeeding(true);
    fetch('/api/seed', { method: 'POST' })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          alert('Database reset & seeded with default projects successfully! Refresh the page to see changes.');
          window.location.reload();
        } else {
          alert('Failed to seed database: ' + (d.error || 'Server error'));
        }
      })
      .catch(() => alert('Network error seeding database.'))
      .finally(() => setSeeding(false));
  };

  const handleAddProject = e => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      alert('Title and Description are required.');
      return;
    }
    setSubmittingProject(true);

    const payload = {
      ...projectForm,
      techStack: projectForm.techStack.split(',').map(s => s.trim()).filter(s => s.length > 0)
    };

    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          alert('Project created successfully in MongoDB database! Refreshing project catalog.');
          setProjectForm({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', featured: false });
          window.location.reload();
        } else {
          alert('Failed to add project. Make sure MONGODB_URI environment variable is configured.\nError: ' + d.error);
        }
      })
      .catch(() => alert('Network error creating project.'))
      .finally(() => setSubmittingProject(false));
  };

  if (!showToggle) return null;

  return (
    <>
      {/* Subtle Floating Developer Toggle */}
      <button 
        className="dev-portal-toggle glass-panel" 
        onClick={() => setIsOpen(true)}
        title="Open Admin Board"
      >
        <Sliders size={18} />
        <span>Admin Board</span>
        <span className={`dev-status-dot ${dbConnected ? 'dev-status-dot--online' : ''}`} />
      </button>

      {/* Main Admin Dashboard Modal */}
      {isOpen && (
        <div className="admin-overlay" onClick={() => setIsOpen(false)}>
          <div className="admin-modal glass-panel animate-scale" onClick={e => e.stopPropagation()}>
            <button className="admin-close" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>

            {!isAuthenticated ? (
              <div className="admin-login-pane" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '3rem', textAlign: 'center' }}>
                <ShieldCheck size={44} style={{ color: 'var(--accent)', marginBottom: '0.8rem', filter: 'drop-shadow(0 0 10px var(--accent))' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>Admin Authentication</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '340px', margin: '0.5rem 0 1.5rem 0', lineHeight: 1.5 }}>
                  This dashboard is protected. Please enter your administrator access password to proceed.
                </p>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
                  <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Admin Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={passwordInput} 
                      onChange={e => setPasswordInput(e.target.value)} 
                      style={{ width: '100%', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.75rem 1rem', borderRadius: '6px', color: '#fff', outline: 'none', transition: 'var(--transition)' }}
                      required 
                    />
                  </div>
                  {authError && (
                    <p style={{ color: 'var(--pink)', fontSize: '0.8rem', fontWeight: 600 }}>{authError}</p>
                  )}
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={loggingIn}
                    style={{ width: '100%' }}
                  >
                    {loggingIn ? 'Authenticating...' : 'Sign In'}
                  </button>
                </form>
              </div>
            ) : (
              <>
                {/* Dashboard Sidebar */}
                <div className="admin-sidebar">
                  <div className="admin-brand">
                    <ShieldCheck size={22} className="admin-brand-icon" />
                    <div>
                      <h4>Admin Board</h4>
                      <p>Portfolio management suite</p>
                    </div>
                  </div>

                  <div className="db-status-widget">
                    <div className="db-status-header">
                      <Database size={14} />
                      <span>Database Status</span>
                    </div>
                    <div className="db-status-badge">
                      <span className={`db-indicator ${dbConnected ? 'db-indicator--connected' : ''}`} />
                      <span>{dbConnected ? 'MongoDB Connected' : 'Memory-graceful Fallback'}</span>
                    </div>
                    <p className="db-status-desc">
                      {dbConnected 
                        ? 'Connected to atlas cluster. Real-time updates active.' 
                        : 'Add MONGODB_URI in vercel dashboard to connect a live database.'}
                    </p>
                  </div>

                  <div className="admin-nav" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <button 
                      className={`admin-nav-item ${activeTab === 'inbox' ? 'admin-nav-item--active' : ''}`}
                      onClick={() => setActiveTab('inbox')}
                    >
                      <Inbox size={15} /> Messages Inbox ({messages.length})
                    </button>
                    <button 
                      className={`admin-nav-item ${activeTab === 'manage-projects' ? 'admin-nav-item--active' : ''}`}
                      onClick={() => setActiveTab('manage-projects')}
                    >
                      <Database size={15} /> Manage Projects ({projects.length})
                    </button>
                    <button 
                      className={`admin-nav-item ${activeTab === 'add-project' ? 'admin-nav-item--active' : ''}`}
                      onClick={() => setActiveTab('add-project')}
                    >
                      <Plus size={15} /> Add New Project
                    </button>
                    <button 
                      className={`admin-nav-item ${activeTab === 'seed' ? 'admin-nav-item--active' : ''}`}
                      onClick={() => setActiveTab('seed')}
                    >
                      <RefreshCw size={15} /> Reset & Seed Data
                    </button>
                    
                    <button 
                      className="admin-nav-item"
                      onClick={handleLogout}
                      style={{ marginTop: 'auto', color: 'var(--pink)', border: '1px solid rgba(255, 64, 129, 0.15)', background: 'rgba(255, 64, 129, 0.03)' }}
                    >
                      <X size={15} /> Logout Session
                    </button>
                  </div>
                </div>

                {/* Dashboard Main Workspace */}
                <div className="admin-workspace">
                  {activeTab === 'inbox' && (
                    <div className="workspace-pane">
                      <div className="pane-header">
                        <h3>Recruiter Messages Inbox</h3>
                        <p>Real-time list of messages received via contact form</p>
                      </div>

                      <div className="inbox-messages">
                        {loadingMessages ? (
                          <div className="workspace-loader">
                            <RefreshCw size={24} className="spin-loader" /> Loading inbox...
                          </div>
                        ) : messages.length === 0 ? (
                          <div className="workspace-empty">
                            <Inbox size={32} />
                            <p>No messages in inbox. Go ahead and submit a test message in the contact form!</p>
                          </div>
                        ) : (
                          messages.map((m, idx) => (
                            <div key={m._id || idx} className="message-card glass-panel animate-fadeUp" style={{ animationDelay: `${idx * 0.05}s` }}>
                              <div className="message-card__header">
                                <div>
                                  <h5>{m.name}</h5>
                                  <a href={`mailto:${m.email}`} className="message-card__email">
                                    <Mail size={12} /> {m.email}
                                  </a>
                                </div>
                                <div className="message-card__actions">
                                  <span className="message-card__date">
                                    <Calendar size={12} /> {new Date(m.createdAt).toLocaleDateString()}
                                  </span>
                                  <button 
                                    className="btn-icon-delete"
                                    onClick={() => handleDeleteMessage(m._id)}
                                    title="Delete Message"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </div>
                              </div>
                              <p className="message-card__body">{m.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'manage-projects' && (
                    <div className="workspace-pane">
                      <div className="pane-header">
                        <h3>Manage Portfolio Projects</h3>
                        <p>View and delete projects currently active in the database catalog</p>
                      </div>

                      <div className="inbox-messages">
                        {loadingProjects ? (
                          <div className="workspace-loader">
                            <RefreshCw size={24} className="spin-loader" /> Loading projects...
                          </div>
                        ) : projects.length === 0 ? (
                          <div className="workspace-empty">
                            <Database size={32} />
                            <p>No projects in catalog. Seed or add a project to populate the list.</p>
                          </div>
                        ) : (
                          projects.map((p, idx) => (
                            <div key={p._id || idx} className="message-card glass-panel animate-fadeUp" style={{ animationDelay: `${idx * 0.05}s` }}>
                              <div className="message-card__header">
                                <div>
                                  <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {p.title}
                                    {p.featured && <span className="featured-tag">Featured</span>}
                                  </h5>
                                  {p.liveUrl && (
                                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="message-card__email" style={{ marginRight: '1rem' }}>
                                      Demo
                                    </a>
                                  )}
                                  {p.githubUrl && (
                                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="message-card__email">
                                      GitHub
                                    </a>
                                  )}
                                </div>
                                <div className="message-card__actions">
                                  <button 
                                    className="btn-icon-delete"
                                    onClick={() => handleDeleteProject(p._id)}
                                    title="Delete Project"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </div>
                              </div>
                              <p className="message-card__body" style={{ fontSize: '0.825rem', opacity: 0.9 }}>{p.description}</p>
                              <div className="project-card-tags" style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                {p.techStack.map((tech, idx) => (
                                  <span key={idx} className="project-tag-pill">{tech}</span>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'add-project' && (
                    <div className="workspace-pane">
                      <div className="pane-header">
                        <h3>Add Project to Database</h3>
                        <p>Submitting this form makes a direct POST API request to MongoDB</p>
                      </div>

                      <form className="admin-form" onSubmit={handleAddProject}>
                        <div className="form-row-2">
                          <div className="form-group">
                            <label>Project Title *</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Cloud E-Commerce" 
                              value={projectForm.title} 
                              onChange={e => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Tech Stack (Comma Separated) *</label>
                            <input 
                              type="text" 
                              placeholder="e.g. React, MongoDB, AWS, Node" 
                              value={projectForm.techStack} 
                              onChange={e => setProjectForm(prev => ({ ...prev, techStack: e.target.value }))}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Detailed Description *</label>
                          <textarea 
                            rows={3} 
                            placeholder="Detail the core features, objectives, and execution metrics of this build..." 
                            value={projectForm.description} 
                            onChange={e => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                            required
                          />
                        </div>

                        <div className="form-row-2">
                          <div className="form-group">
                            <label>GitHub Repository URL</label>
                            <input 
                              type="url" 
                              placeholder="https://github.com/..." 
                              value={projectForm.githubUrl} 
                              onChange={e => setProjectForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label>Live Build Demo URL</label>
                            <input 
                              type="url" 
                              placeholder="https://..." 
                              value={projectForm.liveUrl} 
                              onChange={e => setProjectForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                            />
                          </div>
                        </div>

                        <div className="form-group-checkbox">
                          <input 
                            type="checkbox" 
                            id="featured" 
                            checked={projectForm.featured} 
                            onChange={e => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                          />
                          <label htmlFor="featured">Feature this project prominently in catalog?</label>
                        </div>

                        <button 
                          type="submit" 
                          className="btn-primary" 
                          disabled={submittingProject}
                        >
                          {submittingProject ? 'Creating in Database...' : 'Insert Project into MongoDB'}
                        </button>
                      </form>
                    </div>
                  )}

                  {activeTab === 'seed' && (
                    <div className="workspace-pane">
                      <div className="pane-header">
                        <h3>Database Reset & Seed Tool</h3>
                        <p>Re-seed the portfolio MongoDB database with curated baseline cases.</p>
                      </div>

                      <div className="seed-console glass-panel">
                        <p className="seed-console-title">Database Administration Operations</p>
                        <p className="seed-console-text">
                          Clicking the button below sends a seeding command. All current records in the database `projects` collection will be deleted and reset to default models.
                        </p>
                        <div className="seed-action-wrapper">
                          <button 
                            className="btn-seed" 
                            onClick={handleSeed}
                            disabled={seeding}
                          >
                            {seeding ? (
                              <>
                                <RefreshCw size={14} className="spin-loader" /> Seeding collections...
                              </>
                            ) : (
                              <>
                                <RefreshCw size={14} /> Re-seed Projects Catalog
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
