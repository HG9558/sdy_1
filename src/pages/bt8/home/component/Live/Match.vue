<template>
  <div class="match-comp">
    <div class="tabs">
      <div class="tab-item" v-for="(tab, index) in tabs" :key="tab.catId" :class="{ active: index === tabIndex }" @click="tabIndex = index">
        {{ tab.catName }}
      </div>
    </div>
    <el-scrollbar :noresize="true" wrap-class="list-wrapper" ref="scrollBar">
      <div class="match-list">
        <div class="match-item" :class="{
            'is-live': ['2', '3'].includes(match.matchState),
            'has-date-title': match.dateTitle,
            active:
              activeMatchData && activeMatchData.groupId === match.groupId,
          }" v-for="match in liveDataList" :key="match.groupId">
          <div v-if="match.dateTitle" class="date-title">
            {{ match.dateTitle}}
          </div>
          <div class="match-content">
            <div class="leagueName">
              <span class="icon" :class="`icon-match-${match.catId}`"></span>
              <el-popover placement="top-start" trigger="hover" :content="match.leagueName">
                <span slot="reference">{{ match.leagueName }}</span>
              </el-popover>
            </div>
            <div class="match-time">{{ dayjs(match.matchDateTime ? match.matchDateTime : match.matchDate + ' '+ match.matchTime).format("HH:mm") }}</div>
            <div class="team-wrapper">
              <div class="team-name team-name-left">{{ match.homeName }}</div>
              <img class="img-box" :src="match.homeLogo || defaultImg" alt="" />
              <div class="vs">
                {{
                    ["2", "3"].includes(match.matchState)
                      ? `${match.homeScore || 0} - ${match.awayScore || 0}`
                      : "-"
                  }}
              </div>
              <img class="img-box" :src="match.awayLogo || defaultImg" alt="" />
              <div class="team-name team-name-right">{{ match.awayName }}</div>
            </div>

            <div class="action" @click="handleChangeLive(match)">
              {{ match.type === "room" ? "主播讲解" : "赛事直播" }}
            </div>
          </div>
        </div>
        <p class="no-more" v-show="pageTotal && pageNo >= Math.ceil(pageTotal / pageSize)">
          没有更多数据了～
        </p>
      </div>
    </el-scrollbar>
    <div class="match-loading" v-show="loading"></div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { setTimeout } from 'timers';
const defaultImg = require('../../img/live/no-img.png')

export default {
  name: 'Match',
  props: ['activeMatchData'],
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
      ],
      liveList: [],
      pageNo: 1,
      pageSize: 15,
      pageTotal: 0,
      loading: false,
      defaultImg,
      dayjs
    }
  },
  computed: {
    liveDataList () {
      let gameMap = {}
      //- 直播列表 处理时间
      return this.liveList.map(item => {
        const dateObj = Object.assign({}, item)
        if (!gameMap[item.matchDate]) {
          gameMap[item.matchDate] = true
          const matchDate = item.matchDateTime ? dayjs(item.matchDateTime) : dayjs(item.matchDate);
          const title = matchDate.format('MM-DD') + ' 星期' + this.getWeek(matchDate.day())
          dateObj.dateTitle = title
        }
        return dateObj
      })
    }
  },
  watch: {
    tabIndex () {
      this.pageNo = 1
      this.pageTotal = 0
      this._getMatch()
      this.$refs.scrollBar.wrap.scrollTop = 0
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
        const res = await this.$http.apiGetMatchs({
          pageNo: this.pageNo,
          catId: this.tabs[this.tabIndex].catId,
          pageSize: this.pageSize,
        })
        const data = res.data.data
        this.pageTotal = data.totalCount
        if (this.pageNo > 1) {
          this.liveList = this.liveList.concat(data.list)
        } else {
          this.liveList = data.list
        }
        this.loading = false
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
      let elH = document.querySelector('.match-list').offsetHeight
      let scrollH = document.querySelector('.list-wrapper').scrollTop
      if (elH - scrollH - 700 > 20) return
      let page = this.pageNo + 1
      if (page * this.pageNo >= this.pageTotal) return
      setTimeout(() => {
        this.load()
      }, 200)
    },
    load () {
      this.pageNo += 1
      this._getMatch()
    },
    handleChangeLive (match) {
      this.$emit('change-match', match)
      this.$emit('go-match', 0)
    }
  }
}
</script>

<style lang="scss">
@import "../../css/Match.scss";
</style>
