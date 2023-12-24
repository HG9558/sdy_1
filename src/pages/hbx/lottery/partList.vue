<template>
  <div class="electronic-partList-wrapper">
    <div class="list-wrapper" v-for="gameItem in lottery" :key="gameItem.depotCode">
      <div class="game-type">
        <div class="game-classify">
          <div class="title-box">
            <img class="logo" :src="require(`./img/logo_${gameItem.depotCode}.png`)" alt="图片加载失败" />
            <div class="title">
              <div>{{gameItem.title}}</div>
              <div class="en-title">{{gameItem.enTxt}}</div>
            </div>
          </div>
          <div @click="goAllList(gameItem)" class="go-btn" v-if="gameItem.depotCode !== 'GYHK'">
            <div class="more-left">
              <span>查看更多</span>
              <img class="more-arrows" src="../electronic/img/more_arrows.png" alt="">
            </div>
            <img class="more-button" src="../electronic/img/more_button.png" alt="">
          </div>
        </div>
        <div class="game-list" v-if="gameItem.renderList">
          <div :key="index" class="game-item-wrap" v-for="(dataItem, index) in gameItem.renderList.slice(0,5)" @click="$emit('enterGame', dataItem)">
            <div class="top-container">
              <img class="game-pic" v-if="gameItem.depotCode !== 'GYHK'" :src="dataItem.logo" alt="图片加载失败" />
              <img class="game-pic" v-else src="./img/hbx-lottery.png" alt="浩博彩票"> 
            </div>
            <div class="masker animate__fadeIn animate__animated">
              <div class="game-name">
                <div class="game-title" v-if="gameItem.depotCode !== 'GYHK'">{{ dataItem.gameName }}</div>
                <div class="game-title" v-else>浩博彩票</div>
                <div class="game-context">丰富的游戏类型，让您尽情享受。</div>
              </div>
              <span class="enter-btn"></span>
            </div>
            <img v-if="dataItem.isTry == 1 && !token" class="try" src="../electronic/img/entry_try.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "partList",

  props: {
    lottery: Array,
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
    }),
  },
  methods: {
    ...mapMutations('game', ['set_lottery_depotCode']),
    goAllList ({ depotCode }) {
      this.set_lottery_depotCode(depotCode)
      this.$router.push('/lottery/selectList');
    },
    scrollTOGame() {
      this.$nextTick(()=>{
        const { code } = this.$route.query
        if(code) window.scrollTo(0, 550)
      }) 
    }
  },
  mounted() { 
    this.scrollTOGame()
  }
}
</script>

<style lang="scss" scoped>
@import "./css/partList.scss";
</style>