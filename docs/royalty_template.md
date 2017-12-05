# 分润模板对象

### 创建分润模板对象
``` js
pingpp.royaltyTemplates.create(
  {
    'app': APP_ID,                    // App ID, 必传
    'name': 'royalty_templates name', // 模板名称，允许中英文等常用字符, 可选
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
  function(err, royaltyTemplate) {
    if (err != null){
      console.log(err);
    }
    // YOUR CODE
  }
);
```


### 查询单个分润模板对象
``` js
pingpp.royaltyTemplates.retrieve(
  '450170830143400001',  //  RoyaltyTemplates ID
  function(err, royaltyTemplate) {
    if (err != null){
      console.log(err);
    }
    // YOUR CODE
  }
);
```


### 查询分润模板对象列表
``` js
pingpp.royaltyTemplates.list(
  {
    page: 1,
    per_page: 3
  },
  function(err, data) {
    if (err != null){
      console.log(err);
    }
    // YOUR CODE
  }
);
```


### 更新分润模板对象
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


### 删除分润模板对象
``` js
pingpp.royaltyTemplates.del(
  '450170830143400001', // RoyaltyTemplates ID
  function(err, data) {
    if (err != null){
      console.log(err);
    }
    // YOUR CODE
  }
);
```
