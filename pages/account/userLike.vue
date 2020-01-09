<template>
  <div id="userLike">
    <ul class="likeWrap" v-if="likes.length !== 0">
      <li
        v-for="(item, key) in likes"
        :key="key"
        @click="$router.push(`/shop/iteminfo/${item.id}`)"
      >
        <div>
          <img :src="item.imageUrl[0]">
          <img :src="item.imageUrl[1]" v-if="item.imageUrl[1]" class="hoverImg">

          <div class="mask">
            <i class="fas fa-plus" @click.stop="addtoCart(item.id)" />
            <i class="fas fa-heart" @click.stop="removeFav(item.id)" />
          </div>
        </div>
        <h3>{{ item.title }}</h3>
        <p>NT$ {{ item.price || 0 }}</p>
      </li>
    </ul>
    <h3 class="noLike" v-else>
      目前還未追蹤商品哦！
    </h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  async fetch({ store }) {
    await store.dispatch('getLikes');
  },
  methods: {
    addtoCart(id, qty = 1) {
      const api = '/api/cart';
      const config = {
        product_id: id,
        qty,
      };
      this.$nuxt.$loading.start();

      this.$axios.post(api, config).then(() => {
        this.$nuxt.$loading.finish();
        this.$store.dispatch('getCart');
      });
    },
    removeFav(id) {
      this.$nuxt.$loading.start();
      const api = `/api/like/${id}`;
      this.$axios.delete(api).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          this.$swal.fire({
            title: response.data.message,
            icon: 'success',
          });
          this.$store.dispatch('getLikes');
        }
        this.$nuxt.$loading.finish();
      });
    },
  },
  computed: {
    storeUser() {
      return this.$store.state.user;
    },
    likes() {
      return this.$store.state.likes;
    },
  },
};
</script>

<style lang="scss">
</style>
