// Ping++ Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// API接入文档：https://www.pingxx.com ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 Ping++ SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

// 请求参数的 extra 对应各渠道的取值规则请查看 charge_extra 相应方法内说明
var charge_extra = require('../charge_extra');

/**
 * 创建 recharge
 */
var order_no = new Date().getTime().toString().substr(0, 10);
var channel = 'alipay_wap'; // 支付使用的第三方支付渠道取值，请参考：https://www.pingxx.com/api#api-c-new
var extra = charge_extra(channel);
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
    'extra': extra  // extra: 根据不同渠道传入相应的参数
  }
};
pingpp.recharge.create(APP_ID, params, function(err, recharge) {
  if (err!=null){
    console.log('pingpp.recharge.create fail:',err)
  }
  // YOUR CODE
});

/**
 * 查询单个 recharge
 */
pingpp.recharge.retrieve(APP_ID,
  '220170829596751616000001', // Recharge ID
  function(err, recharge) {
    if (err!=null){
      console.log('pingpp.recharge.retrieve fail:',err)
    }
    // YOUR CODE
});

/**
 * 查询 recharge 列表
 */
var params_list = {
  'page': 1,
  'per_page': 3
};
pingpp.recharge.list(APP_ID, params_list, function(err, recharges) {
  if (err!=null){
    console.log('pingpp.recharge.list fail:',err)
  }
  // YOUR CODE
});