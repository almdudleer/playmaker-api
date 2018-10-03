const Match = require('../models/match');
const http = require('http');
const mongoose = require('mongoose');
const axios = require('axios');
const steamApi = require('../steamEndpoints');
require('dotenv').config();

exports.match_post_one = (req, res, next) => {
    //fetching data from Steam API
    axios.get(steamApi.getMatchDetails, {
        params: {
            match_id: req.body.match_id,
            key: process.env.STEAM_API_KEY
        }
    })
        .then(resp => {
            resp.data.result._id = resp.data.result.match_id;
            const match = new Match(resp.data.result);
            match.save().then(result => {
                res.status(201).json({
                    status: "ok",
                    message: "post /matches"
                });
            }).catch(error => {
                console.log(error);
                res.status(500).json({
                    status: "error",
                    error: error
                });
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                error: error
            });
        });
};

exports.match_get_all = (req, res, next) => {
    Match.find()
        .select('match_id start_time lobby_time players.player_slot players.account_id players.hero_id')
        .exec()
        .then(docs => {
            const response = {
                status: "ok",
                counts: docs.length,
                matches: docs
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};

exports.match_get_one = (req, res, next) => {
    Match.findOne({_id: req.params.matchId})
        .exec()
        .then(doc => {
            const response = {
                status: "ok",
                match: doc
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
};
