<template>
  <div :class="[ 'cockfighting-page', globalState.language ]">
    <div class="page-top">
      <div v-if="!isFullscreen" class="page-top-title">
        <div class="text">
          <p>{{ $t_c('全球五百万游戏玩家同时在线') }}</p>
          <p>{{ $t_c('业内首家专业数字手套计分系统') }}</p>
        </div>
        <img class="logo" :src="useLogoPath(`logo_1_${globalState.language}.png`)" alt="" />
      </div>
      <div :class="[ 'game-container', { 'fullscreen': isFullscreen } ]">
        <SelfLoading :showLoading="isIframeLoading"/>
        <div v-if="iframeUrl && !isIframeLoading" @click="handleFullscreen" class="fullscreen-btn">
          <img :src="useCommonImgPath(`specialGamePage/wgb/fullsceen-${ isFullscreen ? 'close' : 'open' }.png`)" />
          <span>{{ isFullscreen ? $t_c('收起') : $t_c('全屏') }}</span>
        </div>
        <div class="iframe-box">
          <iframe ref="iframe" :src="iframeUrl || null" />
        </div>
      </div>
      <div v-if="!isFullscreen" class="fixed-box">
        <p>{{ $t_c('游戏时间') }}</p>
        <p>{{ $t_c('下午2点至凌晨2点') }}</p>
      </div>
      <div v-if="!isFullscreen" class="fixed-box right">
        <p>{{ $t_c('每日180场+') }}</p>
        <p>{{ $t_c('让您随时随地痛快下注') }}</p>

        <div @click="$router.push('/specialGamePage/cockfightingGuide')" class="fixed-rule">
          <img :src="useCommonImgPath(`specialGamePage/wgb/fixed-rule_${globalState.language}.png`)" class="fixed-rule-img" />
          <img class="arrow" :src="useCommonImgPath(`specialGamePage/wgb/arrow.png`)" alt="">
        </div>
      </div>

    </div>
    <div class="page-desc">
      <div class="page-desc-container">
        <img :src="useCommonImgPath(`specialGamePage/wgb/tit1_${globalState.language}.png`)" class="desc-title desc-title1" />
        <div class="desc-section-1">
          <img @click="handleChangeCarousel('prev')" :src="useCommonImgPath(`specialGamePage/wgb/carousel-arrow .png`)" class="desc-section-1-arrow" />

          <el-carousel ref="carousel" height="200px" :autoplay="true" :loop="true" :interval="5000" arrow="never" indicator-position="none">
            <el-carousel-item>
              <img :src="useCommonImgPath(`specialGamePage/wgb/desc-section-1_1-1.png`)" alt="">
              <img :src="useCommonImgPath(`specialGamePage/wgb/desc-section-1_1-2.png`)" alt="">
              <img :src="useCommonImgPath(`specialGamePage/wgb/desc-section-1_1-3.png`)" alt="">
            </el-carousel-item>
            <el-carousel-item>
              <img :src="useCommonImgPath(`specialGamePage/wgb/desc-section-1_2-1.png`)" alt="">
              <img :src="useCommonImgPath(`specialGamePage/wgb/desc-section-1_2-2.png`)" alt="">
              <img :src="useCommonImgPath(`specialGamePage/wgb/desc-section-1_2-3.png`)" alt="">
            </el-carousel-item>
          </el-carousel>

          <img @click="handleChangeCarousel('next')" :src="useCommonImgPath(`specialGamePage/wgb/carousel-arrow .png`)" class="desc-section-1-arrow right" />
        </div>

        <img :src="useCommonImgPath(`specialGamePage/wgb/tit2_${globalState.language}.png`)" class="desc-title desc-title2" />
        <img class="desc-section-2" :src="useCommonImgPath(`specialGamePage/wgb/desc-section-2.png`)" alt="">

        <img :src="useCommonImgPath(`specialGamePage/wgb/tit3_${globalState.language}.png`)" class="desc-title desc-title3" />
        <img class="desc-section-3" :src="useCommonImgPath(`specialGamePage/wgb/desc-section-3_1.png`)" alt="">
        <img class="desc-section-3" :src="useCommonImgPath(`specialGamePage/wgb/desc-section-3_2.png`)" alt="">

      </div>
    </div>

    <div v-show="isShowDialog" class="video-dialog">
      <div class="video-dialog-header">
        <img class="logo" :src="useLogoPath(`logo_1_${globalState.language}.png`)" alt="" />
        <img :class="[ 'title', globalState.language ]" :src="useCommonImgPath(`specialGamePage/wgb/video-dialog-tit_${globalState.language}.png`)" alt="">
        <img @click="handleCloseDialog" class="close" :src="useCommonImgPath(`specialGamePage/wgb/dialog-close.png`)" alt="">
      </div>
      <div class="video-dialog-content">
        <div class="video-box">
          <img v-if="!isPlay" class="video-img" :src="useCommonImgPath(`specialGamePage/wgb/dialog-bg.png`)" alt="">
          <img v-if="!isPlay" @click="handlePlay" class="play" :src="useCommonImgPath(`specialGamePage/wgb/play.gif`)" alt="">
          <video controls ref="video" v-if="isPlay" :src="videoSrc"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLogoPath, useCommonImgPath } from '@/hook/usePath'
  import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue"
  import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue'
  import { api } from "@/api";
  import useDialog from "@/hook/useDialog"
  import { lang } from '@/i18n';
  import { useRouter } from "vue-router";

  const router = useRouter();

  const globalState = useGlobalState()
  const gameState = useGameState()
  const userState = useUserState()

  const videoSrc = ref('https://downloadapp.cmei654.com/cockfighting_video_en.mp4')
  if (['zh', 'zh_tw'].includes(globalState.language)) {
    videoSrc.value = 'https://downloadapp.cmei654.com/cockfighting_video_zh.mp4'
  }

  const iframe = ref()
  const iframeUrl = ref('')
  const isIframeLoading = ref(false)
  const { messageTip } = useDialog()

  const getGame = async () => {
    const gameData = gameState.cockfighting?.find( (v: API.normalGameType) => v.id && v.depotCode === 'WGB')
    if (!gameData) {
      return
    }

    const { id, availableWh } = gameData as API.normalGameType

    if (!id || availableWh === 2) {
      messageTip({ message: lang('该场馆正在维护，请先娱乐其他场馆游戏') })
      return router.push(`/home`)
    }

    try {
      const res = await (userState.token
        ? api.game.getTransitList({ gameId: id })
        : api.game.getTryAddress({ gameId: id }))

      if (res.msg.indexOf('http') === -1) {
        messageTip({ message: res.errMsg as string })
        isIframeLoading.value = false
        return
      }
      iframeUrl.value = res.msg
    } catch (e) {
      isIframeLoading.value = false
    }
  }

  watch(
    () => gameState.cockfighting,
     _ => {
       const hasWGB = gameState.cockfighting?.find( (v: API.normalGameType) => v.id && v.depotCode === 'WGB')
       if (!hasWGB) {
         messageTip({ message: lang('该场馆正在维护，请先娱乐其他场馆游戏') })
         return router.push(`/home`)
       }
       getGame()
    },
  )

  onMounted(() => {
    getGame()

    if (iframe.value) {
      isIframeLoading.value = true
      iframe.value.onload = () => {
        isIframeLoading.value = false
      }
    }
  })

  const isShowDialog = ref(false)
  const isPlay = ref(false)
  const video = ref()

  onMounted(() => {
    if (!localStorage.getItem('cockfightingVideoFlag')) {
      isShowDialog.value = true
      localStorage.setItem('cockfightingVideoFlag', '1')
    }
  })

  const carousel = ref()
  const handleChangeCarousel = (method: string) => {
    if (carousel.value[method]) {
      carousel.value[method]()
    }
  }

  const handlePlay = () => {
    isPlay.value = true
    nextTick(() => {
      video.value?.play()
    })
  }

  const handleCloseDialog = () => {
    video.value?.pause()
    isPlay.value = false
    isShowDialog.value = false
  }

  const isFullscreen = ref(false)
  const handleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
    window.scrollTo(0,0);
  }

  const fullscreenHeight = ref(`${window.innerHeight - 100}px`)
  const getFullscreenHeight = () => {
    fullscreenHeight.value = `${window.innerHeight - 100}px`
  }
  onMounted(() => {
    window.addEventListener('resize', getFullscreenHeight)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', getFullscreenHeight)
  })

  const topBg = `url(${useCommonImgPath('specialGamePage/wgb/top-bg.png')})`
  const titleBg = `url(${useCommonImgPath('specialGamePage/wgb/title-bg.png')})`
  const gameContainerBg = `url(${useCommonImgPath('specialGamePage/wgb/game-container-bg.png')})`
  const gameContainerFullBg = `url(${useCommonImgPath('specialGamePage/wgb/game-container-bg_full.png')})`
  const fixedbg = `url(${useCommonImgPath('specialGamePage/wgb/fixed-bg.png')})`
  const fixedbgRight = `url(${useCommonImgPath('specialGamePage/wgb/fixed-bg-right.png')})`
  const descBg = `url(${useCommonImgPath('specialGamePage/wgb/desc-bg.png')})`
</script>

<style lang="scss" scoped>
  .cockfighting-page {
    color: #ffffff;
    .page-top {
      position: relative;
      padding-top: 8px;
      height: 900px;
      background: v-bind(topBg) no-repeat center center;
      background-size: cover;
      .page-top-title {
        margin: 0 auto;
        width: 1432px;
        height: 15%;
        background: v-bind(titleBg) no-repeat center center;
        background-size: cover;
        @include flex(center);
        .text {
          margin-right: 17px;
          font-style: normal;
          font-weight: 400;
          font-size: 28px;
          line-height: 38px;
          color: #CABCCA;
          text-align: right;
          p:first-child {
            font-weight: 600;
            font-size: 46px;
            line-height: 56px;
            color: #FFFFFF;
          }
        }
        .logo {
          width: 432px;
          height: 85px;
        }
      }
      .game-container {
        @include flex(center);
        position: absolute;
        z-index: 101;
        bottom: 68px;
        left: 50%;
        transform: translateX(-50%);
        width: 1280px;
        height: 640px;
        background: v-bind(gameContainerBg) no-repeat center center;
        background-size: 100% 100%;
        &.fullscreen {
          width: 100%;
          top: 0;
          bottom: 0;
          height: v-bind(fullscreenHeight);
          background: v-bind(gameContainerFullBg) no-repeat center center;
          background-size: 100% 100%;
          .iframe-box {
            width: 99%;
            height:  97%;
            margin-top: 6px;
            margin-left: 0;
            clip-path: polygon(
                25px 0,
                calc(100% - 25px) 0,
                100% 25px,
                100% calc(100% - 25px),
                calc(100% - 25px) 100%,
                25px 100%,
                0 calc(100% - 25px),
                0 25px
            );
          }
        }
        .loading_main {
          position: absolute;
          width: 100%;
          height: 100%;
          margin: 0;
          @include flex(center);
        }
        .iframe-box {
          margin-top: 8px;
          margin-left: 2px;
          width: 1250px;
          height: 610px;
          clip-path: polygon(
            15px 0,
            calc(100% - 15px) 0,
            100% 15px,
            100% calc(100% - 15px),
            calc(100% - 15px) 100%,
            15px 100%,
            0 calc(100% - 15px),
            0 15px
          );
          iframe {
            width: 100%;
            height: 100%;
          }
        }
        .fullscreen-btn {
          z-index: 1;
          position: absolute;
          top: 33px;
          right: 350px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 10px;
          background: linear-gradient(354.96deg, #E0C3A0 4.84%, #F9E8C0 95.43%);
          border-radius: 2px;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #2C2C2E;
          cursor: pointer;
          img {
            margin-right: 5px;
            width: 10px;
            height: 10px;
          }
        }
      }
      @media screen and (max-width: 1680px) {
        .game-container {
          width: 940px;
          height: 560px;
          bottom: 110px;
          .iframe-box {
            margin-top: 6px;
            margin-left: 2px;
            width: 928px;
            height: 538px;
          }
        }
      }
      @media screen and (max-width: 1440px) {
        .game-container {
          width: 850px;
          height: 560px;
          bottom: 110px;
          .iframe-box {
            margin-top: 4px;
            margin-left: 2px;
            width: 835px;
            height: 535px;
          }
        }
      }
      .fixed-box {
        position: absolute;
        top: 410px;
        left: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 243px;
        height: 165px;
        background: v-bind(fixedbg) no-repeat center center;
        background-size: cover;
        &.right {
          left: auto;
          right: 40px;
          background: v-bind(fixedbgRight) no-repeat center center;
          background-size: cover;

          .fixed-rule {
            position: absolute;
            top: -55px;
            left: 0;
            cursor: pointer;
            .fixed-rule-img {
              width: 160px;
              height: 46px;
            }
            .arrow {
              position: absolute;
              top: 4px;
              right: -22px;
              width: 18px;
            }
          }
        }
        p {
          font-weight: 400;
          font-size: 20px;
          line-height: 28px;
          text-align: center;
          color: #CFD1E8;
          &:first-child {
            font-weight: 600;
            font-size: 40px;
            line-height: 60px;
            color: #FFFFFF;
          }
          &:nth-child(2) {
            margin-bottom: 10px;
          }
        }
      }
    }
    .page-desc {
      margin-top: 10px;
      height: 2100px;
      background: v-bind(descBg) no-repeat center center;
      background-size: cover;
      .page-desc-container {
        margin: 0 auto;
        width: 1280px;
        overflow: auto;
        .desc-title {
          display: block;
          margin: 0 auto;
          height: 66px;
          &.desc-title1 {
            margin-top: 60px;
            margin-bottom: 50px;
          }
          &.desc-title2 {
            margin-top: 80px;
          }
          &.desc-title3 {
            margin-top: 80px;
            margin-bottom: 40px;
          }
        }
        .desc-section-1 {
          display: flex;
          align-items: center;
          .desc-section-1-arrow {
            width: 30px;
            height: 30px;
            cursor: pointer;
            &.right {
              transform: rotate(-180deg);
            }
          }
          .el-carousel {
            flex: 1;
            margin: 0 40px;
            .el-carousel__item {
              display: flex;
              img {
                margin-right: 30px;
                width: 356px;
                height: 200px;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }
        .desc-section-2 {
          height: 880px;
        }
        .desc-section-3 {
          height: 174px;
          &:last-child {
            margin-top: 20px;
          }
        }
      }
    }
    .video-dialog {
      position: fixed;
      padding-top: 250px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .7);
      z-index: 1000;
      .video-dialog-header {
        position: relative;
        margin: 0 auto;
        width: 1000px;
        @include flex(center);
        .logo {
          margin-right: 15px;
          width: 270px;
        }
        .title {
          width: 460px;
          height: 64px;
          &.en {
            width: 482px;
            height: 108px;
          }
          &.vi {
            width: 455px;
            height: 120px;
          }
          &.ms {
            width: 427px;
            height: 128px;
          }
        }
        .close {
          position: absolute;
          top: 50px;
          right: 0;
          width: 77px;
          height: 50px;
          cursor: pointer;
        }
      }
      .video-dialog-content {
        position: relative;
        margin: auto;
        width: 928px;
        height: 470px;
        .video-box {
          position: relative;
          width: 928px;
          height: 470px;
          .video-img {
            width: 100%;
            height: 100%;
          }
          .play {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-60%, -60%);
            width: 200px;
            cursor: pointer;
          }
          video {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            height: 90%;
          }
        }
      }
    }

    &:not(.zh, .zh_tw) {
      .page-top .page-top-title .text {
        font-size: 19px;
        P:first-child {
          font-size: 20px;
        }
      }
      .page-top .fixed-box {
        p {
          margin: 0;
          line-height: normal;
          &:nth-child(1) {
            font-size: 20px;
          }
          &:nth-child(2) {
            font-size: 16px;
          }
        }
      }
      &.ms {
        .page-top .fixed-box {
          padding: 0 10px;
        }
      }
    }
  }
</style>
