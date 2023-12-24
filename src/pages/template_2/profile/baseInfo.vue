<template>
  <div :class="['personal-data', site]">
    <top-info :finishBase="finishBase" :bindBankCard="bindBankCard"></top-info>
    <div class="data-box">
      <div class="profile-title">{{ $t_c('基本资料') }}</div>
      <el-divider></el-divider>
      <base-info v-if="finishBase" :serUrl="userState.serUrl"></base-info>
      <real-info v-else></real-info>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TopInfo from './component/baseInfo/TopInfo.vue';
import BaseInfo from './component/baseInfo/BaseInfo.vue';
import RealInfo from './component/baseInfo/RealInfo.vue';
import { useSite } from '@/hook/usePath';
// import { useUserState } from '@/stores';

const userState = useUserState();
const finishBase = computed(
  () => !!userState.userInfo.realName && !!userState.userInfo.birthday && !!userState.userInfo.gender
);
const bindBankCard = computed(() => !!userState.bankcardData.rmb.length || !!userState.bankcardData.crypto.length);
const site = useSite();
</script>

<style lang="scss" scoped>
.data-box {
  border-radius: 16px;
  background: var(--u_d_6);
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  .profile-title {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 500;
  }

  .el-divider--horizontal {
    border-top: 1.2px solid #404469;
    opacity: 0.1;
  }
}

//- 002号模板差异
.personal-data {
  &.template_2_002 {
    .profile-title {
      color: #fff;
    }
  }

  &.template_2_003 {
    .profile-title {
      color: var(--u_d_1);
    }
  }
}
</style>
