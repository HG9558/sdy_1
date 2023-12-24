<template>
  <div :class="['profile-container', site]">
    <side-bar></side-bar>
    <div :class="['view-content', isNoBg && 'normal-bg', route.path.includes('vipInfo') && 'vip_main_bg']">
      <div :class="['content_title', route.path.includes('vip') && 'flex']">
        <span v-if="currentRouteInfo?.name && currentRouteInfo.icon !== 'friend'">{{ currentRouteInfo?.name }}</span>
        <span
          @click="$router.push('/profile/vipInfo')"
          class="small_decs"
          v-if="currentRouteInfo?.path === '/profile/vip'"
          >{{ $t_c('VIP详情') }} >
        </span>
        <template v-if="route.path === '/profile/vipInfo'">
          <span class="return-btn vip_page" @click="$router.push('/profile/vip')">
            <el-icon size="18">
              <ArrowLeft />
            </el-icon>
            {{ $t_c('VIP尊享') }}
          </span>
          <span>{{ $t_c('VIP详情') }}</span>
        </template>

        <template v-if="route.path === '/profile/recommended'">
          <span class="return_title" v-if="recommendShowStr.subTitle" @click="returnBackClick">
            <el-icon size="20">
              <ArrowLeft />
            </el-icon>
            <span>{{ recommendShowStr.subTitle }}</span>
          </span>
          <span :class="['main_title', recommendShowStr.subTitle && 'center_text']">{{ recommendShowStr.title }}</span>
        </template>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<route>
{
    meta: {bg: 'bg_3'}
}
</route>
<script lang="ts" setup>
import useGetUserHook from '@/hook/useGetUserHook';
// import { useUserState, useNormalState } from '@/stores';
import SideBar from './profile/component/SideBar.vue';
import { sideBarList } from 'static_data/user_profile_data';
import { api } from '@/api';
import { lang } from '@/i18n';
import { useSite } from '@/hook/usePath';
const site = useSite();
const route = useRoute();
const { _getUserInfo } = useGetUserHook();
const normalState = useNormalState();
const userState = useUserState();

const isNoBg = computed(() => {
  return route.path === '/profile/vipInfo';
});

onMounted(() => {
  _getUserInfo();
  _initBankList();
  if (route.path !== '/profile/withdrawal') _isWithdrawal();
});

const _isWithdrawal = async () => {
  const res = await api.bank.isWithdrawal();

  if (res.code) return;
  userState.$patch(state => {
    state.alipayEnable = !!res.data.alipayEnable;
    state.cnyWithdrawEnable = !!res.data.cnyWithdrawEnable;
    state.ebPayWithdrawEnable = !!res.data.ebPayWithdrawEnable;
    state.toPayWithdrawEnable = !!res.data.toPayWithdrawEnable;
    state.goPayWithdrawEnable = !!res.data.goPayWithdrawEnable;
    state.ecnyWithdrawEnable = !!res.data.ecnyPayWithdrawEnable;
    state.eMoneyPayWithdrawEnable = !!res.data.eMoneyPayWithdrawEnable;
  });
};

const _initBankList = () => {
  userState._getBankCardList();
  userState._getCryptoList();
  userState._getAlipayList();
  userState._getEcnyList();
  userState._getEMoneyList();
  userState._getOtherPayAccountList();
  //-todo bog平台单独
};

const returnBackClick = () => {
  normalState.set_recommended_str(recommendShowStr.value.componentName);
};

const currentRouteInfo = computed(() => {
  const tempList = sideBarList.concat([
    { icon: '', name: lang('取款'), path: '/profile/withdrawal' },
    { icon: '', name: lang('存款'), path: '/profile/deposit' },
  ]);

  return tempList.find(item => {
    return item.path === route.path;
  });
});

const recommendShowStr = computed(() => {
  const mapData = { title: lang('好友推荐'), subTitle: '', componentName: '' };
  switch (normalState.recommendedStr) {
    case 'Recommend':
      mapData.title = lang('好友推荐');
      mapData.subTitle = '';
      break;
    case 'MyFriend':
      mapData.title = lang('我的好友');
      mapData.subTitle = lang('好友推荐');
      mapData.componentName = 'Recommend';
      break;
    case 'MyFriendDetail':
      mapData.title = lang('好友详情');
      mapData.subTitle = lang('我的好友');
      mapData.componentName = 'MyFriend';
      break;
    case 'GetMore':
      mapData.title = lang('收益日报');
      mapData.subTitle = lang('好友推荐');
      mapData.componentName = 'Recommend';
      break;
  }
  return mapData;
});
</script>

<style lang="scss" scoped>
.profile-container {
  font-size: 14px;
  width: 1280px;
  padding: 50px 0;
  margin: 0 auto;
  display: flex;
  // @include flex(flex-start);
  // align-items: flex-start;
}
.view-content {
  min-height: 860px;
  background-color: var(--u_h_1);
  border-radius: 10px;
  width: 1060px;
  box-shadow: var(--u_h_19);
  .router-view {
    padding: 0 20px;
  }
  &.normal-bg {
    background-color: transparent;
    .content_title {
      background-color: var(--u_h_1);
      border-radius: 10px 10px 0 0;
    }
  }
}
.content_title {
  font-size: 24px;
  height: 72px;
  color: var(--u_h_2);
  font-weight: 500;
  padding: 20px;
  position: relative;
  border-bottom: 1px solid var(--u_h_3);
  .main_title {
    &.center_text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .return_title {
    color: var(--u_h_4);
    font-weight: 500;
    font-size: 16px;
    @include flex(flex-start);
    cursor: pointer;
    height: 100%;

    span {
      margin-left: 5px;
    }
  }
  &.flex {
    position: relative;
    @include flex(center);
  }
  &.recommendedFlex {
    @include flex(center);
  }
  .small_decs {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--u_h_4);
    font-size: 16px;
    cursor: pointer;
  }
}
.return-btn {
  @include flex(flex-start);
  position: absolute;
  left: 20px;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: var(--u_h_4);
}
.profile-container {
  &.template_2_002 {
    .view-content {
      .content_title {
        border-bottom: 1px solid #202c3b;
      }
    }
  }
  &.template_2_003 {
    .view-content {
      border: 5px solid #ffffff;
      &.normal-bg {
        border: none;
        .content_title {
          border: 5px solid #ffffff;
          border-bottom: 1px solid #dee3ee;
        }
      }
    }
  }
}
</style>
