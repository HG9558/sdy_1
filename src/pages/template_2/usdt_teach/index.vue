<template>
  <div :class="['usdt-teach', site]">
    <div class="contaienr">
      <h1>
        {{ $t_c('USDT充值教程') }}
        <el-icon class="close" @click="$router.go(-1)">
          <CloseBold />
        </el-icon>
      </h1>
      <div class="step-one"></div>
      <div class="step-two"></div>
      <div class="step-three"></div>
      <div class="step-four"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImgPath, useSite } from '@/hook/usePath'

const site = useSite()
const bg1 = `url(${useImgPath('profile/usdt_step-1.png')})`
const bg2 = `url(${useImgPath('profile/usdt_step-2.png')})`
const bg3 = `url(${useImgPath('profile/usdt_step-3.png')})`
const bg4 = `url(${useImgPath('profile/usdt_step-4.png')})`
</script>

<style lang="scss" scoped>
.usdt-teach {
  padding: 44px 0;
  background-size: contain;

  .contaienr {
    width: 1200px;
    margin: 0 auto;
    border-radius: 10px;
    background: var(--u_c_7);
    overflow: hidden;
  }

  h1 {
    background: var(--u_c_6);
    height: 62px;
    line-height: 62px;
    font-weight: 500;
    font-size: 20px;
    color: var(--u_c_7);
    text-align: center;
    position: relative;

    .close {
      position: absolute;
      right: 25px;
      top: 18px;
      font-size: 28px;
      cursor: pointer;
    }
  }

  .step-one {
    height: 1520px;
    margin: 20px 0 0;
    background: v-bind(bg1) no-repeat center top / 1120px auto;
  }

  .step-two {
    height: 830px;
    background: v-bind(bg2) no-repeat center top / 1120px auto;
  }

  .step-three {
    height: 820px;
    background: v-bind(bg3) no-repeat center top / 1120px auto;
  }

  .step-four {
    height: 950px;
    background: v-bind(bg4) no-repeat center top / 1120px auto;
  }
}

//- 002
.usdt-teach {
  &.template_2_002 {
    h1 {
      color: #fff !important;
    }
  }
}
</style>
