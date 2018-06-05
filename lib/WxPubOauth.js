'use strict';

var WxOAuth = require('./WxOAuth');

module.exports = {
  getOpenid: function(appId, appSecret, code, callback) {
    return WxOAuth.getWxPubOpenid(appId, appSecret, code, callback)
      .then(function(res) {
        callback(null, res.openid, res);
      }).catch(function(e) {
        callback(e);
      });
  },

  createOauthUrlForCode: function(appId, redirectURL, moreInfo) {
    return WxOAuth.createOauthUrlForCode(appId, redirectURL, moreInfo);
  },

  getJsapiTicket: function(appId, appSecret, callback) {
    return WxOAuth.getJsapiTicket(appId, appSecret, callback);
  },

  getSignature: function(charge, jsapi_ticket, url) {
    return WxOAuth.getSignature(charge, jsapi_ticket, url);
  }
};
