<template>
  <cart />
</template>

<script>
import cart from '~/components/cart.vue';

export default {
  components: {
    cart,
  },
  async fetch({ store }) {
    await store.dispatch('getCart');
  },
};
</script>
