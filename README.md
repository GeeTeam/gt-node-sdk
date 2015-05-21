
# What's New in 0.2.0 更新内容
Pass public key to use `register` API, optional right now, if you don't use it now, the captcha might broke some time in the future  

将你的Public Key作为第二个参数传入，此参数现在为可选参数，只有传入才能够使用`register`接口。Register接口可能在将来成为必须的接口

#Install 安装

```
npm install geetest

```

#Setup 配置

PRIVATE_KEY is the key, PUBLIC_KEY is the ID

```
var geetest = require('geetest')('YOUR_PRIVATE_KEY', ['YOUR_PUBLIC_KEY');

```

#Usage 使用流程

###1.Init with private key and public key 使用私钥和公钥初始化
```
var geetest = require('geetest)('Private key', 'Public Key')

```
###2.Use register api to get challenge on each request 
在每次用户请求验证码时使用register接口获取challenge

```
geetest.register(function(challenge) {
	if(challenge) {
		//deal with it
		res.json({challenge: challenge})
	}
})
```
###3.Add captcha script to your page 在页面上添加验证的script

Put the challenge into the src 将challenge作为参数传入src

```
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
```
geetest.validate({
	challenge: //form's [geetest_challenge],
	validate: //form's [geetest_validate],
	seccode: //form's [geetest_seccode],
}, function(result) {
	if(result) {
		//validate pass
	}
	else {
		//validate fail
	}
})
```
#Node.js Register API 验证函数
```
geetest.register(function(challenge) {
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
```
app.post('/someForm', geetest.bodyParser, yourHandler);
```

###API:
```
module.exports.yourHandler = function(req, res) {
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
