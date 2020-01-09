<template>
  <div id="account" @click="$store.state.cartOpen ? $store.commit('OPENCART', false) : undefined">
    <loginbox />

    <div class="content">
      <ul class="accountNav">
        <li
          :class="{'active' : $route.path === '/account'}"
          @click="$router.push('/account')"
        >
          會員資料
        </li>
        <li
          :class="{'active' : $route.path === '/account/userlike'}"
          @click="$router.push('/account/userlike')"
        >
          追蹤商品
        </li>
        <li
          :class="{'active' : $route.path === '/account/orderlist'}"
          @click="$router.push('/account/orderlist')"
        >
          訂單查看
        </li>
      </ul>
      <nuxt-child />
    </div>

    <transition name="cartFade">
      <cart v-if="cartOpen" />
    </transition>
  </div>
</template>

<script>
import cart from '~/components/cart.vue';
import loginbox from '~/components/login.vue';

export default {
  components: {
    cart,
    loginbox,
  },
  layout: 'front',
  data() {
    return {
    };
  },
  computed: {
    cartOpen() {
      return this.$store.state.cartOpen;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/sass/helpers/_reset.scss';
@import '@/assets/sass/helpers/_transition.scss';
@import '@/assets/sass/account.scss';
</style>
