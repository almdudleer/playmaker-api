const Match = require('../models/match');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

exports.match_post_one = (req, res, next) => {
    // fetching data from Steam API
    http.get('http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=' +
        process.env.STEAM_API_KEY + '&match_id=' + req.body.match_id, (resp) => {
        let json = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            json += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const data = JSON.parse(json);
            data.result._id = new mongoose.Types.ObjectId;
            const match = new Match(data.result);

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
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(500).json({
            status: "error",
            error: err
        });
    })
};
