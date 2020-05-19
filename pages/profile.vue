<template>
  <div class="profile">
    <Navbar />
    <div class="explanation">
      <h3>プロフィール</h3>
      <p>自分のポイントやおてつだいの履歴がみられるよ！</p>
    </div>
    <div class="profile-contents">
      <div class="profile-img">
        <img src="~/assets/profile.png">
      </div>
      <form class="profile-name" @submit.prevent>
        <input type="text" >
      </form>
    </div>

  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  },
}
</script>

<style>
.profile-img {
  width: 180px;
  height: 180px;
  margin: 8vh auto 10px auto;
  padding: 20px 0;
  text-align: center;
  background: white;
  border-radius: 100px;
  border: solid 1px silver;
}
.profile-name {
  text-align: center;
  font-size: 1.3em;
}
.profile-name input {
  text-align: center;
  border-radius: 5px;
  line-height: 42px;
}
  
</style>