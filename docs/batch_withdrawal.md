# 账户余额批量提现确认

### 批量确认提现确认
``` js
pingpp.batchWithdrawals.create(
  APP_ID, // App ID
  {
    "withdrawals": [
      "1701611150302360654", // 待确认提现对象 ID
      "1701611151015078981"  // 待确认提现对象 ID
    ]
  },
  function(err, data) {
    if (err!=null){
      console.log("pingpp.batchWithdrawals.create fail:",err)
    }
    // YOUR CODE
  }
);
```


### 批量确认提现查询
``` js
pingpp.batchWithdrawals.retrieve(
  APP_ID, // App ID
  "1901611151015122025", // 批量提现 ID
  function(err, data) {
    // YOUR CODE
  }
);
```