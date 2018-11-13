const Team = require('../models/team');
const User = require('../models/user');
const mongoose = require('mongoose');
require('dotenv').config();

exports.team_post_one = async (req, res, next) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await User.findOneAndUpdate(
            {_id: req.user._id},
            {$addToSet: {roles: "CAPTAIN"}},
            {new: true}
        ).session(session);
        const team = new Team({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            captain: req.user._id
        });
        await team.save();
        await session.commitTransaction();
        session.endSession();
        await res.status(200).json({
            status: "ok",
            message: "post /teams",
            addedTeam: team
        });
    } catch (error) {
        session.abortTransaction();
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
        const team = await Team.findOneAndDelete({_id: req.body.teamId, owner: req.user._id}).exec()
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

exports.team_add_player = async (req, res, next) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        let user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(500).json({
                error: "user not found"
            })
        }
        const team = await Team.findOneAndUpdate(
            {_id: req.params.teamId},
            {$addToSet: {players: {_id: user._id}}}, //Если игрок уже есть в команде, ничего не изменится
            {new: true}
        ).session(session);
        response = {
            status: "ok",
            updatedTeam: team
        };
        user = await User.findById(req.body.userId);

        if (user) {
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json(response);
        } else {
            return res.status(500).json({
                error: "user was deleted"
            })
        }
    } catch (err) {
        session.abortTransaction();
        session.endSession();
        res.status(500).json({error: err})
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


