const express = require('express');

const router = express.Router();
const randomBytes = require('randombytes');

const firebase = require('../config/firebase');
const validate = require('../config/validate');


router.post('/', (req, res) => {
  const carts = [];
  const cartPath = [];
  firebase.firestore.collection(`user/${req.session.user.uid}/cart`).get().then((querySnapshot) => {
    querySnapshot.forEach((item) => {
      carts.push(item.data());
      cartPath.push(item.ref.path);
    });
  }).then(() => {
    if (carts.length === 0) {
      res.send({
        success: false,
        message: '購物車未加入商品',
      });
      return;
    }

    const products = [];
    let total = 0;
    carts.forEach((item) => {
      products.push({
        ...item.product,
        qty: item.qty,
      });
      total += item.final_total;
    });

    const config = {
      user: {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        tel: req.body.tel,
        uid: req.session.user.uid,
      },
      message: req.body.message,
      create_time: +new Date(),
      id: randomBytes(8).toString('hex'),
      is_paid: false,
      products,
      total,
    };
    const valid = validate.orderValidate(req.body);

    if (valid.error) {
      res.send({
        success: false,
        message: valid.error.message,
      });
      return;
    }
    cartPath.forEach((item) => {
      firebase.firestore.doc(item).delete();
    });

    firebase.firestore.collection(`user/${req.session.user.uid}/order`).doc(config.id).set(config).then(() => {
      res.send({
        success: true,
        message: '下訂成功',
        orderID: config.id,
      });
    });
  });
});

router.get('/:orderID', (req, res) => {
  firebase.firestore.doc(`user/${req.session.user.uid}/order/${req.params.orderID}`).get().then((item) => {
    res.send({
      success: true,
      order: item.data(),
    });
  }).catch(() => {
    res.send({
      success: false,
      message: '查無此訂單',
    });
  });
});

router.delete('/:orderID', (req, res) => {
  firebase.firestore.doc(`user/${req.session.user.uid}/order/${req.params.orderID}`).get().then((query) => {
    if (!query.exists) {
      res.send({
        success: false,
        message: '查無此訂單',
      });
      return;
    }
    firebase.firestore.doc(`user/${req.session.user.uid}/order/${req.params.orderID}`).delete().then(() => {
      res.send({
        success: true,
        message: '取消訂單成功',
      });
    });
  });
});

module.exports = router;
