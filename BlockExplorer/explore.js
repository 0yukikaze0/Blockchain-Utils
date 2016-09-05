/**
 * Blockchain explorer utility
 * Demonstration code to read block meta data
 * 
 * Uses api from blockr.io
 * 
 * @author Ashfaq Ahmed S : https://github.com/0yukikaze0 
 */

var http = require('http');

var url = {
    host    : 'btc.blockr.io',
    path    : '/api/v1/block/raw/'
};

function execute(){

    if(process.argv.length < 3){
        console.log('Usage : node explore.js <block number>');
    }

    var blockNumber = process.argv[2];
    url.path += blockNumber;

    console.log('-------------------------------------------');
    console.log(' Block explorer utility v1.0');
    console.log('-------------------------------------------');
    console.log('   |');
    console.log('   +- Fetching details for block : ' + blockNumber);    
    var request = http.request(url, function(response){
        
        var data = '';

        response.on('data',function(chunk){        
            data += chunk;
        });

        response.on('end',function(){
            
            var blockMeta = JSON.parse(data);

            if(blockMeta.code == 404){
                console.log('   +- No data found');    
                console.log('-------------------------------------------');
                return;
            }

            /*---------------------------------------------------------*
             * Echo block header
             *---------------------------------------------------------*/
            console.log('   +-----------------------------------------+');
            console.log('   | Block Header');
            console.log('   +-----------------------------------------+');
            console.log('   | Version            : ' + blockMeta.data.version);
            console.log('   | Previous Blockhash');
            console.log('   | ' + blockMeta.data.previousblockhash);
            console.log('   | Merkle Root');
            console.log('   | ' + blockMeta.data.merkleroot);
            console.log('   | Timestamp          : ' + blockMeta.data.time);
            console.log('   | Difficulty Target  : ' + blockMeta.data.difficulty);
            console.log('   | Nonce              : ' + blockMeta.data.nonce);
            console.log('   +-----------------------------------------+');
            console.log('   | Block Metadata');
            console.log('   +-----------------------------------------+');
            console.log('   | Block Size         : ' + blockMeta.data.size);
            console.log('   | Trasaction Count   : ' + blockMeta.data.tx.length);
            console.log('   | POW submitted');
            console.log('   | ' + blockMeta.data.chainwork);
            console.log('   +-----------------------------------------+');
            /*---------------------------------------------------------*/
            
            /*for(var key in blockMeta.data){
                console.log(key + ' : ' + blockMeta.data[key]);
            }*/

        });
    });

    request.on('error',function(e){

        console.log(e.message);

    });

    request.end();

}

execute();