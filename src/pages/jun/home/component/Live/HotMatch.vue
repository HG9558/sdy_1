<template>
  <div class="hot-match-container">
    <div class="hot-top">
      <div class="live-box">
        <component v-if="playerName" :is="playerName" v-on:switch-match="switchMatch" @changePlayer="changePlayer" />
         <!-- <div class="gift-list" v-show="gitShow">
          <Gift :activeMatchData="activeMatchData" @isShowGift="gitShow = !gitShow" :giftShow="gitShow"/>
        </div> -->
      </div>
        <div class="chat-comp">
        <Chat :isShowChat="isShowChat" @changeGiftShow="gitShow = !gitShow"/>
      </div>
      <div class="match-list">
       <MatchList :tabIndex="1" @change-match="changeMatch" :activeMatchData="activeMatchData" :hotList="list" @getBigscreen="handleGetBigscreen"/>
      </div>
    </div>
    <!-- <common-title class="bg-f" titleTxt="热门赛事" subTxt="众多体育赛事，带给您丰富的游戏体验" enTxt="Quality Service"></common-title> -->
    <div class="hot-bottom" :class="[isShowChat ? '' : 'not-active']">
      <span @click="isShowChat = !isShowChat">
<!--				<template v-if="isZhLanguage">{{$t('弹')}}</template>-->
			</span>
      <i class="hot-bottom-label">{{$t('弹幕')}}</i>
    </div>
    <div class="hot-match-box">
       <!-- 大屏推荐左边按钮 -->
      <div class="left-btn" :class="{disabled: pageIndex < 1}" @click="pageIndex > 0 && (pageIndex -= 1)">
        <img class="arrow-left" src="../../img/live/arrow_left.png" alt="">
      </div>
      <div class="hot-match-list">
        <div class="list-box" :style="{left: -pageIndex * 1080 + 'px'}">
          <div class="hot-match-item" :class="getMatchCls(match)" v-for="(match,index) in list" :key="index" @click="changeCurMatch(match)">
            <div class="anchor-label" v-if="match.type === 'room'">{{$t('主播')}}</div>
            <img v-if="match.type !== 'room'" class="match-img"
              :src="require(`../../img/live/${match.catId == 1 ? 'football_' :  'basketball_'}${index+1}.png`)" alt="">
            <img v-else class="match-img" :src="match.playUrls[0].streamImgUrl || siteImgMap.matchDefaultBg"
              alt="">
            <div class="match-info" :class="{ 'match-info_placeholder' :  !match.playUrls[0].streamImgUrl && match.type === 'room' }">
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
import { sortSource } from '@/utils'
import Player from './Player/Player.vue'
import Player2 from './Player/Player2'
import Chat from './Chat'
import commonTitle from '../commonTitle/commonTitle.vue'
import MatchList from './MatchList.vue'
import Gift from './Gift.vue'
import {mapGetters, mapState} from 'vuex'
import siteImgMap from '@/configs/siteImgMap'

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
			siteImgMap,
    }
  },
  provide () {
    return {
      liveData: this.$data
    }
  },
  computed: {
		...mapGetters('global', ['isZhLanguage']),
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
    // this.playerName = Flv.isSupported() ? 'Player' : 'Player2'
    this.specialChangePlayer()
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
    specialChangePlayer() {
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      console.log('isSafari===', isSafari)
      console.log('created-Flv.isSupported()===', Flv.isSupported())
      if (isSafari) {
        this.playerName = 'Player2'
      } else if (Flv.isSupported()) {
        this.playerName = 'Player'
      } else {
        this.playerName = 'Player2'
      }
    },
    changePlayer(player) {
      this.playerName = player
    },
    handleGetBigscreen() {
      this._getMatchList('freshenOnlineNum')
    },
    async _getMatchList (freshenOnlineNum) {
      const res = await this.$http.getBigScreenList({
        pageSize: 8,
        pageNo: 1,
      })
      this.list = res.data.data.map(i => {
        i.playUrls = sortSource(i.playUrls, 3, this.isZhLanguage ? 2 : 1)
        return i
      })
      if (freshenOnlineNum) return
      if (this.list && this.list.length) {
        this.changeCurMatch(this.list[0])
      }
    },
    getTime (time) {
      if (!time) return
      const date = dayjs(time)
      const day = date.format('MM-DD')
      const temp = date.format('HH:mm')
      return `${day === this.today ? this.$t('今天') : day} ${temp}`
    },
    getStateText (state) {
      switch (state) {
        case '1':
          return this.$t('无信号')
        case '2':
        case '3':
          return this.$t('直播中')
        default:
          return this.$t('未开始')
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
      this.$emit('go-match', 1)
    },
    changeCurMatch (match) {
      this._getMatchList('freshenOnlineNum')
      this.changeMatch({...match ,isCustomize: true })
    },
    async changeMatch (match) { //- 获取点击时选取直播频道内容 （热门赛事和直播频道里面的每个直播选项会触发）
      const same = this.activeMatchData && ((match.matchId + match.roomId) === (this.activeMatchData.matchId + this.activeMatchData.roomId))
      this.ac
      if (same) return
      // Flv.isSupported() && this.changePlayer('Player')
      this.specialChangePlayer()
      sessionStorage.setItem('firstCome', 'false')
       // 大屏推荐不需要赛程id来获取数据
      const { isCustomize } = match
      let data
      if (!isCustomize) {
        data = await this.getScheduleId(match.matchScheduleId)
        let resData = []
        data.vids.map(item => {
          item.playUrls = sortSource(item.playUrls, item.matchType, this.isZhLanguage ? 2 : 1)
          resData.push({
            ...item,
            ...item.playUrls[0]
          })
        })
        data.playUrls = data.playUrls ? sortSource(data.playUrls, data.matchType, this.isZhLanguage ? 2 : 1) : resData
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
