import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mutations = {
  UPDATEITEMS(state, item) {
    state.items = item;
  },
  LOADINGCHANGE(state, isOpen) {
    state.isLoading = isOpen;
  },
  UPDATEPAGE(state, pagination) {
    state.pagination = pagination;
  },
  OPENCART(state, isOpen) {
    state.cartOpen = isOpen;
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
  OPENLOGINBOX(state, isOpen) {
    state.loginBoxOpen = isOpen;
  },
  UPDATEUSER(state, userInfo) {
    state.user = userInfo;
  },
  UPDATELIKES(state, likes) {
    state.likes = likes;
  },
};

export const actions = {
  async getItems({ commit }, items = { pageNum: 1, isAdmin: true, item: 'products' }) {
    // products | orders | coupons
    const api = items.isAdmin ? `/api/admin/${items.item}?page=${items.pageNum}`
      : `/api/${items.item}`;

    const { data } = await this.$axios.get(api);
    // console.log(`${items.item}列表: `, data);
    if (!data.success) {
      this.$swal.fire({
        icon: 'error',
        title: data.message,
      });
      return;
    }
    // 商品
    commit('UPDATEITEMS', data[items.item]);
    // 頁數
    commit('UPDATEPAGE', items.isAdmin ? data.pagination : []);
    // Loading
  },
  async getCart({ commit, state }) {
    if (!state.user.emailVerified) { return; }

    const { data } = await this.$axios.get('/api/cart');
    // console.log('cart: ', data);
    if (data.success) {
      commit('UPDATECART', data.data);
    } else if (!data.success && data.message) {
      this.$swal.fire({
        icon: 'error',
        title: data.message,
      });
    }
  },
  async getOnePro({ commit }, payload) {
    // payload = product ID

    const { data } = await this.$axios.get(`/api/product/${payload}`);

    // 商品
    commit('UPDATEONEPRO', data.product);
  },
  async getLikes({ commit }) {
    const { data } = await this.$axios.get('/api/like');
    // console.log('likes: ', data);
    // 商品
    commit('UPDATELIKES', data.likes);
  },
  async serverLogin({ commit, dispatch }, idToken) {
    const { data } = await this.$axios.post('/api/login', { idToken });

    // console.log('Client 登入訊息:', data);
    if (data.success) {
      commit('UPDATEUSER', data.userInfo);
      dispatch('getLikes');
      // this.user = {};
      this.$swal.fire({
        title: '登入成功',
        icon: 'success',
      });
      if (!data.userInfo.emailVerified) {
        this.$swal.fire({
          title: '請至信箱驗證並繼續購物',
          icon: 'error',
        });
      }
    }
    commit('OPENLOGINBOX', false);
  },
  async nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.user) {
      commit('UPDATEUSER', req.session.user);
      return;
    }

    const { data } = await this.$axios.get('/api/login', {
      withCredentials: true,
    });
    if (data.success) {
      commit('UPDATEUSER', data.userInfo);
    }
  },
};

export const state = () => ({
  pagination: [],
  isLoading: false,
  items: [],
  cartOpen: false,
  cart: {
    carts: [],
  },
  product: {},
  fromPage: 'All',
  loginBoxOpen: false,
  user: {},
  likes: [],
});

export default {
  state,
  mutations,
  actions,
};
