const Tournament = require('../models/tournament');
const mongoose = require('mongoose');
require('dotenv').config();

exports.tournament_post_one = (req, res, next) => {
    const tournament = new Tournament({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        team_count: req.body.team_count,
        prize_pool: req.body.prize_pool
    });
    tournament.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                status: "ok",
                message: "post /tournaments",
                addedTournament: tournament
            });
        }).catch(error => {
        console.log(error);
        res.status(500).json({
            status: "error",
            error: error
        });
    })
};

