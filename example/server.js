/**
 * Ping++ Server SDK
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己的需要，按照技术文档编写。
 */
'use strict';
var http = require('http');
var url = require('url');
var crypto = require('crypto');
var pingpp = require('pingpp')('YOUR-KEY');

var createPayment = function(channel, amount, client_ip, open_id, cb){
  var extra = {};
  switch (channel) {
    case 'alipay_wap':
      extra = {
        'success_url': 'http://www.yourdomain.com/success',
        'cancel_url': 'http://www.yourdomain.com/cancel'
      };
      break;
    case 'upacp_wap':
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
        'trade_type': 'JSAPI',
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
    app:       {id: "APP_ID"},
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
      case "/notify":
        // 异步通知
        var notify;
        try {
          notify = JSON.parse(post_data);
        } catch (err) {
          return resp('fail');
        }
        if (notify.object === undefined) {
          return resp('fail');
        }
        switch (notify.object) {
          case "charge":
            // 开发者在此处加入对支付异步通知的处理代码
            return resp("success");
          case "refund":
            // 开发者在此处加入对退款异步通知的处理代码
            return resp("success");
          default:
            return resp("fail");
        }
      default:
        resp("", 404);
        break;
    }
  });
}).listen(8010, "0.0.0.0");