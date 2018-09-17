'use strict';

var https = require('https');
var utils = require('./utils');
var Error = require('./Error');
var crypto = require('crypto');

var WxOAuth = module.exports = {
  getWxPubOpenid: function(appId, appSecret, code, callback) {
    var path = WxOAuth._createOauthPathForWxPubOpenid(appId, appSecret, code);

    return utils.wrapPromiseCallback(
      WxOAuth._getRequest('api.weixin.qq.com', path),
      callback
    );
  },

  getWxLiteOpenid: function(appId, appSecret, code, callback) {
    var path = WxOAuth._createOauthPathForWxLiteOpenid(appId, appSecret, code);

    return utils.wrapPromiseCallback(
      WxOAuth._getRequest('api.weixin.qq.com', path),
      callback
    );
  },

  createOauthUrlForCode: function(appId, redirectURL, moreInfo) {
    moreInfo = typeof moreInfo == 'undefined' ? false : moreInfo;
    var queryParts = {
      'appid': appId,
      'redirect_uri': redirectURL,
      'response_type': 'code',
      'scope': moreInfo ? 'snsapi_userinfo' : 'snsapi_base'
    };
    var queryStr = utils.stringifyRequestData(queryParts);

    return 'https://open.weixin.qq.com/connect/oauth2/authorize?'
      + queryStr + '#wechat_redirect';
  },

  _getRequest: function(host, path) {
    return new Promise(function (resolve, reject) {
      var req = https.request({
        host: host,
        port: 443,
        path: path,
        method: 'GET'
      }, function(res) {
        var response = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          response += chunk;
        });
        res.on('end', function(){
          try {
            var responseJson = JSON.parse(response);
            if (responseJson.hasOwnProperty('errcode')
              && responseJson.errcode != 0
            ) {
              return reject(new Error.PingppChannelError({
                detail: responseJson,
                code: responseJson.errcode,
                message: responseJson.errmsg
              }));
            }
            return resolve(responseJson);
          } catch (e) {
            return reject(new Error.PingppChannelError({
              detail: response,
              message: 'JSON parse failed, invalid response received from the Weixin.'
            }));
          }
        });
      });

      req.end();

      var timeout = 30000;
      req.setTimeout(timeout, function(){
        req._isAborted = true;
        req.abort();
        return reject(
          new Error('ConnectionTimeout', 'Request aborted due to timeout being reached (' + timeout + 'ms)')
        );
      });
      req.on('error', function(_e) {
        if (req._isAborted) return;
        return reject(new Error('ConnectionError', 'An error occurred with our connection to Weixin'));
      });
    });
  },

  _createOauthPathForWxPubOpenid: function(appId, appSecret, code) {
    var queryParts = {
      'appid': appId,
      'secret': appSecret,
      'code': code,
      'grant_type': 'authorization_code'
    };

    return '/sns/oauth2/access_token?' + utils.stringifyRequestData(queryParts);
  },

  _createOauthPathForWxLiteOpenid: function(appId, appSecret, code) {
    var queryParts = {
      'appid': appId,
      'secret': appSecret,
      'js_code': code,
      'grant_type': 'authorization_code'
    };

    return '/sns/jscode2session?' + utils.stringifyRequestData(queryParts);
  },

  getJsapiTicket: function(app_id, app_secret, callback) {
    var queryParts = {
      'appid': app_id,
      'secret': app_secret,
      'grant_type': 'client_credential'
    };
    var queryStr = utils.stringifyRequestData(queryParts);
    var accessTokenPath = '/cgi-bin/token?' + queryStr;

    return utils.wrapPromiseCallback(
      WxOAuth._getRequest('api.weixin.qq.com', accessTokenPath)
        .then(function(res) {
          var queryParts = {
            'access_token': res['access_token'],
            'type': 'jsapi'
          };
          var queryStr = utils.stringifyRequestData(queryParts);
          var jsapiTicketPath = '/cgi-bin/ticket/getticket?' + queryStr;
          return WxOAuth._getRequest('api.weixin.qq.com', jsapiTicketPath);
        })
        .catch(function(e) {
          return new Promise(function(resolve, reject) {
            return reject(e);
          });
        }),
      callback
    );
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
