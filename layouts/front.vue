<template>
  <div class="front" @click="$store.state.cartOpen ? $store.commit('OPENCART', false) : undefined">
    <div id="navbar">
      <div class="logo" @click="$router.push('/')">
        Go! Where?
      </div>
      <ul class="itemNav">
        <li>
          <nuxt-link to="/about">
            ABOUT
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/shop/all">
            ALL
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/shop/vintage_all">
            VINTAGE
            <i class="fas fa-sort-down" />
          </nuxt-link>
          <ul>
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
        </li>
        <li>
          <nuxt-link to="/shop/select_all">
            SELECT
            <i class="fas fa-sort-down" />
          </nuxt-link>
          <ul>
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
        </li>
        <li>
          <nuxt-link to="/shop/accessories_all">
            ACCESSORIES
            <i class="fas fa-sort-down" />
          </nuxt-link>
          <ul>
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
        </li>
        <li>
          <nuxt-link to="/shop/sale">
            SALE
          </nuxt-link>
        </li>
      </ul>
      <ul class="accountNav">
        <li
          @click="$store.commit('OPENLOGINBOX', true)"
          v-if="$store.state.user.isAdmin === undefined"
        >
          <i class="far fa-user" />
        </li>
        <li v-else class="signed">
          <i class="fas fa-user-edit" />
          <ul class="userBox">
            <li @click="$router.push('/account')">
              會員專區
            </li>
            <li @click="signout">
              登出
            </li>
          </ul>
        </li>
        <li @click="$router.push('/account/userlike')">
          <i class="far fa-heart" />
        </li>
        <li @click.stop="openCart" v-if="!$route.path.includes('checkout')">
          <i class="fas fa-shopping-cart" />
          <i class="cartQty" v-if="cartLen">{{ cartLen }}</i>
        </li>
      </ul>
      <div class="couponWrap">
        <i class="fas fa-birthday-cake" />
        <div class="couponInfo">
          <h5>為慶祝本店週年慶，即日起在購物欄輸入comehere，即可享七折優惠！</h5>
        </div>
      </div>
    </div>

    <div class="main">
      <nuxt />
    </div>

    <div class="footer">
      <div>
        <ul class="contact">
          <li>Contact</li>
          <li>TEL: 07-1234567</li>
          <li>MAIL: gowhere@gmail.com</li>
          <li>Time: 12:00 - 22:00</li>
        </ul>
        <div>
          <h5>©Copright 2019 TSAI-HUNG LI</h5>
          <p>僅個人作品練習，無任何商業用途</p>
        </div>
        <ul class="follow">
          <li>Follow Go! Where?</li>
          <li><i class="fab fa-instagram" /><a href="#">Instagram</a></li>
          <li><i class="fab fa-line" /><a href="#">Line</a></li>
          <li><i class="fab fa-facebook-f" /><a href="#">Facebook</a></li>
          <li><i class="fab fa-twitter" /><a href="#">Twitter</a></li>
        </ul>
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
    openCart() {
      this.$store.commit('OPENCART', !this.$store.state.cartOpen);
    },
    signout() {
      this.$nuxt.$loading.start();
      auth.signOut().then(() => {
        this.$axios.post('/api/logout').then((response) => {
          this.$store.commit('UPDATEUSER', {});
          this.$store.commit('UPDATECART', {
            carts: [],
          });
          this.$store.commit('UPDATELIKES', []);
          setTimeout(() => {
            this.$nuxt.$loading.finish();
            this.$swal.fire({
              icon: 'success',
              title: response.data.message,
            });
          }, 1000);

          if (this.$route.path.includes('account') || this.$route.path.includes('admin')
          || this.$route.path.includes('checkout')) {
            this.$router.replace('/');
          }
        });
      });
    },
  },
  computed: {
    cartLen() {
      return this.$store.state.cart.carts.length;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/sass/navbar.scss';
@import '@/assets/sass/foot.scss';
</style>
