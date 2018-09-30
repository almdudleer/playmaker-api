const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    match_id: {type: Number, required: true, unique: true},
    start_time: Number,
    lobby_type: Number,
    players: [
        {
            account_id: {type: Number, required: true},
            player_slot: {type: Number, required: true},
            hero_id: {type: Number, required: true}
        }
    ]
});

module.exports = mongoose.model('Match', matchSchema);
