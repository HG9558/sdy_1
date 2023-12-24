<template>
  <div :class="['header-navigator-container', useSite()]">
    <div class="header-navigator_main">
      <img class="logo" @click="$router.push('/home')" :src="useLogoPath(`logo_1_${globalState.language}.png`)" />
      <div class="header_language_switch" v-if="envState.vite_language_list.length > 1">
        <el-dropdown trigger="click" placement="bottom-end" popper-class="header_drop" @command="handleCommand">
          <span class="header_language_switch_drop">
            <img class="language_icon" :src="useCommonImgPath(`header_language_${globalState.language}.png`)" />
            <el-icon class="el-icon--right"><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in envState.vite_language_list" :key="index" :command="item">
                <img class="language_icon" :src="useCommonImgPath(`header_language_${item.languageType}.png`)" />
                {{ item.showText }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div
        :class="['navigator_list_wrapper', globalState.language]"
        @mouseenter="changeStatus(true)"
        @mouseleave="changeStatus(false)">
        <div
          :class="[
            'list_wrapper_item',
            globalState.language,
            (globalState.language !== 'zh' || titleList.length > 10) && 'is_other_ln',
            item.path === $route.path && 'on',
            item.type === 'cockfighting' && $route.path === '/specialGamePage/cockfighting' && 'on',
            item.componentName === 'PartnerMenu' && !envState.vite_show_partner && 'hide',
          ]"
          v-for="(item, index) in titleList"
          :key="item.path"
          @mouseenter="changeCurrentMenu(item.componentName, index)"
          @mouseleave="currenIndex = -1"
          @click="goTargetPage(item)">
          <span>{{ item.name }}</span>
        </div>
        <slot></slot>
      </div>
    </div>
    <user-operation></user-operation>
  </div>
</template>

<script setup lang="ts">
import { useCommonImgPath, useImgPath, useLogoPath, useSite } from '@/hook/usePath';
import { navigatorList } from 'static_data/header_data';
import { computed, ref } from 'vue';
import { useRouter, type RouteLocationRaw } from 'vue-router';
import UserOperation from './UserOperation.vue';
import useGameHook from '@/hook/useGameHook';

const gameState = useGameState();
const currenIndex = ref<number>(-1);
const normalState = useNormalState();
const emit = defineEmits(['changeMenuStatus', 'changeCurrentComponentName']);
const router = useRouter();
const changeStatus = (_: boolean) => emit('changeMenuStatus', _);
const globalState = useGlobalState();
const envState = useEnvState();
const { _enterGame } = useGameHook();

const changeCurrentMenu = (currentMenu: string, index: number) => {
  if (currentMenu && currentMenu !== 'SponsorMenu') emit('changeCurrentComponentName', currentMenu);
  currenIndex.value = index;
};

interface Navigator {
  name: string;
  componentName: string;
  path: string;
  icon: string;
  type: string;
}

const titleList: ComputedRef<Navigator[]> = computed(() => {
  let tempList = JSON.parse(JSON.stringify(navigatorList));
  const partOne = tempList.slice(0, 1);
  let middle = tempList.slice(1, tempList.length - 3);
  const partLast = tempList.slice(tempList.length - 3);

  middle = middle
    .map((item: { sort: any; type: string | number }) => {
      item.sort = envState.vite_game_sort_map[item.type]?.sort || 0;
      return item;
    })
    .sort((a: { sort: number }, b: { sort: number }) => a.sort - b.sort);
  tempList = [...partOne, ...middle, ...partLast];
  if (!envState.vite_show_history_sponsor) tempList.pop();
  return tempList.filter((_: any) => {
    if (gameState[_.type]) {
      return gameState[_.type].length;
    }
    return true;
  });
});

const goTargetPage = (item: { componentName: string; path: RouteLocationRaw }) => {
  if (item.componentName === 'RollingBallMenu') {
    _enterGame(gameState.rollingBall[0]);
  } else {
    if (item.componentName === 'DiscountsMenu') {
      normalState.set_discount_type('全部优惠');
    }
    router.push(item.path);
  }
};

const handleCommand = (command: EnvStoreType.LanguageListType) => {
  globalState.set_language(command.languageType as 'zh' | 'en' | 'vi' | 'ms' | 'zh_tw');
};

const headerNavSlider = `url(${useImgPath('base/header_nav_slider.gif')}?v=${Math.random()})`;
</script>

<style scoped lang="scss">
.header-navigator-container {
  height: 100px;
  width: 1280px;
  margin: 0 auto;
  @include flex();
  .header-navigator_main {
    @include flex(flex-start);
    height: 100%;
    flex-grow: 1;
    position: relative;
    .logo {
      height: 42px;
      cursor: pointer;
    }
    .header_language_switch {
      margin-left: 10px;
      cursor: pointer;
      .language_icon {
        width: 26px;
        height: 26px;
      }
      .header_language_switch_drop {
        @include flex();
        .el-icon--right {
          color: var(--h_u_17);
        }
      }
    }
    .navigator_list_wrapper {
      @include flex(center);
      font-size: 14px;
      align-self: flex-start;
      align-items: flex-start;
      height: 100%;
      position: relative;
      flex-grow: 1;

      &.en {
        padding: 0 10px;
      }

      .list_wrapper_item {
        padding: 0 16px;
        height: 100%;
        font-size: 16px;
        margin-right: 15px;
        @include flex(center);
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        color: var(--h_1);
        font-weight: 500;
        &.hide {
          display: none;
        }
        &.zh {
          font-size: 16px !important;
        }
        &.is_other_ln {
          flex-grow: 1;
          padding: 0;
          margin-right: 0;
          font-size: 14px;
        }
        &.on {
          @include text_clip(var(--h_5));
          position: relative;

          &:after {
            content: '';
            position: absolute;
            background-image: v-bind(headerNavSlider);
            background-size: 100% 100%;
            width: 100%;
            height: 100%;
            max-width: 100px;
            max-height: 100px;
            bottom: 0px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        &:hover {
          @include text_clip(var(--h_5));
        }
      }
    }
  }
}
</style>

<style lang="scss">
.header_drop {
  border-color: var(--h_u_16) !important;
  border-radius: 5px;
  z-index: 10000 !important;
  .language_icon {
    width: 26px;
    height: 26px;
    margin-right: 10px;
  }
  .el-popper__arrow::before {
    border: 1px solid var(--h_u_16) !important;
  }
}
//2号模版
.template_2_002 {
  .el-dropdown__popper .el-dropdown-menu {
    background: linear-gradient(180deg, #202837 0%, #441844 100%);
    box-shadow: 0px 4px 8px rgba(50, 62, 99, 0.12);
  }
  .el-popper__arrow::before {
    background: var(--el-text-color-primary) !important;
  }
  .el-dropdown-menu__item {
    color: #b1b7ca;
  }
  .el-dropdown-menu__item:not(.is-disabled):focus {
    background: rgba(255, 0, 243, 0.25);
    color: #ff00f3;
  }
}

/// 3号模版
.template_2_003 {
  .header-navigator_main {
    height: 100% !important;
    z-index: 1;
  }
  .navigator_list_wrapper {
    align-self: center !important;
    .list_wrapper_item {
      height: 70% !important;
      align-self: center;
    }
    .list_wrapper_item.on {
      &:after {
        bottom: -15px !important;
      }
    }
  }
  .el-dropdown__popper .el-dropdown-menu {
    background: #fff;
    box-shadow: 0px 4px 8px rgba(50, 62, 99, 0.12);
  }
  .el-dropdown-menu__item {
    color: #505679;
  }
  .el-dropdown-menu__item:not(.is-disabled):focus {
    background: #fdfaf4;
    color: #fd8803;
  }
}
/// 3号模版
.template_2_004 {
  &.header-container {
    height: 85px;
    .header-navigator-container {
      height: 85px;
    }
  }
  // .header-navigator_main {
  //   height: 100% !important;
  //   z-index: 1;
  // }
  .navigator_list_wrapper {
    // align-self: center !important;
    // .list_wrapper_item {
    //   height: 70% !important;
    //   align-self: center;
    // }
    .list_wrapper_item.on {
      &:after {
        bottom: 15px !important;
      }
    }
  }
  // .el-dropdown__popper .el-dropdown-menu {
  //   background: #fff;
  //   box-shadow: 0px 4px 8px rgba(50, 62, 99, 0.12);
  // }
  // .el-dropdown-menu__item {
  //   color: #505679;
  // }
  // .el-dropdown-menu__item:not(.is-disabled):focus {
  //   background: #fdfaf4;
  //   color: #fd8803;
  // }
}
</style>
