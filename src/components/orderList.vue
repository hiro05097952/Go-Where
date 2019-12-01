<template>
  <div id="orderList">
    <!-- <ul class="title">
      <li>商品</li>
      <li>下單時間</li>
      <li>總計</li>
    </ul> -->
    <ul class="listWrap" v-for="(item, key) in orders" :key="key">
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
      <li>
        <h3>下單時間：{{ item.create_time | timeConvertor }}</h3>
        <p>總計： ${{ item.total }}</p>
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
