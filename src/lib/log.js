exports.logMsg = (message = []) => {
  if (Array.isArray(message)) {
    message.forEach((msg) => console.log(msg));
  } else {
    console.log(message);
  }
};

exports.logError = (error, info = {}) => {
  exports.logMsg(String(error));
  exports.logMsg(error.stack);
  exports.logMsg(info);
};
