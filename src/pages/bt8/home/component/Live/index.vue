<template>
  <div class="live-container">
    <img class="right_bg" src="../../img/live/right_bg.png" alt="">
    <div class="live-tabs">
      <div class="live-tab-item" v-for="(tab, index) in tabs" :key="tab.label" :class="{active: index === tabIndex}" @click="tabIndex = index">
        <img class="tab-img" :src="tab.icon" />
        <span>{{ tab.label }}</span>
      </div>
    </div>
    <HotMatch @go-match="tabIndex = $event" :tabIndex="tabIndex" @change-match="changeMatch" :activeMatchData="activeMatchData" />
    <Match @go-match="tabIndex = $event" @change-match="changeMatch" v-if="tabIndex === 1" :activeMatchData="activeMatchData" />
  </div>
</template>

<script>
import HotMatch from './HotMatch.vue'
import Match from './Match.vue'

export default {
  name: 'Live',
  components: {
    HotMatch,
    Match,
  },
  data () {
    return {
      tabIndex: 0,
      tabs: [
        {
          label: '直播',
          compName: 'HotMatch',
          icon: require('../../img/live/icon_live.png')
        },
        {
          label: '赛程',
          compName: 'Match',
          icon: require('../../img/live/icon_schedule.png')
        },
      ],
      activeMatchData: null,
      fromOtherPage: false //- 判断是否转入别的界面 
    }
  },
  provide () {
    return {
      liveData: this.$data
    }
  },
  created () {
    this._getActiveLiveMatch()
  },
  mounted () {
    this.$root.$on('change-match', (match) => {
      this.fromOtherPage = true
      this.changeMatch(match)
    })
  },
  methods: {
    async _getActiveLiveMatch () { // - 获取首页直播内容
      const res = await this.$http.getActiveLiveMatch()
      if (res.data.code) return
      if (!this.fromOtherPage) {
        this.activeMatchData = typeof res.data.data === 'string' ? null : res.data.data
      }
    },
    changeMatch (match) { //- 获取点击时选取直播频道内容 （热门赛事和直播频道里面的每个直播选项会触发）
      const same = this.activeMatchData && ((match.matchId + match.roomId) === (this.activeMatchData.matchId + this.activeMatchData.roomId))
      if (same) return
      sessionStorage.setItem('firstCome', 'false')
      this.activeMatchData = match
    }
  }
}
</script>

<style lang="scss">
@import "../../css/live.scss"
</style>
