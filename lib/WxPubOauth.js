'use strict';

var https = require('https');
var utils = require('./utils');
var Error = require('./Error');

var WxPubOauth = module.exports = {
  getOpenid: function(appId, appSecret, code, callback) {
    var path = WxPubOauth._createOauthPathForOpenid(appId, appSecret, code);
    var req = https.request({
      host: 'api.weixin.qq.com',
      port: 443,
      path: path,
      method: 'GET',
      secureProtocol: 'TLSv1_method'
    }, function(res) {
      var response = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function(){
        try {
          response = JSON.parse(response);
          if (response.hasOwnProperty('openid')) {
            return callback(null, response['openid']);
          } else {
            return callback(new Error('OpenidNotReceived', 'JSON received from the Weixin does not contain openid'), null);
          }
        } catch (e) {
          return callback(new Error('JSONParseFailed', 'Invalid JSON received from the Weixin'), null);
        }
      })
    });

    req.end();

    var timeout = 30000;
    req.setTimeout(timeout, function(){
      req._isAborted = true;
      req.abort();
      return callback(new Error('ConnectionTimeout', 'Request aborted due to timeout being reached (' + timeout + 'ms)'), null);
    });
    req.on('error', function(e) {
      if (req._isAborted) return;
      return callback(new Error('ConnectionError', 'An error occurred with our connection to Weixin'), null);
    });
  },

  createOauthUrlForCode: function(appId, redirectURL, moreInfo) {
    moreInfo = typeof moreInfo == "undefined" ? false : moreInfo;
    var queryParts = {
      'appid': appId,
      'redirect_uri': redirectURL,
      'response_type': 'code',
      'scope': moreInfo ? 'snsapi_userinfo' : 'snsapi_base'
    };
    var queryStr = utils.stringifyRequestData(queryParts);
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?' + queryStr + '#wechat_redirect';
  },

  _createOauthPathForOpenid: function(appId, appSecret, code) {
    var queryParts = {
      'appid': appId,
      'secret': appSecret,
      'code': code,
      'grant_type': 'authorization_code'
    };
    var queryStr = utils.stringifyRequestData(queryParts);
    return '/sns/oauth2/access_token?' + queryStr;
  }
};
