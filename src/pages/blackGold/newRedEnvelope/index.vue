<template>
  <div class="red-envelope-container">
    <!-- 红包雨容器 -->
    <div id="floatingEnvelopeList"></div>
    <!-- 点击红包雨红包后 显示的大红包图片 -->
    <div class="clicked-envelope" v-if="!isEnd && waitingEnvelopeShow">
      <img src="./images/openEnvelope.png" @click="openEnvelope" :class="isOpening ? 'opening' : ''" />
      <p class="close-btn" @click="waitingEnvelopeShow = false"></p>
    </div>
    <!-- 领取成功 -->
    <div class="envelope-get-successed" v-if="!isEnd && successEnvelopeShow">
      <img class="envelop-img" src="./images/successEnvelope.png" />
      <div class="envelope-title">{{ $t('恭喜获得') }}</div>
      <div class="envelope-bonus">{{ $tt('currencySymbol') }}{{ bonusAmount }}</div>
      <div class="envelope-success-txt">{{ adMsg }}</div>
      <div class="envelope-success-btn-grout">
        <div class="btn-grout-img" @click="$router.push('/')">{{ $t('去投注') }}</div>
        <div class="btn-grout-img" @click="continueClick">{{ $t('继续抢') }}</div>
      </div>
      <p class="close-btn" @click="successEnvelopeShow = false">
        <span class="iconfont iconsub-add close-icon"></span>
      </p>
    </div>

    <!-- 领取汇总提示 -->
    <div class="envelope-geted-notice" v-if="!isEnd && envelopeGetedNoticeShow">
      <div class="notice-header">
        <span>{{ $t('提示') }}</span>
        <span class="notice-close" @click="envelopeGetedNoticeShow = false"
          ><img class="close-img" src="./images/noticeHeaderClose.png"
        /></span>
      </div>
      <div class="notice-body">
        <div>{{ $t('红包次数已用完') }}  {{ $t('充值可获得更多次数') }}</div>
        <div class="notice-body-btn-grout">
					<div class="btn-grout-img" @click="envelopeGetedNoticeShow = false">{{ $t('再看看') }}</div>
					<div class="btn-grout-img" @click="$router.push('/profile/deposit')">{{ $t('去充值') }}</div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-if="isOpening || needMask"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { countTime, amountFilter } from '@/utils';
import { formatDate } from '@/common/js/filter';

const floatingEnvelopeImg = require('./images/floatingEnvelope.png');
export default {
  name: 'NewRedEnvelope',
  data() {
    return {
      imgs: {
        floatingEnvelopeImg,
      },
      countDownEndTimesInterval: null,
      createEnvelopeInterval: null,
      isOpening: false,
      waitingEnvelopeShow: false,
      successEnvelopeShow: false,
      envelopeGetedNoticeShow: false,
      bonusAmount: null,
      envelopeGetedInfo: null,
      adMsg: '',
      isEnd: false,
    };
  },
  watch: {
    SToken: {
      immediate: true,
      handler(val) {
        if (val) {
          this._getBankCardList();
          this._getRedEnvelopeActivityTimeInfo();
        }
      },
    },
  },
  computed: {
    ...mapState({
      newRedEnvelopeState: state => state.discount.newRedEnvelopeState,
      bankcardData: state => state.user.bankcardData,
    }),
    needMask() {
      return this.waitingEnvelopeShow || this.successEnvelopeShow || this.envelopeGetedNoticeShow;
    },
  },
  created() {
    this.createEnvelopeInterval = setInterval(() => {
      const left = Math.random() * document.body.scrollWidth;
      const top = Math.random() * document.body.scrollHeight;
      const width = Math.floor(Math.random() * 51) + 100;
      this.addBao(left, top, width);
    }, 200);
  },
  methods: {
    ...mapMutations('discount', ['set_newRedEnvelopeState']),
    ...mapActions('user', ['_getBankCardList']),
    async _getRedEnvelopeActivityTimeInfo() {
      const { data } = await this.$http.getRedEnvelopeActivityTimeInfo();
      if (data.code) return;
      const { timestamp, start, endMinute } = data.data;
      if (!start) {
        this.messageTip({
          message: this.$t('活动已结束 ！'),
          onClose: () => {
            this.$router.push('/');
          },
        });
        return;
      }
      let currentTime = new Date(timestamp * 1000);
      currentTime = currentTime.getTime() / 1000;
      let endTime = new Date();
      endTime.setDate(endTime.getDate() + 1);
      endTime.setHours(0, 0, 0, 0);
      endTime = endTime.getTime() / 1000;

      this.countDownEndTimesInterval = setInterval(() => {
        currentTime++;
        const laveTimeMinutes = endTime - currentTime;
        const laveMinutes = parseInt((laveTimeMinutes % 3600) / 60);
        const nextMinutes = parseInt((currentTime % 3600) / 60);
        if (nextMinutes < endMinute) {
          this.isEnd = false;
        } else {
          this.set_newRedEnvelopeState({
            currentHour: formatDate(timestamp * 1000, 'HH'),
          });
          this.isEnd = true;
          this.$router.push('/');
        }
      }, 1000);
    },
    // 点击开启红包
    openEnvelope() {
      this.isOpening = true;
      this.$http
        .applyNewRedEnvelope()
        .then(res => {
          if (res.data.code === 2000) {
              return this.messageTip({ message: res.msg ? res.msg?.replace(/"/g, '') : res.data.msg?.replace(/"/g, '') });
          }

          if(res.data.code===1000001) {
              return this.messageTip({
                message: res.msg ? res.msg?.replace(/"/g, '') : res.data.msg?.replace(/"/g, ''),
                onClose: () => {
                  this.$router.push('profile/baseInfo');
                },
              });
          }

          if(res.data.code===1000002) {
            return this.messageTip({
              message: res.msg ? res.msg?.replace(/"/g, '') : res.data.msg?.replace(/"/g, ''),
              onClose: () => {
                  this.$router.push('profile/wallet');
              },
            });
          }

          if(res.data.code===1000003) {
            return this.messageTip({
              message: res.msg ? res.msg?.replace(/"/g, '') : res.data.msg?.replace(/"/g, ''),
              onClose: () => {
                  this.$router.push('redEnvelopeRecord');
              },
            });
          }

          const info = res.data.data;
          if (info.amount == null) {
            this.envelopeGetedNoticeShow = true;
            return;
          }
          // if (info.amount && info.amount > 0) {
          this.bonusAmount = amountFilter(info.amount);
          this.adMsg = info.adMsg;
          this.successEnvelopeShow = true;
          // return;
          // }
        })
        .finally(() => {
          this.isOpening = false;
          this.waitingEnvelopeShow = false;
        });
    },
    continueClick() {
      if (!this.isEnd) {
        this.successEnvelopeShow = false;
      } else {
        this.$router.push('/');
      }
    },
    addBao(left, top, width) {
      const div = document.createElement('div');
      const img = document.createElement('img');
      div.appendChild(img);
      img.className = 'roll';
      img.src = this.imgs.floatingEnvelopeImg;
      div.style.left = 1.2 * left + '' + 'px';
      div.style.top = -top + 'px';
      div.style.width = width + 'px';
      div.className = 'redBox';
      img.addEventListener('click', () => {
        if (this.isEnd) return this.$router.push('/');
        this.waitingEnvelopeShow = !this.isEnd;
      });
      const floatingEnvelopeList = document.getElementById('floatingEnvelopeList');
      floatingEnvelopeList.appendChild(div);
      setTimeout(() => {
        floatingEnvelopeList && floatingEnvelopeList.removeChild(div);
      }, 15 * 1000);
    },
  },
  beforeDestroy() {
    this.createEnvelopeInterval && clearInterval(this.createEnvelopeInterval);
    this.countDownEndTimesInterval && clearInterval(this.countDownEndTimesInterval);
  },
};
</script>

<style lang="scss" scoped>
@import './css/index.scss';
</style>
