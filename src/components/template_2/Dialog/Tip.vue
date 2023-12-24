<template>
  <div class="tip_container" v-if="isShow">
    <img class="icon" :src="useImgPath('base/common_send_success.png')" />
    <div class="main_content">{{ props.mainContent }}</div>
    <div class="sub_content" v-if="props.SubContent">{{ props.SubContent }}</div>
  </div>
</template>

<script setup lang="ts">
import { useImgPath } from '@/hook/usePath';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    iconType?: string;
    mainContent?: string;
    SubContent?: string;
  }>(),
  {
    iconType: 'success',
    mainContent: '',
    SubContent: '',
  }
);

const isShow = ref<boolean>(false);
const show = () => (isShow.value = true) && closeTip();
const closeTip = () => setTimeout(() => (isShow.value = false), 1500);

defineExpose({
  show,
  closeTip,
});
</script>

<style lang="scss" scoped>
.tip_container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--u_v_5);
  box-shadow: var(--u_v_6);
  border-radius: 10px;
  padding: 14px 37px;
  @include flex(flex-start, column);

  .icon {
    width: 18px;
    height: 18px;
    margin-bottom: 10px;
  }

  .main_content {
    color: var(--u_v_7);
    font-weight: 500;
    margin-bottom: 14px;
  }

  .sub_content {
    color: var(--u_v_8);
  }
}
</style>
