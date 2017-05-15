// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../lib/pingpp')(API_KEY);
// pingpp.parseHeaders(/*headers*/); // 把从客户端传上来的 Headers 传到这里

// 设置请求签名密钥，密钥对需要你自己用 openssl 工具生成，如何生成可以参考帮助中心：https://help.pingxx.com/article/123161；
// 生成密钥后，需要在代码中设置请求签名的私钥(rsa_private_key.pem)；
// 然后登录 [Dashboard](https://dashboard.pingxx.com)->点击右上角公司名称->开发信息->商户公钥（用于商户身份验证）
// 将你的公钥复制粘贴进去并且保存->先启用 Test 模式进行测试->测试通过后启用 Live 模式

// 设置请求签名私钥路径
pingpp.setPrivateKeyPath(__dirname + '/your_rsa_private_key.pem');
// 或者设置请求签名私钥内容，请保留换行符 "\n"
// pingpp.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----\n\
// ......\n\
// ... 私钥内容 ...\n\
// ......\n\
// -----END RSA PRIVATE KEY-----');

// 请求参数的 extra 对应各渠道的取值规则请查看 charge_extra 相应方法内说明
var charge_extra = require('./charge_extra');

var channel = 'alipay'; // 支付使用的第三方支付渠道取值，请参考：https://www.pingxx.com/api#api-c-new
var extra = charge_extra(channel);

/**
 *  商户订单号，适配每个渠道对此参数的要求，必须在商户系统内唯一。(alipay : 1-64 位，
 *  wx: 2-32 位，bfb: 1-20 位，upacp: 8-40 位，yeepay_wap: 1-50 位，
 *  jdpay_wap: 1-30 位，qpay: 1-30 位，cmb_wallet: 10 位纯数字字符串。
 *  注：除 cmb_wallet 外的其他渠道推荐使用 8-20 位，要求数字或字母，不允许特殊字符)。
 */
var order_no = new Date().getTime().toString().substr(0, 10);

pingpp.charges.create({
  order_no:  order_no, // 推荐使用 8-20 位，要求数字或字母，不允许其他字符
  app:       { id: APP_ID },
  channel:   channel, // 支付使用的第三方支付渠道取值，请参考：https://www.pingxx.com/api#api-c-new
  amount:    100, //订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
  client_ip: '127.0.0.1', // 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
  currency:  'cny',
  subject:   'Your Subject',
  body:      'Your Body',
  extra:     extra
}, function(err, charge) {
  if (err != null) {
    console.log('pingpp.charges.create failed: ', err);
  } else {
    console.log(charge);
  }
  // YOUR CODE
});
