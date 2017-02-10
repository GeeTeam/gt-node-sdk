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

    // 向极验申请每次验证所需的challenge
    pcGeetest.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/pc-geetest/validate", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    pcGeetest.validate({
        challenge: req.body.geetest_challenge,
        validate: req.body.geetest_validate,
        seccode: req.body.geetest_seccode
    }, function (err, success) {

        if (err) {
            // 网络错误
            res.send({
                status: "error",
                info: err
            });
        } else if (!success) {

            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        } else {

            res.send({
                status: "success",
                info: '登录成功'
            });
        }
    });
});
app.post("/pc-geetest/form-validate", function (req, res) {

    // 对form表单提供的验证凭证进行验证
    pcGeetest.validate({

        challenge: req.body.geetest_challenge,
        validate: req.body.geetest_validate,
        seccode: req.body.geetest_seccode

    }, function (err, success) {

        if (err) {
            // 网络错误
            res.send(err);

        } else if (!success) {

            // 二次验证失败
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

    // 向极验申请每次验证所需的challenge
    mobileGeetest.register().then(function (data) {

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }

    }, function (err) {

        console.error(err);

    });
});
app.post("/mobile-geetest/validate", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    mobileGeetest.validate({
        challenge: req.body.geetest_challenge,
        validate: req.body.geetest_validate,
        seccode: req.body.geetest_seccode
    }).then(function (success) {
        if (success) {
            res.send({
                status: "success",
                info: '登录成功'
            });
        } else {
            res.send({
                status: "fail",
                info: '登录失败'
            });
        }
    }, function (err) {
        // 网络错误
        res.send({
            status: "error",
            info: err
        });
    });
});

var port = 9988;
app.listen(port, function () {
    console.log('listening at http://localhost:' + port)
});
