var hasOwn = {}.hasOwnProperty;
var channelRecipientMap = {
  alipay: {
    // 必须，金额，单位为分。
    'amount': 5000,

    // 必须，接收者支付宝账号。
    'account': 'alipayaccount@gmail.com',

    // 必须，收款人姓名，1~50位。
    'name': '张三',

    // 可选，收款方账户类型。可取值：1、 ALIPAY_USERID ：支付宝账号对应的支付宝唯一用户号。以2088开头的16位纯数字组成。 2、 ALIPAY_LOGONID （默认值）：支付宝登录号，支持邮箱和手机号格式。
    // 'account_type': 'ALIPAY_LOGONID',

    // 可选，批量企业付款描述，最多 200 字节。
    // 'description': '描述',

    // 可选，订单号，1 ~ 64 位不能重复的数字字母组合。
    // 'order_no': '14939913700002',
  },

  wx_pub: {
    // 必须，金额，单位为分。
    'amount': 5000,

    // 必须，接收者 id，为用户在 wx_pub 下的 open_id。
    'open_id': 'o7xEMsySBFG3MVHI-9VsAJX-j50W',

    // 可选，收款人姓名。当该参数为空，则不校验收款人姓名。
    // 'name': '张三',

    // 可选，是否强制校验收款人姓名。仅当  user_name 参数不为空时该参数生效。
    // 'force_check': true,

    // 可选，批量企业付款描述，最多 99 个英文和数字的组合或最多 33 个中文字符，不可以包含特殊字符。不填默认使用外层参数中的 description。
    // 'description': '描述',

    // 可选，订单号，1 ~ 32 位不能重复的数字字母组合。
    // 'order_no': '14939913700002',
  },

  unionpay: {
    // 必须，金额，单位为分。
    'amount': 5000,

    // 必须，1~32位，收款人银行卡号或者存折号。
    'account': '6228480402564890011',

    // 必须，1~100位，收款人姓名。
    'name': '张三',

    // open_bank_code 和 open_bank 两个参数必传一个，建议使用 open_bank_code ，若都传参则优先使用 open_bank_code 读取规则；prov 和 city 均为可选参数，如果不传参，则使用默认值 '上海' 给渠道接口。

    // 条件可选，4位，开户银行编号，详情请参考 企业付款（银行卡）银行编号说明：https://www.pingxx.com/api#%E9%93%B6%E8%A1%8C%E7%BC%96%E5%8F%B7%E8%AF%B4%E6%98%8E。
    'open_bank_code': '0103',

    // 条件可选，1~50位，开户银行，详情请参考 企业付款（银行卡）银行编号说明：https://www.pingxx.com/api#%E9%93%B6%E8%A1%8C%E7%BC%96%E5%8F%B7%E8%AF%B4%E6%98%8E。
    // 'open_bank': '农业银行',

    // 可选，订单号，1 ~ 16 位数字。
    // 'order_no': '14939913700002',

    // 可选，批量企业付款描述，最多 200 字节。
    // 'description': '描述',
  },

  allinpay: {
    // 必须，金额，单位为分。
    'amount': 5000,

    // 必须，接收者银行卡账号。
    'account': '6228480402564890011',

    // 必须，收款人姓名。
    'name': '张三',

    // 必须，4位，开户银行编号，详情请参考 企业付款（银行卡）银行编号说明：https://www.pingxx.com/api#%E9%93%B6%E8%A1%8C%E7%BC%96%E5%8F%B7%E8%AF%B4%E6%98%8E。
    'open_bank_code': '0103',

    // 可选，5位，业务代码，根据通联业务人员提供，不填使用通联提供默认值09900。
    // 'business_code': '09900',

    // 可选，1位，银行卡号类型，0：银行卡、1：存折，不填默认使用银行卡。
    // 'card_type': 0,

    // 可选，批量付款描述，最多 30 个 Unicode 字符。
    // 'description': '描述',

    // 可选，订单号， 20 ~ 40 位不能重复的数字字母组合（必须以通联的商户号开头，建议组合格式：通联商户号 + 时间戳 + 固定位数顺序流水号，不包含+号），这里不传的话程序会调用商户的通联商户号加上随机数自动生成 order_no。
    // 'order_no': '3313011493991370000001',
  },

  jdpay: {
    // 必须，金额，单位为分。
    'amount': 5000,

    // 必须，1~32位，收款人银行卡号或者存折号。
    'account': '6228480402564890011',

    // 必须，1~100位，收款人姓名。
    'name': '张三',

    // 必须，4位，开户银行编号，详情请参考 企业付款（银行卡）银行编号说明：https://www.pingxx.com/api#%E9%93%B6%E8%A1%8C%E7%BC%96%E5%8F%B7%E8%AF%B4%E6%98%8E。
    'open_bank_code': '0103',

    // 可选，批量付款描述，最多 100 个 Unicode 字符。
    // 'description': '描述',

    // 可选，订单号，jdpay 限长 1~64 位不能重复的数字字母组合。
    // 'order_no': '14939913700002',
  },
};

module.exports = function(channel) {
  if (hasOwn.call(channelRecipientMap, channel)) {
    return channelRecipientMap[channel];
  }

  return {};
};
