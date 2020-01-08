<template>
  <div id="index">
    <!-- <loading :active.sync="isLoading"></loading>
    <info></info> -->
    <loginbox />


    <div class="banner">
      <ul class="bannerMain">
        <transition-group name="bannerFade">
          <li
            v-for="(item, key) in bannerData.main"
            :key="item.id"
            v-show="key === bannerMain"
            class="imageWrap"
          >
            <i
              class="image"
              :style="{ background: item.background }"
            />
          </li>
        </transition-group>
        <li class="switch">
          <div
            v-for="(item, key) in bannerData.main"
            :key="key"
            :class="{'active' : key === bannerMain}"
            @click="changeBanner('main', key)"
          />
        </li>
      </ul>

      <ul class="bannerSide">
        <li class="bs-1">
          <i />
        </li>

        <li class="bs-2">
          <transition-group name="bannerFade" tag="span">
            <i
              v-for="(item, key) in bannerData.side"
              :key="item.id"
              v-show="key === bannerSide"
              class="image"
              :style="{ background: `url(${item.url}) center center / cover no-repeat`}"
            />
          </transition-group>
          <div class="switch">
            <i
              v-for="(item, key) in bannerData.side"
              :key="key"
              :class="{'active' : key === bannerSide}"
              @click="changeBanner('side', key)"
            />
          </div>
        </li>

        <li class="bs-3">
          <i />
        </li>
      </ul>
    </div>
    <div class="content">
      <h2>BRANDS<i class="fas fa-shoe-prints" /></h2>
      <ul class="brand">
        <li class="coverse">
          <i class="brand_logo" />
          <i class="img" @click="goShop('converse')" />
        </li>
        <li class="keen">
          <i class="brand_logo" />
          <i class="img" @click="goShop('keen')" />
        </li>
        <li class="vans">
          <i class="brand_logo" />
          <i class="img" @click="goShop('vans')" />
        </li>
        <li class="dr_martens">
          <i class="brand_logo" />
          <i class="img" @click="goShop('martens')" />
        </li>
        <li class="the_north_face">
          <i class="brand_logo" />
          <i class="img" @click="goShop('thenorthface')" />
        </li>
        <li class="carhartt">
          <i class="brand_logo" />
          <i class="img" @click="goShop('carhartt')" />
        </li>
      </ul>
    </div>


    <transition name="cartFade">
      <cart v-if="cartOpen" />
    </transition>
  </div>
</template>

<script>
// import info from '../components/tem_info.vue';
import cart from '../components/cart.vue';
import loginbox from '~/components/login.vue';

export default {
  components: {
    // info,
    cart,
    loginbox,
  },
  layout: 'front',
  data() {
    return {
      bannerData: {
        main: [
          {
            background: `url('https://images.unsplash.com/photo-1472212475008-54945bdab411?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80')
            center 40% / cover no-repeat`,
            id: 0,
          },
          {
            background: `url('https://images.unsplash.com/photo-1558976454-3031bc29ec28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')
            center bottom / cover no-repeat`,
            id: 1,
          },
          {
            background: `url('https://images.unsplash.com/photo-1472186422470-1f3fbde547aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80')
            center 80%  / cover no-repeat`,
            id: 2,
          },
          {
            background: `url('https://images.unsplash.com/photo-1501813722636-45de2fe4f9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')
            center 60% / cover no-repeat`,
            id: 3,
          },
          {
            background: `url('https://images.unsplash.com/photo-1544860723-2f60590b257c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')
            center 80% / cover no-repeat`,
            id: 4,
          },
          // {
          //   background: `url('https://images.unsplash.com/photo-1541595948840-f299cdb13759?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80')
          //   center bottom / cover no-repeat`,
          // },
        ],
        side: [
          {
            url: require('@/assets/keen_model_1.png'), // eslint-disable-line
            id: 0,
          },
          {
            url: require('@/assets/keen_model_4.jpg'), // eslint-disable-line
            id: 1,
          },
          {
            url: require('@/assets/keen_model_3.png'), // eslint-disable-line
            id: 2,
          },
        ],
      },
      bannerMain: 0,
      bannerSide: 0,
      intervalMain: null,
      intervalSide: null,
    };
  },
  created() {
    this.bannerTimer('main');
    this.bannerTimer('side');
  },
  async fetch({ store }) {
    await store.dispatch('getCart');
  },
  methods: {
    bannerTimer(name, time = 5000) {
      const vm = this;
      let intervalID = 'intervalMain';
      let now = 'bannerMain';

      if (name === 'side') {
        intervalID = 'intervalSide';
        now = 'bannerSide';
      }

      clearInterval(this[intervalID]);

      this[intervalID] = setInterval(() => {
        if (vm[now] + 1 === vm.bannerData[name].length) {
          vm[now] = 0;
        } else {
          vm[now] += 1;
        }
      }, time);
    },
    changeBanner(name, index = 0) {
      const now = name === 'main' ? 'bannerMain' : 'bannerSide';
      this[now] = index;
      this.bannerTimer(name);
    },
    goShop(brand) {
      this.$router.push(`/shop/select_${brand}`);
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    cartOpen() {
      return this.$store.state.cartOpen;
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalMain);
    clearInterval(this.intervalSide);
  },
};
</script>

<style lang="scss">
@import '@/assets/sass/index.scss';
</style>
