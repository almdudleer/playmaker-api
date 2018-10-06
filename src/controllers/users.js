const User = require('../models/user');
const mongoose = require('mongoose');
require('dotenv').config();

exports.user_signup = (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        account_id: req.body.account_id
    });
    user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                status: "ok",
                message: "user registered",
                addedUser: user
            });
        }).catch(error => {
        console.log(error);
        res.status(500).json({
            status: "error",
            error: error
        });
    })
};

exports.user_update = (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.body.id},
        {
            $set: {
                email: req.body.email,
                password: req.body.password,
                account_id: req.body.account_id
            }
        }
    )
};

exports.user_restore_password = (req, res, next) => {
    User.findOne({email: req.query.userEmail}) //проверить, что email существует
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

//basic auth
exports.user_auth = (req, res, next) => {
    User.findOne({email: req.query.userEmail, password: req.query.userPassword})
        .exec()
        .then(doc => {
            //TODO: encrypt password
            const response = {
                status: doc ? "ok" : "fail"
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};