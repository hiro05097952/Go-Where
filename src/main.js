import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate, { Validator } from 'vee-validate';
// eslint-disable-next-line camelcase
import zh_TW from 'vee-validate/dist/locale/zh_TW';
import firebase from 'firebase/app';
import 'firebase/auth';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {
  inject: true,
  delay: 500,
});
Validator.localize('zh_TW', zh_TW);
Vue.component('Loading', Loading);
Vue.use(VueSweetalert2);
axios.defaults.withCredentials = true;


// firebase
const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId,
};
firebase.initializeApp(firebaseConfig);


router.beforeEach((to, from, next) => {
  if (to.path.includes('account') || to.path.includes('admin') || from.path === undefined
  || to.path.includes('checkout')) {
    if (to.path.includes('login') || to.path.includes('signup')) {
      next();
      return;
    }
    store.commit('LOADINGCHANGE', true);
    axios.get(`${process.env.VUE_APP_APIURL}/api/login`).then((response) => {
      // console.log('登入狀態: ', response.data);
      if (!response.data.success) {
        // 未登入下打開登入視窗
        next('/');
        store.commit('LOADINGCHANGE', false);
        store.commit('OPENLOGINBOX', true);
      } else {
        store.commit('UPDATEUSER', response.data.userInfo);
        if (to.path.includes('account') && !response.data.userInfo.emailVerified) {
          // email 未驗證導入驗證畫面
          store.dispatch('updateMessage', {
            message: '請先驗證信箱',
            status: 'error',
          });
          store.commit('LOADINGCHANGE', false);
          next('/account/accountInfo');
          return;
        }
        if (to.path.includes('admin') && !response.data.userInfo.isAdmin) {
          store.dispatch('updateMessage', {
            message: '未擁有管理員權限',
            status: 'error',
          });
          store.commit('LOADINGCHANGE', false);
          next('/');
          return;
        }
        store.commit('LOADINGCHANGE', false);
        next();
      }
    });
  } else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
