const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    captain: {type: mongoose.Schema.Types.ObjectId, required: true},
    players: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        validate: [arrayLimit, '{PATH} exceeds the limit of 10']
    }
});

function arrayLimit(val) {
    return val.length <= 5;
}

module.exports = mongoose.model('Team', teamSchema);
