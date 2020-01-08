const express = require('express');

const router = express.Router();
const uuidv1 = require('uuid/v1');

const firebase = require('../config/firebase');
const validate = require('../config/validate');


router.post('/', (req, res) => {
  const config = {
    title: req.body.title,
    due_date: req.body.due_date,
    is_enabled: req.body.is_enabled ? req.body.is_enabled : 0,
    percent: req.body.percent,
    code: req.body.code,
    id: uuidv1(),
    create_time: +new Date(),
  };
  const valid = validate.couponValidate(config);
  if (valid.error) {
    res.send({
      success: false,
      message: valid.error.message,
    });
    return;
  }
  firebase.couponCol.doc().set(config).then(() => {
    res.send({
      success: true,
      message: '新增優惠卷成功',
    });
  }).catch(() => {
    res.send({
      success: false,
      message: '新增優惠卷失敗',
    });
  });
});

router.put('/:couponID', (req, res) => {
  let ref = '';
  firebase.couponCol.limit(1).where('id', '==', req.params.couponID).get().then((querySnapshot) => {
    querySnapshot.forEach((item) => {
      ref = item.ref.path;
    });
  })
    .then(() => {
      if (!ref) {
        res.send({
          success: false,
          message: '查無此優惠卷',
        });
        return;
      }
      const newCoupon = {
        ...req.body,
      };
      const valid = validate.couponValidate(newCoupon);
      if (valid.error) {
        res.send({
          success: false,
          message: valid.error.message,
        });
        return;
      }
      firebase.firestore.doc(ref).update(newCoupon).then(() => {
        res.send({
          success: true,
          message: '更新優惠卷成功',
        });
      });
    });
});

router.delete('/:couponID', (req, res) => {
  let ref = '';
  firebase.couponCol.limit(1).where('id', '==', req.params.couponID).get().then((querySnapshot) => {
    querySnapshot.forEach((item) => {
      ref = item.ref.path;
    });
  })
    .then(() => {
      if (!ref) {
        res.send({
          success: false,
          message: '查無此優惠卷',
        });
        return;
      }
      firebase.firestore.doc(ref).delete().then(() => {
        res.send({
          success: true,
          message: '刪除優惠卷成功',
        });
      });
    });
});


module.exports = router;
