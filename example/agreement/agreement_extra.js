var hasOwn = {}.hasOwnProperty;
var channelExtraMap = {
  qpay: {
    // 可选，签约用户的名称，用于页面展示，如商户侧账号，昵称。
    'display_account': '签约测试',
  }
};

module.exports = {
  extra: function(channel) {
    if (hasOwn.call(channelExtraMap, channel)) {
      return channelExtraMap[channel];
    }

    return {};
  }
};
