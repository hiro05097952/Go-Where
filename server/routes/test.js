const express = require('express');

const router = express.Router();

const firebase = require('../config/firebase');

router.post('/', (req, res) => {
  // console.log('req: ', req);
  console.log('test:', req.body);
  // res.send(req.body);
  res.send('1');
});

router.get('/', (req, res) => {
  firebase.productsCol.get().then((querySnapShot) => {
    res.send(`length: ${querySnapShot.size}`);
  });
});


module.exports = router;
