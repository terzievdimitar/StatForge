import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.ts';
import { githubAppInstall, githubAppCallback, getRepositories } from '../controllers/github.controller.ts';
import { get } from 'http';

const router = express.Router();

router.get('/app-install', githubAppInstall);
router.get('/app-callback', githubAppCallback);
router.get('/repositories', getRepositories);

export default router;
