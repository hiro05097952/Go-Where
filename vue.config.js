const fs = require('fs');

module.exports = {
  publicPath: './',
  devServer: {
    https: {
      key: fs.readFileSync('./certs/localhost+1-key.pem'),
      cert: fs.readFileSync('./certs/localhost+1.pem'),
    },
  },
};
