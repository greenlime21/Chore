<template>
  <div class="chore">
    <Navbar />
    <div class="add-todo">
      <form @submit.prevent="add">
        <input type="text" id="add-todo" v-model="title" />
        <button>+</button>
      </form>
    </div>
    <div class="todos-list">
      <ul v-for="todo in this.$store.state.chore.todos" :key="todo.id">
        <div class="todo">
          <i class="fas fa-tshirt icon"></i>
          <span class="title" :class="{edit: !todo.mode}" @click="startEdit(todo)">{{ todo.title }}</span>
          <form class="title" :class="{edit: todo.mode}"  @submit.prevent="finishEdit(todo)">
            <input type="text" v-model.trim="editTodo">
          </form>
          <span  class="point">{{ todo.point }} pt 
            <i class="fas fa-angle-up" @click='incPoint(todo)'></i>
            <i class="fas fa-angle-down" @click='decPoint(todo)'></i>
          </span>
          <i class="far fa-trash-alt remove" @click="remove(todo.id)"></i>
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
      editTodo: '',
      feedback: ''
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
      this.editTodo = todo.title
      this.$store.dispatch('chore/editTitle', todo)
    },
    finishEdit(todo) {
      if(this.editTodo){
        const newTodo = {
          title: this.editTodo,
          point: todo.point,
          mode: todo.mode,
          id: todo.id
        }
        this.$store.dispatch('chore/editTitle', newTodo)
      }
      // else時の動作入れたい
    },
    incPoint(todo){
      this.$store.dispatch('chore/incrementPoint', todo)
    },
    decPoint(todo){
        this.$store.dispatch('chore/decrementPoint', todo)
    },
  },
  created() {
    this.$store.dispatch('chore/init')
  }
}
</script>

<style>
.add-todo {
  margin: 30px auto;
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
    '...  icon  icon  icon ...' 1fr
    '...  icon  icon  icon ...' 1fr
    '...  icon  icon  icon ...' 1fr
    '...  title title title ...' 1fr
    'point ...  ... ... remove' 1fr
    / 1fr 1fr 1fr 1fr 1fr;
  justify-items: stretch;
  align-items: center;
  background: white;
  text-align: center;
  border-radius: 20px;
  padding: 10px;
}
.todo:hover {
  background: rgb(250, 250, 250);
  box-shadow: 0 0 5px silver;
}
.chore .icon {
  grid-area: icon;
  font-size: 5vw;
  padding: 5px;
  color: var(--sub-color);
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
.chore .point {
  grid-area: point;
  font-size: 1em;
  background: var(--base-color);
  border-radius: 30px;
  padding: 6px 3px;
  opacity: .7;
}
.chore .remove {
  grid-area: remove;
  padding: 8px;
  font-size: 1.4vw;
  background: var(--base-color);
  border-radius: 30px;
  cursor: pointer;
  opacity: 0.7;
}
.chore .edit {
  display: none;
}
.todo input {
  height: 100%;
  width: 100%;
  padding: 2px 10px;
  line-height: 20px;
  font-size: 0.9em;
  background: rgba(0, 0, 0, 0)
}
</style>

// <i class="fas fa-dog"></i>

// <i class="fas fa-bone"></i>

// <i class="fas fa-toilet"></i>

// <i class="fas fa-tshirt"></i>

// <i class="fas fa-bath"></i>
