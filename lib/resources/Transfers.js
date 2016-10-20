'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'transfers',

  includeBasic: [
    {"name":'create',urlSign:false},
    {"name":'list',urlSign:true},
    {"name":'retrieve',urlSign:true}
  ],

  update: pingppMethod({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id'],
    urlSign:false,
  }),

  cancel: function(id,callback){
    return this.update(id,{
      "status":" canceled"
    },callback);
  },
});
