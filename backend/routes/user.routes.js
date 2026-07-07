import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    changeCurrentPassword,
    refreshAccessToken,
    getProfile,
    updateProfile,
    updateHandles
} from '../controllers/user.controller.js';
import { googleLogin, githubLogin } from '../controllers/oauth.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(verifyJWT, changeCurrentPassword);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/forgot-password').post(forgotPassword);
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

// Profile and handle management routes
router.route('/me').get(verifyJWT, getProfile).patch(verifyJWT, updateProfile);
router.route('/update-handles').patch(verifyJWT, updateHandles);

// OAuth routes
router.route('/google').post(googleLogin);
router.route('/github').post(githubLogin);

export default router;


