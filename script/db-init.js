const mongoose = require('mongoose');
const config = require('../config/env.conf');
const siteSchema = require('../src/db/schema/site');
const bookSchema = require('../src/db/schema/book');

async function init() {
  let dbConnection = await mongoose.createConnection(config.mongodbServer);
  let Site = dbConnection.model('Site', siteSchema);
  let Book = dbConnection.model('Book', bookSchema);
  // let session = await dbConnection.startSession();

  // session.startTransaction();
  let site = await Site.create([
    {
      name: '起点中文网',
    },
  ]);
  console.log(site);

  let book = await Book.create([
    {
      siteId: site[0]._id,
      spaceId: site[0]._id,
      name: 'test',
    },
  ]);

  console.log(book);
}

init().then(
  (res) => {
    console.log('success');
  },
  (error) => {
    console.log('error');
    console.log(error);
  },
);
