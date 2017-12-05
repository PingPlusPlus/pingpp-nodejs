# 账户余额提现

### 用户发起余额提现
``` js
pingpp.withdrawals.create(
  "APP_ID", // App ID
  {
    "user": "USER_ID", // 用户 ID
    "amount": 20000, // 转账金额
    "user_fee": 50, // 用户需要承担的手续费
    "order_no":"123", // 提现订单号，为长度不大于 16 的数字
    "description": "test232description", // 转账描述
    "extra": {
      "card_number": "6225210207073918", // 收款人银行卡号或者存折号
      "user_name": "姓名", // 收款人姓名
      "open_bank_code": "0102", // 开户银行编号，open_bank_code 和 open_bank 必须填写一个，优先推荐填写 open_bank_code
      "prov": "上海", // 开户银行省份
      "city": "上海"  // 开户银行城市
    }
  }, function(err, data) {
    // YOUR CODE
  }
);
```

### 查询账户提现
``` js
pingpp.withdrawals.list(
  APP_ID, // App ID
  function(err, user) {
    // YOUR CODE
  }
);

pingpp.withdrawals.retrieve(
  "APP_ID", // App ID
  "WITHDRAWA_ID",
  function(err, user) {
    // YOUR CODE
  }
);
```

### 账户提现撤销
``` js
pingpp.withdrawals.cancel(
  "APP_ID", // App ID
  "WITHDRAWA_ID",
  function(err, user) {
    // YOUR CODE
  }
)
```
