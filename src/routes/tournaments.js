const express = require('express');
const router = express.Router();
const TournamentsController = require('../controllers/tournaments');

router.post('/', TournamentsController.tournament_post_one);

router.get('/', TournamentsController.tournament_get_all);

router.get('/:tournamentId', TournamentsController.tournament_get_one);


module.exports = router;
