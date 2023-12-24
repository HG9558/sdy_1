<template>
  <div :class="['code-container', site]">
    <div class="code-top_text">
      <span v-if="returnWater" :class="['return-num', globalState.language]">{{ returnWater }}%</span>
      <span v-if="topTitle" :class="['top_title_txt', globalState.language]">{{ topTitle }}</span>
    </div>
    <div class="code-main already-login">
      <qrcode v-if="userState.token" class="code-img login-code" v-bind="baseCodeData"></qrcode>
      <img v-else width="95" :src="useCommonImgPath('un_login_code.png')" alt="" />
    </div>
    <div class="code_bottom_txt" v-if="hideBottom">
      <slot></slot>
    </div>
    <img
      v-if="showRightEN && componentStrName !== 'DiscountsMenu' && componentStrName !== 'PartnerMenu'"
      :class="['right_en', componentStrName]"
      :src="useImgPath(`base/header_en_${componentStrName}_flag.png`)"
      alt="" />
  </div>
</template>

<script setup lang="ts">
import { useImgPath, useSite, useLogoPath, useCommonImgPath } from '@/hook/usePath';
// import { useGlobalState, useUserState } from '@/stores';
import qrcode from 'vue-qr/src/packages/vue-qr.vue';

const site = useSite();
const globalState = useGlobalState();
const userState = useUserState();
// const theme =
const props = withDefaults(
  defineProps<{
    topTitle: string;
    codeSize?: number;
    showRightEN?: boolean;
    returnWater?: string | number;
    logoSrc?: string;
    codeUrl?: string;
    componentStrName?: string;
    hideBottom?: boolean;
  }>(),
  {
    logoSrc: 'qr_logo.png',
    codeUrl: `https://${window.location.host}/#/app-download`,
    hideBottom: false,
  }
);

const baseCodeData = {
  correctLevel: 3,
  logoScale: 0.26,
  margin: 0,
  size: props.codeSize,
  text: props.codeUrl,
  logoSrc: useLogoPath(props.logoSrc),
};

const codeImg = `url(${useImgPath('base/login_sm_code_container.png')})`;
</script>
<style scoped lang="scss">
@import '../../../assets/style/fonts/font.scss';

.code-container {
  position: relative;
  @include flex(space-between, column);

  &.home-code,
  &.header-code {
    .code-main.already-login {
      background-image: v-bind(codeImg);
      width: 110px;
      height: 110px;

      .login-code {
        width: 93px;
        height: 93px;
      }
    }
  }

  .code-top_text {
    margin-bottom: 0px;
    width: 101px;
    color: var(--m_5);
    font-weight: 600;
    font-size: 16px;
    @include flex(center, column);

    img {
      width: 100%;
      margin-bottom: 5px;
    }
  }

  &.side-bar-code {
    .code-main {
      background-image: none;
    }
  }

  &.header-code {
    .code-main.un-login-main {
      width: 88px;
      height: 94px;

      .un-login {
        width: 90%;
      }
    }
  }

  .code-main {
    width: 110px;
    height: 117px;
    background-size: 100% 100%;
    @include flex(center);

    .home-un-login {
      cursor: pointer;
      width: 80px;
    }

    .un-login {
      width: 68px;
    }

    .login-code {
      width: 86px;
    }

    &.login-code-main {
      width: 170px;
      height: 200px;
      background-size: 100% 100%;

      .login-code {
        width: 120px;
      }
    }

    .download-qrcode {
      width: 81px;
      height: 81px;
    }
  }

  .return-num {
    font-family: myFont;
    font-weight: 700;
    font-size: 40px;
  }

  .top_title_txt {
    &:not(.zh, .zh_tw) {
      font-size: 12px;
    }
  }

  .code_bottom_txt {
    @include flex(center, column);
    font-weight: bold;
    color: var(--m_5);
    text-align: center;
  }

  .right_en {
    position: absolute;
    top: 0px;
    right: -40px;
    height: 215px;
    top: 50%;
    transform: translateY(-50%);
    &.ElectronicMenu {
      height: 180px;
      top: 50%;
      transform: translateY(-50%);
    }
    &.CockfightingMenu {
      height: 146px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

//-
.code-container.template_2_002 {
  &.side-bar-code {
    .code-main {
      background-color: #fff !important;
      padding: 10px !important;
      width: 100px !important;
      height: 100px !important;
      border-radius: 5px;
      img {
        width: 90px !important;
        height: 90px !important;
      }
    }
  }
  &.header-code {
    .code-top_text,
    .code_bottom_txt {
      color: #fff !important;
    }
    .return-num {
      @include text_clip(linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%));
    }
  }
}
</style>
