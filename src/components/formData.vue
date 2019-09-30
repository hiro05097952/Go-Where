<template>
  <div class="my-5 row justify-content-center form" @click.stop>
    <form class="col-md-11">
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
        <button class="btn btn-teal" @click.prevent="$router.go(-1)">上一步</button>
        <button class="btn btn-danger ml-4" @click.prevent="formCommit">送出訂單</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'formData',
  data() {
    return {
      form: {
        message: '',
        user: {},
      },
    };
  },
  methods: {
    formCommit() {
      const vm = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('LOADINGCHANGE', true);
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
          const config = {
            data: {
              user: {
                name: vm.form.user.name,
                email: vm.form.user.email,
                tel: vm.form.user.phone,
                address: vm.form.user.address,
              },
              message: vm.form.message,
            },
          };
          this.axios.post(api, config).then((response) => {
            vm.$store.commit('LOADINGCHANGE', false);
            if (response.data.success) {
              vm.$router.push(`/checkout/checkorder/${response.data.orderId}`);
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
};
</script>

<style lang="scss">
</style>
