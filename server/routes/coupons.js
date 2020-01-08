const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');


let couponLen = '';
firebase.couponCol.onSnapshot((querySnapshot) => {
  couponLen = querySnapshot.size;
});

router.get('/', (req, res, next) => {
  if (!couponLen) {
    firebase.couponCol.get().then((querySnapshot) => {
      couponLen = querySnapshot.size;
      next();
    });
  } else {
    next();
  }
});
router.get('/', (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const totalPages = Math.ceil(couponLen / 10);
  if (page > totalPages || page < 1) {
    res.send({
      success: false,
      message: '頁數格式錯誤',
    });
    return;
  }

  const coupons = [];
  firebase.couponCol.orderBy('create_time').get().then((querySnapshot) => {
    querySnapshot.forEach((item) => {
      coupons.push(item.data());
    });
  }).then(() => {
    if (!req.query.page) {
      res.send({
        success: true,
        coupons,
      });
    } else {
      res.send({
        success: true,
        coupons: coupons.slice(0 + (10 * (page - 1)), 10 + (10 * (page - 1))),
        pagination: {
          total_pages: totalPages,
          current_page: page,
          has_pre: Number(page) !== 1,
          has_next: Number(page) !== totalPages,
        },
      });
    }
  });
});


module.exports = router;
