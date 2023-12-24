<template>
  <div :class="['micro_page_container']">
    <template v-if="isShow">
      <div class="micro_page_section_first">
        <div class="title_part"></div>
        <div class="main_content">
          <div class="content_game">
            <div class="content_box" v-if="transferSuccess && microData?.url">
              <WujieVue
                width="100%"
                height="100%"
                :url="microData?.url"
                :name="(microData?.depotCode as string)"
                :alive="true"
                :activated="activated"
                :exec="true"></WujieVue>
            </div>
            <SelfLoading :showLoading="!microData?.depotCode" />
            <div :class="['full_screen_btn', globalState.language]" @click="fullScreenClick">
              <img class="full_screen_icon" :src="useCommonImgPath('micro_game/xiaoai/full_srceen_icon.png')" />
              <span>{{ $t_c('全屏') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="micro_page_section_bottom">
        <div class="title_container">
          <img
            v-if="globalState.language === 'zh'"
            class="zh_img"
            :src="useCommonImgPath('micro_game/xiaoai/game_show_txt.png')" />
          <img class="en_img" :src="useCommonImgPath('micro_game/xiaoai/game_show.png')" />
        </div>
        <div class="micro_page_section_bottom_one">
          <el-carousel
            :interval="5000"
            :autoplay="true"
            arrow="always"
            indicator-position="none"
            height="428"
            ref="sliderRefOne">
            <el-carousel-item v-for="item in 3" :key="item">
              <img v-for="_ in 5" :key="_" :src="useCommonImgPath(`micro_game/xiaoai/i_${item}_${_}.png`)" />
            </el-carousel-item>
          </el-carousel>
          <img
            :src="useCommonImgPath('micro_game/xiaoai/left_arrow.png')"
            class="arrow left"
            @click="picChange('left')" />
          <img
            :src="useCommonImgPath('micro_game/xiaoai/right_arrow.png')"
            class="arrow right"
            @click="picChange('right')" />
        </div>
        <div class="title_container">
          <img
            v-if="globalState.language === 'zh'"
            class="zh_img"
            :src="useCommonImgPath('micro_game/xiaoai/game_show_txt_1.png')" />
          <img class="en_img" :src="useCommonImgPath('micro_game/xiaoai/game_show_1.png')" />
        </div>
        <div class="micro_page_section_bottom_two">
          <div class="tab_container">
            <div
              :class="['tab_list', index === currentSelIndex && 'on']"
              v-for="(item, index) in tabList"
              :key="index"
              @click="currentSelIndex = index">
              {{ item.val }}
            </div>
          </div>
          <div class="micro_page_section_bottom_two_content">
            <el-carousel :interval="5000" indicator-position="outside" height="392px" :show-overflow="false">
              <el-carousel-item v-for="i in tabList[currentSelIndex].len" :key="i">
                <img
                  v-for="_ in 2"
                  :key="_"
                  :src="
                    useCommonImgPath(
                      `micro_game/xiaoai/${tabList[currentSelIndex].val.toLocaleLowerCase()}${i}-${_}.jpg`
                    )
                  " />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </template>
    <template v-if="microData.url && (!isShow || !currentGame?.firstPageShow)">
      <div :class="['full_screen_container', microData?.depotCode]">
        <div
          :class="['collapse_button', currentGame.depotCode]"
          @click="isFullScreen = false"
          v-if="currentGame?.firstPageShow">
          <img class="full_screen_icon" :src="useCommonImgPath('micro_game/xiaoai/collapse_srceen_icon.png')" />
          <span>{{ $t_c('收起') }}</span>
        </div>
        <WujieVue
          width="100%"
          height="100%"
          :url="microData?.url"
          :name="(microData?.depotCode as string)"
          :alive="true"
          :activated="activated"
          :exec="true"></WujieVue>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import useGameHook from '@/hook/useGameHook';
import { useCommonImgPath } from '@/hook/usePath';
import { lang } from '@/i18n';
import type { CarouselInstance } from 'element-plus';
import WujieVue from 'wujie-vue3';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import useDialog from '@/hook/useDialog';

const route = useRoute();
const globalState = useGlobalState();
const sliderRefOne = ref<CarouselInstance>();
const currentSelIndex = ref(0);
const normalState = useNormalState();
const isFullScreen = ref(route.params.id !== 'XA');
const { _getRecover } = useGameHook();
const userState = useUserState();
const gameState = useGameState();
const depotCode = ref(route.params.id);
const transferSuccess = ref(false);
const { messageTip } = useDialog();
const isError = ref(false);
const router = useRouter();
const tabList = reactive([
  {
    val: lang('ICE'),
    len: 5,
  },
  {
    val: lang('G2E'),
    len: 5,
  },
  {
    val: lang('HLwn'),
    len: 2,
  },
  {
    val: lang('PAGE'),
    len: 4,
  },
]);
const currentGame = computed(() => gameState.microSourceDataList.find(_ => _.depotCode === depotCode.value));

watch(
  () => currentGame.value,
  v => {
    isFullScreen.value = !v?.firstPageShow;
  },
  {
    immediate: true,
  }
);

watch(
  () => route.params,
  v => {
    depotCode.value = v.id;
  },
  {
    immediate: true,
  }
);

const isShow = computed(() => {
  return !isFullScreen.value && currentGame.value?.firstPageShow;
});

const microData = computed(() => {
  return normalState.microGameUrlList.find(_ => _.depotCode === route.params.id) ?? { depotCode: '', url: '' };
});

const freeTransferPlatform = async () => {
  const res = await api.game.freeTransferPlatform({
    gameId: currentGame.value?.id as number,
  });
  if (res.code) {
    messageTip({
      message: res.msg,
      duration: 2000,
      onClose: () => {
        isError.value = true;
        router.replace('/home');
      },
    });
  } else {
    transferSuccess.value = true;
    userState._getCenterMoney();
  }
};

watch(
  () => microData.value,
  _ => {
    if (!userState.token) {
      return (transferSuccess.value = true);
    }
    if (_.depotCode && userState.token) {
      if (!!userState.userInfo.freeWalletSwitch) {
        freeTransferPlatform();
      } else {
        transferSuccess.value = true;
      }
    }
  },
  {
    immediate: true,
  }
);

const picChange = (direction: string) => {
  if (direction === 'left') sliderRefOne.value?.prev();
  else sliderRefOne.value?.next();
};

const activated = () => {
  document.documentElement.style.fontSize = '16px';
  if (microData.value.depotCode === 'XA') {
    const timer = setInterval(() => {
      const frameBody = (window.document.querySelector('iframe[name=XA]') as HTMLIFrameElement)?.contentWindow?.document
        .body;
      if (frameBody && frameBody.querySelector('.refresh')) {
        frameBody.style.position = 'absolute';
        try {
          (frameBody.querySelector('.common-layout') as HTMLElement).style.position = 'absolute';
          (frameBody.querySelector('.lang-select') as HTMLElement)!.style.display = 'none';
          (frameBody.querySelector('.refresh') as HTMLElement).click();
        } catch (e) {
          console.log('230行打印：============:', e);
        }
        clearInterval(timer);
      }
    }, 500);
  }
  if (microData.value.depotCode === 'TF') {
    const timer = setInterval(() => {
      const frameBody = (window.document.querySelector('iframe[name=TF]') as HTMLIFrameElement)?.contentWindow?.document
        .body;
      if (frameBody && frameBody.querySelector('.content-footer')) {
        document.documentElement.style.fontSize = '62.5%';
        (frameBody.querySelector('.content-footer') as HTMLDivElement).style.display = 'none';
        (frameBody.querySelector('.main-content') as HTMLDivElement).style.height = 'calc(100% - 9rem)';
        clearInterval(timer);
      }
    }, 500);
  }
  if (microData.value.depotCode === 'STG') {
    const timer = setInterval(() => {
      const frameElement = (window.document.querySelector('iframe[name=STG]') as HTMLIFrameElement)?.contentWindow
        ?.document.documentElement;
      if (frameElement) {
        const remRatio = (window.innerWidth / 1280) * 100 + 'px';
        const fontSize = remRatio;
        document.documentElement.style.fontSize = fontSize;
        clearInterval(timer);
      }
    }, 500);
  }
};

const fullScreenClick = () => {
  isFullScreen.value = true;
};

onBeforeUnmount(() => {
  document.documentElement.style.fontSize = '16px';
  if (!userState.token || isError.value || currentGame.value?.availableWh === 2) return;
  _getRecover(currentGame.value?.depotName ?? (currentGame.value?.titleTag as string), 2, 'http');
});

const bg = `url(${useCommonImgPath('micro_game/xiaoai/page_bg.jpg')})`;
const banner_bg = `url(${useCommonImgPath('micro_game/xiaoai/banner_bg.jpg')})`;
const content_main_bg = `url(${useCommonImgPath('micro_game/xiaoai/content_main_bg.png')})`;
const content_game = `url(${useCommonImgPath('micro_game/xiaoai/content_game.png')})`;
const content_side_bar_top_left = `url(${useCommonImgPath('micro_game/xiaoai/content_side_bar_top_left.png')})`;
const content_side_bar_top_right = `url(${useCommonImgPath('micro_game/xiaoai/content_side_bar_top_right.png')})`;
const content_sidebar_bottom = `url(${useCommonImgPath('micro_game/xiaoai/content_sidebar_bottom.png')})`;
const bottom_title_bg = `url(${useCommonImgPath('micro_game/xiaoai/bottom_title_bg.png')})`;
</script>

<style lang="scss" scoped>
.micro_page_container {
  min-height: 100vh;
  position: relative;
  background: v-bind(bg);
  background-size: 100% auto;
  .micro_page_section_first {
    background: v-bind(banner_bg);
    background-size: 100% auto;
    min-height: 980px;
    .title_part {
      padding-top: 40px;
      @include flex(flex-start, column);
      position: relative;
      .zh_txt_img {
        width: 660px;
      }
      .en_txt_img {
        position: absolute;
        width: 877px;
        bottom: 40px;
      }
      .sub_txt {
        color: #f8e7b9;
        font-size: 14px;
        margin-top: 10px;
      }
    }
    .main_content {
      width: 1563px;
      height: 782px;
      margin: 12px auto 0;
      background: v-bind(content_main_bg);
      background-size: 100% 100%;
      padding-top: 20px;
      position: relative;

      .content_game {
        width: 1280px;
        height: 724px;
        background: v-bind(content_game);
        background-size: 100% 100%;
        margin: 0px auto 0;
        padding: 27px 20px 11px;
        position: relative;
        .full_screen_btn {
          padding: 0 15px;
          height: 24px;
          top: 0px;
          background: linear-gradient(354.96deg, #e0c3a0 4.84%, #f9e8c0 95.43%);
          border-radius: 2px;
          position: absolute;
          @include flex(center);
          left: 950px;
          cursor: pointer;
          .full_screen_icon {
            width: 10px;
            margin-right: 6px;
          }
        }

        .content_box {
          position: relative;
          width: 100%;
          height: 100%;
        }
      }
      .wing {
        position: absolute;
        @include flex(flex-start, column);
        .wing_top {
          span {
            font-size: 28px;
            font-weight: 700;
            @include text_clip(linear-gradient(242.21deg, #ffffff 19.56%, #dce8f7 74.53%));
          }
          &:not(.zh, .zh_tw) {
            span {
              font-size: 14px;
            }
          }
        }
        &.left_wing {
          top: 205px;
          left: -140px;
          .wing_top {
            width: 256px;
            height: 46px;
            background: v-bind(content_side_bar_top_left);
            background-size: 100% 100%;
            padding-left: 13px;
            @include flex(flex-start);
            img {
              width: 146px;
            }
          }
        }
        &.right_wing {
          top: 205px;
          right: -130px;
          .wing_top {
            width: 256px;
            height: 46px;
            background: v-bind(content_side_bar_top_right);
            background-size: 100% 100%;
            padding-left: 13px;
            @include flex(flex-start);
            img {
              width: 146px;
            }
          }
        }
        .wing_bottom {
          background: v-bind(content_sidebar_bottom);
          width: 267px;
          height: 124px;
          margin-top: 10px;
          @include flex(center, column);
          span:first-child {
            font-size: 30px;
            line-height: 42px;
            color: #202837;
          }
          span:last-child {
            font-size: 20px;
            line-height: 42px;
            color: #202837;
            transform: translateX(-20px);
          }
          &:not(.zh, .zh_tw) {
            span {
              font-size: 14px;
              transform: translateX(0px);
            }
          }
        }
      }
    }
  }
  .micro_page_section_bottom {
    padding-top: 150px;
    @include flex(flex-start, column);
    .title_container {
      width: 585px;
      height: 65px;
      background: v-bind(bottom_title_bg);
      background-size: 100% 100%;
      position: relative;
      img {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .zh_img {
        width: 264px;
        top: -40px;
      }
      .en_img {
        width: 292px;
        bottom: 10px;
      }
    }
    .micro_page_section_bottom_one {
      margin-top: 50px;
      height: 428px;
      width: 1630px;
      position: relative;
      .arrow {
        width: 30px;
        height: 30px;
        position: absolute;
        cursor: pointer;
        top: 50%;
        transform: translateY(-50%);
        left: -60px;
        &.right {
          right: -60px;
          left: auto;
        }
      }
      :deep() {
        .el-carousel__container {
          height: 428px;
          .el-carousel__item {
            img {
              width: 310px;
              height: 428px;
              margin-right: 20px;
              &:last-child {
                margin-right: 0;
              }
            }
          }
          .el-carousel__arrow {
            display: none;
          }
        }
      }
      margin-bottom: 130px;
    }
    .micro_page_section_bottom_two {
      @include flex(flex-start, column);
      .tab_container {
        @include flex();
        width: 1110px;
        margin: 50px 0;
        .tab_list {
          width: 240px;
          height: 74px;
          @include flex(center);
          font-size: 34px;
          color: #acb6ca;
          border: 1px solid #acb6ca;
          cursor: pointer;
          &.on {
            color: #ffedbe;
            border-color: #ffedbe;
          }
        }
      }
      .micro_page_section_bottom_two_content {
        width: 1280px;
        :deep() {
          .el-carousel__item {
            height: 392px;
            @include flex();
            img {
              width: 630px;
              height: 100%;
            }
          }
          .el-carousel__arrow {
            display: none;
          }
          .el-carousel__indicators--outside {
            margin: 32px 0;
            .is-active {
              .el-carousel__button {
                background: #ffedbe;
              }
            }
            .el-carousel__button {
              background: #acb6ca;
              opacity: 1;
            }
          }
        }
      }
    }
  }
  .full_screen_container {
    position: relative;
    &:not(.STG) {
      max-height: 100vh;
      & > div:not(.collapse_button) {
        height: 100vh !important;
      }
    }
    .collapse_button {
      border-radius: 2px;
      background: linear-gradient(360deg, #e0c3a0 0%, #f9e8c0 100%);
      position: absolute;
      left: 60%;
      top: 20px;
      z-index: 1000;
      padding: 0 10px;
      min-width: 88px;
      height: 36px;
      @include flex(center);
      cursor: pointer;
      img {
        width: 16px;
        margin-right: 5px;
      }
      &.TF {
        top: 45px;
      }
    }
  }
}
</style>
