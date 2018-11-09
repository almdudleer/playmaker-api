const Tournament = require('../models/tournament');
const Team = require('../models/team');
const mongoose = require('mongoose');
require('dotenv').config();

exports.tournament_post_one = (req, res, next) => {
    const tournament = new Tournament({
        owner: req.user._id,
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        teamCount: req.body.teamCount,
        prizePool: req.body.prizePool,
    });
    console.log(tournament.finished);
    tournament.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
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
        .select('name teamCount prizePool teams bracket owner description')
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
        .populate('teams')
        .select('name teamCount prizePool teams bracket owner description')
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
    Tournament.findOneAndDelete({_id: req.body.tournamentId, owner: req.user._id})
        .exec()
        .then(result => {
            if (result) {
                const response = {
                    status: "ok",
                    message: "deleted"
                };
                res.status(200).json(response);
            } else {
                const response = {
                    status: "ok",
                    message: "not owner or tournament doesn't exist"
                };
                res.status(200).json(response);
            }
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
                throw "team not found";
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
                updatedTournament: doc
            };
            return Team.findById(req.body.teamId)
        })
        .then(team => {
            if (team) {
                return session.commitTransaction();
            } else {
                throw "team was deleted";
            }
        })
        .then(_ => {
            session.endSession();
            return res.status(200).json(response);
        })
        .catch(err => {
            session.abortTransaction();
            session.endSession();
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
        {_id: req.params.tournamentId, owner: req.user.body},
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
    Tournament.findOne({_id: req.params.tournamentId, owner: req.user._id})
        .exec()
        .then(tournament => {
            if (tournament) {
                if (tournament.started) return res.status(200).json({message: "Tournament already started "});
                tournament.generateBracket();
                tournament.started = true;
                return tournament.save()
            }
            throw {
                message: "Not owner",
                code: 403
            };
        })
        .then(tournament => {
            const response = {
                status: "ok",
                updatedTournament: tournament
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(err.code || 500).json({error: err.message})
        })
};
