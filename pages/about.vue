<template>
  <div>
    <Navbar />
    <div class="about">
      <h1>What Chore ?</h1>
      <p>
        Chore（ちょぉぁ）は英語で、「お手伝い」「やること」「雑用」と訳されます。
        「Chore」は、習慣からくる言葉です。
      </p>
      <p>
        アメリカでは（もちろん家庭によりますが）子どもたちは決まったChoresがあり、
        「食器を洗う」「洗濯する」「ペットのごはん」など、内容はさまざまです。
        家事をするのは大人で、子どもたちは手伝うのではなく、家族の一員としてやるべき家事は自分の仕事であるという認識があるようです。
      </p>
      <p>
        このアプリをとおして、子どもの成長と責任、そして他者への貢献を感じさせてあげましょう！
      </p>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import Navbar from '~/components/Navbar'

export default {
  components:{
    Navbar
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push({ path: '/'})
      } else {

      }
    });
  }
}
</script>

<style lang="scss" scoped>
.about {
  width: 55vw;
  margin: 100px auto;
  padding: 30px;
  border-radius: 10px;
  background: white;
  font-size: 1.2em;
  letter-spacing: 2px;

  h1,
  p {
    margin: 15px;
  }
  @media screen and (max-width: 1024px) {
    width: 65vw;
  }
  @media screen and (max-width: 767px) {
    width: 95vw;
    padding: 3px;
    margin: 20px auto;
    letter-spacing: normal;
  }
}
</style>
