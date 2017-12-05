# 分润结算对象

### 创建分润结算对象
``` js
pingpp.royaltySettlements.create(
  {
    'payer_app': APP_ID,       // 分润发起方所在应用的 id, 必传
    'method': 'unionpay',     // 分润的方式，余额 balance 或渠道名称，例如 alipay, 必传
    'recipient_app': APP_ID,  // 分润接收方的应用 id，即分润用户关联的应用 id。可选
    'is_preview': false,      // 是否预览，选择预览不会真实创建分润结算对象，也不会修改分润对象的状态, 可选
    'created': {
      'gt': 1488211200,
      'lte': 1488297600
    }
  },
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
```


### 查询分润结算对象列表
``` js
pingpp.royaltySettlements.list(
  {
    payer_app: APP_ID, // payer_app 必传
    page: 1,
    per_page: 3
  },
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
```


### 查询分润结算对象
``` js
pingpp.royaltySettlements.retrieve(
  '431170401120500001', // royaltySettlements ID
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
```


### 取消分润结算对象
``` js
pingpp.royaltyTemplates.update(
  '450170830143400001', // RoyaltyTemplates ID
  {
    'name': 'royalty_templates name new',
    'rule': {
      'royalty_mode': 'rate',         // 分润模式。分为按订单金额（包含优惠券金额）的比例 rate 和固定金额 fixed, 必传
      'refund_mode': 'no_refund',     // 退分润模式。分为退款时不退分润 no_refund、按比例退分润 proportional 和一旦退款分润全退 full_refund, 必传
      'allocation_mode': 'receipt_reserved',  // 分配模式。指当订单确定的层级如果少于模板配置层级时，模板中多余的分润金额是归属于收款方 receipt_reserved 还是服务方 service_reserved。必传
      'data': [                       // 分润数据列表, 必传
        {
          'level': 0,                 // 子商户层级值，0 表示平台， 1 表示一级子商户，取值范围 >=0
          'value': 11                 // 分润数值。rate 下取值为 0 - 10000，单位为 0.01 %，fixed 下取值为 0 - 1000000，单位为分
        },
        {
          'level': 1,
          'value': 12
        }
      ]
    }
  },
  function(err, data) {
    if (err != null){
      console.log(err);
    }
    // YOUR CODE
  }
);
```


### 更新分润结算对象
``` js
pingpp.royaltySettlements.update(
  '431170401120500001', // royaltySettlements ID
  {'status': 'canceled'}, // 需要更新的状态  [pending, canceled]
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
```
