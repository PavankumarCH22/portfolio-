import { useState } from 'react';
import { Mail, Github, MapPin, Send, AlertCircle, CheckCircle, X } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [focusState, setFocusState] = useState({ name: false, email: false, message: false });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFocus = field => {
    setFocusState(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = field => {
    setFocusState(prev => ({ ...prev, [field]: form[field].length > 0 }));
  };

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleSubmit = async () => {
    const { name, email, message } = form;
    if (!name || !email || !message) {
      triggerToast('Please fill in all fields before sending.', 'error');
      return;
    }
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        triggerToast('Message sent successfully! I will get back to you soon.', 'success');
        setForm({ name: '', email: '', message: '' });
        setFocusState({ name: false, email: false, message: false });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        triggerToast(data.error || 'Failed to submit form.', 'error');
      }
    } catch {
      setStatus('error');
      triggerToast('Network connection error. Please try again.', 'error');
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info animate-fadeUp">
            <p className="section-label">Contact</p>
            <h2 className="section-title">Let's build something together.</h2>
            <p className="contact__text">
              I am actively seeking software engineering internships and junior developer roles. Whether you have an opportunity, a project concept, or just want to talk tech — my inbox is open!
            </p>

            <div className="contact__details">
              <a href="mailto:pavankumarch326@gmail.com" className="contact__detail glass-panel">
                <div className="contact__detail-icon-wrapper contact__detail-icon-wrapper--mail">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <span className="contact__detail-value">pavankumarch326@gmail.com</span>
                </div>
              </a>
              <a href="https://github.com/PavankumarCH22" target="_blank" rel="noreferrer" className="contact__detail glass-panel">
                <div className="contact__detail-icon-wrapper contact__detail-icon-wrapper--git">
                  <Github size={18} />
                </div>
                <div>
                  <span className="contact__detail-label">GitHub</span>
                  <span className="contact__detail-value">PavankumarCH22</span>
                </div>
              </a>
              <div className="contact__detail glass-panel">
                <div className="contact__detail-icon-wrapper contact__detail-icon-wrapper--loc">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="contact__detail-label">Location</span>
                  <span className="contact__detail-value">Visakhapatnam, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__form-wrapper glass-panel animate-fadeUp delay-1">
            <div className="contact__form-header">
              <h3>Drop me a message</h3>
              <p>Direct communication to my developer inbox</p>
            </div>
            
            <div className={`form-group ${focusState.name ? 'form-group--active' : ''}`}>
              <label htmlFor="name" className="floating-label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder=""
                value={form.name}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                onChange={handleChange}
              />
            </div>
            
            <div className={`form-group ${focusState.email ? 'form-group--active' : ''}`}>
              <label htmlFor="email" className="floating-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder=""
                value={form.email}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                onChange={handleChange}
              />
            </div>
            
            <div className={`form-group ${focusState.message ? 'form-group--active' : ''}`}>
              <label htmlFor="message" className="floating-label">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder=""
                value={form.message}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                onChange={handleChange}
              />
            </div>

            <button
              className={`btn-primary contact__submit ${status === 'loading' ? 'contact__submit--loading' : ''}`}
              onClick={handleSubmit}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <span className="spinner-loader" /> Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toast.show && (
        <div className="toast-container">
          <div className={`toast ${toast.type === 'success' ? 'toast--success' : 'toast--error'}`}>
            <div className="toast__content">
              {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span>{toast.message}</span>
            </div>
            <button className="toast__close" onClick={() => setToast(prev => ({ ...prev, show: false }))}>
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
