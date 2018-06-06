'use strict';

var WxOAuth = require('./WxOAuth');

/**
* @deprecated since version 2.1.3
*/
module.exports = {
  /**
  * @deprecated since version 2.1.3
  */
  getOpenid: function(appId, appSecret, code, callback) {
    return WxOAuth.getWxPubOpenid(appId, appSecret, code)
      .then(function(res) {
        callback(null, res.openid, res);
      }).catch(function(e) {
        callback(e);
      });
  },

  /**
  * @deprecated since version 2.1.3
  */
  createOauthUrlForCode: function(appId, redirectURL, moreInfo) {
    return WxOAuth.createOauthUrlForCode(appId, redirectURL, moreInfo);
  },

  /**
  * @deprecated since version 2.1.3
  */
  getJsapiTicket: function(appId, appSecret, callback) {
    return WxOAuth.getJsapiTicket(appId, appSecret, callback);
  },

  /**
  * @deprecated since version 2.1.3
  */
  getSignature: function(charge, jsapi_ticket, url) {
    return WxOAuth.getSignature(charge, jsapi_ticket, url);
  }
};
