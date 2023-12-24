<template>
  <div class="electronic-partList-wrapper">
    <div class="list-wrapper" v-for="gameItem in real" :key="gameItem.depotCode">
      <div class="game-type"  v-if="gameItem.renderList && gameItem.depotCode !== 'OBLI'">
        <div class="game-classify">
          <div class="title-box">
            <img class="logo" :src="require(`./img/logo_${gameItem.depotCode.toLowerCase()}.png`)" :alt="$t('图片加载失败')" />
            <div class="title">
              <div>{{gameItem.title}}</div>
              <div class="en-title">{{gameItem.enTxt}}</div>
            </div>
          </div>
          <div @click="goAllList(gameItem)" class="go-btn">
            <div class="more-left">
              <span>{{$t('查看更多')}}</span>
              <img class="more-arrows" src="../electronic/img/more_arrows.png" alt="">
            </div>
            <!-- <img class="more-button" src="../electronic/img/more_button.png" alt=""> -->
          </div>
        </div>
        <div class="game-list">
          <div :key="index" class="game-item-wrap" v-for="(dataItem, index) in gameItem.renderList.slice(0,5)" @click="$emit('enterGame', dataItem)">
            <img class="game-pic" :src="dataItem.logo" :alt="$t('图片加载失败')" />
            <div class="masker animate__fadeIn animate__animated">
              <div class="game-name">
                <div class="game-title">{{ dataItem.gameName }}</div>
                <!-- <div class="game-context">丰富的游戏类型，让您尽情享受。</div> -->
                <div class="game-context" v-if="dataItem.tableCode">{{$t('桌号：')}}{{dataItem.tableCode || $t('无')}}</div>
              </div>
              <span class="enter-btn">{{$t('进入游戏')}}</span>
            </div>
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
    real: Array,
  },
  computed:{
 ...mapState({
      token: state => state.user.token,
    }),
  },
  methods: {
    ...mapMutations('game',['set_real_depotCode']),
    goAllList ({depotCode}) {
      this.set_real_depotCode(depotCode)
      this.$router.push('/real/selectList');
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./css/partList.scss";
</style>
