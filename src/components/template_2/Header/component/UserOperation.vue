<template>
  <div :class="['user-operation-container', site]">
    <!-- 未登录状态 -->
    <template v-if="!userState.token">
      <div class="unlogin-container">
        <img :class="['un-login-icon']" :src="useImgPath('user/header_un_login.png')" v-if="theme !== '004'" />
        <div :class="['link-container login', globalState.language]" @click="goUserLogin('/login')">
          <img
            class="un_login_icon"
            :src="useImgPath('user/header_un_register_icon.png')"
            v-if="theme === '004'"
            alt="" />
          {{ $t_c('登录') }}
        </div>
        <span class="skew-line" v-if="theme !== '004'">/</span>
        <div :class="['link-container register', globalState.language]" @click="goUserLogin('/login/register')">
          <img class="un_login_icon" :src="useImgPath('user/header_un_login_icon.png')" v-if="theme === '004'" />
          {{ $t_c('注册') }}
        </div>
      </div>
    </template>

    <!-- 登录状态 -->
    <template v-else>
      <div class="login-container" @mouseleave="isShowUserDropMeun = false">
        <!-- <div class="login-container"> -->
        <div v-if="theme === '003' || theme === '004'" :class="['spacer_003', theme === '004' && 'spacer_004']"></div>
        <div class="user-profile-desc" @click="$router.push('/profile/baseInfo')">
          <div
            :class="`img-box ${userState.mailBoxMsg || userState.unMessageCount ? 'show-dotted' : ''}`"
            @mouseenter="isShowUserDropMeun = true">
            <img class="userInfo-icon" :src="useImgPath('user/header_avatar.png')" alt="" />
          </div>

          <div class="user-detail" @mouseenter="isShowUserDropMeun = true">
            <div class="user_detail_top">
              <span class="user-name">{{ userState.userInfo.loginName || '' }}</span>
              <div :class="['vip_lvl', !envState.vite_show_vip_info && !envState.vite_avatar_show_vip && 'hide']">
                <img :src="useImgPath('user/header_vip_icon.png')" alt="" />
                <span>
                  {{ userState.userInfo.levelName?.replace(/[^\d.]/g, '') || '0' }}
                </span>
              </div>
            </div>
            <div class="userInfo-balance">
              {{ (userState!.centerBalanceMoney > 0 && userState!.centerBalanceMoney!.toFixed(2)) || '0.00' }}
              {{ envState.vite_currency_map.en_label }}
              <img
                @click.stop="updateBalance"
                v-if="!userState.isRefresh"
                :src="useImgPath('base/header_refresh.png')"
                alt=""
                style="width: 13px; margin-left: 5px" />
              <el-icon v-else>
                <Loading></Loading>
              </el-icon>
            </div>
          </div>
          <div class="user_bell_container" @click.stop="$router.push('/profile/messageCenter')">
            <div class="bell_show_section">
              <img :src="useImgPath('user/header_bell.png')" class="bell_img" alt="" />
              <span class="number_symbol" v-if="userState.unMessageCount">
                <span>{{ userState.unMessageCount }}</span>
              </span>
            </div>
            <div class="bell_masker_section" v-if="isBreathe">
              <div
                class="bell_content_item"
                v-for="(item, index) in messageList"
                :key="index"
                v-html="item.textContent"></div>
            </div>
          </div>
        </div>

        <div :class="['user-drop-menu', isShowUserDropMeun && 'on', theme, globalState.language]">
          <div :class="['user-drop-menu_head', globalState.language]">
            <div
              @click="$router.push(item.path)"
              :class="['deposit-cls', globalState.language]"
              v-for="(item, index) in selectList"
              :key="index"
              @mouseenter="currentSelectIndex = index"
              @mouseleave="currentSelectIndex = -1">
              <img
                class="deposit-cls_icon"
                :src="useImgPath(`user/${currentSelectIndex === index ? item.on_icon : item.icon}`)" />
              <span :class="`${currentSelectIndex === index ? 'font-active' : ''}`">{{ item.val }}</span>
            </div>
          </div>
          <div class="user-drop-menu_content">
            <div
              @click="$router.push(item.path)"
              :class="['information-item', currentContentIndex === index && 'active', globalState.language]"
              v-for="(item, index) in infoList"
              :key="index"
              @mouseenter="currentContentIndex = index"
              @mouseleave="currentContentIndex = -1">
              <img
                class="information-item_img"
                :src="useImgPath(`user/${currentContentIndex !== index ? item.icon : item.on_icon}.png`)"
                alt=""
                @mouseleave="currentContentIndex = -1" />
              <span>{{ item.val }}</span>
              <div v-if="item.type == 'message' && userState.unMessageCount" class="message-count">
                <span class="message-count_font"> {{ userState.unMessageCount }}</span>
              </div>
            </div>
          </div>
          <button @click="_signout" class="user-drop-menu_footer">
            {{ $t_c('退出登录') }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api';
import { useImgPath, useSite } from '@/hook/usePath';
// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import { selectList, informationList } from 'static_data/header_data';
import { useRoute, useRouter } from 'vue-router';
import { lang } from '@/i18n';

const userState = useUserState();
const globalState = useGlobalState();
const router = useRouter();
const route = useRoute();
const theme = sessionStorage.getItem('VITE_THEME') || import.meta.env.VITE_THEME;
let currentSelectIndex = ref<number>(-1);
let currentContentIndex = ref<number>(-1);
const messageList = reactive<MsAPI.messageInfoList[]>([]);
const isBreathe = ref<boolean>(false);
let isShowUserDropMeun = ref<boolean>(false); //todo
// let isShowUserDropMeun = ref<boolean>(true); //todo
const envState = useEnvState();
const site = useSite();
const noticeTimer = ref();

const infoList = computed(() => {
  return informationList.filter((_, i) => {
    const envState = useEnvState();
    if (i === 1 && !envState.vite_show_vip_info) return false;
    return true;
  });
});

const _getMessageUnreadCount = async () => {
  const res = await api.user.getMessageUnread({ msgType: 0 });
  if (res.code) return;
  userState.set_un_read_message_count(res.count);
  const r = await api.messageCenter.getMessageInfoList({ msgType: 0, pageNo: 1, pageSize: 3, isRead: 1, mbrIsRead: 1 });
  const noticeArr = r.data?.list ?? [];
  const _ = noticeArr.filter(item => item.isRead === 0);
  if (!_.length) return;
  _.forEach(message => {
    if (message && message.textContent) {
      const regExp = /<img.*?\/>/g;
      let result = message.textContent.replace(regExp, '');
      if (result === '<p></p>') {
        result = lang('您有新消息！');
      }
      message.textContent = result;
    }
  });
  messageList.length = 0;
  messageList.push(..._);
  isBreathe.value = true;
  setTimeout(() => (isBreathe.value = false), 10000);
};

const goUserLogin = (url: string) => {
  isShowUserDropMeun.value = false;
  router.push(url);
};

watch(
  () => userState.token,
  token => {
    if (token) {
      userState._getCenterMoney();
      _getMessageUnreadCount();
      noticeTimer.value = setInterval(_getMessageUnreadCount, 40000);
    } else {
      clearInterval(noticeTimer.value);
    }
  },
  { immediate: true }
);

onUnmounted(() => clearInterval(noticeTimer.value));

const updateBalance = () => userState._getCenterMoney();

const _signout = async () => {
  try {
    const res = await api.user.getLoginOut({
      token: userState.token,
      SToken: envState.vite_defaultstoken,
    });
    if (res.code) return;
    userState.clear_user_info();
    route.name !== 'Home' && router.replace('/home');
  } catch (e) {
    console.log();
  }
};
</script>

<style scoped lang="scss">
.user-operation-container {
  height: 100%;
  @include flex(center);
  .unlogin-container {
    @include flex();
    .un-login-icon {
      width: 40px;
      height: 40px;
      margin-right: 4px;
    }
    .link-container,
    .skew-line {
      font-size: 14px;
      cursor: pointer;
      font-weight: 500;
      color: var(--h_u_1);
    }
    .skew-line {
      margin: 0 5px;
    }
  }
  .login-container {
    height: 100%;
    @include flex(center);
    width: auto;
    padding-left: 10px;
    font-size: 18px;
    cursor: pointer;
    position: relative;
    .spacer_003 {
      position: absolute;
      width: 100%;
      height: 10px;
      background-color: transparent;
      bottom: 0px;
      right: 20px;
      z-index: 9999;
      &.spacer_004 {
        bottom: -15px;
        height: 15px;
      }
    }
    .user-profile-desc {
      display: flex;
      position: relative;
      .img-box {
        position: relative;
        .userInfo-icon {
          width: 46px;
          border-radius: 4px 4px 0 0;
        }
        &.show-dotted {
          &:after {
            content: '';
            width: 10px;
            height: 10px;
            background-color: var(--h_u_2);
            position: absolute;
            top: 0px;
            right: 4px;
            border-radius: 50%;
          }
        }
      }
      .user-detail {
        font-size: 14px;
        display: flex;
        @include flex(center, column, nowrap, flex-start);
        padding-left: 5px;

        .user_detail_top {
          @include flex();
          .user-name {
            margin-right: 5px;
            color: var(--h_u_3);
            font-weight: bold;
          }
          .vip_lvl {
            width: 35px;
            height: 16px;
            background: var(--h_u_4);
            border-radius: 7px;
            font-size: 12px;
            font-weight: 500;
            color: var(--h_u_5);
            @include flex(center);
            img {
              width: 15px;
              margin-right: 2px;
            }
            &.hide {
              display: none;
            }
          }
        }
        .userInfo-balance {
          @include flex();
          font-size: 14px;
          color: var(--h_u_3);
          font-family: impact;
          .el-icon {
            margin-left: 5px;
            color: var(--h_u_3);
            font-weight: bold;
            font-size: 14px;
          }
        }
      }
      .user_bell_container {
        position: absolute;
        right: -30px;
        bottom: 5px;
        .bell_show_section {
          .bell_img {
            width: 24px;
          }
          .number_symbol {
            width: 12px;
            height: 12px;
            position: absolute;
            @include flex(center);
            border-radius: 50%;
            background-color: var(--h_u_22);
            color: var(--h_u_23);
            font-size: 12px;
            right: -5px;
            top: -5px;
            span {
              transform: scale(0.75);
              line-height: 15px;
            }
          }
        }
        .bell_masker_section {
          position: absolute;
          width: 172px;
          top: 50px;
          background: var(--h_u_26);
          border-radius: 16px;
          border: 1px solid var(--h_u_7);
          left: 50%;
          transform: translateX(-50%);
          z-index: 10000;

          &:before,
          &:after {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            top: -14px;
            left: 72px;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            border-bottom: 14px solid var(--h_u_7);
          }
          &:after {
            border-bottom: 14px solid var(--h_u_6);
            top: -13px;
          }
          .bell_content_item {
            padding: 15px 8px;
            border-bottom: 1px solid var(--h_u_24);
            font-size: 12px;
            font-weight: 500;
            color: var(--h_u_25);
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }

    //- 用户下拉菜单
    .user-drop-menu {
      position: absolute;
      opacity: 0;
      top: 100px;
      width: 172px;
      text-align: center;
      height: auto;
      background: var(--h_u_6);
      border-radius: 16px;
      border: 1px solid var(--h_u_7);
      display: none;
      z-index: -1;
      transform: translateX(-50px);
      &:before,
      &:after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: -14px;
        left: 72px;
        border-left: 14px solid transparent;
        border-right: 14px solid transparent;
        border-bottom: 14px solid var(--h_u_7);
      }
      &:after {
        border-bottom: 14px solid var(--h_u_6);
        top: -13px;
      }
      &.on {
        opacity: 1;
        z-index: 10000;
        display: block;
      }
      &.ms {
        width: 214px;
        transform: translateX(-30px);
      }
      &.vi {
        width: 193px;
        transform: translateX(-25px);
      }
      .user-drop-menu_head {
        height: 83px;
        font-size: 14px;
        padding: 0 13px;
        @include flex();
        &:not(.zh, .zh_tw) {
          padding: 0 6px;
        }
        .deposit-cls {
          color: var(--h_u_8);
          font-weight: 500;
          font-size: 12px;
          @include flex(center, column, nowrap);
          .deposit-cls_icon {
            width: 30px;
            margin-bottom: 8px;
          }
          .font-active {
            color: var(--h_u_14);
          }
          &.ms {
            margin-right: 5px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
      .user-drop-menu_content {
        &:before,
        &:after {
          content: '';
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--h_u_9);
        }
        @include flex(center, column);
        font-size: 14px;
        .information-item {
          height: 35px;
          width: 100%;
          margin: 10px 0 0;
          padding: 0 34px;
          box-sizing: border-box;
          position: relative;
          @include flex(space-between, row, center);
          font-weight: 500;
          font-size: 14px;
          color: var(--h_u_8);
          &:not(.zh, .zh_tw) {
            padding: 0 5px 0 18px;
            & > span {
              font-size: 12px;
              flex-grow: 1;
              text-align: left;
              margin-left: 10px;
            }
            .information-item_img {
              margin-right: 0;
            }
          }
          &:last-child {
            margin-bottom: 10px;
          }
          .information-item_img {
            width: 18px;
            margin-right: 11px;
          }
          .message-count {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: var(--h_u_11);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 15px;
            @include flex(center);

            .message-count_font {
              font-size: 12px;
              transform: scale(0.75);
              line-height: 15px;
              color: var(--h_u_12);
            }
          }
        }
      }
      .user-drop-menu_footer {
        width: 107px;
        height: 26px;
        margin: 10px auto;
        border: 0;
        background-color: transparent;
        font-weight: 600;
        font-size: 16px;
        color: var(--h_u_13);
        cursor: pointer;

        &:hover {
          color: var(--h_u_11);
        }
      }
    }
  }
}
</style>
