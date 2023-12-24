<template>
  <el-button
    :class="['count-time-btn', props.styleName, globalState.language]"
    :round="round"
    width="120"
    type="success"
    @click="timer < 0 && emits('click')"
    :disabled="isPhoneCode">
    {{ codeMsg }}
  </el-button>
</template>

<script setup lang="ts">
import { lang } from '@/i18n';
// import { useGlobalState } from '@/stores';

const globalState = useGlobalState();
const props = withDefaults(
  defineProps<{
    isPhoneCode: boolean;
    waitTime?: number;
    startCount: boolean;
    round?: boolean;
    styleName?: string;
  }>(),
  {
    waitTime: 60,
    round: false,
    styleName: '',
  }
);

const emits = defineEmits(['update:startCount', 'click']);
const timer = ref(-1);
const isEnd = ref<boolean>(false);
const timeId = ref<number>(0);

const codeMsg = computed(() =>
  isEnd.value ? lang('重新获取') : timer.value < 0 ? lang('获取验证码') : `${timer.value}${lang('秒后重新发送')}`
);

watch(
  () => props.startCount,
  status => {
    if (!status) {
      timer.value = -1;
      isEnd.value = true;
    } else {
      countDown();
    }
  }
);

const countDown = () => {
  if (timer.value > 0) return;
  isEnd.value = false;
  timer.value = props.waitTime;
  timeId.value = setInterval(() => {
    --timer.value;
    if (timer.value < 0) {
      clearInterval(timeId.value);
      isEnd.value = true;
      emits('update:startCount', false);
    }
  }, 1000);
};

onBeforeUnmount(() => {
  emits('update:startCount', false);
  clearInterval(timeId.value);
  isEnd.value = true;
  timer.value = -1;
});
</script>

<style scoped lang="scss">
.count-time {
  min-width: 130px;
  min-height: 35px;
  color: red;
  background-color: transparent;
}

.count-time-btn {
  background: var(--l_30);
  color: #fff !important;
  border-radius: 10px;
  width: 120px;
  height: 48px;
  border: 0px;
  &:not(.zh, .zh_tw) {
    width: auto;
  }

  &:hover {
    background: var(--l_31);
    color: #fff !important;
    border: 0px;
  }

  &.rmb_count_time {
    height: 40px;
    background: transparent;
    color: var(--l_35) !important;
    border: 1px solid var(--l_35);

    &:hover {
      background: var(--l_36);
      color: #fff !important;
      border: 0px;
    }
  }
}
</style>
