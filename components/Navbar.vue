<template>
  <div class="navbar">
    <nav>
      <div class="logo">
        <router-link to="/">
          <h1>Chore!</h1>
        </router-link>
      </div>
      <ul class="nav-links">
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
      <div class="burger" :class="{ 'burger-active': status }" @click="navSlide()">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </nav>
  </div>
</template>


<script>
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
  /* スクロールバーによってNavbarがずれるのを防ぐ */
  width: calc(100vw - 15px);
}
.logo {
  font-size: 1.6em;
  letter-spacing: 5px;
}
.nav-links {
  display: flex;
  width: 40%;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  font-size: 1.2em;
  letter-spacing: 1px;
}
.burger {
  display: none;
  cursor: pointer;
}
.burger div {
  width: 30px;
  height: 3px;
  background: var(--point-color);
  margin: 6px 0;
  border-radius: 2px;
}
@media screen and (max-width: 768px) {
  .nav-links {
    font-size: .7em;
    width: 50%;
  }
}
@media screen and (max-width: 1024px) {
  .nav-links {
    width: 50%;
  }
}
/* @media screen and (max-width: 767px) {
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
  .navbar li {
    opacity: 0;
  }
}
.burger-active {
  transform: translateX(0%);
} */
</style>
