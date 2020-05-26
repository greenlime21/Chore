<template>
  <div class="login">
    <Img/>
    <Navbar />
    <div>
      <form class="login-form" @submit.prevent="tryLogin">
        <div class="title">
          <h2>Login</h2>
        </div>
        <div class="form">
          <label for="email" >Email :</label>
          <br />
          <input type="email" id="email" name="email" v-model="email"/>
        </div>
        <div class="form">
          <label for="password">Password :</label>
          <br />
          <input type="password" id="password" name="password" v-model="password"/>
        </div>
        <div class="feedback">{{ feedback }}</div>
        <button :class="{ success : login_success}">{{ button_title }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import Navbar from '~/components/Navbar.vue'
import Img from '~/components/Img.vue'

export default {
  data() {
    return {
      email: 'chore@chore.com',
      password: 'chorechore',
      button_title:  'Login',
      login_success: false,
      feedback: '',
    }
  },
  components: {
    Navbar,
    Img
  },
  methods: {
    tryLogin() {
      if (this.email && this.password) {
        this.button_title = 'Please wait...'
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.button_title = 'Success'
            this.login_success = true
            this.$router.push({ path: '/chore'})
          })
          .catch(err => {
            this.feedback = err.message
            this.button_title = 'Login'
          })
        this.feedback = null
      } else {
        this.feedback = 'メールアドレスとパスワードを記入して下さい。'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 65vh;
  font-size: 1.2em;

  .form {
    margin: 15px;

    input {
      border-radius: 30px;
      line-height: 20px;
      padding: 10px;
      transition: .1s;

      &:hover {
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, .2);
      }
    }
  }
  .feedback {
    height: 35px;
    font-size: .7em;
    opacity: .7;
  }
  button {
    border-radius: 30px;
    width: 210px;
    padding: 5px;
    background: var(--sub-color);
    cursor: pointer;
    transition: .1s;

    &:hover {
      box-shadow: 0 0 0 25px rgba(0, 0, 0, .05) inset;
    }
    &:active {
      box-shadow: 0 0 0 25px rgba(0, 0, 0, .2) inset;
    }
  }
}
.success {
  background: rgb(0, 255, 8) !important;
}
</style>
