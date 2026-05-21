import { useState, useEffect } from 'react';
import { Sliders, Database, Inbox, Plus, RefreshCw, X, ShieldCheck, Mail, Calendar, Trash } from 'lucide-react';
import './AdminPortal.css';

export default function AdminPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox'); // inbox | seed | add-project
  const [dbConnected, setDbConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [submittingProject, setSubmittingProject] = useState(false);

  // New Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

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

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

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

  return (
    <>
      {/* Subtle Floating Developer Toggle */}
      <button 
        className="dev-portal-toggle glass-panel" 
        onClick={() => setIsOpen(true)}
        title="Open Developer Control Panel"
      >
        <Sliders size={18} />
        <span>Dev Mode</span>
        <span className={`dev-status-dot ${dbConnected ? 'dev-status-dot--online' : ''}`} />
      </button>

      {/* Main Admin Dashboard Modal */}
      {isOpen && (
        <div className="admin-overlay" onClick={() => setIsOpen(false)}>
          <div className="admin-modal glass-panel animate-scale" onClick={e => e.stopPropagation()}>
            <button className="admin-close" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>

            {/* Dashboard Sidebar */}
            <div className="admin-sidebar">
              <div className="admin-brand">
                <ShieldCheck size={22} className="admin-brand-icon" />
                <div>
                  <h4>Dev Dashboard</h4>
                  <p>System operational suite</p>
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

              <div className="admin-nav">
                <button 
                  className={`admin-nav-item ${activeTab === 'inbox' ? 'admin-nav-item--active' : ''}`}
                  onClick={() => setActiveTab('inbox')}
                >
                  <Inbox size={15} /> Messages Inbox ({messages.length})
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
                            <span className="message-card__date">
                              <Calendar size={12} /> {new Date(m.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="message-card__body">{m.message}</p>
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
          </div>
        </div>
      )}
    </>
  );
}
