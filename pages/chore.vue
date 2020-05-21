// お手伝いのイメージ画像がランダムに出るようにする
// todoの文字数が多いと見たい目が崩れる

<template>
  <div class="chore">
    <Navbar />
    <div class="explanation">
      <h3>おてつだいリスト</h3>
      <p>おてつだいをすると、ポイントがたまるよ！</p>
    </div>
    <Result />
    <div class="add-todo">
      <form @submit.prevent="add">
        <input type="text" id="add-todo" v-model="title" />
        <button title="おてつだいリストに追加します">+</button>
      </form>
    </div>
    <div class="todos-list">
      <ul v-for="todo in this.$store.state.chore.todos" :key="todo.id">
        <div class="todo">
          <img class="image" :src='imgSrc' alt="お手伝いイメージ">
          <span class="title" :class="{edit: !todo.mode}" @click="startEdit(todo)"> {{ todo.title }} </span>
          <form class="title" :class="{edit:  todo.mode}" @submit.prevent="finishEdit(todo)">
            <input type="text" v-model.trim="editTodo">
          </form>
          <span class="point"> {{ todo.point }} pt
            <div>
              <i class="fas fa-angle-up" @click='incPoint(todo)' title="もらえるポイントを増やします"></i>
              <i class="fas fa-angle-down" @click='decPoint(todo)' title="もらえるポイントを減らします"></i>
            </div>
          </span>
          <i class="fas fa-check done" title="このおてつだいができたらクリック！" @click="addPoints(todo.point), addChoreResult(todo)"></i>
          <i class="far fa-trash-alt fa-lg remove" @click="remove(todo.id)" title="このおてつだいを削除します"></i>
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
      title   : '',
      editTodo: '',
      feedback: '',
      points  : '',
      imgSrc: `/chore/img4.png`
    }
  },
  methods: {
    add() {
      this.$store.dispatch('chore/add', this.title)
      this.title = ''
    },
    remove(id) {
      this.$store.dispatch('chore/remove', id)
    },
    startEdit(todo) {
      if(!this.editTodo){
        this.editTodo = todo.title
        this.$store.dispatch('chore/editTitle', todo)
      }
    },
    finishEdit(todo) {
      if(this.editTodo){
        const newTodo = {
          title: this.editTodo,
          point: todo.point,
          mode : todo.mode,
          id   : todo.id
        }
        this.$store.dispatch('chore/editTitle', newTodo)
      }
      // else時の動作入れたい
      this.editTodo = ""
    },
    incPoint(todo){
      this.$store.dispatch('chore/incrementPoint', todo)
    },
    decPoint(todo){
      this.$store.dispatch('chore/decrementPoint', todo)
    },
    addPoints(point){
      this.$store.dispatch('chore/addPoints', point)
    },
    addChoreResult(todo){
      const newTodo = {
        title: todo.title,
        point: todo.point,
        mode : todo.mode,
        id   : todo.id,
        done : this.$moment().unix()
      }
      this.$store.dispatch('chore/addChoreResult', newTodo)
    },
  },
  created() {
    this.$store.dispatch('chore/init')
  },
}
</script>

<style>
.add-todo {
  margin: 50px auto 20px auto;
  padding-bottom: 40px;
  text-align: center;
}
.add-todo input {
  border-radius: 30px;
  line-height: 20px;
  padding: 10px 15px;
}
.add-todo button {
  border-radius: 30px;
  width: 35px;
  padding: 5px;
  background: var(--sub-color);
  cursor: pointer;
  transition: .1s;
}
.add-todo .feedback {
  margin-top: 40px;
  height: 35px;
  font-size: 1.4em;
  opacity: .7;
  color: red;
}
.add-todo button:hover {
  background: rgb(152, 207, 228);
}
.add-todo button:active {
  background: rgb(123, 190, 216);
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
}
.todo {
  grid-area: todo;
  height: 100%;
  display: grid;
  grid-template:
    '...  image  image  image ...' 1fr
    '...  image  image  image ...' 1fr
    '...  image  image  image ...' 1fr
    '...  title  title  title ...' 1fr
    'point point done   ...   remove' 1fr
    / 1fr 1fr 1fr 1fr 1fr;
  justify-items: stretch;
  align-items: center;
  background: white;
  box-shadow:0px 1px 4px -1px silver;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  transition: .2s;
}
.todo:hover {
  background: rgb(250, 250, 250);
  box-shadow: 0 0 5px silver;
}
.chore .image {
  grid-area: image;
  justify-self: center;
  padding: 3vh 4vw;
  color: var(--dark-color);
  border-radius: 10px;
  box-shadow: 0 0 10px 5px rgba(250, 250, 250);
}
.chore .title {
  grid-area: title;
  cursor: text;
  font-size: 1.2em;
  background: var(--base-color);
  border-radius: 10px;
  opacity: .9;
}
.todo input {
  height: 100%;
  width: 100%;
  padding: 2px 10px;
  line-height: 20px;
  border-radius: 10px;
  text-align: center;
  background: silver;
}
.chore .point {
  grid-area: point;
  justify-self: start;
  font-size: 1em;
  border-radius: 10px;
  background: var(--base-color);
  opacity: .7;
}
.chore .point i {
  padding: 4px;
  border-radius: 10px;
  cursor: pointer;
  transition: .1s;
}
.chore .done {
  grid-area: done;
  padding: 4px;
  border-radius: 20px;
  font-size: 1.4em;
  cursor: pointer;
  color: rgb(109, 223, 112);
  transition: .1s;
}
.chore .done:hover {
  background: rgba(109, 223, 112, 0.6);
  font-size: 1.6em;
  border: 2px solid rgb(109, 223, 112);
}
.chore .done:active {
  color: white;
  background: rgb(109, 223, 112);
  font-size: 1.6em;
  border: 2px solid rgb(109, 223, 112);
}
.chore .remove {
  grid-area: remove;
  justify-self: end;
  align-self: center;
  padding: 13px 10px;
  background: var(--base-color);
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.7;
  transition: .1s;
}
.chore .point i:hover,
.chore .remove:hover{
  background: silver;
}
.chore .point i:active,
.chore .remove:active{
  background: rgb(133, 133, 133);
}
.chore .edit {
  display: none;
}
</style>