var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
var pool = require('../mySQLconector');

/* GET message by id. */
router.get('/:id', function (req, res, next) {
  var params = req.params;
  var sql = "SELECT * FROM contact WHERE id = ?"
  pool.query(sql, params.id, function (err, message) {
    if (err) throw err;
    console.log("Result: " + message);
    res.render('message', {
      title: 'Message',
      message: message[0]
    });
  })
});

router.post('/add', function (req, res) {
  var userEmail = req.body.userEmail;
  var userName = req.body.userName;
  var userMessage = req.body.userMessage;
  var userObject = req.body.userObject;
  var values = [
    [userName, userEmail, userMessage, userObject]
  ];
  var sql = "INSERT INTO contact (contact_name,contact_email,contact_message,contact_object) VALUES ?"
  pool.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  })
  res.redirect('/messages');
});

router.post('/edit/:id', function (req, res) {
  var params = req.params;
  var userMessage = req.body.userMessage;
  var values = [
    [userMessage]
  ];
  var sql = "UPDATE contact SET ? WHERE id =" + params.id + "";
  pool.query(sql, {
    contact_message: userMessage
  }, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result.changedRows);
  })
  res.redirect('/messages');
});

router.post('/delete/:id', function (req, res) {
  var params = req.params;
  var userMessage = req.body.userMessage;
  var values = [
    [userMessage]
  ];
  var sql = "DELETE FROM contact WHERE id =" + params.id + "";
  pool.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result.affectedRows);
  })
  res.redirect('/messages');
});

module.exports = router;