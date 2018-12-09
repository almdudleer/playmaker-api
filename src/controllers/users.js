const User = require('../models/user');
const Team = require('../models/team');
const Match = require('../models/match');
const Tournament = require('../models/tournament');
const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const xmpp = require('simple-xmpp');
require('dotenv').config();

module.exports.user_signup = (req, res, next) => {
    let key = crypto.createHash('sha256').update(req.body.username).digest('hex');
    User.register(new User({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email,
        confirmed: false,
        confirmKey: key,
        roles: ['USER'],
        username: req.body.username,
        jid: req.body.jid
    }), req.body.password, function (err, user) {
        console.log(user);
        if (err) {
            console.log(err);
            res.status(409).json({
                name: err.name,
                message: err.message
            })
        } else {
            res.status(200).json({
                message: "User created"
            })
        }
    });

    if (req.body.jid){
        xmpp.subscribe(req.body.jid);
    }

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PWD,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: req.body.email,
        subject: 'Confirm your email',
        html: '<p><a href="http://localhost:3000/api/user/confirm/' + key + '">Подтвердить</a></p><br>' +
            '<p>http://localhost:3000/api/user/confirm/' + key + '</p>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
};

exports.user_email_exists = async (req, res, next) => {
    const user = await User.findOne(
        {
            email: req.query.email
        }
    ).exec();
    res.status(200).json({
        exists: !!user
    })
};

exports.user_username_exists = async (req, res, next) => {
    const user = await User.findOne(
        {
            username: req.query.username
        }
    ).exec();
    res.status(200).json({
        exists: !!user
    })
};

exports.user_update = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            jid: req.body.jid || req.user.jid,
        });
        if (req.body.jid){
            xmpp.subscribe(req.body.jid);
        }
        res.status(200).json({
            successful: true
        })
    } catch (err) {
        res.status(500).json({error: err})
    }
};

exports.user_get_info = async (req, res, next) => {
    try {
        const doc = await User.findOne({username: req.params.username})
            .populate('selected_matches').populate('selected_tournaments')
            .select((req.user && (req.user.username === req.params.username)) ? '_id email' +
                ' account_id selected_matches selected_tournaments' : '_id account_id')
            .exec();
        if (doc) {
            const response = {
                success: true,
                user_info: doc
            };
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "No such user"})
        }
    } catch (err) {
        res.status(500).json({error: err})
    }
};

exports.user_add_match = (req, res, next) => {
    Match.findById(req.body.matchId)
        .exec()
        .then(match => {
            if (match) { //Если существует матч с таким id
                User.findOneAndUpdate(
                    {_id: req.params.userId},
                    {$addToSet: {selected_matches: {_id: match._id}}},
                    {new: true}
                )
                    .exec()
                    .then(user => {
                        const response = {
                            success: true,
                            addedMatch: match,
                            updatedUser: user
                        };
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
            } else return res.status(404).json({
                status: "error",
                message: "match not found"
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        });
};

exports.user_delete_match = (req, res, next) => {
    Match.findById(req.body.matchId)
        .exec()
        .then(match => {
            if (match) { //Если существует матч с передаваемым Id
                User.findOneAndUpdate(
                    {_id: req.params.userId},
                    {$pull: {selected_matches: {_id: match._id}}}, //Удаляем пользователя из команды
                    {new: true}
                )
                    .exec()
                    .then(user => {
                        const response = {
                            status: "ok",
                            removedMatch: match,
                            updatedUser: user
                        };
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
            } else return res.status(404).json({
                message: "match not found"
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        });
};

exports.user_add_tournament = (req, res, next) => {
    Tournament.findById(req.body.tournamentId)
        .exec()
        .then(tournament => {
            if (tournament) { //Если существует турнир с таким id
                User.findOneAndUpdate(
                    {_id: req.params.userId},
                    {$addToSet: {selected_tournaments: {_id: tournament._id}}},
                    {new: true}
                )
                    .exec()
                    .then(user => {
                        const response = {
                            status: "ok",
                            addedTournament: tournament,
                            updatedUser: user
                        };
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
            } else return res.status(404).json({
                status: "error",
                message: "tournament not found"
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        });
};

exports.user_delete_tournament = (req, res, next) => {
    Tournament.findById(req.body.tournamentId)
        .exec()
        .then(tournament => {
            if (tournament) { //Если существует пользователь с передаваемым Id
                User.findOneAndUpdate(
                    {_id: req.params.userId},
                    {$pull: {selected_tournaments: {_id: tournament._id}}},
                    {new: true}
                )
                    .exec()
                    .then(user => {
                        const response = {
                            status: "ok",
                            removedTournament: tournament,
                            updatedUser: user
                        };
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
            } else return res.status(404).json({
                status: "error",
                message: "tournament not found"
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        });
};

exports.user_restore_password = (req, res, next) => {
    User.findOne({email: req.body.userEmail}) //проверить, что email существует
        .exec()
        .then(doc => {
            //TODO: if doc !=null send e-mail with password or else
            const response = {
                status: doc ? "ok" : "fail"
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};

exports.user_logout = (req, res, next) => {
    req.logout();
    res.status(200).json({
        message: "logged out"
    })
};

exports.user_get_roles = (req, res, next) => {
    if (req.user) {
        res.status(200).json({
            status: "ok",
            authGroup: req.user.roles,
            username: req.user.username
        });
    } else {
        res.status(200).json({
            status: "ok",
            authGroup: ["VISITOR"]
        });
    }
};

exports.user_get_teams = async (req, res, next) => {
    try {
        const teams = await Team.find({captain: req.user._id});
        res.status(200).json({
            successful: true,
            teams: teams
        })
    } catch (err) {
        res.status(500).json({error: err});
    }
};

exports.user_confirm_email = async (req, res, next) => {
    await User.findOneAndUpdate({
        confirmKey: req.params.key
    }, {
        confirmed: true,
        confirmKey: null
    });
    res.status(200).json({kek: "kek"});
};

exports.user_delete_openid = async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {openid: ""}
    });
    res.status(200).json({kek: "kek"});
};
