<template>
  <div class="my-5 row justify-content-center" id="checkorder">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.unit || '個' }}</td>
            <td class="align-middle text-right">{{ item.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'checkOrder',
  data() {
    return {
      order: {
        products: {},
        user: {},
      },
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_APIURL}/api/order/${this.$route.params.order_id}`;
      this.$store.commit('LOADINGCHANGE', true);
      this.axios.get(api).then((response) => {
        console.log(response.data);
        this.$store.commit('LOADINGCHANGE', false);
        this.order = response.data.order;
      });
    },
    payOrder() {
      // const api = `${process.env.VUE_APP_APIURL}/api/pay/${this.$route.params.order_id}`;

      // this.axios.post(api).then(() => {
      //   this.getOrder();
      // });
    },
  },
};
</script>
