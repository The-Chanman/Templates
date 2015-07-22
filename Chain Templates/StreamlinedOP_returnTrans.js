/*************************************************************************
Creating a Transaction with anything in the OP_return
By Eric Chan
--------------------------------------------------------------------------
Only Requires Three Inputs:
pkWIF: 	The Wallet Import Format of the private key you 
				want to send funds from.

recieveA: The Public Address you want to recieve the message
	
message: 	What you want to be contained inside the OP_return
					(Due to current bitcoin protocols you can only store
					40 bytes of infromation inside the OP_return)
--------------------------------------------------------------------------
Notes: 
Pushing the transaction
-----------------------
I am currently using Chain.com's API to push the transaction however
if you would like to do it more manually and see the actual transaction
go to the bottom of this code and delete the two '//'
next once you run the code it will print out a transaction hex
Go to https://btc.blockr.io/tx/push
and paste that hex into the giant box 

For your information
---------------------
One Blockchain.info one cannot view a transaction that has an OP_return
untill it has been confirmed.
I recommending going to https://www.blocktrail.com/ to see your
transaction. For example:
https://www.blocktrail.com/BTC/tx/81c4ec988e14550c2081cd471b5626d7340a1a2ece9e5cce2132d6e9799b5e81#tx_messages

*************************************************************************/

// Important Setup stuff (Library information)
var util = require('util');
 
var bitcoin = require('bitcoinjs-lib');
var Chain = require('chain-node');
var chain = new Chain({
  keyId:  ,// Your Chain API Key ID
  keySecret:  ,// Your Chain API Secret Key
  blockChain:  ,// The network you want to use 'bitcoin' or 'testnet3'
});


/************************************************************************
						The Three inputs that I need for this to work 
*************************************************************************/
// private key of sending address in WIF format
var pkWIF = 'Insert Private Key WIF here';

// Address of the recipiant 
var recieveA = 'Insert Address here';

// Message to send
var message = 'Insert Message here';


/************************************************************************
														Optional Inputs 
*************************************************************************/
// amount to send
var sendAmount = 20000;

/************************************************************************
						Generation of all the other information I need 
										to construct the transaction
*************************************************************************/

/* Standard fee of the transaction
(Any lower fee will reduces the chances	of your transaction being mined)*/

var fee = 10000;

// Sender Information
var bnbK = bitcoin.ECKey.fromWIF(pkWIF);
var bnbA = bnbK.pub.getAddress().toString();
console.log("Sender's Address: " + bnbA);

// The OP_return Buffer: Places your message into correct format 
var b = new Buffer(message);

// get the unspent output 
chain.getAddressUnspents(bnbA, function(err, resp){
	unspentTrans = resp;
	//display errors if there are any
	if(unspentTrans.message != undefined){
		console.log(unspentTrans);	
	}

	var unspentTransL = unspentTrans.length;
// if there are no unspent transactions
	if(unspentTransL == 0 ){
		console.log('You have no bitcoins in this Address. Please send some to: ' + bnbA)
	}
	else{
		var transIndex = -1;
		var transHash = '';
		var change = 0;
		for(var i = 0; i < unspentTransL; i++)
		{
			if((unspentTrans[i].value - fee - sendAmount) >= 0){
				// amount of change to get back
				change = unspentTrans[i].value - fee - sendAmount;
				transIndex = i;
				transHash = unspentTrans[i].transaction_hash;
				break;
			}
		}
		if(transIndex == -1){
			console.log('You do not have enough bitcoins in this Address. Please send some to: ' + bnbA)
		}
		else{
			//Create the new Transaction
			var t = new bitcoin.Transaction();
			t.addInput(transHash,transIndex);
			t.addOutput(recieveA, sendAmount);
			t.addOutput(bnbA, change);
			t.addOutput(bitcoin.Script.fromChunks([bitcoin.opcodes.OP_RETURN, b]), 0);
			t.sign(0, bnbK);

			// print out the hex 
			console.log('The hex of your transaction: \n'+t.toHex());

			// /*  delete the '//' infront of this line if you want to submit manually

			// use chain to send the transaction and return with either an error or response
			chain.sendTransaction(t.toHex(), function(err, resp) {
  		console.log("\n\nerror=" + util.inspect(err));
  		console.log("response=" + util.inspect(resp, {depth: null}));
			});

			//  delete the '//' infront of this line if you want to submit manually */

		}

	}
})
	