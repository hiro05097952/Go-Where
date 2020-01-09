<template>
  <div class="adminLogin">
    <form class="form-signin mt-4" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal mt-4">
        請先登入
      </h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        id="inputEmail"
        v-model="userName"
        type="email"
        class="form-control"
        placeholder="Email address"
        required
      >
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        id="inputPassword"
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Password"
        required
      >
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">
        &copy; 2017-2019
      </p>
    </form>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';

const auth = firebase.auth();

export default {
  data() {
    return {
      userName: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$nuxt.$loading.start();
      // sign in
      auth.signInWithEmailAndPassword(this.userName, this.password).then((response) => {
        // get idToken
        response.user.getIdToken().then((idToken) => {
          // post token to set session
          this.$nuxt.$loading.finish();
          this.$store.dispatch('serverLogin', { idToken });
        });
      }).catch((err) => {
        if (err.code === 'auth/user-not-found') {
          this.$store.dispatch('updateMessage', {
            message: '查無此用戶，請再次確認帳號密碼',
            status: 'error',
          });
        }
        if (err.code === 'auth/wrong-password') {
          this.$store.dispatch('updateMessage', {
            message: '使用者帳號或密碼錯誤',
            status: 'error',
          });
        }
        if (err.code === 'auth/invalid-email') {
          this.$store.dispatch('updateMessage', {
            message: '請輸入正確的 email 格式',
            status: 'error',
          });
        }
        setTimeout(() => {
          this.$nuxt.$loading.finish();
        }, 500);
      });
    },
    setAdmin() {
      this.$axios.post('/api/admin/user').then((response) => {
        this.$swal.fire({
          icon: response.data.success ? 'success' : 'error',
          title: response.data.message,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
