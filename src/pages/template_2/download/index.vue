<template>
  <div :class="['app-down-load', site]">
    <div class="app_main_container">
      <div class="main-title">
        <div class="main_title_left">
          <img :src="useImgPath('home/download_title_icon.png')" alt="" />
          <span>GMT+8 {{ nowTime }}</span>
        </div>
        <div class="service-container" @click="goService">
          <span class="servicer-text"> App Download </span>
        </div>
      </div>
      <div class="content">
        <div class="left">
          <div class="branch-title">
            <span class="branch">{{ title }} {{ $t_c('全站APP') }}</span>
            <span>{{ enTitle }}</span>
          </div>
          <div class="slogan">
            {{
              $t_c(
                '全球首家一体化娱乐原生APP，尽显流畅，完美操作。海量体育，电竞顶尖赛事，真人娱乐，彩票投注及电子游艺等，最新最全娱乐项目尽在掌中体验扫码下载，即刻拥有！'
              )
            }}
          </div>
          <div class="download_qr_code">
            <span class="qr_code_title">{{ $t_c('扫码下载') }}</span>
            <qrcode class="qrcode_main" v-bind="baseCodeData"></qrcode>
          </div>
          <div class="link-url-container">
            <div class="operate-tip">
              {{ $t_c('手机亦可直接访问，无需下载，手机输入网址即可') }}
            </div>
            <div class="href-list">
              <a v-for="(item, index) in domainArray" :key="index" :href="item.href">{{ item.text }} </a>
            </div>
          </div>
        </div>
        <div class="right">
          <img class="download-app-demo" :src="useImgPath('home/download-app-demo1.png')" />
        </div>
      </div>
    </div>
  </div>
</template>

<route>
  {meta: {bg: 'bg_3'}}
</route>

<script lang="ts" setup>
import qrcode from 'vue-qr/src/packages/vue-qr.vue';
import { useImgPath, useLogoPath, useSite } from '@/hook/usePath';
// import { useGlobalState, useUserState } from '@/stores';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useCurrentTitle, useEnTitle } from '@/hook/useTitle';

const site = useSite();
const userState = useUserState();
const globalState = useGlobalState();
const nowTime = ref<string>('');
const timer = ref<number>(0);
const title = useCurrentTitle();
const enTitle = useEnTitle();

const goService = () => {
  window.open(userState.serUrl);
};

const baseCodeData = {
  correctLevel: 3,
  logoScale: 0.26,
  margin: 0,
  size: 110,
  text: `https://${window.location.host}/#/app-download`,
  logoSrc: useLogoPath('qr_logo.png'),
};

const domainArray = computed(() => {
  if (!globalState.stationSetting?.showWebSite) return [];
  let arr = globalState.stationSetting.showWebSite?.split(',');
  return arr.map(item => {
    return {
      text: item.trim(),
      href: (!item.includes('http') && (item = `https://${item.trim()}`)) as string,
    };
  });
});

onMounted(() => {
  timer.value = setInterval(timeFormate, 1000);
});

const timeFormate = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
  let date = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
  let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
  let mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
  let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
  nowTime.value = date + '/' + month + '/' + year + ' ' + hh + ':' + mm + ':' + ss;
};

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value);
});

const contentBg = `url(${useImgPath('home/down-load-bg.png')})`;
const qrCodeBg = `url(${useImgPath('home/download_qrcode_bg.png')})`;
const hrefIcon = `url(${useImgPath('home/download_href_icon.png')})`;
</script>

<style lang="scss" scoped>
.app-down-load {
  height: 798px;
  position: relative;

  .app_main_container {
    height: 798px;
    width: 1280px;
    padding-top: 20px;
    margin: 0 auto;

    .main-title {
      height: 86px;
      position: relative;
      @include flex();
      border-bottom: 2px solid var(--a_1);
      box-sizing: border-box;
      padding: 0 20px;
      color: var(--a_2);
      font-weight: 600;
      font-size: 14px;

      .main_title_left {
        @include flex(flex-start);

        img {
          width: 99px;
          height: 62px;
        }
      }

      .service-container {
        position: relative;
        .servicer-text {
          cursor: pointer;
          color: var(--a_3);
          font-size: 12px;
        }

        &::before {
          content: '';
          position: absolute;
          background-color: var(--a_3);
          width: 35px;
          height: 1px;
          right: 0;
          top: -3px;
        }
      }
    }
    .content {
      @include flex();
      background-image: v-bind(contentBg);
      background-size: 743px auto;
      background-repeat: no-repeat;
      background-position: 91px 54px;
      padding-top: 80px;

      .left {
        display: inline-block;
        width: 400px;
        position: relative;
        margin-left: 95px;

        .branch-title {
          @include flex(flex-start, column);
          align-items: flex-start;
          font-size: 14px;
          color: var(--a_4);
          margin-bottom: 15px;
          font-weight: 500;

          .branch {
            color: var(--a_5);
            font-weight: 600;
            font-size: 26px;
            line-height: 36px;
          }
        }

        .slogan {
          font-size: 14px;
          line-height: 22px;
          color: var(--a_4);
          min-width: 420px;
        }
        .download_qr_code {
          background-image: v-bind(qrCodeBg);
          width: 170px;
          height: 201px;
          background-size: 100% 100%;
          @include flex(flex-start, column);
          margin: 34px 0;

          .qr_code_title {
            font-weight: 600;
            font-size: 14px;
            color: var(--a_6);
            padding-top: 17px;
          }

          .qrcode_main {
            margin-top: 3px;
            width: 110px;
            height: 110px;
          }
        }
      }

      .right {
        .download-app-demo {
          width: 671px;
        }
      }
    }

    .link-url-container {
      @include flex(flex-start, column, wrap, flex-start);
      position: relative;
      max-width: 500px;
      color: var(--a_5);
      font-size: 14px;

      .operate-tip {
        flex-shrink: 0;
        font-weight: bold;
      }
      .href-list {
        padding-left: 30px;
        position: relative;
        margin-top: 4px;
        @include flex(flex-start, row, wrap);

        a {
          font-size: 14px;
          color: var(--a_4);
          margin-left: 10px;
          line-height: 20px;
        }

        :before {
          content: '';
          position: absolute;
          left: 0;
          width: 26px;
          height: 26px;
          top: 50%;
          transform: translateY(-50%);
          background-image: v-bind(hrefIcon);
          background-size: 100% 100%;
        }
      }
    }
  }
}

.app-down-load {
  &.template_2_003 {
    .content {
      padding-top: 60px;
      background-position: 90px 20px;
    }
  }
}
</style>
