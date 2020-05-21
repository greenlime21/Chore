<template>
  <div>
    <Navbar />
    <div class="about">
      <h1>About Chore</h1>
      <p>
        Chore（ちょぉぁ）は英語で、「お手伝い」「やること」「雑用」と訳されたりします。
        「Chore」は、習慣からくる言葉です。
      </p>
      <p>
        アメリカでは（もちろん家庭によりますが）子どもたちは決まったChoresがあるようです。
        「食器を洗う」「洗濯する」「ペットのごはん」など、内容はさまざまです。
        家事をするのは大人で、子どもたちは手伝うのではなく、家族の一員としてやるべき家事は自分の仕事であるという認識がたかいようです。
      </p>
      <p>
        このアプリを使用して、子どもの成長と責任、そして他者への貢献を感じさせてあげましょう！
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
  width: 55vw;
  margin: 100px auto;
  padding: 30px;
  border-radius: 10px;
  background: white;
}
.about{
  font-size: 1.2em;
}
  
</style>