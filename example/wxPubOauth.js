'use strict';
// 配置 API Key 和 App ID
// 从 Ping++ 管理平台应用信息里获取
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC" // 这里填入你的 Test/Live Key

var http = require('http');
var _url = require('url');
var pingpp = require('pingpp')(API_KEY);
http.createServer(function (req, res) {
  var urlParts = _url.parse(req.url, true);
  switch (urlParts.pathname) {
    case "/oauth": // 跳转到微信进行认证
      var oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode('WX_PUB_APP_ID', 'http://example.com/getopenid?showwxpaytitle=1');
      res.writeHead(302, {
        "Location": oauthUrl
      });
      res.end('');
      break;
    case "/getopenid": // 回调地址，获取 openid
      pingpp.wxPubOauth.getOpenid('WX_PUB_APP_ID', 'WX_PUB_APP_SECRET', urlParts.query.code, function(err, openid){
        console.log(openid);
        // ...
        // pass openid to extra['open_id'] and create a charge
        // ...
      });
      break;
    case "/signature": // 微信公众号获取签名
      pingpp.wxPubOauth.getJsapiTicket('WX_PUB_APP_ID', 'WX_PUB_APP_SECRET', function(e, response){
        // response['ticket'] 是获得的 jsapi_ticket，有效期为 7200 秒，需在自己的服务器全局缓存。
        var charge = {/* 准备支付的 charge */};
        var signature = pingpp.wxPubOauth.getSignature(charge, response['ticket'], 'PAY_PAGE_URL');
        res.writeHead(200);
        res.end(signature);
      });
      break;
    default:
      res.writeHead(404);
      res.end('');
      break;
  }
}).listen(80, "0.0.0.0");