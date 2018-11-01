const dayjs = require('dayjs');
const query = require('../../lib/query');

exports.add = async (ctx, data = {}) => {
  const { name, ownerId, ownerTitle, fansTitle } = data;
  const sequelize = ctx.getConnection();

  // find
  let [space] = await query.select({
    sequelize,
    sql: `select * from space where name = $name or ownerId = $ownerId or fansTitle = $fansTitle limit 0,1`,
    params: { name, ownerId, fansTitle },
  });

  // 重复
  if (space) {
    if (space.ownerId === ownerId) {
      throw new Error('一个人只能有一个客栈');
    }

    if (space.name === name) {
      throw new Error('客栈名已存在');
    }

    if (space.fansTitle === fansTitle) {
      throw new Error('粉丝称号已存在');
    }
  }

  let [spaceId] = await query.insert({
    sequelize,
    sql: `insert into space (name, ownerId, ownerTitle, fansTitle) values($name, $ownerId, $ownerTitle, $fansTitle)`,
    params: { name, ownerId, ownerTitle, fansTitle },
  });

  [space] = await query.select({
    sequelize,
    sql: `select * from space where id = $id`,
    params: { id: spaceId },
  });

  return space;
};
