<template>
  <div id="about" @click="$store.state.cartOpen ? $store.commit('OPENCART', false) : undefined">
    <loginbox />

    <div class="content">
      <ul>
        <li>
          <img src="https://images.unsplash.com/photo-1469692422776-14abcfa4b525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="">
          <p>
            2018年開始，從Instagram出發，主要批購日系穿搭中常出現的鞋款，也時常會分享一些穿搭技巧。<br><br>
            近期也開始著手古著，希望大家都可以在店鋪探索，並找尋專屬於自己的穿搭！
          </p>
        </li>
        <li>
          <p>日系穿搭中較為特別的是，大家鞋子多為素面，可以選擇和衣服褲子相似的配色，但有時候來點衝突，反而能成為一身的亮點</p>
          <img src="https://cdn.wimg.jp/coordinate/digjjp/20190905112302882/20190905112302882_1000.jpg" alt="">
        </li>
      </ul>
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
  created() {
    this.$store.dispatch('getCart');
  },
  methods: {
  },
  computed: {
    cartOpen() {
      return this.$store.state.cartOpen;
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/sass/about.scss';
</style>
