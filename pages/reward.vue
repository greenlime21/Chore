// 編集終了時のUIが悪い

<template>
  <div class="reward">
    <Navbar />
    <div class="explanation">
      <h3>ごほうびリスト</h3>
      <p>☆を押すとごほうびと交換ができるよ！</p>
    </div>
    <Result />
    <div class="add-reward">
      <form @submit.prevent="addReward">
        <input type="text" id="add-reward" v-model="title" />
        <button title="ごほうびリストに追加します">+</button>
      </form>
    </div>
    <div class="reward-list">
      <ul v-for="reward in this.$store.state.chore.rewards" :key="reward.id">
        <div class="reward-contents">
          <i class="far fa-star fa-lg" @click="subPoints( reward.point ), addRewardResult(reward)"></i>
          <span class="reward-title" :class="{edit: !reward.mode}" @click="startEditReward(reward)">{{ reward.title }}</span>
          <form class="reward-title" :class="{edit: reward.mode}" @submit.prevent="finishEditReward(reward)">
            <input type="text" v-model="editReward">
          </form>
          <span class="reward-point">{{ reward.point }}pt</span>
          <span class="reward-point-btn">
            <i class="fas fa-angle-up" @click='incrementRewardPoint(reward)' title="ごほうびポイントを増やします"></i>
            <i class="fas fa-angle-down" @click='decrementRewardPoint(reward)' title="ごほうびポイントを減らします"></i>
          </span>
          <i class="far fa-trash-alt remove fa-lg" @click="removeReward(reward.id)" title="このごほうびを削除します"></i>
        </div>
      </ul>
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
    Result
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
    startEditReward(reward){
      if(!this.editReward){
        this.editReward = reward.title
        this.$store.dispatch('chore/editRewardTitle', reward)
      }
    },
    finishEditReward(reward) {
      if(this.editReward){
        const newReward = {
          title: this.editReward,
          point: reward.point,
          mode : reward.mode,
          id   : reward.id
        }
        this.$store.dispatch('chore/editRewardTitle', newReward)
      }
      // else時の動作入れたい
      this.editReward = ""
    },
    incrementRewardPoint(reward){
      this.$store.dispatch('chore/incrementRewardPoint', reward)
    },
    decrementRewardPoint(reward){
      this.$store.dispatch('chore/decrementRewardPoint', reward)
    },
    subPoints(point) {
      this.$store.dispatch('chore/subPoints', point)
    },
    addRewardResult(reward){
      const newReward = {
        title: reward.title,
        point: reward.point,
        mode : reward.mode,
        id   : reward.id,
        done : this.$moment().unix()
      }
      this.$store.dispatch('chore/addRewardResult', newReward)
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
  transition: .1s;
}
.add-reward input:hover,
.add-reward input:focus {
  box-shadow: 0 0 1px 1px lightgray;
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
  height: 60px;
  padding: 10px;
  margin: 10px auto;
  background: white;
  width: 40vw;
  border-radius: 30px;
  display: grid;
  grid-template:
    'star title point btn trash' 1fr
    /1fr  6fr   1fr   1fr 1fr;
  justify-items: start;
  align-items: center;
}
.reward-list .fa-star {
  grid-area: star;
  background: rgb(254, 254, 93);
  padding: 10px 6px;
  border-radius: 20px;
  border: solid 2px var(--base-color);
  cursor: pointer;
  transition: .3s;
}
.reward-list .fa-star:hover {
  transform: scale(1.2);
}
.reward-list .reward-title {
  grid-area: title;
  font-size: 1.2em;
  cursor: pointer;
}
.reward-list .reward-title input {
  background: var(--base-color);
  width: 20vw;
  border-radius: 5px;
  padding: 2px;
}
.reward-list .edit {
  display: none;
}
.reward-list .reward-point {
  grid-area: point;
  justify-self: end;
  font-size: 1.2em;
  padding-right: 7px;
}
.reward-list .reward-point-btn {
  grid-area: btn;
  padding: 0 4px;
  background: var(--base-color);
  border-radius: 20px;
  cursor: pointer;
}
.reward-list .fas {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 0 3px;
  transition: .1s;
}
.reward-list .remove{
  grid-area: trash;
  justify-self: end;
  background: var(--base-color);
  padding: 10px 9px;
  border-radius: 20px;
  cursor: pointer;
  transition: .1s;
}
.reward-list .remove:hover,
.reward-list .fas:hover {
  background: silver;
}
.reward-list .remove:active,
.reward-list .fas:active {
  background: rgb(133, 133, 133);
}
</style>