<template>
  <div v-show="visible" :class="['red-packet-wrapper', props.styleType]" @click="goTargetPage">
    <div class="clockTxt" v-if="openCountDown || endCountDown">{{ $t_c('倒计时') }}</div>
    <div class="clockTxt" v-if="openCountDown">
      {{ openCountDown.h_in_d }}:{{ openCountDown.m }}:{{ openCountDown.s }}{{ $t_c('开始') }}
    </div>
    <p class="closeBtn" @click="visible = false"></p>
    <img
      class="baoImg"
      @click="router2RedEnvelopePage()"
      :src="
        useImgPath(`${props.styleType === 'homeStyle' ? 'home/other/float_readpack_icon' : 'redEnvelope/envelope'}.png`)
      " />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { countTime } from '@/utils';
import { api } from '@/api';
// import { useDiscountState, useUserState } from '@/stores';
import { useRouter } from 'vue-router';
import { useImgPath } from '@/hook/usePath';

const visible = ref<boolean>(false);
const redEnvelopecountTimeInterval = ref<number>(0);
const countDownEndTimesInterval = ref<number | undefined>(undefined);
const openCountDown = ref<any>(null);
const endCountDown = ref<RedEnvelopeEntranceAPI.endCountDownType | number>(0);
const discountState = useDiscountState();
const userState = useUserState();
const router = useRouter();
const emits = defineEmits(['goTargetPage', 'closeRedFloat']);

const props = withDefaults(
  defineProps<{
    styleType?: string;
  }>(),
  {
    styleType: '',
  }
);

onMounted(() => {
  if (redEnvelopecountTimeInterval.value) {
    clearInterval(redEnvelopecountTimeInterval.value);
  }
  if (countDownEndTimesInterval.value) {
    clearInterval(countDownEndTimesInterval.value);
  }
  _getRedPacketRainInfo();
});

const _getRedPacketRainInfo = async () => {
  const res = await api.redPacketRain.redPacketRainInfo();
  if (res.code) return emits('closeRedFloat');
  visible.value = true;
  const { startTime, endTime, validDates } = res.data;
  validDates.sort();

  const nowTime = new Date();
  let nowDay = nowTime.getDay(); // 今天周几
  if (nowDay === 0) nowDay = 7;
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
    openCountDown.value = 0;
    discountState.set_redenvelopeopencountdown(openCountDown.value);
    countDownEndTimes(openingData.endTime);
    return;
  }

  // 如果没有说明这周活动已经结束 计算距离下周开始时间
  if (!rangeTimes.some(x => x.startTime > nowTime)) {
    let dt = rangeTimes[0];
    dt.startTime.setDate(today.getDate() + 7 - nowDay + dt.startTime.getDay());
    dt.endTime.setDate(today.getDate() + 7 - nowDay + dt.endTime.getDay());
  }

  type dateType = { startTime: Date; endTime: Date };

  const nextOpenTime: dateType = rangeTimes.find(x => x.startTime > nowTime) as dateType;

  redEnvelopecountTimeInterval.value = setInterval(() => {
    const countDownInfo = countTime(nextOpenTime.startTime);
    // 活动开始 清除开始前倒计时, 启用活动结束倒计时
    if (countDownInfo === 0) {
      openCountDown.value = 0;
      discountState.set_redenvelopeopencountdown(openCountDown.value);
      clearInterval(redEnvelopecountTimeInterval.value as number);
      countDownEndTimes(nextOpenTime.endTime);
      return;
    }
    openCountDown.value = Object.assign({}, countDownInfo, { endtime: endTime });
    discountState.set_redenvelopeopencountdown(openCountDown.value);
  }, 1000);
};

// 活动结束倒计时
const countDownEndTimes = (endtime: Date) => {
  if (countDownEndTimesInterval.value) return;
  countDownEndTimesInterval.value = setInterval(() => {
    endCountDown.value = countTime(endtime);
    // 活动结束
    if (endCountDown.value === 0) {
      _getRedPacketRainInfo();
      discountState.set_redenvelopeopencountdown('reclock');
      clearInterval(countDownEndTimesInterval.value);
    }
  }, 1000);
};
const router2RedEnvelopePage = () => {
  if (props.styleType === 'homeStyle') return;
  router.push(!userState.token ? '/login' : '/redEnvelope');
};

const goTargetPage = () => {
  emits('goTargetPage');
};

const closeBg = `url(${useImgPath('redEnvelope/closeIcon.png')})`;
</script>

<style lang="scss" scoped>
.red-packet-wrapper {
  width: 100px;
  border-radius: 25px;
  position: fixed;
  z-index: 9;
  right: 10px;
  bottom: 50px;
  cursor: pointer;

  &.homeStyle {
    position: static;
    @include flex(flex-start, column);

    .closeBtn {
      display: none;
    }

    .baoImg {
      width: 60px;
      height: 52px;
    }
  }

  .closeBtn {
    background: v-bind(closeBg) no-repeat center;
    background-size: cover;
    width: 15px;
    height: 15px;
    position: absolute;
    right: 10px;
    top: -20px;
    margin: 0;
    @include flex(center);
  }

  .baoImg {
    animation: 0.4s swing infinite;
    width: 100px;
    -webkit-user-drag: none;
  }

  .clockTxt {
    text-align: center;
    white-space: nowrap;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
    color: transparent;
    -webkit-text-fill-color: #fc9f02;
    -webkit-text-stroke: 0.1px #000;
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
