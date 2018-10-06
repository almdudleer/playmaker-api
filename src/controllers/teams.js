const Team = require('../models/team');
const User = require('../models/user');
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
                team: docs
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};

exports.team_get_one = (req, res, next) => {
    Team.findOne({_id: req.params.teamId})
        .populate('players')
        .exec()
        .then(doc => {
            const response = {
                status: "ok",
                team: doc
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};

exports.team_delete_one = (req, res, next) => {
    Team.deleteOne({_id: req.body.teamId})
        .exec()
        .then(doc => {
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

exports.team_add_player = (req, res, next) => {
    User.findById(req.body.userId)
        .exec()
        .then(user => {
            if (user) { //Если существует игрок с таким id
                Team.findOneAndUpdate(
                    {_id: req.params.teamId},
                    {$addToSet: {players: {_id: user._id}}}, //Если игрок уже есть в команде, ничего не изменится
                    {new: true}
                )
                    .exec()
                    .then(team => {
                        const response = {
                            status: "ok",
                            addedPlayer: user,
                            updatedTeam: team
                        };
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
            } else return res.status(404).json({
                status: "error",
                message: "user not found"
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        });
};

exports.team_delete_player = (req, res, next) => {
    User.findById(req.body.userId)
        .exec()
        .then(user => {
            if (user) { //Если существует пользователь с передаваемым Id
                Team.findOneAndUpdate(
                    {_id: req.params.teamId},
                    {$pull: {players: {_id: user._id}}}, //Удаляем пользователя из команды
                    {new: true}
                )
                    .exec()
                    .then(team => {
                        const response = {
                            status: "ok",
                            removedPlayer: user,
                            updatedTeam: team
                        };
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
            } else return res.status(404).json({
                status: "error",
                message: "user not found"
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        });
};


