const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    team_owner: mongoose.Schema.Types.ObjectId,
    players: {
        type: [
            {
                _id: false,
                account_id: {type: Number, required: true}
            }
        ],
    }
});

module.exports = mongoose.model('Team', teamSchema);
