<template>
  <section ref="playerWrapper" class="player-wrapper">
    <div class="player-content" @click="handleChangeShowControlBar($event)">
      <template v-if="activeMatchData">
        <video allowfullscreen="true" ref="player" x5-video-player-fullscreen="true" playsinline webkit-playsinline x5-playsinline x-webkit-airplay="allow" loop class="player-video" poster="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==" />
        <div v-show="!playerState.playing" @click="handlePlay" class="player-video_playButton absolute-center" />
        <transition name="el-fade-in-linear">
          <div v-show="showControlBar" :style="{'z-index': (playerState.tipsStatus === TIPS_STATUS.LOADING || playerState.tipsStatus === TIPS_STATUS.ERROR) ? 99 : 'initial'}" class="player-video_controlBar">
            <div class="player-video_controlBar_left">
              <i @click="handlePlay" :class="playerState.playing ? 'playing' : ''" class="player-video_controlBar__play" />
              <el-popover popper-class="player-popover-wrapper" v-model="showPopoverMatchInfo"  trigger="click" placement="top-start">
                <div class="player-popover player-popover__matchInfo">
                  <div class="player-popover-item">
                    <div class="matchInfo">
                      <p v-if="activeMatchData.matchDate  && activeMatchData.matchTime">{{ `${activeMatchData.matchDate} ${activeMatchData.matchTime}` }}</p>
                      <p v-else> {{activeMatchData.matchDateTime}} </p>

                      <p>{{ activeMatchData.leagueName }}</p>
                      <p v-if="activeMatchData.type === 'event'">
                        {{ activeMatchData.homeName }} 
                        <span class="matchInfo__active m-h-5">VS</span>
                        <span>{{ activeMatchData.awayName }}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <span slot="reference" class="match-detail">赛事信息</span>
              </el-popover>
            </div>
            <div class="player-video_controlBar_right">
               <el-popover popper-class="player-popover-wrapper popover-right" v-model="isMoreLine"  trigger="click" placement="top" v-if="isMoreLine"> 
                <div class="player-popover">
                  <div v-for="(item, index) in playerState.liveStreams" :key="item.id + String(index)" class="player-popover-item p-h-10" :class="{'active': playerState.activeLiveStream.id === item.id}" @click="changeLine(index)">
                    {{item.matchName}}
                  </div>
                </div>
                <span slot="reference" class="match-detail" v-if="isMoreLine">{{playerState.activeLiveStream.matchName}}</span>
              </el-popover>
              <el-popover popper-class="player-popover-wrapper popover-right" v-model="showPopover"  trigger="click" placement="top">
                <div class="player-popover">
                  <div v-for="item in playerState.liveStreams" :key="item.id" class="player-popover-item p-h-10" :class="{'active': playerState.activeLiveStream.id === item.id}" @click="handleChangeStream(item)">
                    {{item.name}}
                  </div>
                </div>
                <span slot="reference" class="match-detail">{{playerState.activeLiveStream.name}}</span>
              </el-popover>
              <i @click="handleMuted" :class="playerState.muted ? 'muted' : ''" class="player-video_controlBar__volume" />
              <i @click="fullScreen" class="player-video_controlBar__fullScreen" />
            </div>
          </div>
        </transition>
      </template>
      <div v-show="playerState.tipsStatus !== null" class="player-video__empty" :class="{'no-live': !activeMatchData, 'bog': templateIsBog}">
        <template v-if="activeMatchData && playerState.tipsStatus === TIPS_STATUS.NOT">
          哦豁！
          <br>
          运动员被外星人收走了~
          <!-- <round-button @click.native="handleChangeMatch" class="player-video__empty-button mt-10" text="查看赛程" /> -->
        </template>
        <template v-if="playerState.tipsStatus === TIPS_STATUS.ANCHOR_BREAK">
          <p>
            主播休息中
            <br>
            请观看其他比赛
          </p>
          <!-- <round-button v-if="playerState.tipsStatus === TIPS_STATUS.ANCHOR_BREAK" @click.native="handleChangeMatch" class="player-video__empty-button mt-10" text="切换比赛" /> -->
        </template>
        <template v-if="playerState.tipsStatus === TIPS_STATUS.ERROR">

          <!-- <p>视频加载失败</p> -->
          <p>{{ activeMatchData.leagueName }}</p>

          <p class="m-v-10" v-if="activeMatchData.type === 'event'">
            {{ activeMatchData.homeName }} 
            <span class="m-h-15">VS</span> {{ activeMatchData.awayName }}
          </p>
          <p v-if="activeMatchData.matchDate && activeMatchData.matchTime">{{ `${activeMatchData.matchDate} ${activeMatchData.matchTime}` }}</p>
          <p v-else> {{activeMatchData.matchDateTime}} </p>
          
          <div class="btns-row mt-10">
            <!-- <round-button @click.native="initStream" :loading="loadingButton" class="player-video__empty-button m-r-15" text="重新加载" />
            <round-button @click.native="handleChangeMatch" class="player-video__empty-button" text="切换比赛" /> -->
          </div>

        </template>
        <template v-if="playerState.tipsStatus === TIPS_STATUS.ENDING">
          <p>比赛已结束</p>
          <p class="m-v-10">
            {{ activeMatchData.homeName }}
            <template v-if="activeMatchData.type === 'event'">
              <span class="m-h-15">VS</span> {{ activeMatchData.awayName }}
            </template>
          </p>
          <p>{{ `${activeMatchData.matchDate} ${activeMatchData.matchTime}` }}</p>

          <!-- <div class="btns-row  mt-10">
            <round-button @click.native="handleChangeMatch" class="player-video__empty-button" text="切换比赛" />
          </div> -->
        </template>
        <div v-show="playerState.tipsStatus === TIPS_STATUS.LOADING" class="player-video__empty_loading">
          <img src="./images/loading.gif" alt="">
          <p>精彩马上开始...</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Hls from 'hls.js'
import RoundButton from './RoundButton'

const TIPS_STATUS = {
  ERROR: 0, // 错误
  NOT: 1, // 暂无比赛
  ENDING: 2, // 比赛结束
  ANCHOR_BREAK: 3, // 主播休息
  LOADING: 4, // 加载中
}

export default {
  name: 'Player',
  components: {
    RoundButton,
  },
  inject: ['liveData'],
  data () {
    return {
      showPopover: false,
      showPopoverMatchInfo: false,
      playerState: {
        muted: false,
        playing: false,
        error: false,
        loading: false,
        tipsStatus: TIPS_STATUS.NOT,
        liveStreams: [],
        activeLiveStream: {},
        hls: null,
        playerIsBind: false,
        retryCount: 0,
      },
      showControlBar: true,
      showControlBarTimer: null,
      loadingButton: false,
      TIPS_STATUS,
      canAutoVideo: true,
      firstCome: true,
      canPlay: false,
      canPause: false,
      templateIsBog: true,
      curLine: 0,
      isMoreLine: false,
    }
  },
  computed: {
    activeMatchData () {
      return this.liveData.activeMatchData
    },
    tabIndex () {
      return this.liveData.tabIndex
    }
  },
  watch: {
    activeMatchData: {
      handler (val, old) {
        if (val) {
          this.curLine = 0
          this.isMoreLine = !!val.self_achore && val.playUrls.length > 1
          this.$nextTick(() => {
            this.init()
          })
          if (this.firstCome && !this.canAutoVideo) {
            this.setMuted(true)
          }
        }
        if (val && old) {
          this.setMuted(false)
        }
      },
      immediate: true,
    },
    tabIndex () {
      if (this.activeMatchData) {
        if (this.tabIndex) {
          this.canPause ? this.$refs.player.pause() : this.setMuted(true)
        } else {
          if (this.canPlay) {
            this.$refs.player.play()
          }
          this.setMuted(false)
        }
      }
    }
  },
  created () {
    const agent = window.navigator.userAgent
    if (agent.indexOf('Firefox') >= 0 || agent.indexOf('Chrome') >= 0 || agent.indexOf('Safari') >= 0) {
      this.canAutoVideo = false
    }
    this.firstCome = sessionStorage.getItem('firstCome') === 'true'
  },
  mounted () {
    if (this.firstCome && this.activeMatchData && !this.canAutoVideo) {
      this.setMuted(true)
    }
  },
  beforeDestroy () {
    if (this.playerState.hls) {
      this.playerState.hls.detachMedia()
      this.playerState.hls.destroy()
    }
  },
  methods: {
    setMuted (flag) {
      this.$nextTick(() => {
        this.$refs.player.muted = flag
        this.playerState.muted = flag
      })
    },
    init () {
      this.playerState.liveStreams = this.activeMatchData.playUrls
         if (this.playerState.liveStreams && this.playerState.liveStreams[this.curLine]) {
        const activeLiveStream = this.playerState.liveStreams[this.curLine]
        this.playerState.activeLiveStream = activeLiveStream
      }
      if (!this.playerState.playerIsBind) {
        this.initPlayer()
      }
      this.playerState.retryCount = 0
      this.initStream()
    },
    initStream () {
      this.canPlay = false
      this.canPause = false
      const { activeLiveStream, hls } = this.playerState
      if (hls) {
        hls.destroy()
      }
      if (!activeLiveStream.id) return false
      const source = `${activeLiveStream.id}.m3u8`
      if (Hls.isSupported()) {
        this.playerState.tipsStatus = TIPS_STATUS.LOADING
        this.playerState.hls = new Hls()
        const { hls } = this.playerState
        hls.loadSource(source)
        hls.attachMedia(this.$refs.player)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
        })
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                if (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR || data.details === Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT || data.details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR) {
                  // 网络错误， 超时， 解析未能找到正确的内容 重试10次加载资源
                  if (this.playerState.retryCount >= 10) {
                    hls.destroy()
                    this.$http.getMatchIsOver({ matchId: this.activeMatchData.matchId })
                      .then((res) => {
                        if (res.result) {
                          this.playerState.tipsStatus = TIPS_STATUS.ENDING
                        } else {
                          this.playerState.tipsStatus = TIPS_STATUS.ERROR
                        }
                      })
                      .catch(() => {
                        this.playerState.tipsStatus = TIPS_STATUS.ERROR
                      })
                  } else {
                    hls.loadSource(source)
                    this.playerState.retryCount += 1
                  }
                } else {
                  hls.startLoad()
                }
                break
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError()
                break
              default:
                hls.destroy()
                break
            }
          }
        })
      } else if (this.player.canPlayType('application/vnd.apple.mpegurl')) {
        this.playerState.tipsStatus = TIPS_STATUS.LOADING
        this.$refs.player.src = source
      }
      return null
    },
    initPlayer () {
      this.$nextTick(() => {
        this.playerBindEvents()
      })
    },
    playerBindEvents () {
      const playerEl = this.$refs.player
      playerEl.addEventListener('play', () => {
        this.playerState.playing = true
      })
      // 暂停
      playerEl.addEventListener('pause', () => {
        this.playerState.playing = false
      })
      // 音量改变
      playerEl.addEventListener('volumechange', () => {
        this.playerState.muted = playerEl.muted
      })
      // 请求数据时遇到错误
      playerEl.addEventListener('error', () => {
        this.playerState.tipsStatus = TIPS_STATUS.ERROR
      })
      // 可以播放
      playerEl.addEventListener('canplay', () => {
        this.playerState.tipsStatus = null
        this.setShowControlBarTimer()
        const promise = this.$refs.player.play()
        promise.then(() => {
          this.canPause = true
          this.canPlay = true
        })
          .catch(() => {
          })
      })
      // 网速失速
      playerEl.addEventListener('stalled', () => {
        // playerState.tipsStatus = TIPS_STATUS.LOADING
        // this.showVideoLoading = true
      })
      // 缓冲数据
      playerEl.addEventListener('waiting', () => {
        // playerState.loading = true
        this.playerState.tipsStatus = TIPS_STATUS.LOADING
      })
      // 因缓冲而暂停或停止后已就绪时触发
      playerEl.addEventListener('playing ', () => {
        this.playerState.tipsStatus = null
      })
      this.playerState.playerIsBind = true
    },
    handlePlay () {
      let playing
      const { player } = this.$refs
      if (player.paused) {
        player.play()
        playing = true
      } else {
        player.pause()
        playing = false
      }
      this.playerState.playing = playing
    },
    handleMuted () {
      this.$refs.player.muted = !this.$refs.player.muted
      this.playerState.muted = !this.playerState.muted
    },
    setShowControlBarTimer () {
      this.showControlBarTimer = window.setTimeout(() => {
        this.showControlBar = false
        this.showPopover = false
        this.showPopoverMatchInfo = false
      }, 5000)
    },
    handleChangeShowControlBar (e) {
      const controlBar = document.querySelectorAll('.player-video_controlBar')[0]
      if (controlBar && controlBar.contains(e.target)) {
        window.clearTimeout(this.showControlBarTimer)
        this.showControlBar = true
        this.setShowControlBarTimer()
        return
      }
      if (this.showControlBarTimer) {
        window.clearTimeout(this.showControlBarTimer)
      }
      this.showControlBar = !this.showControlBar
      this.setShowControlBarTimer()
    },
    fullScreen () {
      const ele = this.$refs.player
      if (ele.requestFullscreen) {
        ele.requestFullscreen()
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen()
      } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen()
      } else if (ele.webkitEnterFullscreen) {
        ele.webkitEnterFullscreen()
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen()
      }
    },
    handleChangeStream (stream) {
      this.showPopover = false
      this.playerState.activeLiveStream = stream
      this.playerState.retryCount = 0
      this.initStream()
    },
    handleChangeMatch () {
      this.$emit('switch-match')
    },
    changeLine(index) {
      this.curLine = index
      this.init()
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../../css/player.scss";
</style>
