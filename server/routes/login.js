const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');

// google signup
router.post('/', (req, res, next) => {
  // console.log('session: ', req.session.user);
  firebase.auth.verifyIdToken(req.body.idToken).then((claims) => {
    // google 註冊
    if (claims.firebase.sign_in_provider === 'google.com') {
      firebase.userCol.where('uid', '==', claims.uid).get().then((querySnapShot) => {
        if (!querySnapShot.size) {
          firebase.userCol.doc(claims.uid).set({
            uid: claims.uid,
            displayName: claims.name,
            email: claims.email,
            create_time: +new Date(),
            likes: [],
            subscribe: 0,
            address: '',
          });
          firebase.auth.setCustomUserClaims(claims.uid, { isAdmin: false }).then(() => {
            res.locals = {
              claims,
            };
            next();
          });
        }
        res.locals = {
          claims,
        };
        next();
      });
    } else {
      res.locals = {
        claims,
      };
      next();
    }
  }).catch((err) => {
    res.send({
      success: false,
      message: err,
    });
  });
});

// login create session
router.post('/', (req, res) => {
  // console.log('locals: ', res.locals);
  if (res.locals.claims.isAdmin) {
    req.session.user = {
      uid: res.locals.claims.sub,
      isAdmin: true,
      emailVerified: true,
    };
    res.send({
      success: true,
      message: '管理員登入成功',
      userInfo: {
        isAdmin: true,
        emailVerified: true,
      },
    });
    return;
  }

  if (res.locals.claims.email_verified) {
    req.session.user = {
      uid: res.locals.claims.uid,
      isAdmin: false,
      emailVerified: true,
    };
    res.send({
      success: true,
      message: '客戶登入成功',
      userInfo: {
        isAdmin: false,
        emailVerified: true,
      },
    });
  } else {
    req.session.user = {
      uid: res.locals.claims.uid,
      isAdmin: false,
      emailVerified: false,
    };
    res.send({
      success: true,
      message: '請先驗證信箱',
      userInfo: {
        isAdmin: false,
        emailVerified: false,
      },
    });
  }
});

// get session 進入會員頁面需先做身份驗證
router.get('/', (req, res) => {
  if (!req.session.user) {
    res.send({
      success: false,
      message: '請先登入',
    });
    return;
  }
  firebase.auth.getUser(req.session.user.uid).then((userRecord) => {
    if (req.session.user.isAdmin !== userRecord.customClaims.isAdmin
    || req.session.user.emailVerified !== userRecord.emailVerified) {
      req.session.user = {
        uid: userRecord.uid,
        isAdmin: userRecord.customClaims.isAdmin,
        emailVerified: userRecord.emailVerified,
      };
    }
    res.send({
      success: true,
      message: '登入中',
      userInfo: {
        emailVerified: req.session.user.emailVerified,
        isAdmin: req.session.user.isAdmin,
      },
    });
  });
});

module.exports = router;
