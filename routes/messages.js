var express = require('express');
var router = express.Router();
var pool = require('../mySQLconector');

/* GET messages listing. */
router.get('', function(req, res, next) {
  var sql = "SELECT * FROM contact"
  pool.query(sql, function (err, messages) {
    if (err) throw err;
    console.log("Result: " + messages);
    res.render('messages', { title: 'Messages', messages: messages });
  })
});

module.exports = router;
