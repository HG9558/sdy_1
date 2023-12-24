<template>
  <div class="luck-draw-wrapper">
    <div class="luck-banner">
      <template v-if="drawConfig.prizesList && drawConfig.prizesList.length">
        <div class="zhuanpan-wrapper" @click="startCallBack()">
          <div class="circle-out">
          </div>
          <LuckyWheel
                  class="luck-draw"
                  ref="LuckyWheel"
                  :prizes="drawConfig.prizesList"
                  :default-config="defaultConfig"
                  :blocks="blocks"
                  :default-style="defaultStyle"
                  :buttons="drawConfig.buttons"
                  @start="startCallBack"
                  @end="endCallBack"
          />
        </div>
      </template>
      <div class="jiangbei"></div>
      <div class="luck-draw-content_number">
        剩余
        <span class="luck-draw-content_number_dot">{{ activeLotteryInfo.remainingTimes || 0 }}</span>
        次抽奖机会
      </div>
    </div>
    <div class="bottom-wraper">
      <div
              class="activity-detail"
              v-html="content"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import zhizhenImg from './img/zhizhen.png'
import drawBg1 from './img/circle.png'

export default {
  name: 'luckActivity',
  data() {
    return {
      drawConfig: {},
      lotteryInfo: [],
      defaultConfig: { gutter: '1px' },
      defaultStyle: {
        fontSize: '14px',
      },
      blocks: [{ padding: '1px', background: '#000' }],
      drawLottery: {}, // 中奖信息
      showDialog: false,
      content: window.localStorage.getItem("cjContent"),
    }
  },
  computed: {
    activeLotteryInfo() {
      return this.lotteryInfo.find(v => v.prizeArea === 1) || {}
    },
  },
  methods: {
    startCallBack() {
      if (!this.running) {
        if (!this.activeLotteryInfo.remainingTimes > 0) {
          this.messageTip({ message: '抽奖机会已用完，请先获取抽奖机会' });
          return
        }
        this.running = true
        this.$refs.LuckyWheel.play()
        this.accountLottery()
      }
    },
    endCallBack() {
      const prize = this.drawLottery
      if (prize.prizeInfo) {
        // prizeType 奖品类型 1谢谢参与, 2彩金, 3实物奖品
        if (prize.prizeInfo.prizeType !== 1) {
          // this.showDialog = true
          this.messageTip({ message: `恭喜您获得：${prize.title}, 请联系客服，进行领取` });
        } else {
          this.messageTip({ message: prize.title });
        }
      }
      this.running = false
    },
    getDrawConfigFactory() {
      const buttons = [
        {
          radius: '40px',
          imgs: [{ src: zhizhenImg, width: '180%', top: '-210%' }],
        },
      ]

      return {
        drawBgImg: drawBg1,
        drawButtonImg: zhizhenImg,
        buttons,
      }
    },
    getPrizesList(data = []) {
      const result = []
      data.forEach((item, index) => {
        result.push({
          prizeInfo: item,
          title: item.prizeName,
          background: '#5b3c81',
          fonts: [{
            text: item.prizeName, top: '30%', fontWeight: 'bold', fontColor: '#d2af94',
          }],
          // imgs: [{ src: lotteryStartImg, width: '20%', top: '40%' }],
        })
      })
      return result
    },
    async getLotteryInfo() {
      const res = await this.$http.getLotteryInfo()
      this.lotteryInfo = res.data.data
    },
    async accountLottery() {
      const res = await this.$http.accountLottery()
      if (res && res.data && res.data.data && res.data.code === 0) {
        this.activeLotteryInfo.remainingTimes -= 1
        const index = this.drawConfig.prizesList.findIndex(v => v.title === res.data.data.prizeName)
        this.drawLottery = this.drawConfig.prizesList[index]
        this.$refs.LuckyWheel.stop(index)
      } else {
        this.$refs.LuckyWheel.stop(-1)
      }
    },
  },
  mounted() {
    this.drawConfig = this.getDrawConfigFactory()
    this.getLotteryInfo()
  },
  watch: {
    activeLotteryInfo(value) {
      this.drawConfig = this.getDrawConfigFactory()
      this.drawConfig.prizesList = this.getPrizesList(value.prizeAreaDtos)
    },
  },
  destroyed() {
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
