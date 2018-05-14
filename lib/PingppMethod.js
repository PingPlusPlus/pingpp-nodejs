'use strict';

var utils = require('./utils');
var OPTIONAL_REGEX = /^optional!/;

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. "charges")
 * @param [spec.required=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceeding the also-optional callback argument
 */
module.exports = function pingppMethod(spec) {
  var commandPath = typeof spec.path == 'function' ? spec.path
    : utils.makeURLInterpolator(spec.path || '');
  var requestMethod = (spec.method || 'GET').toUpperCase();
  var urlParams = spec.urlParams || [];

  return function() {
    var self = this;
    var args = [].slice.call(arguments);

    var callback = typeof args[args.length - 1] == 'function' && args.pop();
    var auth = args.length > urlParams.length && utils.isAuthKey(args[args.length - 1]) ? args.pop() : null;
    var data = utils.isObject(args[args.length - 1]) ? args.pop() : {};
    var urlData = this.createUrlData();

    return this.wrapTimeout(new Promise((function (resolve, reject) {
      for (var i = 0, l = urlParams.length; i < l; ++i) {
        var err;

        var arg = args[0];
        var param = urlParams[i];

        var isOptional = OPTIONAL_REGEX.test(param);
        param = param.replace(OPTIONAL_REGEX, '');

        if (!arg) {
          if (isOptional) {
            urlData[param] = '';
            continue;
          }
          err = new Error('Pingpp: I require argument "' + urlParams[i] + '", but I got: ' + arg);
          reject(err);
          return;
        }

        urlData[param] = args.shift();
      }

      if (args.length) {
        err = new Error(
          'Pingpp: Unknown arguments (' + args + '). Did you mean to pass an options object?'
        );
        reject(err);
        return;
      }

      var requestPath = this.createFullPath(commandPath, urlData);

      function requestCallback(err, response) {
        if (err) {
          reject(err);
        } else {
          resolve(
            spec.transformResponseData ?
              spec.transformResponseData(response) :
              response
          );
        }
      }

      self._request(requestMethod, requestPath, data, auth, requestCallback);
    }).bind(this)), callback);
  };
};
