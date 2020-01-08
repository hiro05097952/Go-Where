<template>
  <div class="orderlist">
    <table class="table mt-4">
      <thead>
        <client-only>
          <th width="200">
            購買時間
          </th>
          <th>Email</th>
          <th width="250" class="text-left">
            購買款項
          </th>
          <th width="150" class="pl-4 text-right">
            應付金額
          </th>
          <th width="180" class="text-center">
            已付款
          </th>
        </client-only>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orderlist" :key="key" v-show="item.user">
          <td>{{ item.create_time | getTime }}</td>
          <td v-if="item.user">
            {{ item.user.email }}
          </td>
          <td class="text-left">
            <div v-for="(product, keys) in item.products" :key="keys">
              <span style="margin: 0; width: 130px;" class="d-inline-block">
                {{ product.title }}
              </span>
              <span class="text-right">
                {{ product.qty || 0 }} {{ product.unit || '個' }}
              </span>
            </div>
          </td>
          <td class="text-right">
            {{ item.total | currency }}
          </td>
          <td
            class="text-center font-weight-bold"
            :class="{'text-success' : item.is_paid,
                     'text-danger' : !item.is_paid}"
          >
            {{ item.is_paid ? '已付款' : '尚未付款' }}
          </td>
        </tr>
      </tbody>
    </table>
    <page />
  </div>
</template>

<script>
import page from '~/components/page.vue';

export default {
  data() {
    return {
    };
  },
  layout: 'admin',
  components: {
    page,
  },
  async fetch({ store }) {
    await store.dispatch('getItems', { pageNum: 1, isAdmin: true, item: 'orders' });
  },
  computed: {
    orderlist() {
      return this.$store.state.items;
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
