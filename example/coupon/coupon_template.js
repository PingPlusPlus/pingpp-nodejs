// Ping++ Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// API接入文档：https://www.pingxx.com ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 Ping++ SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC"
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_1Gqj58ynP0mHeX1q"
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/**
 * 创建优惠券模板
 */
pingpp.couponTemplates.create(
  APP_ID, // APP ID
  {
    "name": "25OFF", // 优惠券模板名称
    "type": 1, // 优惠券模板的类型 1：现金券；2：折扣券
    "amount_off":1, // 折扣金额
    "amount_available": 10000, // 订单金额大于等于该值时，优惠券有效（适用于满减）；0 表示无限制
    "max_circulation": 1000, // 优惠券最大生成数量，当已生成数量达到最大值时，不能再生成优惠券；默认 null，表示可以无限生成
    "metadata": {
    },
    "expiration": null
  }, function(err, data) {
    if (err!=null){
      console.log("pingpp.couponTemplates.create fail:",err)
    }
    // YOUR CODE
  }
);

/**
 * 查询优惠券模板
 */
pingpp.couponTemplates.retrieve(
  APP_ID, // APP ID
  "300117083118440300048601", // 优惠券模板 ID
  function(err, data) {
    if (err!=null){
      console.log("pingpp.couponTemplates.retrieve fail:",err)
    }
    // YOUR CODE
  }
);

/**
 * 查询优惠券模板列表
 */
pingpp.couponTemplates.list(
  APP_ID, // APP ID
  {page: 1},
  function(err, datas) {
    if (err!=null){
      console.log("pingpp.couponTemplates.list fail:",err)
    }
    // YOUR CODE
  }
);

/**
 * 优惠券模板更新
 */
pingpp.couponTemplates.update(
  APP_ID, // APP ID
  "300117083118440300048601",// 优惠券模板 ID
  {
    "metadata": {
        "key": "new value"
      }
  },
  function(err, data) {
    if (err!=null){
      console.log("pingpp.couponTemplates.update fail:",err)
    }
    // YOUR CODE
  }
);

/**
 * 优惠券模板删除
 */
pingpp.couponTemplates.delete(
  APP_ID, // APP ID
  "300117083118440300048601",// 优惠券模板 ID
  function(err, data) {
    if (err!=null){
      console.log("pingpp.couponTemplates.delete fail:",err)
    }
    // YOUR CODE
  }
);
