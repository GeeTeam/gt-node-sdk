# 4.1.0 

1. 重命名配置参数 `apiServer` 为 `api_server`
2. 完善 README

# 4.0.0

1. 完善 `register` 和 `validate` 接口提供的 Promise 风格的异步处理形式
2. 对于使用回调（handler）形式，符合了 NodeJS 中对错误的通知（即回调的第一个参数为err）
3. 修改demo，使用了 Promise 风格和回调风格，同时强调了 failback 流程

# 3.0.0

1. 鉴于遇到很多用户对 `publicKey` 和 `privateKey` 容易搞混淆，先将其改名为 `geetest_id` 和 `geetest_key` 。因此，和以前的版本无法兼容，所以修改主版本号。

# 2.2.1

1. 优化移动端自实现弹出式验证demo


# 2.2.0

1. 新增移动端自实现弹出式验证demo

# 2.1.1

1. 修复register协议名称未添加bug

# 2.1.0

1. 添加promise形式回调

# 2.0.0

1. 增加failback模式
2. 修改了接口register的回调参数
3. 实例化传参改为传入一个配置对象

具体请参照用法说明：[README](README.md)

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