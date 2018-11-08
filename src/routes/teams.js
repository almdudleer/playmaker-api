const express = require('express');
const router = express.Router();
const TeamsController = require('../controllers/teams');
const Auth = require('../controllers/auth');

router.post('/', Auth.isLoggedIn, TeamsController.team_post_one);

router.get('/', TeamsController.team_get_all);

router.get('/:teamId', TeamsController.team_get_one);

router.delete('/', Auth.isLoggedIn, TeamsController.team_delete_one);

router.post('/:teamId/players', Auth.isLoggedIn, TeamsController.team_add_player);

router.delete('/:teamId/players', Auth.isLoggedIn, TeamsController.team_delete_player);

module.exports = router;
