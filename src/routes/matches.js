const express = require('express');
const router = express.Router();
const MatchesController = require('../controllers/matches');

router.post('/', MatchesController.match_post_one);

router.get('/', MatchesController.match_get_all);

router.get('/:matchId', MatchesController.match_get_one);

module.exports = router;
