const express = require('express');
const router = express.Router();
const TeamsController = require('../controllers/teams');

router.post('/', TeamsController.team_post_one);

router.get('/', TeamsController.team_get_all);

router.get('/:teamId', TeamsController.team_get_one);

router.delete('/', TeamsController.team_delete_one);

router.post('/:teamId/players', TeamsController.team_add_player);

module.exports = router;
