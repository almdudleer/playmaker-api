const mongoose = require('mongoose');

const tournamentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true, unique: true},
    team_count: {type: Number, required: true},
    prize_pool: Number,
    finished: {type: Boolean, default: false},
    winner_team: {type: mongoose.Schema.Types.ObjectId, default: null},
    teams: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: {type: String, required: true}
        }
    ]
});

module.exports = mongoose.model('Tournament', tournamentSchema);
