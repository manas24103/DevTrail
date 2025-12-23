import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    changeCurrentPassword,
    refreshAccessToken
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(verifyJWT, changeCurrentPassword);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/forgot-password').post(forgotPassword);
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

export default router;


