<template>
  <div class="section_usdt_main">
    <img :src="useCommonImgPath(`usdt_teach/${globalState.language}/usdt_banner.jpg`)" class="section_usdt_banner" />
    <div class="section_part part_one">
      <img :src="useCommonImgPath(`usdt_teach/${globalState.language}/usdt_1.png`)" alt="" class="section_part_title" />
      <div class="section_part_list">
        {{ $t_c('虚拟币是一种不具备实体形式的，仅以数字形式存在的货币，也称为“数字货币”。') }}
      </div>
      <div class="section_part_list">
        {{
          $t_c(
            '其性质与实物货币相似，允许在互联网上即时、无地域限制的转移，主流的数字货币如USDT(泰达币)、BTC(比特币)、ETH(以太币)。'
          )
        }}
      </div>
      <div class="section_part_list">
        {{ $t_c('用户可以通过数字货币交易平台购买数字货币，在平台进行支付、兑换成人民币从进行游戏。') }}
      </div>
    </div>
    <div class="section_part part_two">
      <img :src="useCommonImgPath(`usdt_teach/${globalState.language}/usdt_2.png`)" alt="" class="section_part_title" />
      <p class="section_part_desc">
        {{ $t_c('泰达币(Tether)也被称为USDT，1USDT≈1美元，是全球加密数字货币中规模最大的货币种类。') }}
      </p>
      <div class="section_part_block">
        <div class="section_part_img_wrap">
          <img width="42" :src="useCommonImgPath(`usdt_teach/icon_usdt_1.png`)" alt="" />
        </div>
        <div class="block-right">
          <div class="block-right-top">{{ $t_c('匿名交易') }}</div>
          <div class="block-right-bottom">
            {{ $t_c('不同于传统交易方式，用户不需要给自己的姓名或卡号即可完成虚拟币交易，避免敏感信息泄露。') }}
          </div>
        </div>
      </div>
      <div class="section_part_block">
        <div class="section_part_img_wrap">
          <img width="26" :src="useCommonImgPath(`usdt_teach/icon_usdt_2.png`)" alt="" />
        </div>
        <div class="block-right">
          <div class="block-right-top">{{ $t_c('快速到账') }}</div>
          <div class="block-right-bottom">
            {{ $t_c('虚拟币采集使用的区块链技术工具有去中心化特点，不需要清算中心机构来处理数据，交易时间大缩小。') }}
          </div>
        </div>
      </div>
      <div class="section_part_block">
        <div class="section_part_img_wrap">
          <img width="42" :src="useCommonImgPath(`usdt_teach/icon_usdt_3.png`)" alt="" />
        </div>
        <div class="block-right">
          <div class="block-right-top">{{ $t_c('匿名交易') }}</div>
          <div class="block-right-bottom">
            {{ $t_c('USDT由于其是定美元的固定汇率货币，所以不同于比特币，也被称为稳定币。') }}
          </div>
        </div>
      </div>
      <div class="section_part_block">
        <div class="section_part_img_wrap">
          <img width="36" :src="useCommonImgPath(`usdt_teach/icon_usdt_4.png`)" alt="" />
        </div>
        <div class="block-right">
          <div class="block-right-top">{{ $t_c('24H随时进行交易') }}</div>
          <div class="block-right-bottom">
            {{ $t_c('不像其货币、有价证券等受制于银行系统维护、证券交易所闭市，USDT可以在任何时候进行交易。') }}
          </div>
        </div>
      </div>
    </div>
    <div class="section_part part_three">
      <img :src="useCommonImgPath(`usdt_teach/${globalState.language}/usdt_3.png`)" alt="" class="section_part_title" />
      <div class="part_three_wrap">
        <img
          :src="useCommonImgPath(`usdt_teach/${globalState.language}/bottom_${_}.jpg`)"
          v-for="(_, index) in 4"
          :key="index"
          alt="" />
      </div>
    </div>
    <div class="section_bottom_txt">{{ $t_c('您也可以选择其数字货币交易所进行数字货币交易') }}</div>
  </div>
</template>

<script setup lang="ts">
import { useCommonImgPath } from '@/hook/usePath';
// import { useGlobalState } from '@/stores';

const globalState = useGlobalState();
</script>

<style scoped lang="scss">
.section_usdt_main {
  @include flex(flex-start, column);
  margin-top: 20px;
  .section_usdt_banner {
    width: 877px;
  }
  .section_part {
    border: 1px solid var(--usdtS_12);
    border-radius: 15px;
    width: 877px;
    margin-bottom: 20px;
    .section_part_title {
      height: 44px;
      display: block;
      margin: 13px auto 15px;
    }
    &.part_three {
      padding: 0 83px 20px;
      .part_three_wrap {
        margin-top: 10px;
        @include flex();
        img {
          width: 147px;
          border-radius: 15px;
        }
      }
    }
  }
  .section_part_list {
    margin: 10px 20px;
    padding-left: 12px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      background: var(--usdtS_16);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
    }
  }
  .section_part_desc {
    padding-left: 20px;
    margin-bottom: 10px;
  }
  .section_part_block {
    width: 837px;
    margin: 0 20px 10px;
    background: var(--usdtS_13);
    border-radius: 15px;
    padding: 14px 16px;
    @include flex(flex-start);
    .section_part_img_wrap {
      width: 42px;
      @include flex(center);
      img {
        margin-right: 13px;
      }
    }
    .block-right-top {
      font-size: 16px;
      color: var(--usdtS_14);
      font-weight: bold;
    }
  }
  .section_bottom_txt {
    color: var(--usdtS_15);
  }
}
</style>
