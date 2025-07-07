const express = require('express');
const router = express.Router();
const { getCodeforcesData } = require('../controllers/codeforcesController');

router.get('/:username', getCodeforcesData);

module.exports = router;
