exports.catchDBError = (error) => {
  console.log(error);
  return Promise.reject(new Error('Db Error'));
};
