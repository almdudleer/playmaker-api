const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    avatar: {data: Buffer, contentType: String},
    email: {type: String, required: true, unique: true, match: [/@/, 'Please fill a valid email address']},
    confirmed: {type: Boolean, required: true, default: false},
    confirmKey: String,
    openid: {type: String},
    jid: {type: String, match: [/@/, 'Please fill a valid jid']},
    accountId: {type: Number, unique: true},
    roles: {type: [{type: String}], default: ['USER']},
    invites: [{type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'Team'}],
    selectedMatches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
    selectedTournaments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}]
});

userSchema.plugin(passportLocalMongoose, {
    findByUsername: function (model, queryParameters) {
        queryParameters.confirmed = true;
        return model.findOne(queryParameters);
    }
});

module.exports = mongoose.model('User', userSchema);
