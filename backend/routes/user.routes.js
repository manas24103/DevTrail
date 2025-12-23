// import { Router } from 'express';
// const router = Router();
// import { register } from '../controllers/registerController.js';
// import { login } from '../controllers/login.Controller.js';
// import { getCurrentUser } from '../controllers/auth.controller.js';
// import { authenticate as protect } from '../middleware/auth.middleware.js';

// // Debug middleware
// router.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//     next();
// });

// router.post('/register', register);
// router.post('/login', login);

// // Test route
// router.get('/test', (req, res) => {
//     res.json({ message: 'Auth routes are working!' });
// });

// // Get current user profile
// router.get('/me', protect, getCurrentUser);

// export default router;
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


