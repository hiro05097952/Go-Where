<template>
  <div class="my-5 row justify-content-center" id="checkorder">
    <form class="col-md-6">
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
        <button class="btn btn-danger" @click.prevent="toPay">確認付款去</button>
      </div>
    </form>
    <div class="d-none" ref="ecpay"></div>
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
      ecpay: {},
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
        // console.log(response.data);
        this.$store.commit('LOADINGCHANGE', false);
        this.order = response.data.order;
        if (this.order.is_paid) {
          this.getClientReturn();
        }
      });
    },
    toPay() {
      const dt = new Date();
      let month = dt.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      let date = dt.getDate();
      date = date < 10 ? `0${date}` : date;
      let hours = dt.getHours();
      hours = hours < 10 ? `0${hours}` : hours;
      let minutes = dt.getMinutes();
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      let seconds = dt.getSeconds();
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      const now = `${dt.getFullYear()}/${month}/${date} ${hours}:${minutes}:${seconds}`;
      let itemNameStr = '';
      this.order.products.forEach((item, index, arr) => {
        if (index === arr.length - 1) {
          itemNameStr += item.title;
          return;
        }
        itemNameStr += `${item.title}#`;
      });

      const config = {
        MerchantTradeDate: now,
        TotalAmount: String(this.order.total), // 轉成字串才收得到
        ItemName: itemNameStr,
        TradeDesc: 'GoWhere',
      };
      this.axios.post(`${process.env.VUE_APP_APIURL}/api/ecpay/checkout`, {
        orderID: this.order.id,
        config,
      }).then((response) => {
        // console.log('response: ', response.data);
        this.$refs.ecpay.innerHTML = response.data;
        document.querySelector('#_form_aiochk').submit();
      });
    },
    getClientReturn() {
      const api = `${process.env.VUE_APP_APIURL}/api/ecpay/client`;
      this.axios.get(api).then((response) => {
        console.log('ecpay: ', response.data);
        this.ecpay = response.data;
      });
    },
  },
};
</script>
