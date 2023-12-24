<template>
  <div class="home_page">
    <Banner></Banner>
    <NoticeSlider></NoticeSlider>
    <SportBanner></SportBanner>
    <GameTab></GameTab>
    <HotGame></HotGame>
    <BetTable v-if="false"></BetTable>
    <ServicerDesc></ServicerDesc>
    <!-- ! 好友推荐浮动 -->
    <div
      v-if="userState.token && isShowFloatFriend && interfaceShowFriend"
      ref="friendFloatRef"
      :style="style"
      :class="['friend_float', globalState.language]"
      @click="goRecommend">
      <img
        class="home_close_img"
        :src="useImgPath('home/other/float_close_icon.png')"
        @click.stop="isShowFloatFriend = false" />
      <img class="home_main_icon" :src="useImgPath('home/other/float_friend_1.png')" alt="" />
      <div :class="['btn', globalState.language]">
        <span>{{ $t_c('好友推荐') }}</span>
      </div>
    </div>
    <!-- ! 红包活动 -->
    <RedEnvelopes v-if="userState.token" />
    <FirstEnterDialog></FirstEnterDialog>
  </div>
</template>

<script setup lang="ts">
import Banner from './component/Banner.vue';
import NoticeSlider from './component/NoticeSlider.vue';
import SportBanner from './component/SportBanner.vue';
import GameTab from './component/GameTab.vue';
import HotGame from './component/HotGame.vue';
import BetTable from './component/BetTable.vue';
import ServicerDesc from './component/ServicerDesc.vue';
import RedEnvelopes from './component/RedEnvelopes.vue';
import FirstEnterDialog from './component/FirstEnterDialog.vue';
import { onMounted, ref, type Ref } from 'vue';
import { api } from '@/api';
// import { useGlobalState, useHomeState, useUserState } from '@/stores';
import { useDraggable } from '@vueuse/core';
import { useImgPath } from '@/hook/usePath';
import { useRouter } from 'vue-router';

const router = useRouter();
const isGoNewPath = ref<boolean>(false);
const globalState = useGlobalState();
const homeState = useHomeState();
const userState = useUserState();
const friendFloatRef = ref(null) as Ref<HTMLElement | SVGElement | null | undefined>;
const isShowFloatFriend = ref<boolean>(true);
const interfaceShowFriend = ref(false);

const { style } = useDraggable(friendFloatRef, {
  initialValue: { x: window.innerWidth - 215, y: 280 },
  onMove: data => {
    switch (true) {
      case data.x < 0 && data.y < 0:
        data.x = 0;
        data.y = 10;
        break;
      case data.x > window.innerWidth - 120 && data.y < 0:
        data.x = window.innerWidth - 120;
        data.y = 10;
        break;
      case data.x < 0 && data.y > window.innerHeight - 80:
        data.x = 0;
        data.y = window.innerHeight - 80;
        break;
      case data.x > window.innerWidth - 120 && data.y > window.innerHeight - 80:
        data.x = window.innerWidth - 120;
        data.y = window.innerHeight - 80;
        break;
      case data.x < 0:
        data.x = 0;
        break;
      case data.x > window.innerWidth - 120:
        data.x = window.innerWidth - 120;
        break;
      case data.y < 10:
        data.y = 10;
        break;
      case data.y > window.innerHeight - 80:
        data.y = window.innerHeight - 80;
    }
    isGoNewPath.value = true;
  },
});

onMounted(() => {
  getFriend();
  _getData();
});
const _getData = async () => {
  const res = await api.home.getIndexadvListData({ terminal: 0, pageNo: 1, pageSize: 100, advType: 1, evebNum: 1 });
  if (res.code) return;
  //       (  showType value = "0：公告(跑马灯),1：广播(弹窗) 2全部")
  homeState.set_notice_list(res.noticeList.list);
  homeState.set_popup_list(res.popUpList);
  homeState.set_banner_list(res.page);
};

const goRecommend = () => {
  if (isGoNewPath.value) return (isGoNewPath.value = false);
  router.push('/profile/recommended');
};

const getFriend = async () => {
  const res = await api.friendsRecommend.getFriendRebateInfo();
  if (res.code) return;
  interfaceShowFriend.value = res.msg.isShowFriendRebate;
};

const floatBg = `url(${useImgPath('home/other/float_friend_2.png')})`;
</script>

<style lang="scss" scoped>
.home_page {
  width: 1280px;
  margin: 0 auto;
}
.friend_float {
  position: fixed;
  cursor: pointer;
  z-index: 9999;
  img {
    -webkit-user-drag: none;
  }
  .home_main_icon {
    width: 100px;
  }
  .home_close_img {
    width: 14px;
    height: 14px;
    position: absolute;
    right: -10px;
    top: -10px;
  }
  .btn {
    width: 80px;
    position: absolute;
    bottom: 0px;
    background-image: v-bind(floatBg);
    background-size: 100% 100%;
    @include flex(center);
    color: var(--home_1);
    font-weight: 600;
    font-size: 12px;
    left: 50%;
    transform: translateX(-50%);
    &.en {
      width: 70px;
      left: 50%;
      transform: translateX(-50%);
    }
    &.ms,
    &.vi {
      height: auto;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: 100px;
      span {
        white-space: normal;
      }
    }
    &.en {
      width: 100px;
    }
    &.ms {
      bottom: -10px;
      line-height: 1;
    }
    span {
      white-space: nowrap;
      transform: scale(0.8);
    }
  }
}
</style>
