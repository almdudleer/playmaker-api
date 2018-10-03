const axios = require('axios');
const fs = require('fs');
const bz2 = require('unbzip2-stream');
const concat = require('concat-stream');

function fetchReplay(url) {
    axios({
        method: 'get',
        url: 'http://replay183.valve.net/570/4148092764_1473198430.dem.bz2',
        responseType: 'stream'
    })
        .then(response => {
            response.data.pipe(bz2()).pipe(concat(replay => {
                parseReplay(replay);
                console.log("kek");
            }));
        })
        .catch(err => {
            console.log(err);
        });
}

function parseReplay(replay) {
    axios({
        method: 'post',
        url: 'http://localhost:5600',
        responseType: 'stream',
        data: replay
    })
        .then(response => {
            response.data.pipe(process.stdout);
        })
        .catch(err => {
            console.log(err);
        });
}


fetchReplay(null);
