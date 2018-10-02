const Tournament = require('../models/tournament');
const Team = require('../models/team');
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

exports.tournament_get_all = (req, res, next) => {
    Tournament.find()
        .select('name team_count prize_pool teams')
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

exports.tournament_get_one = (req, res, next) => {
    Tournament.findOne({_id: req.params.tournamentId})
        .select('name team_count prize_pool teams')
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

exports.tournament_delete_one = (req, res, next) => {
    Tournament.deleteOne({_id: req.body.tournamentId})
        .exec()
        .then(_ => {
            const response = {
                status: "ok",
                message: "deleted"
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};

exports.tournament_add_team = (req, res, next) => {
    Team.findById(req.body.teamId)
        .exec()
        .then(team => {
            if (team) { //Если существиет команда с передаваемым Id
                Tournament.findOneAndUpdate(
                    {_id: req.params.tournamentId},
                    {$addToSet: {teams: {_id: team._id, name: team.name}}}, //Если команда уже есть, ничего не изменится
                    {new: true}
                )
                    .exec()
                    .then(doc => {
                        const response = {
                            status: "ok",
                            addedTeam: team,
                            updatedTournament: doc
                        };
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
            } else return res.status(404).json({
                status: "error",
                message: "team not found"
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        });

};
