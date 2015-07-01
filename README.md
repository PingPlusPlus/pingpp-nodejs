Pingpp Node.js SDK
=================
****

## 简介
lib 文件夹下是 Node.js SDK 文件，<br>
example 文件夹里面是一个简单的接入示例，该示例仅供参考。

## 版本要求
nodejs 版本 v0.8.0 及以上

## 安装
`npm install pingpp`<br>
或者<br>
下载源码后，在目录下运行 `npm install`

### 初始化
``` js
var pingpp = require('pingpp')('YOUR-KEY');
```

### 支付
``` js
pingpp.charges.create({
  order_no:  "123456789",
  app:       { id: "APP_ID" },
  channel:   channel,
  amount:    100,
  client_ip: "127.0.0.1",
  currency:  "cny",
  subject:   "Your Subject",
  body:      "Your Body",
  extra:     extra
}, function(err, charge) {
  // YOUR CODE
});
```

### 查询
``` js
pingpp.charges.retrieve(
  "CHARGE_ID",
  function(err, charge) {
    // YOUR CODE
  }
);
```
``` js
pingpp.charges.list(
  { limit: 5 },
  function(err, charges) {
    // YOUR CODE
  }
);
```

### 退款
``` js
pingpp.charges.createRefund(
  "CHARGE_ID",
  { amount: 100, description: "Refund Description" },
  function(err, refund) {
    // YOUR CODE
  }
);
```

### 退款查询
``` js
pingpp.charges.retrieveRefund(
  "CHARGE_ID",
  "REFUND_ID",
  function(err, refund) {
    // YOUR CODE
  }
);
```
``` js
pingpp.charges.listRefunds(
  "CHARGE_ID",
  { limit: 5 },
  function(err, refunds) {
    // YOUR CODE
  }
);
```

### 红包
``` js
pingpp.redEnvelopes.create({
  order_no:    "123456789",
  app:         { id: "APP_ID" },
  channel:     "wx_pub",
  amount:      100,
  currency:    "cny",
  subject:     "Your Subject",
  body:        "Your Body",
  extra: {
    nick_name: "Nick Name",
    send_name: "Send Name"
  },
  recipient:   "Openid",
  description: "Your Description"
}, function(err, redEnvelope) {
  // YOUR CODE
});
```

### 微信公众号获取签名
如果使用微信 JS-SDK 来调起支付，需要在创建 `charge` 后，获取签名（`signature`），传给 HTML5 SDK。
``` js
pingpp.wxPubOauth.getJsapiTicket(wx_app_id, wx_app_secret, function(e, response){
  var ticket = response['ticket'];
});
```
**正常情况下，`jsapi_ticket` 的有效期为 7200 秒。由于获取 `jsapi_ticket` 的 api 调用次数非常有限，频繁刷新 `jsapi_ticket` 会导致 api 调用受限，影响自身业务，开发者必须在自己的服务器全局缓存 `jsapi_ticket`。**

_下面方法中 `url` 是当前网页的 URL，不包含`#`及其后面部分_
``` js
var signature = pingpp.wxPubOauth.getSignature(charge, ticket, url);
```
然后在 HTML5 SDK 里调用
``` js
pingpp.createPayment(charge, callback, signature, false);
```

### Event 事件
``` js
pingpp.events.retrieve(
  "EVENT_ID",
  function(err, event) {
    // YOUR CODE
  }
);
```
``` js
pingpp.events.list(
  { limit: 5 },
  function(err, events) {
    // YOUR CODE
  }
);
```

### 企业付款
``` js
pingpp.transfers.create({
  order_no:    "123456789",
  app:         { id: "APP_ID" },
  channel:     "wx_pub",
  amount:      100,
  currency:    "cny",
  type:        "b2c",
  recipient:   "Openid",
  description: "Your Description"
}, function(err, transfer) {
  // YOUR CODE
});
```
### 企业付款查询
``` js
pingpp.transfers.retrieve(
  "TRANSFER_ID",
  function(err, transfer) {
    // YOUR CODE
  }
);
```
``` js
pingpp.transfers.list(
  { limit: 5 },
  function(err, transfers) {
    // YOUR CODE
  }
);
```

**详细信息请参考 [API 文档](https://pingxx.com/document/api?node.js)。**
