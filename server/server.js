import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import analyzerRoutes from './routes/analyzerRoutes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api', analyzerRoutes);

// Fallback error handler for anything that slips past a route's own try/catch
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

const PORT = process.env.PORT || 5000;

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    '⚠️  GEMINI_API_KEY is not set. Copy .env.example to .env and add your key.'
  );
}

app.listen(PORT, () => {
  console.log(`Core Problem server listening on http://localhost:${PORT}`);
});
