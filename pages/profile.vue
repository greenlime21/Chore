<template>
  <div class="profile">
    <Navbar />
    <div class="explanation">
      <h3>リザルト</h3>
      <p>自分のポイントやおてつだいの履歴がみられるよ！</p>
    </div>
    <Result />
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import Navbar from '~/components/Navbar'
import Result from '~/components/Result'


export default {
  components: {
    Navbar,
    Result,
  },
}
</script>

<style>
</style>