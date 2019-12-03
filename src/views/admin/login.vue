<template>
  <div class="login">
    <form class="form-signin mt-4" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal mt-4">請先登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control"
        placeholder="Email address" required autofocus v-model="userName">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control"
        placeholder="Password" required v-model="password">
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <button class="btn btn-lg btn-primary btn-block" @click.prevent="check">確認登入</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';

const auth = firebase.auth();

export default {
  name: 'Admin_login',
  data() {
    return {
      userName: '',
      password: '',
    };
  },
  methods: {
    login() {
      auth.signInWithEmailAndPassword(this.userName, this.password).then((response) => {
        console.log(response.uid);
      }).catch((err) => {
        if (err.code === 'auth/user-not-found') {
          alert('查無此用戶，請再次確認帳號密碼');
        }
        if (err.code === 'auth/wrong-password') {
          alert('使用者帳號或密碼錯誤');
        }
      });
    },
    check() {
      // console.log(auth.currentUser.uid);
      auth.signOut();
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
