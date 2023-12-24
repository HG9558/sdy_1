<template>
  <div class="sabong-container"> 
    <div class="container">

      <div class="game-left-box">
        <img class="game-title-img" src="./img/title-sabong.png" alt="">
        <p class="game-intr-txt"> {{ sloginsData.SABONG }} </p>
        <p class="game-start-txt"> <i class="el-icon-time"></i> {{ renderList[currentSelectIndex].memo }} </p>
        <div class="special-entry" @click="enterGame"></div> 
      </div>
      <img class="sabong-main-pic" :src="require(`./img/${renderList[currentSelectIndex].depotCode.toLowerCase()}.png`)" alt="">
    </div>

  </div>
</template>

<script>
import SpecialLayout from 'commonComponent/SpecialLayout/SpecialLayout.vue';
import { mapState } from "vuex";
import playGameMixin from '../../../common/mixin/playGameMixin';
export default {
  name: "sabong",
  mixins: [playGameMixin],
  components: {
    SpecialLayout,
  }, 
  data () {
    return {
      sloginsData: {
        SABONG: "精彩刺激的在线斗鸡博彩", 
      },
      currentSelectIndex: 0,
    }
  },
  computed: {
    ...mapState({
      sabong: state => state.game.sabong,
    }),
    renderList () { 
      if (!this.sabong.length) {
        return [];
      } 
      return JSON.parse(JSON.stringify(this.sabong)).map(item => {
        item.sloginsData = this.sloginsData[item.depotCode]; 
        return item
      })
    }
  },
  methods: {
    enterGame() {
      this._enterGame(this.renderList[0]);
    }
  }
};
</script>
<style lang="scss" scoped> 
@import './index.scss';
</style>
