const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');

router.post('/', (req, res) => {
  // use coupon
  let coupon = '';
  firebase.couponCol.limit(1).where('code', '==', req.body.code).get().then((querySnapshot) => {
    querySnapshot.forEach((item) => {
      coupon = item.data();
    });
  })
    .then(() => {
      if (!coupon) {
        res.send({
          success: false,
          message: '查無此優惠卷',
        });
        return;
      }
      if (coupon.due_date < new Date()) {
        res.send({
          success: false,
          message: '優惠卷已過期',
        });
        return;
      }
      const config = {
        coupon,
      };
      // 更新每個品項
      firebase.firestore.collection(`user/${req.session.user.uid}/cart`).get().then((querySnapshot) => {
        let index = 0;
        querySnapshot.forEach((item) => {
          const carts = item.data();
          // 更新最終價錢
          config.final_total = Math.round((coupon.percent / 100)
           * (carts.product.price * carts.qty));
          firebase.firestore.doc(item.ref.path).update(config);
          index += 1;
          if (index === querySnapshot.size) {
            res.send({
              success: true,
              message: '套用優惠卷成功',
            });
          }
        });
      });
    });
});


module.exports = router;
