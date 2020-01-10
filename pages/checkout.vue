<template>
  <div id="checkout">
    <loginbox />
    <div class="content">
      <ul class="stepWrap">
        <li><i class="active">1</i>購物車</li>
        <li />
        <li><i class="active">2</i>填寫資料</li>
        <li />
        <li><i>3</i>訂單確認</li>
      </ul>

      <nuxt-child />
    </div>
  </div>
</template>

<script>
import loginbox from '~/components/login.vue';

export default {
  head() {
    return {
      title: 'Go Where | Checkout',
    };
  },
  layout: 'front',
  components: {
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
  },
};
</script>

<style lang="scss">
@import '@/assets/sass/helpers/_reset.scss';
@import '@/assets/sass/helpers/_transition.scss';
@import '@/assets/sass/checkout.scss';
</style>
