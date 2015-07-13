'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned by pingpp-node
 */
function _Error(raw) {
  this.populate.apply(this, arguments);
  this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Pingpp's REST API)
 */
var PingppError = _Error.PingppError = _Error.extend({
  type: 'PingppError',
  populate: function(raw) {
    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;

    this.stack = (new Error(raw.message)).stack;
    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.message = raw.message;
    this.detail = raw.detail;
    this.raw = raw;
  }
});

/**
 * Helper factory which takes raw pingpp errors and outputs wrapping instances
 */
PingppError.generate = function(rawPingppError) {
  switch (rawPingppError.type) {
    case 'invalid_request_error':
      return new _Error.PingppInvalidRequestError(rawPingppError);
    case 'api_error':
      return new _Error.PingppAPIError(rawPingppError);
    case 'channel_error':
      return new _Error.PingppChannelError(rawPingppError);
  }

  return new _Error('Generic', 'Unknown Error');
};

// Specific Pingpp Error types:
_Error.PingppInvalidRequestError = PingppError.extend({ type: 'PingppInvalidRequest' });
_Error.PingppAPIError = PingppError.extend({ type: 'PingppAPIError' });
_Error.PingppAuthenticationError = PingppError.extend({ type: 'PingppAuthenticationError' });
_Error.PingppConnectionError = PingppError.extend({ type: 'PingppConnectionError' });
_Error.PingppChannelError = PingppError.extend({ type: 'PingppChannelError'});
