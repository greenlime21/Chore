<template>
  <div class="chore">
    <Navbar />
    <div class="add-todo">
      <form @submit.prevent="add">
        <input type="text" id="add-todo" v-model="title"/>
        <button>+</button>
      </form>
    </div>
    <div class="todos-list">
      <ul v-for="todo in this.$store.state.chore.todos" :key="todo.id">
        <div class="todo">
          <span>imageicon</span>
          <span>{{ todo.title }}</span>
          <span>{{ todo.point }} pt</span>
          <span class="remove" @click="remove(todo.id)">×</span>
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
      title: ''
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
  padding: 10px;
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
  "todo  todo  todo" 1fr
  "todo  todo  todo" 1fr
  "todo  todo  todo" 1fr
  / 1fr 1fr 1fr;
  gap: 20px;
}
.todo {
  grid-area: todo;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 20px;
}
.todo:hover {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 5px silver;
}
.remove {
  cursor: pointer;
}
</style>




// <i class="fas fa-dog"></i>

// <i class="fas fa-bone"></i>

// <i class="fas fa-toilet"></i>

// <i class="fas fa-tshirt"></i>

// <i class="fas fa-bath"></i>