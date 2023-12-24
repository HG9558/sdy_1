<template>
  <div :class="['base-description', site]">
    <div class="base-title">
      {{ $t_c('为了您的隐私安全，信息在提交后将无法修改。如需帮助请') }}
      <a :href="serUrl" class="service-link" target="_black">{{ $t_c('联系客服') }}</a>
    </div>

    <div class="base-content">
      <span class="base-text">{{ $t_c('真实姓名：') }}</span>
      <span class="real-text"> {{ handleRealName(userState.userInfo.realName) }}</span>
    </div>
    <div class="base-content">
      <span class="base-text">{{ $t_c('性 别：') }}</span>
      <span class="real-text"> {{ userState.userInfo.gender }}</span>
    </div>
    <div class="base-content">
      <span class="base-text">{{ $t_c('出生日期：') }}</span>
      <span class="real-text">
        {{ userState.userInfo.birthday && formatDate(userState.userInfo.birthday, 'YYYY-MM-DD') }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useUserState } from '@/stores';
import { formatDate } from 'utils/date';
import { handleRealName } from '@/utils/filter';
import { useSite } from '@/hook/usePath';

const site = useSite();
const userState = useUserState();
defineProps<{
  serUrl: string;
}>();
</script>

<style lang="scss" scoped>
.base-description {
  font-size: 14px;
  .base-title {
    color: var(--u_d_1);
    margin: 26px 0 30px;
    .service-link {
      color: var(--u_d_2);
    }
  }
  .base-content {
    margin-bottom: 26px;
    @include flex(flex-start);
    .base-text {
      color: var(--u_d_1);
      width: 100px;
    }
    .real-text {
      color: var(--u_d_1);
    }
  }
}
.base-description {
  &.template_2_002 {
    .service-link {
      color: #ff00f3;
    }

    .base-content {
      .base-text,
      .real-text {
        color: #fff;
      }
    }
  }
}
</style>
