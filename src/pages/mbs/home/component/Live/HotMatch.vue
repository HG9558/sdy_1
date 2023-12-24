<template>
  <div class="hot-match-container">
    <div class="hot-top">
      <div class="live-box">
        <component v-if="playerName" :is="playerName" v-on:switch-match="switchMatch" />
         <!-- <div class="gift-list" v-show="gitShow">
          <Gift :activeMatchData="activeMatchData" @isShowGift="gitShow = !gitShow" :giftShow="gitShow"/>
        </div> -->
      </div>
        <div class="chat-comp">
         <Chat :isShowChat="isShowChat" @changeGiftShow="gitShow = !gitShow"/>
      </div>
      <div class="match-list">
       <MatchList :tabIndex="1" @change-match="changeMatch" :activeMatchData="activeMatchData" :hotList="list"/>
      </div>
    </div>
    <!-- <common-title class="bg-f" titleTxt="热门赛事" subTxt="众多体育赛事，带给您丰富的游戏体验" enTxt="Quality Service"></common-title> -->
    <div class="hot-bottom" :class="[isShowChat ? '' : 'not-active']">
      <span @click="isShowChat = !isShowChat">弹</span>
    </div>
    <div class="hot-match-box">
       <!-- 大屏推荐左边按钮 -->
      <div class="left-btn" :class="{disabled: pageIndex < 1}" @click="pageIndex > 0 && (pageIndex -= 1)">
        <img class="arrow-left" src="../../img/live/arrow_left.png" alt="">
      </div>
      <div class="hot-match-list">
        <div class="list-box" :style="{left: -pageIndex * 1080 + 'px'}">
          <div class="hot-match-item" :class="getMatchCls(match)" v-for="(match,index) in list" :key="index" @click="changeCurMatch(match)">
            <div class="anchor-label" v-if="match.type === 'room'">主播</div>
            <img class="match-img" :src="match.playUrls[0].streamImgUrl || require('../../img/live/match-default-bg.png')" alt="">
            <div class="match-info">
              <div class="teams-name"> {{ match.homeName }} VS {{ match.awayName }} </div>
              <div class="match-hot"> {{match.online || 0}} </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-btn" :class="{disabled: pageIndex + 1 >= totalPage}" @click="pageIndex <totalPage-1 && (pageIndex += 1)">
         <!-- 大屏推荐右边按钮 -->
        <img class="arrow-right" src="../../img/live/arrow_right.png" alt="">
      </div>
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
      gitShow: false
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
  // watch: {
  //   tabIndex (val) {
  //     if (val === 0) {
  //       this._getMatchList()
  //     }
  //   }
  // },
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
      this.changeCurMatch(this.list[0])
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
      // this.$emit('go-match', 1)
    },
    changeCurMatch (match) {
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
  }
}
</script>

<style lang="scss">
@import "../../css/HotMatch.scss";
</style>
