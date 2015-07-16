// Returning the OP return for this address

var Chain = require('chain-node');
var chain = new Chain({
  keyId:  ,// Your API Key ID
  keySecret:  ,// Your API Secret Key
  blockChain:  ,// The network you want to use 'bitcoin' or 'testnet3'
});

// the address that we will retrieve info from 
var address =  ;// Any address such as '17dXgEGt2ae1HNz2KT37fRymgb4F7mDLdR'

// use chain to look for the transactions with OP_returns for the particular address
chain.getAddressOpReturns(address, function(err, resp) {
  console.log(resp);
});