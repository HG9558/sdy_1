<template>
  <div class="footer_component">
    <div class="footer-container">
      <div class="footer_icon_container">
        <img
          class="mr-5"
          v-for="(_, index) in 8"
          :key="index"
          :src="useImgPath(`base/footer_icon_${index + 1}.png`)"
          alt="" />
      </div>

      <div class="footer_main_container">
        <div class="notice-msg">
          <div class="desc-text-wrapper">
            <div>
              {{ appTitle }}
              {{
                $t_c(
                  '拥有欧洲马耳他博彩管理局（MGA）、英国GC监督委员会（Gambling Commission） 和菲律宾政府博彩委员会（PAGCOR）颁发的合法执照。 注册于英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。 进行注册并娱乐前，请确保您年满18周岁！'
                )
              }}
            </div>
          </div>
        </div>

        <div class="brand_wrapper">
          <div class="branch-item" v-for="(_, index) in branchList" :key="index">
            <img class="brand-img" :src="useImgPath(`base/footer_brand_${index + 1}.png`)" alt="" />
            <span class="branch-txt">{{ _ }}</span>
          </div>
        </div>
      </div>

      <div class="footer_link_box">
        <router-link :class="['link_item']" :to="item.url" tag="div" v-for="item in linkUrlList" :key="item.url">
          {{ item.value }}
        </router-link>
      </div>

      <div class="make-a-record">{{ $t_c('版权所有 © 2014-2023') }} {{ appTitle }} {{ $t_c('保留所有权') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImgPath } from '@/hook/usePath';
import { useCurrentTitle } from '@/hook/useTitle';
import { lang } from '@/i18n';

// const linkUrlList = ;

const linkUrlList = computed(() => {
  return [
    { value: lang('游戏帮助'), url: '/game_help?index=0' },
    { value: lang('博彩责任'), url: '/game_help?index=1' },
    { value: lang('隐私保护'), url: '/game_help?index=2' },
    { value: lang('规则与条款'), url: '/game_help?index=3' },
    { value: lang('联系我们'), url: '/contact_us' },
    { value: lang('加入合营'), url: '/partner' },
  ].filter(_ => {
    return !_.url.startsWith('/partner') || (_.url.startsWith('/partner') && envState.vite_show_partner);
  });
});

const branchList = [
  lang('马耳他博彩管理局（MGA）认证'),
  lang('英属维尔京群岛（BVI）认证'),
  lang('英国GC监督委员会'),
  lang('菲律宾（PAGCOR）政府博彩委员会'),
];
const appTitle = useCurrentTitle();
const envState = useEnvState();
</script>

<style lang="scss" scoped>
.footer_component {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px 0 16px;
  background-color: var(--m_8);
  position: relative;
}

.footer-container {
  max-width: 1160px;
  margin: 0 auto;
  border-radius: 16px;
  position: relative;

  .footer_icon_container {
    height: 45px;
    @include flex();
    border-bottom: 2px solid var(--m_9);

    img {
      height: 100%;
      width: auto;
      font-size: 0;
      margin-bottom: 10px;
    }
  }

  .footer_main_container {
    padding: 20px 0 26px;
    position: relative;
    width: 100%;

    .notice-msg {
      @include flex();
      font-weight: 400;
      padding: 0px 18px 0 56px;
      justify-content: center;
      margin-bottom: 32px;

      .desc-text-wrapper {
        font-size: 14px;
        text-align: center;
        color: var(--m_10);
      }
    }

    .brand_wrapper {
      height: 100%;
      @include flex();
      padding: 0px 20px 0px 46px;

      .branch-item {
        @include flex(flex-start, column);
      }

      .brand-img {
        height: 50px;
      }

      .branch-txt {
        margin-top: 10px;
        color: var(--m_10);
        font-size: 12px;
      }
    }
  }

  .footer_link_box {
    width: 1160px;
    @include flex(center);
    font-size: 14px;

    .link_item {
      cursor: pointer;
      margin-right: 80px;
      position: relative;
      color: var(--m_11);
      opacity: 0.6;

      &::after {
        content: '';
        height: 14px;
        position: absolute;
        width: 1px;
        background-color: var(--m_11);
        opacity: 0.6;
        right: -40px;
        top: 50%;
        transform: translateY(-50%);
      }

      &:last-child {
        margin-right: 0;

        &::after {
          display: none;
        }
      }
    }
  }
  .make-a-record {
    color: var(--m_11);
    opacity: 0.6;
    text-align: center;
    margin-top: 23px;
    font-size: 12px;
  }
}
</style>
