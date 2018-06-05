# 微信公众号获取签名
如果使用微信 JS-SDK 来调起支付，需要在创建 `charge` 后，获取签名（`signature`），传给 HTML5 SDK。
``` js
pingpp.wxOAuth.getJsapiTicket(wx_app_id, wx_app_secret, function(e, response){
  var ticket = response['ticket'];
});
```
**正常情况下，`jsapi_ticket` 的有效期为 7200 秒。由于获取 `jsapi_ticket` 的 api 调用次数非常有限，频繁刷新 `jsapi_ticket` 会导致 api 调用受限，影响自身业务，开发者必须在自己的服务器全局缓存 `jsapi_ticket`。**

_下面方法中 `url` 是当前网页的 URL，不包含`#`及其后面部分_
``` js
var signature = pingpp.wxOAuth.getSignature(charge, ticket, url);
```
然后在 HTML5 SDK 里调用
``` js
pingpp.createPayment(charge, callback, signature, false);
```
