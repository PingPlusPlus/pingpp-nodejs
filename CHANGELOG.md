# Change Log

## 2.1.3
#### 新增
- 添加余额结算接口 (balance_settlements)
- 添加银行卡信息查询接口 (card_info)
- 添加微信小程序 openid 及 session_key 获取接口 (`pingpp.wxOAuth.getWxLiteOpenid`)

#### 更改
- 废弃 `pingpp.wxPubOauth`
- 使用 `pingpp.wxOAuth` 代替 `pingpp.wxPubOauth`
- 其中，使用 `pingpp.wxOAuth.getWxPubOpenid` 代替 `pingpp.wxPubOauth.getOpenid`

## 2.1.2 (2018-05-18)
#### 新增
- 添加签约接口 (agreements)

#### 修正
- 修正部分接口 promise 支持

#### 更改
- 使用 ES6 Promise 替代 when

## 2.1.1 (2018-01-10)
#### 更改
- 去除 transfer 取消接口

## 2.1.0 (2017-12-04)
#### 更改
- 合并账户系统相关接口

## 2.0.14
#### 新增
- 新增重试机制
- 新增 PingppRateLimitError 异常

## 2.0.13
#### 新增
- 增加 isv_scan, isv_qr, isv_wap 渠道撤销接口

## 2.0.11
#### 更改
- 批量付款取消接口
- 更新 example

## 2.0.10
#### 更改
- 更新接口验签机制

## 2.0.9
#### 更改
  - 添加了支付宝批量付款接口 batch_transfers
  - 更新了接口验签机制（部分 api 强制签名）
  - 增加了 transfers 取消接口

## 2.0.8
#### 新增
- identification 接口

## 2.0.7
#### 新增
- 添加请求签名

## 2.0.6
#### 修改
- 补充 channel_error 错误类型

## 2.0.5
#### 新增
- 新增 Transfer 接口

## 2.0.4
#### 新增
- 增加微信公众号获取 JS-SDK 签名的接口

## 2.0.3
#### 新增
- 新增 Event 接口

## 2.0.2
#### 新增
- 新增微信红包
#### 更改
- 移除 PingppChannel.js

## 2.0.1
#### 更改
- 传递客户端的请求头部到 API

## 2.0.0
#### 更改
- 添加新渠道：百付宝、百付宝WAP、微信公众号

## 1.0.3
#### 更改
- cURL 使用 TLSv1.x

## 1.0.4
#### 更改
- 移除旧的 refund 方法
