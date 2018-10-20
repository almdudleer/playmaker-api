const Tournament = require('../models/tournament');
const Team = require('../models/team');
const mongoose = require('mongoose');
require('dotenv').config();

exports.tournament_post_one = (req, res, next) => {
    const tournament = new Tournament({
        owner: req.body.owner,
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        team_count: req.body.team_count,
        prize_pool: req.body.prize_pool,
    });
    console.log(tournament.finished);
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
        .select('name team_count prize_pool teams bracket')
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
        .select('name team_count prize_pool teams bracket')
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
    let session = null;
    let response = null;
    mongoose.startSession()
        .then(_session => {
            session = _session;
            session.startTransaction();
            return Team.findById(req.body.teamId);
        })
        .then(team => {
            if (!team) {
                session.abortTransaction();
                return res.status(404).json({
                    status: "error",
                    message: "team not found"
                });
            }
            return Tournament.findOneAndUpdate(
                {_id: req.params.tournamentId},
                {$addToSet: {teams: {_id: team._id}}}, //Если команда уже есть, ничего не изменится
                {new: true}
            ).session(session);
        })
        .then(doc => {
            response = {
                status: "ok",
                addedTeam: team,
                updatedTournament: doc
            };
            return Team.findById(req.body.teamId)
        })
        .then(team => {
            if (team) {
                session.commitTransaction();
                session.endSession();
                return res.status(200).json(response);
            } else {
                session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    status: "error",
                    message: "team not found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({error: err})
        });
};

exports.tournament_delete_team = (req, res, next) => {
    Tournament.findOneAndUpdate(
        {_id: req.params.tournamentId},
        {$pull: {teams: {_id: req.body.teamId}}}, //Удаляем команду с турнира
        {new: true}
    )
        .exec()
        .then(doc => {
            const response = {
                status: "ok",
                removedTeam: team,
                updatedTournament: doc
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};

exports.tournament_update = (req, res, next) => {
    Tournament.findOneAndUpdate(
        {_id: req.params.tournamentId},
        {
            $set: {
                description: req.body.description
            }
        },
        {new: true}
    )
        .exec()
        .then(doc => {
            const response = {
                status: "ok",
                updatedTournament: doc
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};

exports.tournament_start = (req, res, next) => {
    Tournament.findOne({_id: req.params.tournamentId})
        .exec()
        .then(tournament => {
            console.log("1");
            if (tournament.started) return res.status(200).json({message: "Tournament already started "});
            tournament.generateBracket();
            tournament.started = true;
            tournament.save()
                .then(tournament => {
                    const response = {
                        status: "ok",
                        updatedTournament: tournament
                    };
                    res.status(200).json(response);
                })
                .catch(err => {
                    res.status(500).json({error: err})
                });

        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};
