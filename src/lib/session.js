/**
 * session 加密解密
 */
const crypto = require('crypto');
const prjConf = require('../../config/project.conf');

// encrypt
exports.encrypt = function encrypt(str) {
  const cipher = crypto.createCipher('aes192', prjConf.sessionPass);
  let encrypted = cipher.update(str);
  encrypted += cipher.final('hex');
  return encrypted;
};

// decrypt
exports.decrypt = function decrypt(str) {
  const decipher = crypto.createDecipher('aes192', prjConf.sessionPass);
  let decrypted = decipher.update(str, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
