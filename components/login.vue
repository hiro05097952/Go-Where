<template>
  <div
    class="login"
    v-if="isOpen"
    @click.self="close"
    @scroll.prevent
    @touchmove.prevent
    @mousewheel.prevent
  >
    <div class="wrap" v-if="display === 'login'">
      <h2>ACCOUNT LOGIN</h2>
      <i class="close" @click="close">X</i>
      <ul>
        <li>
          <input
            type="text"
            placeholder="Email"
            v-model="user.email"
            v-validate="'email|required'"
            name="Email"
          >
          <span>{{ errors.first('Email') }}</span>
          <i class="fas fa-user" />
        </li>
        <li>
          <input
            type="password"
            placeholder="Password"
            v-model="user.password"
            v-validate="'min:12|max:16|required'"
            name="password"
            data-vv-as="密碼"
          >
          <span>{{ errors.first('password') }}</span>
          <i class="fas fa-lock" />
        </li>
        <li class="googleWrap">
          <button @click="googleSignIn" class="googleBtn">
            <i class="fab fa-google-plus-square" />
            Google SignIn
          </button>
        </li>
        <li class="btnBar">
          <a href="#" @click.prevent="display = 'forgotPassword'">Forgot Password?</a>
          <button class="register" @click="display = 'register'">
            Register
          </button>
          <button @click.prevent="login">
            Login
          </button>
        </li>
      </ul>
    </div>

    <div class="wrap register" v-if="display === 'register'">
      <h2>Register</h2>
      <i class="close" @click="close">X</i>
      <ul>
        <li>
          <input
            type="text"
            placeholder="Email"
            v-model="newUser.email"
            v-validate="'email|required'"
            name="Email"
          >
          <span>{{ errors.first('Email') }}</span>
          <i class="fas fa-user" />
        </li>
        <li>
          <input
            type="password"
            placeholder="Password"
            v-model="newUser.password"
            v-validate="'min:12|max:16|required'"
            name="password"
            data-vv-as="密碼"
            ref="password"
          >
          <span>{{ errors.first('password') }}</span>
          <i class="fas fa-lock" />
        </li>
        <li>
          <input
            type="password"
            placeholder="Password Confirmation"
            v-model="newUser.passwordCheck"
            v-validate="'confirmed:password|required'"
            name="password_confiremation"
            data-vv-as="確認密碼"
          >
          <span>{{ errors.first('password_confiremation') }}</span>
        </li>
        <li>
          <input
            type="text"
            placeholder="Name"
            v-model="newUser.displayName"
            v-validate="'required'"
            data-vv-as="姓名"
            name="name"
          >
          <span>{{ errors.first('name') }}</span>
        </li>
        <li class="btnBar">
          <button class="register" @click="display = 'login'">
            Return
          </button>
          <button @click.prevent="signup">
            Submit
          </button>
        </li>
      </ul>
    </div>

    <div class="wrap fogotPassword" v-if="display === 'forgotPassword'">
      <h2>PASSWORD RESET</h2>
      <i class="close" @click="close">X</i>
      <ul>
        <li>
          <input
            type="text"
            placeholder="請輸入註冊時的 Email"
            v-model="resetEmail"
            v-validate="'email|required'"
            name="Email"
          >
          <span>{{ errors.first('Email') }}</span>
          <i class="fas fa-user" />
        </li>
        <li class="btnBar">
          <button class="register" @click="display = 'login'">
            Return
          </button>
          <button @click.prevent="forgotPasswordAndReset">
            Submit
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import firebasePlugins from '~/plugins/firebase';

const auth = firebasePlugins.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();
googleAuth.addScope('https://www.googleapis.com/auth/firebase.readonly');
auth.languageCode = 'zh-TW';

export default {
  data() {
    return {
      display: 'login',
      user: {},
      newUser: {},
      resetEmail: '',
    };
  },
  methods: {
    login() {
      this.$validator.validateAll().then((result) => {
        if (!result) { return; }
        this.$nuxt.$loading.start();
        // sign in
        auth.signInWithEmailAndPassword(this.user.email, this.user.password).then((response) => {
        // get idToken
          response.user.getIdToken().then((idToken) => {
          // post token to set session
            this.$store.dispatch('serverLogin', idToken);
            this.user = {};
          });
        }).catch((err) => {
          if (err.code === 'auth/user-not-found') {
            this.$swal.fire({
              title: '查無此用戶，請再次確認帳號密碼',
              icon: 'error',
            });
          }
          if (err.code === 'auth/wrong-password') {
            this.$swal.fire({
              title: '使用者帳號或密碼錯誤',
              icon: 'error',
            });
          }
          if (err.code === 'auth/invalid-email') {
            this.$swal.fire({
              title: '請輸入正確的 email 格式',
              icon: 'error',
            });
          }
          setTimeout(() => {
            this.$nuxt.$loading.finish();
          }, 500);
        });
      });
    },
    signup() {
      this.$validator.validateAll().then((result) => {
        if (!result) { return; }
        this.$nuxt.$loading.start();
        // create acount
        this.$axios.post('/api/user', {
          email: this.newUser.email,
          password: this.newUser.password,
          passwordCheck: this.newUser.passwordCheck,
          displayName: this.newUser.displayName,
        }).then((response) => {
        // console.log(response.data);
          if (!response.data.success) {
            this.$swal.fire({
              title: response.data.message,
              icon: 'error',
            });
            this.$nuxt.$loading.finish();
            return;
          }
          // Send Email Verification
          auth.signInWithEmailAndPassword(this.newUser.email, this.newUser.password)
            .then((res) => {
              if (res.user && !res.user.emailVerified) {
                res.user.sendEmailVerification().then(() => {
                  this.newUser = {};
                  this.$swal.fire({
                    title: '註冊成功，請驗證信箱並重新登入',
                    icon: 'success',
                  });
                }).catch((err) => {
                // 寄信出錯，註冊太多次被封鎖
                  this.$swal.fire({
                    title: err.message,
                    icon: 'error',
                  });
                  this.$swal.fire({
                    title: '寄送驗證信失敗，請重新登入並至會員頁面操作',
                    icon: 'error',
                  });
                });
              }
              this.$store.commit('OPENLOGINBOX', false);
              this.$nuxt.$loading.finish();
              this.signout();
            }).catch((err) => {
            // 登入出錯
              this.$swal.fire({
                title: err.message,
                icon: 'error',
              });
              this.$nuxt.$loading.finish();
            });
        });
      });
    },
    close() {
      this.display = 'login';
      this.user = {};
      this.newUser = {};
      this.$store.commit('OPENLOGINBOX', false);
    },
    forgotPasswordAndReset() {
      this.$validator.validateAll().then((result) => {
        if (!result) { return; }
        auth.sendPasswordResetEmail(this.resetEmail).then(() => {
          this.$swal.fire({
            title: '請至信箱重置密碼',
            icon: 'success',
          });
        }).catch((err) => {
          let { message } = err;
          if (err.code === 'auth/user-not-found') {
            message = '查無此註冊信箱';
          }
          this.$swal.fire({
            title: message,
            icon: 'error',
          });
        });
      });
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
    googleSignIn() {
      auth.signInWithPopup(googleAuth).then((result) => {
        // console.log(result);
        result.user.getIdToken().then((idToken) => {
          this.$store.dispatch('serverLogin', idToken);
        });
      }).catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: err.message,
        });
      });
    },
  },
  computed: {
    isOpen() {
      return this.$store.state.loginBoxOpen;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/sass/login';
</style>
