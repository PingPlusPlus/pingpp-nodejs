Pingpp Node.js 
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
var pingpp = require('pingpp')('YOU-KEY');
```
发起支付请求示例：

```js
pingpp.charges.create({
  subject: "Charge Subject",
  body: "Charge Body",
  amount: 100,
  order_no: "OrderNo",
  channel: pingpp.channel.ALIPAY,
  currency: "cny",
  client_ip: "127.0.0.1",
  app: {id: "YOUR-APP-ID"}
}, function(err, charge) {
  // YOUR CODE
});
```

详细使用方法请参考 [技术文档](https://pingplusplus.com/document) 或者参考 [example](https://github.com/PingPlusPlus/pingpp-nodejs/tree/master/example) 文件夹里的示例。
