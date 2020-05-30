<template>
  <div class="chore">
    <Navbar/>
    <div class="explanation">
      <h3>{{ email }}さん</h3>
      <p>おてつだいをして、ポイントをためよう！</p>
    </div>
    <Result/>
    <div class="add-todo">
      <form @submit.prevent="addChore">
        <input type="text" v-model="title"/>
        <button title="おてつだいリストに追加します">+</button>
      </form>
    </div>
    <div class="todos-list">
      <ul v-for="todo in this.$store.state.chore.todos" :key="todo.id">
        <div class="todo">
          <img class="image" :src='todo.imgSrc' @click="changeImgSrc(todo)" alt="お手伝いイメージ" title="クリックするとアイコンを変更できます">
          <span class="title" :class="{edit: !todo.mode}" @click="startEditChore(todo)">{{ todo.title }}</span>
          <form class="title" :class="{edit:  todo.mode}" @submit.prevent="finishEditChore(todo)">
            <input type="text" v-model.trim="editTodo">
          </form>
          <span class="point">{{ todo.point }} pt
            <div>
              <i class="fas fa-angle-up" @click='incrementChorePoint(todo)' title="もらえるポイントを増やします"></i>
              <i class="fas fa-angle-down" @click='decrementChorePoint(todo)' title="もらえるポイントを減らします"></i>
            </div>
          </span>
          <i class="fas fa-check done" @click="addUsersPoints(todo.point), addChoreResult(todo)"
             title="このおてつだいができたらクリック！"></i>
          <i class="far fa-trash-alt fa-lg remove" @click="removeChore(todo.id)" title="このおてつだいを削除します"></i>
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
        editTodo: '',
        feedback: '',
        points: '',
        email: ''
      }
    },
    methods: {
      addChore() {
        this.$store.dispatch('chore/addChore', this.title)
        this.title = ''
      },
      removeChore(id) {
        this.$store.dispatch('chore/removeChore', id)
      },
      startEditChore(todo) {
        if (!this.editTodo) {
          this.editTodo = todo.title
          this.$store.dispatch('chore/editChoreTitle', todo)
        }
      },
      finishEditChore(todo) {
        if (this.editTodo) {
          const newTodo = {
            title: this.editTodo,
            point: todo.point,
            mode: todo.mode,
            id: todo.id
          }
          this.$store.dispatch('chore/editChoreTitle', newTodo)
        }
        this.editTodo = ''
      },
      incrementChorePoint(todo) {
        this.$store.dispatch('chore/incrementChorePoint', todo)
      },
      decrementChorePoint(todo) {
        this.$store.dispatch('chore/decrementChorePoint', todo)
      },
      addUsersPoints(point) {
        this.$store.dispatch('chore/addUsersPoints', point)
      },
      addChoreResult(todo) {
        const newTodo = {
          title: todo.title,
          point: todo.point,
          mode: todo.mode,
          id: todo.id,
          done: this.$moment().unix()
        }
        this.$store.dispatch('chore/addChoreResult', newTodo)
      },
      changeImgSrc(todo) {
        this.$store.dispatch('chore/changeImgSrc', todo)
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
  .add-todo {
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

    .feedback {
      margin-top: 40px;
      height: 35px;
      font-size: 1.4em;
      opacity: .7;
      color: red;
    }
  }

  .todos-list {
    margin: 0 15%;
    min-height: 80vh;
    display: grid;
    grid-template:
      'todo  todo  todo' 1fr
      'todo  todo  todo' 1fr
      'todo  todo  todo' 1fr
       / 1fr 1fr 1fr;
    gap: 20px;

    @media screen and (max-width: 1024px) {
      margin: 0 5%;
    }
    @media screen and (max-width: 767px) {
      margin: 0 10%;
      min-height: 80vh;
      display: grid;
      grid-template:
        'todo' 1fr
        'todo' 1fr
        'todo' 1fr
         / 1fr;
      gap: 20px;
    }
  }

  .todo {
    grid-area: todo;
    height: 100%;
    display: grid;
    grid-template:
      '... image image image ...' 1fr
      '... image image image ...' 1fr
      '... image image image ...' 1fr
      'title title title title title' 1fr
      'point point done ... remove' 1fr
       / 1fr 1fr 1fr 1fr 1fr;
    justify-items: stretch;
    align-items: center;
    background: white;
    box-shadow: 0px 1px 4px -1px silver;
    text-align: center;
    border-radius: 10px;
    padding: 10px;
    transition: .2s;

    input {
      height: 100%;
      width: 100%;
      padding: 2px 10px;
      line-height: 20px;
      border-radius: 10px;
      text-align: center;
      background: var(--base-color);
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, .2);
    }

    &:hover {
      background: rgb(250, 250, 250);
      box-shadow: 0 0 5px silver;
    }
  }

  .chore {
    .image {
      grid-area: image;
      justify-self: center;
      padding: 1vh 2vw;
      color: var(--dark-color);
      border-radius: 10px;
      box-shadow: 0 0 4px 0px silver;
    }

    .title {
      grid-area: title;
      align-self: start;
      cursor: text;
      font-size: 1.2em;
      border-radius: 10px;
      opacity: .9;
      transition: .1s;

      &:hover {
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, .2);
      }
    }

    .point {
      grid-area: point;
      justify-self: start;
      font-size: 1em;
      border-radius: 10px;
      background: var(--base-color);
      opacity: .7;

      i {
        padding: 4px;
        border-radius: 10px;
        cursor: pointer;
        transition: .1s;

        &:hover {
          background: silver;
        }

        &:active {
          background: rgb(133, 133, 133);
        }
      }
    }

    .done {
      grid-area: done;
      padding: 4px;
      border-radius: 20px;
      font-size: 1.4em;
      cursor: pointer;
      color: rgb(109, 223, 112);
      transition: .1s;

      &:hover {
        background: rgba(109, 223, 112, 0.6);
        font-size: 1.6em;
        border: 2px solid rgb(109, 223, 112);
      }

      &:active {
        color: white;
        background: rgb(109, 223, 112);
        font-size: 1.6em;
        border: 2px solid rgb(109, 223, 112);
      }
    }

    .remove {
      grid-area: remove;
      justify-self: end;
      align-self: center;
      padding: 13px 10px;
      background: var(--base-color);
      border-radius: 10px;
      cursor: pointer;
      opacity: 0.7;
      transition: .1s;

      &:hover {
        background: silver;
      }

      &:active {
        background: rgb(133, 133, 133);
      }
    }

    .edit {
      display: none;
    }
  }
</style>
