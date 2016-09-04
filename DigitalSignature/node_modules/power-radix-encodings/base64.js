/**
 * Base64 character encoding in array format
 * @module base64
 */
var base64Hash = require('./base64-hash')
var values = require('object.values')
module.exports = values(base64Hash)
