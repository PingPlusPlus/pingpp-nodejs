// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../lib/pingpp')(API_KEY);
pingpp.setPrivateKeyPath(__dirname + '/your_rsa_private_key.pem');

var channel = 'allinpay';

var transfer_extra_recipient = require('./transfer_extra');
var recipient = transfer_extra_recipient.recipient(channel);
var extra = transfer_extra_recipient.extra(channel);

// 付款使用的商户内部订单号。
// wx_pub 规定为 1 ~ 50 位不能重复的数字字母组合;
// alipay 为 1 ~ 64 位不能重复的数字字母组合;
// unionpay 为 1 ~ 16 位的纯数字;
// jdpay 限长 1 ~ 64 位不能重复的数字字母组合;
// allinpay 限长 20 ~ 40 位不能重复的数字字母组合，必须以签约的通联的商户号开头（建议组合格式：通联商户号 + 时间戳 + 固定位数顺序流水号，不包含+号）
var order_no = new Date().getTime().toString();
if (channel == 'allinpay') {
  order_no = '301002' + (new Date().getTime().toString()) + '000001';
}

var params = {
  order_no:    order_no,
  app:         { id: APP_ID },
  channel:     channel, // 目前支持 支付宝：alipay，银联：unionpay，微信公众号：wx_pub，通联：allinpay，京东：jdpay
  amount:      100, // 订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100,企业付款最小发送金额为 1 元）
  currency:    'cny',
  type:        'b2c', // 付款类型，转账到个人用户为 b2c，转账到企业用户为 b2b（微信公众号 wx_pub 的企业付款，仅支持 b2c）。
  description: 'Your Description',
  extra:       extra // 对应各渠道的取值规则请查看 transfer_extra 相应方法内说明
};

if (recipient) {
  params.recipient = recipient;
}

/* 企业付款 */
pingpp.transfers.create(params, function(err, transfer) {
  if (err != null) {
    console.log('pingpp.transfers.create failed: ', err);
  } else {
    console.log(transfer);
  }
  // YOUR CODE
});
