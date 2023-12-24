<template>
  <div :class="['sponsor_main', site]">
    <div class="part_one">
      <el-carousel height="950px" direction="vertical" :autoplay="false" ref="Carousel" indicator-position="outside">
        <el-carousel-item>
          <div class="bg_img_container">
            <img class="bg-img" :src="useImgPath('sponsor/part_one_content.png')" alt="" />
            <div class="part_one_logo_container">
              <img class="part_one_logo" :src="useLogoPath(`logo_1_${globalState.language}.png`)" alt="" />
              <div :class="['part_one_right_txt', globalState.language]">
                <template v-if="globalState.language === 'en'">
                  <span v-html="'Official partner of <br/> Inter Milan Football Club'"></span>
                </template>
                <template v-else-if="globalState.language === 'ms'">
                  <span v-html="'Rakan Kongsi Rasmi <br/> Kelab Bola Sepak Inter Milan'"></span>
                </template>
                <template v-else>
                  {{ $t_c('国际米兰足球俱乐部 官方合作伙伴') }}
                </template>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="part_two">
      <div class="part_two_title">
        <div class="main-title">{{ $t_c('国际米兰足球俱乐部') }}</div>
        <div class="sub-title">{{ $t_c('亚洲区独家合作伙伴') }}</div>
      </div>
      <div class="part_two_main">
        <el-carousel height="571px" direction="vertical" :autoplay="false" ref="Carousel" indicator-position="outside">
          <el-carousel-item>
            <div class="bg_img_container">
              <span :class="['bg_img_title', globalState.language]">
                {{ $t_c('精彩赛事') }}
              </span>
              <img class="video_title" :src="useImgPath('sponsor/video_title.png')" alt="" />
              <div class="video_img">
                <img :src="useCommonImgPath('video_img.png')" alt="" />
              </div>
<!--              <video class="video" id="myPlay" controls autoplay loop muted>-->
<!--                <source :src="videosrc" type="video/mp4" />-->
<!--              </video>-->
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div :class="['part_two_desc', globalState.language]">
        <span class="part_two_item">
          {{
            $t_c(
              '国际米兰足球俱乐部（InterMilan，简称国米），是一家位于意大利伦巴第大区米兰市的足球俱乐部，成立于1908年3月9日。球队主场为梅阿查体育场，现征战于意大利足球甲级联赛。'
            )
          }}
        </span>
        <span class="part_two_item">
          {{
            $t_c(
              '国际米兰是由来自“米兰板球与足球俱乐部”（即AC米兰俱乐部）的一部分会员分流出来后组建的足球俱乐部。球衣由蓝色和黑色两种主要颜色组成。因为俱乐部成立之初即向全世界所有球员敞开大门，所以称之为“国际”俱乐部。'
            )
          }}
        </span>
        <span class="part_two_item">
          {{
            $t_c(
              '国际米兰曾为“意甲七姐妹”之一，也与AC米兰和尤文图斯两支球队并称为北方三强。与AC米兰这支同样来自米兰的俱乐部之间的碰撞被称为“米兰德比”，和来自都灵的尤文图斯之间的对决则称为“意大利国家德比”。国际米兰是唯一一支拿过五冠王（欧冠、意甲、意大利杯、意大利超级杯和世界俱乐部杯）的意大利联赛球队。'
            )
          }}
        </span>
      </div>
    </div>
    <div class="part_three">
      <img class="part_three_logo" :src="useLogoPath(`logo_1_${globalState.language}.png`)" alt="" />
      <div class="part_three_main">
        <el-carousel height="950px" direction="vertical" :autoplay="false" ref="Carousel" indicator-position="outside">
          <el-carousel-item>
            <div class="item_main">
              <div :class="['slider_title', globalState.language]">{{ useCurrentTitle() }}</div>
              <div :class="['content_main', globalState.language]">
                <div class="item">
                  <!-- {{ $t_c('2020年，SDY体育正式签约赞助国际米兰足球俱乐部') }} -->
                  {{ $t_c('2020年') }},{{ appTitle }} {{ $t_c('正式签约赞助国际米兰足球俱乐部') }}
                </div>
                <div>
                  {{ $t_c('成为国际米兰足球俱乐部亚洲区独家合作伙伴。') }}
                </div>
                <div class="item">
                  {{ $t_c('此次战略合作的成功达成，是双方追逐梦想，进军国际市场具有历史意义重要的一步。') }}
                </div>
                <div class="item">{{ $t_c('致力于将自己打造成为具备专业服务的国际顶尖综合型体育投注平台，') }}</div>
                <div class="item">
                  {{ $t_c('正如这个从硝烟中不断过关斩将的蓝黑军团，') }}
                  {{ appTitle }} {{ $t_c('势必破茧成竹，成为全球范围内引领顾客体验新风潮的坚石。') }}
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="part_four">
      <div class="part_four_title">
        <div class="zh-title">{{ appTitle }} {{ $t_c('权威认证') }}</div>
        <div class="en-title">CERTIFICATION AUTHORITY</div>
      </div>
      <div class="desc-container">
        <div class="item">
          <img :src="useImgPath('sponsor/icon_1.png')" alt="" />
          <span v-html="$t_c('英国GC')"></span>
        </div>
        <div class="item">
          <img :src="useImgPath('sponsor/icon_2.png')" alt="" />
          <span v-html="$t_c('马耳他博彩牌照')"></span>
        </div>
        <div class="item">
          <img :src="useImgPath('sponsor/icon_3.png')" alt="" />
          <span v-html="$t_c('英属维尔京群岛')"></span>
        </div>
        <div class="item">
          <img :src="useImgPath('sponsor/icon_4.png')" alt="" />
          <span v-html="$t_c('菲律宾（PAGCOR）')"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImgPath, useCommonImgPath, useLogoPath, useSite } from '@/hook/usePath';
import { useCurrentTitle } from '@/hook/useTitle';
// import { useGlobalState } from '@/stores';
// import { ref } from 'vue';

const site = useSite();
const appTitle = useCurrentTitle();

const globalState = useGlobalState();
// const videosrc = ref<string>('https://video.51renqijie.com/video/SDY-Video-v1.mp4');
const part_one_bg = `url(${useImgPath('sponsor/part_one_bg.jpg')})`;
const part_two_bg = `url(${useImgPath('sponsor/part_two_bg.jpg')})`;
const part_three_bg = `url(${useImgPath('sponsor/part_three_bg.jpg')})`;
const part_four_bg = `url(${useImgPath('sponsor/part_four_bg.jpg')})`;
const part_three_main_bg = `url(${useImgPath('sponsor/part_three_main.png')})`;
const part_one_logo_bg = `url(${useImgPath('sponsor/part_one_logo_bg.png')})`;
const play_bg = `url(${useImgPath('sponsor/play_bg.png')})`;
</script>

<style lang="scss" scoped>
.sponsor_main {
  width: 100%;
  .part_one {
    background-image: v-bind(part_one_bg);
    background-size: 100% 100%;
    height: 950px;
    position: relative;
    .bg_img_container {
      @include flex(center);
      position: relative;

      .part_one_logo_container {
        position: absolute;
        background-image: v-bind(part_one_logo_bg);
        width: 896px;
        height: 123px;
        background-size: 100% 100%;
        bottom: 78px;
        @include flex();
        padding: 0 80px 13px;
        .part_one_logo {
          height: 69px;
        }
        .part_one_right_txt {
          font-size: 28px;
          width: 259px;
          color: var(--sponsor_1);
          &:not(.zh, .zh_tw) {
            font-size: 20px;
          }
          &.ms {
            width: 269px;
            transform: translateX(10px);
          }
        }
      }
      .bg-img {
        width: 85%;
        height: auto;
        max-width: 1632px;
      }
    }
  }
  .part_two {
    background-image: v-bind(part_two_bg);
    background-size: 100% 100%;
    height: 950px;
    .part_two_title {
      padding-top: 50px;
      @include flex(flex-start, column);
      .main-title {
        font-family: hei;
        font-weight: 700;
        font-size: 72px;
        @include text_clip(var(--sponsor_5));
      }
      .sub-title {
        font-weight: 500;
        font-size: 28px;
        color: var(--sponsor_6);
      }
    }
    .part_two_main {
      :deep() {
        .el-carousel__item {
          @include flex(center);
        }
      }
      .bg_img_container {
        width: 1096px;
        min-height: 571px;
        background-image: v-bind(play_bg);
        background-size: 100% auto;
        position: relative;
        @include flex(center);
        .bg_img_title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 500%;
          color: var(--sponsor_7);
          font-size: 24px;
          top: 6px;
          z-index: 1;
          // &:not(.zh, .zh_tw) {
          //   font-size: 16px;
          //   top: 2px;
          // }
        }
        .video {
          width: 970px;
          height: 546px;
          margin-top: 20px;
        }
        .video_title {
          position: absolute;
          width: 1052px;
          top: 14px;
        }
        .video_img {
          margin-top: 17px;
          width: 970px;
          height: 546px;
          background: linear-gradient(180deg, #1A1A1C 0%, #202123 98.54%);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .part_two_desc {
      width: 1200px;
      margin: 43px auto 0;
      color: var(--sponsor_8);
      line-height: 24px;
      letter-spacing: 0.05em;
      font-size: 14px;
      text-indent: 32px;
      @include flex(flex-start, column);
      &:not(.zh, .zh_tw) {
        .part_two_item {
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
  }
  .part_three {
    background-image: v-bind(part_three_bg);
    background-size: 100% 100%;
    height: 950px;
    position: relative;
    padding-top: 40px;
    .part_three_logo {
      width: 282px;
      margin: 0 auto;
      display: block;
    }
    :deep() {
      .el-carousel__item {
        @include flex(center);
        align-items: flex-start;
      }
    }
    .item_main {
      width: 1118px;
      height: 571px;
      margin-top: 70px;
      background-image: v-bind(part_three_main_bg);
      background-size: 100% 100%;
      position: relative;
      @include flex(flex-start, column);
      padding: 0 71px;
      .slider_title {
        font-weight: 500;
        font-size: 24px;
        color: var(--sponsor_9);
        &:not(.zh, .zh_tw) {
          margin-top: 5px;
        }
      }
      .content_main {
        margin-top: 93px;
        font-weight: 500;
        font-size: 30px;
        line-height: 48px;
        color: var(--sponsor_10);
        &:not(.zh, .zh_tw) {
          margin-top: 20px !important;
          font-size: 28px;
          line-height: 42px;
        }
        &.vi,
        &.ms {
          font-size: 24px;
        }
      }
    }
  }
  .part_four {
    background-image: v-bind(part_four_bg);
    background-size: 100% 100%;
    height: 950px;
    position: relative;
    background-repeat: no-repeat;
    padding-top: 10px;
    .part_four_title {
      @include flex(flex-start, column);
      .zh-title {
        font-family: hei;
        font-weight: 700;
        font-size: 72px;
        letter-spacing: 0.05em;
        @include text_clip(var(--sponsor_5));
      }
      .en-title {
        color: var(--sponsor_11);
        font-size: 28px;
      }
    }
    .desc-container {
      position: absolute;
      @include flex(center);
      width: 1035px;
      height: 419px;
      top: 230px;
      align-items: flex-start;
      padding: 100px 68px 0;
      transform: translateX(-50%);
      left: 50%;
      .item {
        flex-grow: 1;
        font-size: 24px;
        color: var(--sponsor_12);
        text-align: center;
        @include flex(flex-start, column);
        img {
          width: 153px;
          height: 153px;
          margin-bottom: 20px;
        }
      }
    }
  }
  :deep() {
    .el-carousel__indicators--outside {
      position: absolute;
      top: 50%;
      right: 80px;
      transform: translateY(-50%);
      @include flex(center, column);
      .el-carousel__indicator--vertical {
        padding: 0;
        margin-bottom: 14px;
        &.is-active {
          .el-carousel__button {
            background: var(--sponsor_2);
            border-color: var(--sponsor_2);
          }
        }
        .el-carousel__button {
          width: 11.01px;
          height: 11.01px;
          background: var(--sponsor_3);
          border: 1px solid var(--sponsor_4);
          transform: rotate(-45deg);
          opacity: 1;
        }
      }
    }
  }
  &.template_2_002 {
    .part_two_title {
      padding-top: 13px;
    }
    .part_two {
      .sub-title {
        margin-top: 20px;
      }
      .part_two_desc {
        margin-top: 60px;
      }
    }
    .slider_title {
      margin-top: 5px;
    }
  }
  &.template_2_003 {
    .part_two_title {
      padding-top: 13px;
    }
    .part_two_desc {
      margin-top: 80px;
    }
  }
}
</style>
