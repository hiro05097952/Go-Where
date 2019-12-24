<template>
  <div id="app" @click="checkCart">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    };
  },
  methods: {
    checkCart() {
      if (this.$store.state.cartOpen) {
        this.$store.commit('OPENCART', false);
      }
    },
  },
};
</script>

<style lang="scss">
@import './assets/sass/tem_all.scss';
</style>
