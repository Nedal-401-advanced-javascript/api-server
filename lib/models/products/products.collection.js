'use strict';

const schema = require('./products.schema');
const Model = require('../model');

class product extends Model {
    constructor() {
        super(schema);
    }

}

module.exports = new product();