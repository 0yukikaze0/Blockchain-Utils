/**
 * Base2 (binary) encoding
 * @module base2-binary
 */
var base2BinaryHash = require('./base2-binary-hash')
var values = require('object.values')
module.exports = values(base2BinaryHash)
