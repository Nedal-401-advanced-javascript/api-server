'use strict';

const mongoose = require('mongoose');

const categoriesStore = mongoose.Schema({
    name: { type: String, required: true},
    display_name: {type: String, enum: ['false', 'true'], required: true},
    description: { type: String,uppercase: true}
});

module.exports = mongoose.model('categoriesStore', categoriesStore);