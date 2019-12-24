<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">
      Go! Where?
    </div>
    <ul class="itemNav">
      <li><router-link to="/about">ABOUT</router-link></li>
      <li><router-link to="/shop/all">ALL</router-link></li>
      <li>
        <router-link to="/shop/vintage_all">VINTAGE
          <i class="fas fa-sort-down"></i>
        </router-link>
        <ul>
          <li><router-link to="/shop/vintage_top">上衣</router-link></li>
          <li><router-link to="/shop/vintage_coat">外套</router-link></li>
          <li><router-link to="/shop/vintage_shoes">鞋子</router-link></li>
          <li><router-link to="/shop/vintage_pants">褲子</router-link></li>
          <li><router-link to="/shop/vintage_dress">洋裝</router-link></li>
        </ul>
      </li>
      <li>
        <router-link to="/shop/select_all">SELECT
          <i class="fas fa-sort-down"></i>
        </router-link>
        <ul>
          <li><router-link to="/shop/select_converse">Coverse</router-link></li>
          <li><router-link to="/shop/select_keen">Keen</router-link></li>
          <li><router-link to="/shop/select_vans">Vans</router-link></li>
          <li><router-link to="/shop/select_martens">Dr.Martens</router-link></li>
          <li><router-link to="/shop/select_carhartt">Carhartt</router-link></li>
          <li><router-link to="/shop/select_thenorthface">The North Face</router-link></li>
        </ul>
      </li>
      <li>
        <router-link to="/shop/accessories_all">ACCESSORIES
          <i class="fas fa-sort-down"></i>
        </router-link>
        <ul>
          <li><router-link to="/shop/accessories_hairpin">髮夾</router-link></li>
          <li><router-link to="/shop/accessories_earpin">耳環</router-link></li>
          <li><router-link to="/shop/accessories_socks">襪子</router-link></li>
          <li><router-link to="/shop/accessories_bag">背包</router-link></li>
        </ul>
      </li>
      <li><router-link to="/shop/sale">SALE</router-link></li>
    </ul>
    <ul class="accountNav">
      <li @click="$store.commit('OPENLOGINBOX', true)"
        v-if="$store.state.user.isAdmin === undefined">
        <i class="far fa-user"></i>
      </li>
      <li v-else class="signed">
        <i class="fas fa-user-edit"></i>
        <ul class="userBox">
          <li @click="$router.push('/account/accountinfo')">會員專區</li>
          <li @click="signout">登出</li>
        </ul>
      </li>
      <li @click="$router.push('/account/userlike')"><i class="far fa-heart"></i></li>
      <li @click.stop="openCart">
        <i class="fas fa-shopping-cart"></i>
        <i class="cartQty" v-if="cartLen">{{ cartLen }}</i>
      </li>
    </ul>
    <div class="couponWrap">
      <i class="fas fa-birthday-cake"></i>
      <div class="couponInfo">
        <h5>為慶祝本店週年慶，即日起在購物欄輸入comehere，即可享七折優惠！</h5>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

const auth = firebase.auth();

export default {
  name: 'navbar',
  data() {
    return {
    };
  },
  methods: {
    openCart() {
      this.$store.commit('OPENCART', !this.$store.state.cartOpen);
    },
    signout() {
      this.$store.commit('LOADINGCHANGE', true);
      auth.signOut().then(() => {
        this.axios.post(`${process.env.VUE_APP_APIURL}/api/logout`).then(() => {
          this.$store.commit('UPDATEUSER', {});
          this.$store.commit('UPDATECART', '');
          setTimeout(() => {
            this.$store.commit('LOADINGCHANGE', false);
          }, 1000);
          if (this.$route.path.includes('account')) {
            this.$router.replace('/');
          }
        });
      });
    },
  },
  computed: {
    cartLen() {
      if (this.$store.state.cart.carts) {
        return this.$store.state.cart.carts.length;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/sass/navbar.scss';
</style>
