import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate, { Validator } from 'vee-validate';
// eslint-disable-next-line camelcase
import zh_TW from 'vee-validate/dist/locale/zh_TW';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {
  inject: true,
  delay: 500,
  classes: true,
  classNames: {
    valid: 'border-success',
    invalid: 'is-invalid',
  },
});
Validator.localize('zh_TW', zh_TW);

Vue.component('Loading', Loading);

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      // console.log('登入確認：', response.data);
      if (!response.data.success) {
        router.push('/admin/login');
      } else {
        next();
      }
    });
  } else if (to.name === 'ItemInfo') {
    store.commit('UPDATEFROMPAGE', from.params.shop_id);
    next();
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
