const Block = require("./Block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }
  addBlock({ data }) {
    // adding the new block in chain
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    // replacing the chain with new chain
    if (chain.length <= this.chain.length) {
      console.error("Chain is not longer than the current chain");
      return;
    }
    if (!Blockchain.isValidChain(chain)) { 
      console.error("Chain is not valid");
      return;
    }
    this.chain = chain;
  }

  static isValidChain(chain) {
    //validations of chain
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
      const lastDifficulty =chain[i-1].difficulty;
      const realLastHash = chain[i - 1].hash;

      if (prevHash !== realLastHash) return false;
      

      const validatedHash = cryptoHash(
        timestamp,
        prevHash,
        nonce,
        difficulty,
        data,
      );
      if (hash !== validatedHash) return false;
      if (Math.abs(lastDifficulty - difficulty) > 1 ) return false; //class setting down the difficulty should not be <>
    }

    return true;
  }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data: "Block1" });
blockchain.addBlock({ data: "Block2" });
blockchain.addBlock({ data: "Block3" });
const result = Blockchain.isValidChain(blockchain.chain);
console.log(result);
console.log(blockchain.chain);
//console.log(blockchain);

module.exports = Blockchain; 
