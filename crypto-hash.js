const crypto = require("crypto");
//const hexToBinary = require("hex-to-binary");  // imported as npm i hex-to-binary (not gtive the proper view of hashes so used in block.js  )

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");
  hash.update(inputs.sort().join(""));
  return hash.digest("hex");   //added the hex to binary conversion for max difficulty
};

result = cryptoHash("world", "hello");
//console.log(result);
module.exports = cryptoHash;
