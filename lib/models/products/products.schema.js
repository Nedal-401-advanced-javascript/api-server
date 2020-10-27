'use strict';

const mongoose = require('mongoose');

const productsStore = mongoose.Schema({
    category:{type:String, required:true},
    name: { type: String, required: true},
    description: { type: String},
    price:{type: String},
    inventoryCount: { type: String}
});

module.exports = mongoose.model('productsStore', productsStore);