'use strict';

var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'batch_transfers',

  includeBasic: [
    { 'name': 'create', 'urlSign': true},
    { 'name': 'list', 'urlSign': true},
    { 'name': 'retrieve', 'urlSign': true},
  ]

});
