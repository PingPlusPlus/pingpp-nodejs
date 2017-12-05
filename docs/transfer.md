# 企业付款

### 创建企业付款
``` js
pingpp.transfers.create({
  order_no:    new Date().getTime().toString(),
  app:         { id: APP_ID },
  channel:     "wx_pub",// 目前支持 wx(新渠道)、 wx_pub
  amount:      100,// 订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100,企业付款最小发送金额为 1 元）
  currency:    "cny",
  type:        "b2c",// 付款类型，当前仅支持 b2c 企业付款
  recipient:   "Openid",// 接收者 id， 为用户在 wx(新渠道)、wx_pub 下的 open_id
  description: "Your Description"
}, function(err, transfer) {
  // YOUR CODE
});
```

### 企业付款取消
``` js
/* 企业付款取消 */
pingpp.transfers.cancel(
  transfer.id,
  function(err, transfers) {
    if (err!=null){
      console.log("pingpp.transfers.cancel fail:",err)
    }
    // YOUR CODE
  }
);
```

### 企业付款查询
``` js
pingpp.transfers.retrieve(
  "TRANSFER_ID", // TRANSFER ID
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