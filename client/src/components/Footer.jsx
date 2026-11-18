import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" data-reveal="fade-up">
      <div className="container footer__inner">
        <div className="footer__logo">
          <span className="logo-bracket">&lt;</span>PK<span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} Pavan Kumar Chakali · Built with React, Node.js & MongoDB
        </p>
        <div className="footer__links">
          <a href="https://github.com/PavankumarCH22" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/chakalipavankumar" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://leetcode.com/u/pavan1429" target="_blank" rel="noreferrer">LeetCode</a>
        </div>
      </div>
    </footer>
  );
}
