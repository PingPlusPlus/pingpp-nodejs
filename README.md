Pingpp Node.js SDK
=================

****

## 简介

lib 文件夹下是 Node.js SDK 文件，<br>
example 文件夹里面是一个简单的接入示例，该示例仅供参考。

## 安装
`npm install pingpp`

## 接入方法

初始化 pingpp 实例：

```js
var pingpp = require('pingpp')('YOUR-KEY');
```
发起支付请求示例：

```js
pingpp.charges.create({
  order_no:  "123456789",
  app: {id:  "YOUR-APP-ID"},
  channel:   pingpp.channel.ALIPAY,
  amount:    100,
  client_ip: "127.0.0.1",
  currency:  "cny",
  subject:   "Your Subject",
  body:      "Your Body"
}, function(err, charge) {
  // YOUR CODE
});
```

详细使用方法请参考 [技术文档](https://pingxx.com/document) 或者参考 [example](https://github.com/PingPlusPlus/pingpp-nodejs/tree/master/example) 文件夹里的示例。

##更新日志

###1.0.3
* 更改：<br>
cURL 使用 TLSv1.x

###1.0.4
* 更改：<br>
移除旧的 refund 方法