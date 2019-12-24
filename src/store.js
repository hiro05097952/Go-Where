import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    pagination: [],
    isLoading: false,
    products: [],
    cartOpen: false,
    cart: {},
    product: {},
    fromPage: 'All',
    loginBoxOpen: false,
    user: {},
    likes: [],
  },
  mutations: {
    UPDATEPRODUCT(state, payload) {
      state.products = payload;
    },
    LOADINGCHANGE(state, payload) {
      state.isLoading = payload;
    },
    UPDATEMESSAGE(state, payload) {
      state.messages.push({
        message: payload.message,
        status: payload.status,
        timestamp: payload.timestamp,
      });
    },
    REMOVEMESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
    UPDATEPAGE(state, payload) {
      state.pagination = payload;
    },
    OPENCART(state, payload) {
      state.cartOpen = payload;
    },
    UPDATECART(state, payload) {
      state.cart = payload;
    },
    UPDATEONEPRO(state, payload) {
      state.product = payload;
    },
    UPDATEFROMPAGE(state, payload) {
      state.fromPage = payload;
    },
    OPENLOGINBOX(state, payload) {
      state.loginBoxOpen = payload;
    },
    UPDATEUSER(state, payload) {
      state.user = payload;
    },
    UPDATELIKES(state, payload) {
      state.likes = payload;
    },
  },
  actions: {
    getProducts({ commit, dispatch }, payload = { pageNum: 1, isAdmin: true, item: 'product' }) {
      const admin = payload.isAdmin ? '/admin' : '';
      // 分別 Products / Admin_products
      let api = `${process.env.VUE_APP_APIURL}/api${admin}/products?page=${payload.pageNum}`;
      // Coupon / OrderList
      if (payload.item === 'coupon') {
        api = `${process.env.VUE_APP_APIURL}/api/admin/coupons?page=${payload.pageNum}`;
      } else if (payload.item === 'orderlist') {
        api = `${process.env.VUE_APP_APIURL}/api/admin/orders?page=${payload.pageNum}`;
      } else if (!payload.isAdmin) {
        api = `${process.env.VUE_APP_APIURL}/api${admin}/products`;
      }

      commit('LOADINGCHANGE', true);

      Vue.axios.get(api).then((response) => {
        // console.log(`${payload.item}列表: `, response.data);
        if (!response.data.success) {
          dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
          commit('LOADINGCHANGE', false);
          return;
        }
        // 商品
        if (payload.item === 'product') {
          commit('UPDATEPRODUCT', response.data.products);
        } else if (payload.item === 'coupon') {
          commit('UPDATEPRODUCT', response.data.coupons);
        } else if (payload.item === 'orderlist') {
          commit('UPDATEPRODUCT', response.data.orders);
        }
        // 頁數
        commit('UPDATEPAGE', response.data.pagination);
        // Loading
        commit('LOADINGCHANGE', false);
      });
    },
    updateMessage({ commit, state }, payload) {
      // 錯誤提示
      const timestamp = Math.floor(new Date() / 1000);
      const newOb = { ...payload, timestamp };
      commit('UPDATEMESSAGE', newOb);

      setTimeout(() => {
        const index = state.messages.indexOf(newOb);
        commit('REMOVEMESSAGE', index);
      }, 5000);
    },
    getCart({ commit, state }) {
      if (!state.user.emailVerified) { return; }
      const api = `${process.env.VUE_APP_APIURL}/api/cart`;
      commit('LOADINGCHANGE', true);

      Vue.axios.get(api).then((response) => {
        // console.log('cart: ', response.data);
        commit('LOADINGCHANGE', false);
        commit('UPDATECART', response.data.data);
      });
    },
    getOnePro({ commit }, payload) {
      // payload = product ID
      const api = `${process.env.VUE_APP_APIURL}/api/product/${payload}`;
      commit('LOADINGCHANGE', true);

      Vue.axios.get(api).then((response) => {
        // 商品
        commit('UPDATEONEPRO', response.data.product);
        commit('LOADINGCHANGE', false);
      });
    },
    getLikes({ commit }) {
      const api = `${process.env.VUE_APP_APIURL}/api/like`;
      commit('LOADINGCHANGE', true);

      Vue.axios.get(api).then((response) => {
        // console.log(response.data);
        // 商品
        commit('UPDATELIKES', response.data.likes);
        commit('LOADINGCHANGE', false);
      });
    },
  },
});
