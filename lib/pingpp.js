'use strict';

Pingpp.DEFAULT_HOST = 'api.pingxx.com';
Pingpp.DEFAULT_PORT = '443';
Pingpp.DEFAULT_BASE_PATH = '/v1/';
Pingpp.DEFAULT_API_VERSION = '2014-10-10';

Pingpp.DEFAULT_TIMEOUT = require('http').createServer().timeout;

Pingpp.PACKAGE_VERSION = require('../package.json').version;

Pingpp.USER_AGENT = {
  bindings_version: Pingpp.PACKAGE_VERSION,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform,
  publisher: 'pingplusplus',
  uname: null
}

Pingpp.USER_AGENT_SERIALIZED = null;

var exec = require('child_process').exec;

var resources = {

  Charges: require('./resources/Charges'),
  ChargeRefunds: require('./resources/ChargeRefunds'),

};

var channels = require('./PingppChannel');

var wxPubOauth = require('./WxPubOauth');

Pingpp.PingppResource = require('./PingppResource');
Pingpp.resources = resources;
Pingpp.wxPubOauth = wxPubOauth;

function Pingpp(key, version) {
  if (!(this instanceof Pingpp)) {
    return new Pingpp(key, version);
  }

  this._api = {
    auth: null,
    host: Pingpp.DEFAULT_HOST,
    port: Pingpp.DEFAULT_PORT,
    basePath: Pingpp.DEFAULT_BASE_PATH,
    version: Pingpp.DEFAULT_API_VERSION,
    timeout: Pingpp.DEFAULT_TIMEOUT,
    dev: false
  };

  this._prepResources();
  this._prepChannels();
  this._prepExtraFuncs();
  this.setApiKey(key);
  this.setApiVersion(version);
}

Pingpp.prototype = {

  setHost: function(host, port, protocol) {
    this._setApiField('host', host);
    if (port) this.setPort(port);
    if (protocol) this.setProtocol(protocol);
  },

  setProtocol: function(protocol) {
    this._setApiField('protocol', protocol.toLowerCase());
  },

  setPort: function(port) {
    this._setApiField('port', port);
  },

  setApiVersion: function(version) {
    if (version) {
      this._setApiField('version', version);
    }
  },

  setApiKey: function(key) {
    if (key) {
      this._setApiField(
        'auth',
        'Basic ' + new Buffer(key + ':').toString('base64')
      );
    }
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? Pingpp.DEFAULT_TIMEOUT : timeout
    );
  },

  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  getApiField: function(key) {
    return this._api[key];
  },

  getConstant: function(c) {
    return Pingpp[c];
  },

  getClientUserAgent: function(cb) {
    if (Pingpp.USER_AGENT_SERIALIZED) {
      return cb(Pingpp.USER_AGENT_SERIALIZED);
    }
    exec('uname -a', function(err, uname) {
      Pingpp.USER_AGENT.uname = uname || 'UNKNOWN';
      Pingpp.USER_AGENT_SERIALIZED = JSON.stringify(Pingpp.USER_AGENT);
      cb(Pingpp.USER_AGENT_SERIALIZED);
    });
  },

  _prepResources: function() {

    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  },

  _prepChannels: function() {

    this['channel'] = {};
    for (var name in channels) {
      this['channel'][name] = channels[name];
    }
  },

  _prepExtraFuncs: function() {

    this['wxPubOauth'] = wxPubOauth;
  }
};

module.exports = Pingpp;