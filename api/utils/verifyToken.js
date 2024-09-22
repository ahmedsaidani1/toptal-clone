import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  let token;

  console.log('Auth Header:', authHeader);

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    token = req.cookies.access_token; // Extract token from cookies
  }

  // Log the token to debug
  console.log('Token received:', token);

  if (!token) {
    console.log('Access Denied: No token provided');
    return next(errorHandler(401, 'Access Denied'));
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified:', verified);
    req.user = verified;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    next(errorHandler(400, 'Invalid Token'));
  }
};
