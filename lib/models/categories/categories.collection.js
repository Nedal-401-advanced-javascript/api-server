'use strict';

const schema = require('./categories.schema');
const Model = require('../model');

class category extends Model {
    constructor() {
        super(schema);
    }

}

module.exports = new category();