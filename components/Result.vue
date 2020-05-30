<template>
  <div class="result">
    <ul class="points" v-for="(users, index) in this.$store.state.chore.users" :key="index">
      <li>TOTAL : {{ users.points }} points</li>
    </ul>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('chore/init')
    }
  }
</script>

<style lang="scss" scoped>
  .result .points {
    margin: 0 auto;
    text-align: center;
    width: 220px;
    font-size: 1.5em;
    border-bottom: solid 1px silver;
    list-style: none;
  }
</style>
