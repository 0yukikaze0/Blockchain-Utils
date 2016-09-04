/**
 * Demonstration code 
 * Verification of Elliptic Curve Digital Signature (ECDS)
 * 
 * @author Ashfaq Ahmed S : https://github.com/0yukikaze0 
 *
 * Code uses eccrypto
 */

var fs          = require('fs');
var crypto      = require('crypto');
var eccrypto    = require('eccrypto');

function signMessage(message){
    console.log('Signing ' + message);
}

function execute(){

    if(process.argv.length < 4){
        console.log('Insufficient parameters');
        console.log('Usage : node verify.js \'hex message\' \'hex Signature\'');
        return;
    }
    
    var messageHash = process.argv[2]; 
    var signature = process.argv[3];

    var jsonConfigStream = fs.readFileSync('config.json');

    var config = JSON.parse(jsonConfigStream);

    if(config.privateKey.length == 0 || config.publicKey.length == 0){
        console.log('Missing private / public key');
        console.log('Please provide private and public keys in config.json');
        return;
    }


    console.log('-------------------------------------------');
    console.log('Elliptic Curve Digital Signature Demo v1.0');
    console.log('-------------------------------------------');
    console.log('   |');
    console.log('   +- Attempting verification');

    eccrypto.verify(    new Buffer(config.publicKey, 'hex'), 
                        new Buffer(messageHash,'hex'), 
                        new Buffer(signature,'hex'))
    .then(function(){
    
        console.log('   +- Signature verfied');
        console.log('-------------------------------------------');

    }).catch(function(){
        
        console.log('   +- Verification failed !');
        console.log('-------------------------------------------');

    });
    
}

execute();