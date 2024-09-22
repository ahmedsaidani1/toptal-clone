import express from 'express';
import { createHire } from '../controllers/hire.controller.js';

const router = express.Router();

// Create a new hire
router.post('/hire', createHire);

export default router;
