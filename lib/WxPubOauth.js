'use strict';

var https = require('https');
var utils = require('./utils');
var Error = require('./Error');
var crypto = require('crypto');

var WxPubOauth = module.exports = {
  getOpenid: function(appId, appSecret, code, callback) {
    var path = WxPubOauth._createOauthPathForOpenid(appId, appSecret, code);
    WxPubOauth._getRequest('api.weixin.qq.com', path, function(e, response){
      if (e) {
        return callback(e, null, response);
      }
      if (response && response.hasOwnProperty('openid')) {
        return callback(null, response['openid'], response);
      } else {
        return callback(new Error('OpenidNotReceived', 'JSON received from the Weixin does not contain openid'), null, response);
      }
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

  _getRequest: function(host, path, callback) {
    var req = https.request({
      host: host,
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
          var responseJson = JSON.parse(response);
          return callback(null, responseJson);
        } catch (e) {
          return callback(new Error('JSONParseFailed', 'Invalid JSON received from the Weixin'), response);
        }
      });
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

  _createOauthPathForOpenid: function(appId, appSecret, code) {
    var queryParts = {
      'appid': appId,
      'secret': appSecret,
      'code': code,
      'grant_type': 'authorization_code'
    };
    var queryStr = utils.stringifyRequestData(queryParts);
    return '/sns/oauth2/access_token?' + queryStr;
  },

  getJsapiTicket: function(app_id, app_secret, callback) {
    var queryParts = {
      'appid': app_id,
      'secret': app_secret,
      'grant_type': 'client_credential'
    };
    var queryStr = utils.stringifyRequestData(queryParts);
    var accessTokenPath = '/cgi-bin/token?' + queryStr;
    WxPubOauth._getRequest('api.weixin.qq.com', accessTokenPath, function(e, response){
      if (e) {
        return callback(e, response);
      }
      if (response && response.hasOwnProperty('errcode')) {
        return callback(null, response);
      }
      var queryParts = {
        'access_token': response['access_token'],
        'type': 'jsapi'
      };
      var queryStr = utils.stringifyRequestData(queryParts);
      var jsapiTicketPath = '/cgi-bin/ticket/getticket?' + queryStr;
      WxPubOauth._getRequest('api.weixin.qq.com', jsapiTicketPath, function(e, response){
        return callback(e, response);
      });
    });
  },

  getSignature: function(charge, jsapi_ticket, url) {
    if (!charge.hasOwnProperty('credential') || !charge['credential'].hasOwnProperty('wx_pub')) {
      return null;
    }
    var credential = charge['credential']['wx_pub'];
    var arrayToSign = [
      'jsapi_ticket=' + jsapi_ticket,
      'noncestr=' + credential['nonceStr'],
      'timestamp=' + credential['timeStamp'],
      'url=' + url.split('#')[0]
    ];
    return crypto.createHash('sha1').update(arrayToSign.join('&')).digest('hex');
  }
};
