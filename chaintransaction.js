//a Satoshi is a 10^-8 of a BTC or 0.00000001 BTC

var Chain = require('chain-node');
var chain = new Chain({
  keyId: '1eaa45cc291f8da9c5852c3af0138de3',
  keySecret: 'a3c26f47d6cdc1dd991d61a9363085c8',
  blockChain: 'bitcoin'
});

var addr = '1K4nPxBMy6sv7jssTvDLJWk1ADHBZEoUVb';
chain.getAddressTransactions(addr, {limit: 500}, function(err, resp) {
	debugger;
  console.log(resp);
  console.log("Number of Transactions: " + resp.length);
});