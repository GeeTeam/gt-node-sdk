**注意：3.x.x之后修改了所传入的字段名称，将 `publicKey` 和 `privateKey` 修改为 `geetest_id` 和 `geetest_key` ，升级会造成不兼容问题，请各位注意在升级前修改相应的字段名称，新用户无须关注此修改**

**我们现在将 https://static.geetest.com/static/tools/gt.js 文件放在了本地，目的在于利用多CDN，尽可能保证静态文件的加载。**

# Install 安装

```
npm install geetest --save
```

# 运行DEMO

```shell
cd Project
git clone https://github.com/GeeTeam/gt-node-sdk.git
cd gt-node-sdk
npm install
npm start
// 最后请打开浏览器访问localhost:8080
// 了解sdk的使用方式请查阅demo目录下的app.js文件
```

# 使用说明

sdk 提供 `Geetest` 构造函数，实例化时需要传入一个配置对象。

配置对象的字段如下：

- `geetest_id`：验证公钥，**必须**
- `geetest_key`：验证私钥，**必须**
- `protocol`：与极验服务器交互时使用的协议，默认为 `http://`，**可选**
- `api_server`：针对私有化用户提供对默认的 `api.geetest.com` 进行修改，普通用户无需关注此选项，**可选**

`geetest_id` 和 `geetest_key` 申请地址：[account.geetest.com](http://account.geetest.com/)

申请后，初始化 `Geetest`：

```js
var Geetest = require('geetest');

var captcha = new Geetest({
    geetest_id: 'xxx', // 将xxx替换为您申请的id
    geetest_key: 'xxx', // 将xxx替换为您申请的key
});
```

上述 `Geetest` 的实例 `captcha` 提供两个方法：

## `register(callback)`

```js
// 回调形式
captcha.register(function (err, data) {
    
    // err 表示发生错误
    if (err) {
        console.error(err);
        return;
    }
    
    // data 为一个对象，包含 gt, challenge, success, new_captcha 字段
    // success 为 1 表示正常模式，为 0 表示宕机模式（failback, fallback）
    var body = {
        gt: data.geetest_id,
        challenge: data.challenge,
        success: data.success
    };
    
    // 将 body 发送给前端...
});

// Promise 形式
captcha.register().then(function (data) {
    
    // data 为一个对象，包含 gt, challenge, success, new_captcha 字段
    // success 为 1 表示正常模式，为 0 表示宕机模式（failback, fallback）
    var body = {
        gt: data.geetest_id,
        challenge: data.challenge,
        success: data.success
    };
        
    // 将 body 发送给前端...
    
}, function (err) {
    console.error(err);
});
```

## `validate(result, callback)`

```js
// 回调形式
captcha.validate({
    challenge: 'xxx',
    validate: 'xxx',
    seccode: 'xxx'
}, function (err, success) {

    if (err) {
        console.error(err);
        return;
    }
    
    if (success) {
            
            // 二次验证成功，运行用户的操作
            
        } else {
            
            // 二次验证失败，不允许用户的操作
            
        }
    
});

// Promise 形式
captcha.validate({
    challenge: 'xxx',
    validate: 'xxx',
    seccode: 'xxx'
}).then(function (success) {
    
    if (success) {
        
        // 二次验证成功，运行用户的操作
        
    } else {
        
        // 二次验证失败，不允许用户的操作
        
    }
}, function (err) {
    console.error(err);
})
```

### 使用前，强烈建议您阅读我们的[入门文档](http://www.geetest.com/install/sections/idx-main-frame.html)

### 更新历史：[CHANGELOG](CHANGELOG.md)

