<template>
  <div class="signup">
    <info></info>
    <form class="form-signin mt-4" @submit.prevent="signup">
      <h1 class="h3 mb-3 font-weight-normal mt-4">註冊</h1>
      <input type="email" id="inputEmail" class="form-control"
        placeholder="Email address" required autofocus v-model="userName">

      <input type="password" id="inputPassword" class="form-control"
        placeholder="Password" required v-model="password">

      <input type="password" id="inputPasswordCheck" class="form-control"
        placeholder="Password Check" required v-model="passwordCheck">

      <input type="text" id="inputName" class="form-control"
        placeholder="Name" required v-model="displayName">

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import info from '../components/tem_info.vue';

const auth = firebase.auth();

export default {
  name: 'Admin_signup',
  data() {
    return {
      userName: '',
      password: '',
      displayName: '',
      passwordCheck: '',
    };
  },
  components: {
    info,
  },
  methods: {
    signup() {
      const vm = this;
      // create acount
      this.axios.post(`${process.env.VUE_APP_APIURL}/api/user`, {
        email: this.userName,
        password: this.password,
        passwordCheck: this.passwordCheck,
        displayName: this.displayName,
      }).then((response) => {
        // console.log(response.data);
        if (!response.data.success) {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
        }
        // Send Email Verification
        auth.signInWithEmailAndPassword(this.userName, this.password).then((res) => {
          // console.log('user: ', res.user);
          if (res.user && !res.user.emailVerified) {
            res.user.sendEmailVerification().catch((err) => {
              // console.log('emailverification: ', err);
              vm.$store.dispatch('updateMessage', {
                message: err.message,
                status: 'danger',
              });
            });
          }
        }).catch((err) => {
          console.log(err);
        });
        // this.$router.push('/');
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
  margin-bottom: -1px;
  border-radius: 0;
}
.form-signin input[type="text"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
