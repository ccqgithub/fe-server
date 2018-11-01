exports.catchError = function catchError(fn) {
  return function catchErrorFn(...args) {
    try {
      return fn.bind(this)(...args);
    } catch (e) {
      console.error(e);
    }
  };
};
