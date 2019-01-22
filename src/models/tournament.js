const mongoose = require('mongoose');
const User = require('./user');
const Team = require('./team');
const xmpp = require('simple-xmpp');

const tournamentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    description: String,
    name: {type: String, required: true, unique: true},
    teamCount: {type: Number, enum: [4, 8, 16, 32, 64]},
    prizePool: Number,
    prizePoolCurrency: String,
    startWhenReady: {type: Boolean, default: false},
    finished: {type: Boolean, default: false},
    started: {type: Boolean, default: false},
    winnerTeam: {type: mongoose.Schema.Types.ObjectId, default: null},
    teams: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
        validate: [teamLimit, '{PATH} exceeds the limit of teams']
    },
    bracket: [{
        _id: Number,
        team1: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}, //команды участницы
        team2: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
        stage: {type: Number, required: true, enum: [1, 2, 4, 8, 16, 32, 64]}, //стадия сетки (16 = 1/16, 4=1/4, 1=финал)
        parentMatch: {type: Number, required: true}, //_id следующего по сетке матча
        finished: {type: Boolean, required: true, default: false}, //confirmed
        matchId: Number,
        firstTeamWin: Boolean,
    }],
    contacts: [{contactType: String, contactText: String}]
});

function teamLimit(val) {
    return val.length <= this.teamCount;
}

tournamentSchema.methods.generateBracket = function () {
    this.bracket = [];
    let teamsCount = this.teams.length;
    let bracketSize = Math.ceil(Math.log2(teamsCount)); // кол-во команд округленное до ближайщей степени двойки
    bracketSize = Math.pow(2, bracketSize);
    let stage = bracketSize / 2;
    let offset = stage;
    let prevOffset = 0;
    let matchNum = 1;

    while (stage >= 1) {
        for (let i = 0; i < stage; i++) {
            const match = {
                _id: matchNum,
                stage: stage,
                parentMatch: offset + Math.ceil((matchNum - prevOffset) / 2),
            };
            this.bracket.push(match);
            matchNum++;
        }
        bracketSize /= 2;
        stage /= 2;
        prevOffset = offset;
        offset += stage;
    }
    bracketSize = Math.ceil(Math.log2(teamsCount));
    bracketSize = Math.pow(2, bracketSize - 1);
    console.log(bracketSize);
    this.teams.forEach((item, i) => {
        if (i / bracketSize < 1)
            this.bracket[i % bracketSize].team1 = item._id;
        else
            this.bracket[i % bracketSize].team2 = item._id;
    });

    //Сразу завершаем матчи с одним участником
    this.bracket.forEach((match, i) => {
        if (match.stage === bracketSize && !match.team2) {
            this.finishMatch(i + 1, true, null);
        }
    })
};

tournamentSchema.methods.finishMatch = function (matchNum, firstTeamWin, matchId) {
    let match = this.bracket[matchNum - 1];
    match.matchId = matchId;
    match.firstTeamWin = firstTeamWin;
    match.finished = true;
    let winner;
    if (firstTeamWin) winner = match.team1;
    else winner = match.team2;
    if (match.stage !== 1) {
        //Продвигаем победителя по сетке
        let parentMatch = this.bracket[match.parentMatch - 1];
        if (matchNum % 2 === 0) {
            parentMatch.team2 = winner;
            if (parentMatch.team1) {
                Team.findById(parentMatch.team1)
                    .populate('players')
                    .then(team => {
                        for (let i = 0; i < team.players.length; i++) {
                            if (team.players[i].jid){
                                xmpp.send(team.players[i].jid, 'Your next opponent is ready');
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        } else {
            parentMatch.team1 = winner;
            if (parentMatch.team2) {
                Team.findById(parentMatch.team2)
                    .populate('players')
                    .then(team => {
                        for (let i = 0; i < team.players.length; i++) {
                            if (team.players[i].jid){
                                xmpp.send(team.players[i].jid, 'Your next opponent is ready');
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        }
    } else {
        //победитель финала становится победителем турнира
        this.winnerTeam = winner;
        //турнир (спектакль) окончен
        this.finished = true;
    }
    return match;
};

module.exports = mongoose.model('Tournament', tournamentSchema);
