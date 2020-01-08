const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');
const { Firestore } = require('@google-cloud/firestore');
const { FirestoreStore } = require('@google-cloud/connect-firestore');
require('dotenv').config();

const testRouter = require('./routes/test');
const productsRouter = require('./routes/products');
const productRouter = require('./routes/product');
const productInfoRouter = require('./routes/productInfo');
const uploadRouter = require('./routes/upload');
const middlewareRouter = require('./config/middleware');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const adminUserRouter = require('./routes/adminUser');
const cartRouter = require('./routes/cart');
const adminCouponeRouter = require('./routes/adminCoupon');
const couponsRouter = require('./routes/coupons');
const useCouponRouter = require('./routes/useCoupon');
const likeRouter = require('./routes/like');
const orderRouter = require('./routes/order');
const ordersRouter = require('./routes/orders');
const adminOrdersRouter = require('./routes/adminOrders');
const ecpayRouter = require('./routes/ecpay');

const app = express();

// self
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ecpay conent-type

// cors
const whitelist = ['https://postgate.ecpay.com.tw'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, origin);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(session({
  secret: 'Firebase Auth Verify',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true, // https
    maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
  },
  store: new FirestoreStore({
    dataset: new Firestore({
      kind: 'express-sessions',
    }),
  }),
}));
app.use(flash());


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');

config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }


  // middleware Verify
  app.use(middlewareRouter);


  app.use(['/api/admin/products', '/api/products'], productsRouter);

  app.use('/api/product', productInfoRouter);

  app.use('/api/admin/product', productRouter);

  app.use('/api/admin/upload', uploadRouter);


  // create user & 更改用戶資料 & get firestore user data
  app.use('/api/user', userRouter);

  // create session & get session
  app.use('/api/login', loginRouter);

  // 給予 admin 權限
  app.use('/api/admin/user', adminUserRouter);

  app.use('/api/logout', logoutRouter);


  // CART 需登入
  app.use('/api/cart', cartRouter);


  // COUPON 需登入
  app.use('/api/admin/coupon', adminCouponeRouter);

  app.use('/api/admin/coupons', couponsRouter);

  app.use('/api/coupon', useCouponRouter);


  // Favorite 需登入
  app.use('/api/like', likeRouter);


  // 訂單下訂
  app.use('/api/order', orderRouter);

  app.use('/api/orders', ordersRouter);

  app.use('/api/admin/orders', adminOrdersRouter);


  // ecpay
  app.use('/api/ecpay', ecpayRouter);


  app.use('/test', testRouter);

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
