/**
 * Demonstration code for merkle root generation
 * 
 * @author Ashfaq Ahmed S : https://github.com/0yukikaze0 
 */

var fs      = require('fs');
var crypto  = require('crypto');

var treeJson = {"merkleRoot":""};
var passCount = 1;

function sha256(payload) {
    return crypto.createHash('sha256').update(payload).digest();
}

function constructTree(hashSet){

    var resultantHashSet = [];

    for(var i=0;i<hashSet.length;i=i+2){
 
        console.log('   +- Pass ' + passCount++);

        var digest = sha256(sha256(hashSet[i] + hashSet[i+1])).toString('hex');
        resultantHashSet.push(digest);

        treeJson[digest] = [hashSet[i], hashSet[i + 1]];

    }    

    if(resultantHashSet.length > 1){
        constructTree(resultantHashSet);
    } else {
        treeJson.merkleRoot = resultantHashSet[0];

        fs.writeFileSync('tree.json',JSON.stringify(treeJson),{encoding:'utf-8',flag:'w'});

        console.log('   +- Merkle construction completed');
        console.log('   +- Merkle Root');
        console.log('       +- ' + resultantHashSet[0]);
        console.log('   +- Refer to tree.json for full tree');
        console.log('-------------------------------------------');
    }

}

function execute(){

    console.log('-------------------------------------------');
    console.log(' Merkle Generator Demo v1.0');
    console.log('-------------------------------------------');

    /*---------------------------------------------------------*
     * Read data set from data.json
     *---------------------------------------------------------*/
    var dataSet = JSON.parse(fs.readFileSync('data.json')); 
    console.log('   +- Parsed ' + dataSet.data.length + ' records');
    /*---------------------------------------------------------*/
    
    /*---------------------------------------------------------*
     * Merkle tree is a binary structure. If the count of 
     * data records is odd, duplicate the last record to make it 
     * even
     *---------------------------------------------------------*/
    if(!dataSet.data.length % 2 == 0){
        console.log('   +- Odd record count detected. Duplicating last record');
        dataSet.data.push(dataSet.data[dataSet.data.length - 1]);        
    }
    /*---------------------------------------------------------*/

    /*---------------------------------------------------------*
     * Digest each individual records and construct the base
     *
     * Store each pass of the tree in JSON
     *---------------------------------------------------------*/
    console.log('   +- Constructing base hashes');
    var baseHashes = [];
    for(var i=0;i<dataSet.data.length;i++){
        baseHashes.push(sha256(sha256(dataSet.data[i])).toString('hex'));
    }
    treeJson.baseHashes = baseHashes;

    constructTree(baseHashes);
    /*---------------------------------------------------------*/

}

execute();