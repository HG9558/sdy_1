<template>
  <div class="red-envelope-container">
    <div id="floatingEnvelopeList"></div>
    <div class="clicked-envelope" v-if="!isEnd && waitingEnvelopeShow">
      <img
        :src="useCommonImgPath('red_envelopes/openEnvelope.png')"
        @click="openEnvelope"
        :class="isOpening ? 'opening' : ''" />
      <p class="close-btn" @click="waitingEnvelopeShow = false"></p>
    </div>
    <!-- 领取成功 -->
    <div class="envelope-get-successed" v-if="!isEnd && successEnvelopeShow">
      <img class="envelop-img" :src="useCommonImgPath('red_envelopes/successEnvelope.png')" />
      <div class="envelope-title">{{ $t_c('恭喜获得') }}</div>
      <div class="envelope-bonus">{{ envState.vite_currency_map.symbol }}{{ bonusAmount }}</div>
      <div class="envelope-success-txt">{{ adMsg }}</div>
      <div class="envelope-success-btn-grout">
        <div class="btn-grout-img" @click="$router.push('/home')">{{ $t_c('去投注') }}</div>
        <div class="btn-grout-img" @click="continueClick">{{ $t_c('继续抢') }}</div>
      </div>
      <p class="close-btn" @click="successEnvelopeShow = false">
        <span class="iconfont iconsub-add close-icon"></span>
      </p>
    </div>

    <!-- 领取汇总提示 -->
    <div class="envelope-geted-notice" v-if="!isEnd && envelopeGetedNoticeShow">
      <div class="notice-header">
        <span>{{ $t_c('提示') }}</span>
        <span class="notice-close" @click="envelopeGetedNoticeShow = false"
          ><img class="close-img" :src="useCommonImgPath('red_envelopes/noticeHeaderClose.png')"
        /></span>
      </div>
      <div class="notice-body">
        <div>{{ $t_c('红包次数已用完') }}&nbsp;&nbsp;{{ $t_c('充值可获得更多次数') }}</div>
        <div class="notice-body-btn-grout">
          <img
            class="notice-img"
            :src="useCommonImgPath('red_envelopes/closeNotice.png')"
            @click="envelopeGetedNoticeShow = false" />
          <img
            class="notice-img"
            :src="useCommonImgPath('red_envelopes/gotoDepositDark.png')"
            @click="$router.push('/profile/deposit')" />
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-if="isOpening || needMask"></div>
  </div>
</template>

<script setup lang="ts">
import { amountFilter } from '@/utils';
import { formatDate } from 'utils/date';
import { useCommonImgPath } from '@/hook/usePath';
import { computed, onMounted, onUnmounted, ref } from 'vue';
// import { useDiscountState, useEnvState, useUserState } from '@/stores';
import { useRouter } from 'vue-router';
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { lang } from '@/i18n';

const countDownEndTimesInterval = ref<number>();
const createEnvelopeInterval = ref<number>();
const isOpening = ref<boolean>();
const waitingEnvelopeShow = ref<boolean>(false);
const successEnvelopeShow = ref<boolean>(false);
const envelopeGetedNoticeShow = ref<boolean>(false);
const bonusAmount = ref<string>();
const adMsg = ref<string>();
const isEnd = ref<boolean>(false);
const userState = useUserState();
const router = useRouter();
const { messageTip } = useDialog();
const discountState = useDiscountState();
const envState = useEnvState();

onMounted(() => {
  userState._getBankCardList();
  _getRedEnvelopeActivityTimeInfo();
  createEnvelopeInterval.value = setInterval(() => {
    const left = Math.random() * document.body.scrollWidth;
    const top = Math.random() * document.body.scrollHeight;
    const width = Math.floor(Math.random() * 51) + 100;
    addBao(left, top, width);
  }, 200);
});

const addBao = (left: number, top: number, width: number) => {
  const div = document.createElement('div');
  const img = document.createElement('img');
  div.appendChild(img);
  img.className = 'roll';
  img.src = useCommonImgPath('red_envelopes/floatingEnvelope.png');
  div.style.left = 1.2 * left + '' + 'px';
  div.style.top = -top + 'px';
  div.style.width = width + 'px';
  div.className = 'redBox';
  img.addEventListener('click', () => {
    if (isEnd.value) return router.push('/home');
    waitingEnvelopeShow.value = !isEnd.value;
  });
  const floatingEnvelopeList = document.getElementById('floatingEnvelopeList');
  (floatingEnvelopeList as HTMLElement).appendChild(div);
  setTimeout(() => {
    floatingEnvelopeList && floatingEnvelopeList.removeChild(div);
  }, 15 * 1000);
};
const _getRedEnvelopeActivityTimeInfo = async () => {
  const res = await api.redPacketRain.newRedPacketRainInfo();
  if (res.code) return;
  const { timestamp, start, endMinute } = res.data;
  if (!start) {
    return messageTip({
      message: lang('活动已结束 ！'),
      onClose: () => router.replace('/home'),
    });
  }

  let currentTime: number | Date = new Date(timestamp * 1000);
  currentTime = currentTime.getTime() / 1000;
  let endTime: number | Date = new Date();
  endTime.setDate(endTime.getDate() + 1);
  endTime.setHours(0, 0, 0, 0);
  endTime = endTime.getTime() / 1000;

  countDownEndTimesInterval.value = setInterval(() => {
    (currentTime as number)++;
    const nextMinutes = parseInt(((+currentTime % 3600) / 60).toString());
    if (nextMinutes < endMinute) {
      isEnd.value = false;
    } else {
      discountState.set_newRedEnvelopeState({
        currentHour: formatDate(timestamp * 1000, 'HH'),
      });
      isEnd.value = true;
      router.push('/home');
    }
  }, 1000);
};

const needMask = computed(
  () => waitingEnvelopeShow.value || successEnvelopeShow.value || envelopeGetedNoticeShow.value
);

const formatMsg = (res: RedEnvelopeEntranceAPI.applyNewRedEnvelopeRes) =>
  res.msg
    ? res.msg?.replace(/"/g, '').replace(/\n/g, '<br/>')
    : (res.data?.msg as string).replace(/"/g, '').replace(/\n/g, '<br/>');

const openEnvelope = () => {
  isOpening.value = true;
  api.redPacketRain
    .applyNewRedEnvelope()
    .then(res => {
      switch (res.code) {
        case 2000:
          return messageTip({ message: `<div style="text-align:center;padding:10px;">${formatMsg(res)}</div>` });
        case 1000001:
          return messageTip({
            message: formatMsg(res),
            onClose: () => {
              router.push('/profile/baseInfo');
            },
          });
        case 1000002:
          return messageTip({
            message: formatMsg(res),
            onClose: () => {
              router.push('/profile/wallet');
            },
          });
        case 1000003:
          return messageTip({
            message: formatMsg(res),
            onClose: () => {
              router.push('/redEnvelopeRecord');
            },
          });
        default:
          break;
      }

      if (res.data?.amount == null) return (envelopeGetedNoticeShow.value = true);
      bonusAmount.value = amountFilter(res.data?.amount);
      adMsg.value = res.data.adMsg;
      successEnvelopeShow.value = true;
    })
    .finally(() => {
      isOpening.value = false;
      waitingEnvelopeShow.value = false;
    });
};

onUnmounted(() => {
  createEnvelopeInterval.value && clearInterval(createEnvelopeInterval.value);
  countDownEndTimesInterval.value && clearInterval(countDownEndTimesInterval.value);
});

const continueClick = () => {
  if (!isEnd.value) {
    successEnvelopeShow.value = false;
  } else {
    router.push('/home');
  }
};

const bgImg = `url(${useCommonImgPath('red_envelopes/bg.jpg')})`;
const closeIconImg = `url(${useCommonImgPath('red_envelopes/closeIconWhite.png')})`;
</script>

<style lang="scss" scoped>
.red-envelope-container {
  overflow: hidden;
  height: 100vh;
  background-size: cover !important;
  background: v-bind(bgImg) center center;
  background-position-y: 0px;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: #000000;
    opacity: 0.3;
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
  animation: redImg 25s linear;
  img {
    width: 100%;
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
  .close-btn {
    background: v-bind(closeIconImg) no-repeat center;
    background-size: cover;
    width: 30px;
    height: 30px;
    position: absolute;
    right: -20px;
    top: -30px;
    margin: 0;
    cursor: pointer;
    @include flex(center);
  }
}
.envelope-get-successed {
  z-index: 11;
  position: relative;
  margin: 0 auto;
  width: 591px;
  top: 50%;
  transform: translateY(-65%);
  .envelope-title {
    font-size: 30px;
    @include text_clip(linear-gradient(180deg, #f4e993 0%, #deb26c 100%));
    position: absolute;
    top: 20%;
    width: 100%;
    text-align: center;
  }
  .envelop-img {
    width: 100%;
    height: auto;
  }
  .close-btn {
    background: v-bind(closeIconImg) no-repeat center;
    background-size: cover;
    width: 30px;
    height: 30px;
    position: absolute;
    right: -30px;
    top: 20px;
    margin: 0;
    cursor: pointer;
    @include flex(center);
  }
  .envelope-bonus {
    position: absolute;
    top: 29%;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
  }
  .envelope-success-txt {
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translateX(-50%);
    @include text_clip(linear-gradient(180deg, #f4e993 0%, #deb26c 100%));
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    -webkit-line-clamp: 3;
  }
  .envelope-success-btn-grout {
    @include flex(center);
    position: absolute;
    top: 78%;
    width: 100%;
    text-align: center;
    .btn-grout-img {
      // width: 88px;
      margin: 0 30px;
      padding: 0 20px;
      height: 28px;
      background: linear-gradient(180deg, #f4e993 0%, #deb26c 100%);
      box-shadow: 0px 0px 2px #5c2827;
      border-radius: 5px;
      color: #b43736;
      text-align: center;
      font-size: 16px;
      line-height: 28px;
      cursor: pointer;
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
  color: #fff;
  text-align: center;
  .notice-header {
    border-radius: 20px 20px 0 0;
    background-color: #df2f2f;
    text-align: center;
    width: 100%;
    line-height: 41px;
    vertical-align: middle;
    font-size: 18px;
    color: #fff;
    border-bottom: 2px solid #fff;
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
