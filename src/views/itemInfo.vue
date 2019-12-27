<template>
  <div id="itemInfo">
    <div class="content">
      <h2 class="path">/
        <router-link to="/shop/all"> Product</router-link> /
        <a href="#" @click.prevent="$router.push(`/shop/${$store.state.fromPage}`)">
         {{ $store.state.fromPage }}
        </a>
      </h2>
      <div class="imageWrap">
        <img :src="product.imageUrl">
        <img :src="product.description" v-if="product.description" class="hoverImg">
      </div>

      <ul class="itemInfo">
        <li><h2>{{ product.title }}</h2></li>
        <li><h4>{{ product.content || '-' }}</h4></li>
        <li class="origin">NT$ {{ product.origin_price }}</li>
        <li class="final">NT$ {{ product.price }}</li>
        <li>
          <div class="form-control" @click.stop>
            <button class="btn less" @click="qtyChange(-1)">
              <i class="fas fa-minus"></i>
            </button>
            <input type="number" v-model="buyQty" max="10" min="1">
            <button class="btn plus" @click="qtyChange(1)">
              <i class="fas fa-plus"></i>
            </button>
            <button class="btn btn-outline-info commit"
            @click="addtoCart(product.id, buyQty)">加入購物車</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemInfo',
  data() {
    return {
      buyQty: 1,
    };
  },
  created() {
    this.$store.dispatch('getOnePro', this.$route.params.pro_id);
  },
  methods: {
    addtoCart(id, qty = 1) {
      if (!this.user.uid) {
        // 需改成跳出登入視窗
        this.$store.dispatch('updateMessage', {
          message: '請登入會員',
          status: 'error',
        });
        return;
      }
      const api = `${process.env.VUE_APP_APIURL}/api/cart`;
      const config = {
        uid: this.user.uid,
        product_id: id,
        qty,
      };
      this.$store.commit('LOADINGCHANGE', true);

      this.axios.post(api, config).then(() => {
        this.$store.commit('LOADINGCHANGE', false);
        this.$store.dispatch('getCart');
      });
    },
    qtyChange(value) {
      if (value === 1 && this.buyQty >= 10) {
        this.buyQty = 10;
        return;
      }
      if (value === -1 && this.buyQty <= 1) {
        this.buyQty = 1;
        return;
      }
      this.buyQty += value;
    },
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/sass/itemInfo.scss';
</style>
