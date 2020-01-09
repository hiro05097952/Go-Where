<template>
  <div class="dashboard">
    <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow fixed-top">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar pt-5">
          <div class="sidebar-sticky">
            <h6
              class="sidebar-heading d-flex
              justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
            >
              <span>管理員</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle" />
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <nuxt-link
                  to="/admin/products"
                  class="nav-link text-monospace ml-4 position-relative"
                >
                  <i
                    class="fas fa-box-open position-absolute"
                    style="top: 11px; left: -6px;"
                  />
                  產品列表
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  to="/admin/orders"
                  class="nav-link text-monospace ml-4 position-relative"
                >
                  <i
                    class="fas fa-clipboard-list position-absolute"
                    style="top: 11px; left: -3px;"
                  />
                  訂單列表
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  to="/admin/coupons"
                  class="nav-link text-monospace ml-4 position-relative"
                >
                  <i
                    class="fas fa-percent position-absolute"
                    style="top: 11px; left: -3px;"
                  />
                  優惠卷
                </nuxt-link>
              </li>
            </ul>

            <h6
              class="sidebar-heading d-flex
              justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
            >
              <span>模擬功能</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle" />
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <nuxt-link
                  to="/admin/ordertest"
                  class="nav-link text-monospace ml-4 position-relative"
                >
                  <i
                    class="fas fa-chalkboard-teacher position-absolute"
                    style="top: 11px; left: -5px;"
                  />
                  模擬訂單
                </nuxt-link>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
          <nuxt />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';

const auth = firebase.auth();

export default {
  data() {
    return {
    };
  },
  methods: {
    signout() {
      this.$nuxt.$loading.start();
      auth.signOut().then(() => {
        this.$axios.post('/api/logout').then(() => {
          this.$store.commit('UPDATEUSER', {});
          this.$store.commit('UPDATECART', {
            carts: [],
          });
          this.$store.commit('UPDATELIKES', []);
          setTimeout(() => {
            this.$nuxt.$loading.finish();
          }, 1000);
          if (this.$route.path.includes('account') || this.$route.path.includes('admin')
          || this.$route.path.includes('checkout')) {
            this.$router.replace('/');
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.sidebar{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
