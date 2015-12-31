'use strict';
// 配置 API Key 和 App ID
// 从 Ping++ 管理平台应用信息里获取
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC" // 这里填入你的 Test/Live Key
var APP_ID = "app_1Gqj58ynP0mHeX1q" // 这里填入你的应用 ID

var http = require('http');
var url = require('url');
var crypto = require('crypto');
var pingpp = require('pingpp')(API_KEY);

var createPayment = function(channel, amount, client_ip, open_id, cb){
  // 以下 channel 仅为部分需要 extra 参数的示例，详见 https://www.pingxx.com/document/api#api-c-new
  var extra = {};
  switch (channel) {
    case 'alipay_wap':
      extra = {
        'success_url': 'http://www.yourdomain.com/success',
        'cancel_url': 'http://www.yourdomain.com/cancel'
      };
      break;
    case 'upacp_wap':
      extra = {
        'result_url': 'http://www.yourdomain.com/result'
      };
      break;
    case 'upmp_wap':
      extra = {
        'result_url': 'http://www.yourdomain.com/result?code='
      };
      break;
    case 'bfb_wap':
      extra = {
        'bfb_login': true,
        'result_url': 'http://www.yourdomain.com/success'
      };
      break;
    case 'wx_pub':
      extra = {
        'open_id': open_id
      };
      break;
  }
  // 商户系统自己生成的订单号。如果是【壹收款】，则使用客户端传上来的 'order_no'。
  var order_no = crypto.createHash('md5')
                .update(new Date().getTime().toString())
                .digest('hex').substr(0, 12);
  pingpp.charges.create({
    order_no:  order_no,
    app:       {id: APP_ID},
    channel:   channel,
    amount:    amount,
    client_ip: client_ip,
    currency:  "cny",
    subject:   "Charge Subject",
    body:      "Charge Body",
    extra:     extra
  }, cb);
};
http.createServer(function (req, res) {

  pingpp.parseHeaders(req.headers); // 把从客户端传上来的 Headers 传到这里

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