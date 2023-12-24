<template>
  <div :class="['coupons', site]">
    <div class="top-div">
      <div class="coupons-inner">
        <div
          @click="selectClick(item)"
          :class="{ 'active-bg': selectActive === item.buttonShow }"
          v-for="item in titleArr"
          :key="item.buttonShow">
          {{ item.name }}
          <div class="dot"></div>
        </div>
      </div>
      <div :class="['coupons-wrapper', (shwoNodata || showLoding) && 'empty_table']">
        <div
          class="coupons-wrap"
          v-for="(item, index) in dataList"
          :key="index"
          :class="{
            'coupons-bg': item.buttonShow === 0 || item.buttonShow === 3,
            'is-to-top': isToTop && index === 0,
          }">
          <div class="coupons-wrap-border">
            <div class="coupons-wrap-first">
              <div
                class="first-div"
                :class="{
                  'first-div-bg': item.buttonShow === 0 || item.buttonShow === 3,
                }">
                {{ item.activityName }}
              </div>
              <div
                class="scoend-div"
                :class="{
                  'received-color': item.buttonShow === 3 || item.buttonShow === null,
                  t0: isSpecialActive(item) && !tmplCode(item).value,
                }"
                v-if="!isMixingRule(item)">
                {{ item.amountMax }}{{ envState.vite_currency_map.value }}
              </div>
            </div>
            <div class="coupons-wrap-second" v-if="!isMixingRule(item)">
              <span v-if="!isSpecialActive(item)">
                {{ $t_c('领取要求') }}：{{ tmplCode(item).label }}≥{{ tmplCode(item).value
                }}{{ envState.vite_currency_map.value }}
              </span>
              <span v-if="isSpecialActive(item) && tmplCode(item).value">
                {{ tmplCode(item).label }}:{{ tmplCode(item).value }}{{ envState.vite_currency_map.value }}
              </span>
            </div>
            <div class="coupons-wrap-three">
              <div class="special-rule-list" v-if="isSpecialActive(item)">
                <div
                  v-for="(childItem, childIndex) in getRuleList(item)"
                  :key="childIndex"
                  class="special-rule-item"
                  :class="{
                    'special-rule-item__active': +item.canApply === 1 && childItem.donateAmount === item.canApplyBonus,
                  }">
                  <span>≥{{ childItem.amountMin }}</span>
                  <i></i>
                  <span>{{ (childItem as couponsAPI.ActivityRuleDto).donateAmountMax || childItem.donateAmount }}</span>
                </div>
              </div>
              <button
                @click="openClick(index)"
                :class="['first-btn', isMixingRule(item) && 'mixing-detail', globalState.language]">
                <div class="btn-wrapper">
                  <span :class="['service-manual', globalState.language]">{{
                    isMixingRule(item) ? $t_c('领取详情') : $t_c('使用细则')
                  }}</span>
                  <el-icon :class="[globalState.language]">
                    <ArrowUpBold v-if="selectDiv === index" />
                    <ArrowDownBold v-else />
                  </el-icon>
                </div>
              </button>
              <button
                @click="nowBtnClick(item)"
                v-show="item.buttonShow !== null && !isMixingRule(item) && item.tmplCode !== 'AQ0000025'"
                :disabled="item.buttonShow === 0 || item.buttonShow === 3 || item.buttonShow === null"
                :class="[
                  'sconed-btn',
                  item.buttonShow === 0 || (item.buttonShow === 3 && 'sconed-btn-bg'),
                  item.buttonShow === 3 || (item.buttonShow === null && 'received-bg'),
                  globalState.language,
                  item.buttonShow === 0 && 'invalid-btn',
                ]">
                {{ buttonShow(item, false) }}
              </button>
            </div>
            <div class="coupons-wrap-last" :class="{ 'is-show': selectDiv === index }">
              <template v-if="isMixingRule(item)">
                <div v-for="(_item, _i) in mixingDetail" :key="_i" class="mixing-detailitem">
                  <div class="mixing-topbox">
                    <span class="white-color"
                      >{{ $t_c('领取要求') }}：{{ _item.activityName }}——{{ tmplCode(_item).label }}≥{{
                        tmplCode(_item).value
                      }}{{ envState.vite_currency_map.value }}</span
                    >
                    <span>
                      <span class="scoend-div mixing-title">{{ _item.activityName }}</span>
                      <span class="scoend-div mixing-title"
                        >{{ _item.amountMax }}{{ envState.vite_currency_map.value }}</span
                      >
                      <button @click="openMixingClick(_i)" class="first-btn">
                        <div class="btn-wrapper">
                          <span :class="['service-manual', globalState.language]">{{ $t_c('使用细则') }}</span>
                          <el-icon>
                            <ArrowUpBold v-if="selectMixingDiv === _i" />
                            <ArrowDownBold v-else />
                          </el-icon>
                        </div>
                      </button>
                      <button
                        @click="nowBtnClick(_item, true)"
                        :class="{
                          'sconed-btn-bg':
                            _item.buttonShow === 0 ||
                            _item.buttonShow === 3 ||
                            selectActive === 3 ||
                            _item.useState === 2,
                        }"
                        :disabled="
                          _item.buttonShow === 0 ||
                          _item.buttonShow === 3 ||
                          _item.buttonShow === 2 ||
                          selectActive === 3 ||
                          _item.useState === 2
                        "
                        class="sconed-btn">
                        {{ buttonShow(_item, true) }}
                      </button>
                    </span>
                  </div>
                  <div class="coupons-wrap-last" :class="{ 'is-show': selectMixingDiv === _i }">
                    <div class="first-last">
                      {{ $t_c('取款流水倍数') }}：{{ _item.multipleWater ? _item.multipleWater : 0 }}{{ $t_c('倍') }}
                    </div>
                    <div class="last-last">
                      {{ $t_c('使用范围') }}：
                      <div
                        v-for="(_categories, _index) in getCouponUseRange({
                          ..._item,
                          depotCatDtoList: item.depotCatDtoList,
                        })"
                        :key="_index">
                        <span v-show="_categories.depots.length">
                          <span>{{ _categories.catName }}:</span>
                          <span v-for="(_depot, _indexx) in _categories.depots" :key="_indexx">
                            {{ _depot.depotName }}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div @click="jumpDiscountOpen(_item, item.catId)" class="check-html">
                      {{ $t_c('查看优惠详情') }}>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="first-last" v-if="!isHideMoney(activeInfo)">
                  {{ $t_c('取款流水倍数') }}：{{ item.multipleWater ? item.multipleWater : 0 }}{{ $t_c('倍') }}
                </div>
                <div class="last-last">
                  {{ $t_c('使用范围') }}：
                  <div v-for="(categories, index) in getCouponUseRange(item)" :key="index">
                    <span v-show="categories.depots.length">
                      <span>{{ categories.catName }}:</span>
                      <span v-for="(depot, indexx) in categories.depots" :key="indexx">
                        {{ depot.depotName }}
                      </span>
                    </span>
                  </div>
                </div>
                <div @click="jumpDiscountOpen(item, -1)" class="check-html">{{ $t_c('查看优惠详情') }}></div>
              </template>
            </div>
          </div>
          <img
            class="coupons-received"
            v-show="item.buttonShow === 3 || item.buttonShow == null"
            :src="useImgPath('profile/coupons_received.png')" />
          <template v-if="item.buttonShow === 3 || item.buttonShow == null">
            <div v-if="theme === '002'" class="txt-wrapper">
              <span :class="['coupons_txt', globalState.language]">{{ $t_c('已领取') }}</span>
            </div>
            <span v-else :class="['coupons_txt', globalState.language]">{{ $t_c('已领取') }}</span>
          </template>
        </div>
      </div>

      <div class="no-data" v-if="shwoNodata && !dataList.length">
        <emptyVue :imgWidth="300" :txt="$t_c('暂无记录')"></emptyVue>
      </div>

      <SelfLoading class="message-load" :showLoading="showLoding" />
    </div>

    <self-dialog
      v-model:isShow="isShowDialog"
      :dialogTitle="$t_c('领取提示')"
      :hasSelfFooter="true"
      :showCancel="false"
      :showConfirm="false"
      class="coupons-wrap">
      <div class="d-div-title">
        {{ activeInfo.activityName }}
      </div>
      <div class="d-div-content content-first">
        {{ $t_c('取款流水倍数') }}：{{ activeInfo.multipleWater ? activeInfo.multipleWater : 1 }}{{ $t_c('倍') }}
      </div>
      <div class="d-div-content">{{ $t_c('请确认您已完整了解活动详情，领取后不可撤销') }}</div>

      <div class="d-btn-div">
        <div @click="isShowDialog = false">{{ $t_c('取消') }}</div>
        <div :class="['coupons_confirm_btn', globalState.language]" @click="getApply">{{ $t_c('立即领取') }}</div>
      </div>
    </self-dialog>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
// import { useEnvState, useGlobalState, useNormalState } from '@/stores';
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useImgPath, useSite } from '@/hook/usePath';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import emptyVue from 'commonComponent/empty/empty.vue';
import { lang } from '@/i18n';

const site = useSite();
const normalState = useNormalState();
const router = useRouter();
const route = useRoute();
const globalState = useGlobalState();
const { messageTip } = useDialog();
const theme = sessionStorage.getItem('VITE_THEME') || import.meta.env.VITE_THEME;
const envState = useEnvState();

type titleArrType = {
  name: string;
  buttonShow: number;
  isMixin?: string;
};

const titleArr = ref<titleArrType[]>([
  {
    name: lang('全部'),
    buttonShow: -1,
  },
  {
    name: lang('已领取'),
    buttonShow: 3,
  },
  {
    name: lang('已失效'),
    buttonShow: 0,
  },
]);
const selectActive = ref(-1);
const dataList = ref<couponsAPI.ActivityDataList[] | couponsAPI.claimedActivitiesList[]>([]);
const selectDiv = ref(-1);
const selectMixingDiv = ref(-1);
const showLoding = ref(false);
const shwoNodata = ref(false);
const isShowDialog = ref(false);
const isToTop = ref(false);
const activeInfo = reactive({
  activityName: '',
  multipleWater: 1,
  id: -1,
  tmplCode: '',
  subRuleTmplCode: '',
});
const mixingDetail = ref<couponsAPI.getMixingData[]>([]);
const lastMixinId = ref(-1);

onMounted(() => getData());

const isMixingRule = (data: couponsAPI.ActivityDataList | couponsAPI.claimedActivitiesList) => {
  return data.tmplCode && ['AQ0000024'].includes(data.tmplCode);
};

const isHideMoney = (data: { tmplCode: string }) => {
  return data.tmplCode && ['AQ0000030'].includes(data.tmplCode);
};

// 查看详情跳转优惠，并打开详情弹窗
const jumpDiscountOpen = (
  item: couponsAPI.getMixingData | couponsAPI.ActivityDataList | couponsAPI.claimedActivitiesList,
  catID: number
) => {
  normalState.set_link_data({
    bannerLink: true,
    id: catID || item.catId,
    activityId: item.id,
  });
  router.push('/discount');
};

const nowBtnClick = (
  item: couponsAPI.getMixingData | couponsAPI.ActivityDataList | couponsAPI.claimedActivitiesList,
  isMixing?: boolean
) => {
  activeInfo.activityName = item.activityName;
  activeInfo.multipleWater = item.multipleWater;
  activeInfo.id = item.id;
  activeInfo.tmplCode = item.tmplCode;
  if (isMixing) {
    Object.assign(activeInfo, { subRuleTmplCode: item.tmplCode });
  }
  isShowDialog.value = true;
};

const getApply = () => {
  isShowDialog.value = false;
  const { id, subRuleTmplCode } = activeInfo;
  const data = {
    activityId: id,
    subRuleTmplCode: '',
  };
  if (subRuleTmplCode) {
    data.subRuleTmplCode = subRuleTmplCode;
  }
  api.vip.getActApply(data).then(res => {
    if (res.code === 0) {
      messageTip({ type: 'success', message: lang('成功领取优惠') });
      getData();
    } else {
      messageTip({ message: res.msg });
    }
  });
};
const openMixingClick = (index: number) => {
  selectMixingDiv.value = selectMixingDiv.value === index ? -1 : index;
};
const openClick = (index: number) => {
  if (selectDiv.value === index) {
    selectDiv.value = -1;
  } else {
    selectDiv.value = index;
    const currentObj = dataList.value[index] as couponsAPI.ActivityDataList | couponsAPI.claimedActivitiesList;
    if (isMixingRule(currentObj)) {
      getMixingDetail(currentObj);
    }
  }
};
const getMixingDetail = ({ id }: { id: number }) => {
  const params = {
    activityId: id,
  };
  if (lastMixinId.value !== id) {
    mixingDetail.value = [];
  } else {
    return;
  }
  lastMixinId.value = id;
  const dealFn = (res: couponsAPI.getMixingResType) => {
    if (res.code === 0) {
      mixingDetail.value = res.data;
    }
  };
  if (selectActive.value === 3) {
    api.coupons.getDoneMixing(params).then((res: couponsAPI.getMixingResType) => dealFn(res));
  } else {
    api.coupons.getMixing(params).then((res: couponsAPI.getMixingResType) => dealFn(res));
  }
};
const buttonShow = (
  item: couponsAPI.ActivityDataList | couponsAPI.claimedActivitiesList | couponsAPI.getMixingData,
  isMixin: boolean
) => {
  if (isMixin && item.useState === 2) {
    return lang('已失效');
  }
  if (item.buttonShow === 0) {
    return lang('已失效');
  } else if (item.buttonShow === 1) {
    return lang('立即领取');
  } else if (item.buttonShow === 2) {
    return lang('立即存款');
  } else if (item.buttonShow === 3) {
    return lang('已领取');
  } else {
    return lang('已领取');
  }
};

const tmplCode = (item: couponsAPI.getMixingData | couponsAPI.ActivityDataList | couponsAPI.claimedActivitiesList) => {
  if (item.tmplCode === 'AQ0000004') {
    return {
      label: lang('负盈利'),
      value: item.validBet,
    };
  } else if (item.tmplCode === 'AQ0000012') {
    return {
      label: lang('活动投注金额'),
      value: item.activityAlready,
    };
  } else if (['AQ0000001', 'AQ0000003'].includes(item.tmplCode)) {
    return {
      label: lang('活动存款金额'),
      value: item.activityAlready,
    };
  } else {
    return {
      label: lang('存款金额'),
      value: item.amountMin,
    };
  }
};

interface DepotsData {
  catId: number;
  catName: string;
  depots: {
    catId: number;
    catName: string;
    catCode: string;
    depotId: number;
    depotName: string;
    depotCode: string;
  }[];
}

const getCouponUseRange = (
  activeCoupon: couponsAPI.getMixingData | couponsAPI.ActivityDataList | couponsAPI.claimedActivitiesList
): DepotsData[] => {
  const { depotCatDtoList } = activeCoupon;
  try {
    const { auditCats } = JSON.parse(activeCoupon.rule);
    return (
      auditCats &&
      auditCats.map(({ catId, depots }: { catId: number; depots: { depotId: number }[] }) => {
        const { catName } = (depotCatDtoList as couponsAPI.DepotCatDtoList[]).find(
          item => item.catId === catId
        ) as couponsAPI.DepotCatDtoList;

        return {
          catId,
          catName,
          depots: depots
            .map(({ depotId }) =>
              depotCatDtoList.find(
                (item: couponsAPI.DepotCatDtoList) => item.catId === catId && item.depotId === depotId
              )
            )
            .filter(item => !!item),
        };
      })
    );
  } catch (error) {
    return [];
  }
};

const getData = () => {
  showLoding.value = true;
  shwoNodata.value = false;
  const data = {
    discount: 1,
    pageSize: 100,
    pageNo: 1,
    buttonShow: selectActive.value,
  };
  api.coupons.getActivityList(data).then((res: couponsAPI.ActivityListRes) => {
    showLoding.value = false;
    if (res.code === 0) {
      dataList.value = res.page.list;
      if (dataList.value.length === 0) shwoNodata.value = true;
      if (route.query.id) {
        dataList.value.find((item, index) => {
          if (item.id == +(route.query.id as string) && index !== 0) {
            const d = dataList.value[index] as couponsAPI.ActivityDataList & couponsAPI.claimedActivitiesList;
            dataList.value.unshift(d);
            dataList.value.splice(index + 1, 1);
            isToTop.value = true;
          }
        });
      }
    }
  });
};

const selectClick = (item: titleArrType) => {
  selectActive.value = item.buttonShow;
  shwoNodata.value = false;
  showLoding.value = true;
  isToTop.value = false;
  dataList.value = [];
  if (item.buttonShow === 3) {
    const data = {
      discount: 1,
      pageSize: 20,
      pageNo: 1,
      buttonShow: selectActive.value,
    };
    api.coupons.getActivityListTwo(data).then((res: couponsAPI.getActivityListTwoResType) => {
      showLoding.value = false;
      if (res.code === 0) {
        dataList.value = res.data.list;
        if (dataList.value.length === 0) shwoNodata.value = true;
      }
    });
  } else {
    getData();
  }
};

const isSpecialActive = (item: couponsAPI.ActivityDataList | couponsAPI.claimedActivitiesList) => {
  const codes = ['AQ0000001', 'AQ0000003', 'AQ0000012', 'AQ0000030'];
  return codes.includes(item.tmplCode);
};
const getRuleList = (data: couponsAPI.ActivityDataList | couponsAPI.claimedActivitiesList) => {
  const { tmplCode, rule } = data;
  let result: (couponsAPI.ActivityRuleDto | couponsAPI.BettingGiftRuleDto)[] = [];
  const ruleJson: couponsAPI.RuleType & couponsAPI.bettingGiftRuleDtosType = JSON.parse(rule);

  try {
    if (tmplCode === 'AQ0000012' || tmplCode == 'AQ0000030') {
      const tempList =
        tmplCode == 'AQ0000030' ? ruleJson.ruleScopeDtos[0].activityRuleDtos : ruleJson.bettingGiftRuleDtos;

      tempList.forEach((item: couponsAPI.ActivityRuleDto | couponsAPI.BettingGiftRuleDto) => {
        result.push({
          ...item,
          amountMin:
            tmplCode == 'AQ0000030'
              ? (item as couponsAPI.ActivityRuleDto).amountMin
              : (item as couponsAPI.BettingGiftRuleDto).validBetMin,
        });
      });
    } else {
      result = ruleJson.ruleScopeDtos[0].activityRuleDtos;
    }
  } catch (e) {}
  return result;
};

const ruleIcon = `url(${useImgPath('profile/coupons_rule_icon.png')})`;
const ruleIconActive = `url(${useImgPath('profile/coupons_rule_icon_active.png')})`;
</script>

<style lang="scss" scoped>
.special-rule-item {
  &.special-rule-item__active {
    i {
      background-image: v-bind(ruleIconActive);
    }
  }
  i {
    background-image: v-bind(ruleIcon);
  }
}
.coupons-wrap {
  .el-dialog__body {
    padding-bottom: 0px !important;
    .d-div-title {
      color: var(--u_cou_2);
      font-size: 16px;
      margin-bottom: 20px;
    }
    .d-div-content {
      text-align: left;
      color: var(--u_cou_11);
      font-size: 16px;
      &.content-first {
        margin-bottom: 10px;
      }
    }
    .d-btn-div {
      margin: 30px 0 0;
      @include flex(space-around);
      div {
        width: 138px;
        height: 48px;
        border-radius: 10px;
        line-height: 48px;
        text-align: center;
        color: var(--u_cou_11);
        cursor: pointer;
        font-size: 16px;
        border: 1px solid var(--u_cou_12);
      }
      .coupons_confirm_btn {
        width: 140px;
        height: 50px;
        color: var(--u_cou_9);
        background: var(--u_cou_4);
        border-radius: 10px;
        border: 0px;
        &.ms,
        &.vi {
          width: auto;
          padding: 0 10px;
        }
      }
    }
  }
}
.top-div {
  margin-bottom: 20px;
  color: var(--u_cou_7);
  border-radius: 10px;
  .coupons-inner {
    @include flex(flex-start);
    padding-left: 20px;
    div {
      cursor: pointer;
      @include flex(center);
      position: relative;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: var(--u_cou_3);
      margin-right: 10px;
      width: 168px;
      position: relative;
      font-size: 18px;
      font-weight: 500;
      margin-top: 30px;
      .dot {
        width: 48px;
        height: 3px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 6px 6px 0 0;
      }
    }
    .active-bg {
      .dot {
        background: var(--u_cou_4);
      }
      color: var(--u_cou_2);
    }
  }
  .coupons-wrapper {
    background: var(--u_cou_1);
    border-radius: 10px;
    padding: 20px;
    margin: 0 20px;
    .coupons-wrap {
      min-height: 160px;
      margin-bottom: 20px;
      background: var(--u_cou_9);
      padding: 8px;
      box-sizing: border-box;
      border-radius: 15px;
      position: relative;
      box-shadow: 0px 4px 14px rgba(207, 212, 225, 0.4);
      border-radius: 10px;
      .coupons-received {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 168px;
      }
      .coupons_txt,
      .txt-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: var(--u_cou_13);
        transform: translate(-50%, -50%) rotate(-20deg);
        color: var(--u_cou_14);
        font-weight: bod;
        font-size: 16px;
      }

      .coupons_txt {
        &:not(.vi) {
          font-size: 24px;
        }
      }

      .txt-wrapper {
        .coupons_txt {
          position: static;
        }
      }

      .coupons-wrap-border {
        // width: 965px;
        border-radius: 10px;
        border: 1px solid var(--u_cou_5);
        padding: 0 22px;
        box-sizing: border-box;
        .coupons-wrap-first {
          display: flex;
          justify-content: space-between;
          .first-div {
            line-height: 30px;
            text-align: center;
            margin: 20px 0;
            color: var(--u_cou_6);
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
          }
        }
      }
      .scoend-div {
        position: relative;
        font-weight: 500;
        font-size: 32px;
        top: 15px;
        right: 15px;
        min-width: 84px;
        text-align: center;
        color: var(--u_cou_8);
        line-height: 70px;
        &.received-color {
          color: var(--u_cou_3);
          opacity: 0.5;
        }
        &.t0 {
          top: 0;
        }
      }
      .coupons-wrap-second {
        color: var(--u_cou_7);
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
      }
      .mixing-detailitem {
        margin-top: 18px;
      }
      .mixing-topbox {
        @include flex(space-between);
        button {
          margin-right: 10px;
        }
        .sconed-btn {
          margin-left: 0;
        }
      }
      .mixing-title {
        font-size: 22px;
        margin-right: 30px;
        top: 3px;
      }
      .first-btn {
        width: 120px;
        height: 35px;
        border: 1px solid var(--u_cou_3);
        border-radius: 8px;
        background-color: var(--u_cou_9);
        color: var(--u_cou_6);
        line-height: 35px;

        &:not(.zh, .zh_tw) {
          padding: 0 10px;
        }
        .btn-wrapper {
          position: relative;
          .service-manual {
            margin-right: 10px;
            line-height: 18px;
            font-weight: 500;
            &:not(.zh, .zh_tw) {
              font-size: 12px;
              margin-right: 15px;
            }
          }
          i {
            font-size: 16px;
            color: var(--u_cou_6);
            position: absolute;
            top: 8px;
            right: 13px;
            &:not(.zh, .zh_tw) {
              right: -5px;
              top: 10px;
            }
          }
        }
        &:not(.zh, .zh_tw) {
          width: auto;
        }
      }
      .coupons-wrap-three {
        text-align: right;
        padding-right: 15px;
        margin: 8px 0;
        position: relative;
        border-top: 1.2px solid var(--u_cou_10);
        padding-top: 11px;
        .special-rule-list {
          margin-top: 10px;
          font-style: 14px;
          overflow-x: auto;
          display: flex;
          flex-wrap: nowrap;
          &::-webkit-scrollbar {
            height: 0;
          }
          &::-webkit-scrollbar-thumb {
            background: transparent;
          }
          .special-rule-item {
            flex-shrink: 0;
            flex-grow: 0;
            padding: 12px 5px 9px;
            min-width: 100px;
            height: 100px;
            box-sizing: border-box;
            background: var(--u_cou_9);
            border: 0.5px dashed var(--u_cou_7);
            box-sizing: border-box;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            &.special-rule-item__active {
              i {
                background-size: 100% 100%;
              }
            }
            i {
              margin: 0 auto;
              display: block;
              width: 20px;
              height: 20px;
              background-size: 100% 100%;
            }
          }
        }
      }
      .sconed-btn {
        width: 84px;
        height: 35px;
        border: 0;
        font-size: 14px;
        margin-left: 17px;
        background: var(--u_cou_4);
        border-radius: 8px;
        color: var(--u_cou_9);
        &:not(.zh, .zh_tw) {
          width: auto;
          padding: 0 10px;
        }
      }
      .sconed-btn-bg {
        color: var(--u_cou_9);
        line-height: 14px;
        background: var(--u_cou_3);
      }
      .coupons-wrap-last {
        display: none;
        .first-last {
          margin: 8px 0 5px 20px;
        }
        .last-last {
          margin-left: 20px;
        }
        .check-html {
          font-size: 14px;
          text-align: right;
          cursor: pointer;
          color: var(--u_cou_7);
          margin-right: 15px;
          margin-bottom: 10px;
        }
      }
      .is-show {
        display: block;
        padding-bottom: 15px;
      }
    }
  }
  .no-data {
    min-height: 500px;
    @include flex(center);
  }
}
</style>
