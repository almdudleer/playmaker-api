const Team = require('../models/team');
const User = require('../models/user');
const mongoose = require('mongoose');
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
            status: "ok",
            message: "post /teams",
            addedTeam: team
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.status(500).json({
            status: "error",
            error: error
        });
    }
};

exports.team_get_all = async (req, res, next) => {
    try {
        const docs = await Team.find().populate('players', '_id username').exec();
        const response = {
            status: "ok",
            counts: docs.length,
            teams: docs
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }

};

exports.team_get_one = async (req, res, next) => {
    try {
        const team = await Team.findOne({_id: req.params.teamId}).populate('players', '_id username').exec();
        const response = {
            status: "ok",
            team: team
        };
        await res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
};

exports.team_delete_one = async (req, res, next) => {
    try {
        const team = await Team.findOneAndDelete({_id: req.body.teamId, owner: req.user._id}).exec();
        if (team) {
            const response = {
                status: "ok",
                message: "deleted"
            };
            res.status(200).json(response);
        } else {
            res.status(403).json({
                error: "not captain or team doesn't exist"
            });
        }
    } catch (err) {
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
                error: "not owner"
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
        res.status(200).json({
            successful: true
        });
        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
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

        res.status(200).json({
            successful: true
        });
        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({error: err});
    }
};

exports.team_delete_player = (req, res, next) => {
    try {
        const team = Team.findOneAndUpdate(
            {_id: req.params.teamId},
            {$pull: {players: {_id: req.body.userId}}}, //Удаляем пользователя из команды
            {new: true}
        ).exec();
        const response = {
            status: "ok",
            removedPlayer: user,
            updatedTeam: team
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err})
    }
};
