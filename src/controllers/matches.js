const Match = require('../models/match');
const http = require('http');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

exports.match_post_one = (req, res, next) => {
    //fetching data from Steam API
    axios.get('http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/', {
        params: {
            match_id: req.body.match_id,
            key: process.env.STEAM_API_KEY
        }
    })
        .then( resp => {
            console.log(resp.data);
            resp.data.result._id = new mongoose.Types.ObjectId;
            const match = new Match(resp.data.result);
            match.save().then(result => {
                res.status(201).json({
                    status: "ok",
                    message: "post /matches",
                    addedMatch: match
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
