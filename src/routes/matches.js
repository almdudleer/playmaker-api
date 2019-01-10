const express = require('express');
const router = express.Router();
const MatchesController = require('../controllers/matches');
const Auth = require('../controllers/auth');

router.post('/', Auth.isLoggedIn, MatchesController.match_post_one);

router.get('/parse/:matchId', MatchesController.match_parse);

router.get('/', MatchesController.match_get_all);

router.get('/:matchId', MatchesController.match_get_one);

module.exports = router;
