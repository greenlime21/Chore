<template>
  <div class="reward">
    <Navbar/>
    <div class="explanation">
      <h3>{{ email }}さん</h3>
      <p>☆を押すとごほうびと交換ができるよ！</p>
    </div>
    <Result/>
    <div class="add-reward">
      <form @submit.prevent="addReward">
        <input type="text" v-model="title"/>
        <button title="ごほうびリストに追加します">+</button>
      </form>
    </div>
    <div class="reward-list">
      <ul v-for="reward in this.$store.state.chore.rewards" :key="reward.id">
        <div class="reward-contents">
          <i class="far fa-star fa-lg" @click="subUsersPoints( reward.point ), addRewardResult(reward)"></i>
          <span class="reward-title" :class="{edit: !reward.mode}"
                @click="startEditReward(reward)">{{ reward.title }}</span>
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
        editReward: '',
        email: ''
      }
    },
    methods: {
      addReward() {
        this.$store.dispatch('chore/addReward', this.title)
        this.title = ''
      },
      removeReward(id) {
        this.$store.dispatch('chore/removeReward', id)
      },
      startEditReward(reward) {
        if (!this.editReward) {
          this.editReward = reward.title
          this.$store.dispatch('chore/editRewardTitle', reward)
        }
      },
      finishEditReward(reward) {
        if (this.editReward) {
          const newReward = {
            title: this.editReward,
            point: reward.point,
            mode: reward.mode,
            id: reward.id
          }
          this.$store.dispatch('chore/editRewardTitle', newReward)
        }
        this.editReward = ''
      },
      incrementRewardPoint(reward) {
        this.$store.dispatch('chore/incrementRewardPoint', reward)
      },
      decrementRewardPoint(reward) {
        this.$store.dispatch('chore/decrementRewardPoint', reward)
      },
      subUsersPoints(point) {
        this.$store.dispatch('chore/subUsersPoints', point)
      },
      addRewardResult(reward) {
        const newReward = {
          title: reward.title,
          point: reward.point,
          mode: reward.mode,
          id: reward.id,
          done: this.$moment().unix()
        }
        this.$store.dispatch('chore/addRewardResult', newReward)
      }
    },
    created() {
      this.$store.dispatch('chore/init')

      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$router.push({ path: '/' })
        } else {
          this.email = user.email
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .add-reward {
    margin: 50px auto 20px auto;
    padding-bottom: 40px;
    text-align: center;

    input {
      border-radius: 30px;
      line-height: 20px;
      padding: 10px 15px;
      transition: .1s;

      &:hover,
      &:focus {
        box-shadow: 0 0 1px 1px lightgray;
      }
    }

    button {
      border-radius: 30px;
      width: 35px;
      padding: 5px;
      background: var(--sub-color);
      cursor: pointer;
      transition: .1s;

      &:hover {
        background: rgb(152, 207, 228);
      }

      &:active {
        background: rgb(123, 190, 216);
      }
    }
  }

  .reward-list {
    margin: 0px auto;
    text-align: center;

    p {
      margin-bottom: 50px;
    }

    .reward-contents {
      height: 60px;
      padding: 10px;
      margin: 10px auto;
      background: white;
      width: 40vw;
      border-radius: 30px;
      display: grid;
      grid-template:
        'star title point btn trash' 1fr
        /1fr 6fr 1fr 1fr 1fr;
      justify-items: start;
      align-items: center;

      @media screen and (max-width: 1200px) {
        width: 70vw;
      }
      @media screen and (max-width: 767px) {
        width: 98vw;
      }

      .fa-star {
        grid-area: star;
        background: rgb(254, 254, 93);
        padding: 10px 6px;
        border-radius: 20px;
        border: solid 2px var(--base-color);
        cursor: pointer;
        transition: .3s;

        &:hover {
          transform: scale(1.2);
        }
      }
    }

    .reward-title {
      grid-area: title;
      font-size: 1.2em;
      cursor: pointer;

      input {
        background: var(--base-color);
        width: 20vw;
        border-radius: 5px;
        padding: 2px;

        @media screen and (max-width: 1200px) {
          width: 40vw;
        }
        @media screen and (max-width: 767px) {
          width: 50vw;
        }
      }
    }

    .edit {
      display: none;
    }

    .reward-point {
      grid-area: point;
      justify-self: end;
      font-size: 1.2em;
      padding-right: 7px;
    }

    .reward-point-btn {
      grid-area: btn;
      padding: 0 4px;
      background: var(--base-color);
      border-radius: 20px;
      cursor: pointer;
    }

    .fas {
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      padding: 0 3px;
      transition: .1s;
    }

    .remove {
      grid-area: trash;
      justify-self: end;
      background: var(--base-color);
      padding: 10px 9px;
      border-radius: 20px;
      cursor: pointer;
      transition: .1s;
    }

    .remove:hover,
    .fas:hover {
      background: silver;
    }

    .remove:active,
    .fas:active {
      background: rgb(133, 133, 133);
    }
  }
</style>
