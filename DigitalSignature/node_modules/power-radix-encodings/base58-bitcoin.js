/**
 * Base58 character encoding in array format
 * https://en.bitcoin.it/wiki/Base58Check_encoding
 * @module base58-bitcoin
 */
var base58BitcoinHash= require('./base58-bitcoin-hash')
var values = require('object.values')
module.exports = values(base58BitcoinHash)
