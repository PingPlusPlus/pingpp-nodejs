# 身份证银行卡认证

``` js
pingpp.identification.identify(
  {
    type: 'bank_card',
    app: 'APP_ID',
    data: {
      id_name: '张三',
      id_number: '320291198811110000',
      card_number: '6201111122223333'
    }
  },
  function(err, result) {
    // YOUR CODE
  }
);
```
