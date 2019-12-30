<template>
  <div id="sidebarWrap" :class="{ 'rwdOpen' : rwdOpen }">
    <i class="rwdMenu" @click="rwdOpen = !rwdOpen">MENU</i>
    <div class="sidebarSelf">
      <h2>Category</h2>
      <ul class="itemNav">
        <li><router-link to="/shop/all">ALL</router-link></li>
        <li>
          <a href="#" @click.prevent.self="$router.push('/shop/vintage_all')">VINTAGE
            <i class="fas fa-sort-down" @click="openSideMenu('vintage')"></i>
          </a>
          <transition name="sideFade">
            <ul v-if="vintageOpen">
              <li><router-link to="/shop/vintage_top">上衣</router-link></li>
              <li><router-link to="/shop/vintage_coat">外套</router-link></li>
              <li><router-link to="/shop/vintage_shoes">鞋子</router-link></li>
              <li><router-link to="/shop/vintage_pants">褲子</router-link></li>
              <li><router-link to="/shop/vintage_dress">洋裝</router-link></li>
            </ul>
          </transition>
        </li>
        <li>
          <a href="#" @click.prevent.self="$router.push('/shop/select_all')">
            SELECT
            <i class="fas fa-sort-down" @click="openSideMenu('select')"></i>
          </a>
          <transition name="sideFade">
            <ul v-if="selectOpen">
              <li><router-link to="/shop/select_converse">Coverse</router-link></li>
              <li><router-link to="/shop/select_keen">Keen</router-link></li>
              <li><router-link to="/shop/select_vans">Vans</router-link></li>
              <li><router-link to="/shop/select_martens">Dr.Martens</router-link></li>
              <li><router-link to="/shop/select_carhartt">Carhartt</router-link></li>
              <li><router-link to="/shop/select_thenorthface">The North Face</router-link></li>
            </ul>
          </transition>
        </li>
        <li>
          <a href="#" @click.prevent.self="$router.push('/shop/accessories_all')">ACCESSORIES
            <i class="fas fa-sort-down" @click="openSideMenu('accessories')"></i>
          </a>
          <transition name="sideFade">
            <ul v-if="accessoriesOpen">
              <li><router-link to="/shop/accessories_hairpin">髮夾</router-link></li>
              <li><router-link to="/shop/accessories_earpin">耳環</router-link></li>
              <li><router-link to="/shop/accessories_socks">襪子</router-link></li>
              <li><router-link to="/shop/accessories_bag">背包</router-link></li>
            </ul>
          </transition>
        </li>
        <li><router-link to="/shop/sale">SALE</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      vintageOpen: false,
      selectOpen: false,
      accessoriesOpen: false,
      rwdOpen: false,
    };
  },
  methods: {
    openSideMenu(name) {
      this[`${name}Open`] = !this[`${name}Open`];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/sidebar.scss';
</style>
