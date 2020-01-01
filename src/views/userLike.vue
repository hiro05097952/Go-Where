<template>
  <div id="userLike">
    <ul class="likeWrap" v-if="likes.length !== 0">
      <li v-for="(item, key) in likes" :key="key"
      @click="$router.push(`/shop/iteminfo/${item.id}`)">
        <div>
          <img :src="item.imageUrl[0]">
          <img :src="item.imageUrl[1]" v-if="item.imageUrl[1]" class="hoverImg">

          <div class="mask">
            <i class="fas fa-plus" @click.stop="addtoCart(item.id)"></i>
            <i class="fas fa-heart" @click.stop="removeFav(item.id)"></i>
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
  name: 'userLike',
  data() {
    return {
    };
  },
  created() {
    this.$store.dispatch('getLikes');
  },
  methods: {
    addtoCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIURL}/api/cart`;
      const config = {
        product_id: id,
        qty,
      };
      this.$store.commit('LOADINGCHANGE', true);

      this.axios.post(api, config).then(() => {
        this.$store.commit('LOADINGCHANGE', false);
        this.$store.dispatch('getCart');
      });
    },
    removeFav(id) {
      this.$store.commit('LOADINGCHANGE', true);
      const api = `${process.env.VUE_APP_APIURL}/api/like/${id}`;
      this.axios.delete(api).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          this.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'success',
          });
          this.$store.dispatch('getLikes');
        }
        this.$store.commit('LOADINGCHANGE', false);
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
