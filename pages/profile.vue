<template>
  <div class="profile">
    <Navbar />
    <div class="explanation">
      <h3>リザルト</h3>
      <p>自分のポイントやおてつだいの履歴がみられるよ！</p>
    </div>
    <Result />
    <div class="users-result">
      <div class="chore-result">
        <div class="result-header">
          <span class="done">いつ</span>
          <span class="content">おてつだい内容</span>
          <span class="point">ポイント</span>
        </div>
        <ul v-for="(chore_result, index) in this.$store.state.chore.chore_result" :key="index">
          <span class="done">{{ chore_result.done }}</span>
          <span class="content">{{ chore_result.content }}</span>
          <span class="point">{{ chore_result.point }} pt</span>
        </ul>
      </div>
      <div class="reward-result">
        <div class="result-header">
          <span class="done">いつ</span>
          <span class="content">ごほうび内容</span>
          <span class="point">ポイント</span>
        </div>
        <ul v-for="(reward_result, index) in this.$store.state.chore.reward_result" :key="index">
          <span class="done">{{ reward_result.done }}</span>
          <span class="content">{{ reward_result.content }}</span>
          <span class="point">{{ reward_result.point }} pt</span>
        </ul>
      </div>
    </div>
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
  methods: {
    
  },
  created() {
    this.$store.dispatch('chore/init')
  },
}
</script>

<style>
.profile .users-result {
  width: 80vw;
  margin: 50px auto;
  display: flex;
  justify-content: space-around;
}
.profile .chore-result,
.profile .reward-result {
  width: 35vw;
  height: 60vh;
  margin: 10px;
  background: white;
}
.profile .result-header {
  background: var(--sub-color);
}
.profile .chore-result ul,
.profile .reward-result ul {
  list-style: none;
}
.profile .result-header,
.profile .chore-result ul,
.profile .reward-result ul {
  display: grid;
  grid-template:
    'done content point' 30px
    /100px 1fr    100px;
  border-bottom: dashed 1px silver;
  justify-items: center;
  align-items: end;
}
.chore-result .done, 
.reward-result .done{
  grid-area: done;
}
.chore-result ul>.content, 
.reward-result ul>.content{
  grid-area: content;
  justify-self: start;
}
.chore-result .point, 
.reward-result .point{
  grid-area: point;
}
</style>