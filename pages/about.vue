<template>
  <div>
    <Navbar />
    <div class="about">
      <h1>About Chore</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum placeat harum voluptatum error? Ex provident optio odio qui, nostrum asperiores eligendi totam accusamus, non repellat tenetur amet porro eaque cupiditate.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum placeat harum voluptatum error? Ex provident optio odio qui, nostrum asperiores eligendi totam accusamus, non repellat tenetur amet porro eaque cupiditate.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum placeat harum voluptatum error? Ex provident optio odio qui, nostrum asperiores eligendi totam accusamus, non repellat tenetur amet porro eaque cupiditate.
      </p>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components:{
    Navbar
  },

}
</script>

<style>
.about {
  width: 600px;
  margin: 100px auto;
  padding: 30px;
  border-radius: 20px;
  background: white;
}
.about{
  font-size: 1.2em;
}
  
</style>