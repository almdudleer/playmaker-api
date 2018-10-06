const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nickname: {type: String, required: true, unique:true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    account_id: {type: Number, unique: true}
});

module.exports = mongoose.model('User', userSchema);
