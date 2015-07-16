var util = require('util');
 
var bitcoin = require('bitcoinjs-lib');
var Chain = require('chain-node');
var chain = new Chain({
  keyId: '1eaa45cc291f8da9c5852c3af0138de3',
  keySecret: 'a3c26f47d6cdc1dd991d61a9363085c8',
  blockChain: 'bitcoin'
});

var gammaWIF = 'KzETDApVJQ7Bxe2cFndpG85ZWapL6zrLW6KyGz2A2UJ66pnsaRiv';
var gammaK = bitcoin.ECKey.fromWIF(gammaWIF);
var gammaA = '15v1f3RVNGGkZtL91gdRN4kAD4NH38todk';

var deltaWIF = 'L23fREQ9x8fdiNp8V7hQhEpBHVNqPb8pQKaNQXRjVGMHrP7SLkKV';
var deltaK = bitcoin.ECKey.fromWIF(deltaWIF);
var deltaA = '17dXgEGt2ae1HNz2KT37fRymgb4F7mDLdR';

var b = new Buffer("Hi Chanman");
var t = new bitcoin.Transaction();

t.addInput("99561dee76c4fa147c1a48cf9e607e7c530b33ca14b6890e9088ae3a1453dbad", 0);
t.addOutput(gammaA, 1000);
t.addOutput(bitcoin.Script.fromChunks([bitcoin.opcodes.OP_RETURN, b]), 0);
t.sign(0, deltaK);
console.log(t.toHex())
 
chain.sendTransaction(t.toHex(), function(err, resp) {
  console.log("error=" + util.inspect(err));
  console.log("response=" + util.inspect(resp, {depth: null}));
});

/*
transaction_hash: 'c64d88fce5eaee8a81a94133d5c44e67ea2e91ecac26e138e51f59ab789bc5cc'
transaction_hex: '0100000001addb53143aae88900e89b614ca330b537c7e609ecf481a7c14
fac476ee1d5699000000006b483045022100ac77c2feb0ffb12eb93d64c8ced44869bf54bfae8c86
e9485d0c0406c3fe5caf02203d291178e2a48a87bd125cacef2386e6a50b93808650d7ee848ce759
edf2d9330121025af7cd77c9da8052bbdc19d4f7f870637d448ab4228080e98877a14fbee750eeff
ffffff02983a0000000000001976a91435e718bc2df87cd3e17b19a994725f1ee9fcdcaa88ac0000
0000000000001a6a1848656c6c6f2c2066726f6d20746865204368616e6d616e2e00000000' }
*/