"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
 for (let line of poem) {
	 createBlock(line)

}
// Create a funcion called createBlock

function createBlock(_data){
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length -1].hash,
		data: _data,
		timestamp: Date.now()
	}
	block.hash = blockHash(block)
	Blockchain.blocks.push(block)
	console.log(block)
	return block
}


function verifyBlock(bl){

	if (bl.data == null) return false; 
	if (bl.index === 0) {
		if (bl.hash != "000000") return false;			
	}
	else{
		if (!bl.prevHash) return false; 
		if (!(
				typeof bl.index === "number" &&
				Number.isInteger(bl.index) &&
				bl.index > 0
		))
		{
			return false;		
		}
		if (bl.hash !== blockHash(bl)) return false;
		if (Array.isArray(bl.data)) return false;

	}
	return true;

}

function verifyChain(_chain){
// how walk throught the chain
	var prevHash; // how I got the prevHash value???
	for (let bl of _chain.blocks) {
		if (prevHash && bl.prevHash !==prevHash) return false;
		if(!verifyBlock(bl)) return false
	}
	return true

	
}
console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	//let block = JSON.stringify(bl);
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		// (index, prevHash, data, and timestampp)
		`${bl.index};${bl.prevHash};${bl.data};${bl.timestamp};`
	).digest("hex");
}
