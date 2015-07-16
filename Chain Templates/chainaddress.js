//a Satoshi is a 10^-8 of a BTC or 0.00000001 BTC

var Chain = require('chain-node');
var chain = new Chain({
  keyId:  ,// Your API Key ID
  keySecret:  ,// Your API Secret Key
  blockChain:  ,// The network you want to use 'bitcoin' or 'testnet3'
});

// the address that we will retrieve info from 
var address =  ;// Any address such as '12ZsGzmccFRpd3XjWXua4mvyafLZNCAieS'

// function that converts from satoshiToBTC
function satoshiToBTC(satoshis ){
	return satoshis/100000000;
};

// use chain to get the address and extract some basic information. 
chain.getAddress(address, function(err, resp) {
	var BTCaddress = {"address": resp[0].address, 
		"total": { "balance": satoshiToBTC(resp[0].total.balance), 
			"received": satoshiToBTC(resp[0].total.received), 
			"sent": satoshiToBTC(resp[0].total.sent)}, 
		"confirmed": {
			"balance": satoshiToBTC(resp[0].confirmed.balance), 
			"received": satoshiToBTC(resp[0].confirmed.received), 
			"sent": satoshiToBTC(resp[0].confirmed.sent)}
		};
	console.log(BTCaddress);
});