import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.ts';
import { signup, login, logout, refreshToken, getUserProfile } from '../controllers/auth.controller.ts';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.get('/profile', protectRoute, getUserProfile);

export default router;
