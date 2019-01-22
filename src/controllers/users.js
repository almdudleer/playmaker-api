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
        email: req.body.email.toLowerCase(),
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

    if (req.body.jid) {
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
            email: new RegExp(req.query.email, 'i')
        }
    ).exec();
    res.status(200).json({
        exists: !!user
    })
};

exports.user_username_exists = async (req, res, next) => {
    const user = await User.findOne(
        {
            username: new RegExp(req.query.username, 'i')
        }
    ).exec();
    res.status(200).json({
        exists: !!user
    })
};

exports.user_update = async (req, res, next) => {
    try {
        let update = {};
        if (req.files[0]) {
            update = {
                jid: req.body.jid || req.user.jid,
                avatar: {
                    data: req.files[0].buffer,
                    contentType: req.files[0].mimetype
                }
            }
        } else {
            update = {
                jid: req.body.jid || req.user.jid
            }
        }

        let user = await User.findByIdAndUpdate(req.user._id, update, {new: true});
        if (req.body.jid) {
            xmpp.subscribe(req.body.jid);
        }
        res.status(200).json({
            successful: true,
            user: user
        })
    } catch
        (err) {
        console.log(JSON.stringify(err));
        console.log(err);
        res.status(500).json({error: err})
    }
};

exports.user_get_info = async (req, res, next) => {
    try {
        const doc = await User.findOne({username: req.params.username})
            .populate('selectedMatches').populate('selectedTournaments')
            .select((req.user && (req.user.username === req.params.username)) ? '_id email jid username' +
                ' accountId selectedMatches selectedTournaments' : '_id account_id username')
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
                    {$addToSet: {selectedMatches: {_id: match._id}}},
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
                    {$pull: {selectedMatches: {_id: match._id}}}, //Удаляем пользователя из команды
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
    Tournament.findById(req.params.tournamentId)
        .exec()
        .then(tournament => {
            if (tournament) { //Если существует турнир с таким id
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {$addToSet: {selectedTournaments: {_id: tournament._id}}},
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
    User.findById(req.user._id)
        .exec()
        .then(user => {
            user.selectedTournaments.pull({_id: req.params.tournamentId});
            user.save();
            const response = {
                status: "ok"
            };
            res.status(200).json(response);
        })
};

exports.user_restore_password = async (req, res, next) => {
    try {
        const randomKey = crypto.randomBytes(40).toString('hex');

        const user = await User.findOneAndUpdate({email: req.body.userEmail.toLowerCase()}, {restoreKey: randomKey}).exec(); //проверить, что email существует

        if (user) {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PWD,
                },
            });

            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: user.email,
                subject: 'Restore password from Playmaker',
                html: `<p><a href="${process.env.FRONTEND_URL}/restore/${randomKey}">Подтвердить</a></p><br>` +
                    `<p>${process.env.FRONTEND_URL}/restore/${randomKey}</p>`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
            });
        }
        res.status(200).json({
            successful: !!user
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e});
    }

};

exports.user_confirm_restore = async (req, res, next) => {
    console.log('restoreKey ', req.params.userRestoreKey, 'password ', req.body.password);
    try {
        const user = await User.findOneAndUpdate({restoreKey: req.params.userRestoreKey}, {restoreKey: null}).exec();
        if (user) {
            await user.setPassword(req.body.password);
            mongoose.connection.db.collection('sessions').deleteMany({"session.passport.user": user.username});
            await user.save();
            res.status(200).json({
                successful: true
            });
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
};

exports.user_logout = (req, res, next) => {
    req.logout();
    res.status(200).json({
        message: "logged out"
    })
};

exports.user_get_roles = async (req, res, next) => {
    if (req.user) {
        res.status(200).json({
            status: "ok",
            authGroup: req.user.roles,
            username: req.user.username,
            userId: req.user._id
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
        const teams = await Team.find({players: req.params.userId}).populate('captain');
        res.status(200).json({
            successful: true,
            teams: teams
        })
    } catch (err) {
        res.status(500).json({error: err});
    }
};

exports.user_get_tournaments = async (req, res, next) => {
    try {
        const tournaments = await Tournament.find({owner: req.params.userId});
        res.status(200).json({
            successful: true,
            tournaments: tournaments
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
    const user = await User.findByIdAndUpdate(req.user._id, {
        $unset: {openid: "", accountId: ""}
    }, {new: true});
    console.log(user);
    res.status(200).json({successful: true, user: user});
};

exports.get_avatar = async (req, res, next) => {
    const user = await User.findOne({username: req.params.username});
    if (user.avatar.data !== undefined) {
        res.set('Content-Type', user.avatar.contentType);
        res.send(new Buffer(user.avatar.data));
    } else {
        res.sendFile('/dota.png', {root: __dirname + '../../../public/'});
    }
};


exports.user_get_invites = async (req, res, next) => {
    const user = await User.findById(req.user._id, 'invites').populate('invites');
    res.status(200).json({
        successful: true,
        invites: user.invites
    });
};
