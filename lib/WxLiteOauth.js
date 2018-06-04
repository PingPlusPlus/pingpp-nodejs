'use strict';

var utils = require('./utils');
var WxPubOauth = require('./WxPubOauth');

var WxLiteOauth = module.exports = {
  getSession: function(appId, appSecret, code, callback) {
    var path = WxLiteOauth._createOauthPathForOpenid(appId, appSecret, code);
    WxPubOauth._getRequest('api.weixin.qq.com', path, function(e, response){
      if (e) {
        return callback(e, null, response);
      }
      if (response) {
        return callback(
          null,
          response.hasOwnProperty('openid') ? response['openid'] : null,
          response
        );
      } else {
        return callback(
          new Error('GetSessionFailed', 'Data received from the Weixin is not valid'),
          null,
          response
        );
      }
    });
  },

  getOpenid: function(appId, appSecret, code, callback) {
    return WxLiteOauth.getSession(appId, appSecret, code, callback);
  },

  _createOauthPathForOpenid: function(appId, appSecret, code) {
    var queryParts = {
      'appid': appId,
      'secret': appSecret,
      'js_code': code,
      'grant_type': 'authorization_code'
    };
    var queryStr = utils.stringifyRequestData(queryParts);
    return '/sns/jscode2session?' + queryStr;
  },

};
