// Ping++ Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// 接入支付流程参考开发者中心：https://www.pingxx.com/docs/server/charge ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 Ping++ SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC"
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_1Gqj58ynP0mHeX1q"
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

var channel = 'alipay'; // 支付使用的第三方支付渠道取值，请参考：https://www.pingxx.com/api#api-c-new
var extra = {};
switch (channel) {
  case 'alipay_wap':
    extra = {
      // success_url 和 cancel_url 在本地测试不要写 localhost ，请写 127.0.0.1。URL 后面不要加自定义参数
      'success_url': 'http://www.yourdomain.com/success',
      'cancel_url': 'http://www.yourdomain.com/cancel'
    };
    break;
  case 'upacp_wap':
    extra = {
      'result_url': 'http://www.yourdomain.com/result'// 银联同步回调地址
    };
    break;
  // 请根据 API 文档说明，根据不同渠道，添加不同的 extra 参数。
}
var crypto = require('crypto');
var order_no = crypto.createHash('md5')
              .update(new Date().getTime().toString())
              .digest('hex').substr(0, 16);

pingpp.charges.create({
  order_no:  order_no,// 推荐使用 8-20 位，要求数字或字母，不允许其他字符
  app:       { id: APP_ID },
  channel:   channel,// 支付使用的第三方支付渠道取值，请参考：https://www.pingxx.com/api#api-c-new
  amount:    100,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
  client_ip: "127.0.0.1",// 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
  currency:  "cny",
  subject:   "Your Subject",
  body:      "Your Body",
  extra:     extra
}, function(err, charge) {
  if (err != null) {
    console.log("pingpp.charges.create fail:", err);
  }
  // YOUR CODE
});
