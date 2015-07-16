//a Satoshi is a 10^-8 of a BTC or 0.00000001 BTC

var Chain = require('chain-node');
var chain = new Chain({
  keyId:  ,// Your API Key ID
  keySecret:  ,// Your API Secret Key
  blockChain:  ,// The network you want to use 'bitcoin' or 'testnet3'
});

// the address that we will retrieve info from 
var addr =  ;// Any address such as '12ZsGzmccFRpd3XjWXua4mvyafLZNCAieS'

// get the transaction from the addr limiting it to a max of 500 transaction
chain.getAddressTransactions(addr, {limit: 500}, function(err, resp) {
  console.log(resp);
  console.log("Number of Transactions: " + resp.length);
});