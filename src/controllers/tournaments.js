const Tournament = require('../models/tournament');
const Team = require('../models/team');
const User = require('../models/user');
const mongoose = require('mongoose');
const xmpp = require('simple-xmpp');
require('dotenv').config();

exports.tournament_post_one = async (req, res, next) => {
    try {
        let tournament = new Tournament({
            owner: req.user._id,
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            teamCount: req.body.teamCount,
            prizePool: req.body.prizePool,
            prizePoolCurrency: req.body.prizePoolCurrency,
            startWhenReady: req.body.startWhenReady,
            description: req.body.description,
            contacts: req.body.contacts
        });
        tournament = await tournament.save();
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

        // search query
        let limit = +req.query.limit || 0;
        let skip = +req.query.skip || 0;
        let searchQuery = req.query.searchQuery ?
            {
                $text: {$search: req.query.searchQuery},
            }
            : {};

        // add status to query
        switch (req.query.tourStatus) {
            case 'ongoing': {
                searchQuery.started = true;
                searchQuery.finished = false;
                break;
            }
            case 'upcoming' : {
                searchQuery.started = false;
                searchQuery.finished = false;
                break;
            }
            case 'finished' : {
                searchQuery.finished = true;
                break;
            }
        }

        const tournaments = await Tournament
            .find(searchQuery)
            .sort({createdAt: -1})
            .select('name winnerTeam teamCount prizePool prizePoolCurrency startWhenReady started finished teams bracket owner description')
            .skip(skip)
            .limit(limit)
            .populate('owner', '_id username')
            .populate('winnerTeam', '_id name')
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
            .populate({
                path: 'teams',
                populate: {path: 'captain', select: '_id'}
            })
            .populate('owner', '_id username')
            .populate('winnerTeam', '_id name')
            .select('winnerTeam startWhenReady started finished name prizePoolCurrency teamCount prizePool teams bracket owner description')
            .exec();
        console.log(tournament);
        const response = {
            status: "ok",
            tournament: tournament
        };
        res.status(200).json(response);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else
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
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else
            res.status(500).json({error: err});
    }
};

exports.tournament_join = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const team = await Team.findById(req.body.teamId).populate('players').session(session);

        if (!team) {
            res.status(404).json({error: "team not found"});
            await session.abortTransaction();
            session.endSession();
            return;
        }

        if (!team.captain.equals(req.user._id)) {
            res.status(403).json({
                successful: false,
                error: "Not captain"
            });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        /*if (team.players.length < 5) {
            res.status(200).json({
                successful: false,
                error: "Less then 5 players"
            });
            await session.abortTransaction();
            session.endSession();
            return;
        }*/

        let tournament = await Tournament.findOneAndUpdate(
            {_id: req.params.tournamentId},
            {$addToSet: {teams: {_id: team._id}}}
        )
            .populate('teams')
            .session(session);

        if (!tournament) {
            res.status(404).json({error: "tournament not found"});
            await session.abortTransaction();
            session.endSession();
            return;
        }

        if (tournament.started) {
            res.status(200).json({
                successful: false,
                error: "Tournament started"
            });
        }

        if (tournament.teams.length >= tournament.teamCount) {
            res.status(200).json({
                successful: false,
                error: "No slots"
            });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        /*for (let i = 0; i < tournament.teams.length; i++) {
            for (let j = 0; j < team.players.length; j++) {
                if (tournament.teams[i].players.indexOf(team.players[j]._id) > -1) {
                    res.status(200).json({
                        successful: false,
                        error: team.players[j].username + " is already participating in the tournament."
                    });
                    await session.abortTransaction();
                    session.endSession();
                    return;
                }
            }
        }*/

        tournament = await Tournament.findOne({_id: req.params.tournamentId})
            .populate({
                path: 'teams',
                populate: {path: 'captain', select: '_id'}
            })
            .populate('owner', '_id username')
            .populate('winnerTeam', '_id name')
            .select('winnerTeam startWhenReady started finished name prizePoolCurrency teamCount prizePool teams bracket owner description')
            .exec();


        if (tournament.startWhenReady && tournament.teams.length === tournament.teamCount) {
            tournament.generateBracket();
            tournament.started = true;

            tournament = await tournament.save();

            for (let i = 0; i < tournament.teams.length; i++) {
                console.log(1);
                for (let j = 0; j < tournament.teams[i].players.length; j++) {
                    if (tournament.teams[i].players[j].jid) {
                        console.log(tournament.teams[i].players[j].jid);
                        xmpp.send(tournament.teams[i].players[j].jid, `Tournament ${tournament.name} has been started`);
                    }
                }
            }

            let subs = User.find({selectedTournaments: tournament._id});

            for (let i = 0; i < subs.length; i++) {
                if (subs[i].jid) {
                    xmpp.send(subs[i].jid, `Tournament ${tournament.name} has been started`)
                }
            }
        }

        const response = {
            successful: true,
            updatedTournament: tournament
        };

        res.status(200).json(response);
        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else
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
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else
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
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else
            res.status(500).json({error: err});
    }


};

exports.tournament_start = async (req, res, next) => {
    try {
        let tournament = await Tournament.findOne({_id: req.params.tournamentId})
            .populate({
                path: 'teams',
                populate: [{path: 'captain', select: '_id'}, {path: 'players', select: 'jid'}]
            })
            .populate({path: 'owner', select: '_id email jid'})
            .select('winnerTeam started finished name teamCount prizePool teams bracket owner description')
            .exec();
        console.log(JSON.stringify(tournament));
        if (tournament) {
            /*if (tournament.started) return res.status(200).json({
                successful: false,
                message: "Tournament already started "
            });
             if (!tournament.owner.equals(req.user._id)) return res.status(403).json({
                 successful: false,
                 message: "Not owner"
             });*/
            tournament.generateBracket();
            tournament.started = true;
            tournament = await tournament.save();
            const response = {
                status: "ok",
                updatedTournament: tournament
            };

            for (let i = 0; i < tournament.teams.length; i++) {
                for (let j = 0; j < tournament.teams[i].players.length; j++) {
                    if (tournament.teams[i].players[j].jid) {
                        xmpp.send(tournament.teams[i].players[j].jid, `Tournament ${tournament.name} has been started`);
                    }
                }
            }

            let subs = User.find({selectedTournaments: tournament._id});

            for (let i = 0; i < subs.length; i++) {
                if (subs[i].jid) {
                    xmpp.send(subs[i].jid, `Tournament ${tournament.name} has been started`)
                }
            }

            res.status(200).json(response);
        } else {
            return res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        }
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else {
            res.status(500).json({error: err});
            console.log(err);
        }
    }
};
