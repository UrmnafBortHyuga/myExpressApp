var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    var param = {"key":"value=sample API"};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
});

router.get('/hello', function(req, res, next) {
    var param = {"result":"Hello World !"};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
});

router.post('/postname', function(req, res) {
    name = req.body.name;
    var param = {"result":"Hello " + name + "!"};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
});

module.exports = router;