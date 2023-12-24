<template>
  <div class="match-comp">
    <div class="tabs">
       <div class="tab-item" v-for="(tab, index) in tabs" :key="tab.catId" :class="{ 'active': index === tabIndex }" @click="tabIndex = index">
        {{ tab.catName }}
      </div>
      </div>
    <div class="dateTab giftTab" v-if="[0,2,3,4].includes(tabIndex)">
      <div class="tab-item" v-for="(_i, _j) in dateArray" :key="_j" :class="{ 'active': currentDateIndex === _j }" @click="handleDateTab(_i, _j)">{{ _i.slice(5) }}</div>
    </div>
    <!-- 赛事列表 -->
    <el-scrollbar wrap-class="list-wrapper" ref="scrollBar">
      <div class="match-list" v-if="tabIndex !== 5">
        <div class="match-item" :class="{
            'is-live': ['2', '3'].includes(match.matchState),
            'has-date-title': match.dateTitle,
            'active':
              activeMatchData && activeMatchData.groupId === match.groupId,
            'show': true,
          }" v-for="(match, key) in endObj" :key="key">
          <div v-if="match[0].dateTitle" class="date-title" @click="matchDetail(match[0].matchDate)">
            {{ match[0].dateTitle}}
            <div class="match-detail-show">
              <img v-if="!foldList.includes(match[0].matchDate)" src="../../img/live/down.svg" alt="" srcset="">
              <img v-else src="../../img/live/up.svg" alt="" srcset="">
            </div>
          </div>
          <div @click="handleChangeLive(matchItem)" :class="[ 'no-date-title', {'playing': matchItem.matchId === matchId}]" v-for="(matchItem, index) in match" :key="matchItem.groupId + index"  v-show="foldList.includes(match[0].matchDate)">
            <div class="match-name-time">
              <span class="leagueName">
                <!-- <el-popover placement="top-start" trigger="hover" :content="match.leagueName"> -->
                <span slot="reference">{{ matchItem.leagueName }}</span>
                <!-- </el-popover> -->
              </span>
              <span class="match-time">{{ dayjs(matchItem.matchDateTime ? matchItem.matchDateTime : matchItem.matchDate + ' '+ matchItem.matchTime).format("HH:mm") }}</span>
              <span class="action">
                <span v-if="matchItem.type === 'room'" :class="['icon', 'room', matchItem.matchState === '2' ? 'play' : '']"></span>
                <span v-else :class="['icon', 'event', matchItem.matchState === '2' ? 'play' : '' ]"></span>
                <span>{{ matchItem.matchState == 0 ? '暂未开播' : (matchItem.type === "room" ? "主播讲解" : "赛事直播") }}</span>
              </span>
            </div>
            <div class="team-w">
              <div class="team">
                <img class="img-box" :src="matchItem.homeLogo || defaultImg" alt="" />
                <span class="team-name">{{ matchItem.homeName }}</span>
                <span class="vs">
                  {{
                      ["2", "3"].includes(matchItem.matchState)
                        ? `${matchItem.homeScore || 0}`
                        : "-"
                    }}
                </span>
              </div>
              <div class="team">
                <img class="img-box" :src="matchItem.awayLogo || defaultImg" alt="" />
                <span class="team-name">{{ matchItem.awayName }}</span>
                <span class="vs">
                  {{
                      ["2", "3"].includes(matchItem.matchState)
                        ? `${matchItem.awayScore || 0}`
                        : "-"
                    }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p class="no-more" v-show="pageTotal && pageNo >= Math.ceil(pageTotal / pageSize)">
          没有更多数据了～
        </p>
         <div v-show="JSON.stringify(endObj) === '{}' && !loading" class="gift-no-data">
            <img src="../../img/quexing.png" alt="">
        </div>
      </div>
      <div v-else class="gift-list">
          <div class="gift-list-p">
            <div class="tab-item gift-item" v-for="(item, index) in falseData" :key="index">
              <i class="left">
                <span v-if="[0, 1, 2].includes(index)" class="spanp" :class="{ 'span0': index === 0, 'span1': index === 1, 'span2': index === 2}"></span>
                <span v-else>{{index + 1}}</span>
              </i>
              <span class="center">{{item.playAccount}}</span>
              <span class="right">¥ {{item.totalAmount}}</span>
            </div>
          </div>
      </div>
    </el-scrollbar>
    <Loading :showLoading="loading" class="message-load" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { setTimeout } from 'timers';
import { getTime } from "@/plugins/auth.js";
const defaultImg = require('../../img/live/no-img.png')
import Loading from 'commonComponent/Loading';

export default {
  name: 'Match',
  props: ['activeMatchData', 'hotList'],
  components: {
    Loading
  },
  data () {
    return {
      tabIndex: 0,
      tabs: [
        {
          catId: '',
          catName: '全部',
        },
        {
          catId: 'allhot',
          catName: '热门',
        },
        {
          catId: '1',
          catName: '足球',
        },
        {
          catId: '2',
          catName: '篮球',
        },
        {
          catId: '37',
          catName: '电竞',
        },
        //  {
        //   catId: 'sort_gift',
        //   catName: '排行',
        // }
      ],
      liveList: [],
      pageNo: 1,
      pageSize: 15,
      pageTotal: 0,
      loading: false,
      defaultImg,
      dayjs,
      foldList: [],
      endObj: {},
      matchId: '',
      weekGiftLog: true,
      giftList: [],
      dateArray: [getTime("today")[0], getTime("tomorrow")[0], getTime("afterTomorrow")[0]],
      currentDateIndex: 0,
      curDate: getTime("today")[0]
    }
  },
  computed: {
  },
  watch: {
     tabIndex (n, o) {
      this.currentDateIndex = 0
      this.getData()
    },
    liveList: {
      handler (n) {
        let gameMap = {}
        let endObj = {}
        this.foldList = []
        //- 直播列表 处理时间
        // this.foldList=[]
        n.map(item => {
          const dateObj = Object.assign({}, item)
          if (!gameMap[item.matchDate]) {
            gameMap[item.matchDate] = true
            const matchDate = item.matchDateTime ? dayjs(item.matchDateTime) : dayjs(item.matchDate);
            const title = matchDate.format('MM-DD') + ' 星期' + this.getWeek(matchDate.day())
            dateObj.dateTitle = title
            endObj[item.matchDate] = [{ ...dateObj }]
            this.foldList.push(item.matchDate)
          } else {
            endObj[item.matchDate].push(item)
          }
        })
        this.endObj = endObj
      },
      immediate: true,
      deep: true,
    },
    weekGiftLog () {
      this.getData()
      this.curDate = this.dateArray[0]

    }
  },
  created () {
    this._getMatch()
  },
  mounted () {
    this.$refs.scrollBar.wrap.addEventListener('scroll', this.hanldeEnd, false)
  },
  beforeDestroy () {
    this.$refs.scrollBar.wrap.removeEventListener('scroll', this.hanldeEnd, false)
  },
  methods: {
    getData () {
      this.pageNo = 1
      this.pageTotal = 0
      this.curDate = this.dateArray[0]
      this._getMatch()
      this.$refs.scrollBar.wrap.scrollTop = 0
    },
    handleMouseover () {
      document.body.style.overflowY = "hidden"
    },
    handleMouseout () {
      document.body.style.overflowY = ""
    },
    async _getMatch () {
      this.loading = true
      try {
        //-- 获取赛事列表
         if (this.tabIndex === 1) {
          this.liveList = this.hotList
          this.pageTotal = this.hotList.length
          this.loading = false
          return
        } else if (this.tabIndex === 5) {
          this.giftList = []
          this.getGiftList()
        } else {
          const reg = /['/']/g
          const res = await this.$http.getSatchs({
            pageNo: this.pageNo,
            catId: this.tabs[this.tabIndex].catId,
            pageSize: this.pageSize,
            date: this.curDate.replace(reg, "-")
          })
          const data = res.data.data
          this.pageTotal = data.totalCount
          if (this.pageNo > 1) {
            this.liveList = this.liveList.concat(data.list)
          } else {
            this.liveList = data.list
          }
          this.loading = false
        }
      } catch (error) {
        this.loading = false
      }
    },
    getWeek (week) {
      switch (week) {
        case 1:
          return '一'
        case 2:
          return '二'
        case 3:
          return '三'
        case 4:
          return '四'
        case 5:
          return '五'
        case 6:
          return '六'
        default:
          return '天'
      }
    },
    hanldeEnd () {
      // let elH = document.querySelector('.match-list').offsetHeight
      let scrollH = document.querySelector('.list-wrapper').scrollTop
      
      // if (elH - scrollH - 700 > 20) return
      // let page = this.pageNo + 1
      // if (page * this.pageNo >= this.pageTotal) return

      if (!this.foldList.length) return

      // if (this.pageNo * 15 >= this.pageTotal) return
      if (scrollH >= 1100 * this.pageNo && !this.loading) {
        if (this.pageNo * 15 >= this.pageTotal ) return
        clearTimeout(this.scorllTimeOut)
        this.scorllTimeOut = setTimeout(() => {
          this.load()
        }, 200)
      }
    },
    load () {
      if (!this.loading) {
        this.pageNo += 1
        this.loading = true
        this._getMatch()
      }
    },
    handleChangeLive (match) {
      if (match.matchState == 0) return
      this.matchId = match.matchId
      this.$emit('change-match', {...match, isCustomize: this.tabIndex === 1}) //判断是否是热门, 是,则不调用新接口
    },
    matchDetail (matchDate) {
      const index = this.foldList.indexOf(matchDate)
      if (index !== -1) this.foldList.splice(index, 1)
      else this.foldList.push(matchDate)
      },
    handleArrowLeft () {
      this.tabIndex -= 1
      if (this.tabIndex <= 0)  return
      const i = this.tabIndex > 3 ? 1 : (this.tabIndex == 3 ? 2 : 0)
      const left = Number(this.$refs.tab_list.style.left.split('p')[0] || 0)
      const bool = left <= -116 
      this.$refs.tab_list.style.left = bool ? left + 58 + 'px' : 0
    },
    handleArrowRight () {
      this.tabIndex += 1
      if (this.tabIndex >= 3) return
      const i = this.tabIndex
      this.$refs.tab_list.style.left = -(i * 58) + 'px'
    },
    getGiftList () {
      const params = {
         pageNo: this.pageNo,
         pageSize: 10,
         anchorAccount: this.activeMatchData.userName
      }
      const res = this.weekGiftLog ? this.$http.getWeekContributionList(params) : this.$http.getTotalContributionList(params)
      const data = res.data.data
      if (this.pageNo > 1) {
        this.giftList = this.giftList.concat(data.list)
      } else {
        this.giftList = data
      }
      this.loading = false
    },
    handleDateTab (_i, _j) {
      this.currentDateIndex = _j
      this.$refs.scrollBar.wrap.scrollTop = 0
      this.curDate = _i
      this.pageNo = 1
      this._getMatch()
    }
  }
}
</script>

<style lang="scss">
@import "../../css/MatchList.scss";
</style>
