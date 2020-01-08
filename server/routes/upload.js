const express = require('express');

const router = express.Router();
const multer = require('multer');
const uuidv1 = require('uuid/v1');

const firebase = require('../config/firebase');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
});

router.post('/', upload.single('image'), (req, res) => {
  // console.log('接收資料: ', req.file);
  if (!req.file || !req.file.mimetype.includes('image')) {
    res.send({
      success: false,
      message: '檔案格式錯誤',
    });
    return;
  }

  const blob = firebase.bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    contentType: req.file.mimetype,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv1(),
      },
    },
  });

  blobStream.on('error', () => {
    res.send({
      success: false,
      message: 'blobStream error',
    });
  });
  blobStream.on('finish', () => {
    const file = firebase.bucket.file(blob.name);
    file.getMetadata().then((data) => {
      const metadata = data[0];
      // console.log(metadata);
      res.send({
        success: true,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${metadata.metadata.firebaseStorageDownloadTokens}`,
      });
    });

    // 簽證寫法
    // firebase.bucket.file(blob.name).getSignedUrl({
    //   action: 'read',
    //   expires: Date.now() + 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    // }, (err, url) => {
    //   if(err) {
    //     res.send({
    //       success: false,
    //       message: err,
    //     });
    //     return
    //   }
    //   res.send({
    //     success: true,
    //     imageUrl: url,
    //   });
    // });
  });
  blobStream.end(req.file.buffer);
});

module.exports = router;
