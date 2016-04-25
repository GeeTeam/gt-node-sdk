var express = require("express");
var bodyParser = require("body-parser");

var privateKey = '36fc3fe98530eea08dfc6ce76e3d24c4';
var publicKey = 'b46d1900d0a894591916ea94ea91bd2c';

var Geetest = require('./gt-sdk');

var geetest = new Geetest(privateKey, publicKey);

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/gt.js", function (req, res) {
  res.sendFile(__dirname + "/gt.js");
});

app.get("/register", function (req, res) {

  // 向极验申请一次验证所需的challenge
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

  // 对ajax提交的验证结果值进行验证
  geetest.validate({

    challenge: req.body.geetest_challenge,
    validate: req.body.geetest_validate,
    seccode: req.body.geetest_seccode

  }, function (err, result) {

    var data = {status: "success", info: '登录成功'};

    if (err || !result) {

      data.status = "fail";
      data.info = '登录失败';
    }

    res.send(JSON.stringify(data));

  });
});

app.post("/form-validate", function (req, res) {

  // 对ajax表达提交的验证码结果值进行验证
  geetest.validate({

    challenge: req.body.geetest_challenge,
    validate: req.body.geetest_validate,
    seccode: req.body.geetest_seccode

  }, function (err, result) {
    if (err || !result) {
      res.send("<h1 style='text-align: center'>登陆失败</h1>")
    } else {
      res.send("<h1 style='text-align: center'>登陆成功</h1>")
    }
  });
});

var port = 8080;
var server = app.listen(port, function () {
  console.log('Example app listening at http://localhost:' + port)

});
