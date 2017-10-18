var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    port            : '8889',
    user            : 'contact',
    password        : 'contact',
    database        : 'nodejs'
  });

module.exports = pool;