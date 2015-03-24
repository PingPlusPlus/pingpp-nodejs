'use strict';
var http = require('http');
var _url = require('url');
var pingpp = require('pingpp')('YOUR-KEY');
http.createServer(function (req, res) {
  var urlParts = _url.parse(req.url, true);
  switch (urlParts.pathname) {
    case "/oauth": // 跳转到微信进行认证
      var oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode('WX-PUB-APP-ID', 'http://example.com/getopenid?showwxpaytitle=1');
      res.writeHead(302, {
        "Location": oauthUrl
      });
      res.end('');
      break;
    case "/getopenid": // 回调地址，获取 openid
      pingpp.wxPubOauth.getOpenid('WX-PUB-APP-ID', 'WX-PUB-APP-SECRET', urlParts.query.code, function(err, openid){
        console.log(openid);
        // ...
        // pass openid to extra['open_id'] and create a charge
        // ...
      });
      break;
    default:
      res.writeHead(404);
      res.end('');
      break;
  }
}).listen(80, "0.0.0.0");