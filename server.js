import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (for demo purposes)
let posts = [];

// Routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  try {
    const newPost = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    
    // Save to db.json for persistence
    fs.writeFileSync(
      path.join(__dirname, 'db.json'),
      JSON.stringify({ posts }, null, 2)
    );
    
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
    try {
    // Initialize db.json if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, 'db.json'))) {
      fs.writeFileSync(
        path.join(__dirname, 'db.json'),
        JSON.stringify({ posts: [] }, null, 2)
      );
    } else {
      // Load existing posts
      const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
      posts = JSON.parse(data).posts || [];
    }
    console.log('Server started successfully');
  } catch (error) {
    console.error('Error initializing server:', error);
    process.exit(1);
  }
});
