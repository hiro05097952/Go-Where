const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');

router.post('/', (req, res) => {
  firebase.auth.setCustomUserClaims(req.session.user.uid, { isAdmin: true }).then(() => {
    res.send({
      success: true,
      message: '成功設定管理員權限',
    });
  }).catch((err) => {
    res.send({
      success: false,
      message: err.message,
    });
  });
});

module.exports = router;
