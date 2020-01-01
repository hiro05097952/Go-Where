<template>
  <div id="orderList">
    <ul class="listWrap" v-for="(item, key) in orders" :key="key">
      <li class="listHeader">
        <p>訂單編號： {{ item.id }}</p>
        <p :class="{'text-success': item.is_paid}">{{item.is_paid? '已付款' : '未付款'}}</p>
      </li>

      <li v-for="(product, key) in item.products" :key="key">
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
          <h5 v-if="item.is_paid">付款時間：{{ item.ecpay.PaymentDate | timeConvertor }}</h5>
        </div>
        <p>總計： ${{ item.total }}</p>
      </li>

      <li class="btnWrap" v-if="!item.is_paid">
        <button class="btn btn-primary" @click.prevent="removeOrder(item.id)">
          取消訂單
        </button>
        <button class="btn btn-success"
        @click.prevent="$router.push(`/checkout/checkorder/${item.id}`)">
        付款
        </button>
      </li>
    </ul>
    <h2 v-if="orders.length === 0" class="noOrder">尚無訂單資料</h2>
  </div>
</template>

<script>
export default {
  name: 'orderList',
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      this.$store.commit('LOADINGCHANGE', true);
      this.axios.get(`${process.env.VUE_APP_APIURL}/api/orders`).then((response) => {
        // console.log(response.data);
        this.orders = response.data.orders;
        this.$store.commit('LOADINGCHANGE', false);
      });
    },
    removeOrder(id) {
      this.$store.commit('LOADINGCHANGE', true);
      this.axios.delete(`${process.env.VUE_APP_APIURL}/api/order/${id}`).then((response) => {
        // console.log(response.data);
        this.$store.dispatch('updateMessage', {
          status: response.data.success ? 'success' : 'error',
          message: response.data.message,
        });
        this.$store.commit('LOADINGCHANGE', false);
        this.getOrders();
      });
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
