const Team = require('../models/team');
const mongoose = require('mongoose');
require('dotenv').config();

exports.team_post_one = (req, res, next) => {
    const team = new Team({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        team_owner: req.body.team_owner
    });
    team.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                status: "ok",
                message: "post /teams",
                addedTeam: team
            });
        }).catch(error => {
        console.log(error);
        res.status(500).json({
            status: "error",
            error: error
        });
    })
};

exports.team_get_all = (req, res, next) => {
    Team.find()
        .exec()
        .then(docs => {
            const response = {
                status: "ok",
                counts: docs.length,
                tournaments: docs
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};

exports.team_get_one = (req, res, next) => {
    Tournament.findOne({_id: req.params.tournamentId})
        .exec()
        .then(doc => {
            const response = {
                status: "ok",
                tournament: doc
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};



