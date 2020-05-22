<template>
  <div class="login">
    <Img/>
    <Navbar />
    <div>
      <form class="login-form" @submit.prevent="tryLogin">
        <div class="title">
          <h2>Login</h2>
        </div>
        <div class="email-form">
          <label for="email" >Email :</label>
          <br />
          <input type="email" id="email" name="email" v-model="email"/>
        </div>
        <div class="password-form">
          <label for="password">Password :</label>
          <br />
          <input type="password" id="password" name="password" v-model="password"/>
        </div>
        <div class="feedback">{{ feedback }}</div>
        <button>Login</button>
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
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.$router.push({ path: '/chore'})
          })
          .catch(err => {
            this.feedback = err.message
          })
        this.feedback = null
      } else {
        this.feedback = 'メールアドレスとパスワードを記入して下さい。'
      }
    }
  }
}
</script>

<style>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 65vh;
  font-size: 1.2em;
}
.login-form .email-form,
.login-form .password-form {
  margin: 15px;
}
.email-form input,
.password-form input {
  border-radius: 30px;
  line-height: 20px;
  padding: 10px;
  transition: .1s;
}
.email-form input:hover,
.password-form input:hover{
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, .2);
}
.login-form .feedback {
  height: 35px;
  font-size: .7em;
  opacity: .7;
}
.login-form button {
  border-radius: 30px;
  width: 210px;
  padding: 5px;
  background: var(--sub-color);
  cursor: pointer;
  transition: .1s;
}
.login-form button:hover {
  box-shadow: 0 0 0 25px rgba(0, 0, 0, .05) inset;
}
.login-form button:active {
  box-shadow: 0 0 0 25px rgba(0, 0, 0, .2) inset;
}
</style>
