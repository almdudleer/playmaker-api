const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    _id: Number,
    duration: Number,
    start_time: Number,
    tower_status_radiant: Number,
    tower_status_dire: Number,
    barracks_status_radiant: Number,
    barracks_status_dire: Number,
    radiant_score: Number,
    dire_score: Number,
    radiant_team: mongoose.Schema.Types.ObjectId,
    dire_team: mongoose.Schema.Types.ObjectId,
    tournament: mongoose.Schema.Types.ObjectId,
    players: [{
        _id: false,
        account_id: Number,
        player_slot: Number,
        hero_id: Number,
        hero_name: String,
        item_0: {type: Number, ref: 'Item'},
        item_1: {type: Number, ref: 'Item'},
        item_2: {type: Number, ref: 'Item'},
        item_3: {type: Number, ref: 'Item'},
        item_4: {type: Number, ref: 'Item'},
        item_5: {type: Number, ref: 'Item'},
        backpack_0: {type: Number, ref: 'Item'},
        backpack_1: {type: Number, ref: 'Item'},
        backpack_2: {type: Number, ref: 'Item'},
        kills: Number,
        deaths: Number,
        assists: Number,
        last_hits: Number,
        denies: Number,
        gold_per_min: Number,
        xp_per_min: Number,
        level: Number,
        hero_damage: Number,
        tower_damage: Number,
        hero_healing: Number,
        gold: Number,
        gold_spent: Number,
        ability_upgrades: [{
            _id: false,
            ability: Number,
            name: String,
            time: Number,
            level: Number
        }]
    }]
});

module.exports = mongoose.model('Match', matchSchema);
