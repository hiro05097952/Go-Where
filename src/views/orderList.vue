<template>
  <div id="orderList">
    <ul class="listWrap" v-for="(item, key) in orders" :key="key">
      <li class="listHeader">
        <p>訂單編號： {{ item.id }}</p>
        <p :class="{'text-success': item.is_paid}">{{item.is_paid? '已付款' : '未付款'}}</p>
      </li>

      <li v-for="(product, key) in item.products" :key="key">
        <img :src="product.imageUrl" alt="">
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
        <button class="btn btn-primary">取消訂單</button>
        <button class="btn btn-success">付款</button>
      </li>
    </ul>
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
    this.axios.get(`${process.env.VUE_APP_APIURL}/api/orders`).then((response) => {
      console.log(response.data);
      this.orders = response.data.orders;
    });
  },
  methods: {
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
