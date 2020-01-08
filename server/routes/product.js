const express = require('express');
const uuidv1 = require('uuid/v1');

const firebase = require('../config/firebase');
const validate = require('../config/validate');

const router = express.Router();

router.post('/', (req, res) => {
  const cacheConfig = {
    title: '',
    category: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    content: '',
    is_enabled: 0,
    imageUrl: '',
    num: 1, // 庫存
    id: uuidv1(),
    create_time: +new Date(),
    ...req.body,
  };

  const valid = validate.proValidate(cacheConfig);
  if (valid.error) {
    res.send({
      success: false,
      message: valid.error.message,
    });
  } else {
    firebase.productsCol.doc(cacheConfig.id).set(cacheConfig).then(() => {
      res.send({
        success: true,
        message: '已建立商品',
      });
    }).catch(() => {
      res.send({
        success: false,
        message: '商品建立失敗，格式錯誤',
      });
    });
  }
});

router.put('/:proID', (req, res) => {
  let name = '';
  firebase.productsCol.limit(1).where('id', '==', req.params.proID).get().then((querySnapshot) => {
    querySnapshot.forEach((item) => {
      name = item.id;
    });
  })
    .then(() => {
      if (!name) {
        res.send({
          success: false,
          message: '查無此商品',
        });
        return;
      }
      // const config = { ...req.body };

      const valid = validate.proValidate(req.body);
      if (valid.error) {
        res.send({
          success: false,
          message: valid.error.message,
        });
      } else {
        firebase.productsCol.doc(name).update(req.body).then(() => {
          res.send({
            success: true,
            message: '已更新商品',
          });
        }).catch(() => {
          res.send({
            success: false,
            message: '商品更新失敗，格式錯誤',
          });
        });
      }
    });
});

router.delete('/:proID', (req, res) => {
  let name = '';
  firebase.productsCol.limit(1).where('id', '==', req.params.proID).get().then((querySnapshot) => {
    querySnapshot.forEach((item) => {
      name = item.id;
    });
  })
    .then(() => {
      if (!name) {
        res.send({
          success: false,
          message: '查無此商品',
        });
        return;
      }
      firebase.productsCol.doc(name).delete().then(() => {
        res.send({
          success: true,
          message: '刪除產品成功',
        });
      });
    });
});

module.exports = router;
