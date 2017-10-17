var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  var params = querystring.parse(url.parse(req.url).query);
  res.render('index', { title: 'Express', name: params.name, email: params.email, message:params.message });
});

module.exports = router;
