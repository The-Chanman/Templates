// This is a interpreter for Blockchain OP returns
var forge = require('node-forge');
var assert = require('assert');
var Chain = require('chain-node');
var chain = new Chain({
  keyId: '2b2fece03da1aabd4cf995af0115c47d',// Your API Key ID
  keySecret:  'a73c5ba71b278e9c48c01304b6360257',// Your API Secret Key
  blockChain: 'bitcoin',// The network you want to use 'bitcoin' or 'testnet3'
});

//tests
assert(isAI('69daedbbaf179722d706be95871eded536786747e62ff317d56005053e8812e7') === true, 'isAI function is not working.') ;


// given an identifier find the OP returns of that address

//var address = process.argv[2];
var address = '15v1f3RVNGGkZtL91gdRN4kAD4NH38todk';

//initialize the results
var OpR = [];

// retrieve the OP returns of the address
chain.getAddressOpReturns(address, function(err, resp) {
  	OpR = resp;
  	var falseindex = [];
	for (var i = OpR.length - 1; i >= 0; i--) {
		var isSender = false;
		for (var j = OpR[i].sender_addresses.length - 1; j >= 0; j--) {
			if(OpR[i].sender_addresses[j] === address){
				isSender = true;
				break;
			}
		};
		if (isSender){
			falseindex.push(i);
		}	
	};
	for (var i = 0; i < falseindex.length; i++) {
		OpR.splice(falseindex[i],1);
	};
	console.log("The address " + address + " has these attributes:\n");
	for (var i = OpR.length - 1; i >= 0; i--) {
		console.log(OpR[i].text);
	};
});



function isAI(str){
	var md = forge.md.sha256.create();
	var string = 'accredited investor true';
	md.update(string);
	var hex = md.digest().toHex();
	var patt = new RegExp(hex);

	return patt.test(str);
};

