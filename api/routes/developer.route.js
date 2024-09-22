import express from 'express';
import { getDevelopers, createDeveloper } from '../controllers/developer.controller.js';

const router = express.Router();

router.post('/developers', createDeveloper);
router.get('/developers', getDevelopers);


export default router;
