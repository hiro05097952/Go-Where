const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');


router.get('/', (req, res) => {
  const orders = [];
  let orderLen = '';
  firebase.firestore.collection(`user/${req.session.user.uid}/order`).get().then((querySnapshot) => {
    orderLen = querySnapshot.size;
    querySnapshot.forEach((item) => {
      orders.push(item.data());
    });
  }).then(() => {
    if (orderLen === 0) {
      res.send({
        success: true,
        orders: [],
        message: '目前無訂單資料',
      });
      return;
    }
    const totalPages = Math.ceil(orderLen / 10);
    if (req.query.page > totalPages || req.query.page < 1) {
      res.send({
        success: false,
        message: '頁數格式錯誤',
      });
      return;
    }
    if (!req.query.page) {
      res.send({
        success: true,
        orders,
      });
    } else {
      res.send({
        success: true,
        orders: orders.slice(0 + (10 * (req.query.page - 1)), 10 + (10 * (req.query.page - 1))),
        pagination: {
          total_pages: totalPages,
          current_page: req.query.page,
          has_pre: Number(req.query.page) !== 1,
          has_next: Number(req.query.page) !== totalPages,
        },
      });
    }
  });
});

module.exports = router;
