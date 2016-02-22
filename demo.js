var express = require("express");
var bodyParser = require("body-parser");

var privateKey = '36fc3fe98530eea08dfc6ce76e3d24c4';
var publicKey = 'b46d1900d0a894591916ea94ea91bd2c';

var geetest = require("./gt-sdk")(privateKey, publicKey);

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
        success: 0
      }));
    } else {
      res.send(JSON.stringify({
        gt: publicKey,
        challenge: data,
        success: 1
      }));
    }
  });
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

var port = 8080;
var server = app.listen(port, function () {

  console.log('Example app listening at http://localhost:' + port)

});
