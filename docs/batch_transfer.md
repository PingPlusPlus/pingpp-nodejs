# 企业批量付款

### 企业批量付款
``` js
pingpp.batchTransfers.create({
  "app": "APP_ID",
  "batch_no": "123456789", // 批量付款批次号
  "channel": "alipay", // 目前只支持 alipay
  "amount": 8000, // 批量付款总金额
  "description": "Your Description",
  "recipients": [
    {
      "account": "account01@alipay.com", // 接收者支付宝账号
      "amount": 5000, // 付款金额
      "name": "李狗" // 接收者姓名
    },
    {
      "account": "account02@alipay.com", // 接收者支付宝账号
      "amount": 3000, // 付款金额
      "name": "伢子" // 接收者姓名
    }
  ], 
  "type": "b2c" // 付款类型，当前仅支持 b2c 企业付款
}, function(err, transfer) {
  // YOUR CODE
});
```

### 企业批量付款查询
``` js
/* 查询 */
pingpp.batchTransfers.retrieve(
  // 通过 Transfer 对象的 id 查询一个已创建的 Transfer 对象
  "181610181347533047",
  function(err, transfer) {
    // YOUR CODE
  }
);

/* 查询列表 */
pingpp.batchTransfers.list(
  {page: 1},
  function(err, transfers) {
    // YOUR CODE
  }
);
```