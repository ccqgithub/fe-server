const path = require('path');
const fs = require('fs');

const defs = [];
const schemaDir = path.resolve(__dirname, './schema/');

function walk(p) {
  const dirList = fs.readdirSync(p);

  dirList.forEach((item) => {
    let file = `${p}/${item}`;
    let stat = fs.statSync(file);

    if (stat.isFile() && path.extname(file) === '.gql') {
      defs.push(fs.readFileSync(file, 'utf-8'));
    } else if (stat.isDirectory()) {
      walk(file);
    }
  });
}

walk(schemaDir);

module.exports = defs;
