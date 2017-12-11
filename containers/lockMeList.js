var express = require('express');
var config = require('../config.json')
var router = express.Router();
var request = require('request');
var pool = require('../mySQLconector');



/* GET messages listing. */
router.get('/', function (req, res, next) {

    // function callback(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log('body', JSON.parse(body));
    //         return body;

    //     }
    //     return body;
    // }
    var options = {
        url: config.cumulocity.url + "/event/events",
        headers: {
            'Authorization': config.cumulocity.auth
        }
    }
    request(options, function (err, response, body) {
        if (err) throw err;
        console.log('body', JSON.parse(body).events);
        res.render('lockmelist', {
            title: 'Liste des messages',
            events: JSON.parse(body).events
        });
    });

});

module.exports = router;