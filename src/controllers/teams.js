const Team = require('../models/team');
const User = require('../models/user');
const Tournament = require('../models/tournament');
const mongoose = require('mongoose');
const xmpp = require('simple-xmpp');
const Match = require('../models/match');
const heroNames = require('../util/heroes');
require('dotenv').config();

exports.team_post_one = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await User.findOneAndUpdate(
            {_id: req.user._id},
            {$addToSet: {roles: "CAPTAIN"}},
            {new: true}
        ).session(session);
        const team = new Team({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            captain: req.user._id,
            players: req.user._id
        });
        await team.save();
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({
            successful: true,
            message: "post /teams",
            addedTeam: team
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.status(500).json({
            successful: false,
            error: error
        });
    }
};

exports.team_get_all = async (req, res, next) => {
    try {
        let limit = +req.query.limit || 0;
        let skip = +req.query.skip || 0;

        let searchQuery = req.query.searchQuery ?
            {name: {$regex: req.query.searchQuery, $options: 'i'}} : {};
        const teams = await Team.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .populate('captain', '_id username')
            .populate('players', '_id username')
            .exec();
        const response = {
            status: "ok",
            count: teams.length,
            teams: teams
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }

};

exports.team_get_one = async (req, res, next) => {
    try {
        const team = await Team.findOne({_id: req.params.teamId})
            .populate('players', '_id username')
            .populate('captain', '_id username')
            .exec();
        if (team) {
            const response = {
                success: true,
                team: team
            };
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "No such team"})
        }
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else {
            res.status(500).json({error: err.message})
        }
    }
};

exports.team_delete_one = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let team = await Team.findOneAndDelete({_id: req.body.teamId}).session(session);
        if (team) {
            if (team.captain.equals(req.user._id)) {
                const response = {
                    successful: true,
                    message: "deleted"
                };
                team = await Team.findOne({captain: req.user._id}).session(session);
                console.log(team);
                if (!team) {
                    await User.findOneAndUpdate({_id: req.user._id}, {$pull: {roles: "CAPTAIN"}}).session(session);
                }
                await session.commitTransaction();
                session.endSession();
                res.status(200).json(response);
            } else {
                await session.abortTransaction();
                session.endSession();
                res.status(403).json({
                    error: "not captain"
                });
            }
        } else {
            await session.abortTransaction();
            session.endSession();
            res.status(404).json({
                error: "team not found"
            });
        }
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else
            res.status(500).json({error: err.message})
    }

};

exports.team_invite_player = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const team = await Team.findById(req.params.teamId).session(session);
        if (!team.captain.equals(req.user._id)) {
            res.status(403).json({
                error: "not captain"
            });
            await session.abortTransaction();
            session.endSession();
            return;
        }
        const user = await User.findOneAndUpdate(
            {username: req.body.username},
            {$addToSet: {invites: {_id: req.params.teamId}}}
        ).session(session);
        if (!user) {
            res.status(404).json({
                error: "user not found"
            });
            await session.abortTransaction();
            session.endSession();
            return;
        }
        if (user.jid) {
            xmpp.send(user.jid, `You have been invited to the team "${team.name}".`);
        }
        res.status(200).json({
            successful: true
        });
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
            res.status(500).json({error: err});
    }
};

exports.team_join = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.user._id, invites: req.params.teamId},
            {$pull: {invites: req.params.teamId}}
        ).session(session);
        console.log(user);
        if (!user) {
            res.status(403).json({
                successful: false,
                message: "You haven't been invited to this team"
            });
            await session.abortTransaction();
            session.endSession();
            return;
        }
        const team = await Team.findOneAndUpdate(
            {_id: req.params.teamId},
            {$addToSet: {players: {_id: req.user._id}}}
        ).session(session);

        const captain = await User.findById(team.captain).session(session);

        if (captain.jid) {
            xmpp.send(captain.jid, `${user.username} accepted your invite to the team "${team.name}"`);
        }

        res.status(200).json({
            successful: true
        });
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
            res.status(500).json({error: err});
    }
};

exports.team_delete_player = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const team = await Team.findOneAndUpdate(
            {_id: req.params.teamId},
            {$pull: {players: req.body.userId}}, //Удаляем пользователя из команды
            {new: true}
        )
            .populate('players', '_id username')
            .populate('captain', '_id username')
            .session(session)
            .exec();
        if (!team) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({successful: false, error: 'Team not found'});
        }

        if (req.user._id.equals(req.body.userId) && team.captain.equals(req.user._id)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(200).json({
                successful: false,
                error: "Can't kick yourself, change captain or delete team"
            });
        }

        if (!team.captain.equals(req.user._id) && !req.user._id.equals(req.body.userId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({successful: false, error: 'Not captain'});
        }
        const response = {
            status: "ok",
            updatedTeam: team
        };
        await session.commitTransaction();
        session.endSession();
        res.status(200).json(response);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else
            res.status(500).json({error: err});
    }
};

exports.team_get_tournaments = async (req, res, next) => {
    try {
        const tournaments = await Tournament.find({
            teams: req.params.teamId,
            started: req.query.finished
        }).select('name');
        res.status(200).json({
            successful: true,
            tournaments: tournaments
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }
};

exports.team_get_matches = async (req, res, next) => {
    try {
        let limit = +req.query.limit || 0;
        console.log(req.params.teamId);
        const matches = await Match.find({
            $or: [{radiant_team: req.params.teamId}, {dire_team: req.params.teamId}]
        })
            .select('_id start_time lobby_time players.player_slot players.account_id players.hero_id')
            .limit(limit)
            .exec();

        for (let i = 0; i < matches.length; i++) {
            for (let j = 0; j < matches[i].players.length; j++) {
                matches[i].players[j].hero_name = heroNames[matches[i].players[j].hero_id].name;
            }
        }

        const response = {
            status: "ok",
            matches: matches
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }
};
