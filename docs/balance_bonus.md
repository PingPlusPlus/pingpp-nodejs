# 账户余额赠送

### 创建余额赠送
``` js
var order_no = new Date().getTime().toString().substr(0, 10);
var params_create = {
  'user': 'user_test_02', // 受赠的用户 ID, 必传
  'order_no': order_no, // 商户订单号，必须在商户系统内唯一, 必传
  'amount': 10, // 支付受赠余额，单位：分, 必传
  'description': 'Your Description' // 描述, 可选
};
pingpp.balanceBonuses.create(APP_ID, params_create, function(err, data) {
  if (err != null){
    console.log('pingpp.balanceBonuses.create fail:', err);
  }
  // YOUR CODE
});
```


### 查询单个余额赠送
``` js
pingpp.balanceBonuses.retrieve(APP_ID,
  "650170821521710018560001", // BalanceBonuses ID
  function(err, data) {
    if (err != null){
      console.log('pingpp.balanceBonuses.retrieve fail:', err);
    }
    // YOUR CODE
});

```


### 查询余额赠送列表
``` js
pingpp.balanceBonuses.list(APP_ID, {'page': 1, 'per_page': 3}, function(err, data) {
  if (err != null){
    console.log('pingpp.balanceBonuses.list fail:', err);
  }
  // YOUR CODE
});
```
