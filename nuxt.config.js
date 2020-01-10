const { Firestore } = require('@google-cloud/firestore');
const { FirestoreStore } = require('@google-cloud/connect-firestore');
require('dotenv').config();

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Go Where',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '2018 年開始，從 Instagram 出發，主要批購日系穿搭中常出現的鞋款，也時常會分享一些穿搭技巧。近期也開始著手古著，希望大家都可以在店鋪探索，並找尋專屬於自己的穿搭！' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      { property: 'og:title', content: 'Go Where' },
      { property: 'og:description', content: '2018 年開始，從 Instagram 出發，主要批購日系穿搭中常出現的鞋款，也時常會分享一些穿搭技巧。近期也開始著手古著，希望大家都可以在店鋪探索，並找尋專屬於自己的穿搭！' },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1469692422776-14abcfa4b525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { property: 'og:image:width', content: '600px' },
      { property: 'og:image:height', content: '600px' },
      { property: 'og:url', content: 'https://go-where-nuxt.herokuapp.com' },
      { property: 'og:site_name', content: 'Go Where' },
      { property: 'og:locale', content: 'zh_TW' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' },
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js' },
      { src: 'https://code.jquery.com/jquery-3.4.1.slim.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' },
      { src: 'https://kit.fontawesome.com/4389d5cbf1.js' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: 'rgb(4, 153, 153)',
    height: '3px',
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/sweetalert2',
    '~/plugins/vee-validate',
    '~/plugins/axios',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['nuxt-session', () => ({
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
    })],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // eslint-disable-next-line no-unused-vars
    extend(config, ctx) {
    },
  },
  router: {
    middleware: 'auth',
  },
};
