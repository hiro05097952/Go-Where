const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');

router.post('/', (req, res) => {
  // 1. 查詢有無此商品
  firebase.productsCol.where('id', '==', req.body.product_id).get().then((querySnapshot) => {
    if (querySnapshot.size === 0) {
      res.send({
        success: false,
        message: '查無此商品',
      });
      return;
    }
    firebase.userCol.doc(req.session.user.uid).get().then((query) => {
      const oldArr = query.data().likes;
      if (oldArr.includes(req.body.product_id)) {
        res.send({
          success: false,
          message: '已追蹤過此商品',
        });
        return;
      }
      oldArr.push(req.body.product_id);
      // res.send(oldArr);
      firebase.userCol.doc(req.session.user.uid).update({ likes: oldArr }).then(() => {
        res.send({
          success: true,
          message: '成功追蹤商品',
        });
      });
    });
  });
});

router.get('/', (req, res) => {
  const likes = [];
  firebase.userCol.doc(req.session.user.uid).get().then((querySnapshot) => {
    const arr = querySnapshot.data().likes;
    if (arr.length === 0) {
      res.send({
        success: true,
        likes,
      });
      return;
    }
    arr.forEach((item, index, array) => {
      firebase.productsCol.where('id', '==', item).limit(1).get().then((query) => {
        query.forEach((product) => {
          likes.push(product.data());
          if (index === array.length - 1) {
            res.send({
              success: true,
              likes,
            });
          }
        });
      });
    });
  });
});

router.delete('/:favID', (req, res) => {
  firebase.userCol.doc(req.session.user.uid).get().then((querySnapshot) => {
    const { likes } = querySnapshot.data();
    if (!likes.includes(req.params.favID)) {
      res.send({
        success: false,
        message: '查無此商品',
      });
      return;
    }
    likes.splice(likes.indexOf(req.params.favID), 1);
    firebase.userCol.doc(req.session.user.uid).update({ likes }).then(() => {
      res.send({
        success: true,
        message: '成功取消追蹤',
      });
    });
  });
});


module.exports = router;
