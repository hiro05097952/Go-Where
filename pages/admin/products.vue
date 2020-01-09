<template>
  <div class="products">
    <div class="text-right">
      <button
        class="btn btn-primary mt-4"
        @click.prevent="openModal(true, null, 'productModal')"
      >
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <client-only>
          <th width="120">
            分類
          </th>
          <th>
            產品名稱
          </th>
          <th width="100" class="text-right">
            原價
          </th>
          <th width="100" class="text-right">
            價格
          </th>
          <th width="120" class="pl-4">
            是否啟用
          </th>
          <th width="150" class="text-center">
            編輯
          </th>
        </client-only>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="key">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
          </td>
          <td class="pl-4" :class="{'text-success' : item.is_enabled}">
            {{ item.is_enabled ? '已啟用' : '未啟用' }}
          </td>
          <td>
            <button
              class="btn btn-outline-info btn-sm"
              @click.prevent="openModal(false, item, 'productModal')"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger ml-2 btn-sm"
              @click.prevent="openModal(false, item, 'delProductModal')"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <page />
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
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
                  <label for="customFile">上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="imgUploading" />
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadImg"
                  >
                </div>

                <div class="form-group">
                  <label class="d-block mb-2">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="newImage"
                    @keypress.enter="addImgUrl"
                  >
                  <button class="btn btn-primary btn-sm col mt-2" @click="addImgUrl">
                    新增
                  </button>
                </div>
                <div class="form-group" v-for="(item, key) in newProducts.imageUrl" :key="key">
                  <img class="img-fluid img-thumbnail" :src="item">
                  <button class="btn btn-danger btn-sm col mt-2" @click="removeImg(key)">
                    刪除
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="newProducts.title"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="newProducts.category"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="newProducts.unit"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="newProducts.origin_price"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="newProducts.price"
                    >
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="newProducts.description"
                  />
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="newProducts.content"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="newProducts.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    >
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              @click="clearFile"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
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
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="removeProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import page from '~/components/page.vue';

export default {
  components: {
    page,
  },
  layout: 'admin',
  filters: {
    currency(num) {
      if (num === undefined) { return ''; }
      const parts = String(num).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
  },
  data() {
    return {
      newProducts: {},
      isNew: false,
      imgUploading: false,
      newImage: '',
    };
  },
  async fetch({ store }) {
    await store.dispatch('getItems');
  },
  computed: {
    products() {
      return this.$store.state.items;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
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
      let api = '/api/admin/product';
      let method = 'post';
      if (!this.isNew) {
        api = `/api/admin/product/${vm.newProducts.id}`;
        method = 'put';
      }
      // console.log(vm.newProducts);
      this.$nuxt.$loading.start();
      this.$axios[method](api, vm.newProducts).then((response) => {
        vm.$swal.fire({
          title: response.data.message,
          icon: response.data.success ? 'success' : 'error',
        });
        if (!response.data.success) {
          return;
        }
        this.$nuxt.$loading.finish();
        $('#productModal').modal('hide');
        vm.clearFile();
        this.$store.dispatch('getItems');
      });
    },
    async removeProduct() {
      const { data } = await this.$axios.delete(`/api/admin/product/${this.newProducts.id}`);
      this.$swal.fire({
        icon: data.success ? 'seccess' : 'error',
        title: data.message,
      });
      $('#delProductModal').modal('hide');
      this.$store.dispatch('getItems');
    },
    uploadImg(e) {
      const vm = this;
      const formData = new FormData();
      this.imgUploading = true;
      formData.append('image', e.target.files[0]);

      const api = '/api/admin/upload';
      this.$axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          if (!vm.newProducts.imageUrl) {
            vm.$set(vm.newProducts, 'imageUrl', [response.data.imageUrl]);
          } else {
            vm.newProducts.imageUrl.push(response.data.imageUrl);
          }
        } else {
          vm.$swal.fire({
            message: response.data.message,
            status: 'error',
          });
        }
        vm.imgUploading = false;
      });
    },
    clearFile() {
      this.$refs.files.value = '';
    },
    addImgUrl() {
      if (!this.newProducts.imageUrl) {
        this.$set(this.newProducts, 'imageUrl', [this.newImage]);
      } else {
        this.newProducts.imageUrl.push(this.newImage);
      }
      this.newImage = '';
    },
    removeImg(index) {
      this.newProducts.imageUrl.splice(index, 1);
    },
  },
};
</script>
