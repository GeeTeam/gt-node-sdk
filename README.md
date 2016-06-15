# Update in 1.0.0 更新内容

1.添加多实例验证码创建方法
2.更新demo

# Update in 0.5.4 更新内容
对challenge进行md5操作，增加安全性。

# Update in 0.5.1 更新内容
将sdk里面的bodyParser函数去掉，简化了各接口的内部实现，接口使用不变。
添加了示例，并将带有failback功能的脚本统一放到了gt.js文件中，提供一个initGeetest的接口，用法参考示例

# Update in 0.4.0 更新内容
Use recommended error handler method: callback(err, result).
规范了错误处理，所有的回调函数现在均遵循node规范，以callback(err, result)的形式，因此您需要按照新的方法修改您的代码以正常运行。 

# Update in 0.3.3 更新内容
You can modify the api server address

你现在可以修改APIServer的地址了

# Update in 0.3.1 更新内容
Use register api to check the server status, if it return false, switch to local captcha manually  

现在可以用register接口作为检查服务器是否正常的方法，如果register返回false则切换为本地验证码

# What's New in 0.2.0 更新内容
Pass public key to use `register` API, optional right now, if you don't use it now, the captcha might broke some time in the future  

将你的Public Key作为第二个参数传入，此参数现在为可选参数，只有传入才能够使用`register`接口。Register接口可能在将来成为必须的接口

# Install 安装

```
npm install geetest
```

# 运行DEMO

```shell
cd Project
git clone https://github.com/GeeTeam/gt-node-sdk.git
cd gt-node-sdk
npm install
npm run server
// 最后请打开浏览器访问localhost:8080
// 了解sdk的使用方式请查阅demo目录下的app.js文件
```

# 使用说明
sdk提供Geetest构造函数，实例化时必须传入id和key参数
id和key申请地址：http://account.geetest.com/
```
var id = 'xxx'; // 将xxx替换成您申请的id
var key = 'xxx'; // 将xxx替换成您申请的key
var Geetest = require('geetest');
var captcha = new Geetest(id, key);
```

上述Geetest的实例captcha提供两个方法：

## register(callback)
```
captcha.register(function (err, challenge) {
    // challenge为成功申请的注册码，前端验证码初始时必备的参数
});
```
## validate(result, callback)
```
captcha.validate({
    challenge: 'xxx',
    validate: 'xxx',
    seccode: 'xxx'
}, function (err, success) {
    // success表示二次查询是否成功
}
```


### 使用前，强烈建议您阅读我们的 [入门文档](www.geetest.com/install/sections/idx-main-frame.html)

