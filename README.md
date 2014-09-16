#Install 安装

```
npm install geetest

```

#Setup 配置

```
var geetest = require('geetest')('YOUR_PRIVATE_KEY');

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