const express = require('express');
const router = express.Router();
const { getLeetcodeData } = require('../controllers/leetcodeController');

router.get('/:username', getLeetcodeData);

module.exports = router;
