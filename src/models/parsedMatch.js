const mongoose = require('mongoose');

const parsedMatchSchema = mongoose.Schema({
    _id: Number,
    radiant_gold_adv: [],
    radiant_xp_adv: [],
    players: [{
        player_slot: {type: Number, required:true},
        obs_placed: {type: Number, default: 0},
        sen_placed: {type: Number, default: 0},
        rune_pickups: {type: Number, default: 0},
        towers_killed: {type: Number, default: 0},
        roshans_killed: {type: Number, default: 0},
        observers_placed: {type: Number, default: 0},
        map: [[
            {
                x: Number,
                y: Number
            }
        ]]
    }],
});

module.exports = mongoose.model('ParsedMatch', parsedMatchSchema);
