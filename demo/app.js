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
    geetest_id: 'b46d1900d0a894591916ea94ea91bd2c',
    geetest_key: '36fc3fe98530eea08dfc6ce76e3d24c4'
});
app.get("/pc-geetest/register", function (req, res) {

    // 向极验申请一次验证所需的challenge
    pcGeetest.register(function (data) {
        res.send(JSON.stringify({
            gt: pcGeetest.geetest_id,
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
    geetest_id: '7c25da6fe21944cfe507d2f9876775a9',
    geetest_key: 'f5883f4ee3bd4fa8caec67941de1b903'
});
app.get("/mobile-geetest/register", function (req, res) {

    // 向极验申请一次验证所需的challenge
    mobileGeetest.register(function (data) {
        res.send(JSON.stringify({
            gt: mobileGeetest.geetest_id,
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

var port = 9988;
app.listen(port, function () {
    console.log('listening at http://localhost:' + port)
});
