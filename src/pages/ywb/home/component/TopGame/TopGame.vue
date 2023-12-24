<template>
  <div class="top-game">
    <TitleSection type="game" />
    <div class="type-chose">
      <div class="type" v-for="(item, index) in renderList" :key="index" @click="changeClassify(item.type,index)" :class="{'type-div' :selectIndex === index}">
        <div class="type-logo">{{ item.title }}</div>
      </div>
    </div>
    <div class="content-container">
      <div class="dn-bg">
        <img :src="require(`../../img/topGame/${gameItemData.type}_logo.png`)" :class="`plat-logo animate__fadeIn animate__animated ${gameItemData.type}-logo`">
        <div class="right-box">
          <div class="one">
            <div class="one-1">{{ gameItemData.gameNameTitle }}</div>
            <div class="one-2">{{ gameItemData.gameNameEnglish }}</div>
          </div>
          <div class="three">
            {{ gameItemData.gameInner }}
          </div>
        </div>
      </div>
      <div class="plat-content-box">
        <div class="game-item" :class="{'is-click':selectGameIndex===index}" v-for="(item, index) in renderList[selectIndex].gameList" :key="index" @click="goTargetGame(item,index)">
          <div v-show="item.isTry === 1 && item.availableWh === 1 && !token" class="game-item-mark try">
            <span>{{$t('可试玩')}}</span>
          </div>
          <div v-show="item.availableWh === 2" class="game-item-mark maintain">
            <span>{{$t('维护中')}}</span>
          </div>
          <div class="game-icon-box" :class="selectGameIndex===index ? 'game-icon-box_on' : ''">
            <img :class="`${selectType}_${item.depotCode.toLowerCase()}`" :src="require(`./images/${selectType}_${item.depotCode.toLowerCase()}.png`)"  />
          </div>
          <span class="game-name">{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleSection from '../TitleSection'
import { hotGameList } from "static_data/game_data"
import playGameMixin from "../../../../../common/mixin/playGameMixin";
import { mapState, mapMutations } from "vuex";

export default {
  name: "TopGame",
  mixins: [playGameMixin],
  components: {
    TitleSection,
  },
  created () {
    this.selectType = this.hotGameList[0].type;
  },
  data () {
    return {
      selectIndex: 0,
      selectType: null,
      selectGameIndex: 0,
      hotGameList,
      gameItemData: hotGameList[0],
    };
  },
  methods: {
    ...mapMutations('game', ['set_electronic_depotCode', 'set_poker_depotCode', 'set_lottery_depotCode']),
    changeClassify (type, index) {
      this.selectGameIndex = 0;
      this.selectType = type
      this.selectIndex = index
      this.gameItemData = hotGameList[this.selectIndex];
    },
    async goTargetGame (item, index) {
      this.selectGameIndex = index;
      if (item.topGameType === "electronic") {
        this.set_electronic_depotCode(item.depotCode)
        this.$router.push('/electronic/selectList');
      } else if (item.topGameType === "poker") {
        this.set_poker_depotCode(item.depotCode)
        this.$router.push('/poker/selectList');
      } else if (item.topGameType === "lottery") {
        this.set_lottery_depotCode(item.depotCode)
        this.$router.push('/lottery/selectList');
      } else {
        this._enterGame(item)
      }
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      esport: state => state.game.esport,
      sport: state => state.game.sport,
      real: state => state.game.real,
      poker: state => state.game.poker,
      lottery: state => state.game.lottery,
      electronic: state => state.game.electronic,
      catchfish: state => state.game.catchfish,
    }),
    renderList () {
      return this.hotGameList.map(item => {
        item.gameList = this[item.type]
        return item;
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./TopGame.scss";
</style>
