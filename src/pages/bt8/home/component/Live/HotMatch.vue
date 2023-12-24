<template>
  <div class="hot-match-container">
    <div class="hot-top">
      <div class="live-box">
        <component v-if="playerName" :is="playerName" v-on:switch-match="switchMatch" />
      </div>
      <div class="chat-comp">
        <Chat />
      </div>
    </div>
    <!-- <img src="" alt=""> -->
    <img src="../../img/live/hot_live.png" class="hot-live" alt="">

    <div class="hot-match-box">
      <div class="left-btn" :class="{disabled: pageIndex < 1}" @click="pageIndex > 0 && (pageIndex -= 1)">
        <img class="arrow-left" src="../../img/live/arrow_left.png" alt="">
      </div>
      <div class="hot-match-list">
        <div class="list-box" :style="{left: -pageIndex * 1080 + 'px'}">
          <div class="hot-match-item" :class="getMatchCls(match)" v-for="(match,index) in list" :key="index" @click="changeMatch(match)">
            <div class="league-item-box">
              <div class="league-name">{{ match.leagueName }}</div>
              <div class="time">{{ getTime(match.matchDateTime) }}</div>
            </div>
            <div class="teams">
              <div class="teams-top">
                <div class="team-logo">
                  <img :src="match.homeLogo || require('../../img/live/main_team.png')" alt="">
                </div>
                <div class="match-state" :class="{live:match.matchState==='2'||match.matchState==='3'}">{{ getStateText(match.matchState) }}</div>
                <div class="team-logo">
                  <img :src="match.awayLogo || require('../../img/live/away_team.png')" alt="">
                </div>
              </div>
              <div class="teams-bottom">
                <div class="team-name">{{ match.homeName }}</div>
                <div class="vs">{{ ['2', '3'].includes(match.matchState) ? `${match.homeScore || 0} : ${match.awayScore || 0}` : 'VS' }}</div>
                <div class="team-name">{{ match.awayName }}</div>
              </div>
            </div>
            <div class="anchor" v-if="match.type === 'room'">
              <div class="anchor-header">
                <img class="icon-video" src="../../img/live/video.png" alt="">
                <div class="">解说</div>
                <p class="room-name">{{ match.roomName || '暂无' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-btn" :class="{disabled: pageIndex + 1 >= totalPage}" @click="pageIndex <totalPage-1 && (pageIndex += 1)">
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

export default {
  name: 'HotMatch',
  components: {
    Player,
    Player2,
    Chat,
  },
  props: ['activeMatchData', 'tabIndex'],
  data () {
    return {
      list: [],
      today: dayjs().format('MM-DD'),
      pageIndex: 0,
      playerName: '',
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.list.length / 4)
    }
  },
  watch: {
    tabIndex (val) {
      if (val === 0) {
        this._getMatchList()
      }
    }
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
    async _getMatchList () {
      const res = await this.$http.getMatchList({
        catId: 'allhot',
        pageSize: 10,
        pageNo: 1,
      })
      this.list = res.data.data.list
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
      this.$emit('go-match', 1)
    },
    changeMatch (match) {
      this.$emit('change-match', match)
    }
  }
}
</script>

<style lang="scss">
@import "../../css/HotMatch.scss";
</style>
