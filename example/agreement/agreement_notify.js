// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com) -> 点击管理平台右上角公司名称 -> 企业面板 -> 开发参数 -> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';

// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/* 预扣费通知 */
pingpp.agreements.notify(
  'agr_19EEE7QdgGMCoY',
    {
        'amount': 100,  // 预计扣费金额
    },
  function(err, resp) {
    if (err != null) {
      console.log('pingpp.agreements.notify failed: ', err);
    } else {
      console.log(resp);
    }
  }
);
