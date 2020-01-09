<template>
  <div id="orderList">
    <ul class="listWrap" v-for="(item, key) in orders" :key="key">
      <li class="listHeader">
        <p>訂單編號： {{ item.id }}</p>
        <p :class="{'text-success': item.is_paid}">
          {{ item.is_paid? '已付款' : '未付款' }}
        </p>
      </li>

      <li v-for="(product, keys) in item.products" :key="keys">
        <img :src="product.imageUrl[0]" alt="">
        <ul class="productWrap">
          <li>{{ product.title }}</li>
          <li>
            <h4>${{ product.price }}</h4>
            <p>x{{ product.qty }}</p>
          </li>
        </ul>
      </li>

      <li class="priceWrap">
        <div>
          <h5>下單時間：{{ item.create_time | timeConvertor }}</h5>
          <h5 v-if="item.is_paid">
            付款時間：{{ item.ecpay.PaymentDate | timeConvertor }}
          </h5>
        </div>
        <p>總計： ${{ item.total }}</p>
      </li>

      <li class="btnWrap" v-if="!item.is_paid">
        <button class="btn btn-primary" @click.prevent="removeOrder(item.id)">
          取消訂單
        </button>
        <button
          class="btn btn-success"
          @click.prevent="$router.push(`/checkout/order/${item.id}`)"
        >
          付款
        </button>
      </li>
    </ul>
    <h2 v-if="orders.length === 0" class="noOrder">
      尚無訂單資料
    </h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    };
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/orders');
    return {
      orders: data.orders,
    };
  },
  methods: {
    getOrders() {
      this.$nuxt.$loading.start();
      this.$axios.get('/api/orders').then((response) => {
        // console.log(response.data);
        this.orders = response.data.orders;
        this.$nuxt.$loading.finish();
      });
    },
    async removeOrder(id) {
      const { value } = await this.$swal.fire({
        title: 'Waring',
        text: '確定刪除訂單？',
        icon: 'warning',
        toast: false,
        position: 'center',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '刪除',
        cancelButtonText: '取消',
        timer: undefined,
      });
      if (value) {
        const { data } = await this.$axios.delete(`/api/order/${id}`);
        this.$swal.fire({
          icon: data.success ? 'success' : 'error',
          title: data.message,
        });
        this.getOrders();
      }
    },
  },
  computed: {
    storeUser() {
      return this.$store.state.user;
    },
  },
  filters: {
    timeConvertor(value) {
      const dt = new Date(value);
      return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    },
  },
};
</script>

<style lang="scss">
</style>
