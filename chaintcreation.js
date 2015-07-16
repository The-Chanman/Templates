// chain transaction creation.
//a Satoshi is a 10^-8 of a BTC or 0.00000001 BTC

var Chain = require('chain-node');
var WebSocket = require('ws');
var bitcore = require('bitcore');
var chain = new Chain({
  keyId: '1eaa45cc291f8da9c5852c3af0138de3',
  keySecret: 'a3c26f47d6cdc1dd991d61a9363085c8',
  blockChain: 'bitcoin'
});

chain.blockChain = 'testnet3';

//var wif1 =  'cResvXSvCQdmHxKqQ5Roh5b83GooXKqx2Kxi4mL7uMAciBLoqUQD';
//var testkey1 = bitcore.PrivateKey.fromBuffer(wif1);
//var key = bitcore.PrivateKey();
//address1 = testkey1.toAddress();

var wif2 =  'cPYykJkQ4R1RPfJysfyYCLHs87tT7xUWkv6b5XBF4gFBaVoGSbYz';
//key = 3ac9e8ca76562a13f3eac52f6abb983489e47c401a86969b97cb1af171eb24ad
var testkey2 = bitcore.PrivateKey.fromWIF(wif2, bitcore.Networks.testnet);
address2 = testkey2.toAddress(bitcore.Networks.testnet);
//address = mw6YyDSziiXXEVYot1UrKTYARibn6yAz1R
//console.log(address1)
console.log(address2);  
//console.log(testkey1)
//console.log(testkey2);

chain.getAddress(address2.toString(), function(err, resp) {
  console.log(resp);
});

//chain.transact(
//  {
//    inputs: [{
//      address: address2.toString(),
//      private_key: wif2
//    }],
//    outputs: [{
//      address: '2N4qpXXNZHSKhd6yKcCzPGTg9oeiXrWqSat',
//      amount: 10000000
//    }],
//    miner_fee_rate: 10000
//  }, function(err, resp) {});