<template>
  <div :class="['side-bar-container', site, globalState.language, $route.path.includes('micro_page') && 'micro_page']">
    <div
      class="side-bar-item"
      v-for="(item, index) in renderList"
      :key="index"
      @click="clickEvent(item.value)"
      @mouseenter="currentMouseTarget = item.value"
      @mouseleave="currentMouseTarget = ''">
      <template v-if="item.value !== 'backtop'">
        <img
          @click="openSubMenu(item)"
          class="mini-sb-icon"
          :src="
            useImgPath(`home/other/sidebar_${item.value === currentMouseTarget ? item.value + '_on' : item.value}.png`)
          " />
        <span class="text">{{ item.text }}</span>
      </template>

      <el-backtop v-else ref="backTop" :visibility-height="0">
        <img :src="useImgPath(`home/other/sidebar_${item.value}.png`)" class="mini-sb-icon" />
        <span class="text">{{ item.text }}</span>
      </el-backtop>

      <div v-if="item.value === 'download' && showDownLoad" :class="['mini-sb-box-qr', globalState.language]">
        <QrCode
          :codeSize="96"
          :class="['side-bar-code', globalState.language]"
          slot="ios-qrCode"
          topTitle=""
          :hideBottom="true">
          <span>{{ $t_c('IOS扫码下载APP') }}</span>
        </QrCode>
        <div :class="['line', globalState.language]"></div>
        <QrCode
          :codeSize="96"
          :class="['side-bar-code', globalState.language]"
          slot="android-qrCode"
          topTitle=""
          :hideBottom="true">
          <span>{{ $t_c('安卓扫码下载APP') }}</span>
        </QrCode>
      </div>
    </div>
    <div v-if="showForum" class="side_bar_forum_container">
      <span class="forum-item" @click="goForum">{{ $t_c('社区') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useGlobalState } from '@/stores';
import QrCode from 'commonComponent/QrCode/qr.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const site = useSite();
const { messageTip } = useDialog();
const router = useRouter();
const globalState = useGlobalState();
const currentMouseTarget = ref<string>('');
const renderList = reactive([
  {
    value: 'help',
    text: lang('帮助中心'),
  },
  {
    value: 'service',
    text: lang('在线客服'),
  },
  {
    value: 'download',
    text: lang('扫码下载'),
  },
  {
    value: 'backtop',
    text: lang('返回顶部'),
  },
]);

const showDownLoad = ref<boolean>(false);
const showForum = ref<boolean>(false);

onMounted(() => {
  globalState._stationSettingWithCache();
  _initIsShowForum();
});

const _initIsShowForum = async () => {
  const res = await api.home.getAppSpecifyList();
  if (res.code) return;
  res.data.forEach(item => {
    if (item.key === 'postEnabled' && +item.value === 1) {
      renderList.splice(3, 0, { value: 'forum', text: lang('资讯社区') });
    }
  });
  window.scrollTo(0, 1);
};

const clickEvent = (val: string) => {
  if (val === 'forum' || val === 'download') return;
  showForum.value && (showForum.value = false);
  showDownLoad.value && (showDownLoad.value = false);
  switch (val) {
    case 'help':
      router.push('/help_center');
      break;
    case 'service':
      if (!Object.keys(globalState.stationSetting).length) {
        messageTip({
          message: lang('正在获取客服链接, 请刷新页面后重试'),
        });
      } else {
        window.open(globalState.stationSetting.configCodePc, '_blank');
      }
      break;
  }
};

//   //- 打开二级侧边栏
const openSubMenu = (item: { value: string }) => {
  if (item.value === 'download') {
    showForum.value && (showForum.value = false);
    showDownLoad.value = !showDownLoad.value;
  } else if (item.value === 'forum') {
    showDownLoad.value && (showDownLoad.value = false);
    showForum.value = !showForum.value;
  }
};
//- 跳转社区
const goForum = () => {
  showForum.value = false;
  router.push('/forum');
};
const mainBG = `url(${useImgPath('home/other/sidebar_side_bg.png')})`;
const smCodeBg = `url(${useImgPath('home/other/sidebar_sm_code_bg.png')})`;
const forumBg = `url(${useImgPath('home/other/sidebar_forum_bg.png')})`;
</script>

<style lang="scss">
.side-bar-container {
  position: fixed;
  right: 0;
  z-index: 100;
  top: 30%;
  width: 71px;
  background-image: v-bind(mainBG);
  border-radius: 8px;
  background-size: 100% 100%;
  padding: 40px 0 30px 10px;
  box-sizing: border-box;
  @include flex(center, column);
  &.micro_page {
    // z-index: 10001;
    display: none;
  }
  &.ms,
  &.vi {
    width: 91px;
    .text {
      text-align: center;
    }
  }
  .side-bar-item {
    @include flex(center, column);
    margin-bottom: 10px;
    cursor: pointer;

    .text {
      font-size: 12px;
      color: var(--m_2);
      transform: scale(0.9);
    }

    .mini-sb-icon {
      width: 36px;
      height: 36px;
      margin-bottom: 5px;
    }

    .el-backtop {
      display: contents;
    }

    &:hover {
      .mini-sb-box-qr {
        display: flex;
      }
    }
  }

  .mini-sb-box-qr {
    position: absolute;
    background-image: v-bind(smCodeBg);
    background-size: 100% 100%;
    text-align: center;
    width: 165px;
    padding: 20px 0 60px;
    box-sizing: border-box;
    right: 62px;
    cursor: pointer;
    @include flex(space-between, column);

    &.ms {
      right: 80px;
      width: 180px;
      .side-bar-code {
        width: 120px;
        height: 120px;
        &:last-child {
          margin-top: 60px;
        }
      }
      .line {
        top: 185px;
      }
    }
    &.vi {
      right: 80px;
      width: 180px;
      .side-bar-code {
        width: 120px;
        height: 100px;
        &:last-child {
          margin-top: 60px;
        }
      }
      .line {
        top: 165px;
      }
    }

    .side-bar-code {
      left: -5px;
      font-size: 12px;
      width: 100px;
      height: 100px;
      &.en {
        height: 130px;
      }

      &:last-child {
        margin-top: 40px;
      }

      .code-top_text {
        margin: 0px !important;
      }

      .code-main {
        .login-code {
          height: auto;
          margin: 0px;
        }

        img {
          width: 100px;
          height: 100px;
        }
      }

      .bottom_un_login {
        margin-top: 10px;
      }

      .code_bottom_txt {
        position: relative;
        top: 5px;
        color: var(--m_3);
      }
    }

    .line {
      width: 80%;
      height: 1px;
      background: var(--m_4);
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      top: 150px;
      &.en {
        top: 175px;
      }
    }
  }

  .side_bar_forum_container {
    background-image: v-bind(forumBg);
    position: absolute;
    width: 120px;
    color: var(--m_5);
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    left: -120px;
    padding: 10px 0 20px;
    bottom: 120px;
    @include flex(center);

    .forum-item {
      cursor: pointer;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
