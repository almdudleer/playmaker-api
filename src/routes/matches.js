const express = require('express');
const router = express.Router();
const MatchesController = require('../controllers/matches');

router.post('/', MatchesController.match_post_one);

module.exports = router;
