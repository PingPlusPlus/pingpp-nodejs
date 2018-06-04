# 查询银行卡信息

### 查询银行卡信息
``` js
pingpp.cardInfo.query(
  { app: APP_ID,
    bank_account: '6222280012469823' },
  function (err, data) {
    if (err != null){
      console.log('failed: ', err);
    }
    // YOUR CODE
  }
);
```
