<template>
  <div class="content">
    <h2 class="path">/
      <router-link to="/shop/all"> Product</router-link>
       <span> / {{ $route.params.shop_id }}</span>
    </h2>
    <ul class="product">
      <li v-for="(item, key) in products" :key="key"
      @click="$router.push(`/shop/iteminfo/${item.id}`)">
        <div>
          <img :src="item.imageUrl">
          <img :src="item.description" v-if="item.description" class="hoverImg">

          <div class="mask">
            <i class="fas fa-plus" @click.stop="addtoCart(item.id)"></i>
            <i class="fas fa-heart" @click.stop="removeFav(item.id)"
            v-if="likes.includes(item.id)"></i>
            <i class="far fa-heart" @click.stop="addtoFav(item.id)" v-else></i>
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
  name: 'item',
  data() {
    return {
    };
  },
  created() {
    this.$store.dispatch('getProducts', { pageNum: 1, isAdmin: false, item: 'product' });
    if (this.user.emailVerified !== undefined) {
      this.$store.dispatch('getLikes');
    }
  },
  methods: {
    addtoCart(id, qty = 1) {
      if (this.user.emailVerified === undefined) {
        // 跳出登入視窗
        this.$store.commit('OPENLOGINBOX', true);
      }
      if (!this.user.emailVerified) {
        this.$store.dispatch('updateMessage', {
          message: '請先驗證信箱',
          status: 'error',
        });
        return;
      }
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
    addtoFav(id) {
      this.$store.commit('LOADINGCHANGE', true);
      const api = `${process.env.VUE_APP_APIURL}/api/like`;
      this.axios.post(api, { product_id: id }).then((response) => {
        console.log(response.data);
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
    products() {
      const id = this.$route.params.shop_id;
      let newArr = [...this.$store.state.products];

      if (id.indexOf('vintage') !== -1) {
        newArr = newArr.filter(item => item.category.indexOf('vintage') !== -1);
        if (id === 'vintage_all') {
          return newArr;
        } if (id === 'vintage_top') {
          return newArr.filter(item => item.category.indexOf('top') !== -1);
        } if (id === 'vintage_pants') {
          return newArr.filter(item => item.category.indexOf('pants') !== -1);
        } if (id === 'vintage_dress') {
          return newArr.filter(item => item.category.indexOf('dress') !== -1);
        } if (id === 'vintage_coat') {
          return newArr.filter(item => item.category.indexOf('coat') !== -1);
        } if (id === 'vintage_shoes') {
          return newArr.filter(item => item.category.indexOf('shoes') !== -1);
        }
        return false;
      } if (id.indexOf('select') !== -1) {
        newArr = newArr.filter(item => item.category.indexOf('brand') !== -1);
        if (id === 'select_all') {
          return newArr;
        } if (id === 'select_converse') {
          return newArr.filter(item => item.category.indexOf('converse') !== -1);
        } if (id === 'select_martens') {
          return newArr.filter(item => item.category.toLowerCase().indexOf('martens') !== -1);
        } if (id === 'select_keen') {
          return newArr.filter(item => item.category.indexOf('keen') !== -1);
        } if (id === 'select_carhartt') {
          return newArr.filter(item => item.category.indexOf('carhartt') !== -1);
        } if (id === 'select_thenorthface') {
          return newArr.filter(item => item.category.toLowerCase().indexOf('north') !== -1);
        } if (id === 'select_vans') {
          return newArr.filter(item => item.category.indexOf('vans') !== -1);
        }
        return false;
      } if (id.indexOf('accessories') !== -1) {
        newArr = newArr.filter(item => item.category.indexOf('accessories') !== -1);
        if (id === 'accessories_all') {
          return newArr;
        } if (id === 'accessories_bag') {
          return newArr.filter(item => item.category.indexOf('bag') !== -1);
        } if (id === 'accessories_hairpin') {
          return newArr.filter(item => item.category.indexOf('hairpin') !== -1);
        } if (id === 'accessories_earpin') {
          return newArr.filter(item => item.category.indexOf('earpin') !== -1);
        } if (id === 'accessories_socks') {
          return newArr.filter(item => item.category.indexOf('socks') !== -1);
        }
        return false;
      } if (id.indexOf('sale') !== -1) {
        return newArr.filter(item => item.category.indexOf('sale') === 0);
      }
      return newArr;
    },
    user() {
      return this.$store.state.user;
    },
    likes() {
      const newArr = [];
      this.$store.state.likes.forEach((item) => {
        newArr.push(item.id);
      });
      return newArr;
    },
  },
};
</script>

<style lang="scss">
// @import '../assets/sass/foot.scss';
</style>
