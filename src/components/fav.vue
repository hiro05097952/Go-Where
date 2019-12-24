<template>
  <div class="cartWrap" @click.stop>
    <i class="rwdMenu" @click="$store.commit('OPENCART', false);"
    v-if="$route.name !== 'ItemInfo'">&#60;&#60;</i>
    <h2>Cart<i class="fas fa-cart-plus"></i></h2>
    <ul v-if="cart.carts">
      <li v-for="(item, key) in cart.carts" :key="key">
        <img :src="item.product.imageUrl" alt="">
        <div>
          <h3>{{ item.product.title }}</h3>
          <p>X {{ item.qty }} {{ item.product.unit || '個' }}</p>
        </div>
        <span v-if="!item.coupon">
          {{ item.total | currency }}
        </span>
        <span v-else :class="{'text-success' : item.coupon}">
          {{ item.final_total | currency }}
        </span>
        <i class="far fa-trash-alt" @click="removeCartItem(item.id)"></i>
      </li>
    </ul>
    <div class="buysomething" v-if="cart.carts">
      <h4>哇！ 購物車目前沒有商品。</h4>
      <button class="btn" @click.prevent="$router.push('/shop/all');
      $store.commit('OPENCART', false)">逛逛去</button>
    </div>
    <h3 :class="{'delete' : cart.final_total !== cart.total}">
      總計 $ {{ cart.total | currency }} 元
    </h3>
    <h4 v-if="cart.final_total !== cart.total"
      class="text-right text-success">
      折扣價 $ {{ cart.final_total | currency }} 元
    </h4>
    <div class="couponWrap">
      <input type="text" class="form-control" v-model="coupon.code">
      <button class="btn btn-outline-info" @click.prevent="useCoupon">套用優惠碼</button>
      <button class="btn btn-outline-info"
        @click.prevent="goCheckout">
        {{ $route.path === '/checkout/cart' ? '下一步' : '結帳去' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fav',
  data() {
    return {
      coupon: {
        code: '',
      },
    };
  },
  created() {
    this.$store.dispatch('getCart');
  },
  methods: {
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api
    /cart/${id}`;
      this.$store.commit('LOADINGCHANGE', true);

      this.axios.delete(api).then(() => {
        this.$store.commit('LOADINGCHANGE', false);
        this.$store.dispatch('getCart');
      });
    },
    useCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/coupon`;
      this.$store.commit('LOADINGCHANGE', true);

      this.axios.post(api, { data: { code: this.coupon.code } }).then((response) => {
        vm.coupon.code = '';
        vm.$store.commit('LOADINGCHANGE', false);

        if (response.data.success) {
          this.$store.dispatch('getCart');
        } else {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
        }
      });
    },
    goCheckout() {
      if (this.$store.state.cart.carts) {
        return;
      }
      if (this.$route.path === '/checkout/cart') {
        this.$router.push('/checkout/formData');
        return;
      }
      this.$store.commit('OPENCART', !this.$store.state.cartOpen);
      this.$router.push('/checkout/cart');
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  filters: {
    currency(num) {
      if (num === undefined) { return ''; }
      const parts = String(num).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
  },
};
</script>

<style lang="scss">
@import '../assets/sass/cart.scss';
</style>
