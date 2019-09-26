<template>
  <div class="products">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary mt-4"
      @click.prevent="openModal(true, null, 'productModal')">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="100" class="text-right">原價</th>
        <th width="100" class="text-right">價格</th>
        <th width="120" class="pl-4">是否啟用</th>
        <th width="150" class="text-center">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="key">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td class="pl-4" :class="{'text-success' : item.is_enabled}">
            {{ item.is_enabled ? '已啟用' : '未啟用' }}
          </td>
          <td>
            <button class="btn btn-outline-info btn-sm"
            @click.prevent="openModal(false, item, 'productModal')">編輯</button>
            <button class="btn btn-outline-danger ml-2 btn-sm"
            @click.prevent="openModal(false, item, 'delProductModal')">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <page></page>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="newProducts.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="imgUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadImg">
                </div>
                <img class="img-fluid" :src="newProducts.imageUrl" alt ="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="newProducts.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="newProducts.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="newProducts.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="newProducts.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="newProducts.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述" v-model="newProducts.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="newProducts.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="newProducts.is_enabled"
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
            data-dismiss="modal" @click="clearFile">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ newProducts.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="removeProduct">確認刪除</button>
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
  name: 'Admin_products',
  components: {
    page,
  },
  data() {
    return {
      newProducts: {},
      isNew: false,
      imgUploading: false,
    };
  },
  created() {
    this.$store.dispatch('getProducts');
  },
  methods: {
    openModal(isNew, item, modalName) {
      if (!isNew) {
        this.newProducts = { ...item };
        this.isNew = false;
      } else {
        this.newProducts = {};
        this.isNew = true;
      }
      $(`#${modalName}`).modal('show');
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.newProducts.id}`;
        method = 'put';
      }
      this.axios[method](api, { data: vm.newProducts }).then((response) => {
        $('#productModal').modal('hide');
        vm.clearFile();
        this.$store.dispatch('getProducts');
        if (!response.data.success) {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
        }
      });
    },
    removeProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.newProducts.id}`;
      this.axios.delete(api).then(() => {
        $('#delProductModal').modal('hide');
        vm.$store.dispatch('getProducts');
      });
    },
    uploadImg(e) {
      const vm = this;
      const formData = new FormData();
      this.imgUploading = true;
      formData.append('image', e.target.files[0]);

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      this.axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.data.success) {
          vm.$set(vm.newProducts, 'imageUrl', response.data.imageUrl);
        } else {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
        }
        vm.imgUploading = false;
      });
    },
    clearFile() {
      this.$refs.files.value = '';
    },
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    isLoading() {
      return this.$store.state.isLoading;
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
