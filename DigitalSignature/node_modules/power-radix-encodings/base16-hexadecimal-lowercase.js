/**
 * Base16 (hex) encoding, lowercase characters
 * @module base16-hexadecimal-lowercase
 */
var base16LowercaseHash = require('./base16-hexadecimal-lowercase-hash')
var values = require('object.values')
module.exports = values(base16LowercaseHash)
