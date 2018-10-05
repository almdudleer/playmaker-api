const {buildReplayUrl} = require('./util/utility');
const axios = require('axios');
const cp = require('child_process');
require('dotenv').config();


function parseReplay(match_id) {
    axios.get('https://api.opendota.com/api/replays', {
        params: {
            match_id: match_id,
        }
    })
        .then(replay => {
            let url = buildReplayUrl(replay.data[0].match_id, replay.data[0].cluster, replay.data[0].replay_salt);
            cp.exec(
                `curl --max-time 180 --fail ${url} | bunzip2 | curl -X POST -T - ${process.env.PARSER_HOST} | node src/processors/createParsedDataBlob.js ${match_id}`,
                {shell: true, maxBuffer: 10 * 1024 * 1024},
                (err, stdout) => {
                    if (err) {
                        return console.log(err);
                    }
                    const parsedMatch = JSON.parse(stdout);
                    parsedMatch.match_id = match_id;


                },
            );
        })
        .catch(err => {
            console.log(err);
        })
}

parseReplay(4063486691);
