const mongoose = require('mongoose');
//{"time":3392,"type":"interval","unit":"CDOTA_Unit_Hero_Furion",
// "slot":0,"gold":23925,"lh":269,"xp":27123,"x":74,"y":80,"stuns":0.0,
// "hero_id":53,"life_state":2,"level":25,"kills":9,"deaths":13,"
// assists":14,"denies":3,"obs_placed":6,"sen_placed":3,
// "creeps_stacked":0,"camps_stacked":0,
// "rune_pickups":11,
// "randomed":false,
// "pred_vict":false,"
// firstblood_claimed":0,"
// teamfight_participation":0.54761904,
// "towers_killed":1,"roshans_killed":0,
// "observers_placed":6}
const parsedMatchSchema = mongoose.Schema({
    _id: Number,
    radiant_gold_adv: [],
    radiant_xp_adv: [],
    players: [{
        hero_name: String,
        times: [],
        gold_t: [],
        lh_t: [],
        dn_t: [],
        xp_t: [],
        player_slot: {type: Number, required: true},
        obs_placed: {type: Number, default: 0},
        sen_placed: {type: Number, default: 0},
        rune_pickups: {type: Number, default: 0},
        towers_killed: {type: Number, default: 0},
        roshans_killed: {type: Number, default: 0},
        pos: [
            {
                _id: false,
                x: Number,
                y: Number,
                value: Number
            }
        ],
        obs_log: [{
            _id: false,
            time: Number,
            x: Number,
            y: Number
        }]
    }],
});

module.exports = mongoose.model('ParsedMatch', parsedMatchSchema);
