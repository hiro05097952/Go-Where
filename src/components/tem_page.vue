<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled' : !page.has_pre}"
      @click="changePage(page.current_page - 1)">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="(item, key) in page.total_pages" :key="key"
      :class="{'active' : page.current_page === item}">
        <a class="page-link" href="#" @click.prevent="changePage(item)">{{ item }}</a>
      </li>
      <li class="page-item" :class="{'disabled' : !page.has_next}"
      @click="changePage(page.current_page + 1)">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'tem_pagenation',
  methods: {
    changePage(pageNum) {
      if (pageNum < 1 || pageNum > this.page.total_pages) { return; }

      if (this.$route.name === 'Products') {
        this.$store.dispatch('getProducts', { pageNum, isAdmin: true, item: 'product' });
      } else if (this.$route.name === 'Customer_orders') {
        this.$store.dispatch('getProducts', { pageNum, isAdmin: false, item: 'product' });
      } else if (this.$route.name === 'Coupon') {
        this.$store.dispatch('getProducts', { pageNum, isAdmin: true, item: 'coupon' });
      } else if (this.$route.name === 'OrderList') {
        this.$store.dispatch('getProducts', { pageNum, isAdmin: true, item: 'orderlist' });
      }
    },
  },
  computed: {
    page() {
      return this.$store.state.pagination;
    },
  },
};
</script>
