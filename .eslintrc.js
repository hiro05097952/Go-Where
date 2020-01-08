const resolve = require('path').resolve;

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'airbnb-base',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  plugins: [
    'import',
    'html',
  ],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/attributes-order': 'off',
    'vue/order-in-components': 'off',
    'no-console': 0,
    'no-alert': 0,
    'no-param-reassign': [2, {
      'ignorePropertyModificationsFor': [
        'state'
      ]
    }]
  },
  settings: {
    'import/core-modules': ['vue', 'vuex'], // these modules are included in nuxt.js
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': __dirname,
              '~static': resolve(__dirname, 'static'),
              '~assets': resolve(__dirname, 'assets'),
              '~plugins': resolve(__dirname, 'plugins'),
              '~store': resolve(__dirname, '.nuxt/store'),
              '~router': resolve(__dirname, '.nuxt/router'),
              '~pages': resolve(__dirname, 'pages'),
              '~components': resolve(__dirname, 'components')
            }
          }
        }
      }
    }
  },
}
