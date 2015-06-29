
#Update in 0.4.0 更新内容
Use recommended error handler method: callback(err, result).  
规范了错误处理，所有的回调函数现在均遵循node规范，以callback(err, result)的形式，因此您需要按照新的方法修改您的代码以正常运行。 

#Update in 0.3.3 更新内容
You can modify the api server address

你现在可以修改APIServer的地址了

# Update in 0.3.1 更新内容
Use register api to check the server status, if it return false, switch to local captcha manually  

现在可以用register接口作为检查服务器是否正常的方法，如果register返回false则切换为本地验证码

# What's New in 0.2.0 更新内容
Pass public key to use `register` API, optional right now, if you don't use it now, the captcha might broke some time in the future  

将你的Public Key作为第二个参数传入，此参数现在为可选参数，只有传入才能够使用`register`接口。Register接口可能在将来成为必须的接口

#Install 安装

```
npm install geetest
```

#Setup 配置

PRIVATE_KEY is the key, PUBLIC_KEY is the ID

```js
var geetest = require('geetest')('YOUR_PRIVATE_KEY', ['YOUR_PUBLIC_KEY');
```

#Usage 使用流程

###1.Init with private key and public key 使用私钥和公钥初始化
```js
var geetest = require('geetest)('Private key', 'Public Key'[, 'api server'])
```
If you are authorized to modify api server, pass the api server as third parameter, it must ends with '/'  
如果是可以自定义api地址的用户，可以将api地址作为第三个参数传入，注意要以'/'结尾，例如'http://api.geetest.com/'

###2.Use register api to get challenge on each request 
在每次用户请求验证码时使用register接口获取challenge

```js
geetest.register(function(err, challenge) {
	if (err) {
		//network error
		return;
	}
	if(challenge) {
		//deal with it
		res.json({challenge: challenge})
	}
})
```
###3.Add captcha script to your page 在页面上添加验证的script

See [Web api](http://www.geetest.com/docs/sdk/build/html/sections/web_api.html) for more detail  
具体见[Web api](http://www.geetest.com/docs/sdk/build/html/sections/web_api.html)

Put the challenge into the src 将challenge作为参数传入src

```js
$http.get('/request/to/your/register/api').success(function(e) {
	var s = document.createElement('script');
	s.src = 'http://api.geetest.com/get.php?gt=yourPublicKey&challenge=' + challenge;
	s.async = true;
	document.body.append(s);//append the script where ever you want
})

```
###4.Validate the result 验证前端的提交

See Validate API or Express Middleware below  
见以下Validate接口或Express中间件
#Node.js Validate API 验证函数
```js
geetest.validate({
	challenge: //form's [geetest_challenge],
	validate: //form's [geetest_validate],
	seccode: //form's [geetest_seccode],
}, function(err, result) {
	if (err) {
		//network error
		return;
	}
	if(result) {
		//validate pass
	}
	else {
		//validate fail
	}
	
})
```
#Node.js Register API 验证函数
```js
geetest.register(function(err, challenge) {
	if (err) {
		//network error
		return;
	}
	if(challenge) {
		//put this challenge into the request of get in your website
		//将challenge作为参数传入前端的get请求
	}
	else {
		//Fail to reach the server, use failback method
		//无法链接无服务器，使用本地验证码
	}
})
```

#Express
Note: `express.bodyParser()` is required for geetest-sdk's bodyParser.

##Use as middleware 使用中间件

###Router  路由:  
```js
app.post('/someForm', geetest.bodyParser, yourHandler);
```

###API:
```js
module.exports.yourHandler = function(err, req, res, next) {
	if(err) {
		//network error
		return next(err)
	}
	if(req.geetest) {
		console.log('GeeTest captcha validation pass');
		//DO WHAT EVER NEXT
		res.json({success: true})
	}
	else {
		res.json({err: 'GeeTest captcha validation fail'});
	}
}

```
