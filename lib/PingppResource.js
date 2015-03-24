'use strict';

var http = require('http');
var https = require('https');
var path = require('path');
var when = require('when');
var _ = require('lodash');

var utils = require('./utils');
var Error = require('./Error');

var hasOwn = {}.hasOwnProperty;

var BLACKLISTED_FINGERPRINTS = require('fs').readFileSync(
  path.join(__dirname, '../data/blacklisted_fingerprints'), 'utf8'
).replace(/^\s+|\s+$/g, '').split('\n');

// Provide extension mechanism for Pingpp Resource Sub-Classes
PingppResource.extend = utils.protoExtend;

// Expose method-creator & prepared (basic) methods
PingppResource.method = require('./PingppMethod');
PingppResource.BASIC_METHODS = require('./PingppMethod.basic');

/**
 * Encapsulates request logic for a Pingpp Resource
 */
function PingppResource(pingpp, urlData) {
  this._pingpp = pingpp;
  this._urlData = urlData || {};

  this.basePath = utils.makeURLInterpolator(pingpp.getApiField('basePath'));
  this.path = utils.makeURLInterpolator(this.path);

  if (this.includeBasic) {
    this.includeBasic.forEach(function(methodName) {
      this[methodName] = PingppResource.BASIC_METHODS[methodName];
    }, this);
  }

  this.initialize.apply(this, arguments);
}

PingppResource.prototype = {
  path: '',

  initialize: function() {},

  createFullPath: function(commandPath, urlData) {
    return path.join(
      this.basePath(urlData),
      this.path(urlData),
      typeof commandPath == 'function' ?
        commandPath(urlData) : commandPath
    ).replace(/\\/g, '/'); // ugly workaround for Windows
  },

  createUrlData: function(callback) {
    var urlData = {};
    for (var i in this._urlData) {
      if (hasOwn.call(this._urlData, i)) {
        urlData[i] = this._urlData[i];
      }
    }

    return urlData;
  },

  createDeferred: function(callback) {
    var deferred = when.defer();

    if (callback) {
      // Callback, if provided, is a simply translated to Promise'esque:
      // (Ensure callback is called outside of promise stack)
      deferred.promise.then(function(res) {
        setTimeout(function(){ callback(null, res); }, 0);
      }, function(err) {
        setTimeout(function(){ callback(err, null); }, 0);
      });
    }

    return deferred;
  },

  _timeoutHandler: function(timeout, req, callback) {
    var self = this;
    return function() {
      var timeoutErr = new Error('ETIMEOUT');
      timeoutErr.code = 'ETIMEOUT';

      req._isAborted = true;
      req.abort();

      callback.call(
        self,
        new Error.PingppConnectionError({
          message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
          detail: timeoutErr
        }),
        null
      );
    }
  },

  _responseHandler: function(req, callback) {
    var self = this;
    return function(res) {
      var response = '';

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function() {
        try {
          response = JSON.parse(response);
          if (response.error) {
            var err;
            if (res.statusCode === 401) {
              err = new Error.PingppAuthenticationError(response.error);
            } else {
              err = Error.PingppError.generate(response.error);
            }
            return callback.call(self, err, null);
          }
        } catch (e) {
          return callback.call(
            self,
            new Error.PingppAPIError({
              message: 'Invalid JSON received from the Pingpp API',
              response: response,
              exception: e
            }),
            null
          );
        }
        callback.call(self, null, response);
      });
    };
  },

  _errorHandler: function(req, callback) {
    var self = this;
    return function(error) {
      if (req._isAborted) return; // already handled
      callback.call(
        self,
        new Error.PingppConnectionError({
          message: 'An error occurred with our connection to Pingpp',
          detail: error
        }),
        null
      );
    }
  },

  _request: function(method, path, data, auth, callback) {
    var requestData = method == 'POST' ? JSON.stringify(data || {}) : utils.stringifyRequestData(data || {});
    var self = this;

    if ((method == 'GET' || method == 'DELETE') && requestData != '') {
      path = path + '?' + requestData;
      requestData = '';
    }

    var apiVersion = this._pingpp.getApiField('version');
    var headers = {
      'Authorization': auth ?
        'Basic ' + new Buffer(auth + ':').toString('base64') :
        this._pingpp.getApiField('auth'),
      'Accept': 'application/json',
      'Content-Type': method == 'POST' ? 'application/json' : 'application/x-www-form-urlencoded',
      'User-Agent': 'Pingpp/v1 NodeBindings/' + this._pingpp.getConstant('PACKAGE_VERSION')
    };

    if (apiVersion) {
      headers['Pingplusplus-Version'] = apiVersion;
    }

    headers = _.assign(headers, this._pingpp.getParsedHeaders());

    this._pingpp.getClientUserAgent(function(cua) {
      headers['X-Pingpp-Client-User-Agent'] = cua;
      makeRequest();
    });

    function makeRequest() {
      var timeout = self._pingpp.getApiField('timeout');
      var isInsecureConnection = self._pingpp.getApiField('protocal') == 'http';

      var req = (
        isInsecureConnection ? http : https
      ).request({
        host: self._pingpp.getApiField('host'),
        port: self._pingpp.getApiField('port'),
        path: path,
        method: method,
        headers: headers,
        ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
        secureProtocol: 'TLSv1_method'
      });

      req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
      req.on('response', self._responseHandler(req, callback));
      req.on('error', self._errorHandler(req, callback));

      req.on('socket', function(socket) {
        socket.on(isInsecureConnection ? 'connect' : 'secureConnect', function() {
          if (!isInsecureConnection &&
            BLACKLISTED_FINGERPRINTS.indexOf(socket.getPeerCertificate().fingerprint) > -1) {
            req.abort();
            return callback.call(self,
              new Error.PingppError({
                message: 'Revoked SSL Certificate',
                detail: 'Invalid server certificate. You tried to connect to ' +
                        'a server that has a revoked SSL certificate, which ' +
                        'means we cannot securely send data to that server. ' +
                        'Please email support@pingxx.com if you need ' +
                        'help connecting to the correct API server.'
              })
            );
          }
          req.write(requestData);
          req.end();
        });
      });
    }
  }
};

module.exports = PingppResource;
