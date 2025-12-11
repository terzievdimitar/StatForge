import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.ts';
import { generateGithubInstallUrl, githubAppCallback, getRepositories } from '../controllers/github.controller.ts';
import { deployRepository } from '../controllers/deployment.controller.ts';

const router = express.Router();

router.get('/app-install', protectRoute, generateGithubInstallUrl);
router.get('/app-callback', githubAppCallback);
router.get('/repositories', protectRoute, getRepositories);
router.post('/deploy', deployRepository);

export default router;
