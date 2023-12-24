<template>
  <div class="red-envelope-container">
    <!-- 倒计时 -->
    <div class="clock-txt" v-if="timeRemaining && timeRemaining.s">
      <span>{{ $t_c('倒计时') }}</span>
      <span>{{ $t_c('距离活动开始还有') }}</span>
      <span>{{ timeRemaining.h_in_d }}:{{ timeRemaining.m }}:{{ timeRemaining.s }}</span>
    </div>
    <!-- 红包雨容器 -->
    <div id="floatingEnvelopeList"></div>
    <!-- 点击红包雨红包后 显示的大红包图片 -->
    <div class="clicked-envelope" v-if="discountState.redEnvelopeOpenCountDown === 0 && waitingEnvelopeShow">
      <img
        :src="useImgPath('redEnvelope/openEnvelope.png')"
        @click="openEnvelope"
        :class="isOpening ? 'opening' : ''" />
      <p class="close-btn" @click="waitingEnvelopeShow = false"></p>
    </div>
    <!-- 领取成功 -->
    <div class="envelope-get-successed" v-if="discountState.redEnvelopeOpenCountDown === 0 && successEnvelopeShow">
      <img class="envelop-img" :src="useImgPath('redEnvelope/successEnvelope.png')" />
      <div class="envelope-bonus">￥{{ bonusAmount }}</div>
      <div class="envelope-success-txt">{{ $t_c('充值越多抢红包次数越多') }}</div>
      <div class="envelope-success-btn-grout">
        <img
          class="btn-grout-img"
          :src="useImgPath('redEnvelope/gotoDeposit.png')"
          @click="$router.push('/profile/deposit')" />
        <img
          class="btn-grout-img"
          :src="useImgPath('redEnvelope/continueOpen.png')"
          @click="successEnvelopeShow = false" />
      </div>
      <p class="close-btn" @click="successEnvelopeShow = false">
        <span class="iconfont iconsub-add close-icon"></span>
      </p>
    </div>

    <!-- 领取汇总提示 -->
    <div class="envelope-geted-notice" v-if="discountState.redEnvelopeOpenCountDown === 0 && envelopeGetedNoticeShow">
      <div class="notice-header">
        <span>{{ $t_c('提示') }}</span>
        <span class="notice-close" @click="envelopeGetedNoticeShow = false"
          ><img class="close-img" :src="useImgPath('redEnvelope/noticeHeaderClose.png')"
        /></span>
      </div>
      <div class="notice-body">
        <div>{{ $t_c('红包次数已用完') }}&nbsp;&nbsp;{{ $t_c('充值可获得更多次数') }}</div>
        <div>{{ $t_c('您已抢到红包') }}{{ envelopeGetedInfo && envelopeGetedInfo.redPacketNum }}{{ $t_c('次') }}</div>
        <div class="rule-list">
          <div class="rule-item" v-for="(rule, index) in envelopeGetedInfo.rules" :key="index">
            <span v-if="rule.minAmount === 0">{{ $t_c('免费抢红包') }}{{ rule.number }}{{ $t_c('次') }}</span>
            <span v-else>{{ $t_c('当日存款满') }}{{ rule.minAmount }}, {{ $t_c('抢红包次数') }}+{{ rule.number }}</span>
            <span>
              <img class="pic" v-if="rule.geted" :src="useImgPath('redEnvelope/ruleFinished.png')" />
              <img class="pic" v-else :src="useImgPath('redEnvelope/ruleNotFinished.png')" />
            </span>
          </div>
        </div>
        <div class="notice-body-btn-grout">
          <img
            class="notice-img"
            :src="useImgPath('redEnvelope/closeNotice.png')"
            @click="envelopeGetedNoticeShow = false" />
          <img
            class="notice-img"
            :src="useImgPath('redEnvelope/gotoDepositDark.png')"
            @click="$router.push('/profile/deposit')" />
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-if="isOpening || needMask"></div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useImgPath } from '@/hook/usePath';
// import { useDiscountState } from '@/stores';
import { amountFilter } from '@/utils';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';

const discountState = useDiscountState();
const { messageTip } = useDialog();

const floatingEnvelopeImg = useImgPath('redEnvelope/floatingEnvelope.png');
const imgs = { floatingEnvelopeImg };

const createEnvelopeInterval = ref<number>(0);
const leftTimesInterval = ref<number>(0);
const isOpening = ref<boolean>(false);
const waitingEnvelopeShow = ref<boolean>(false);
const successEnvelopeShow = ref<boolean>(false);
const envelopeGetedNoticeShow = ref<boolean>(false);
const bonusAmount = ref<string>('');
const envelopeGetedInfo = reactive<any>({});

const needMask = computed(
  () => waitingEnvelopeShow.value || successEnvelopeShow.value || envelopeGetedNoticeShow.value
);

onMounted(() => {
  createEnvelopeInterval.value = setInterval(() => {
    const width = Math.random() * document.body.scrollWidth;
    const height = Math.random() * document.body.scrollHeight;
    const src = imgs.floatingEnvelopeImg;
    addBao(width, height, src);
  }, 200);
});

const addBao = (width: number, height: number, src: string) => {
  const div = document.createElement('div');
  const img = document.createElement('img');
  div.appendChild(img);
  img.className = 'roll';
  img.src = src;
  div.style.left = 1.2 * width + '' + 'px';
  div.style.top = -height + 'px';
  div.className = 'redBox';
  div.addEventListener('click', () => {
    if (discountState.redEnvelopeOpenCountDown === 0) {
      waitingEnvelopeShow.value = true;
    }
  });
  const floatingEnvelopeList = document.getElementById('floatingEnvelopeList') as HTMLElement;
  floatingEnvelopeList.appendChild(div);
  setTimeout(() => {
    floatingEnvelopeList && floatingEnvelopeList.removeChild(div);
  }, 15 * 1000);
};

// 点击开启红包
const openEnvelope = async () => {
  isOpening.value = true;
  const resp = await api.redPacketRain.redPacketClick();
  isOpening.value = false;
  waitingEnvelopeShow.value = false;
  // 领取失败 =>
  if (resp.code === 2000) {
    return messageTip({ message: resp.msg });
  }
  const info = resp.data;
  // 领取成功 => bonusAmount大于0 弹窗庆祝
  if (info.bonusAmount && info.bonusAmount > 0) {
    bonusAmount.value = amountFilter(info.bonusAmount);
    successEnvelopeShow.value = true;
    return;
  }

  // 次数用完, 弹窗获取的所有信息
  if (info.bonusAmount == null) {
    const { redPacketNum, redPacketRainRuleDtos } = info;
    redPacketRainRuleDtos.sort((a, b) => a.minAmount - b.minAmount); // 按金额从小到大排序
    let leftCount = redPacketNum;
    const rules = redPacketRainRuleDtos.map(x => {
      if (!x.isValid) return x;
      if (leftCount > 0) x.geted = true;
      leftCount -= x.number;
      return x;
    });
    Object.assign(envelopeGetedInfo, { redPacketNum, rules });
    envelopeGetedNoticeShow.value = true;
  }
};

onUnmounted(() => {
  if (createEnvelopeInterval.value) {
    clearInterval(createEnvelopeInterval.value);
  }
  if (leftTimesInterval.value) {
    clearInterval(leftTimesInterval.value);
  }
});

const timeRemaining = computed(() => {
  const r = JSON.parse(JSON.stringify(discountState.redEnvelopeOpenCountDown));
  return r;
});

const redBg = `url(${useImgPath('redEnvelope/bg.jpg')})`;
const closeIconWhite = `url(${useImgPath('redEnvelope/closeIconWhite.png')})`;
</script>

<style lang="scss" scoped>
.red-envelope-container {
  overflow: hidden;
  height: 100vh;
  background-size: cover !important;
  background: v-bind(redBg) center center;

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
}

.clock-txt {
  z-index: 1;
  position: relative;
  top: 30%;
  transform: translateY(-50%);
  width: 35%;
  margin: 0 auto;
  padding: 10px 0;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  border-radius: 10px;

  span {
    color: #fff;
    display: block;
  }
}

@keyframes redImg {
  0% {
  }

  100% {
    transform: translate(-1000px, 3000px);
  }
}

:deep(.redBox) {
  cursor: pointer;
  width: 150px;
  height: 150px;
  z-index: 0;
  position: fixed;
  animation: redImg 20s linear;

  img {
    width: 120px;
    height: auto;
  }
}

.clicked-envelope {
  z-index: 11;
  position: relative;
  margin: 0 auto;
  width: 270px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }

  .opening {
    animation: 0.2s shakingEnvelope infinite;
  }
}

.envelope-get-successed {
  z-index: 11;
  position: relative;
  margin: 0 auto;
  width: 320px;
  top: 50%;
  transform: translateY(-50%);

  .envelop-img {
    width: 100%;
    height: auto;
  }

  .close-btn {
    right: 30px !important;
    background: v-bind(closeIconWhite) no-repeat center;
    background-size: cover;
    width: 30px;
    height: 30px;
    position: absolute;
    right: -30px;
    top: -30px;
    margin: 0;
    cursor: pointer;
    @include flex(center);
  }

  .envelope-bonus {
    position: absolute;
    top: 28%;
    left: 30%;
    color: red;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
  }

  .envelope-success-txt {
    position: absolute;
    top: 62%;
    left: 17%;
    color: #fff;
    font-size: 17px;
    text-align: center;
    font-weight: bold;
  }

  .envelope-success-btn-grout {
    display: flex;
    position: absolute;
    top: 78%;
    left: 15%;

    .btn-grout-img {
      width: 90px;
      height: 32px;
      cursor: pointer;
    }

    :first-child {
      margin-right: 18px;
    }
  }
}

.envelope-geted-notice {
  z-index: 11;
  position: relative;
  margin: 0 auto;
  width: 500px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #e63c3c;
  border-radius: 20px;
  // color: $c-f;
  text-align: center;

  .notice-header {
    border-radius: 20px 20px 0 0;
    background-color: #df2f2f;
    text-align: center;
    width: 100%;
    line-height: 41px;
    vertical-align: middle;
    font-size: 18px;
    // color: $c-f;
    // border-bottom: 2px solid $c-f;
    overflow: hidden;

    .notice-close {
      position: absolute;
      right: 5px;
      top: 4px;
      width: 35px;
      cursor: pointer;

      .close-img {
        width: 100%;
        height: auto;
      }
    }
  }

  .notice-body {
    margin-top: 10px;

    .rule-list {
      border-radius: 5px;
      background-color: #ca1c1d;
      width: 90%;
      margin: 10px auto;

      .rule-item {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        text-align: center;
        line-height: 40px;
        vertical-align: middle;

        .pic {
          width: 20px;
          height: auto;
        }
      }
    }

    .notice-body-btn-grout {
      @include flex(flex-start);
      padding: 15px 0 25px;

      .notice-img {
        cursor: pointer;
        width: 120px;
        height: 40px;
      }

      :first-child {
        margin-right: 100px;
      }
    }
  }
}

@keyframes shakingEnvelope {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(10deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(-10deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
