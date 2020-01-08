<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{'disabled' : !page.has_pre}"
        @click="changePage(page.current_page - 1)"
      >
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(item, key) in page.total_pages"
        :key="key"
        :class="{'active' : item == page.current_page}"
      >
        <a class="page-link" href="#" @click.prevent="changePage(item, $route.name)">{{ item }}</a>
      </li>
      <li
        class="page-item"
        :class="{'disabled' : !page.has_next}"
        @click="changePage(page.current_page + 1, $route.name)"
      >
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    changePage(pageNum, name) {
      if (pageNum < 1 || pageNum > this.page.total_pages) { return; }
      const itemName = name.split('-')[1];
      this.$store.dispatch('getItems', { pageNum, isAdmin: true, item: itemName });
    },
  },
  computed: {
    page() {
      return this.$store.state.pagination;
    },
  },
};
</script>
