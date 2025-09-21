import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';

import { processTextWithGroq } from './utils/groq.js';
import { factCheckWithPerplexity } from './utils/perplexity.js';
import { extractTextFromFile } from './utils/fileParser.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('dist'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['text/plain', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .txt and .pdf files are allowed'));
    }
  }
});

// Create uploads directory if it doesn't exist
(async () => {
  try {
    await fs.access('uploads');
  } catch {
    await fs.mkdir('uploads', { recursive: true });
  }
})();

// Routes

// File upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const text = await extractTextFromFile(req.file.path, req.file.mimetype);
    
    // Clean up uploaded file
    await fs.unlink(req.file.path);

    res.json({ text });
  } catch (error) {
    console.error('File processing error:', error);
    
    // Clean up file if it exists
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Failed to clean up file:', unlinkError);
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to extract text from file',
      details: error.message 
    });
  }
});

// Main text processing endpoint
app.post('/api/process', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'No text provided' });
    }

    if (text.length > 50000) {
      return res.status(400).json({ error: 'Text too long. Please limit to 50,000 characters.' });
    }

    console.log('Processing text of length:', text.length);

    // Process text with Groq (simplified version + bias analysis)
    const groqResults = await processTextWithGroq(text);
    
    // Fact-check with Perplexity
    const factChecks = await factCheckWithPerplexity(text);

    const results = {
      original: text,
      simplified: groqResults.simplified,
      biasFlags: groqResults.biasFlags,
      factChecks: factChecks
    };

    res.json(results);
  } catch (error) {
    console.error('Text processing error:', error);
    res.status(500).json({ 
      error: 'Failed to process text',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment check:');
  console.log('- GROQ_API_KEY:', process.env.GROQ_API_KEY ? 'Set' : 'Missing');
  console.log('- PERPLEXITY_API_KEY:', process.env.PERPLEXITY_API_KEY ? 'Set' : 'Missing');
});

export default app;