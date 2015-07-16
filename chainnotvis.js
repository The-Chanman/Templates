//a Satoshi is a 10^-8 of a BTC or 0.00000001 BTC

//required modules
var Chain = require('chain-node');
var WebSocket = require('ws');
var express = require('express');

// main module vars
var app = express();
var chain = new Chain({
  keyId: '1eaa45cc291f8da9c5852c3af0138de3',
  keySecret: 'a3c26f47d6cdc1dd991d61a9363085c8',
  blockChain: 'bitcoin'
});

var conn = new WebSocket("wss://ws.chain.com/v2/notifications");
conn.onopen = function (ev) {
  var req = {type: "new-transaction", block_chain: "bitcoin"};
  conn.send(JSON.stringify(req));
};
conn.onmessage = function (ev) {
  var x = JSON.parse(ev.data);
//  var date = x.payload.transaction.chain_received_at
if(x.payload.transaction == undefined){
	console.log("heartbeat")
}
else{
	var fees = x.payload.transaction.fees/100000000
	var amount = x.payload.transaction.amount/100000000
	var address = x.payload.transaction.inputs[0].addresses
  console.log(amount, fees, address);
	}
};
  
conn.onclose = function (ev) {
  var conn = new WebSocket("wss://ws.chain.com/v2/notifications");
};

//server sided
app.get('/', function(req, res){
  res.sendStatus('Hello World');
  
});

app.listen(1337);
console.log('Server running at 127.0.0.1:1337');