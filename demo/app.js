var express = require("express");
var bodyParser = require("body-parser");

var Geetest = require('../gt-sdk');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

// pc 端接口

var pcGeetest = new Geetest({
    privateKey: '36fc3fe98530eea08dfc6ce76e3d24c4',
    publicKey: 'b46d1900d0a894591916ea94ea91bd2c'
});
app.get("/pc-geetest/register", function (req, res) {

    // 向极验申请一次验证所需的challenge
    pcGeetest.register(function (data) {
        res.send(JSON.stringify({
            gt: pcGeetest.publicKey,
            challenge: data.challenge,
            success: data.success
        }));
    });
});
app.post("/pc-geetest/validate", function (req, res) {

    // 对ajax提交的验证结果值进行验证
    pcGeetest.validate({
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
app.post("/pc-geetest/form-validate", function (req, res) {

    // 对form表单的结果进行验证
    pcGeetest.validate({

        challenge: req.body.geetest_challenge,
        validate: req.body.geetest_validate,
        seccode: req.body.geetest_seccode

    }, function (err, result) {
        if (err || !result) {
            res.send("<h1 style='text-align: center'>登录失败</h1>");
        } else {
            res.send("<h1 style='text-align: center'>登录成功</h1>");
        }
    });
});

// 移动端接口
var mobileGeetest = new Geetest({
    privateKey: 'f5883f4ee3bd4fa8caec67941de1b903',
    publicKey: '7c25da6fe21944cfe507d2f9876775a9'
});
app.get("/mobile-geetest/register", function (req, res) {

    // 向极验申请一次验证所需的challenge
    mobileGeetest.register(function (data) {
        res.send(JSON.stringify({
            gt: mobileGeetest.publicKey,
            challenge: data.challenge,
            success: data.success
        }));
    });
});
app.post("/mobile-geetest/validate", function (req, res) {

    // 对ajax提交的验证结果值进行验证
    mobileGeetest.validate({
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

var port = 8080;
app.listen(port, function () {
    console.log('listening at http://localhost:' + port)
});
