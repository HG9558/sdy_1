<template>
  <div :class="['vip_table', styleName, site]">
    <div class="vipinfo-title">
      <img v-if="styleName !== 'vip-info'" :src="useImgPath('profile/vip_star.png')" alt="" />
      <span>{{ title }}</span>
    </div>
    <div class="vipinfo-inner-thead">
      <span :class="['vipinfo-inner-level vip-level', globalState.language]">{{ $t_c('VIP等级') }}</span>
      <span class="vipinfo-inner-level vip-level" v-for="(item, index) in vipList" :key="index">{{ item }}</span>
    </div>

    <div class="vipinfo-inner" v-for="(item, index) in renderList" :key="index">
      <span :class="['vipinfo-inner-level', globalState.language]"
        >{{ item.title }}{{ globalState.language === 'zh' ? $t_c('返水') : '' }}</span
      >
      <span class="vipinfo-inner-level" v-for="(_, index) in item.list" :key="index">
        {{ _ ? _.donateRatio.toFixed(2) : 0 }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImgPath, useSite } from '@/hook/usePath';
// import { useGlobalState, useUserState } from '@/stores';
import { computed, onMounted, reactive } from 'vue';
const site = useSite();
defineProps<{
  styleName: string;
  title: string;
}>();

const vipList = ['VIP0', 'VIP1', 'VIP2', 'VIP3', 'VIP4', 'VIP5', 'VIP6', 'VIP7', 'VIP8', 'VIP9', 'VIP10'];
const userState = useUserState();
const globalState = useGlobalState();
const tempList = reactive<VipAPI.VipMapType[]>([
  { title: '', isShow: true, list: [] },
  { title: '', isShow: true, list: [] },
  { title: '', isShow: true, list: [] },
  { title: '', isShow: true, list: [] },
  { title: '', isShow: true, list: [] },
  { title: '', isShow: true, list: [] },
  { title: '', isShow: true, list: [] },
]);

onMounted(() => {
  const levelData = userState.vipData.activityLevelCatDtos;
  const obj: { [key: string]: boolean } = {};
  levelData.forEach(_ => {
    if (!obj[_.catName]) {
      obj[_.catName] = true;
    }
  });
  Object.keys(obj).forEach((key, index) => (tempList[index].title = key));
  tempList.forEach(data => {
    data.list.length = 0;
    levelData.forEach(_ => {
      if (data.title === _.catName) {
        data.list.push(_);
      }
    });
    data.isShow = data.list.some(_ => _.donateRatio !== 0);
  });
});

const renderList = computed(() =>
  tempList
    .filter((_: VipAPI.VipMapType) => _.isShow)
    .map(_ => {
      if (_.list.length < 10) {
        const n = 10 - _.list.length;
        for (let index = 0; index < n; index++) {
          _.list.push({ accountLevelId: 1, tierName: '', catName: '', donateRatio: 0 });
        }
      }
      return _;
    })
);
</script>

<style lang="scss" scoped>
.vip_table {
  font-size: 14px;
  font-weight: 600;
  .vipinfo-title {
    @include flex(flex-start);
    margin-bottom: 30px;
    padding-left: 20px;

    img {
      width: 35px;
      height: 35px;
      margin-right: 3px;
    }

    span {
      color: var(--u_v_9);
      font-weight: 500;
      font-size: 26px;
    }
  }

  .vipinfo-inner-thead {
    height: 46px;
    background: var(--u_v_10);
    border-radius: 10px 10px 0px 0px;
    @include flex(space-around);
    font-size: 18px;
    color: var(--u_v_11);
    .vipinfo-inner-level {
      &:nth-child(1) {
        width: 80px;
        &.vi {
          font-size: 15px;
        }
      }
    }
  }

  .vipinfo-inner {
    @include flex(space-around);

    .vipinfo-inner-level {
      background: var(--u_v_27);
      height: 49px;
      flex-grow: 1;
      @include flex(center);
      box-shadow: var(--u_v_13);
      color: var(--u_v_14);
      font-weight: normal;
      font-size: 16px;
      &:nth-child(1) {
        width: 80px;
        &:not(.zh, .zh_tw) {
          font-size: 13px;
        }
      }
    }
  }

  &.vip-info {
    font-weight: 500;
    background-color: #fff;
    padding: 0 20px 30px;
    border-radius: 0 0 10px 10px;

    .vipinfo-title {
      margin-bottom: 14px;
      padding-left: 0;

      span {
        font-size: 14px;
        font-weight: 500;
        color: var(--u_vd_1);
      }
    }

    .vipinfo-inner-thead {
      background: var(--u_vd_2);
      font-size: 14px;
    }

    .vipinfo-inner {
      .vipinfo-inner-level {
        height: 36px;
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
}
//-2号模板差异
.vip_table {
  &.template_2_002 {
    .vipinfo-title {
      span {
        color: #fff;
      }
    }
    .vipinfo-inner-thead {
      background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
      border-radius: 0px;
    }
    .vipinfo-inner {
      .vipinfo-inner-level {
        box-shadow: none;
        border-bottom: 1px solid #1d2936;
      }
    }
  }
}
</style>
