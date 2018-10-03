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
    players: [{
        account_id: Number,
        player_slot: Number,
        hero_id: Number,
        item_0: Number,
        item_1: Number,
        item_2: Number,
        item_3: Number,
        item_4: Number,
        item_5: Number,
        backpack_0: Number,
        backpack_1: Number,
        backpack_2: Number,
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
            ability: Number,
            time: Number,
            level: Number
        }]
    }]
});

module.exports = mongoose.model('Match', matchSchema);
