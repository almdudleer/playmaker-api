const mongoose = require('mongoose');

const tournamentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: {type: mongoose.Schema.Types.ObjectId, required: true},
    description: String,
    name: {type: String, required: true, unique: true},
    team_count: {type: Number, required: true},
    prize_pool: Number,
    finished: {type: Boolean, default: false},
    started: {type: Boolean, default: false},
    winner_team: {type: mongoose.Schema.Types.ObjectId, default: null},
    teams: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: {type: String, required: true}
        }
    ],
    bracket: [{
        _id: Number,
        team1: mongoose.Schema.Types.ObjectId, //команды участницы
        team2: mongoose.Schema.Types.ObjectId,
        stage: {type: Number, required: true}, //стадия сетки (16 = 1/16, 4=1/4, 1=финал)
        parent_match: {type: Number, required: true}, //_id следующего по сетке матча
    }]
});

tournamentSchema.methods.generateBracket = function () {
    this.bracket = [];
    let teamsCount = this.teams.length;
    let bracketSize = Math.ceil(Math.log2(teamsCount)); // кол-во команд округленное до ближайщей степени двойки
    bracketSize = Math.pow(2, bracketSize);
    let stage = bracketSize / 2;
    let offset = stage;
    let prevOffset = 0;
    let match_num = 1;

    while (stage >= 1) {
        for (let i = 0; i < stage; i++) {
            const match = {
                _id: match_num,
                stage: stage,
                parent_match: offset + Math.ceil((match_num - prevOffset) / 2),
            };
            this.bracket.push(match);
            match_num++;
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
};


module.exports = mongoose.model('Tournament', tournamentSchema);
