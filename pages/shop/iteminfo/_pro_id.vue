<template>
  <div id="itemInfo">
    <div class="content">
      <h2 class="path">
        /
        <router-link to="/shop/all">
          Product
        </router-link> /
        <a href="#" @click.prevent="$router.push(`/shop/${$store.state.fromPage}`)">
          {{ $store.state.fromPage }}
        </a>
      </h2>
      <div class="imageWrap">
        <img :src="product.imageUrl[0]">
        <img :src="product.imageUrl[1]" v-if="product.imageUrl[1]" class="hoverImg">
      </div>

      <ul class="itemInfo">
        <li><h2>{{ product.title }}</h2></li>
        <li><h4>{{ product.content || '-' }}</h4></li>
        <li class="origin">
          NT$ {{ product.origin_price }}
        </li>
        <li class="final">
          NT$ {{ product.price }}
        </li>
        <li>
          <div class="form-control" @click.stop>
            <div class="btnComponent">
              <button class="btn less" @click="qtyChange(-1)">
                <i class="fas fa-minus" />
              </button>
              <input type="number" v-model="buyQty" max="10" min="1">
              <button class="btn plus" @click="qtyChange(1)">
                <i class="fas fa-plus" />
              </button>
            </div>
            <button
              class="btn btn-outline-info commit"
              @click="addtoCart(product.id, buyQty)"
            >
              加入購物車
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buyQty: 1,
    };
  },
  async fetch({ store, route }) {
    await store.dispatch('getOnePro', route.params.pro_id);
  },
  methods: {
    addtoCart(id, qty = 1) {
      const api = '/api/cart';
      const config = {
        product_id: id,
        qty,
      };
      this.$nuxt.$loading.start();

      this.$axios.post(api, config).then((response) => {
        this.$nuxt.$loading.finish();
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
@import '@/assets/sass/itemInfo.scss';
</style>
