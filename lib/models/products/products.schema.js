'use strict';

const mongoose = require('mongoose');

const productsStore = mongoose.Schema({
    category:{type:String, required:true},
    name: { type: String, required: true},
    display_name: {type: String, enum: ['false', 'true'], required: true},
    description: { type: String}
});

module.exports = mongoose.model('productsStore', productsStore);