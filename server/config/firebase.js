const admin = require('firebase-admin');
const serviceAccount = require('./vueshop.json');


const defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vueshop-5a45c.firebaseio.com',
});
const auth = defaultApp.auth();
const firestore = defaultApp.firestore();
const bucket = defaultApp.storage().bucket('vueshop-5a45c.appspot.com');

const productsCol = firestore.collection('products');
const userCol = firestore.collection('user');
const couponCol = firestore.collection('coupon');


module.exports = {
  auth,
  firestore,
  bucket,
  // Collection
  productsCol,
  userCol,
  couponCol,
};
