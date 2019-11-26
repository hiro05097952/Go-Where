<template>
  <div id="shop">
    <loading :active.sync="isLoading"></loading>
    <info></info>

    <navbar></navbar>

    <sidebar></sidebar>

    <router-view></router-view>

    <foot></foot>

    <transition name="cartFade">
      <cart v-if="cartOpen"></cart>
    </transition>

  </div>
</template>

<script>
import cart from '../components/cart.vue';
import foot from '../components/foot.vue';
import navbar from '../components/navbar.vue';
import sidebar from '../components/sidebar.vue';
import info from '../components/tem_info.vue';

export default {
  name: 'Shop',
  components: {
    cart,
    foot,
    navbar,
    sidebar,
    info,
  },
  data() {
    return {
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    cartOpen() {
      return this.$store.state.cartOpen;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/sass/helpers/_reset.scss';
@import '../assets/sass/helpers/_transition.scss';
@import '../assets/sass/shop.scss';
</style>
