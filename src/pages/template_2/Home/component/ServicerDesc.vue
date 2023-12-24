<template>
  <div :class="['servicer-container', site]" ref="serviceRef">
    <CommonTitle :title-txt="$t_c('优质服务')" img-src="serve_title" sub-txt="" />
    <div class="servicer_desc">{{ $t_t('serviceSubText') }}</div>
    <div :class="['servicer_main', `theme_${theme}`]">
      <div class="servicer_item" v-for="(_, index) in renderList" :key="index">
        <img class="main_bg" :src="useImgPath(`home/other/${renderList[index].icon}_${index + 1}.png`)" alt="" />
        <template v-if="theme !== '003'">
          <img class="circle-png" :src="useImgPath('home/other/circle.png')" alt="" />
          <div class="circle-container">
            <el-progress
              type="circle"
              :percentage="innerCircleNumber"
              :show-text="false"
              :width="70"
              :color="
                theme === '001' ? '#2CC2FD' : theme === '002' ? '#FD9004' : theme === '004' ? '#e5c59a' : '#6C5DD4'
              ">
            </el-progress>
          </div>
          <div class="circle-container_1">
            <el-progress
              type="circle"
              :percentage="theme === '004' ? 0 : outerCircleNumber"
              :show-text="false"
              :width="92"
              :color="theme === '001' ? '#d8def9' : theme === '002' ? '#3c4465' : '#d8def9'"
              :duration="100">
            </el-progress>
          </div>
        </template>
        <template v-else>
          <div class="line_container"></div>
          <div class="line_container inner_line_container">
            <div class="line_item" v-for="(_item, i) in 21" :key="i"></div>
          </div>
        </template>
        <div :class="['number_txt', `theme_${theme}`, globalState.language]">
          <template v-if="theme === '004'">
            <img :src="useImgPath(`home/circle_txt_${index}.png`)" alt="" />
          </template>
          <template v-else>
            <span>{{ _.number }}</span>
            <span>{{ _.txt }}</span>
          </template>
        </div>
        <div :class="['servicer_txt', globalState.language]">
          <div v-if="globalState.language.includes('zh')" class="zh-txt">{{ renderList[index].zh_txt }}</div>
          <div :class="['en-txt', 'only-text']">{{ renderList[index].en_txt }}</div>
        </div>
      </div>
    </div>
    <div class="servicer-slogan">
      <div class="slogan_item" v-for="(_, i) in sloganList" :key="i">
        <img :src="useImgPath(`home/other/${_.icon}.png`)" alt="" />
        <div class="slogan_txt_container">
          <div class="title">{{ _.title }}</div>
          <div class="slogan_txt_container_desc">{{ _.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useGlobalState } from '@/stores';
import { onMounted, onUnmounted, ref } from 'vue';
import CommonTitle from './CommonTitle.vue';
const site = useSite();
const globalState = useGlobalState();
const innerCircleNumber = ref(0);
const theme = sessionStorage.getItem('VITE_THEME') || import.meta.env.VITE_THEME;
const outerCircleNumber = ref<number>(100);
const serviceRef = ref();
const renderList = [
  {
    icon: 'time',
    zh_txt: lang('平均存款时间'),
    en_txt: 'AVERAGE TIME OF DEPOSIT',
    number: '60',
    txt: 'M',
  },
  {
    icon: 'time',
    zh_txt: lang('合作支付平台'),
    en_txt: 'PAYMENT PLATFO RM PARTNERS',
    number: '80',
    txt: '+',
  },
  {
    icon: 'time',
    zh_txt: lang('平均取款时间'),
    en_txt: 'AVERAGE TIME OF WITHDRAW',
    number: '90',
    txt: 'M',
  },
  {
    icon: 'time',
    zh_txt: lang('合作游戏平台'),
    en_txt: 'GAMING PROVIDER PARTNERS',
    number: '24',
    txt: '+',
  },
];
const sloganList = [
  {
    icon: 'slogan_icon_1',
    title: lang('真人游戏'),
    desc: lang(
      '最新技术自主研发的财务处理系统，多种入款渠道，自动免转钱包，精简出款流程，真正做到极速存，取，转。独家网络优化技术，最大化的优化网络延迟，为您提供一流的游戏体验。'
    ),
  },
  {
    icon: 'slogan_icon_2',
    title: lang('海量赛事种类'),
    desc: lang(
      '每天为您提供足球、篮球、电竞、网球、斯诺克等千场精彩体育赛事，首页实时直播，点击即可投注，助您一手尽掌球坛风云。更有真人、彩票、棋牌、电子游戏等多种娱乐方式可供选择。'
    ),
  },
  {
    icon: 'slogan_icon_3',
    title: lang('加密安全管理'),
    desc: lang(
      '独家开发，采用128位加密技术和严格的安全管理体系，多种智能防盗措施，会员账户24小时全方位防护，会员资金得到最为完善的保障。助您全情尽享娱乐，毫无后顾之忧。'
    ),
  },
  {
    icon: 'slogan_icon_4',
    title: lang('多端口选择'),
    desc: lang(
      '引领市场的卓越技术团队，自主研发了全套终端应用，更有精心打造的IOS，Android原生APP，让您随时随地关注赛事热点，轻松休闲畅享娱乐投注，运筹帷幄更显从容风范。'
    ),
  },
];
const scrollHandler = () => {
  if (serviceRef.value) {
    if (window.scrollY > serviceRef.value.offsetTop - 200 && outerCircleNumber.value === 100) {
      if (theme === '003') {
        document.querySelectorAll('.inner_line_container').forEach((item, index) => {
          (item as HTMLElement).querySelectorAll('.line_item').forEach(_ => {
            (_ as HTMLElement).style.backgroundColor = index % 2 == 0 ? '#132642' : '#fd8a1e';
          });
        });
      }
      outerCircleNumber.value = 0;
      setTimeout(() => {
        innerCircleNumber.value = 50;
      }, 500);
    } else if (window.scrollY < serviceRef.value.offsetTop - 600 && outerCircleNumber.value === 0) {
      if (theme === '003') {
        document.querySelectorAll('.inner_line_container').forEach(item => {
          (item as HTMLElement).querySelectorAll('.line_item').forEach(_ => {
            (_ as HTMLElement).style.backgroundColor = 'transparent';
          });
        });
      }
      outerCircleNumber.value = 100;
      innerCircleNumber.value = 0;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', scrollHandler);
});

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler);
});

const theme_3_1_bg = `url(${useImgPath('home/time_1_3_2.png')})`;
</script>

<style lang="scss" scoped>
.servicer-container {
  margin: 0 auto;
  .servicer_desc {
    font-size: 12px;
    color: var(--home_41);
    text-align: center;
  }
  .servicer_main {
    @include flex();
    margin-top: 30px;
    padding: 0 126px;
    .servicer_item {
      @include flex(flex-start, column);
      position: relative;
      .main_bg {
        width: 122px;
        height: 122px;
      }
      .circle-png {
        position: absolute;
        width: 90px;
        top: 12px;
      }
      .circle-container {
        transform: rotate(180deg);
        position: absolute;
        top: 17px;
        left: 26px;
        :deep() {
          .el-progress-circle__track {
            display: none;
          }
        }
      }
      .circle-container_1 {
        transform: rotateX(180deg);
        position: absolute;
        top: 6px;
        left: 15px;
        :deep() {
          .el-progress-circle__track {
            display: none;
          }
        }
      }
      .number_txt {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 20%;
        @include text_clip(var(--home_48));
        font-size: 27px;
        @include flex(center);
        span:nth-child(2) {
          font-size: 14px;
        }
        &.theme_003 {
          flex-direction: column;
          justify-content: flex-start;
          span:nth-child(2) {
            margin-top: -10px;
          }
        }
        &:not(.zh, .zh_tw) {
          top: 23%;
        }
      }
      .servicer_txt {
        @include flex(flex-start, column);
        margin-top: 15px;
      }
      .zh-txt {
        font-size: 18px;
        font-weight: 600;
        color: var(--home_42);
      }
      .en-txt {
        font-size: 12px;
        color: var(--home_43);
        width: 120px;
        text-align: center;
      }
    }
    &.theme_002 {
      .circle-container_1 {
        top: 10px;
      }
      .circle-png {
        top: 16px;
      }
      .circle-container {
        top: 20px;
        left: 23px;
      }
      .number_txt {
        span:nth-child(2) {
          -webkit-text-fill-color: var(--home_49);
        }
      }
    }
  }
  .servicer-slogan {
    margin-top: 51px;
    @include flex(space-between, row, wrap);
    padding: 0 120px 40px;
    .slogan_item {
      width: 45%;
      @include flex();
      align-items: center;
      margin-bottom: 43px;
      img {
        width: 100px;
      }
      .slogan_txt_container {
        @include flex(flex-start, column);
        align-items: flex-start;
        margin-left: 30px;
        .title {
          font-weight: 500;
          font-size: 16px;
          color: var(--home_44);
          margin-bottom: 7px;
        }
        .slogan_txt_container_desc {
          font-size: 12px;
          color: var(--home_45);
        }
      }
    }
  }
  .servicer_main {
    &.theme_003 {
      .servicer_item {
        &:nth-child(odd) {
          .number_txt {
            span {
              -webkit-text-fill-color: #132743;
            }
          }
        }
        .number_txt {
          &.en {
            top: 20%;
          }
        }
      }
    }
  }
  .line_container {
    position: absolute;
    width: 83px;
    height: 83px;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 31.5%;
    border-radius: 50%;
    background-image: v-bind(theme_3_1_bg);
    background-size: 100% 100%;
  }
  .inner_line_container {
    .line_item {
      position: absolute;
      width: 1.29px;
      height: 9.49px;
      background-color: transparent;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.1s;
      bottom: 0;
      $pixelArr: 42 36 30 24 19 14 10 7 5 4 4.1 4.3 4.4 7.1 11 16 20 25 30.1 35 41;
      $topArr: 0 0 1 3 6 10 15 20 25 30 37 42 48 54 59 63 67 69 72 73 74;
      @each $item in $pixelArr {
        $index: index($pixelArr, $item);
        &:nth-child(#{$index}) {
          left: $item + px;
          transform: translateX(-50%) rotate(-(189deg - ($index) * 9));
          transition-delay: calc($index/50) + s;
        }
      }
      @each $item in $topArr {
        $index: index($topArr, $item);
        &:nth-child(#{$index}) {
          bottom: $item + px;
        }
      }
    }
  }
}

//- 001
.servicer-container {
  &.template_2_001 {
    .only-text {
      color: var(--home_42) !important;
    }
  }
  &.template_2_003 {
    .servicer_txt {
      &:not(.zh, .zh_tw) {
        margin-top: 38px !important;
      }
    }
  }
}
</style>
