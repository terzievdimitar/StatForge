import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.ts';
import { githubAppInstall, githubAppCallback, getRepositories } from '../controllers/github.controller.ts';

const router = express.Router();

router.get('/app-install', protectRoute, githubAppInstall);
router.get('/app-callback', protectRoute, githubAppCallback);
router.get('/repositories', protectRoute, getRepositories);

export default router;
