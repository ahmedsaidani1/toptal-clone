import express from 'express';
import { forgotPassword, google, resetPassword, signin, signup, linkedinCallback, linkedin, updateCompanyInfo, sendFeedback,updateUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/linkedin', linkedin);
router.get('/linkedin/callback', linkedinCallback);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.post('/update-company-info/:userId', updateCompanyInfo);
router.post('/send-feedback/:userId', sendFeedback);
router.put('/update/:id', updateUser);


export default router;