# 账户充值

### 创建 recharge
``` js
var order_no = new Date().getTime().toString().substr(0, 10);
var channel = 'alipay_wap'; // 支付使用的第三方支付渠道取值，请参考：https://www.pingxx.com/api#api-c-new
var params = {
  'user': 'user_test_02', // 充值目标用户 ID, 必传
  'user_fee': 10, // 用户充值收取的手续费，单位分，不得大于 amount，不可和 balance_bonus[amount] 同时传，默认 0。可选
  'description': 'Recharge description.', // 描述, 可选
  'charge': {
    'amount': 30, // 用户实际支付金额，单位分, 必传
    'channel': channel, // 支付使用的第三方支付渠道, 必传
    'order_no': order_no, // 商户订单号，适配每个渠道对此参数的要求，必须在商户系统内唯一, 必传
    'client_ip': '127.0.0.1', // 客户端的 IP，IPv4，默认 127.0.0.1, 可选
    'subject': 'Recharge subject', // 充值标题，该参数最长为 32 个 Unicode 字符, 必传
    'body': 'Recharge body', // 充值描述信息，该参数最长为 128 个 Unicode 字符, 必传
    'extra': {'success_url':'https://example.com/success'}  // extra: 根据不同渠道传入相应的参数
  }
};
pingpp.recharge.create(APP_ID, params, function(err, recharge) {
  if (err!=null){
    console.log('pingpp.recharge.create fail:',err)
  }
  // YOUR CODE
});
```


### 查询单个 recharge
``` js
pingpp.recharge.retrieve(APP_ID,
  '220170829596751616000001', // Recharge ID
  function(err, recharge) {
    if (err!=null){
      console.log('pingpp.recharge.retrieve fail:',err)
    }
    // YOUR CODE
});
```


### 查询 recharge 列表
``` js
pingpp.recharge.list(APP_ID, {'page': 1, 'per_page': 3}, function(err, recharges) {
  if (err!=null){
    console.log('pingpp.recharge.list fail:',err)
  }
  // YOUR CODE
});
```