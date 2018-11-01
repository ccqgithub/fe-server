const crypto = require('crypto');

// create a token
exports.create = ({ tokenId, secret }) => {
  const md5 = crypto.createHash('md5');
  let result = md5.update(`${tokenId}${secret}`).digest('hex');
  return `${tokenId}-${result}`;
};

// verify a token
exports.verify = ({ token, secret }) => {
  const md5 = crypto.createHash('md5');
  let [tokenId, hash] = token.split('-', 2);
  let result = md5.update(`${tokenId}${secret}`).digest('hex');

  if (result !== hash) return false;

  return {
    tokenId,
    hash,
  };
};
