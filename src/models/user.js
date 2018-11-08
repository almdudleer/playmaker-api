const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    accountId: Number,
    selectedMatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
    selectedTournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
