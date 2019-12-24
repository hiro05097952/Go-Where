<template>
  <div class="customer_orders">
    <loading :active.sync="isLoading"></loading>

    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="(item,key) in products" :key="key">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center;"
          :style="{backgroundImage: `url(${ item.imageUrl })`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h6 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h6>
            <p class="card-text">{{ item.content || '_' }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ item.origin_price || 0 }} 元</del>
              <div class="h5">現在只要 {{ item.price || 0 }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="getOnePro(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="selected === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
            @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="selected === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <page></page> -->
    <!-- modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <!-- 上面標題 -->
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- 身體 -->
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <img :src="product.imageUrl"
                class="img-fluid mx-auto d-block" style="max-height: 400px;">
                <h5 class="font-weight-normal mt-3 mb-4">{{ product.content }}</h5>
                <div class="d-flex justify-content-between align-items-baseline">
                  <del class="h6">原價 {{ product.origin_price || 0 }} 元</del>
                  <div class="h4">現在只要 {{ product.price || 0 }} 元</div>
                </div>
                <select class="custom-select mt-5"
                v-model="butQty">
                  <option v-for="(item, key) in 10" :key="key" :value="item">
                    選購 {{ item }} {{ product.unit || '個' }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <!-- 腳 -->
          <div class="modal-footer">
            <h6 class="mr-4 pt-2">總計 {{ product.price * butQty || 0 }} 元</h6>
            <button type="button" class="btn btn-success"
            @click="addtoCart(product.id, butQty)">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 購物車 -->
    <div class="d-block mx-auto mt-4" style="width: 60%;" v-if="cart.carts != null">
      <table class="table">
        <thead>
          <th></th>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="(item, key) in cart.carts" :key="key">
            <td class="align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">
                已套用優惠券
              </div>
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.total | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total | currency }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total | currency }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼"
        v-model="coupon.code">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
          @click.prevent="useCoupon">
            套用優惠碼
          </button>
        </div>
      </div>
    </div>
    <!-- 訂單 -->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-model="form.user.email" placeholder="請輸入 Email"
            v-validate="'required|email'" data-vv-as="Email">
          <span class="text-danger">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            v-model="form.user.name" placeholder="輸入姓名"
            v-validate="'required'" data-vv-as="姓名">
          <span class="text-danger">{{ errors.first('name') }}</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel" name="phone"
            v-model="form.user.phone" placeholder="請輸入電話"
            v-validate="'required'" data-vv-as="電話">
          <span class="text-danger">{{ errors.first('phone') }}</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text" class="form-control" name="address"
          id="useraddress" v-model="form.user.address" placeholder="請輸入地址"
          v-validate="'required'" data-vv-as="地址">
          <span class="text-danger">{{ errors.first('address') }}</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea id="comment" class="form-control" cols="30"
          rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger" @click.prevent="formCommit">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
// import page from '../components/tem_page.vue';

export default {
  name: 'Admin_orderTest',
  components: {
    // page,
  },
  data() {
    return {
      product: {
      },
      selected: null,
      butQty: 1,
      coupon: {
        code: '',
      },
      form: {
        message: '',
        user: {},
      },
    };
  },
  created() {
    this.$store.dispatch('getProducts', { pageNum: 1, isAdmin: false, item: 'product' });
    this.$store.dispatch('getCart');
  },
  methods: {
    getOnePro(id) {
      const api = `${process.env.VUE_APP_APIURL}/api/product/${id}`;
      this.runStatus(id);

      this.axios.get(api).then((response) => {
        // 商品
        this.product = response.data.product;
        // Loading
        this.selected = '';
        this.butQty = 1;
        $('#productModal').modal('show');
      });
    },
    runStatus(id) {
      this.selected = id;
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIURL}/api/cart`;
      const config = {
        uid: 'XY8q0YV6YYR21Q3dnLXBhnE24Bi1',
        product_id: id,
        qty,
      };
      this.runStatus(id);
      this.axios.post(api, config).then(() => {
        // console.log(response.data);
        this.$store.dispatch('getCart');
        this.selected = '';
        $('#productModal').modal('hide');
      });
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_APIURL}/api/cart/${id}`;
      this.$store.commit('LOADINGCHANGE', true);

      this.axios.delete(api).then(() => {
        this.$store.commit('LOADINGCHANGE', false);
        this.$store.dispatch('getCart');
      });
    },
    useCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIURL}/api/coupon`;
      this.$store.commit('LOADINGCHANGE', true);

      this.axios.post(api, {
        uid: 'XY8q0YV6YYR21Q3dnLXBhnE24Bi1',
        code: this.coupon.code,
      }).then((response) => {
        vm.coupon.code = '';
        vm.$store.commit('LOADINGCHANGE', false);

        if (response.data.success) {
          vm.$store.dispatch('getCart');
        } else {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
        }
      });
    },
    formCommit() {
      const vm = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('LOADINGCHANGE', true);
          const api = `${process.env.VUE_APP_APIURL}/api/order`;
          const config = {
            name: vm.form.user.name,
            email: vm.form.user.email,
            tel: vm.form.user.phone,
            address: vm.form.user.address,
            uid: 'XY8q0YV6YYR21Q3dnLXBhnE24Bi1',
            payment_method: 'credit_card',
            message: vm.form.message,
          };
          this.axios.post(api, config).then((response) => {
            vm.$store.commit('LOADINGCHANGE', false);
            if (response.data.success) {
              vm.$router.push(`/admin/checkouttest/${response.data.orderID}`);
            } else {
              vm.$store.dispatch('updateMessage', {
                message: response.data.message,
                status: 'danger',
              });
            }
          });
        }
      });
    },
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    cart() {
      return this.$store.state.cart;
    },
  },
  filters: {
    currency(num) {
      if (num === undefined) { return ''; }
      const parts = String(num).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
  },
};
</script>
