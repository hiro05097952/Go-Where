<template>
  <div id="sidebarWrap" :class="{ 'rwdOpen' : rwdOpen }">
    <i class="rwdMenu" @click="rwdOpen = !rwdOpen">MENU</i>
    <div class="sidebarSelf">
      <h2>Category</h2>
      <ul class="itemNav">
        <li>
          <nuxt-link to="/shop/all">
            ALL
          </nuxt-link>
        </li>
        <li>
          <a href="#" @click.prevent.self="$router.push('/shop/vintage_all')">VINTAGE
            <i class="fas fa-sort-down" @click="openSideMenu('vintage')" />
          </a>
          <transition name="sideFade">
            <ul v-if="vintageOpen">
              <li>
                <nuxt-link to="/shop/vintage_top">
                  上衣
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/vintage_coat">
                  外套
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/vintage_shoes">
                  鞋子
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/vintage_pants">
                  褲子
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/vintage_dress">
                  洋裝
                </nuxt-link>
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <a href="#" @click.prevent.self="$router.push('/shop/select_all')">
            SELECT
            <i class="fas fa-sort-down" @click="openSideMenu('select')" />
          </a>
          <transition name="sideFade">
            <ul v-if="selectOpen">
              <li>
                <nuxt-link to="/shop/select_converse">
                  Coverse
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/select_keen">
                  Keen
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/select_vans">
                  Vans
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/select_martens">
                  Dr.Martens
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/select_carhartt">
                  Carhartt
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/select_thenorthface">
                  The North Face
                </nuxt-link>
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <a href="#" @click.prevent.self="$router.push('/shop/accessories_all')">ACCESSORIES
            <i class="fas fa-sort-down" @click="openSideMenu('accessories')" />
          </a>
          <transition name="sideFade">
            <ul v-if="accessoriesOpen">
              <li>
                <nuxt-link to="/shop/accessories_hairpin">
                  髮夾
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/accessories_earpin">
                  耳環
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/accessories_socks">
                  襪子
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/shop/accessories_bag">
                  背包
                </nuxt-link>
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <nuxt-link to="/shop/sale">
            SALE
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
