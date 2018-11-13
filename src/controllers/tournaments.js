const Tournament = require('../models/tournament');
const Team = require('../models/team');
const mongoose = require('mongoose');
require('dotenv').config();

exports.tournament_post_one = async (req, res, next) => {
    try {
        let tournament = new Tournament({
            owner: req.user._id,
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            teamCount: req.body.teamCount,
            prizePool: req.body.prizePool,
        });
        console.log(tournament.finished);
        tournament = await tournament.save().exec();
        res.status(200).json({
            status: "ok",
            message: "post /tournaments",
            addedTournament: tournament
        });
    } catch (err) {
        res.status(500).json({error: err})
    }
};

exports.tournament_get_all = async (req, res, next) => {
    try {
        const tournaments = await Tournament.find()
            .select('name teamCount prizePool teams bracket owner description')
            .exec();
        const response = {
            status: "ok",
            counts: tournaments.length,
            tournaments: tournaments
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err})
    }

};

exports.tournament_get_one = async (req, res, next) => {
    try {
        const tournament = await Tournament.findOne({_id: req.params.tournamentId})
            .populate('teams')
            .select('name teamCount prizePool teams bracket owner description')
            .exec();
        const response = {
            status: "ok",
            tournament: tournament
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err});
    }
};

exports.tournament_delete_one = async (req, res, next) => {
    try {
        const result = await Tournament.findOneAndDelete({_id: req.body.tournamentId, owner: req.user._id}).exec();
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
            res.status(403).json(response);
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
};

exports.tournament_add_team = async (req, res, next) => {
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        let team = await Team.findById(req.body.teamId);

        if (!team) {
            res.status(500).json({error: "team not fount"})
        }
        const doc = await Tournament.findOneAndUpdate(
            {_id: req.params.tournamentId},
            {$addToSet: {teams: {_id: team._id}}}, //Если команда уже есть, ничего не изменится
            {new: true}
        ).session(session);
        const response = {
            status: "ok",
            updatedTournament: doc
        };
        team = await Team.findById(req.body.teamId);

        if (team) {
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json(response);
        } else {
            res.status(500).json({error: "team was deleted"})
        }
    } catch (err) {
        session.abortTransaction();
        session.endSession();
        res.status(500).json({error: err})
    }
};

exports.tournament_delete_team = async (req, res, next) => {
    try {
        const tournament = await Tournament.findOneAndUpdate(
            {_id: req.params.tournamentId},
            {$pull: {teams: {_id: req.body.teamId}}}, //Удаляем команду с турнира
            {new: true}
        ).exec();
        const response = {
            status: "ok",
            updatedTournament: tournament
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err});
    }
};

exports.tournament_update = async (req, res, next) => {
    try {
        const tournament = await Tournament.findOneAndUpdate(
            {_id: req.params.tournamentId, owner: req.user.body},
            {
                $set: {
                    description: req.body.description
                }
            },
            {new: true}
        ).exec();

        const response = {
            status: "ok",
            updatedTournament: tournament
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err});
    }


};

exports.tournament_start = async (req, res, next) => {
    try {
        let tournament = await Tournament.findOne({_id: req.params.tournamentId, owner: req.user._id}).exec();
        if (tournament) {
            if (tournament.started) return res.status(200).json({message: "Tournament already started "});
            tournament.generateBracket();
            tournament.started = true;
            tournament = await tournament.save();
            const response = {
                status: "ok",
                updatedTournament: tournament
            };
            res.status(200).json(response);
        } else {
            res.status(403).json({error: "Not owner"});
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
};
