const express = require('express');
const router = express.Router();
const TournamentsController = require('../controllers/tournaments');

router.post('/', TournamentsController.tournament_post_one);


module.exports = router;
