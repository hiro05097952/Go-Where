<template>
  <div id="checkout">
    <loading :active.sync="isLoading"></loading>
    <info></info>
    <loginbox></loginbox>

    <navbar></navbar>

    <div class="content">
      <ul class="stepWrap">
        <li><i class="active">1</i>購物車</li>
        <li></li>
        <li><i class="active">2</i>填寫資料</li>
        <li></li>
        <li><i>3</i>訂單確認</li>
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
  name: 'Checkout',
  components: {
    cart,
    foot,
    navbar,
    info,
    loginbox,
  },
  data() {
    return {
      form: {
        message: '',
        user: {},
      },
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
@import '../assets/sass/checkout.scss';
</style>
