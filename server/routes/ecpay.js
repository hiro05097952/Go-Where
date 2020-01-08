/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const ecpay_payment = require('ecpay-payment');
const hash = require('hash.js');
const randomBytes = require('randombytes');

const firebase = require('../config/firebase');

function checkMacValueConverter(config, HashKey, HashIV) {
  if (config.CheckMacValue) {
    delete config.CheckMacValue;
  }

  // 按照 A ~ Z 排序
  const keyArr = Object.keys(config).sort();
  let sortedStr = '';
  keyArr.forEach((item) => {
    sortedStr += `${item}=${config[item]}&`;
  });

  // 加上 HashKey 與 HashIV
  sortedStr = `HashKey=${HashKey}&${sortedStr}HashIV=${HashIV}`;

  // 轉成 encode url + 小寫
  sortedStr = encodeURIComponent(sortedStr).toLowerCase();

  // 轉換表
  sortedStr = sortedStr.replace(/%2d/g, '-').replace(/%5f/g, '_')
    .replace(/%2e/g, '.').replace(/%2a/g, '*')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%20/g, '+');

  // Sha256 加密，轉大寫
  sortedStr = hash.sha256().update(sortedStr).digest('hex').toUpperCase();

  return sortedStr;
}


router.post('/checkout', (req, res) => {
  const base_param = {
    MerchantTradeNo: randomBytes(8).toString('hex'), // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    ReturnURL: 'https://go-where-shop.herokuapp.com/api/ecpay/server', // 後端網址
    OrderResultURL: 'https://go-where-shop.herokuapp.com/api/ecpay/client', // 結果參數 client post
    CustomField1: req.session.user.uid,
    CustomField2: req.body.orderID,
    EncryptType: '1',
    ...req.body.config,
  };

  // 若要測試開立電子發票，請將inv_params內的"所有"參數取消註解 //
  const inv_params = {
    // RelateNumber: 'PLEASE MODIFY',  //請帶30碼uid ex: SJDFJGH24FJIL97G73653XM0VOMS4K
    // CustomerID: 'MEM_0000001',  //會員編號
    // CustomerIdentifier: '',   //統一編號
    // CustomerName: '測試買家',
    // CustomerAddr: '測試用地址',
    // CustomerPhone: '0123456789',
    // CustomerEmail: 'johndoe@test.com',
    // ClearanceMark: '2',
    // TaxType: '1',
    // CarruerType: '',
    // CarruerNum: '',
    // Donation: '2',
    // LoveCode: '',
    // Print: '1',
    // InvoiceItemName: '測試商品1|測試商品2',
    // InvoiceItemCount: '2|3',
    // InvoiceItemWord: '個|包',
    // InvoiceItemPrice: '35|10',
    // InvoiceItemTaxType: '1|1',
    // InvoiceRemark: '測試商品1的說明|測試商品2的說明',
    // DelayDay: '0',
    // InvType: '07'
  };
  const create = new ecpay_payment();
  const htm = create.payment_client
    .aio_check_out_all(parameters = base_param, invoice = inv_params);
  res.send(htm);
});

router.post('/server', (req, res) => {
  // console.log('ecpay return server: ', req.body);

  const userUid = req.body.CustomField1;
  const orderID = req.body.CustomField2;

  // 查驗檢查碼
  if (req.body.CheckMacValue
    !== checkMacValueConverter(req.body, process.env.ECPAY_HashKey, process.env.ECPAY_HashIV)) {
    // console.log('server 檢查碼不合格');
    res.send('0');
    return;
  }
  const ecpayConfig = {
    ecpay: req.body,
    is_paid: true,
  };
  firebase.firestore.doc(`user/${userUid}/order/${orderID}`).update(ecpayConfig).then(() => {
    // console.log('server 寫入資料庫成功');
    res.send('1');
  }).catch((err) => {
    console.log('ecpay 資料庫寫入失敗', err);
    res.send('0');
  });
});

router.post('/client', (req, res) => {
  // console.log('接收資料 client: ', req.body)
  if (req.body.CheckMacValue
    !== checkMacValueConverter(req.body, process.env.ECPAY_HashKey, process.env.ECPAY_HashIV)) {
    // console.log('client 檢查通過');
    console.log('client 檢查碼不合格');
    res.end();
    return;
  }

  req.flash('ecpay', req.body);
  res.redirect(`https://jedy05097952.github.io/Hexschool_VuePage/#/checkout/checkorder/${req.body.CustomField2}`);
});

router.get('/checkout', (req, res) => {
  res.send(req.flash('ecpay'));
});

module.exports = router;
