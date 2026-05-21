import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__logo">
          <span className="logo-bracket">&lt;</span>PK<span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} Pavan Kumar Chakali · Built with React, Node.js & MongoDB
        </p>
        <div className="footer__links">
          <a href="https://github.com/PavankumarCH22" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://leetcode.com" target="_blank" rel="noreferrer">LeetCode</a>
        </div>
      </div>
    </footer>
  );
}
