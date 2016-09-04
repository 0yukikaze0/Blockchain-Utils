/**
 * Base10 (decimal) encoding
 * @module base10-decimal
 */
var base10DecimalHash = require('./base10-decimal-hash')
var values = require('object.values')
module.exports = values(base10DecimalHash)
