import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload';

dotenv.config();

const app = express();
const PORT = 4000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/upload', uploadRoutes);

// Test route
app.get('/test', (_req: Request, res: Response) => {
  res.json({ message: 'Server is working!' });
});

// Start server first
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`🧪 Test the server: http://localhost:${PORT}/test`);
});

// Connect to MongoDB
console.log('Starting MongoDB connection...');
try {
  mongoose.connect('mongodb://127.0.0.1:27017/finance-analyzer')
    .then(() => {
      console.log('✅ MongoDB Connected Successfully');
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error);
    });
} catch (error) {
  console.error('❌ MongoDB connection error:', error);
} 