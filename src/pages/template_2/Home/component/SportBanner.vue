<template>
  <div :class="['sport-banner-container', site]">
    <div :class="['sport_banner_item', globalState.language]" v-for="(item, index) in renderList" :key="index">
      <div :class="['sport-banner_header', globalState.language]">
        <!-- <img class="header-icon" :src="useImgPath(`home/other/${item.depotCode.toLowerCase()}_icon.png`)" alt="" /> -->
        <div
          :class="['txt', globalState.language, item.depotCode.toLowerCase()]"
          v-html="item[`${globalState.language}_txt`]"></div>
      </div>
      <div :class="['sport-banner_content', globalState.language]">
        {{ item[`${globalState.language}_slogan`] }}
      </div>
      <div class="sport-banner_btn" @click="goTargetGame(item)">
        <span>{{ $t_c('进入游戏') }}</span>
        <img class="arrow" :src="useImgPath('home/other/enter_btn.gif')" alt="" />
      </div>
      <div v-if="item.isTry === 1 && item.availableWh === 1 && !userState.token" class="status-tag try">
        <img :src="useCommonImgPath(`icon-try.png`)" alt="" />
        <span>{{ $t_c('可试玩') }}</span>
      </div>
      <div v-if="item.availableWh === 2" class="status-tag maintain">
        <img :src="useCommonImgPath(`icon-maintain.png`)" alt="" />
        <span>{{ $t_c('维护中') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDialog from '@/hook/useDialog';
import useGameHook from '@/hook/useGameHook';
import { useImgPath, useCommonImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useGameState, useGlobalState } from '@/stores';

const site = useSite();
const gameState = useGameState();
const { _enterGame } = useGameHook();
const { messageTip } = useDialog();
const globalState = useGlobalState();
const userState = useUserState();
const router = useRouter();

const goTargetGame = (item: API.normalGameType) => {
  switch (item.type) {
    case 'electronic':
      gameState.set_electronic_depotCode(item.depotCode);
      router.push('/electronic/selectList');
      break;
    case 'chess':
      gameState.set_poker_depotCode(item.depotCode);
      router.push('/poker/selectList');
      break;
    case 'lottery':
      gameState.set_lottery_depotCode(item.depotCode);
      router.push('/lottery/selectList');
      break;
    case 'fish':
      gameState.set_fish_depotCode(item.depotCode);
      router.push('/fish/selectList');
      break;
    default:
      if (!item.id) return messageTip({ message: lang('游戏暂未开放') });
      _enterGame(item);
      break;
  }
};

const renderList: ComputedRef<API.normalGameType[]> = computed(() => {
  const tempList = JSON.parse(JSON.stringify(gameState.recommendSport));
  return tempList.map((item: any) => {
    const currentMap =
      gameState[item.type].find((_: any) => {
        return _.depotCode === item.depotCode;
      }) ?? {};
    item = Object.assign(item, currentMap);
    return item;
  });
});
const sb_bg = `url(${useImgPath(`home/Popular_game/01_${gameState.recommendSport[0]?.type}_banner.png`)})`;
const fb_bg = `url(${useImgPath(`home/Popular_game/02_${gameState.recommendSport[1]?.type}_banner.png`)})`;
</script>
<style lang="scss" scoped>
.sport-banner-container {
  @include flex();
  .sport_banner_item {
    width: 620px;
    height: 240px;
    background-size: 100% auto;
    padding: 76px 0 0 40px;
    background-repeat: no-repeat;
    position: relative;
    &.en {
      .sport-banner_btn {
        font-size: 14px;
      }
      .sport-banner_content {
        font-size: 12px;
      }
      .sport-banner_header {
        padding-right: 20px;
      }
    }
    &.ms {
      // padding-top: 20px;

      .sport-banner_content {
        font-size: 12px;
        margin-top: 5px;
      }
      .sport-banner_header {
        padding-right: 20px;
      }
    }
    &.vi {
      .sport-banner_content {
        font-size: 12px;
        margin-top: 5px;
      }

      .sport-banner_header {
        padding-right: 20px;
      }
    }

    &:nth-child(1) {
      background-image: v-bind(sb_bg);
    }

    &:nth-child(2) {
      background-image: v-bind(fb_bg);
    }
    .sport-banner_header {
      @include flex(flex-start);
      // width: 184px;
      min-width: 184px;
      height: 52px;
      background-color: var(--home_24);
      box-shadow: var(--home_25);
      border-radius: 100px;
      padding: 0 11px;
      position: absolute;
      top: 20px;
      &:not(.zh) {
        justify-content: space-between;
      }
      .header-icon {
        width: 35px;
        height: 35px;
      }
      .txt {
        font-weight: 500;
        font-size: 28px;
        color: var(--home_46);
        margin-left: 5px;
      }
    }
    .sport-banner_content {
      max-width: 300px;
      margin-top: 15px;
      font-size: 14px;
      min-height: 60px;
      color: var(--home_26);
      &.ms {
        max-width: 310px;
      }
    }
    .sport-banner_btn {
      margin-top: 20px;
      @include flex();
      height: 37px;
      padding: 0 20px;
      background: var(--home_27);
      box-shadow: var(--home_28);
      border-radius: 40px;
      font-size: 18px;
      color: var(--home_29);
      font-weight: 500;
      cursor: pointer;
      position: absolute;
      bottom: 20px;
      .arrow {
        width: 26px;
        margin-left: 5px;
      }
    }
    .status-tag {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 35px;
      font-size: 14px;
      color: #ffffff;
      background: linear-gradient(47.51deg, #f56d44 11.25%, #ffcb58 101.65%);
      border-radius: 3px 10px 3px 20px;
      &.maintain {
        background: linear-gradient(111.25deg, #f0f0f0 7.33%, #949292 34%);
      }
      img {
        margin-right: 5px;
        width: 18px;
      }
    }
  }
}

.template_2_001 {
  .sport_banner_item {
    &:nth-child(1) {
      transform: translateX(-10px);
    }

    &:nth-child(2) {
      transform: translateX(22px);
    }
  }
}

//- 二号差异
.template_2_002 {
  .sport-banner_header {
    box-shadow: none !important;
  }
  .sport_banner_item {
    &.en {
      height: 240px;
      .sport-banner_content {
        font-size: 12px;
      }
      .sport-banner_btn {
        bottom: 8px;
      }
    }
    &:nth-child(1) {
      transform: translateX(-20px);
    }

    &:nth-child(2) {
      transform: translateX(22px);
    }
  }
  .sport-banner_btn {
    box-shadow: none !important;
  }
}
//- 三号差异
.template_2_003 {
  .sport_banner_item {
    box-shadow: none;
  }
}
</style>
