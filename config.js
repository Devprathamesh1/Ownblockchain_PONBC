const MINE_RATE = 1000;  //2s = 2000ms
const INITIAL_DIFFICULTY = 2;
const GENESIS_DATA ={
  timestamp:1,
  prevHash:"1234",
  hash:"21325",
  difficulty: INITIAL_DIFFICULTY,
  nonce:0,
  data:[],
  
};

module.exports = { GENESIS_DATA, MINE_RATE };
//export default {GENESIS_DATA};