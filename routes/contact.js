var express = require('express');
var router = express.Router();
var pool = require('../mySQLconector');

/* GET users listing. */
router.get('', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('', function (req, res) {
  var userEmail = req.body.userEmail;
  var userName = req.body.userName;
  var userMessage = req.body.userMessage;
  var userObject = req.body.userObject;
  var values = [[userName,userEmail,userMessage,userObject]];
  var sql = "INSERT INTO contact (contact_name,contact_email,contact_message,contact_object) VALUES ?"
  pool.query(sql , [values], function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  })
  res.redirect('/');
});

module.exports = router;
