power-radix-encodings
=====================

[![NPM](https://nodei.co/npm/power-radix-encodings.png?compact=true)](https://nodei.co/npm/power-radix-encodings/)  

Convenient collection of independently require-able character encodings.  
Each encoding is available as a hash, with keys representing values in base10, or as an array.

Useful with [power-radix](https://www.npmjs.com/package/power-radix)

Installing
----------
```
$ npm install power-radix-encodings
```

Usage
-----
```js
var base64Hash = require('power-radix-encodings/base64-hash')
var base64Array = require('power-radix-encodings/base64')
```

Included Encodings
------------------
 - ascii-latin1 (extended 8-bit ASCII)
 - base10-decimal
 - base16-hexadecimal-lowercase
 - base16-hexadecimal-uppercase
 - base2-binary
 - base58-bitcoin
 - base64
