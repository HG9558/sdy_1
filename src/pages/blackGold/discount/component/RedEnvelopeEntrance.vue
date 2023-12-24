<template>
  <div v-show="visible" class="red-packet-wrapper" ref="elMoving" style="left: 90px; top: 420px">
    <p class="closeBtn el-icon-close" @click="visible = false"></p>
    <div class="content" @click="router2RedEnvelopePage" @mousedown="hdms($event, 1)" @mouseup="hdms($event, 2)">
      <div class="baoImg"></div>
      <div class="clockTxt" v-if="openCountDown || endCountDown">倒计时</div>
      <div class="clockTxt" v-if="openCountDown">
        {{ openCountDown.h_in_d }}:{{ openCountDown.m }}:{{ openCountDown.s }}开始
      </div>
      <div class="clockTxt" v-else-if="endCountDown">
        {{ endCountDown.h_in_d }}:{{ endCountDown.m }}:{{ endCountDown.s }}结束
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { countTime } from '../../../../utils/index';

export default {
  name: 'RedEnvelopeEntrance',
  props: ['refresh', 'initRed'],
  created() {
    if (this.redEnvelopecountTimeInterval) {
      clearInterval(this.redEnvelopecountTimeInterval);
    }
    if (this.countDownEndTimesInterval) {
      clearInterval(this.countDownEndTimesInterval);
    }
  },
  watch: {
    SToken: {
      immediate: true,
      handler(val) {
        val && this._getRedPacketRainInfo();
      },
    },
    refresh(oldVal, newVal) {
      if (oldVal !== newVal) {
        this._getRedPacketRainInfo();
      }
    },
    redEnvelopeOpenCountDown(val) {
      if (val && val === 'reclock') {
        this._getRedPacketRainInfo();
      }
    },
    visible: {
      handler: function (val) {
        if (val) {
          this.$nextTick(() => {
            window.addEventListener('mousemove', this.hdms);
          });
        } else {
          window.removeEventListener('mousemove', this.hdms);
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      visible: false,
      openCountDown: null, // 开启倒计时
      endCountDown: null, // 关闭倒计时
      redEnvelopecountTimeInterval: null,
      countDownEndTimesInterval: null,
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      redEnvelopeOpenCountDown: state => state.discount.redEnvelopeOpenCountDown,
    }),
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.hdms);
  },
  methods: {
    ...mapMutations('discount', ['set_redenvelopeopencountdown']),
    router2RedEnvelopePage() {
      if (this.mv) {
        this.mv = 0;
        return;
      }

      if (!this.token) {
        this.$router.push('/login');
      } else {
        this.$router.push('/redEnvelope');
      }
    },
    async _getRedPacketRainInfo() {
      const { data } = await this.$http.redPacketRainInfo();
      if (data.code) return;
      this.visible = true;
      const { startTime, endTime, validDates } = data.data;
      validDates.sort();

      const nowTime = new Date();
      let nowDay = nowTime.getDay(); // 今天周几
      if (nowDay === 0) {
        nowDay = 7;
      }

      // const today = new Date(Date.parse(`${nowTime.getFullYear()}/${nowTime.getMonth() + 1}/${nowTime.getDate()}`))

      const today = new Date();
      const rangeTimes = validDates.map(x => {
        const dayNeedAdd = x - nowDay;
        const todayCopy = new Date(today.valueOf());
        const newDate = new Date(todayCopy.setDate(todayCopy.getDate() + dayNeedAdd));
        const time1 = new Date(
          Date.parse(`${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()} ${startTime}`)
        );
        const time2 = new Date(
          Date.parse(`${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()} ${endTime}`)
        );
        return { startTime: time1, endTime: time2 };
      });

      // 活动进行中,
      // 获取今天0-24的时间
      let openingData = rangeTimes.find(x => nowTime >= x.startTime && nowTime <= x.endTime);
      if (openingData) {
        this.openCountDown = 0;
        this.set_redenvelopeopencountdown(this.openCountDown);
        this.countDownEndTimes(openingData.endTime);
        return;
      }

      // 如果没有说明这周活动已经结束 计算距离下周开始时间
      if (!rangeTimes.some(x => x.startTime > nowTime)) {
        let dt = rangeTimes[0];
        dt.startTime.setDate(today.getDate() + 7 - nowDay + dt.startTime.getDay());
        dt.endTime.setDate(today.getDate() + 7 - nowDay + dt.endTime.getDay());
      }

      const nextOpenTime = rangeTimes.find(x => x.startTime > nowTime);
      this.redEnvelopecountTimeInterval = setInterval(() => {
        const countDownInfo = countTime(nextOpenTime.startTime);
        // 活动开始 清除开始前倒计时, 启用活动结束倒计时
        if (countDownInfo === 0) {
          this.openCountDown = 0;
          this.set_redenvelopeopencountdown(this.openCountDown);
          clearInterval(this.redEnvelopecountTimeInterval);

          this.countDownEndTimes(nextOpenTime.endTime);
          return;
        }

        this.openCountDown = Object.assign({}, countDownInfo, { endtime: endTime });
        this.set_redenvelopeopencountdown(this.openCountDown);
      }, 1000);
    },

    // 活动结束倒计时
    countDownEndTimes(endtime) {
      // const today = new Date()
      // const realendtime = new Date(Date.parse(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} ${endtime}`))
      if (this.countDownEndTimesInterval) return;

      this.countDownEndTimesInterval = setInterval(() => {
        this.endCountDown = countTime(endtime);

        // 活动结束
        if (this.endCountDown === 0) {
          this._getRedPacketRainInfo();
          this.set_redenvelopeopencountdown('reclock');
          clearInterval(this.countDownEndTimesInterval);
        }
      }, 1000);
    },

    // 拖动
    hdms(e, tr) {
      const { style } = this.$refs.elMoving;
      if (tr === 1) {
        this.trr = 1;
        this.x = parseInt(style.left);
        this.y = parseInt(style.top);
        this.mx = e.clientX;
        this.my = e.clientY;
      } else if (!tr && this.trr) {
        this.mv = 1;
        style.left = this.x + e.clientX - this.mx + 'px';
        style.top = this.y + e.clientY - this.my + 'px';
      } else if (tr === 2) this.trr = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../css/RedEnvelopeEntrance.scss';
</style>
