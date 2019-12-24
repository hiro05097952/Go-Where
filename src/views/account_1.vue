<template>
  <div id="account">
    <loading :active.sync="isLoading"></loading>
    <info></info>
    <loginbox></loginbox>

    <navbar></navbar>

    <div class="content">
      <ul class="accountNav">
        <li :class="{'active' : $route.path === '/account/accountinfo'}"
        @click="$router.push('/account/accountinfo')">會員資料</li>
        <li :class="{'active' : $route.path === '/account/userlike'}"
        @click="$router.push('/account/userlike')">追蹤商品</li>
        <li :class="{'active' : $route.path === '/account/orderlist'}"
        @click="$router.push('/account/orderlist')">訂單查看</li>
      </ul>
      <router-view></router-view>

    </div>

    <transition name="cartFade">
      <cart v-if="cartOpen"></cart>
    </transition>

    <foot></foot>
  </div>
</template>

<script>
import info from '../components/tem_info.vue';
import cart from '../components/cart.vue';
import foot from '../components/foot.vue';
import navbar from '../components/navbar.vue';
import loginbox from '../components/login.vue';

export default {
  name: 'Account',
  components: {
    cart,
    foot,
    navbar,
    info,
    loginbox,
  },
  data() {
    return {
    };
  },
  computed: {
    cartOpen() {
      return this.$store.state.cartOpen;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/sass/helpers/_reset.scss';
@import '../assets/sass/helpers/_transition.scss';
@import '../assets/sass/account.scss';
</style>
