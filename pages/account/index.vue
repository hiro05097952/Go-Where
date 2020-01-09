<template>
  <div id="accountInfo">
    <ul>
      <li>
        <label for="displayName">姓名</label>
        <div>
          <input
            type="text"
            id="displayName"
            v-model="userInfo.displayName"
            v-validate="'required'"
            name="name"
            data-vv-as="姓名"
          >
          <span>{{ errors.first('name') }}</span>
        </div>
      </li>
      <li>
        <label for="email">帳號</label>
        <input type="text" id="email" disabled :value="userInfo.email">
      </li>
      <li class="emailVerified">
        <h3>信箱驗證</h3>
        <p
          :class="{'text-success' : storeUser.emailVerified,
                   'text-danger' : !storeUser.emailVerified}"
        >
          {{ storeUser.emailVerified ? '通過驗證' : '尚未驗證' }}
        </p>
        <button
          :disabled="emailBtnDisable"
          v-if="!storeUser.emailVerified"
          class="btn btn-outline-primary btn-sm"
          @click.prevent="sendEmailVerificationAgain"
        >
          {{ emailBtnDisable ? `重新驗證 ${btnTime}` : '重新驗證' }}
        </button>
      </li>
      <li :class="{'passwordEditing' : isEditing.password}">
        <label>密碼</label>
        <a href="#" v-if="!isEditing.password" @click.prevent="isEditing.password = true">重新設定密碼</a>
        <div v-else>
          <input
            type="password"
            v-model="password.currentPassword"
            placeholder="請輸入目前密碼"
            v-validate="'min:12|max:16|required'"
            name="password"
            data-vv-as="密碼"
          >
          <span>{{ errors.first('password') }}</span>

          <input
            type="password"
            v-model="password.newPassword"
            placeholder="請輸入新密碼"
            v-validate="'min:12|max:16|required'"
            name="newPassword"
            data-vv-as="新密碼"
            ref="newPassword"
          >
          <span>{{ errors.first('newPassword') }}</span>

          <input
            type="password"
            v-model="password.newPasswordConfirm"
            placeholder="密碼確認"
            v-validate="'confirmed:newPassword|required'"
            name="newPasswordConfirm"
            data-vv-as="密碼確認"
          >
          <span>{{ errors.first('newPasswordConfirm') }}</span>
        </div>
      </li>
      <li>
        <label for="address">地址</label>
        <input type="text" id="address" v-model="userInfo.address">
      </li>
      <li class="subscribe">
        <h3>訂閱</h3>
        <input
          type="checkbox"
          name="subscribe"
          id="subscribe"
          v-model="userInfo.subscribe"
          :true-value="1"
          :false-value="0"
        >
        <label for="subscribe">Go! Where? 最新商品情報</label>
      </li>
      <li class="btnBar">
        <button class="cancel" @click="reset">
          取消
        </button>
        <button @click.prevent="setNewPassword">
          儲存變更
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';

const auth = firebase.auth();

export default {
  data() {
    return {
      isEditing: {
        password: false,
      },
      intervalID: '',
      btnTime: 30,
      userInfo: {},
      password: {},
    };
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/user');
    // console.log('userInfo: ', data);
    return { userInfo: data.userInfo };
  },
  methods: {
    sendEmailVerificationAgain() {
      const vm = this;
      if (!auth.currentUser.emailVerified) {
        vm.$nuxt.$loading.start();

        auth.currentUser.sendEmailVerification().then(() => {
          vm.$nuxt.$loading.finish();
          vm.intervalID = setInterval(() => {
            if (vm.btnTime > 0) {
              vm.btnTime -= 1;
            } else {
              clearInterval(vm.intervalID);
              vm.btnTime = 30;
            }
          }, 1000);
        }).catch((err) => {
          // 寄信出錯，註冊太多次被封鎖
          vm.$swal.fire({
            title: err.message,
            icon: 'error',
          });
          vm.$nuxt.$loading.finish();
        });
      }
    },
    reset() {
      this.newUserInfo = {};
      this.isEditing = {
        password: false,
      };
    },
    setNewPassword() {
      this.$nuxt.$loading.start();
      const api = '/api/user';
      const config = this.isEditing.password ? { ...this.password, ...this.userInfo }
        : { ...this.userInfo };
      this.$validator.validateAll().then((result) => {
        if (!result) { return; }
        this.$axios.put(api, config).then((response) => {
          // console.log(response.data);
          if (response.data.success) {
            this.reset();
            this.$swal.fire({
              title: response.data.message,
              icon: 'success',
            });
          } else {
            this.$swal.fire({
              title: response.data.message,
              icon: 'error',
            });
          }
          this.$nuxt.$loading.finish();
        });
      });
    },
  },
  computed: {
    emailBtnDisable() {
      if (this.$store.state.user.emailVerified) {
        return true;
      }
      if (this.btnTime === 30) {
        return false;
      }
      return true;
    },
    storeUser() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss">
</style>
