<template>
  <div id="shop">
    <loading :active.sync="isLoading"></loading>
    <info></info>

    <navbar></navbar>

    <sidebar></sidebar>

    <div class="content">
      <h2 class="path">/ {{ $route.name }} / {{ $route.params.shop_id }}</h2>
      <ul class="product">
        <li v-for="(item, key) in products" :key="key" @click="getOnePro(item.id)">
          <div>
            <img :src="item.imageUrl">
            <img :src="item.description" v-if="item.description" class="hoverImg">

            <div class="mask">
              <i class="fas fa-plus" @click.stop="addtoCart(item.id)"></i>
              <i class="far fa-heart"></i>
            </div>
          </div>
          <h3>{{ item.title }}</h3>
          <p>NT$ {{ item.price || 0 }}</p>
        </li>
      </ul>
      <h3 class="noProducts" v-if="products.length === 0">
        抱歉，這個商品類別沒有相關商品
      </h3>
    </div>

    <foot></foot>

    <transition name="cartFade">
      <cart v-if="cartOpen"></cart>
    </transition>

    <!-- modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <!-- self -->
          <div class="modal-self">
            <div class="imageWrap">
              <img :src="product.imageUrl">
              <img :src="product.description" v-if="product.description" class="hoverImg">
            </div>

            <i class="close" aria-hidden="true" data-dismiss="modal" aria-label="Close">x</i>
            <ul class="itemInfo">
              <li><h2>{{ product.title }}</h2></li>
              <li><h4>{{ product.content || '-' }}</h4></li>
              <li class="origin">NT$ {{ product.origin_price }}</li>
              <li class="final">NT$ {{ product.price }}</li>
              <li>
                <div class="form-control">
                  <button class="btn less" @click="qtyChange(-1)">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input type="number" v-model="buyQty" max="10" min="1">
                  <button class="btn plus" @click="qtyChange(1)">
                    <i class="fas fa-plus"></i>
                  </button>
                  <button class="btn btn-outline-info commit"
                  @click="addtoCart(product.id, buyQty)">加入購物車</button>
                </div>
              </li>
            </ul>
          </div>
          <!-- self -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import cart from '../components/cart.vue';
import foot from '../components/foot.vue';
import navbar from '../components/navbar.vue';
import sidebar from '../components/sidebar.vue';
import info from '../components/tem_info.vue';

export default {
  name: 'Shop',
  components: {
    cart,
    foot,
    navbar,
    sidebar,
    info,
  },
  data() {
    return {
      buyQty: 1,
      product: {},
    };
  },
  created() {
    this.$store.dispatch('getProducts', { pageNum: 1, isAdmin: false, item: 'product' });
    this.$store.dispatch('getCart');
  },
  methods: {
    addtoCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const config = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.$store.commit('LOADINGCHANGE', true);

      this.axios.post(api, config).then(() => {
        this.$store.commit('LOADINGCHANGE', false);
        this.$store.dispatch('getCart');
        $('#productModal').modal('hide');
      });
    },
    getOnePro(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;

      this.axios.get(api).then((response) => {
        // 商品
        this.product = response.data.product;
        // Loading
        this.butQty = 1;
        $('#productModal').modal('show');
      });
    },
    qtyChange(value) {
      if (value === 1 && this.buyQty >= 10) {
        this.buyQty = 10;
        return;
      }
      if (value === -1 && this.buyQty <= 1) {
        this.buyQty = 1;
        return;
      }
      this.buyQty += value;
    },
  },
  computed: {
    products() {
      const id = this.$route.params.shop_id;
      let newArr = [...this.$store.state.products];

      if (id.indexOf('vintage') !== -1) {
        newArr = newArr.filter(item => item.category.indexOf('vintage') !== -1);
        if (id === 'vintage_all') {
          return newArr;
        } if (id === 'vintage_top') {
          return newArr.filter(item => item.category.indexOf('top') !== -1);
        } if (id === 'vintage_pants') {
          return newArr.filter(item => item.category.indexOf('pants') !== -1);
        } if (id === 'vintage_dress') {
          return newArr.filter(item => item.category.indexOf('dress') !== -1);
        } if (id === 'vintage_coat') {
          return newArr.filter(item => item.category.indexOf('coat') !== -1);
        } if (id === 'vintage_shoes') {
          return newArr.filter(item => item.category.indexOf('shoes') !== -1);
        }
        return false;
      } if (id.indexOf('select') !== -1) {
        newArr = newArr.filter(item => item.category.indexOf('brand') !== -1);
        if (id === 'select_all') {
          return newArr;
        } if (id === 'select_converse') {
          return newArr.filter(item => item.category.indexOf('converse') !== -1);
        } if (id === 'select_martens') {
          return newArr.filter(item => item.category.toLowerCase().indexOf('martens') !== -1);
        } if (id === 'select_keen') {
          return newArr.filter(item => item.category.indexOf('keen') !== -1);
        } if (id === 'select_carhartt') {
          return newArr.filter(item => item.category.indexOf('carhartt') !== -1);
        } if (id === 'select_thenorthface') {
          return newArr.filter(item => item.category.toLowerCase().indexOf('north') !== -1);
        } if (id === 'select_vans') {
          return newArr.filter(item => item.category.indexOf('vans') !== -1);
        }
        return false;
      } if (id.indexOf('accessories') !== -1) {
        newArr = newArr.filter(item => item.category.indexOf('accessories') !== -1);
        if (id === 'accessories_all') {
          return newArr;
        } if (id === 'accessories_bag') {
          return newArr.filter(item => item.category.indexOf('bag') !== -1);
        } if (id === 'accessories_hairpin') {
          return newArr.filter(item => item.category.indexOf('hairpin') !== -1);
        } if (id === 'accessories_earpin') {
          return newArr.filter(item => item.category.indexOf('earpin') !== -1);
        } if (id === 'accessories_socks') {
          return newArr.filter(item => item.category.indexOf('socks') !== -1);
        }
        return false;
      } if (id.indexOf('sale') !== -1) {
        return newArr.filter(item => item.category.indexOf('sale') === 0);
      }
      return newArr;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    cartOpen() {
      return this.$store.state.cartOpen;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/sass/helpers/_reset.scss';
@import '../assets/sass/helpers/_transition.scss';
@import '../assets/sass/shop.scss';
</style>
