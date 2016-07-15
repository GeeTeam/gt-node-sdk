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

sdk提供Geetest构造函数，实例化时需要传入一个配置对象

配置对象的字段如下：

- privateKey：验证私钥，**必须**
- publicKey：验证公钥，**必须**
- protocol：与极验服务器交互时使用的协议，默认为http://，**可选**
- apiServer：针对私有化用户提供对默认的api.geetest.com进行修改，普通用户无需关注此选项，**可选**

privateKey和publicKey申请地址：http://account.geetest.com/
```
var Geetest = require('geetest');
var captcha = new Geetest({
    privateKey: 'xxx', // 将xxx替换为您申请的privateKey
    publicKey: 'xxx', // 将xxx替换为您申请的publicKey
});
```

上述Geetest的实例captcha提供两个方法：

## register(callback)
```
captcha.register(function (data) {
    // data为一个对象，里面包含challenge和success字段
    // 正常模式下challenge为32为，success为1
    // failback模式下challenge为34为，success为0
});
```
## validate(result, callback)
```
captcha.validate({
    challenge: 'xxx',
    validate: 'xxx',
    seccode: 'xxx'
}, function (err, success) {
    // err存在表示出现网络错误
    // success表示二次查询是否成功
}
```


### 使用前，强烈建议您阅读我们的 [入门文档](http://www.geetest.com/install/sections/idx-main-frame.html)

### 更新历史：[CHANGELOG](CHANGELOG)

