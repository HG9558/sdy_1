<template>
  <div v-show="visible" class="red-packet-wrapper" ref="elMoving" style="left: 90px; top: 420px">
    <p class="closeBtn el-icon-close" @click="visible = false"></p>
    <div class="content" @click="router2RedEnvelopePage" @mousedown="hdms($event, 1)" @mouseup="hdms($event, 2)">
      <div class="baoImg"></div>
			<div v-show="countDownText === $t('进行中')" class="clockTxt" v-html="countDownText"></div>
		</div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'RedEnvelopeEntrance',
  props: ['refresh', 'initRed'],
  created() {
    if (this.countDownEndTimesInterval) {
      clearInterval(this.countDownEndTimesInterval);
    }
  },
  watch: {
    SToken: {
      immediate: true,
      handler(val) {
        val && this._getRedEnvelopeActivityTimeInfo();
      },
    },
    refresh(oldVal, newVal) {
      if (oldVal !== newVal) {
        this._getRedEnvelopeActivityTimeInfo();
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
      visible: true,
      countDownEndTimesInterval: null,
      countDownText: '',
      nextDayShow: false,
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      newRedEnvelopeState: state => state.discount.newRedEnvelopeState,
      isRedEnvelopShow: state => state.home.isRedEnvelopShow,
    }),
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.hdms);
  },
  methods: {
    ...mapMutations('discount', ['set_newRedEnvelopeState']),
    ...mapMutations('home', ['set_is_red_envelop_show']),
    router2RedEnvelopePage() {
      if (this.mv) {
        this.mv = 0;
        return;
      }

      if(!this.countDownText) return;

      if (!this.token) {
        this.$router.push('/login');
      } else {
        this.countDownText === this.$t('进行中')
          ? this.$router.push('/newRedEnvelope')
          : this.$router.push('/redEnvelopeRecord');
      }
    },
    async _getRedEnvelopeActivityTimeInfo() {
      const { data } = await this.$http.getRedEnvelopeActivityTimeInfo();
      if (data.code) return;
      let { timestamp, start, endMinute, validDates } = data.data;
      if (!start)  {
        this.visible = false
        this.set_is_red_envelop_show(false)
        return;
      }


      const nowTime = new Date();
      let nowDay = nowTime.getDay();
      if (nowDay === 0) nowDay = 7;
      validDates.sort();
      if(!validDates.includes(nowDay)) {
          this.visible = false
          this.set_is_red_envelop_show(false)
          return;
      }

      let currentTime = timestamp;
      let endTime = new Date();
      endTime.setHours(endTime.getHours() + 1, 0, 0, 0);
      endTime = endTime.getTime() / 1000;
      this.set_is_red_envelop_show(true)

      const today = new Date();
      const rangeTimes = validDates.map(x => {
      const dayNeedAdd = x - nowDay;
      const todayCopy = new Date(today.valueOf());
      const newDate = new Date(todayCopy.setDate(todayCopy.getDate() + dayNeedAdd));
      const time1 =
        new Date(
          Date.parse(`${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()} 00:00:00`)
        ).getTime() / 1000;
      const time2 =
        new Date(
          Date.parse(`${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()} 23:59:59`)
        ).getTime() / 1000;
      return { startTime: time1, endTime: time2 };
      });

      this.countDownEndTimesInterval = setInterval(() => {
        currentTime++;
        rangeTimes.some(item => {
          if (currentTime > item.startTime && currentTime < item.endTime) {
            this.nextDayShow = false;
            return true;
          } else if (currentTime < item.startTime) {
            this.nextDayShow = true;
            endTime = item.startTime;
            return true;
          }
        });

        const laveTimeMinutes = endTime - currentTime;
        const laveHours = parseInt(laveTimeMinutes / 3600);
        const laveMinutes = parseInt((laveTimeMinutes % 3600) / 60);
        const nextMinutes = parseInt((currentTime % 3600) / 60);
        const LaveSecond = laveTimeMinutes % 60;

        if (nextMinutes < endMinute && !this.nextDayShow) {
          this.countDownText = this.$t('进行中');
        } else {
          this.countDownText = `<div>${this.checkTime(laveMinutes)}:${this.checkTime(
            LaveSecond
          )}</div>`;
        }
          this.set_newRedEnvelopeState({
            currentHour: validDates.includes(nowDay)? new Date(endTime*1000).getHours() - 1 : '23',
          });
      }, 1000);
    },
    checkTime(i) {
      return i < 10 ? '0' + i : i;
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
  destroyed() {
    clearInterval(this.countDownEndTimesInterval);
  },
};
</script>

<style lang="scss" scoped>
.red-packet-wrapper {
  height: 159.5px;
  border-radius: 25px;
  position: fixed;
  z-index: 9;
  left: 127px;
  bottom: 135px;
  cursor: pointer;
  user-select: none;
  .closeBtn {
    font-size: 24px;
    position: absolute;
    right: -30px;
    top: -10px;
    color: #909090;
  }
  .baoImg {
		margin: 0 auto;
    width: 90.5px;
    height: 114.5px;
    cursor: pointer !important;
    background: url('./images/envelope.png') no-repeat center center/cover;
  }
  .clockTxt {
    text-align: center;
    white-space: nowrap;
    font-size: 14px;
    color: #d3c294;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
		padding: 0 10px;
  }
  .clockTxt:first-child {
    margin-bottom: 0px;
  }
}

@keyframes swing {
  0% {
  }
  50% {
    -webkit-transform: rotate(10deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
}
</style>
