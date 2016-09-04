/**
 * Demonstration code for building bitcoin addresses
 * 
 * @author Ashfaq Ahmed S : https://github.com/0yukikaze0 
 */
var crypto      = require('crypto');
var eccrypto    = require('eccrypto');
var sha256      = require('crypto-js/sha256');
var ripemd160   = require('crypto-js/ripemd160');
var base58      = require('bs58');

var EventEmitter  = require('events');
var e             = new EventEmitter();

function rtvRandomNumber(){

    /*---------------------------------------------------------*
     * Generate a 256 bit (32 byte) random number
     * We need this number to be generated from a cryptographically
     * secure source of randomness.
     *
     * Cryptographically Secure Pseudo Random Number Generator (CSPRNG)
     * ensure that it uses a seed from a source of sufficient entropy
     *
     * We will be using nodes crypto module to get the job done.
     *---------------------------------------------------------*/
    console.log('   +- Generating randomness');
    return crypto.randomBytes(32);
    /*---------------------------------------------------------*/

}

function buildPrivateKey(){

    /*---------------------------------------------------------*
     * Retrive a 256bit stream of random data
     * Private Key = Hex representation of this randomness
     *---------------------------------------------------------*/
    var randomData = rtvRandomNumber();
    console.log('   +- Generating private key');
    return randomData;  
    /*---------------------------------------------------------*/

}

function buildPublicKey(privateKey){

    /*---------------------------------------------------------*
     * Run elliptic curve multiplication on the provided private
     * key. This process will return a public key.
     *
     * Using eccrypto for elliptic curve multiplication
     *---------------------------------------------------------*/
    console.log('   +- Generating public key');
    var publicKey = eccrypto.getPublic(privateKey);
    return publicKey;
    /*---------------------------------------------------------*/

}

function buildAddress(publicKey){

    /*---------------------------------------------------------*
     * Address = RIPEMD160(SHA256(publicKey))
     *---------------------------------------------------------*/
    console.log('   +- Generating address');
    var sha256Digest    = sha256(publicKey);
    var ripemd160Digest = ripemd160(sha256Digest);
    return ripemd160Digest.toString();
    /*---------------------------------------------------------*/

}

function buildBase58Representation(address){

    /*---------------------------------------------------------*
     * Base58 representation = version + address(hex) + checkSum
     *
     * version = 0x00
     *
     * Checksum is the first 4 bytes of a double sha256 digest of
     * current address
     * 
     * checkSum = (sha256(sha256(address))).substring(0,8)
     *---------------------------------------------------------*/
    var digest      = sha256(sha256(address)).toString();
    var checkSum    = digest.substring(0,8); 

    var data       = '00' + address + checkSum;

    console.log('   +- Generating Base58 string');

    var base58Addr   = base58.encode(new Buffer(data,'hex'));    
    
    /*
     * Sanity Check
     * Try a base58 decode to check if the decoded value is
     * same as the data provided
     */
    var decodedData = new Buffer(base58.decode(base58Addr)).toString('hex');

    if(data == decodedData){
        console.log('       |');
        console.log('       +- Base58 check succeeded');        
    } else {
        console.log('       |');
        console.log('       +- Base58 check failed');
        e.emit('error', new Error('Base58 Check failed!'));
    }    
    /*---------------------------------------------------------*/

    return base58Addr;
}

function execute(){

    /*---------------------------------------------------------*
     * Step 1 : Build Private Key
     * Step 2 : Build Public Key
     * Step 3 : Build address (in hex)
     * Step 4 : Build a Base58Check & Base58 version of step 3
     *---------------------------------------------------------*/

    console.log('-------------------------------------------');
    console.log('Address Generator Demo v1.0');
    console.log('-------------------------------------------');
    console.log('   |');
    var privateKey      = buildPrivateKey();
    var publicKey       = buildPublicKey(privateKey); 
    var address         = buildAddress(publicKey); 
    var base58Addr     = buildBase58Representation(address);
    console.log('Private Key    : ' + privateKey.toString('hex'));
    console.log('Public Key     : ' + publicKey.toString('hex'));
    console.log('Address        : ' + address);
    console.log('Base58 Address : ' + base58Addr);
    console.log('-------------------------------------------');
    /*---------------------------------------------------------*/

}

execute();