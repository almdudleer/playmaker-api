const {buildReplayUrl} = require('./util/utility');
const axios = require('axios');
const cp = require('child_process');
require('dotenv').config();
const ParsedMatch = require('./models/parsedMatch');
const mongoose = require('mongoose');
const fs = require('fs');

async function parseReplay(match_id) {
    try {
        const replay = await axios.get('https://api.opendota.com/api/replays', {
            params: {
                match_id: match_id,
            }
        });
        let parsedMatch;
        let url = buildReplayUrl(replay.data[0].match_id, replay.data[0].cluster, replay.data[0].replay_salt);
        cp.exec(
            `curl --max-time 180 --fail ${url} | bunzip2 | curl -X POST -T - ${process.env.PARSER_HOST} | node src/processors/createParsedDataBlob.js ${match_id}`,
            {shell: true, maxBuffer: 30 * 1024 * 1024},
            async (err, stdout) => {
                if (err) {
                    return console.log(err);
                }
                //console.log(stdout);
                parsedMatch = JSON.parse(stdout);
                parsedMatch._id = match_id;
                const match = new ParsedMatch(parsedMatch);
                match.save();
            },
        );
    } catch (e) {
        console.log(e);
    }
}

module.exports = parseReplay;
