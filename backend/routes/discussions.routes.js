import { Router } from 'express';
import { 
  getThreads, 
  createThread, 
  postReply, 
  toggleUpvote, 
  incrementViews 
} from '../controllers/discussions.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

// Apply JWT authentication to all discussion routes
router.use(verifyJWT);

router.route('/')
  .get(getThreads)
  .post(createThread);

router.route('/:id/replies')
  .post(postReply);

router.route('/:id/upvote')
  .post(toggleUpvote);

router.route('/:id/view')
  .post(incrementViews);

export default router;
