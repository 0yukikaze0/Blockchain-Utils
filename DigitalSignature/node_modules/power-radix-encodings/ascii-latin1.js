/**
 * ASCII ISO-latin-1 (ISO 8859-1) encoding
 * https://en.wikipedia.org/wiki/ISO/IEC_8859-1#Codepage_layout
 * http://www.ascii-code.com/
 * @module ascii-latin1
 */
var asciiLatin1Hash = require('./ascii-latin1-hash')
var values = require('object.values')
module.exports = values(asciiLatin1Hash)
