const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {
  //creating a block structure
  constructor({ timestamp, prevHash, hash, data , nonce ,difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  static genesis() {
    // making of genesis block
    return new this(GENESIS_DATA);
  }
  static mineBlock({ prevBlock, data }) {
    //mnining the block with hash
    let hash,timestamp;
    const prevHash = prevBlock.hash;
    let {difficulty} = prevBlock;

      let nonce=0;
    do{
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({originalBlock:prevBlock, timestamp});
      hash = cryptoHash(timestamp, prevHash, data, nonce , difficulty);    
   }
      while(hexToBinary(hash).substring(0,difficulty)!=="0".repeat(difficulty));

    return new this({
      timestamp,
      prevHash,
      data,
      difficulty,
      nonce,
      hash
    });
  }

  static adjustDifficulty({ originalBlock,timestamp }){    //adjusting the difficulty of the block
    const {difficulty}= originalBlock;
    if  (difficulty<1) return 1; 
    const  difference = timestamp-originalBlock.timestamp;
    if(difference > MINE_RATE) return difficulty-1;
    return difficulty  +1;
  }



  
  
}

const block1 = new Block({
  // block1 is an instance of Block
  timestamp: "01/01/2020",
  prevHash: "0x12345",
  hash: "67890",
  data: "block1",
});


//const genesisBlock = Block.genesis();  
//console.log(block1);
//console.log(genesisBlock);

//const result = Block.mineBlock({    // passing the prevBlock and data
  //prevBlock: block1,
 // data: "block2",
//});
// console.log(result);
module.exports = Block;