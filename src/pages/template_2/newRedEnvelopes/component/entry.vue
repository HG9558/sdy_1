<template>
  <div v-show="visible" :class="['red-packet-wrapper', props.styleType]" @click="goTargetPage">
    <!-- <div class="clockTxt" v-html="countDownText"></div> -->
    <p class="closeBtn" @click="visible = false"></p>
    <img
      class="baoImg"
      :src="
        useImgPath(`${props.styleType === 'homeStyle' ? 'home/other/float_readpack_icon' : 'redEnvelope/envelope'}.png`)
      " />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { api } from '@/api';
// import { useDiscountState } from '@/stores';
import { useRouter } from 'vue-router';
import { useImgPath } from '@/hook/usePath';
import { lang } from '@/i18n';

const visible = ref<boolean>(false);
const countDownEndTimesInterval = ref<number | undefined>(undefined);
const discountState = useDiscountState();
const router = useRouter();
const emits = defineEmits(['goTargetPage', 'closeRedFloat']);
const nextDayShow = ref<boolean>(false);
const countDownText = ref<string>('');

const props = withDefaults(
  defineProps<{
    styleType?: string;
  }>(),
  {
    styleType: '',
  }
);

onMounted(() => {
  if (countDownEndTimesInterval.value) clearInterval(countDownEndTimesInterval.value);
  _getRedPacketRainInfo();
});

const _getRedPacketRainInfo = async () => {
  const res = await api.redPacketRain.newRedPacketRainInfo();
  if (res.code) return emits('closeRedFloat');
  const { timestamp, start, endMinute, validDates } = res.data;
  if (!start) return emits('closeRedFloat');
  visible.value = true;
  const nowTime = new Date();
  let nowDay = nowTime.getDay();
  if (nowDay === 0) nowDay = 7;
  validDates.sort();
  if (!validDates.includes(nowDay)) {
    emits('closeRedFloat');
    return (visible.value = false);
  }

  let currentTime = timestamp;
  let endTime: Date | number = new Date();
  endTime.setHours(endTime.getHours() + 1, 0, 0, 0);
  endTime = endTime.getTime() / 1000;

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

  countDownEndTimesInterval.value = setInterval(() => {
    currentTime++;
    rangeTimes.some(item => {
      if (currentTime > item.startTime && currentTime < item.endTime) {
        nextDayShow.value = false;
        return true;
      } else if (currentTime < item.startTime) {
        nextDayShow.value = true;
        endTime = item.startTime;
        return true;
      }
    });

    const laveTimeMinutes = (endTime as number) - currentTime;
    const laveMinutes = parseInt(((laveTimeMinutes % 3600) / 60).toString());
    const nextMinutes = parseInt(((currentTime % 3600) / 60).toString());
    const LaveSecond = laveTimeMinutes % 60;

    if (nextMinutes < endMinute && !nextDayShow.value) {
      countDownText.value = lang('进行中');
    } else {
      countDownText.value = `<div>${fill0(laveMinutes)}:${fill0(LaveSecond)}</div>`;
    }
    discountState.set_newRedEnvelopeState({
      currentHour: validDates.includes(nowDay) ? new Date((endTime as number) * 1000).getHours() - 1 : '23',
    });
  }, 1000);
};

const fill0 = (i: number) => (i < 10 ? '0' + i : i);

const goTargetPage = () => {
  if (!countDownText.value) return;
  emits('goTargetPage', () => {
    countDownText.value.includes(':') ? router.push('/newRedEnvelopes/record') : router.push('/newRedEnvelopes');
  });
};

onUnmounted(() => {
  clearInterval(countDownEndTimesInterval.value);
});

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
