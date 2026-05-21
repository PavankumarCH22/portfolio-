const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
];

const memoryMessages = [];
let isConnected = false;

async function connectDB() {
  if (isConnected) return true;

  const uri = process.env.MONGODB_URI;
  if (!uri || !/^mongodb(\+srv)?:\/\//.test(uri)) {
    return false;
  }

  await mongoose.connect(uri);
  isConnected = true;
  return true;
}

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [String],
  githubUrl: String,
  liveUrl: String,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

app.get('/api/projects', async (req, res) => {
  try {
    const connected = await connectDB();
    if (!connected) {
      return res.json({ success: true, data: DEFAULT_PROJECTS, source: 'fallback' });
    }

    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const connected = await connectDB();
    if (!connected) {
      return res.status(503).json({
        success: false,
        error: 'MongoDB is not configured. Add a valid MONGODB_URI to create projects.',
      });
    }

    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/seed', async (req, res) => {
  try {
    const connected = await connectDB();
    if (!connected) {
      return res.json({ success: true, data: DEFAULT_PROJECTS, source: 'fallback' });
    }

    await Project.deleteMany({});
    const projects = await Project.insertMany(DEFAULT_PROJECTS.map(({ _id, ...project }) => project));
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const connected = await connectDB();
    if (!connected) {
      const msg = {
        _id: `memory-${Date.now()}`,
        name,
        email,
        message,
        createdAt: new Date(),
      };
      memoryMessages.unshift(msg);
      return res.status(201).json({ success: true, data: msg, source: 'memory' });
    }

    const msg = await Message.create({ name, email, message });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const connected = await connectDB();
    if (!connected) {
      return res.json({ success: true, data: memoryMessages, source: 'memory' });
    }

    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = app;
