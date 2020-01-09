<template>
  <div id="shop" @click="$store.state.cartOpen ? $store.commit('OPENCART', false) : undefined">
    <loginbox />

    <sidebar />

    <nuxt-child />

    <transition name="cartFade">
      <cart v-if="cartOpen" />
    </transition>
  </div>
</template>

<script>
import cart from '~/components/cart.vue';
import sidebar from '~/components/sidebar.vue';
import loginbox from '~/components/login.vue';

export default {
  layout: 'front',
  components: {
    cart,
    sidebar,
    loginbox,
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
@import '~/assets/sass/helpers/_reset.scss';
@import '~/assets/sass/helpers/_transition.scss';
@import '~/assets/sass/shop.scss';
</style>
