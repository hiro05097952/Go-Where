/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const uuidv1 = require('uuid/v1');

const firebase = require('../config/firebase');
const validate = require('../config/validate');


let newCart = {};

router.post('/', (req, res, next) => {
  // console.log(req.body);
  const err = validate.cartQtyValidate(req.body.qty);
  if (err) {
    console.log(err);
    res.send({
      success: false,
      message: '商品數量格式錯誤，請輸入數字',
    });
    return;
  }
  // 1. 查詢有無此商品
  firebase.productsCol.where('id', '==', req.body.product_id).get().then((querySnapshot) => {
    if (querySnapshot.size === 0) {
      res.send({
        success: false,
        message: '查無此商品',
      });
    } else {
      querySnapshot.forEach((item) => {
        newCart = item.data();
      });
      next();
    }
  });
});

router.post('/', (req, res) => {
  // console.log('接收資料: ', req.body);
  let cartID = '';
  let cartData = '';

  // 查詢是否加入過購物車
  firebase.firestore.collection(`user/${req.session.user.uid}/cart`).limit(1).where('product_id', '==', req.body.product_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        cartData = item.data();
        cartID = item.id;
      });
    })
    .then(() => {
      let method = '';
      let config = {};
      let path = '';

      // 如果有加入過購物車 就增加商品數量
      if (cartID) {
        method = 'update';
        config = {
          qty: cartData.qty + req.body.qty,
          total: (cartData.qty + req.body.qty) * newCart.price,
          final_total: (cartData.qty + req.body.qty) * newCart.price,
        };
        path = firebase.firestore.collection(`user/${req.session.user.uid}/cart`).doc(cartID);
      } else {
        method = 'set';
        config = {
          id: uuidv1(),
          create_time: new Date(),
          product_id: req.body.product_id,
          qty: req.body.qty,
          product: newCart,
          total: newCart.price * req.body.qty,
          final_total: newCart.price * req.body.qty,
        };
        path = firebase.firestore.collection(`user/${req.session.user.uid}/cart`).doc();
      }
      path[method](config).then(() => {
        res.send({
          success: true,
          message: '加入購物車成功',
        });
      }).catch((err) => {
        res.send({
          success: false,
          message: err.details,
        });
      });
    });
});

router.get('/', (req, res) => {
  const carts = [];

  firebase.firestore.collection(`user/${req.session.user.uid}/cart`).orderBy('create_time', 'desc').get().then((querySnapshot) => {
    querySnapshot.forEach((item) => {
      carts.push(item.data());
    });
  })
    .then(() => {
      let total = 0;
      let final_total = 0;
      carts.forEach((item) => {
        total += item.total;
        final_total += item.final_total;
      });
      res.send({
        success: true,
        data: {
          carts,
          total,
          final_total,
        },
      });
    });
});

router.delete('/:cartID', (req, res) => {
  let ref = '';
  firebase.firestore.collection(`user/${req.session.user.uid}/cart`).limit(1).where('id', '==', req.params.cartID).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        ref = item.ref.path;
      });
    })
    .then(() => {
      if (!ref) {
        res.send({
          success: false,
          message: '移除購物車失敗，查無此商品',
        });
        return;
      }
      firebase.firestore.doc(ref).delete().then(() => {
        res.send({
          success: true,
          message: '移除購物車成功',
        });
      });
    });
});

module.exports = router;
