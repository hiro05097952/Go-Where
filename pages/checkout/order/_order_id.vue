<template>
  <div class="my-10 row justify-content-center" id="checkorder">
    <form class="col-md-10">
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">
              {{ item.title }}
            </td>
            <td class="align-middle">
              {{ item.qty }}/{{ item.unit || '個' }}
            </td>
            <td class="align-middle text-right">
              {{ item.price }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">
              總計
            </td>
            <td class="text-right">
              {{ order.total }}
            </td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">
              Email
            </th>
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
          <tr v-if="order.is_paid && ecpay.TradeDate">
            <th>付款時間</th>
            <td>{{ ecpay.TradeDate }}</td>
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
        <button class="btn btn-danger" @click.prevent="toPay">
          確認付款去
        </button>
      </div>
    </form>
    <div class="d-none" ref="ecpay" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        products: {},
        user: {},
      },
      ecpay: {},
    };
  },
  async asyncData({ $axios, route }) {
    const { data: orderInfo } = await $axios.get(`/api/order/${route.params.order_id}`);
    const { data: ecpayData } = orderInfo.order.is_paid ? await $axios.get('/api/ecpay/checkout') : { data: [] };
    return {
      order: orderInfo.order,
      ecpay: ecpayData[ecpayData.length - 1],
    };
  },
  methods: {
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
      this.$nuxt.$loading.start();
      this.$axios.post('/api/ecpay/checkout', {
        orderID: this.order.id,
        config,
      }).then((response) => {
        // console.log('response: ', response.data);
        this.$nuxt.$loading.finish();
        this.$refs.ecpay.innerHTML = response.data;
        document.querySelector('#_form_aiochk').submit();
      });
    },
  },
};
</script>
