const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: Number,
    name: String,
    cost: Number,
    secret_shop: Number,
    side_shop: Number,
    recipe: Number

});

module.exports = mongoose.model('Item', itemSchema);
