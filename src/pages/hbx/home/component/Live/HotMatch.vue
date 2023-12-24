<template>
  <div class="hot-match-container">
    <div class="hot-top">
      <div class="live-box">
        <component v-if="playerName" :is="playerName" v-on:switch-match="switchMatch" />
        <div class="gift-list" v-show="gitShow">
          <Gift :activeMatchData="activeMatchData" @isShowGift="gitShow = !gitShow" :giftShow="gitShow" @receiveGift="receiveGift"/>
        </div>
      </div>
      <div class="chat-comp">
        <Chat :isShowChat="isShowChat" @changeGiftShow="gitShow = !gitShow" :isShowGift="isShowGift" @receiveGift="receiveGift"/>
        <div class="play fxi" v-if="giftDynamicUrl"><img :src="giftDynamicUrl"></div>
      </div>
      <div class="match-list">
        <MatchList :tabIndex="1" @change-match="changeMatch" :activeMatchData="activeMatchData" :hotList="list"/>
      </div>
    </div>
    <div class="hot-bottom" :class="[isShowChat ? '' : 'not-active']">
      <span @click="isShowChat = !isShowChat">弹</span>
    </div>
    <div class="hot-match-box">
      <!-- 大屏推荐左边按钮 -->
      <div class="arrow-left" :class="{disabled: pageIndex < 1}" @click="pageIndex -= 1"> </div>
      <div class="hot-match-list">
        <div class="list-box" :style="{left: -pageIndex * 1080 + 'px'}">
          <div class="hot-match-item" :class="getMatchCls(match)" v-for="(match,index) in list" :key="index" @click="changCurMatch(match)">
            <div class="anchor-label" v-if="match.type === 'room'">主播</div>
            <img v-if="match.type !== 'room'" class="match-img"
              :src="require(`../../img/live/${match.catId == 1 ? 'football_' :  'basketball_'}${index+1}.png`)" alt="">
            <img v-else class="match-img" :src="match.playUrls[0].streamImgUrl || require('../../img/live/match-default-bg.png')"
              alt="">
            <div class="match-info">
              <div class="teams-name"> {{ match.homeName }} VS {{ match.awayName }} </div>
              <div class="match-hot"> {{match.online || 0}} </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 大屏推荐右边按钮 -->
      <div class="arrow-right" :class="{disabled: pageIndex + 1 >= totalPage}" @click="pageIndex += 1"> </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Flv from 'flv.js'
import Player from './Player/Player.vue'
import Player2 from './Player/Player2'
import Chat from './Chat'
import commonTitle from '../commonTitle/commonTitle.vue'
import MatchList from './MatchList.vue'
import Gift from './Gift.vue'
import { mapState } from 'vuex'

export default {
  name: 'HotMatch',
  components: {
    Player,
    Player2,
    Chat,
    commonTitle,
    MatchList,
    Gift
  },
  data () {
    return {
      list: [],
      today: dayjs().format('MM-DD'),
      pageIndex: 0,
      playerName: '',
      isShowChat: true,
      activeMatchData: null,
      gitShow: false,
      isShowGift: false,
      giftDynamicUrl: null,
    }
  },
  provide () {
    return {
      liveData: this.$data
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.list.length / 4)
    },
    ...mapState({
      isLogin: state => state.user.token
    })
  },
  created () {
    this.playerName = Flv.isSupported() ? 'Player' : 'Player2'
    this._getMatchList()
  },
  beforeDestroy () {
    if (this.activeMatchData) {
      const groupId = this.activeMatchData.groupId
      if (groupId) {
        this.$tim.quitGroup(groupId)
      }
    }
  },
  methods: {
    async _getMatchList (freshenOnlineNum) {
      const res = await this.$http.getBigScreenList({
        pageSize: 10,
        pageNo: 1,
      })
      this.list = res.data.data
      if (freshenOnlineNum) return
      this.changCurMatch(this.list[0])
    },
    getTime (time) {
      if (!time) return
      const date = dayjs(time)
      const day = date.format('MM-DD')
      const temp = date.format('HH:mm')
      return `${day === this.today ? '今天' : day} ${temp}`
    },
    getStateText (state) {
      switch (state) {
        case '1':
          return '无信号'
        case '2':
        case '3':
          return '直播中'
        default:
          return '未开始'
      }
    },
    getMatchCls (match) {
      let arr = []
      if (['2', '3'].includes(match.matchState)) {
        arr.push('is-live')
      }
      if (this.activeMatchData && ((match.matchId && match.matchId === this.activeMatchData.matchId) || (match.roomId && match.roomId === this.activeMatchData.roomId))) {
        arr.push('active')
      }
      return arr.join(' ')
    },
    switchMatch () {
    },
    changCurMatch (match) {
      this._getMatchList('freshenOnlineNum')
      this.changeMatch({...match ,isCustomize: true })
    },
    async changeMatch (match) { //- 获取点击时选取直播频道内容 （热门赛事和直播频道里面的每个直播选项会触发）
      const same = this.activeMatchData && ((match.matchId + match.roomId) === (this.activeMatchData.matchId + this.activeMatchData.roomId))
      this.ac
      if (same) return
      sessionStorage.setItem('firstCome', 'false')
      // 大屏推荐不需要赛程id来获取数据
      const { isCustomize } = match
      let data
      if (!isCustomize) {
        data = await this.getScheduleId(match.matchScheduleId)
        let resData = []
        data.vids.map(item => {
          resData.push({
            ...item,
            ...item.playUrls[0]
          })
        })
        data.playUrls = data.playUrls || resData
        data.groupId = resData[0].groupId
        data.self_achore = true
      }
      this.activeMatchData =  isCustomize ? match : data
      // 是否展示礼物 --start
      const { matchState, type } = this.activeMatchData
      this.isShowGift = !!matchState && type === 'room'
      // -- end
      this._updateAnchorTotal(match)
    },
    // 更新主播直播间人数
    async _updateAnchorTotal (match) {
      if(!match.userId || !this.isLogin) return
      this.$http.updateAnchorTotal({userId: match.userId * 1, matchScheduleId: match.matchScheduleId * 1})
    },
    // 通过赛程ID（matchScheduleId）查询赛程数据
    async getScheduleId (matchScheduleId) {
      const params = {
        matchScheduleId: matchScheduleId
      }
      const { data } = await this.$http.getScheduleId(params)
      return data.data
    },
    receiveGift(url) {
      this.giftDynamicUrl = url
      setTimeout(() => {
        this.giftDynamicUrl = null
      }, 2000);
    }
  }
}
</script>

<style lang="scss">
@import "../../css/HotMatch.scss";
</style>
