# 海关报关

### 创建海关报关
``` js
pingpp.customs.create({
  app: APP_ID ,
  charge: "ch_bLWP80Ci9S4ODaXLSKLOGe5S", // CHARGE ID
  channel: "upacp", // 支付渠道
  trade_no: new Date().getTime().toString(), // 用户报关订单号
  customs_code:"GUANGZHOU", // 报关渠道
  amount:100, // 报关金额
  transport_amount: 0, // 订单物流金额
  is_split: false, // 是否拆单
  extra:{
    pay_account: "1234567890", // 用户支付账户（商户系统中用户id）
    certif_type: "02", // 证件类型，取值范围参考："01"：身份证；"02"：军官证；"03"：护照；"04"：回乡证；"05"：台胞证；"06"：警官证 "07"：士兵证； "99"：其它证件。
    customer_name: "A Name", // 用户姓名
    certif_id: "ID Card No", // 用户证件号
    tax_amount:"10" // 税费的金额
  }
}, function(err, transfer) {
  if (err!=null){
    console.log("pingpp.transfers.create fail:",err)
  }
  // YOUR CODE
});
```

### 海关报关查询
``` js
pingpp.customs.retrieve(
  "14201609291525440636", // CUSTOMS ID
  function(err, transfer) {
    if (err!=null){
      console.log("pingpp.transfers.retrieve fail:",err)
    }
    // YOUR CODE
  }
);
```