<template>
  <div class="new_usdt_teach">
    <div class="new_usdt_teach_content">
      <div class="tabs">
        <div class="tabs_main">
          <div
            class="usdt_help_tab_item"
            v-for="(item, index) in tabsList"
            :key="index"
            :class="activeIndex == index ? 'active' : ''"
            @click="activeIndex = index">
            <img
              class="icon_img"
              :src="useCommonImgPath(`usdt_teach/${item.icon}${activeIndex === index ? '' : '_active'}.png`)"
              alt="" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div :class="['new_usdt_teach_view', activeIndex === 0 && 'gray']">
        <div class="new_usdt_teach_tab_title">
          {{ tabsList[activeIndex].title }}
        </div>
        <component :is="tabsList[activeIndex].componentName"></component>
      </div>
    </div>
  </div>
</template>

<route>
 {
    meta: {bg: 'bg_3'}
  }
</route>
<script lang="ts" setup>
import Usdt from './component/usdt_desc.vue';
import Mixpay from './component/mixpay_desc.vue';
import Huobi from './component/huobi_desc.vue';
import Bian from './component/bian_desc.vue';
import Zhongbi from './component/zhongbi_desc.vue';
import { useCommonImgPath } from '@/hook/usePath';
import { lang } from '@/i18n';

const activeIndex = ref<number>(0);
const tabsList = reactive<GameHelpType.typeListType[]>([
  {
    title: lang('什么是USDT？'),
    icon: 'icon_1',
    componentName: markRaw(Usdt),
  },
  {
    title: 'Mixpay',
    icon: 'icon_2',
    componentName: markRaw(Mixpay),
  },
  {
    title: lang('火币'),
    icon: 'icon_3',
    componentName: markRaw(Huobi),
  },
  {
    title: lang('币安'),
    icon: 'icon_4',
    componentName: markRaw(Bian),
  },
  {
    title: lang('中币'),
    icon: 'icon_5',
    componentName: markRaw(Zhongbi),
  },
]);
</script>

<style lang="scss" scoped>
.new_usdt_teach {
  width: 100%;
  padding-top: 50px;
  .new_usdt_teach_content {
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    padding: 0 0 45px;
    @include flex(space-between, row, nowrap, inherit);
    .tabs {
      width: 200px;
      background-color: var(--usdtS_1);
      box-shadow: var(--usdtS_3);
      border-radius: 10px;
      padding-top: 20px;
      .tabs_main {
        width: 100%;
      }
      .usdt_help_tab_item {
        font-size: 15px;
        color: var(--usdtS_4);
        font-weight: 500;
        cursor: pointer;
        @include flex(flex-start);
        margin: 0 0 15px 15px;
        padding: 7px 9px;

        .icon_img {
          width: 42px;
          margin-right: 20px;
        }
        & > span {
          text-align: center;
        }
        .help-category-name {
          flex-grow: 1;
          text-align: center;
          white-space: nowrap;
          max-width: 105px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        &.active {
          border-top-left-radius: 28px;
          border-bottom-left-radius: 28px;
          background: var(--usdtS_6);
          span {
            color: var(--usdtS_5);
            font-weight: 500;
          }
        }
      }
    }
    .new_usdt_teach_view {
      padding: 24px 20px;
      width: 1060px;
      background: var(--usdtS_2);
      border-radius: 10px;
      box-shadow: var(--usdtS_7);
      &.gray {
        background: var(--usdtS_11);
      }
      .new_usdt_teach_tab_title {
        font-size: 16px;
        font-weight: 500;
        color: var(--usdtS_8);
        position: relative;
        padding-bottom: 26px;
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          left: 0;
          height: 1px;
          background: var(--usdtS_9);
          box-shadow: var(--usdtS_10);
          bottom: 0;
        }
      }
    }
  }
}
</style>
