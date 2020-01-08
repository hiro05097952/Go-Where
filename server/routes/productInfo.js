const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');

router.get('/:proID', (req, res) => {
  firebase.productsCol.limit(1).where('id', '==', req.params.proID).get().then((querySnapshot) => {
    if (querySnapshot.size === 0) {
      res.send({
        success: false,
        message: '查無此商品',
      });
      return;
    }
    querySnapshot.forEach((item) => {
      res.send({
        success: true,
        product: item.data(),
      });
    });
  });
});

module.exports = router;
