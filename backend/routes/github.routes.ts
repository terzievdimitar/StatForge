import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.ts';
import { githubLogin, githubCallback, getRepositories } from '../controllers/github.controller.ts';

const router = express.Router();

router.get('/', protectRoute, githubLogin);
router.get('/callback', protectRoute, githubCallback);
router.get('/repositories', protectRoute, getRepositories);

export default router;
