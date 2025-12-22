import { Router } from 'express';
import codeforcesController from '../controllers/codeforces.Controller.js';

const router = Router();

// User data endpoints
router.get('/user/:handle', (req, res, next) => {
  console.log(`[DEBUG] Handling Codeforces user info request for handle: ${req.params.handle}`);
  codeforcesController.getUserInfo(req, res).catch(next);
});

router.get('/rating/:handle', (req, res, next) => {
  console.log(`[DEBUG] Handling Codeforces rating request for handle: ${req.params.handle}`);
  codeforcesController.getUserRating(req, res).catch(next);
});

router.get('/submissions/:handle', (req, res, next) => {
  console.log(`[DEBUG] Handling Codeforces submissions request for handle: ${req.params.handle}, count: ${req.query.count || 'not specified'}`);
  codeforcesController.getUserSubmissions(req, res).catch(next);
});

export default router;
