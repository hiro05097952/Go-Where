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
    cart: {
      carts: {},
    },
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
  },
  actions: {
    getProducts({ commit }, payload = { pageNum: 1, isAdmin: true, item: 'product' }) {
      const admin = payload.isAdmin ? '/admin' : '';
      // 分別 Products / Customer_orders
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}${admin}/products?page=${payload.pageNum}`;
      // Coupon / OrderList
      if (payload.item === 'coupon') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${payload.pageNum}`;
      } else if (payload.item === 'orderlist') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${payload.pageNum}`;
      } else if (!payload.isAdmin) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}${admin}/products/all`;
      }

      commit('LOADINGCHANGE', true);

      Vue.axios.get(api).then((response) => {
        // console.log(`${payload.item}列表: `, response.data);
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
    getCart({ commit }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      commit('LOADINGCHANGE', true);

      Vue.axios.get(api).then((response) => {
        commit('LOADINGCHANGE', false);
        commit('UPDATECART', response.data.data);
      });
    },
  },
});
