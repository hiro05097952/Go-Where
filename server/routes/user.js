const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');
const validate = require('../config/validate');


// create user
router.post('/', (req, res) => {
  const valid = validate.signUpValidate(req.body);
  if (valid.error) {
    res.send({
      success: false,
      message: valid.error.message,
    });
    return;
  }
  firebase.auth.createUser({
    ...req.body,
    emailVerified: false,
    disabled: false,
  }).then((userRecord) => {
    // console.log('成功註冊新使用者: ', userRecord.uid);

    // 建立 user data
    firebase.userCol.doc(userRecord.uid).set({
      uid: userRecord.uid,
      displayName: userRecord.displayName,
      email: userRecord.email,
      create_time: +new Date(),
      likes: [],
      subscribe: 0,
      address: '',
    });
    // 建立 admin 區分
    firebase.auth.setCustomUserClaims(userRecord.uid, { isAdmin: false }).then(() => {
      res.send({
        success: true,
        message: '註冊成功',
      });
    }).catch((err) => {
      res.send({
        success: false,
        message: err.message,
      });
    });
  }).catch((error) => {
    res.send({
      success: false,
      message: error.message,
    });
  });
});

// 更改用戶資料
router.put('/', (req, res) => {
  const passwordConfig = {
    displayName: req.body.displayName,
  };
  const storeConfig = { ...req.body };
  if (req.body.currentPassword) {
    if (req.body.newPassword !== req.body.newPasswordConfirm) {
      res.send({
        success: false,
        message: '新密碼不一致',
      });
      return;
    }
    if (req.body.currentPassword === req.body.newPassword) {
      res.send({
        success: false,
        message: '不能與現在密碼一樣',
      });
      return;
    }
    passwordConfig.password = req.body.newPassword;
    delete storeConfig.currentPassword;
    delete storeConfig.newPassword;
    delete storeConfig.newPasswordConfirm;
  }

  // 更新 firebase.auth & firebase.firestore
  firebase.auth.updateUser(req.session.user.uid, passwordConfig).then(() => {
    firebase.userCol.doc(req.session.user.uid).update(storeConfig).then(() => {
      res.send({
        success: true,
        message: '更新個人資料成功',
      });
    });
  }).catch((err) => {
    res.send({
      success: false,
      message: err.message,
    });
  });
});

// get firestore user data
router.get('/', (req, res) => {
  if (!req.session.user) {
    res.send({
      success: false,
      message: '請先登入會員',
    });
    return;
  }
  firebase.userCol.doc(req.session.user.uid).get().then((item) => {
    const userInfo = item.data();
    delete userInfo.uid;
    res.send({
      success: true,
      userInfo,
    });
  });
});

module.exports = router;
