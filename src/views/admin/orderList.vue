<template>
  <div class="orderlist">
    <loading :active.sync="isLoading"></loading>

    <table class="table mt-4">
      <thead>
        <th width="200">購買時間</th>
        <th>Email</th>
        <th width="250" class="text-left">購買款項</th>
        <th width="150" class="pl-4 text-right">應付金額</th>
        <th width="180" class="text-center">已付款</th>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orderlist" :key="key" v-show="item.user">
          <td>{{ item.create_time | getTime }}</td>
          <td v-if="item.user">{{ item.user.email }}</td>
          <td class="text-left">
            <div v-for="(product, key) in item.products" :key="key">
              <span style="margin: 0; width: 130px;" class="d-inline-block">
                {{ product.title }}
              </span>
              <span class="text-right">
                {{ product.qty || 0 }} {{ product.unit || '個'}}
              </span>
            </div>
          </td>
          <td class="text-right">
            {{ item.total | currency }}
          </td>
          <td class="text-center font-weight-bold"
          :class="{'text-success' : item.is_paid,
          'text-danger' : !item.is_paid}">
            {{ item.is_paid ? '已付款' : '尚未付款' }}
          </td>
        </tr>
      </tbody>
    </table>
    <page></page>
  </div>
</template>

<script>
import page from '../../components/tem_page.vue';

export default {
  name: 'Admin_orderlist',
  data() {
    return {
    };
  },
  components: {
    page,
  },
  created() {
    this.$store.dispatch('getProducts', { pageNum: 1, isAdmin: true, item: 'orderlist' });
  },
  computed: {
    orderlist() {
      return this.$store.state.products;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  filters: {
    getTime(value) {
      const dt = new Date(value);
      return `${dt.getFullYear()} / ${dt.getMonth() + 1} / ${dt.getDate()}`;
    },
    currency(num) {
      if (num === undefined) { return ''; }
      const parts = String(num).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `$${parts.join('.')}`;
    },
  },
};
</script>
