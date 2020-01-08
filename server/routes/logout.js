const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy();
  res.send({
    success: true,
    message: '登出成功',
  });
});

module.exports = router;