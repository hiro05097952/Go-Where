const express = require('express');

const router = express.Router();

// verifyIdToken
const verificationWhiteList = [
  {
    path: '/api/products',
    method: 'GET',
  },
  {
    path: '/api/product',
    method: 'GET',
  },
  {
    // sign up
    path: '/api/user',
    method: 'POST',
  },
  {
    // 取得會員資料
    path: '/api/user',
    method: 'GET',
  },
  {
    // admin 權限
    path: '/api/admin/user',
    method: 'POST',
  },
  {
    // create session by after login
    path: '/api/login',
    method: 'GET',
  },
  {
    // get session status
    path: '/api/login',
    method: 'POST',
  },
  {
    // ecpay
    path: '/api/ecpay/client',
    method: 'POST',
  },
  {
    // ecpay
    path: '/api/ecpay/checkout',
    method: 'GET',
  },
  {
    // ecpay
    path: '/api/ecpay/server',
    method: 'POST',
  },
  {
    // test
    path: '/test',
    method: 'POST',
  },
];

router.use((req, res, next) => {
  // 白名單
  const varifyWhite = verificationWhiteList.some((item) => (
    ((req.path.includes(item.path) && req.method === item.method) || !req.path.includes('api')) ? true : null
  ));
  if (varifyWhite) {
    next();
    return;
  }

  // 是否登入過
  // console.log('session: ', req.session.user);
  if (!req.session.user) {
    res.send({
      success: false,
      message: '請先登入會員',
    });
    return;
  }
  // admin 路由
  if (req.path.includes('admin')) {
    if (req.session.user.isAdmin) {
      next();
      return;
    }
    res.send({
      success: false,
      message: '尚未擁有管理員權限',
    });
  } else {
    if (req.session.user.emailVerified) {
      next();
      return;
    }
    res.send({
      success: false,
      message: '請先認證電子郵件',
    });
  }
});

module.exports = router;
