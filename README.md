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


### 使用前，强烈建议您阅读我们的 [入门文档](http://www.geetest.com/install/sections/idx-main-frame.html)

### 更新历史：[CHANGELOG](CHANGELOG)

