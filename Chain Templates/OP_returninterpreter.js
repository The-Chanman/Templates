// This is a interpreter for Blockchain OP returns
var forge = require('node-forge');
var assert = require('assert');
var Chain = require('chain-node');
var chain = new Chain({
  keyId: ,// Your API Key ID
  keySecret:  ,// Your API Secret Key
  blockChain: ,// The network you want to use 'bitcoin' or 'testnet3'
});

// given an identifier find the OP returns of that address
var address = process.argv[2];


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
	
	//Print out all the OP returns addressed to this address. 
	console.log("The address " + address + " has these Op Returns:\n");
	for (var i = OpR.length - 1; i >= 0; i--) {
		console.log(OpR[i].text);
	};

});



