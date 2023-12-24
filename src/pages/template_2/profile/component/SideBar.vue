<template>
  <div :class="['aside', site]">
    <div class="profile-top">
      <div class="user-container">
        <div class="avatar">
          <img class="user-avatar" :src="useImgPath('profile/sidebar_girl.png')" />
          <div
            :class="[
              'level-badge',
              globalState.language,
              !envState.vite_show_vip_info && !envState.vite_avatar_show_vip && 'hide',
            ]">
            {{ userState.userInfo.levelName?.includes('0') ? 'vip 0' : userState.userInfo.levelName }}
          </div>
        </div>
        <div class="user_info">
          <div class="username">{{ userState.userInfo.loginName }}</div>
          <div class="invitation_code" v-if="globalState.codeId">{{ $t_c('邀请码') }}: {{ globalState.codeId }}</div>
        </div>
      </div>
      <div :class="['profile_level_container', !envState.vite_show_vip_info && 'hide']">
        <el-progress
          :percentage="depositMinValue"
          :format="() => 'VIP' + (userState.vipData.accountLevel > -1 ? +userState.vipData.accountLevel + 1 : 0)" />
        <span class="progress_txt" v-if="getValidbet - userState.vipData.depositAmount > -1">
          {{ $t_c('还需') }} {{ (getValidbet - (userState.vipData.depositAmount ?? 0)).toFixed(2)
          }}{{ $t_c('有效投注额晋级为')
          }}{{ 'VIP' + (userState.vipData.accountLevel > -1 ? +userState.vipData.accountLevel + 1 : 0) }}
        </span>
      </div>
    </div>

    <div class="sidebar_wallet_container">
      <div class="current_wallet_container">
        <div class="top">
          <span class="mr-5">{{ $t_c('我的钱包') }}</span>
          <el-icon @click.stop="updateBalance" class="ft-14 c-r">
            <Refresh v-if="!userState.isRefresh" />
            <Loading v-else></Loading>
          </el-icon>
        </div>
        <div class="self_money">
          {{
            (userState!.centerBalanceMoney > 0 && Number(userState!.centerBalanceMoney!.toFixed(2)).toLocaleString()) ||
            '0.00'
          }}
        </div>
      </div>
      <el-row justify="space-around" type="flex">
        <el-col :span="12">
          <router-link :class="['link-item', globalState.language]" to="/profile/deposit">
            <img v-if="theme !== '004'" :src="useImgPath('profile/sidebar_shopping.png')" />
            <div :class="['txt-wrap', globalState.language]">{{ $t_c('存款') }}</div>
          </router-link>
        </el-col>
        <el-col :span="12">
          <router-link class="link-item" to="/profile/withdrawal">
            <img v-if="theme !== '004'" :src="useImgPath('profile/sidebar_withdrawal.png')" />
            <div :class="['txt-wrap', globalState.language]">{{ $t_c('提款') }}</div>
          </router-link>
        </el-col>
      </el-row>
    </div>

    <div class="profile-nav" @mouseleave="currentSelectIndex = -1">
      <div
        :class="[
          'profile-nav-item',
          index === sideBarList.length - 2 && sideBarList.length % 2 === 0 && 'mb-0',
          item.icon === 'vip' && !envState.vite_show_vip_info && 'hide',
        ]"
        v-for="(item, index) in sideBarList"
        :key="index"
        @mouseenter="currentSelectIndex = index">
        <router-link class="menu-item" tag="div" :to="item.path">
          <img
            class="icon-img"
            :src="
              useImgPath(
                `profile/sidebar_${item.icon}${
                  route.path === item.path || currentSelectIndex === index ? '_active' : ''
                }.png`
              )
            "
            alt="" />
          <div :class="['txt-wrap', currentSelectIndex === index && 'active', globalState.language]">
            {{ item.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useGlobalState, useNormalState, useUserState } from '@/stores';
import { sideBarList } from 'static_data/user_profile_data';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const normalState = useNormalState();
const userState = useUserState();
const globalState = useGlobalState();
const router = useRouter();
const route = useRoute();
const currentSelectIndex = ref<number>(-1);
const site = useSite();
const envState = useEnvState();
const theme = sessionStorage.getItem('VITE_THEME') ?? import.meta.env.VITE_THEME;

onMounted(() => {
  _getVipInfo();
  _getAgentInfo();
});

const _getVipInfo = async () => {
  const res = await api.vip.getVipInfo();
  if (res.code) return;
  userState.setVipInfo(res.data);
};

const _getAgentInfo = async () => {
  const res = await api.user.getAgentInfo();
  if (res.code) return;
  if (res.data && res.data.isShowMbrAgent && sideBarList[4].path !== '/profile/nationalAgent') {
    normalState.set_agent_Info(res.data);

    sideBarList.splice(8, 0, {
      icon: 'agent',
      name: lang('全民代理'),
      path: '/profile/nationalAgent',
    });
  } else {
    const res = await api.friendsRecommend.getFriendRebateInfo();
    if (res.code) return;
    if (res.msg.codeId) globalState.save_code_id(res.msg.codeId);

    if (res.msg.isShowFriendRebate && sideBarList[8].path !== '/profile/recommended') {
      sideBarList.splice(8, 0, {
        icon: 'friend',
        name: lang('好友推荐'),
        path: '/profile/recommended',
      });
    } else if (!res.msg.isShowFriendRebate && sideBarList[8].path === '/profile/recommended') {
      sideBarList.splice(8, 1);
    } else if (!res.msg.isShowFriendRebate && route.path.includes('recommended')) {
      router.push('/profile/baseInfo');
    }
  }
};

const getValidbet = computed(() => {
  if (Object.keys(userState.vipData).length) {
    let filterVal = null;
    if (userState.vipData.accountLevel === userState.vipData.activityLevelList.length - 1) {
      filterVal = userState.vipData.activityLevelList[userState.vipData.activityLevelList.length - 1];
    } else {
      // 非最高级
      [filterVal] = userState.vipData.activityLevelList.filter(item => {
        if (item.accountLevel === userState.vipData.accountLevel + 1) {
          return item;
        }
        return null;
      });
    }
    return filterVal.validbetMin;
  }
  return 0;
});

//- 刷新用户余额
const updateBalance = () => userState._getCenterMoney();

const depositMinValue = computed(() => {
  if (Object.keys(userState.vipData).length) {
    if (
      userState.vipData.accountLevel === 10 ||
      userState.vipData.depositAmount >
        userState.vipData.activityLevelList[userState.vipData.accountLevel + 1].depositMin
    ) {
      return 100;
    } else {
      return (
        (userState.vipData.depositAmount /
          userState.vipData.activityLevelList[userState.vipData.accountLevel + 1].depositMin) *
        100
      );
    }
  }
  return 100;
});

const sideBarLevel2Bg = `url(${useImgPath('profile/sidebar_level2_bg.png')})`;
</script>

<style scoped lang="scss">
.aside {
  width: 200px;
  margin-right: 20px;
  min-height: 860px;
  flex-shrink: 0;
  background: var(--u_h_5);
  border-radius: 10px;
  font-size: 14px;
  overflow: hidden;
  box-shadow: var(--u_h_20);
}
.profile-top {
  padding: 22px 20px 15px 10px;
  background: var(--u_h_6);
  color: var(--u_h_18);
  .user-container {
    @include flex(flex-start);
    .avatar {
      position: relative;
      margin-right: 7px;
      .user-avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 2px solid var(--u_h_7);
      }
      .level-badge {
        position: absolute;
        width: 50px;
        height: 14px;
        font-weight: 500;
        font-size: 11px;
        @include flex(center);
        color: var(--u_h_10);
        font-weight: 500;
        background: var(--u_h_8);
        box-shadow: var(--u_h_9);
        border-radius: 4px;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        &.hide {
          display: none;
        }
      }
    }

    .user_info {
      @include flex(flex-start, column, wrap, flex-start);
      .invitation_code {
        font-size: 12px;
        transform: scale(0.9);
        color: var(--u_h_7);
        opacity: 0.8;
        margin-left: -5px;
      }
    }
  }

  .profile_level_container {
    @include flex(flex-start, column, wrap, flex-start);
    margin-top: 10px;
    &:deep(.el-progress) {
      .el-progress-bar__outer {
        width: 148px;
        background: var(--u_h_11);
      }
      .el-progress-bar__inner {
        background: var(--u_h_12);
      }
      .el-progress__text {
        color: var(--u_h_13);
        font-weight: 500;
        font-size: 12px;
      }
    }
    .progress_txt {
      font-size: 12px;
      transform: scale(0.8);
      color: var(--u_h_13);
      margin-left: -20px;
      width: 210px;
    }
    &.hide {
      display: none;
    }
  }
}

.sidebar_wallet_container {
  width: 200px;
  height: 115px;
  background-image: v-bind(sideBarLevel2Bg);
  background-size: 100% 100%;
  padding: 10px;
  .current_wallet_container {
    margin-bottom: 10px;
    .top {
      @include flex(flex-start);
      font-size: 12px;
      color: var(--u_h_14);
      font-weight: 500;
    }
    .self_money {
      font-size: 24px;
      font-weight: 500;
      color: var(--u_h_14);
    }
  }

  .link-item {
    @include flex(center);
    &:not(.zh, .zh_tw) {
      justify-content: flex-start;
    }

    img {
      width: 30px;
      height: 26px;
    }
    .txt-wrap {
      font-size: 14px;
      color: var(--u_h_15);
      margin-left: 5px;
      &:not(.zh, .zh_tw) {
        font-size: 12px;
      }
      &.ms {
        margin-left: 1px;
      }
      &.color_004 {
      }
    }
  }
}

.profile-nav {
  @include flex(flex-start, row, wrap);
  margin-bottom: 16px;
  padding-top: 20px;

  .profile-nav-item {
    width: 50%;
    margin-bottom: 40px;
    align-self: flex-start;
    &.mb-0,
    &:last-child {
      margin-bottom: 0;
    }
    &.hide {
      display: none;
    }
    .menu-item {
      @include flex(flex-start, column);
      cursor: pointer;
      transition: all 0.3s;

      &.router-link-active {
        border-radius: 6px;

        .txt-wrap {
          color: var(--u_h_16);
          font-weight: 600;
        }
      }
    }

    .txt-wrap {
      font-size: 14px;
      color: var(--u_h_15);
      text-align: center;
      &:not(.zh, .zh_tw) {
        font-size: 12px;
      }

      &.active {
        color: var(--u_h_16);
        font-weight: 600;
      }
    }

    .icon-img {
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
    }
  }
}
//- 002号模板差异
.aside {
  &.template_2_002 {
    .progress_txt {
      opacity: 0.8;
    }
    .sidebar_wallet_container {
      background-image: none;
      background: var(--u_h_11);
      border-radius: 0px 0px 10px 10px;
    }
    .menu-item {
      .txt-wrap {
        color: var(--u_h_17);
        &.active {
          color: var(--u_h_16);
        }
      }
    }
    &.router-link-active {
      .txt-wrap {
        color: var(--u_h_16);
      }
    }
    .username {
      color: #fff;
    }
  }
}

//- 003号模板差异
.aside {
  &.template_2_003 {
    .user-avatar {
      border: 2px solid var(--u_h_17) !important;
    }
    .sidebar_wallet_container {
      background-color: var(--u_h_17);
      border-radius: 0px 0px 10px 10px;
    }
    .self_money {
      font-weight: 900;
    }
  }
}
</style>
