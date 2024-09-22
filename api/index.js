import express from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import hireRoutes from './routes/hire.route.js';
import cookieParser from 'cookie-parser';
import developerRoutes from './routes/developer.route.js';
import scheduleRoutes from './routes/schedule.route.js'; 

// Disable SSL certificate validation (for development purposes only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

dotenv.config();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log('DB Connection Error:', err);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', hireRoutes);
app.use('/api', developerRoutes);
app.use('/api', scheduleRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start Server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
