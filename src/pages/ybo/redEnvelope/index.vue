<template> 
  <div class="red-envelope-container">
    <!-- 返回按钮 -->
    <!-- <div @click="$router.push('/')" class="backBox">
      <span class="iconjiantou iconfont"></span> <img :src="imgs.sdyBackImg" />
    </div> -->
    <!-- 倒计时 -->
    <div class="clock-txt" v-if="redEnvelopeOpenCountDown && redEnvelopeOpenCountDown.s">
      <span>倒计时</span>
      <span>距离活动开始还有</span>
      <span>{{ redEnvelopeOpenCountDown.h_in_d }}:{{ redEnvelopeOpenCountDown.m }}:{{ redEnvelopeOpenCountDown.s }}</span>
    </div>
    <!-- 红包雨容器 -->
    <div id="floatingEnvelopeList"></div>
    <!-- 点击红包雨红包后 显示的大红包图片 -->
    <div class="clicked-envelope" v-if="isRunning && waitingEnvelopeShow">
      <img src="./images/openEnvelope.png" @click="openEnvelope" :class="isOpening ? 'opening' : ''">
      <p class="close-btn" @click="waitingEnvelopeShow = false"></p>
    </div>
    <!-- 领取成功 -->
    <div class="envelope-get-successed" v-if="isRunning && successEnvelopeShow">
      <img class="envelop-img" src="./images/successEnvelope.png">
      <div class="envelope-bonus">￥{{ bonusAmount }}</div>
      <div class="envelope-success-txt">充值越多抢红包次数越多</div>
      <div class="envelope-success-btn-grout">
        <img class="btn-grout-img" src="./images/gotoDeposit.png" @click="$router.push('/profile/deposit')">
        <img class="btn-grout-img" src="./images/continueOpen.png" @click="successEnvelopeShow = false">
      </div>
      <p class="close-btn" @click="successEnvelopeShow = false">
        <span class="iconfont iconsub-add close-icon"></span>
      </p>
    </div>

    <!-- 领取汇总提示 -->
    <div class="envelope-geted-notice" v-if="isRunning && envelopeGetedNoticeShow">
      <div class="notice-header">
        <span>提示</span>
        <span class="notice-close" @click="envelopeGetedNoticeShow = false"><img class="close-img" src="./images/noticeHeaderClose.png"></span>
      </div>
      <div class="notice-body">
        <div>红包次数已用完&nbsp;&nbsp;充值可获得更多次数</div>
        <div>您已抢到红包{{envelopeGetedInfo && envelopeGetedInfo.redPacketNum}}次</div>
        <div class="rule-list">
          <div class="rule-item" v-for="(rule, index) in envelopeGetedInfo.rules" :key="index">
            <span v-if="rule.minAmount === 0">免费抢红包{{rule.number}}次</span>
            <span v-else>当日存款满{{rule.minAmount}}元, 抢红包次数+{{rule.number}}</span>
            <span>
              <img class="pic" v-if="rule.geted" src="./images/ruleFinished.png">
              <img class="pic" v-else src="./images/ruleNotFinished.png">
            </span>
          </div>       
        </div>
        <div class="notice-body-btn-grout">
          <img class="notice-img" src="./images/closeNotice.png" @click="envelopeGetedNoticeShow = false">
          <img  class="notice-img"  src="./images/gotoDepositDark.png" @click="$router.push('/profile/deposit')">
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-if="isOpening || needMask"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { countTime, amountFilter } from '@/utils'

const floatingEnvelopeImg = require('./images/floatingEnvelope.png')

export default {
  name: 'RedEnvelope',
  data() {
    return {
      imgs: {
        floatingEnvelopeImg,
      },
      createEnvelopeInterval: null,
      leftTimesInterval: null, 
      isOpening: false,
      waitingEnvelopeShow: false,
      successEnvelopeShow: false,
      envelopeGetedNoticeShow: false,
      bonusAmount: null,
      envelopeGetedInfo: null,
    }
  },
  computed: {
    ...mapState({redEnvelopeOpenCountDown:state=>state.discount.redEnvelopeOpenCountDown}),
    isRunning() {
      return this.redEnvelopeOpenCountDown === 0
    },
    needMask() { // 下列状态需要遮挡后的红包点击
      return this.waitingEnvelopeShow || this.successEnvelopeShow || this.envelopeGetedNoticeShow
    },
  },
  watch: {
    redEnvelopeOpenCountDown(val) {
      if (val === 0) { // 0 说明活动已经开始了 倒计时 活动关闭时间
        this.leftTimes(val.endtime)
      }
    },
  },
  created() {
    const vueObject = this
    this.createEnvelopeInterval = setInterval(() => {
      const width = Math.random() * document.body.scrollWidth
      const height = Math.random() * document.body.scrollHeight
      const src = this.imgs.floatingEnvelopeImg
      vueObject.addBao(width, height, src)
    }, 200)
  },
  methods: {
    ...mapMutations('discount',['set_redenvelopeopencountdown']),
    // 点击开启红包
    openEnvelope() {
     
      this.isOpening = true
      this.$http.redPacketClick().then((resp) => {
        // 领取失败 => 
        if (resp.data.code === 2000) {
          this.messageTip({message:resp.msg || resp.data.msg});
          return
        }
        const info = resp.data.data
        // 领取成功 => bonusAmount大于0 弹窗庆祝
        if (info.bonusAmount && info.bonusAmount > 0) {
          this.bonusAmount = amountFilter(info.bonusAmount)
          this.successEnvelopeShow = true
          return
        }

        // 次数用完, 弹窗获取的所有信息
        if (info.bonusAmount == null) {
          const { redPacketNum, redPacketRainRuleDtos } = info
          redPacketRainRuleDtos.sort((a, b) => a.minAmount - b.minAmount) // 按金额从小到大排序
          let leftCount = redPacketNum
          const rules = redPacketRainRuleDtos.map((x) => {
            if (!x.isValid) return x

            if (leftCount > 0) x.geted = true
            leftCount -= x.number
            return x
          })
          this.envelopeGetedInfo = { redPacketNum, rules }
          this.envelopeGetedNoticeShow = true
        }
      }).finally(() => {
        this.isOpening = false
        this.waitingEnvelopeShow = false
      })
    },
    // 关闭倒计时
    leftTimes(endtime) {
      const today = new Date()
      const realendtime = new Date(Date.parse(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} ${endtime}`))
      if (this.leftTimesInterval) return 

      this.leftTimesInterval = setInterval(() => {
        const leftTimeInfo = countTime(realendtime)

        // 结束后清楚定时器 然后通知首页开始计时下次开始时间
        if (leftTimeInfo === 0) {
          this.set_redenvelopeopencountdown('reclock')
          clearInterval(this.leftTimesInterval)
        }
      }, 1000)
    },
    addBao(width, height, src) {
      const div = document.createElement('div')
      const img = document.createElement('img')
      div.appendChild(img)
      img.className = 'roll'
      img.src = src
      /* eslint-disable */
      div.style.left = 1.2 * width + '' + 'px'
      div.style.top = -height + 'px'
       /* eslint-enable */
      div.className = 'redBox'
      div.addEventListener('click', () => { 
        if (this.isRunning) {
          this.waitingEnvelopeShow = true
        }
      })
      const floatingEnvelopeList = document.getElementById('floatingEnvelopeList')
      floatingEnvelopeList.appendChild(div)
      setTimeout(() => {
        floatingEnvelopeList && floatingEnvelopeList.removeChild(div)
      }, 15 * 1000)
    },
  },
  destroyed() {
    if (this.createEnvelopeInterval) {
      clearInterval(this.createEnvelopeInterval)
    }
    if (this.leftTimesInterval) {
      clearInterval(this.leftTimesInterval)
    }
  },
}
</script>

<style lang='scss' scoped>
@import "./css/index.scss"
</style>
