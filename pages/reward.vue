<template>
  <div class="reward">
    <Navbar />
    <div class="add-reward">
      <form @submit.prevent="addReward">
        <input type="text" id="add-reward" v-model="title" />
        <button title="ごほうびリストに追加します">+</button>
      </form>
    </div>
    <div class="reward-list">
      <h3>ごほうびリスト</h3>
      <p>お手伝いをしてポイントがたまったら、ごほうびと交換ができるよ！</p>
      <ul v-for="reward in this.$store.state.chore.rewards" :key="reward.id">
        <div class="reward-contents">
          <i class="far fa-star"></i>
          <span>
            <span>{{ reward.point }}pt</span>
            <i class="fas fa-angle-up" @click='incrementRewardPoint(reward)' title="ごほうびポイントを増やします"></i>
            <i class="fas fa-angle-down" @click='decrementRewardPoint(reward)' title="ごほうびポイントを減らします"></i>
          </span>
          <span>{{ reward.title }}</span>
          <span @click="removeReward(reward.id)">×</span>
        </div>
      </ul>
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
  data() {
    return {
      title: '',
      editReward: ''
    }
  },
  methods: {
    addReward(){
      this.$store.dispatch('chore/addReward', this.title)
      this.title = ''
    },
    removeReward(id){
      this.$store.dispatch('chore/removeReward', id)
    },
    // startEdit(reward) {
    //   this.editReward = reward.title
    //   this.$store.dispatch('chore/editRewardTitle', todo)
    // },
    incrementRewardPoint(reward){
      this.$store.dispatch('chore/incrementRewardPoint', reward)
    },
    decrementRewardPoint(reward){
      this.$store.dispatch('chore/decrementRewardPoint', reward)
    },
  },
  created() {
    this.$store.dispatch('chore/init')
  },
}
</script>

<style>
.add-reward {
  margin: 50px auto 20px auto;
  padding-bottom: 40px;
  text-align: center;
}
.add-reward input {
  border-radius: 30px;
  line-height: 20px;
  padding: 10px 15px;
}
.add-reward button {
  border-radius: 30px;
  width: 35px;
  padding: 5px;
  background: var(--sub-color);
  cursor: pointer;
  transition: .1s;
}
.add-reward button:hover {
  background: rgb(152, 207, 228);
}
.add-reward button:active {
  background: rgb(123, 190, 216);
}
.reward-list {
  margin: 0px auto;
  text-align: center;
}
.reward-list p{
  margin-bottom: 50px;
}
.reward-list .reward-contents {
  padding: 10px;
  margin: 10px auto;
  background: white;
  width: 40vw;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
}
</style>