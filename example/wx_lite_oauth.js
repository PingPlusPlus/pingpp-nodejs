'use strict';

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com) -> 点击管理平台右上角公司名称 -> 企业面板 -> 开发参数 -> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';

var pingpp = require('../lib/pingpp')(API_KEY);

var wxLiteAppId = '<WX_LITE_APP_ID>';
var wxLiteAppSecret = '<WX_LITE_APP_SECRET>';
var code = '<CODE>'; // 通过客户端 wx.login() 中获取

pingpp.wxOAuth.getWxLiteOpenid(
  wxLiteAppId, wxLiteAppSecret, code,
  function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }

    // res 包含 openid 和 session_key, 格式:
    // { "openid": "OPENID", "session_key": "SESSIONKEY" }

    // ...
    // pass openid to extra['open_id'] and create a charge
    // ...
  }
);
