import express from 'express';
import { updateUser, deleteUser, signoutUser, test ,verifyPassword } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/test', test);

// Update User
router.put('/update/:userId', verifyToken, updateUser);

// Delete User
router.delete('/delete/:userId', verifyToken, deleteUser);

// Sign Out User
router.post('/signout', signoutUser);

router.post('/verify-password', verifyPassword);

export default router;

