<template>
  <div class="recommend-wrapper">
    <component
      :is="currentComponentName.name"
      @currentComponentNameClick="currentComponentNameClick"
      @openDialog="openDialog"></component>
    <!-- 规则说明 -->
    <self-dialog
      :dialogTitle="$t_c('规则说明')"
      v-model:isShow="ruleShow"
      :width="500"
      :hasSelfFooter="true"
      :showCancel="false"
      :showConfirm="false"
      :class="['self-dialog-body', 'rule-wrapper', site]">
      <div class="content">
        <div>{{ $t_c('1.当天下午2点，统计前一日收益所得。') }}</div>
        <div class="text">{{ $t_c('2.平台有权更改返利比例，如有疑问，请联系客服。') }}</div>
        <div>{{ $t_c('3.本平台保留最终解释权。') }}</div>
      </div>
      <div class="footer">
        <button class="btn rule-btn" @click="ruleShow = false">{{ $t_c('取消') }}</button>
        <button class="btn recommend_btn confirm-btn" @click="ruleShow = false">{{ $t_c('确定') }}</button>
      </div>
    </self-dialog>

    <self-dialog
      :dialogTitle="$t_c('比例')"
      v-model:isShow="proportionShow"
      :width="globalState.language === 'zh' ? 900 : 1100"
      :hasSelfFooter="true"
      :showCancel="false"
      :showConfirm="false"
      :class="['self-dialog-body', 'rule-wrapper', site]">
      <div :class="['content', globalState.language]">
        <div class="one-line">
          <div class="line-content">
            <div>{{ $t_c('一、邀请好友，双方有礼') }}</div>
            <table class="table-wrapper">
              <tr :class="['table-header', globalState.language]">
                <th>{{ $t_c('推荐用户首存') }}</th>
                <th>{{ $t_c('邀请人礼金') }}</th>
                <th>{{ $t_c('被邀请人礼金') }}</th>
              </tr>
              <tr class="table-content">
                <td>
                  {{ rebateFirstChargeDto.minCharge }}-{{ rebateFirstChargeDto.maxCharge }}
                  {{ envState.vite_currency_map.value }}
                </td>
                <td>{{ rebateFirstChargeDto.referrer }}%</td>
                <td>{{ rebateFirstChargeDto.referee }}%</td>
              </tr>
            </table>
          </div>
          <div class="line-content">
            <div>{{ $t_c('二、好友打流水，奖金拿不停') }}</div>
            <table class="table-wrapper">
              <tr :class="['table-header', globalState.language]">
                <th>{{ $t_c('游戏类型') }}</th>
                <th v-for="(item, index) in catDtoList" :key="index">
                  {{ item.catName }}
                </th>
              </tr>
              <tr class="table-content">
                <td>{{ $t_c('奖金比例') }}</td>
                <td v-for="(item, index) in catDtoList" :key="index">{{ item.topRebate }}%</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="two-line">
          <div>{{ $t_c('三、好友邀请三重豪礼') }}</div>
          <table class="table-wrapper">
            <tr :class="['table-header', globalState.language]">
              <th>{{ $t_c('受邀好友达到VIP等级') }}</th>
              <th v-for="(item, index) in rebateVipDtoList" :key="index">VIP{{ item.level }}</th>
            </tr>
            <tr class="table-content">
              <td>{{ $t_c('邀请者得到的奖励') }}</td>
              <td v-for="(item, index) in rebateVipDtoList" :key="index">
                {{ item.award }}
              </td>
            </tr>
          </table>
        </div>
        <div class="three-line">
          <div>{{ $t_c('四、好友充值我领奖') }}</div>
          <table class="table-wrapper">
            <tr :class="['table-header', globalState.language]">
              <th>{{ $t_c('奖励金额') }}</th>
              <th v-for="(item, index) in rebateChargeDtoList" :key="index">
                {{ item.award }}{{ envState.vite_currency_map.value }} ({{ item.multiple }} {{ $t_c('倍') }}
                {{ $t_c('流水') }})
              </th>
            </tr>
            <tr class="table-content">
              <td rowspan="4">{{ $t_c('条件') }}</td>
              <td
                :class="{
                  'no-border': index === rebateChargeDtoList.length - 1,
                }"
                v-for="(item, index) in rebateChargeDtoList"
                :key="index">
                {{ $t_c('邀请') }} {{ item.num }} {{ $t_c('位') }}
              </td>
            </tr>
            <tr :class="['table-content', globalState.language]">
              <td
                v-for="(item, index) in rebateChargeDtoList"
                :key="index"
                :class="{ 'no-border left-border': index === 0 }">
                {{ $t_c('总额') }} ≥ {{ item.minCharge }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="footer mt-20">
        <button class="btn rule-btn" @click="proportionShow = false">
          {{ $t_c('取消') }}
        </button>
        <button class="btn confirm-btn recommend_btn" @click="proportionShow = false">
          {{ $t_c('确定') }}
        </button>
      </div>
    </self-dialog>

    <!-- 立即推广 -->
    <self-dialog
      :dialogTitle="$t_c('推广')"
      v-model:isShow="promoteShow"
      :width="globalState.language === 'zh' ? 500 : 700"
      :hasSelfFooter="true"
      :showCancel="false"
      :showConfirm="false"
      :class="['self-dialog-body', 'rule-wrapper', site]">
      <div class="content promote-wrapper">
        <div class="promote-title">{{ $t_c('扫码或复制链接到浏览器注册') }}</div>
        <QrCode
          :codeSize="248"
          class="qr-code-container promote-qr"
          slot="android-qrCode"
          topTitle=""
          :hideBottom="true"
          :codeUrl="agentUrl"
        >
        </QrCode>
        <div class="mt-20">{{ $t_c('微信等扫描如被拦截，可使用其他工具扫描') }}</div>
        <div class="wrap-text">
          {{ $t_c('或') }}<span class="copy-url">{{ $t_c('复制链接到浏览器打开') }}</span>
        </div>
        <div class="friend-url">
          <span>{{ $t_c('好友注册链接') }}</span>
        </div>
        <div :class="['url', globalState.language]">{{ agentUrl }}</div>
      </div>
      <div class="footer promote-footer">
        <button :class="['btn', 'rule-btn', globalState.language]" @click="copy(agentUrl)">
          {{ $t_c('复制推广链接') }}
        </button>
        <button :class="['btn confirm-btn recommend_btn', globalState.language]" @click="saveQrCode">
          {{ $t_c('保存推广页面') }}
        </button>
      </div>
    </self-dialog>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
// import { useEnvState, useGlobalState, useNormalState } from '@/stores';
import { useClipboard } from '@vueuse/core';
import QrCode from 'commonComponent/QrCode/qr.vue';
import { markRaw, onMounted, reactive, ref, watch, computed } from 'vue';
import { lang } from '@/i18n';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import Recommend from './component/recommended/Recommend.vue';
import MyFriend from './component/recommended/MyFriend.vue';
import MyFriendDetail from './component/recommended/MyFriendDetail.vue';
import GetMore from './component/recommended/GetMore.vue';
import { useSite } from '@/hook/usePath';

const site = useSite();
const componentMap = {
  Recommend: markRaw(Recommend),
  MyFriend: markRaw(MyFriend),
  MyFriendDetail: markRaw(MyFriendDetail),
  GetMore: markRaw(GetMore),
};
const currentComponentName = reactive<HeaderType.curType>({
  name: componentMap.Recommend,
});

const globalState = useGlobalState();
const envState = useEnvState();
const normalState = useNormalState();
const { copy, copied } = useClipboard();
const { messageTip } = useDialog();
// const agentUrl = ref('');
const ruleShow = ref(false);
const proportionShow = ref(false);
const promoteShow = ref(false);
const rebateVipDtoList = ref<FriendAPI.RebateVipDtoList[]>([]); //- 好友等级返回
const catDtoList = ref<FriendAPI.CatDtoList[]>([]); //- 好友打流水
const rebateChargeDtoList = ref<FriendAPI.RebateChargeDtoList[]>([]); //- 好友充值领奖
const rebateFirstChargeDto = reactive<FriendAPI.RebateFirstChargeDto>({} as FriendAPI.RebateFirstChargeDto); //- 被邀请人

onMounted(() => {
  _getRemmendRule();
  // if (globalState.codeId) {
  //   agentUrl.value = `${window.location.origin}#/login/register?codeId=${globalState.codeId}`;
  // }
});

const agentUrl = computed(()=> {
  return `${window.location.origin}#/login/register?codeId=${globalState.codeId}`
})

const _getRemmendRule = async () => {
  try {
    const res = await api.friendsRecommend.getRemmendRule();
    if (res.code) return;
    const { msg } = res;
    rebateVipDtoList.value = msg.rebateVipDtoList;
    catDtoList.value = msg.catDtoList;
    rebateChargeDtoList.value = msg.rebateChargeDtoList;
    Object.assign(rebateFirstChargeDto, msg.rebateFirstChargeDto || {});
  } catch (error) {
    console.warn(error);
  }
};

watch(copied, _ => {
  if (_) messageTip({ message: lang('复制成功！') });
});

watch(
  () => normalState.recommendedStr,
  (val: string) => {
    currentComponentName.name = componentMap[val as keyof typeof componentMap];
  }
);

//- 打开弹窗
const openDialog = (type: string) => {
  switch (type) {
    case 'rule':
      ruleShow.value = true;
      break;
    case 'promote':
      promoteShow.value = true;
      break;
    case 'proportion':
      proportionShow.value = true;
      break;
  }
};
const saveQrCode = () => {
  let imgSrc = (document.querySelector('.qr-code-container') as HTMLElement).getElementsByTagName('img');
  let a = document.createElement('a');
  a.href = imgSrc[0].src;
  a.download = lang('下载');
  a.click();
};

const currentComponentNameClick = (name: string) => {
  currentComponentName.name = componentMap[name as keyof typeof componentMap];
  normalState.set_recommended_str(name);
};
</script>

<style lang="scss" scoped>
@import './css/recommended.scss';
</style>
