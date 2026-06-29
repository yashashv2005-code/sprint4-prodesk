const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const generateRoutes = require('./routes/generate');
const extractResumeRoutes = require('./routes/extractResume');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Routes
app.use('/', generateRoutes);
app.use('/', extractResumeRoutes);


app.get('/health', (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`);
});

