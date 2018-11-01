const { catchDBError } = require('./catch');

exports.query = async ({ sequelize, sql, params = {}, type }) => {
  let result = await sequelize
    .query(sql, {
      type,
      bind: params,
    })
    .catch(catchDBError);

  return result;
};

exports.select = async (opts) => {
  return exports.query({ ...opts, type: opts.sequelize.QueryTypes.SELECT });
};

exports.insert = async (opts) => {
  return exports.query({ ...opts, type: opts.sequelize.QueryTypes.INSERT });
};

exports.update = async (opts) => {
  return exports.query({ ...opts, type: opts.sequelize.QueryTypes.UPDATE });
};

exports.delete = async (opts) => {
  return exports.query({ ...opts, type: opts.sequelize.QueryTypes.DELETE });
};
