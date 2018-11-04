const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    teamOwner: {type: mongoose.Schema.Types.ObjectId, required: true},
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Team', teamSchema);
