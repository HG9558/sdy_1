<template>
  <div :class="['partner-wrapper', site]">
    <div class="partner-banner">
      <div class="partner-main">
        <img class="partner-banner_left" :src="venturePlanPic" alt="" />
        <div class="partner-banner_right">
          <div class="hy-title">
            <div class="top">
              <img :src="useImgPath('partner/title_arrow_left.png')" />
              <span :class="['pos_txt', globalState.language]">{{ appTitle }} {{ $t_c('合营计划') }}</span>
              <img :src="useImgPath('partner/title_arrow_right.png')" />
            </div>
            <img class="hy-title-img" :src="useImgPath('partner/title_en.png')" />
            <span class="hy_title_slogan">{{ $t_c('是成为传奇？') }}{{ $t_c('还是成为传奇的歌颂者？') }}</span>
          </div>
          <div class="contact-box">
            <div :key="index" class="contact-item" v-for="(item, index) in renderCopyList">
              <span class="contact-item-bg">
                <div class="circle-bg">
                  <img class="hy-logo" :src="item.url" alt="logo" />
                </div>
                <span class="item-text">{{ item.title }}</span>
              </span>
              <div class="copy-btn" v-for="(childItem, index) in item.text" :key="childItem + ` ${index}`">
                <span class="copy-btn-text">{{ childItem }}</span>
                <span class="copy-click" @click="copy(childItem)">{{ $t_c('复制') }}</span>
              </div>
            </div>
          </div>
          <div @click="goAgt" :class="['partner_agent_btn', globalState.language]">
            <img :src="useImgPath('partner/join.png')" />
            <span class="btn_txt">{{ $t_c('加入我们') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="parent-bg-container">
      <div class="partner-content">
        <div class="partner-content_title">
          <div class="partner-content_title_left">
            <span> {{ appTitle }} {{ $t_c('重新定义了行业') }}</span>
            <!-- <span class="right-desc">App Download</span> -->
          </div>
        </div>
        <div class="partner-bg">
          <div class="partner-first-list">
            <div class="partner-first-item" v-for="(item, index) in memberList" :key="index">
              <img class="partner-first-line-two" :src="useImgPath(`partner/first-${index + 1}.png`)" alt="" />
              <div class="partner-first-line-three">{{ item.name }}</div>
              <div class="partner-first-line-four">{{ item.title }}</div>
            </div>
          </div>
          <div class="partner-line"></div>
          <div class="partner-bottom-content">
            <img class="partner-img" :src="defineIndustryPic" alt="" />
            <div class="partner-right-box">
              <div class="partner-right-box_title_1">{{ appTitle }} {{ $t_c('给力的手机APP') }}</div>
              <div class="partner-right-box_title_2">
                {{ $t_c('PC端，H5还有独家开发的移动端 全面支持IOS及安卓系统下全部移动设备') }}
              </div>
              <div class="partner-right-box_title_3">{{ $t_c('业内最强的APP产品') }}</div>
              <div class="two-box">
                <div class="two-item" v-for="(item, index) in advantageList" :key="index">
                  <img :class="`icon-${index}`" :src="useImgPath(`partner/two-${index + 1}.png`)" alt="" />
                  <div class="item-name item-one">{{ item.name }}</div>
                  <div class="item-title">{{ item.title }}</div>
                  <div class="item-title2">{{ item.title2 }}</div>
                </div>
              </div>
              <div class="partner-right-box_title_3">{{ $t_c('权威认证机构') }}</div>
              <div class="two-box">
                <div class="two-item" v-for="(item, index) in organizationList" :key="index">
                  <img :src="useImgPath(`partner/logo_${index + 1}.png`)" alt="" />
                  <div class="item-name">{{ item }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    :append-to-body="true"
    :show-close="false"
    v-model="copied"
    center
    top="400px"
    width="182px"
    :lock-scroll="false"
    class="partner">
    <div class="copy-container">
      <span class="copy_text">{{ $t_c('复制成功') }}</span>
      <img class="dialog-result" :src="useImgPath('partner/copy_sucess.png')" width="182px" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { useImgPath, useSite } from '@/hook/usePath';
// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useClipboard } from '@vueuse/core';
import { lang } from '@/i18n';
import { useCurrentTitle } from '@/hook/useTitle';

const { copy, copied } = useClipboard();
const site = useSite();
const userState = useUserState();
const router = useRouter();
const globalState = useGlobalState();
const appTitle = useCurrentTitle();
const memberList = [
  {
    name: lang('会员统计'),
    title: lang('注册会员有效会员随时查看'),
  },
  {
    name: lang('会员游戏明细'),
    title: lang('会员参与游戏盈亏详情'),
  },
  {
    name: lang('会员报表'),
    title: lang('各种会员信息一目了然'),
  },
  {
    name: lang('平台费用明细'),
    title: lang('平台流水，费用率，输赢状况及总平台费用'),
  },
];
const advantageList = [
  {
    name: lang('更安全'),
    title: lang('独家网络技术'),
    title2: lang('超强防劫持'),
  },
  {
    name: lang('更稳定'),
    title: lang('强大的技术团队'),
    title2: lang('提供更稳定的产品'),
  },
  {
    name: lang('更丰富'),
    title: lang('丰富的游戏产品'),
    title2: lang('你想要的我们都有'),
  },
  {
    name: lang('更私密'),
    title: lang('三重数据加密'),
    title2: lang('保护您的资料安全'),
  },
];
const organizationList = [
  lang('英属维尔京群岛(BVI)认证'),
  lang('英国GC监督委员会'),
  lang('马耳他博彩管理局（MGA）认证'),
  lang('菲律宾（PAGCOR）政府博彩委员会'),
];

onMounted(() => _initData());

const defineIndustryPic = ref<string>('');
const venturePlanPic = ref<string>('');
const _initData = async () => {
  const picResponse = await api.partner.getVenturePlanPic();
  if (picResponse.code) return;
  venturePlanPic.value = picResponse.data.venturePlanPic;
  defineIndustryPic.value = picResponse.data.defineIndustryPic;
};

const envState = useEnvState();
const goAgt = () => {
  if (userState.token) {
    const domain: string = envState.vite_agt_url;
    if (domain) {
      window.open(`${domain}/#/login?username=${userState.userInfo.loginName}`);
    }
  } else {
    router.push({ path: '/login' });
  }
};

const copyList = computed(() => {
  const tempList = [
    { name: 'configSkype', url: '', text: [] as string[], title: '' },
    { name: 'configTelegram', url: '', text: [] as string[], title: '' },
    { name: 'configFlygram', url: '', text: [] as string[], title: '' },
  ];
  return tempList.filter(item => globalState.stationSetting[item.name]);
});

const filterNull = (arr: string[]) => {
  return arr.filter(val => val && val.trim());
};

const renderCopyList = computed(() => {
  return copyList.value.map(item => {
    if (globalState.stationSetting) {
      switch (item.name) {
        case 'configSkype':
          item.text = filterNull(globalState.stationSetting.configSkype.split(','));
          item.url = globalState.stationSetting.pcIconSkype;
          item.title = globalState.stationSetting.titleSkype;
          break;
        case 'configTelegram':
          item.text = filterNull(globalState.stationSetting.configTelegram.split(','));
          item.url = globalState.stationSetting.pcIconTelegram;
          item.title = globalState.stationSetting.titleTelegram;
          break;
        case 'configFlygram':
          item.text = filterNull(globalState.stationSetting.configFlygram.split(','));
          item.url = globalState.stationSetting.pcIconFlygram;
          item.title = globalState.stationSetting.titleFlygram;
          break;
      }
    }
    return item;
  });
});
const contactItemBg = `url(${useImgPath('partner/item_icon.png')})`;
</script>

<style lang="scss" scoped>
.partner-wrapper {
  .partner-banner {
    .partner-main {
      max-width: 1200px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      padding: 30px 0;
      @include flex();
      .partner-banner_left {
        width: 580px;
        height: 473px;
      }
      .partner-banner_right {
        .hy-title {
          position: relative;
          @include flex(flex-start, column);
          .top {
            @include flex();
            img {
              width: 150px;
            }
            span {
              color: var(--p_13);
              font-weight: 600;
              font-size: 30px;
              margin: 0 10px;
              flex-shrink: 0;
            }
          }
          .hy-title-img {
            width: 404px;
            margin: 10px 0 17px;
          }
          .hy_title_slogan {
            font-size: 22px;
            color: var(--p_14);
            font-weight: 500;
            white-space: nowrap;
          }
        }
      }
      .contact-box {
        display: flex;
        margin-top: 45px;
        font-size: 12px;
        font-weight: 400;
        justify-content: space-around;
        .contact-item {
          width: 162px;
          min-height: 222px;
          border-radius: 15px;
          background: var(--p_1);
          padding-bottom: 12px;
          border: 1px solid var(--p_2);
          @include flex(none, column);
          .contact-item-bg {
            width: 148px;
            height: 121px;
            background-size: cover;
            background-image: v-bind(contactItemBg);
            margin-top: 7px;
            margin-bottom: 10px;
            @include flex(center, column);
            .circle-bg {
              width: 62px;
              height: 62px;
              border-radius: 50%;
              background-color: var(--p_3);
              margin: 7px;
              @include flex(center);
              .hy-logo {
                width: 45px;
                margin-top: -2px;
                border-radius: 50%;
              }
            }
            .item-text {
              font-weight: 500;
              color: var(--p_16);
            }
          }
          .copy-btn {
            width: 140px;
            min-height: 18px;
            line-height: 18px;
            text-align: left;
            box-sizing: border-box;
            position: relative;
            font-weight: bold;
            font-size: 12px;
            @include flex();
            align-items: flex-start;
            .copy-btn-text {
              color: var(--p_4);
              float: left;
              word-break: break-all;
              width: 110px;
            }
            .copy-click {
              color: var(--p_5);
              cursor: pointer;
              float: right;
              margin-left: 10px;
              flex-shrink: 0;
            }
          }
        }
      }
      .partner_agent_btn {
        width: 240px;
        height: 60px;
        cursor: pointer;
        margin: 30px auto 0;
        display: flex;
        position: relative;
        .btn_txt {
          position: absolute;
          color: var(--p_12);
          font-weight: 500;
          font-size: 22px;
          left: 48%;
          top: 47%;
          transform: translate(-50%, -50%);
        }
        &.vi {
          width: 290px;
          img {
            width: 100%;
          }
          .btn_txt {
            font-size: 14px;
          }
        }
      }
    }
  }
  .partner-content {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 43px;
    .partner-content_title {
      font-weight: bold;
      color: var(--p_6);
      font-size: 28px;
      padding: 60px 0 33px 37px;
      position: relative;
      @include flex();
      .partner-content_title_left {
        @include flex();
        width: 100%;
        &:before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--p_6);
          position: absolute;
          top: 75px;
          left: 10px;
        }
        .right-desc {
          font-size: 16px;
        }
      }
      .partner-content_title_right {
        font-weight: 500;
        font-size: 16px;
        margin-top: 16px;
      }
    }
    .partner-bg {
      width: 1200px;
      background: var(--p_7);
      border-radius: 10px;
      .partner-first-list {
        @include flex();
        align-items: flex-start;
        .partner-first-item {
          width: 300px;
          @include flex(flex-start, column);
          position: relative;
          .partner-first-line-one {
            transform: scale(0.5);
            width: 95px;
          }
          .partner-first-line-two {
            width: 42px;
            height: 40px;
            margin-top: 40px;
          }
          .partner-first-line-three {
            font-size: 16px;
            font-weight: bold;
            color: var(--p_6);
            margin-top: 12px;
          }
          .partner-first-line-four {
            font-size: 12px;
            font-weight: 400;
            color: var(--p_8);
            align-self: center;
            margin: 5px 5px 0;
            text-align: center;
          }
          &:before {
            content: '';
            position: absolute;
            width: 95px;
            height: 10px;
            background: var(--p_9);
            border-radius: 0 0 10px 10px;
          }
          &:not(:first-child) {
            &::before {
              background-color: var(--p_10);
            }
          }
        }
      }
      .partner-line {
        width: 100%;
        height: 1px;
        background: var(--p_11);
        margin: 50px auto 0;
      }
      .partner-bottom-content {
        padding: 50px 89px 40px 70px;
        @include flex();
        .partner-img {
          width: 460px;
          height: 482px;
          align-self: flex-start;
        }
        .partner-right-box {
          flex-grow: 1;
          margin-left: 62px;
          .partner-right-box_title_1 {
            font-size: 24px;
            font-weight: 500;
            color: var(--p_6);
            position: relative;
            &:before {
              content: '';
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: var(--p_6);
              position: absolute;
              top: 12px;
              left: -25px;
            }
          }
          .partner-right-box_title_2 {
            color: var(--p_8);
            font-size: 14px;
            line-height: 21px;
          }
          .partner-right-box_title_3 {
            font-size: 16px;
            font-weight: 500;
            color: var(--p_6);
            margin-top: 40px;
            position: relative;

            &:before {
              content: '';
              display: inline-block;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: var(--p_6);
              position: absolute;
              top: 8px;
              left: -20px;
            }
          }
          .two-box {
            @include flex();
            align-items: flex-start;
            padding: 30px 0 0 0;
            .item-name {
              color: var(--p_8);
              font-weight: 500;
              &.item-one {
                font-size: 14px;
                font-weight: 600;
                white-space: nowrap;
              }
              font-size: 12px;
              padding: 0 10px;
            }
            .item-title,
            .item-title2 {
              font-weight: 300;
              font-size: 12px;
            }
            .two-item {
              text-align: center;
              img {
                width: 60px;
              }
              .icon-2,
              .icon-3 {
                width: 48px;
              }
            }
          }
        }
      }
    }
  }
}

//- 002
.partner-wrapper {
  &.template_2_002 {
    .contact-item-bg {
      background-size: 100% 119% !important;
    }
    .circle-bg {
      position: relative;
      background: linear-gradient(#fe8e00, #e8c96f);
      .hy-logo {
        background-color: #fff;
        padding: 5px;
        margin-top: 0;
      }
    }
    .copy-click {
      @include text_clip(linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%));
    }
    .partner-content_title {
      padding-bottom: 20px !important;
    }
    .partner-first-item {
      &:nth-child(1) {
        &:before {
          background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
        }
      }
      &:before {
        background: #3d5477 !important;
      }
    }
    .partner-first-line-two {
      width: 86px !important;
      height: 86px !important;
    }
    .partner-line {
      background: linear-gradient(90deg, rgba(232, 0, 255, 0), rgb(232, 0, 255), rgba(232, 0, 255, 0)) !important;
    }
    .item-title,
    .item-title2 {
      color: var(--p_11);
      font-weight: 500 !important;
    }
    .hy-title {
      .pos_txt {
        @include text_clip(linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%));
      }
    }
  }
  //- 003
  &.template_2_003 {
    .partner-content_title {
      font-weight: 500;
    }
    .partner-right-box_title_2 {
      color: #505679 !important;
    }
    .two-item,
    .item-name {
      color: #505679 !important;
    }
  }
}
</style>
<style lang="scss">
.partner.el-dialog {
  background: transparent;
  border: none;
  box-shadow: none;

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 0 !important;
    background-color: transparent !important;
    .copy-container {
      position: relative;
      .copy_text {
        font-weight: 500;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        color: var(--p_15);
        width: 100%;
      }
    }

    .dialog-result {
      width: 180px;
      height: 120px;
      font-size: 0;
    }
  }
}
</style>
