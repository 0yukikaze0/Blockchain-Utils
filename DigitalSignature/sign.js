/**
 * Demonstration code Elliptic Curve Digital Signature (ECDS)
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

    var message = process.argv[2]; 

    if(message == null || message.trim().length == 0){

        console.log('No message string detected');
        console.log('Usage : node sign.js \'Message to sign\'');
        console.log('For messages containing spaces, please wrap in single quotes');
        console.log('Ex : node ecds.js \'Please sign me!\'');
        return;
    }

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
    /*---------------------------------------------------------*
     * Create a sha256 digest of the message 
     *---------------------------------------------------------*/
    console.log('   +- Attempting signature on message : ' + message);
    var messageHash = crypto.createHash('sha256').update(message).digest();
    console.log('   +- Message Hash (hex) : ' + messageHash.toString('hex'));
    /*---------------------------------------------------------*/

    eccrypto.sign(new Buffer(config.privateKey,'hex'), messageHash).then(function(signature){

        console.log('   +- Signature (hex) : ' + signature.toString('hex'));
        console.log('-------------------------------------------');
    });

    
    
}

execute();