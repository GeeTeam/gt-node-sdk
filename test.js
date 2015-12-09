var express = require("express");
var bodyParser = require("body-parser");

var privateKey = '50ed17103f109ccf7c25e93cb6e0d378';
var publicKey = 'a0ec7ce42d4291382bfc9ca488313b80';
var api = 'http://api.geetest.com/';

var geetest = require("./gt-sdk")(privateKey, publicKey, api);

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/gt.js", function (req, res) {
  res.sendFile(__dirname + "/gt.js");
});

app.get("/register", function (req, res) {

  geetest.register(function (err, data) {
    if (err) {
      res.send(JSON.stringify({
        gt: publicKey,
        success: false
      }));
    } else {
      res.send(JSON.stringify({
        gt: publicKey,
        challenge: data,
        success: true
      }));
    }
  })
});

app.post("/validate", function (req, res) {

  geetest.validate({

    challenge: req.body.geetest_challenge,
    validate: req.body.geetest_validate,
    seccode: req.body.geetest_seccode

  }, function (err, result) {

    var data = {status: "success"};

    if (err || !result) {

      data.status = "fail";
    }

    res.send(JSON.stringify(data));

  });
});

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)

});
