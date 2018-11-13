const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    accountId: Number,
    roles: {type: [{type: String}], default: ['USER']},
    invites: [{type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'Team'}],
    selectedMatches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
    selectedTournaments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
