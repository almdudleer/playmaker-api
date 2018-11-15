const express = require('express');
const router = express.Router();
const TournamentsController = require('../controllers/tournaments');
const Auth = require('../controllers/auth');

router.post('/', Auth.isLoggedIn, TournamentsController.tournament_post_one);

router.get('/', TournamentsController.tournament_get_all);

router.get('/:tournamentId', TournamentsController.tournament_get_one);

router.delete('/', Auth.isLoggedIn, TournamentsController.tournament_delete_one);

router.post('/:tournamentId/join', Auth.isLoggedIn, TournamentsController.tournament_join);

router.delete('/:tournamentId/teams', Auth.isLoggedIn, TournamentsController.tournament_delete_team);

router.patch('/:tournamentId', Auth.isLoggedIn, TournamentsController.tournament_update);

router.post('/:tournamentId/start', Auth.isLoggedIn, TournamentsController.tournament_start);

module.exports = router;
