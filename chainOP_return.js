// Returning the OP return for this address
var Chain = require('chain-node');
var chain = new Chain({
  keyId: '1eaa45cc291f8da9c5852c3af0138de3',
  keySecret: 'a3c26f47d6cdc1dd991d61a9363085c8',
  blockChain: 'bitcoin'
});

var address = '17dXgEGt2ae1HNz2KT37fRymgb4F7mDLdR';

chain.getAddressOpReturns(address, function(err, resp) {
  console.log(resp);
});