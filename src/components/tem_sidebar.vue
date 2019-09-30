<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">

        <h6 class="sidebar-heading d-flex
        justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/admin/products"
            class="nav-link text-monospace ml-4 position-relative">
              <i class="fas fa-box-open position-absolute"
              style="top: 11px; left: -6px;"></i>
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orderlist"
            class="nav-link text-monospace ml-4 position-relative">
              <i class="fas fa-clipboard-list position-absolute"
              style="top: 11px; left: -3px;"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupon"
            class="nav-link text-monospace ml-4 position-relative">
              <i class="fas fa-percent position-absolute"
              style="top: 11px; left: -3px;"></i>
              優惠卷
            </router-link>
          </li>
        </ul>

        <h6 class="sidebar-heading d-flex
        justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/admin/ordertest"
            class="nav-link text-monospace ml-4 position-relative">
              <i class="fas fa-chalkboard-teacher position-absolute"
              style="top: 11px; left: -5px;"></i>
              模擬訂單
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'tem_sidebar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
