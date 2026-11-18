<div align="center">

# Pavan Kumar Chakali — Developer Portfolio

**Front-End Developer · Full-Stack MERN Developer · B.Tech CSE (AI)**

[![Live Demo](https://img.shields.io/badge/Live%20Portfolio-pavankumarchakali.vercel.app-00d4ff?style=for-the-badge&logo=vercel&logoColor=white)](https://pavankumarchakali.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-PavankumarCH22-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PavankumarCH22)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-chakalipavankumar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chakalipavankumar)
[![LeetCode](https://img.shields.io/badge/LeetCode-pavan1429-FFA116?style=for-the-badge&logo=leetcode&logoColor=black)](https://leetcode.com/u/pavan1429)

</div>

---

## Overview

A modern, high-performance full-stack developer portfolio built with **React (Vite)**, **Node.js**, and **Express**, deployed seamlessly on **Vercel**. Designed to showcase production web applications, internship experience, technical skills, and direct contact workflows with cinematic motion and full mobile/tablet/desktop responsiveness.

## Key Highlights

- **Animated Software & AI Neural Network Background** — Interactive engineering coordinate grid with travelling circuit-trace light beams, live AI neural-network node graph with data pulses, floating monospace code tokens, and subtle cursor spotlight.
- **Interactive Portrait Card** — Real 4×4 photo-split 3D box-morph reveal animation, natural eye-blink loop, rotating conic gradient border, and 3D mouse-tilt interaction.
- **Scroll-Triggered Motion System** — Custom `IntersectionObserver` scroll-reveal hook (`useScrollReveal`) with staggered directional animations, top reading progress bar, and `prefers-reduced-motion` accessibility support.
- **Interactive Hero Terminal** — Clickable VS Code-inspired developer card with live simulated output logs and engineering highlight metrics.
- **Experience, Education & Certifications** — Dedicated showcase for the **Thiranex** Full Stack Development Internship, B.Tech CSE (AI) at PIET, and verified certifications.
- **Featured Projects Showcase** — Filterable project grid with detailed architecture & learnings modals for **IntelliHire AI**, **Kandanavolu Paakashala**, **MERN Stack Web App**, and **Personal Portfolio**.
- **High-Contrast Contact System & Serverless Email API** — Accessible contact form (`Name`, `Phone`, `Email`, `Message`) backed by Express serverless endpoints supporting **Resend API** and **Nodemailer SMTP** with automatic confirmation replies.
- **Fully Responsive Layout** — Tuned across mobile phones (`<= 480px`), tablets (`<= 1024px`), and full-screen laptops/desktops (`>= 1440px`).

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, Modern CSS3 (Grid, Flexbox, Custom Properties, 3D Transforms), Lucide Icons |
| **Backend / Serverless** | Node.js, Express.js, CORS, Resend REST API, Nodemailer (SMTP) |
| **Deployment & Hosting** | Vercel (Static Client + Serverless `/api/*` Routing via `vercel.json`) |

---

## Project Structure

```text
portfolio-/
├── api/
│   ├── index.js              # Express serverless API (/api/projects, /api/contact, /api/messages, /api/admin/auth)
│   └── send-email.js         # Standalone email test utility
├── client/
│   ├── public/               # Portrait frames (pavan.jpg, pavan-blink.jpg) & rolling-shot backgrounds
│   └── src/
│       ├── components/       # Navbar, Hero, About, Experience, Skills, Projects, Contact, Footer, DeveloperBackground, ScrollProgress, AdminPortal
│       ├── hooks/            # useScrollReveal.js (IntersectionObserver + MutationObserver)
│       ├── App.jsx
│       └── index.css         # Theme tokens, glassmorphism utilities, responsive rules & animation keyframes
├── server/
│   └── index.js              # Local Express development server wrapper
├── vercel.json               # Vercel monorepo build & rewrite configuration
└── package.json              # Root scripts (dev, build, install:all)
```

---

## Local Development

### 1. Clone the repository
```bash
git clone https://github.com/PavankumarCH22/portfolio-.git
cd portfolio-
```

### 2. Install dependencies
```bash
npm run install:all
```

### 3. Configure environment variables *(optional for real email delivery)*
Copy `.env.example` to `.env` and fill in either your Resend API key or SMTP credentials:
```env
RESEND_API_KEY=re_xxxxxxxxx
EMAIL_FROM=onboarding@resend.dev
SMTP_TO=pavankumarch326@gmail.com
ADMIN_PASSWORD=your_admin_password
```

### 4. Start the development server
```bash
npm run dev
```
- Frontend runs at `http://localhost:5173`
- Backend API runs at `http://localhost:5000`

### 5. Production build
```bash
npm run build
```

---

## Contact

- **Name:** Pavan Kumar Chakali
- **Location:** Visakhapatnam, Andhra Pradesh, India
- **Email:** [pavankumarch326@gmail.com](mailto:pavankumarch326@gmail.com)
- **Phone:** +91-9346153494
- **Portfolio:** [pavankumarchakali.vercel.app](https://pavankumarchakali.vercel.app)
- **LinkedIn:** [linkedin.com/in/chakalipavankumar](https://www.linkedin.com/in/chakalipavankumar)
- **GitHub:** [github.com/PavankumarCH22](https://github.com/PavankumarCH22)
- **LeetCode:** [leetcode.com/u/pavan1429](https://leetcode.com/u/pavan1429)
