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
