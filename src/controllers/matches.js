const Match = require('../models/match');
const http = require('http');
const mongoose = require('mongoose');
const axios = require('axios');
const steamApi = require('../steamEndpoints');
require('dotenv').config();

exports.match_post_one = async (req, res, next) => {
    //fetching data from Steam API
    try {
        const resp = await axios.get(steamApi.getMatchDetails, {
            params: {
                match_id: req.body.matchId,
                key: process.env.STEAM_API_KEY
            }
        });
        resp.data.result._id = resp.data.result.match_id;
        const match = new Match(resp.data.result);
        const result = await match.save().exec();
        res.status(200).json({
            status: "ok",
            message: "post /matches",
            addedMatch: result
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            error: err
        });
    }
};


exports.match_get_all = async (req, res, next) => {
    try {
        const matches = await Match.find()
            .select('match_id start_time lobby_time players.player_slot players.account_id players.hero_id')
            .exec();
        const response = {
            status: "ok",
            counts: matches.length,
            matches: matches
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err})
    }

};

exports.match_get_one = async (req, res, next) => {
    try {
        const match = await Match.findOne({_id: req.params.matchId}).exec();
        const response = {
            status: "ok",
            match: match
        };
        if (match) {
            res.status(200).json(response);
        } else {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        }
    } catch (err) {
        res.status(500).json({error: err})
    }
};

exports.match_delete_one = async (req, res, next) => {
    try {
        await Match.deleteOne({_id: req.body.matchId}).exec();
        const response = {
            status: "ok",
            message: "deleted"
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err})
    }
};
