'use strict';

const schema = require('./categories.schema');
const Model = require('../model');

/**
 * this class is like  acopy of the Model collections 
 * @class
 * 
 */
class category extends Model {
    constructor() {
        super(schema);
    }

}
/**
 * @module Product
 */
module.exports = new category();