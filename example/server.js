'use strict';
// Ping++ Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// 接入支付流程参考开发者中心：https://www.pingxx.com/docs/server/charge ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 Ping++ SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC"
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_1Gqj58ynP0mHeX1q"

var http = require('http');
var url = require('url');
var crypto = require('crypto');
var pingpp = require('../lib/pingpp')(API_KEY);

var createPayment = function(channel, amount, client_ip, open_id, cb){
  // 以下 channel 仅为部分需要 extra 参数的示例，详见 https://www.pingxx.com/document/api#api-c-new
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
    case 'bfb_wap':
      extra = {
        'bfb_login': true,// 是否需要登录百度钱包来进行支付
        'result_url': 'http://www.yourdomain.com/success'// 百度钱包同步回调地址
      };
      break;
    case 'wx_pub':
      extra = {
        'open_id': open_id// 用户在商户微信公众号下的唯一标识，获取方式可参考 wxPubOauth.js
      };
      break;
  }
  // 商户系统自己生成的订单号。如果是【壹收款】，则使用客户端传上来的 'order_no'。
  var order_no = crypto.createHash('md5')
                .update(new Date().getTime().toString())
                .digest('hex').substr(0, 12);
  pingpp.charges.create({
    order_no:  order_no,// 推荐使用 8-20 位，要求数字或字母，不允许其他字符
    app:       {id: APP_ID},
    channel:   channel,// 支付使用的第三方支付渠道取值，请参考：https://www.pingxx.com/api#api-c-new
    amount:    amount,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
    client_ip: client_ip,// 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
    currency:  "cny",
    subject:   "Charge Subject",
    body:      "Charge Body",
    extra:     extra
  }, cb);
};
http.createServer(function (req, res) {

  pingpp.parseHeaders(req.headers); // 把从客户端传上来的 Headers 传到这里

  // 设置请求签名密钥，密钥对需要你自己用 openssl 工具生成，如何生成可以参考帮助中心：https://help.pingxx.com/article/123161；
  // 生成密钥后，需要在代码中设置请求签名的私钥(rsa_private_key.pem)；
  // 然后登录 [Dashboard](https://dashboard.pingxx.com)->点击右上角公司名称->开发信息->商户公钥（用于商户身份验证）
  // 将你的公钥复制粘贴进去并且保存->先启用 Test 模式进行测试->测试通过后启用 Live 模式

  // 设置你的私钥路径，用于请求的签名，对应的公钥请填写到 Ping++ 管理平台
  pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");

  req.setEncoding('utf-8');
  var post_data = "";
  req.addListener("data", function (chunk) {
    post_data += chunk;
  });
  req.addListener("end", function () {
    var resp = function (ret, http_code) {
      http_code = typeof http_code == "undefined" ? 200 : http_code;
      res.writeHead(http_code, {
        "Content-Type": "application/json;charset=utf-8"
      });
      if (typeof ret != "string") {
        ret = JSON.stringify(ret)
      }
      res.end(ret);
    }
    switch (req.url) {
      case "/pay":
        // 创建 charge
        var client_ip = req.connection.remoteAddress;
        var params;
        try {
          params = JSON.parse(post_data);
        } catch (err) {
          return resp({error:"json_parse_error"});
        }
        var channel = params["channel"].toLocaleLowerCase();
        var amount = params["amount"];
        var open_id = params["open_id"];
        createPayment(channel, amount, client_ip, open_id, function(err, charge) {
          if (charge != null) {
            return resp(charge);
          }
          return resp({error:err.raw});
        });
        break;

      default:
        resp("", 404);
        break;
    }
  });
}).listen(8010, "0.0.0.0");
