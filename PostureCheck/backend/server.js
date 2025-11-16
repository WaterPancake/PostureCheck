import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve static files from backend/output
app.use('/output', express.static(path.join(__dirname, 'output')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const targetDir = req.query.targetDir || req.body.targetDir || 'output';
    const sanitizedDir = path.basename(targetDir);
    const uploadPath = path.join(__dirname, sanitizedDir);
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const originalName = path.basename(file.originalname);
    cb(null, originalName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
      cb(null, true);
    } else {
      cb(new Error('Only MP4 files are allowed'));
    }
  },
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

app.post('/api/upload-video', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const targetDir = req.query.targetDir || req.body.targetDir || 'output';
    const sanitizedDir = path.basename(targetDir);
    
    // Original file path
    const originalPath = req.file.path;
    const originalName = path.basename(req.file.filename);
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    
    // Create copy with "New" appended
    const newFileName = `${nameWithoutExt}New${ext}`;
    const newFilePath = path.join(path.dirname(originalPath), newFileName);
    
    // Copy the file
    fs.copyFileSync(originalPath, newFilePath);
    
    res.json({
      message: 'Video uploaded successfully',
      originalFilePath: `/${sanitizedDir}/${originalName}`,
      newFilePath: `/${sanitizedDir}/${newFileName}`
    });
  } catch (error) {
    console.error('Error creating copy:', error);
    res.status(500).json({ error: 'Failed to create video copy' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
