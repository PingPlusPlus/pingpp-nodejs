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
  app:       { id: "YOUR-APP-ID" },
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
  "CHARGE-ID",
  function(err, charge) {
    // YOUR CODE
  }
);
```
``` js
pingpp.charges.list({ limit: 5 }, function(err, charges) {
  // YOUR CODE
});
```

### 退款
``` js
pingpp.charges.createRefund(
  "CHARGE-ID",
  { amount: 100, description: "Refund Description" },
  function(err, refund) {
    // YOUR CODE
  }
);
```

### 退款查询
``` js
 pingpp.charges.retrieveRefund(
    "CHARGE-ID",
    "REFUND-ID",
    function(err, refund) {
      // YOUR CODE
    }
  );
```
``` js
pingpp.charges.listRefunds(
    "CHARGE-ID",
    { limit: 5 },
    function(err, refunds) {
      // 异步调用
    }
  );
```

### 微信红包
``` js
pingpp.redEnvelopes.create({
  order_no:    "123456789",
  app:         { id: "YOUR-APP-ID" },
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

**详细信息请参考 [API 文档](https://pingxx.com/document/api?node.js)。**
