var util = require('util');
 
var bitcoin = require('bitcoinjs-lib');
var Chain = require('chain-node');
var chain = new Chain({
  keyId:  ,// Your API Key ID
  keySecret:  ,// Your API Secret Key
  blockChain:  ,// The network you want to use 'bitcoin' or 'testnet3'
});

// put a WIF formated Private key here
var recievingWIF = ; 
// converts into a private key format ysed by bitcoinjs-lib
var recievingKey = bitcoin.ECKey.fromWIF(recievingWIF); 
// the public address of the key 
var recievingPublicAddress = recievingKey.pub.getAddress().toString();

// put a WIF formated Private key here
var sendingWIF = ;
// converts into a private key format ysed by bitcoinjs-lib
var sendingKey = bitcoin.ECKey.fromWIF(sendingWIF);
// the public address of the key 
var sendingAddress = sendingKey.pub.getAddress().toString();

// what you want in the OP_Return
var b = new Buffer("Thanks Chanman for this Template");
// creating a new bitcoin transaction
var t = new bitcoin.Transaction();

// add input as one of the outputs of a transaction sent to an address you own 
// second field is the array index of the output of the transaction you control
t.addInput("insert Transaction Hash Here", 0);
// add a recieving address and the amount to send them with satoshis
// you can add as many as you want as long as you have the funds in the inputs
t.addOutput(recievingPublicAddress, 1000);
// add the OP_return 
t.addOutput(bitcoin.Script.fromChunks([bitcoin.opcodes.OP_RETURN, b]), 0);
// sign that transaction
t.sign(0, sendingKey);
//print out the hex version of the transaction to the screen
console.log(t.toHex())
 
// use chain to send the transaction and return with either an error or response 
chain.sendTransaction(t.toHex(), function(err, resp) {
  console.log("error=" + util.inspect(err));
  console.log("response=" + util.inspect(resp, {depth: null}));
});
