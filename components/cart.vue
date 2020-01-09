<template>
  <div class="cartWrap" @click.stop>
    <i
      class="rwdMenu fas fa-angle-left"
      @click="$store.commit('OPENCART', false);"
      v-if="$route.path !== '/checkout'"
    />
    <h2>CART</h2>
    <ul>
      <li v-for="(item, key) in cart.carts" :key="key">
        <img :src="item.product.imageUrl[0]" alt="">
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
        <i class="far fa-trash-alt" @click="removeCartItem(item.id)" />
      </li>
    </ul>
    <div class="buysomething" v-if="user.emailVerified && cart.carts.length === 0">
      <h4>哇！ 購物車目前沒有商品。</h4>
      <button
        class="btn"
        @click.prevent="$router.push('/shop/all');
                        $store.commit('OPENCART', false)"
      >
        逛逛去
      </button>
    </div>

    <div class="buysomething" v-if="!user.emailVerified">
      <h4>登入會員來繼續購物。</h4>
      <button class="btn" @click.prevent="$store.commit('OPENLOGINBOX', true)">
        註冊 / 登入
      </button>
    </div>

    <h3 :class="{'delete' : cart.final_total !== cart.total}">
      總計 $ {{ cart.total | currency }} 元
    </h3>
    <h4
      v-if="cart.final_total !== cart.total"
      class="text-right text-success"
    >
      折扣價 $ {{ cart.final_total | currency }} 元
    </h4>
    <div class="couponWrap" v-if="user.emailVerified && cart.carts.length !== 0">
      <input type="text" class="form-control" v-model="coupon.code">
      <button class="btn btn-outline-info" @click.prevent="useCoupon">
        套用優惠碼
      </button>
      <button
        class="btn btn-outline-info"
        @click.prevent="goCheckout"
      >
        {{ $route.path === '/checkout' ? '下一步' : '結帳去' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupon: {
        code: '',
      },
    };
  },
  created() {
    if (this.user.emailVerified) {
      this.$store.dispatch('getCart');
    }
  },
  methods: {
    removeCartItem(id) {
      const api = `/api/cart/${id}`;
      this.$nuxt.$loading.start();

      this.$axios.delete(api).then(() => {
        this.$nuxt.$loading.finish();
        this.$store.dispatch('getCart');
      });
    },
    useCoupon() {
      const vm = this;
      const api = '/api/coupon';
      this.$nuxt.$loading.start();

      this.$axios.post(api, {
        code: this.coupon.code,
      }).then((response) => {
        vm.coupon.code = '';
        vm.$nuxt.$loading.finish();

        if (response.data.success) {
          this.$store.dispatch('getCart');
        }
        vm.$swal.fire({
          title: response.data.message,
          icon: response.data.success ? 'success' : 'error',
        });
      });
    },
    goCheckout() {
      if (this.$store.state.cart.carts.length === 0) {
        return;
      }
      if (this.$route.path === '/checkout') {
        this.$router.push('/checkout/form');
        return;
      }
      this.$store.commit('OPENCART', !this.$store.state.cartOpen);
      this.$router.push('/checkout');
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    user() {
      return this.$store.state.user;
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
@import '@/assets/sass/cart.scss';
</style>
