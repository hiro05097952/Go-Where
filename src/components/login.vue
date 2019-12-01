<template>
  <div class="login" v-if="isOpen" @click.self="close"
  @scroll.prevent @touchmove.prevent @mousewheel.prevent>
    <div class="wrap" v-if="!isRegister">
      <h2>ACCOUNT LOGIN</h2>
      <i class="close" @click="close">X</i>
      <ul>
        <li>
          <input type="text" placeholder="Email" v-model="user.email"
          v-validate="'email|required'" name="Email">
          <span>{{ errors.first('Email') }}</span>
          <i class="fas fa-user"></i>
        </li>
        <li>
          <input type="password" placeholder="Password" v-model="user.password"
          v-validate="'min:12|max:16|required'" name="password" data-vv-as="密碼">
          <span>{{ errors.first('password') }}</span>
          <i class="fas fa-lock"></i>
        </li>
        <li class="btnBar">
          <a href="#" @click.prevent>Forgot Password?</a>
          <button class="register" @click="isRegister = true">Register</button>
          <button @click.prevent="login">Login</button>
        </li>
      </ul>
    </div>

    <div class="wrap register" v-else>
      <h2>Register</h2>
      <i class="close" @click="close">X</i>
      <ul>
        <li>
          <input type="text" placeholder="Email" v-model="newUser.email"
          v-validate="'email|required'" name="Email">
          <span>{{ errors.first('Email') }}</span>
          <i class="fas fa-user"></i>
        </li>
        <li>
          <input type="password" placeholder="Password" v-model="newUser.password"
          v-validate="'min:12|max:16|required'" name="password" data-vv-as="密碼"
          ref="password">
          <span>{{ errors.first('password') }}</span>
          <i class="fas fa-lock"></i>
        </li>
        <li>
          <input type="password" placeholder="Password Confirmation"
            v-model="newUser.passwordCheck" v-validate="'confirmed:password|required'"
            name="password_confiremation" data-vv-as="確認密碼">
            <span>{{ errors.first('password_confiremation') }}</span>
        </li>
        <li>
          <input type="text" placeholder="Name" v-model="newUser.displayName"
          v-validate="'required'" data-vv-as="姓名" name="name">
          <span>{{ errors.first('name') }}</span>
        </li>
        <li class="btnBar">
          <button class="register" @click="isRegister = false">Return</button>
          <button @click.prevent="signup">Submit</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

const auth = firebase.auth();

export default {
  name: 'Login',
  data() {
    return {
      isRegister: false,
      user: {},
      newUser: {},
    };
  },
  methods: {
    login() {
      this.$validator.validateAll().then((result) => {
        if (!result) { return; }
        this.$store.commit('LOADINGCHANGE', true);
        // sign in
        auth.signInWithEmailAndPassword(this.user.email, this.user.password).then((response) => {
        // get idToken
          response.user.getIdToken().then((idToken) => {
          // post token to set session
            this.axios.post(`${process.env.VUE_APP_APIURL}/api/login`, { idToken })
              .then((res) => {
                console.log(res.data.message);
                if (res.data.success) {
                  this.$store.commit('UPDATEUSER', res.data.userInfo);
                  this.user = {};
                  this.$store.commit('OPENLOGINBOX', false);
                  this.$store.commit('LOADINGCHANGE', false);
                }
              });
          });
        }).catch((err) => {
          if (err.code === 'auth/user-not-found') {
            this.$store.dispatch('updateMessage', {
              message: '查無此用戶，請再次確認帳號密碼',
              status: 'danger',
            });
          }
          if (err.code === 'auth/wrong-password') {
            this.$store.dispatch('updateMessage', {
              message: '使用者帳號或密碼錯誤',
              status: 'danger',
            });
          }
          if (err.code === 'auth/invalid-email') {
            this.$store.dispatch('updateMessage', {
              message: '請輸入正確的 email 格式',
              status: 'danger',
            });
          }
          setTimeout(() => {
            this.$store.commit('LOADINGCHANGE', false);
          }, 500);
        });
      });
    },
    signup() {
      this.$validator.validateAll().then((result) => {
        if (!result) { return; }
        this.$store.commit('LOADINGCHANGE', true);
        // create acount
        this.axios.post(`${process.env.VUE_APP_APIURL}/api/user`, {
          email: this.newUser.email,
          password: this.newUser.password,
          passwordCheck: this.newUser.passwordCheck,
          displayName: this.newUser.displayName,
        }).then((response) => {
        // console.log(response.data);
          if (!response.data.success) {
            this.$store.dispatch('updateMessage', {
              message: response.data.message,
              status: 'danger',
            });
            this.$store.commit('LOADINGCHANGE', false);
            return;
          }
          // Send Email Verification
          auth.signInWithEmailAndPassword(this.newUser.email, this.newUser.password)
            .then((res) => {
              if (res.user && !res.user.emailVerified) {
                res.user.sendEmailVerification().then(() => {
                  this.newUser = {};
                  this.$store.commit('OPENLOGINBOX', false);
                  this.$store.commit('LOADINGCHANGE', false);
                }).catch((err) => {
                // 寄信出錯，註冊太多次被封鎖
                  this.$store.dispatch('updateMessage', {
                    message: err.message,
                    status: 'danger',
                  });
                  this.$store.commit('OPENLOGINBOX', false);
                  this.$store.commit('LOADINGCHANGE', false);
                  this.$router.push('/account/accountInfo');
                });
              }
            }).catch((err) => {
            // 登入出錯
              this.$store.dispatch('updateMessage', {
                message: err.message,
                status: 'danger',
              });
              this.$store.commit('LOADINGCHANGE', false);
            });
        });
      });
    },
    close() {
      this.isRegister = false;
      this.user = {};
      this.newUser = {};
      this.$store.commit('OPENLOGINBOX', false);
    },
  },
  computed: {
    isOpen() {
      return this.$store.state.loginBoxOpen;
    },
  },
};
</script>

<style lang="scss" required>
@import '@/assets/sass/login';
</style>
