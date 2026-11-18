import { useState } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin, Send, AlertCircle, CheckCircle, X } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [focusState, setFocusState] = useState({ name: false, phone: false, email: false, message: false });
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
        
        // Provide clear user feedback depending on the email integration's execution status
        if (data.emailStatus === 'simulated') {
          triggerToast('Message submitted (email simulated - API keys not configured).', 'success');
        } else if (data.emailStatus === 'failed') {
          triggerToast('Message saved, but email notification failed.', 'error');
        } else {
          triggerToast('Message sent successfully! I will get back to you soon.', 'success');
        }
        
        setForm({ name: '', phone: '', email: '', message: '' });
        setFocusState({ name: false, phone: false, email: false, message: false });
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
          <div className="contact__info" data-reveal="fade-right">
            <p className="section-label">Contact</p>
            <h2 className="section-title">Let's build something together.</h2>
            <p className="contact__text">
              I am actively seeking Front-End and Full-Stack Developer roles. Whether you have an opportunity, a project concept, or just want to talk tech — my inbox is open!
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
              <a href="tel:+919346153494" className="contact__detail glass-panel">
                <div className="contact__detail-icon-wrapper contact__detail-icon-wrapper--phone">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="contact__detail-label">Phone</span>
                  <span className="contact__detail-value">+91-9346153494</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/chakalipavankumar" target="_blank" rel="noreferrer" className="contact__detail glass-panel">
                <div className="contact__detail-icon-wrapper contact__detail-icon-wrapper--linkedin">
                  <Linkedin size={18} />
                </div>
                <div>
                  <span className="contact__detail-label">LinkedIn</span>
                  <span className="contact__detail-value">linkedin.com/in/chakalipavankumar</span>
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
                  <span className="contact__detail-value">Visakhapatnam, Andhra Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__form-wrapper glass-panel" data-reveal="fade-left" data-reveal-delay="120">
            <div className="contact__form-header">
              <h3>Drop me a message</h3>
              <p>Direct communication to my developer inbox</p>
            </div>
            
            <div className="form-group">
              <label htmlFor="name" className="contact-field-label">Your Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="contact-field-label">Phone Number (Optional)</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number (e.g. +91 98765 43210)"
                value={form.phone}
                onFocus={() => handleFocus('phone')}
                onBlur={() => handleBlur('phone')}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="contact-field-label">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address (e.g. you@example.com)"
                value={form.email}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="contact-field-label">Your Message *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Type your message, job opportunity, or project idea here..."
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
