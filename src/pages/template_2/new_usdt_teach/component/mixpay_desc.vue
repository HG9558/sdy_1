<template>
  <div class="section_mixpay">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="下载注册" name="0">
        <el-carousel arrow="always" :autoplay="false" :loop="false" height="645px" :ref="refList[0]">
          <el-carousel-item>
            <div class="level_one_first">
              <h3>
                <span>注意事项</span>
              </h3>
              <ul>
                <li>操作时请尽快完成[购买USDT]与[平台USDT存款]步骤，以免长时间未完成操作导致二维码失效。</li>
                <li>
                  请购买与存款页面所相对应的USDT类型，如在存款页面选择ERC20则购买时也选择ERC20，不同类型转账将导致失败。
                </li>
                <li>转出时需要支付少量手续费，请在买币前联系MixPay客服了解手续费数量。</li>
                <li>MixPay提供的Mix卡可提升交易限额，可在MixPay[设置]中[联系客服]。</li>
                <li>如遇商家网站无法打开时建议尝试更换浏览器或开启VPN进行操作。</li>
                <li>进行任意交易前请确认好信息</li>
                <li>
                  本教程为热门交易所功能介绍，不负责担保任何交易结果，使用中若遇到操作、账户类的问题，请在MixPay[设置]中[联系客服]。
                </li>
                <li>若交易所的内容有所变更，一切以交易所官方信息为准。</li>
              </ul>
            </div>
          </el-carousel-item>
          <el-carousel-item v-for="_ in 6" :key="_">
            <div :class="['level_one_second', _ === 6 && 'last']">
              <img
                :width="_ === 6 ? 375 : 770"
                :src="useCommonImgPath(`usdt_teach/${globalState.language}/mixpay_${_}.png`)"
                alt="" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="购买USDT" name="1">
        <el-carousel arrow="always" :autoplay="false" :loop="false" height="645px" :ref="refList[1]">
          <el-carousel-item v-for="_ in 4" :key="_">
            <div :class="['level_one_second']">
              <img
                width="770"
                :src="useCommonImgPath(`usdt_teach/${globalState.language}/mixpay_second_${_}.png`)"
                alt="" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="平台USDT存款" name="2">
        <el-carousel arrow="always" :autoplay="false" :loop="false" height="645px" :ref="refList[2]">
          <el-carousel-item v-for="_ in 3" :key="_">
            <div :class="['level_one_second']">
              <img
                width="770"
                :src="useCommonImgPath(`usdt_teach/${globalState.language}/mixpay_third_${_}.png`)"
                alt="" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="平台USDT取款" name="3">
        <el-carousel arrow="always" :autoplay="false" :loop="false" height="645px" :ref="refList[3]">
          <el-carousel-item v-for="_ in 3" :key="_">
            <div :class="['level_one_second', _ == 3 && 'last']">
              <img
                :width="_ == 3 ? 375 : 770"
                :src="useCommonImgPath(`usdt_teach/${globalState.language}/mixpay_fourth_${_}.png`)"
                alt="" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="USDT兑换人民币" name="4">
        <el-carousel arrow="always" :autoplay="false" :loop="false" height="645px" :ref="refList[4]">
          <el-carousel-item v-for="_ in 3" :key="_">
            <div :class="['level_one_second', _ == 3 && 'last']">
              <img
                :width="_ == 3 ? 375 : 770"
                :src="useCommonImgPath(`usdt_teach/${globalState.language}/mixpay_fifth_${_}.png`)"
                alt="" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { CarouselInstance } from 'element-plus';
// import { useGlobalState } from '@/stores';
import { useCommonImgPath } from '@/hook/usePath';

const activeName = ref('0');
const globalState = useGlobalState();
const refList = [
  ref<CarouselInstance>(),
  ref<CarouselInstance>(),
  ref<CarouselInstance>(),
  ref<CarouselInstance>(),
  ref<CarouselInstance>(),
];
const handleClick = () => refList.forEach(_ => _.value?.setActiveItem(0));
</script>

<style lang="scss" scoped>
.section_mixpay {
  padding-top: 20px;
  :deep() {
    .el-tabs__header {
      margin: 0 57px 0 37px;
      .el-tabs__nav-scroll {
        .el-tabs__nav {
          width: 100%;
          @include flex();
        }
        .el-tabs__item {
          color: var(--usdtS_17);
          padding-bottom: 20px;
          &.is-active {
            font-weight: bold;
          }
        }
        .el-tabs__active-bar {
          background: var(--usdtS_18);
          height: 4px;
          border-radius: 4px 4px 0 0;
        }
      }
      .el-tabs__nav-wrap {
        &:after {
          display: none;
        }
      }
    }
    .el-carousel__arrow {
      background-color: transparent;
      .el-icon {
        color: var(--usdtS_21);
        font-size: 35px;
      }
      &.el-carousel__arrow--left {
        left: 0;
      }
    }
  }

  .level_one_first {
    padding: 40px;
    h3 {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
      span {
        position: relative;
        &::before,
        &:after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: var(--usdtS_20);
          border-radius: 2px;
          top: 50%;
          left: -30px;
          transform: rotate(45deg) translateY(-50%);
        }
        &:after {
          left: auto;
          right: -30px;
        }
      }
    }
    ul {
      li {
        margin-bottom: 20px;
        position: relative;
        padding-left: 15px;
        &::before {
          content: '';
          width: 6px;
          height: 6px;
          background: var(--usdtS_19);
          position: absolute;
          top: 50%;
          border-radius: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .level_one_second {
    margin-top: 40px;
    @include flex(center);
    &.last {
      justify-content: flex-start;
      padding-left: 54px;
    }
  }
}
</style>
