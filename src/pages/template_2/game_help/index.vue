<template>
  <div :class="['help-box', site]">
    <div class="help-content">
      <div class="tabs">
        <div class="tabs_container">
          <div
            class="help_tab_item"
            v-for="(item, index) in tabsList"
            :key="index"
            :class="isActive == index ? 'active' : ''"
            @click="isActive = index">
            <img
              class="icon_img"
              :src="useImgPath(`game_help/icon_${item.icon}${isActive === index ? '_active' : ''}.png`)"
              alt="" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="view">
        <component :is="tabsList[isActive].componentName"></component>
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
import GameHelp from './component/GameHelp.vue';
import Responsibility from './component/Responsibility.vue';
import Privacy from './component/Privacy.vue';
import Rule from './component/Rule.vue';
import { markRaw, onMounted, reactive, ref, watch } from 'vue';
import { useImgPath, useSite } from '@/hook/usePath';
import { useRoute } from 'vue-router';
import { lang } from '@/i18n';

const site = useSite();
const isActive = ref<number>(0);
const tabsList = reactive<GameHelpType.typeListType[]>([
  {
    title: lang('游戏帮助'),
    icon: 'help',
    componentName: markRaw(GameHelp),
  },
  {
    title: lang('博彩责任'),
    icon: 'zr',
    componentName: markRaw(Responsibility),
  },
  {
    title: lang('隐私保护'),
    icon: 'ys',
    componentName: markRaw(Privacy),
  },
  {
    title: lang('规则与条款'),
    icon: 'tk',
    componentName: markRaw(Rule),
  },
]);
const route = useRoute();
onMounted(() => {
  isActive.value = +(route!.query!.index as unknown as number) || 0;
});

watch(route, () => {
  isActive.value = +(route!.query!.index as unknown as number) || 0;
});
</script>

<style lang="scss" scoped>
.help-box {
  width: 100%;
  padding-top: 50px;
  .help-content {
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    padding: 0px 0 45px;
    @include flex(space-between, row, nowrap, inherit);
    .tabs {
      width: 200px;
      background-color: var(--hp_1);
      box-shadow: var(--hp_2);
      border-radius: 10px;
      padding-top: 20px;
      .tabs_container {
        width: 100%;
        @include flex(flex-start, row, wrap);
        align-items: flex-start;
      }
      .help_tab_item {
        width: 50%;
        font-size: 14px;
        color: var(--hp_3);
        cursor: pointer;
        @include flex(flex-start, column);
        margin-bottom: 40px;
        .icon_img {
          width: 48px;
          height: 48px;
          margin-bottom: 10px;
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
      }
      .active {
        span {
          color: var(--hp_4);
          font-weight: 500;
        }
      }
    }
    .view {
      width: 1060px;
      background: var(--hp_1);
      border-radius: 10px;
      box-shadow: var(--hp_2);
    }
  }
}
</style>

<style lang="scss">
//- 003
.help-box {
  &.template_2_003 {
    .view {
      border: 5px solid #ffffff;
      box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
      border-radius: 10px;
      .type-one {
        background-color: #fff;
        margin: 0;
        padding: 20px 40px;
        border-radius: 10px;
      }
    }
  }
}
</style>
