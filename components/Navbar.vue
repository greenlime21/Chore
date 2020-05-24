<template>
  <div class="navbar">
    <nav>
      <div class="logo">
        <router-link to="/">
          <h1 @click="signOut">Chore!</h1>
        </router-link>
      </div>
      <ul class="nav-links" :class="{ 'burger-active': status }">
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/chore">Chore</router-link>
        </li>
        <li>
          <router-link to="/reward">Reward</router-link>
        </li>
        <li>
          <router-link to="/profile">Profile</router-link>
        </li>
      </ul>
      <div class="burger" :class="{ 'toggle': status }" @click="navSlide()">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </nav>
  </div>
</template>


<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      status: false
    }
  },
  methods: {
    navSlide() {
      this.status = !this.status
      console.log(this.status)
    },
    signOut() {
      firebase.auth().signOut()
    }
  }
}
</script>

<style>
.navbar a {
  text-decoration: none;
  color: var(--point-color);
}
.navbar nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 60px;
  min-height: 8vh;
  background: var(--sub-color);
}
.logo {
  font-size: 1.6em;
  letter-spacing: 5px;
}
.logo:hover{
  opacity: .7;
}
.nav-links {
  display: flex;
  width: 40%;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  font-size: 1.2em;
  letter-spacing: 1px;
  transition: .2s;
}
.nav-links .nuxt-link-active {
  font-weight: bold;
  font-size: 1.1em;
}
.burger {
  display: none;
  cursor: pointer;
}
.burger div {
  width: 30px;
  height: 2px;
  background: var(--point-color);
  margin: 6px 0;
  border-radius: 2px;
  transition: .2s;
}
@media screen and (max-width: 1024px) {
  .nav-links {
    width: 60%;
  }
}
@media screen and (max-width: 767px) {
  .nav-links {
    position: absolute;
    right: 0px;
    height: 40vh;
    width: 50%;
    top: 8vh;
    background: rgba(189, 227, 242, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateX(100%);
  }
  .burger {
    display: block;
  }
}
.burger-active {
  transform: translateX(0%);
}

.toggle .line1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}
.toggle .line2 {
  opacity: 0;
}
.toggle .line3 {
  transform: rotate(45deg) translate(-5px, -6px);
}
</style>
