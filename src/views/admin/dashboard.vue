<template>
  <div class="dashboard">
    <navbar></navbar>
    <info></info>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '../../components/tem_navbar.vue';
import sidebar from '../../components/tem_sidebar.vue';
import info from '../../components/tem_info.vue';

// @ is an alias to /src
export default {
  name: 'Admin_dashboard',
  components: {
    navbar,
    sidebar,
    info,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss">
</style>
