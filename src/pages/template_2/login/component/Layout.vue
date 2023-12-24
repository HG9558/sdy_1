<template>
  <div :class="['login_reg_layout', site, componentType]">
    <div :class="['layout_center_main', globalState.language]">
      <div class="slogan-container">
        <img class="slogan_img mb-4" :src="useLogoPath(`logo_1_${globalState.language}.png`)" alt="" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogoPath, useSite } from '@/hook/usePath';
// import { useGlobalState } from '@/stores';

const site = useSite();
const globalState = useGlobalState();

withDefaults(
  defineProps<{
    componentType?: string;
  }>(),
  {
    componentType: '',
  }
);
</script>

<style scoped lang="scss">
.mobile-login-form {
  position: relative;
  .el-select {
    width: 70px;
    position: absolute;
    left: 40px;
    z-index: 1000;
    top: 0;
    .el-input__inner {
      padding-left: 0;
      padding-right: 10px;
      border-radius: 0 4px 4px 0;
      color: rgba(128, 130, 147, 1) !important;
    }
  }
  .el-select__caret {
    color: var(--l_23) !important;
    font-weight: bold !important;
  }
  .mobile-select {
    .el-input__inner {
      padding-left: 90px;
    }
  }
}
.login_reg_layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: var(--l_19);
  background-size: 100% 100%;
  overflow: auto;
  .layout_center_main {
    @include flex(center, column);
    width: 465px;
    position: relative;
    backdrop-filter: blur(4px);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 0 60px;
    box-sizing: border-box;
    top: 40%;
    &.vi {
      width: 505px;
    }
    .slogan-container {
      @include flex(center, column);
      margin-top: 50px;

      .slogan_img {
        width: 252px;
      }
    }
  }
}



/* 登录注册共有表单样式 */
.form-container {
  width: 465px;
  .forget-div {
    color: var(--l_23);
    font-weight: 500;
    font-size: 14px;
    margin: -10px 0 10px;
    letter-spacing: 0px;
    text-align: right;
  }
  &:deep(.code-from) {
    margin-bottom: 0;
  }
}

.login_reg_layout {
  // + 003
  &.template_2_003 {
    &.register {
      .layout_center_main {
        padding: 42px 0 27px;
      }
    }
    .layout_center_main {
      width: 940px;
      background: rgba(246, 248, 254, 0.4);
      border: 5px solid #ffffff;
      box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
      backdrop-filter: blur(7px);
      border-radius: 10px;
      padding: 140px 0;
      .slogan-container {
        margin-top: 0;
      }
    }
  }
}
</style>
