import { Router } from 'express';
const router = Router();
import { register } from '../controllers/registerController.js';
import { login } from '../controllers/login.Controller.js';

router.post('/register', register);
router.post('/login', login);

export default router;
