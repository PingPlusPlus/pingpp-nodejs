var hasOwn = {}.hasOwnProperty;
var channelExtraMap = {
  alipay: {
    'account': 'user@example.com',    // 必传，收款人的支付宝账号。
    'name': '张三',       // 必传，收款人姓名。
    'account_type': 'ALIPAY_LOGONID'  //  可选，收款方账户类型。ALIPAY_USERID：支付宝账号对应的支付宝唯一用户号，以 2088 开头的 16 位纯数字组成；ALIPAY_LOGONID：支付宝登录号，支持邮箱和手机号格式。
  },

  unionpay: {
    'account': '6225210207078888',    //必填项 收款人银行卡号或者存折号。
    'name': '张三',                    //必填项 收款人姓名。
    'open_bank_code': '0308',          //选填项 开户银行编号，open_bank_code 和 open_bank 必须填写一个，优先推荐填写 open_bank_code。
    'open_bank': '招商银行',            //选填项 开户银行，open_bank_code 和 open_bank 必须填写一个，优先推荐填写 open_bank_code。
    'prov': '上海',                    //选填项 省份。
    'city': '上海',                    //选填项 城市。
    'sub_bank': '徐家汇支行'           //选填项 开户支行名称。
  },

  wx: {
    'open_id': 'o7xEMsySBFG3MVHI-9VsAJX-j50W', //必填参数 收款人的 open_id。
    'name': '张三',       // 可选，收款人姓名。
    'force_check': false // 可选，是否强制校验收款人姓名。仅当 user_name 参数不为空时该参数生效。
  },

  wx_pub: {
    'open_id': 'o7xEMsySBFG3MVHI-9VsAJX-j50W',    //必填参数 收款人的 open_id。
    'name': '张三',            // 选填参数 收款人姓名。
    'force_check': false      // 选填参数 是否强制校验收款人姓名。仅当 user_name 参数不为空时该参数生效。
  },

  allinpay: {
    'account': '6214850288888888',  //必填项 收款人银行卡号或者存折号。
    'name': '张三',                  //必填项 收款人姓名。
    'open_bank_code': '0308',       //必填项 开户银行编号。
    'business_code': '09900',       //选填项 业务代码，根据通联业务人员提供，不填使用通联提供默认值 09900。
    'card_type': 0                  //选填项 银行卡号类型，0：银行卡；1：存折。
  },

  jdpay: {
    'account': '6214850288888888',  //必填项 收款人银行卡号或者存折号。
    'name': '张三',                  //必填项 收款人姓名。
    'open_bank_code': '0308'        //必填项 开户银行编号。
  }
};

module.exports = function(channel) {
  if (hasOwn.call(channelExtraMap, channel)) {
    return channelExtraMap[channel];
  }

  return {};
};
