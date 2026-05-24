import { useState, useEffect } from 'react';
import { Github, Menu, X } from 'lucide-react';
import './Navbar.css';

const links = ['About', 'Skills', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scrollspy
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      let current = 'hero';
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            current = sec;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <a className="navbar__logo" href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">PK</span>
            <span className="logo-bracket">/&gt;</span>
          </a>

          <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
            {links.map(l => {
              const lowerL = l.toLowerCase();
              const isActive = activeSection === lowerL;
              return (
                <li key={l}>
                  <a 
                    href={`#${lowerL}`} 
                    onClick={e => handleNav(e, l)}
                    className={isActive ? 'navbar__link--active' : ''}
                  >
                    {l}
                    {isActive && <span className="active-dot" />}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="https://github.com/PavankumarCH22"
                target="_blank"
                rel="noreferrer"
                className="navbar__cta"
              >
                <Github size={15} />
                GitHub
              </a>
            </li>
          </ul>

          <button
            className="navbar__burger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
