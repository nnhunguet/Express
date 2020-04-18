var low = require('lowdb');
var Filesync = require('lowdb/adapters/FileSync');
var adapter = new Filesync('db.json');

db = low(adapter);

db.defaults({ user: [] })
  .write();

module.exports = db;