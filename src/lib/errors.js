exports.OBJError = class OBJError extends Error {
  constructor({ message = 'unknown error', status = 500, info = {}, ...args }) {
    super(message);
    this.status = status;
    this.info = info;
    Object.keys(args).forEach((key) => {
      this[key] = args[key];
    });
  }
};
