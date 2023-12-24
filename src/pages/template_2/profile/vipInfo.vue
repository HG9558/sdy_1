<template>
  <div :class="['vipinfo', site]">
    <div class="slider_container">
      <el-carousel
        type="card"
        :initial-index="currentIndex"
        arrow="never"
        indicator-position="none"
        :autoplay="false"
        height="211px">
        <el-carousel-item
          :class="`v-${index}`"
          v-for="(item, index) in userState.vipData.activityLevelList.slice(1, 11)"
          :key="index"
          :style="{
            backgroundImage:
              'url(' + useImgPath(`profile/vip_v_${index + 1}${globalState.language === 'zh' ? '' : '_en'}.png`) + ')',
            backgroundRepeat: 'round',
            borderRadius: '15px',
          }">
          <div class="header-left">
            <div :class="['header-left-bottom', globalState.language, `item_${index + 1}`]">
              <div>{{ item.depositMin }}</div>
              <div>{{ item.validbetMin }}</div>
              <div>{{ item.downgradeBet }}</div>
            </div>
            <div v-if="globalState.language === 'zh'" class="downgrade-day">
              ({{ (userState.vipData.downgradePromotionDay / 30).toFixed() }}个月)
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <VipTable style-name="vip-info" :title="$t_c('VIP返水比例')"></VipTable>

    <div class="vipinfo-top" v-if="JSON.parse(userState.vipData.hdgz)?.content">
      <div class="rule-title">{{ $t_c('活动的一般条款与规则') }}</div>
      <div
        class="vipinfo-word"
        v-for="(item, index) in JSON.parse(userState.vipData.hdgz)?.content.split('\n')"
        :key="index">
        {{ item }}
      </div>
    </div>

    <div class="un-return-watter-container">
      <div class="watter-title">{{ $t_c('不返水列表') }}</div>
      <div class="vipinfo-list">
        <div class="table-header">
          <div :class="['thead', globalState.language]">
            {{ $t_c('游戏平台') }}
          </div>
          <div class="thead">
            {{ $t_c('游戏') }}
          </div>
        </div>
        <div class="table-body">
          <div
            :class="['vipinfo-list-word', globalState.language]"
            v-for="(item, index) in getGameListWithoutRebateList"
            :key="index">
            <div :class="['item-title', globalState.language]">{{ item.depotName }}</div>
            <div class="item">
              <span v-for="(childList, ind) in item.gameList" :key="ind">
                {{ ind !== item.gameList.length - 1 ? childList.gameName + ',' : childList.gameName }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { useImgPath, useSite } from '@/hook/usePath';
// import { useGlobalState, useUserState } from '@/stores';
import { computed, onMounted, reactive } from 'vue';
import VipTable from './component/vip/VipTable.vue';

const site = useSite();
const userState = useUserState();
const getGameListWithoutRebateList = reactive<VipAPI.getGameListWithoutRebateData[]>([]);
const globalState = useGlobalState();

onMounted(() => {
  api.vip.getGameListWithoutRebate().then(res => {
    if (res.code === 0) {
      getGameListWithoutRebateList.length = 0;
      getGameListWithoutRebateList.push(...res.data);
    }
  });
});

const currentIndex = computed(() => {
  if (userState.userInfo.mbrLevel === 0) return 0;
  return Number((userState.userInfo.mbrLevel as number) - 1);
});
</script>
<style lang="scss" scoped>
.vipinfo {
  padding: 0 !important;
  padding: 20px 15px 20px;
  position: relative;
  border-radius: 10px;

  .header-left {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
  }

  .header-left-bottom {
    display: flex;
    justify-content: space-around;
    margin-top: 120px;
    margin-left: -11px;
    &:not(.zh, .zh_tw) {
      div:nth-child(2) {
        transform: translateX(-15px);
      }
      div:nth-child(3) {
        transform: translateX(-20px);
      }
    }

    .header-left-bottom-div {
      text-align: center;

      div {
        font-size: 14px;
        flex-grow: 1;
        text-align: center;
      }
    }
  }

  .vipinfo-top {
    background-color: var(--u_vd_3);
    margin-top: 30px;
    border-radius: 10px;
    box-shadow: var(--u_vd_4);
    padding: 24px 20px;

    .rule-title {
      height: 35px;
      line-height: 35px;
      font-weight: 600;
      color: var(--u_vd_1);
      font-size: 14px;
      margin-bottom: 20px;
      position: relative;

      &:after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background: var(--u_vd_5);
        left: 0;
        bottom: 0;
      }
    }
  }

  .vipinfo-word {
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 10px;
    color: var(--u_vd_12);
  }
}

.middle {
  border-radius: 8px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
}

.un-return-watter-container {
  background: var(--u_vd_3);
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px;
  margin-top: 24px;

  .watter-title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    margin-bottom: 12px;
  }

  .table-header {
    background: var(--u_vd_6);
    display: flex;
    align-items: center;
    color: var(--u_vd_3);
    font-size: 14px;
    font-weight: 500;
    height: 32px;

    .thead:first-child {
      width: 81px;
      text-align: center;
      &:not(.zh, .zh_tw) {
        width: 190px;
      }
    }

    .thead:last-child {
      width: 206px;
      text-align: center;
    }
  }

  .table-body {
    .vipinfo-list-word {
      display: flex;
      color: var(--u_vd_1);

      .item-title {
        width: 90px;
        text-align: center;
        word-break: break-all;
        white-space: nowrap;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1px 0;
        font-size: 14px;
        background: var(--u_vd_7);
        box-shadow: var(--u_vd_8);
        &:not(.zh, .zh_tw) {
          width: 190px;
        }
        &.vi {
          width: 236px;
        }
      }
      .item {
        width: 81px;
        line-height: 40px;
        background: var(--u_vd_7);
        box-shadow: var(--u_vd_8);
        margin: 1px;
        text-align: center;
        font-size: 14px;
        font-weight: normal;
        word-break: break-all;
        display: flex;
        flex-wrap: wrap;

        span {
          margin-right: 6px;
          display: block;
        }

        &:last-child {
          flex-grow: 1;
          text-align: left;
          padding: 10px 50px;
        }
      }
    }
  }
}

.slider_container {
  padding: 30px 70px;
  background-color: var(--u_vd_3);

  :deep(.el-carousel) {
    .el-carousel__item--card.is-active {
      width: 422px;
    }
  }
}

@for $i from 0 through 9 {
  .v-#{$i} {
    @if ($i > 8) {
      color: var(--u_vd_9);
    } @else if ($i < 4 or $i>=7) {
      color: var(--u_vd_10);
    } @else if($i >=4 and $i < 7) {
      color: var(--u_vd_11);
    }
  }
}

.downgrade-day {
  position: absolute;
  right: 11px;
  font-size: 11px;
  bottom: -25px;
}

:deep(.el-carousel__mask) {
  background-color: transparent;
}

//- 2号模板差异
.vipinfo {
  &.template_2_002 {
    .slider_container {
      background: #1d2936;
    }
    .vip_table {
      background: #1d2936;
    }
    .vipinfo-top {
      background: #1d2936;
      .rule-title {
        color: #fff;
        &:after {
          background: #5f6267;
        }
      }
      .vipinfo-word {
        color: #b1b7ca;
      }
    }
    .un-return-watter-container {
      background: #1d2936;
      .watter-title {
        color: #fff;
      }
      .vipinfo-list {
        .table-header {
          background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
        }
        .table-body {
          .vipinfo-list-word {
            color: #fff;
            .item-title {
              background: #273546;
              box-shadow: none;
            }
            .item {
              background: #273546;
              box-shadow: none;
            }
          }
        }
      }
    }
  }
  &.template_2_003 {
    &.vipinfo {
      background-color: transparent;
      .vip_table {
        background: rgba(246, 248, 254, 0.4);
        border: 5px solid #ffffff;
        border-top: none;
        /* box-shadow: 0px 4px 35px rgb(115 121 134 / 12%); */
      }
      .slider_container {
        border: 5px solid #ffffff;
        border-top: none;
        border-bottom: none;
      }
      .vipinfo-top,
      .un-return-watter-container {
        border: 5px solid #ffffff;
        color: #132743;
      }
      .rule-title {
        &:after {
          /* border: 1px solid; */
          background: linear-gradient(
            270deg,
            rgba(228, 231, 244, 0) 0%,
            #cdd3f1 52.58%,
            rgba(229, 232, 249, 0) 102.03%
          );
        }
      }
      .vipinfo-list {
        .table-header {
          color: #fff;
        }
      }
    }
  }
}
</style>
