<template>
  <div class="coupon">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary mt-4" @click="openModal(true)">建立優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th>名稱</th>
        <th width="100">折扣百分比</th>
        <th width="120" class="text-center">到期日</th>
        <th width="120" class="pl-4 text-center">是否啟用</th>
        <th width="150" class="text-center">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td class="text-center">{{ item.percent }}%</td>
          <td class="text-center">{{ item.due_date }}</td>
          <td class="pl-4 text-center" :class="{'text-success' : item.is_enabled}">
            {{ item.is_enabled ? '已啟用' : '未啟用' }}
          </td>
          <td>
            <button class="btn btn-outline-info btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger ml-2 btn-sm"
            @click="openModal(false, item, 'delCouponModal')">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <page></page>
    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ isNew ? '新增優惠碼' : '更新優惠碼' }}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="couponCache.title">
                </div>

                <div class="form-group">
                <label for="code">優惠碼</label>
                  <input type="text" class="form-control" id="code"
                    placeholder="請輸入優惠碼" v-model="couponCache.code">
                </div>

                <div class="form-group">
                  <label for="due_date">到期日</label>
                  <input type="date" class="form-control" id="due_date"
                    placeholder="請輸入到期日" v-model="couponCache.due_date">
                </div>

                <div class="form-group">
                  <label for="percent">折扣百分比</label>
                  <input type="number" class="form-control" id="percent" min="0" max="100"
                    placeholder="請輸入折扣百分比" v-model="couponCache.percent">
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="couponCache.is_enabled"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary"
            data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-success"
            @click.prevent="updateCoupon">{{ isNew ? '新增優惠卷' : '更新優惠卷' }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠碼</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ couponCache.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="removeCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import page from '../components/tem_page.vue';

export default {
  name: 'Admin_coupon',
  data() {
    return {
      couponCache: {},
      isNew: false,
    };
  },
  components: {
    page,
  },
  created() {
    this.$store.dispatch('getProducts', { pageNum: 1, isAdmin: true, item: 'coupon' });
  },
  methods: {
    openModal(isNew = false, item, modalName = 'couponModal') {
      this.couponCache = isNew ? {} : { ...item };
      $(`#${modalName}`).modal('show');
      this.isNew = isNew;
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let method = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.couponCache.id}`;
        method = 'put';
      }
      this.axios[method](api, { data: vm.couponCache }).then((response) => {
        $('#couponModal').modal('hide');
        this.$store.dispatch('getProducts', { pageNum: 1, isAdmin: true, item: 'coupon' });

        if (!response.data.success) {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
        }
      });
    },
    removeCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.couponCache.id}`;
      this.axios.delete(api).then(() => {
        $('#delCouponModal').modal('hide');
        vm.$store.dispatch('getProducts', { pageNum: 1, isAdmin: true, item: 'coupon' });
      });
    },
  },
  computed: {
    coupons() {
      return this.$store.state.products;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
