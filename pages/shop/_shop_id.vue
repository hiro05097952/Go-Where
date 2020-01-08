<template>
  <div class="content">
    <h2 class="path">
      /
      <router-link to="/shop/all">
        Product
      </router-link>
      <span> / {{ $route.params.shop_id }}</span>
    </h2>
    <ul class="product">
      <li
        v-for="(item, key) in products"
        :key="key"
        @click="$router.push(`/shop/iteminfo/${item.id}`)"
      >
        <div>
          <img :src="item.imageUrl[0]">
          <img :src="item.imageUrl[1]" v-if="item.imageUrl[1]" class="hoverImg">

          <div class="mask">
            <i class="fas fa-plus" @click.stop="addtoCart(item.id)" />
            <i
              class="fas fa-heart"
              @click.stop="removeFav(item.id)"
              v-if="likes.includes(item.id)"
            />
            <i class="far fa-heart" @click.stop="addtoFav(item.id)" v-else />
          </div>
        </div>
        <h3>{{ item.title }}</h3>
        <p>NT$ {{ item.price || 0 }}</p>
      </li>
    </ul>
    <h3 class="noProducts" v-if="products.length === 0">
      抱歉，這個商品類別沒有相關商品
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
    await store.dispatch('getItems', { pageNum: 1, isAdmin: false, item: 'products' });
    if (store.state.user.emailVerified) {
      await store.dispatch('getLikes');
    }
  },
  methods: {
    addtoCart(id, qty = 1) {
      const api = '/api/cart';
      const config = {
        product_id: id,
        qty,
      };
      this.$store.commit('LOADINGCHANGE', true);

      this.$axios.post(api, config).then((response) => {
        this.$store.commit('LOADINGCHANGE', false);
        this.$store.dispatch('getCart');
        this.$swal.fire({
          title: response.data.message,
          icon: response.data.success ? 'success' : 'error',
        });
        if (!response.data.success) {
          this.$store.commit('OPENLOGINBOX', true);
        }
      });
    },
    addtoFav(id) {
      this.$store.commit('LOADINGCHANGE', true);
      const api = '/api/like';
      this.$axios.post(api, { product_id: id }).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          this.$store.dispatch('getLikes');
        }
        this.$swal.fire({
          title: response.data.message,
          icon: response.data.success ? 'success' : 'error',
        });
        this.$store.commit('LOADINGCHANGE', false);
      });
    },
    removeFav(id) {
      this.$store.commit('LOADINGCHANGE', true);
      const api = `/api/like/${id}`;
      this.$axios.delete(api).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          this.$store.dispatch('getLikes');
        }
        this.$swal.fire({
          title: response.data.message,
          icon: response.data.success ? 'success' : 'error',
        });
        this.$store.commit('LOADINGCHANGE', false);
      });
    },
  },
  computed: {
    products() {
      const id = this.$route.params.shop_id;
      let newArr = [...this.$store.state.items];

      if (id.includes('vintage')) {
        newArr = newArr.filter((item) => item.category.includes('vintage'));
        if (id === 'vintage_all') {
          return newArr;
        } if (id === 'vintage_top') {
          return newArr.filter((item) => item.category.includes('top'));
        } if (id === 'vintage_pants') {
          return newArr.filter((item) => item.category.includes('pants'));
        } if (id === 'vintage_dress') {
          return newArr.filter((item) => item.category.includes('dress'));
        } if (id === 'vintage_coat') {
          return newArr.filter((item) => item.category.includes('coat'));
        } if (id === 'vintage_shoes') {
          return newArr.filter((item) => item.category.includes('shoes'));
        }
        return false;
      } if (id.includes('select')) {
        newArr = newArr.filter((item) => item.category.includes('brand'));
        if (id === 'select_all') {
          return newArr;
        } if (id === 'select_converse') {
          return newArr.filter((item) => item.category.includes('converse'));
        } if (id === 'select_martens') {
          return newArr.filter((item) => item.category.toLowerCase().includes('martens'));
        } if (id === 'select_keen') {
          return newArr.filter((item) => item.category.includes('keen'));
        } if (id === 'select_carhartt') {
          return newArr.filter((item) => item.category.includes('carhartt'));
        } if (id === 'select_thenorthface') {
          return newArr.filter((item) => item.category.toLowerCase().includes('north'));
        } if (id === 'select_vans') {
          return newArr.filter((item) => item.category.includes('vans'));
        }
        return false;
      } if (id.includes('accessories')) {
        newArr = newArr.filter((item) => item.category.includes('accessories'));
        if (id === 'accessories_all') {
          return newArr;
        } if (id === 'accessories_bag') {
          return newArr.filter((item) => item.category.includes('bag'));
        } if (id === 'accessories_hairpin') {
          return newArr.filter((item) => item.category.includes('hairpin'));
        } if (id === 'accessories_earpin') {
          return newArr.filter((item) => item.category.includes('earpin'));
        } if (id === 'accessories_socks') {
          return newArr.filter((item) => item.category.includes('socks'));
        }
        return false;
      } if (id.includes('sale')) {
        return newArr.filter((item) => item.category.indexOf('sale') === 0);
      }
      return newArr;
    },
    likes() {
      return this.$store.state.likes.map((item) => item.id);
    },
  },
};
</script>

<style lang="scss">
</style>
