const dayjs = require('dayjs');

const token = require('../../lib/token');
const query = require('../../lib/query');

// login from openid
exports.login = async (ctx, data = {}) => {
  const { openid, secret } = data;
  const sequelize = ctx.getConnection();

  // find
  let [user] = await query.select({
    sequelize,
    sql: `select * from user where openid = $openid`,
    params: { openid },
  });

  // create
  if (!user) {
    let nickname = `${Date.now()}${Math.round(Math.random() * 1000)}`;

    let [userId, count] = await query.insert({
      sequelize,
      sql: `insert into user (openid, status, nickname) values($openid, $status, $nickname)`,
      params: { openid, nickname, status: 'INIT' },
    });

    [user] = await query.select({
      sequelize,
      sql: `select * from user where openid = $openid`,
      params: { openid },
    });
  }

  // generate token
  let [tokenId, count] = await query.insert({
    sequelize,
    sql: `insert into token (userId, type, expired) values($userId, $type, $expired)`,
    params: {
      userId: user.id,
      type: 'MP_LOGIN',
      expired: dayjs()
        .add(365, 'day')
        .format('YYYY-MM-DD HH:mm:ss'),
    },
  });

  // await query.delete
  await query.delete({
    sequelize,
    sql: `delete from token where userId = $userId and id not in (select t.id from (select * from token order by createdAt desc limit 0,2) as t)`,
    params: {
      userId: user.id,
    },
  });

  user.token = token.create({
    tokenId,
    secret,
  });

  return user;
};

// check token
exports.checkToken = async (ctx, data = {}) => {
  let verifyResult = token.verify({
    token: data.token,
    secret: data.secret,
  });
  if (!verifyResult) {
    return {
      invalid: true,
    };
  }

  const sequelize = ctx.getConnection();
  let [userToken] = await query.select({
    sequelize,
    sql: `select * from token where id = $id`,
    params: { id: verifyResult.tokenId },
  });

  if (!userToken || dayjs(userToken.expired).valueOf() <= Date.now()) {
    return {
      expired: true,
    };
  }

  let [user] = await query.select({
    sequelize,
    sql: `select * from user where id = $id`,
    params: { id: userToken.userId },
  });

  return { user };
};
