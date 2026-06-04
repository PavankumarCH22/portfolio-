const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

async function sendContactEmail(name, email, message) {
  const mailUser = process.env.SMTP_USER;
  const mailPass = process.env.SMTP_PASS;

  if (!mailUser || !mailPass || mailPass.includes('xxxx')) {
    console.log('--------------------------------------------------');
    console.log('SIMULATED EMAIL NOTIFICATION (SMTP credentials missing):');
    console.log(`To: ${process.env.SMTP_TO || 'pavankumarch326@gmail.com'}`);
    console.log(`From: ${email} (${name})`);
    console.log(`Subject: New Portfolio Contact Message from ${name}`);
    console.log(`Body:\n${message}`);
    console.log('--------------------------------------------------');
    return false;
  }

  const mailOptions = {
    from: `"${name}" <${mailUser}>`,
    replyTo: email,
    to: process.env.SMTP_TO || mailUser,
    subject: `💼 Portfolio: New Contact Message from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
          body {
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(229, 231, 235, 0.8);
          }
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 32px 24px;
            text-align: center;
            position: relative;
          }
          .header-badge {
            display: inline-block;
            background-color: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            padding: 6px 14px;
            border-radius: 9999px;
            margin-bottom: 12px;
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
          .header h2 {
            margin: 0;
            color: #ffffff;
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 6px 0 0 0;
            color: rgba(255, 255, 255, 0.85);
            font-size: 15px;
            font-weight: 400;
          }
          .content {
            padding: 32px 24px;
            background-color: #ffffff;
          }
          .meta-box {
            background-color: #f9fafb;
            border: 1px solid #f3f4f6;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 24px;
          }
          .message-title {
            font-size: 15px;
            font-weight: 600;
            color: #374151;
            margin: 0 0 12px 0;
            display: flex;
            align-items: center;
          }
          .message-box {
            background-color: #ffffff;
            border-left: 4px solid #7c3aed;
            border-top: 1px solid #f3f4f6;
            border-right: 1px solid #f3f4f6;
            border-bottom: 1px solid #f3f4f6;
            border-radius: 0 12px 12px 0;
            padding: 20px;
            font-size: 16px;
            color: #4b5563;
            line-height: 1.6;
            white-space: pre-wrap;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
          }
          .cta-wrapper {
            text-align: center;
            margin-top: 32px;
          }
          .cta-btn {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #ffffff !important;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
          }
          .footer {
            background-color: #f9fafb;
            border-top: 1px solid #f3f4f6;
            padding: 24px;
            text-align: center;
          }
          .footer-logo {
            font-size: 14px;
            font-weight: 700;
            color: #374151;
            margin-bottom: 12px;
            letter-spacing: -0.2px;
          }
          .footer-socials {
            margin-bottom: 16px;
          }
          .footer-socials a {
            color: #9ca3af;
            text-decoration: none;
            margin: 0 8px;
            font-size: 13px;
            font-weight: 500;
          }
          .footer-socials a:hover {
            color: #4f46e5;
          }
          .footer p {
            margin: 0;
            font-size: 12px;
            color: #9ca3af;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="header-badge">Developer Portfolio</span>
            <h2>New Contact Message</h2>
            <p>Direct message from your portfolio website</p>
          </div>
          <div class="content">
            <div class="meta-box">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; width: 120px; vertical-align: top;">Name:</td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 500; color: #111827; vertical-align: top;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Email:</td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 500; color: #111827; vertical-align: top;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; border-bottom: 1px dashed rgba(79, 70, 229, 0.4);">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Sent At:</td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 500; color: #111827; vertical-align: top;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <h3 class="message-title">Message Content</h3>
            <div class="message-box">${message}</div>
            
            <div class="cta-wrapper">
              <a href="mailto:${email}" class="cta-btn">Quick Reply to ${name}</a>
            </div>
          </div>
          <div class="footer">
            <div class="footer-logo">Pavan Kumar Chakali</div>
            <div class="footer-socials">
              <a href="https://github.com/PavankumarCH22" target="_blank">GitHub</a>
              <span style="color: #e5e7eb;">•</span>
              <a href="https://linkedin.com" target="_blank">LinkedIn</a>
            </div>
            <p>This message was securely dispatched from your portfolio serverless api backend.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
  return true;
}


const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const DEFAULT_PROJECTS = [
  {
    _id: 'fallback-1',
    title: 'Full-Stack MERN Application',
    description:
      'End-to-end web application built with MongoDB, Express.js, React, and Node.js. Features RESTful APIs, state management, routing, and a dynamic component-based UI.',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    githubUrl: 'https://github.com/PavankumarCH22',
    featured: true,
  },
  {
    _id: 'fallback-2',
    title: 'Personal Portfolio',
    description:
      'Responsive portfolio website showcasing projects and skills. Built with React and Tailwind CSS with smooth animations and a clean modern design.',
    techStack: ['React', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/PavankumarCH22',
    featured: true,
  },
  {
    _id: 'fallback-3',
    title: 'Frontend UI Projects',
    description:
      'Collection of front-end projects applying HTML, CSS, and JavaScript to build clean, user-friendly interfaces with modern design patterns.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/PavankumarCH22',
    featured: false,
  },
  {
    _id: 'fallback-4',
    title: 'Kandanavolu Paakashala',
    description:
      'A professional Andhra catering web application built for Kurnool-based catering services. Features dynamic multi-language (i18n) support (English, Telugu, Hindi), bespoke menu configurations, fluid animations, and an integrated reservation funnel.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Firebase', 'i18n'],
    githubUrl: 'https://github.com/PavankumarCH22',
    liveUrl: 'https://kandanavolu-paakashala.firebaseapp.com/',
    featured: true,
  },
];

const memoryMessages = [];

app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: DEFAULT_PROJECTS, source: 'static' });
});

app.post('/api/projects', (req, res) => {
  res.status(403).json({
    success: false,
    error: 'Project creation is disabled. Backend is running in database-free Mode.',
  });
});

app.post('/api/seed', (req, res) => {
  res.json({ success: true, data: DEFAULT_PROJECTS, source: 'static' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const msg = {
      _id: `msg-${Date.now()}`,
      name,
      email,
      message,
      createdAt: new Date(),
    };
    memoryMessages.unshift(msg);

    // Send email using Nodemailer
    let emailStatus = 'sent';
    try {
      await sendContactEmail(name, email, message);
    } catch (err) {
      console.error('Nodemailer failed to send email:', err);
      emailStatus = 'failed';
    }

    res.status(201).json({ success: true, data: msg, emailStatus });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/messages', (req, res) => {
  res.json({ success: true, data: memoryMessages, source: 'memory' });
});

app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const index = memoryMessages.findIndex(m => m._id === id);
  if (index !== -1) {
    memoryMessages.splice(index, 1);
    return res.json({ success: true, message: 'Message deleted from memory.' });
  }
  res.status(404).json({ success: false, error: 'Message not found in memory.' });
});

app.delete('/api/projects/:id', (req, res) => {
  res.status(403).json({
    success: false,
    error: 'Project deletion is disabled. Backend is running in database-free Mode.',
  });
});

app.post('/api/admin/auth', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === adminPassword) {
    return res.json({ success: true, token: 'authenticated_portfolio_session' });
  }
  
  res.status(401).json({ success: false, error: 'Invalid admin access password.' });
});

module.exports = app;
