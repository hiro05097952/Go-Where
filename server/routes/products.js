const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');

let productLen = '';
firebase.productsCol.onSnapshot((snap) => {
  productLen = snap.size;
});

router.get('/', (req, res, next) => {
  if (!productLen) {
    productLen = firebase.productsCol.get().then((querySnapshot) => {
      productLen = querySnapshot.size;
    }).then(() => {
      next();
    });
  } else {
    next();
  }
});

router.get('/', (req, res) => {
  const totalPages = Math.ceil(productLen / 10);
  if (req.query.page > totalPages || req.query.page < 1) {
    res.send({
      success: false,
      message: '頁數格式錯誤',
    });
    return;
  }

  const products = [];
  firebase.productsCol.orderBy('create_time').get().then((querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      products.push(documentSnapshot.data());
    });
  }).then(() => {
    if (req.query.page) {
      res.send({
        success: true,
        products: products.slice(0 + (10 * (req.query.page - 1)), 10 + (10 * (req.query.page - 1))),
        pagination: {
          total_pages: totalPages,
          current_page: req.query.page,
          has_pre: Number(req.query.page) !== 1,
          has_next: Number(req.query.page) !== totalPages,
        },
      });
    } else {
      res.send({
        success: true,
        products,
      });
    }
  });
});


module.exports = router;
