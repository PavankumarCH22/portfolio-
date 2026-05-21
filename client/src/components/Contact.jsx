import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, email, message } = form;
    if (!name || !email || !message) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info">
            <p className="section-label">Contact</p>
            <h2 className="section-title">Let's build something together.</h2>
            <p className="contact__text">
              I'm actively looking for my first developer role. Whether you have an
              opportunity, a project, or just want to say hi — my inbox is open.
            </p>

            <div className="contact__details">
              <a href="mailto:pavankumarch326@gmail.com" className="contact__detail">
                <span className="contact__detail-icon">✉</span>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <span className="contact__detail-value">pavankumarch326@gmail.com</span>
                </div>
              </a>
              <a href="https://github.com/PavankumarCH22" target="_blank" rel="noreferrer" className="contact__detail">
                <span className="contact__detail-icon">⌥</span>
                <div>
                  <span className="contact__detail-label">GitHub</span>
                  <span className="contact__detail-value">PavankumarCH22</span>
                </div>
              </a>
              <div className="contact__detail">
                <span className="contact__detail-icon">📍</span>
                <div>
                  <span className="contact__detail-label">Location</span>
                  <span className="contact__detail-value">Visakhapatnam, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__form-wrapper">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {errorMsg && <p className="contact__error">{errorMsg}</p>}

            {status === 'success' ? (
              <div className="contact__success">
                <span>✓</span> Message sent! I'll get back to you soon.
              </div>
            ) : (
              <button
                className="btn-primary contact__submit"
                onClick={handleSubmit}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="spinner" /> Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
