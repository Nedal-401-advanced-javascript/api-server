'use strict';

const schema = require('./products.schema');
const Model = require('../model');

/**
 * this class is like  acopy of the Model collections 
 * @class
 * 
 */
class product extends Model {
    constructor() {
        super(schema);
    }

}
/**
 * @module Product
 */
module.exports = new product();