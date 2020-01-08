<template>
  <div class="signup">
    <form class="form-signin mt-4" @submit.prevent="signup">
      <h1 class="h3 mb-3 font-weight-normal mt-4">
        註冊
      </h1>
      <input
        id="inputEmail"
        v-model="userName"
        type="email"
        class="form-control"
        placeholder="Email address"
        required
      >

      <input
        id="inputPassword"
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Password"
        required
      >

      <input
        id="inputPasswordCheck"
        v-model="passwordCheck"
        type="password"
        class="form-control"
        placeholder="Password Check"
        required
      >

      <input
        id="inputName"
        v-model="displayName"
        type="text"
        class="form-control"
        placeholder="Name"
        required
      >

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign up
      </button>
      <p class="mt-5 mb-3 text-muted">
        &copy; 2017-2019
      </p>
    </form>
  </div>
</template>

<script>
// import firebase from 'firebase/app';

// const auth = firebase.auth();

export default {
  name: 'AdminSignup',
  data() {
    return {
      userName: '',
      password: '',
      displayName: '',
      passwordCheck: '',
    };
  },
  methods: {
    signup() {
    //   this.$store.commit('LOADINGCHANGE', true);
    //   // create acount
    //   this.axios.post(`${process.env.VUE_APP_APIURL}/api/user`, {
    //     email: this.userName,
    //     password: this.password,
    //     passwordCheck: this.passwordCheck,
    //     displayName: this.displayName,
    //   }).then((response) => {
    //     // console.log(response.data);
    //     if (!response.data.success) {
    //       this.$store.dispatch('updateMessage', {
    //         message: response.data.message,
    //         status: 'error',
    //       });
    //       this.$store.commit('LOADINGCHANGE', false);
    //       return;
    //     }
    //     // Send Email Verification
    //     auth.signInWithEmailAndPassword(this.userName, this.password)
    //       .then((res) => {
    //         if (res.user && !res.user.emailVerified) {
    //           res.user.sendEmailVerification().then(() => {
    //             this.userName = '';
    //             this.password = '';
    //             this.passwordCheck = '';
    //             this.displayName = '';
    //             this.$store.dispatch('updateMessage', {
    //               message: '註冊成功，請驗證信箱並重新登入',
    //               status: 'success',
    //             });
    //           }).catch((err) => {
    //             // 寄信出錯，註冊太多次被封鎖
    //             this.$store.dispatch('updateMessage', {
    //               message: err.message,
    //               status: 'error',
    //             });
    //             this.$store.dispatch('updateMessage', {
    //               message: '寄送驗證信失敗，請重新登入並至會員頁面操作',
    //               status: 'error',
    //             });
    //           });
    //         }
    //         this.$store.commit('OPENLOGINBOX', false);
    //         this.$store.commit('LOADINGCHANGE', false);
    //         this.signout();
    //       }).catch((err) => {
    //         // 登入出錯
    //         this.$store.dispatch('updateMessage', {
    //           message: err.message,
    //           status: 'error',
    //         });
    //         this.$store.commit('LOADINGCHANGE', false);
    //       });
    //   });
    },
    signout() {
    //   this.$store.commit('LOADINGCHANGE', true);
    //   auth.signOut().then(() => {
    //     this.axios.post(`${process.env.VUE_APP_APIURL}/api/logout`).then(() => {
    //       this.$store.commit('UPDATEUSER', {});
    //       this.$store.commit('UPDATECART', {
    //         carts: [],
    //       });
    //       setTimeout(() => {
    //         this.$store.commit('LOADINGCHANGE', false);
    //       }, 1000);
    //       if (this.$route.path.includes('account') || this.$route.path.includes('admin')
    //       || this.$route.path.includes('checkout')) {
    //         this.$router.replace('/');
    //       }
    //     });
    //   });
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
  margin-bottom: -1px;
  border-radius: 0;
}
.form-signin input[type="text"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
