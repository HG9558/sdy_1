<template>
  <div :class="['exclusive-vip', site, globalState.language]">
    <img
      class="banner"
      :src="useImgPath(`profile/vip_banner${globalState.language === 'zh' ? '' : '_en'}.jpg`)"
      alt="" />
    <div class="data-box">
      <div class="header">
        <div class="header_top">
          <div class="header-left">
            <div class="normal-show-container">
              <div class="level-bg">
                <span class="level-num">{{ userState.vipData.accountLevel }}</span>
              </div>
              <span class="level-txt">{{ $t_c('当前等级：') }}{{ userState.vipData.tierName }}</span>
            </div>
          </div>
          <div class="birthday_icon" v-if="birthday.isBirthday">
            <img width="117" @click="birthdayFlog = true" :src="useImgPath('profile/vip_birthday-case.png')" />
            <span>{{ $t_c('领取生日礼金') }}</span>
          </div>
          <div @click="router.push('/profile/vipInfo')" class="header_top_pos">{{ $t_c('查看VIP详情') }}>></div>
        </div>
        <div class="header_bottom">
          <div
            class="row-right"
            v-if="
              Object.keys(userState.vipData).length &&
              depositMinShow &&
              userState.vipData.activityLevelList &&
              userState.vipData.accountLevel !==
                userState.vipData.activityLevelList[userState.vipData.activityLevelList.length - 1].accountLevel
            ">
            {{ $t_c('充值') }} {{ getValidbet('top') }}
            <!-- {{ parseInt(userState.vipData.depositAmount.toString()) }} -->
            {{ $t_c('即可晋升到') }}
            <div class="vip_bg">
              <img :src="useImgPath('profile/vip_txt.png')" alt="" />
              {{ userState.vipData.accountLevel + 1 }}
            </div>
          </div>
          <div
            class="line-row"
            v-if="
              validbetMinShow &&
              userState.vipData.activityLevelList &&
              userState.vipData.accountLevel !==
                userState.vipData.activityLevelList[userState.vipData.activityLevelList.length - 1].accountLevel
            ">
            <el-progress :text-inside="true" :stroke-width="20" :percentage="validbetMinValue">
              <span :class="[!validbetMinValue && 'empty-progress']"
                >{{ parseInt(userState.vipData.validbet.toString()) }}/{{ getValidbet('bottom') }}</span
              >
            </el-progress>
            <div class="level_container">
              <span class="level">{{ userState.vipData.tierName }}</span>
              <span class="level">VIP{{ nowVipLevel + 1 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="
        userState.vipData &&
        userState.vipData.birthdayBonusList &&
        userState.vipData.upgradeBonusLevelDtos &&
        userState.vipData.monthlyBonus
      "
      class="data-box">
      <div class="data_box_title">
        <img width="35" :src="useImgPath('profile/vip_star.png')" alt="" />
        <span>{{ $t_c('我的福利') }}</span>
        <div class="data_box_desc">
          <img width="30" :src="useImgPath('profile/vip_small_star.png')" alt="" />
          <span>{{ $t_c('从 VIP2 开始享有') }}</span>
        </div>
      </div>
      <div class="box-title vip-title">
        <span class="bold">VIP{{ nowVipLevel }}</span>
        {{ $t_c('尊享') }}
      </div>
      <div class="row text-center vip-center">
        <div class="col px-0">
          <div class="font-weight-bolder">
            <span v-if="nowVipLevel === 0">0</span>
            <span v-else>{{
              userState.vipData.upgradeBonusLevelDtos &&
              userState.vipData.upgradeBonusLevelDtos[nowVipLevel - 1].donateAmount
            }}</span>
          </div>
          <div class="fs-0-7">{{ $t_c('升级礼金（晋级自动发放）') }}</div>
        </div>
        <div class="col px-0">
          <div class="font-weight-bolder">
            <span v-if="nowVipLevel === 0">0</span>
            <span v-else>{{
              nowVipLevel != 0 && userState.vipData.birthdayBonusList[nowVipLevel - 1].donateAmount
                ? userState.vipData.birthdayBonusList[nowVipLevel - 1].donateAmount
                : 0
            }}</span>
          </div>
          <div class="fs-0-7">{{ $t_c('生日礼金') }}</div>
        </div>
        <div class="col px-0">
          <div class="font-weight-bolder orange">
            <span>{{
              nowVipLevel === 0 ? 0 : userState.vipData.monthlyBonus.ruleScopeDtoList[nowVipLevel - 1].donateAmount
            }}</span>
          </div>
          <div class="fs-0-7">{{ $t_c('每月红包（月初自动发放）') }}</div>
        </div>
      </div>
    </div>
    <div
      class="data-box"
      v-show="
        userState.vipData.birthdayBonusList !== null &&
        userState.vipData.upgradeBonusLevelDtos !== null &&
        userState.vipData.monthlyBonus !== null
      ">
      <div class="box-title vip-title">
        <span class="bold">VIP{{ nowVipLevel }}</span>
        {{ $t_c('专属优惠') }}
      </div>
      <div class="exclusive">
        <div class="row text-center vip-center no-border" v-if="ruleScopeDtos.length">
          <div class="col px-0">
            <div class="vip-promote yellow">
              {{
                nowVipLevel === 0
                  ? nowVipLevel
                  : ruleScopeDtos.length && ruleScopeDtos[nowVipLevel - 1].activityRuleDtos[0].amountMin
              }}
            </div>
            <div class="fs-0-7">
              <span>{{ $t_c('最低余额') }}</span>
            </div>
          </div>
          <div class="col px-0">
            <div class="vip-promote blue">
              {{
                nowVipLevel === 0
                  ? nowVipLevel
                  : ruleScopeDtos[nowVipLevel - 1].activityRuleDtos[0].donateType === 0
                  ? ruleScopeDtos[nowVipLevel === 0 ? nowVipLevel : nowVipLevel - 1].activityRuleDtos[0].donateAmount
                  : ruleScopeDtos[nowVipLevel].activityRuleDtos[0].donateAmount
              }}%
            </div>
            <div class="fs-0-7">
              <span>{{ $t_c('红利比例') }}</span>
            </div>
          </div>
          <div class="col px-0">
            <div class="vip-promote red">
              {{ nowVipLevel === 0 ? nowVipLevel : ruleScopeDtos[nowVipLevel - 1].activityRuleDtos[0].donateAmountMax }}
            </div>
            <div class="fs-0-7">
              <span>{{ $t_c('最高奖金') }}</span>
            </div>
          </div>
          <div class="col px-0">
            <div class="vip-promote green">
              {{ nowVipLevel === 0 ? nowVipLevel : ruleScopeDtos[nowVipLevel - 1].activityRuleDtos[0].multipleWater }}
            </div>
            <div class="fs-0-7">
              <span>{{ $t_c('流水倍数') }}</span>
            </div>
          </div>
          <div class="col px-0">
            <div class="vip-promote orange">
              {{ nowVipLevel === 0 ? nowVipLevel : ruleScopeDtos[nowVipLevel - 1].drawNumber }}
            </div>
            <div class="fs-0-7">
              <span>{{ $t_c('次数限制') }}</span>
            </div>
          </div>
          <div class="col px-0">
            <div class="vip-promote orange">{{ $t_c('指定场馆') }}</div>
            <div class="fs-0-7">
              <span>{{ $t_c('游戏场馆') }}</span>
            </div>
          </div>
        </div>
        <div class="row bottom-btn-group">
          <el-select class="select" v-model="venueName" :placeholder="$t_c('查看指定场馆')">
            <el-option
              v-for="(item, index) in dataArray"
              :key="index + '_index'"
              :label="item.catName"
              :value="item.catId">
            </el-option>
          </el-select>
          <div class="venue">
            <el-button :disabled="buttonShow === 3" v-show="buttonShow === 3" class="venue-btn" type="primary">
              {{ $t_c('已领取') }}
            </el-button>
            <el-button :disabled="buttonShow === 0" v-show="buttonShow === 0" class="venue-btn" type="primary">
              {{ $t_c('已失效') }}
            </el-button>
            <!-- 4 优惠稽核未通过 灰化的立即领取 -->
            <el-button
              v-show="buttonShow === 1 || buttonShow === 4"
              class="venue-btn"
              :type="buttonShow === 1 ? 'primary' : 'info'"
              :disabled="buttonShow === 4"
              @click="btnClick">
              {{ $t_c('立即领取') }}
            </el-button>
            <el-button v-show="buttonShow === 2" class="venue-btn" type="primary" @click="btnClick">
              {{ $t_c('立即存款') }}
            </el-button>
            <el-button v-show="buttonShow === 9" :disabled="true" class="venue-btn" type="primary">
              {{ $t_c('等级不符') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="data-box vip-box"
      v-show="
        userState.vipData.birthdayBonusList === null &&
        userState.vipData.upgradeBonusLevelDtos === null &&
        userState.vipData.monthlyBonus === null
      ">
      <div class="box-title vip-title">
        <span class="bold">VIP{{ nowVipLevel }}</span
        >{{ $t_c('晋级优惠') }}
      </div>
      <div class="box-no-data">{{ $t_c('当前等级没有晋级优惠') }}</div>
      <div class="box-no-data-div">
        <span @click="$router.push('/discount')">{{ $t_c('更多VIP特权') }}</span>
      </div>
    </div>

    <!-- 返水表格 -->
    <div class="data-box">
      <VipTable :title="$t_c('洗码比例')" styleName="vip"></VipTable>
    </div>

    <!-- 礼品信息 -->
    <div class="data-box">
      <div class="gift-title">
        <img :src="useImgPath('profile/vip_star.png')" alt="" />
        <span>{{ $t_c('高级福利') }}</span>
      </div>
      <div class="gift-container">
        <div class="gift-list" v-for="(item, index) in giftList" :key="index">
          <span>{{ item.title }}</span>
          <span>{{ item.desc }}</span>
          <img :src="useImgPath(`profile/${item.icon}.png`)" alt="" />
        </div>
      </div>
    </div>

    <div v-show="birthdayFlog" class="birthday-mask">
      <img class="birthday-bg" :src="useImgPath('profile/vip_birthday-bg.png')" alt="" />
      <div class="birthday-inner-box">
        <i @click="birthdayFlog = false" class="close-dialog-btn el-icon-circle-close"></i>
        <div class="birthday-inner">
          <div class="div-color">
            {{ $t_c('尊敬的') }}
            <span class="gold-text"
              >{{ userState.vipData.accountLevel ? userState.vipData.accountLevel : 0 }}{{ $t_c('级') }}VIP</span
            >
            {{ $t_c('会员') }}
          </div>
          <div class="div-while">{{ userState.userInfo.loginName }}</div>
          <div class="div-color bless gold-text">{{ $t_c('生日快乐！') }}</div>
          <div class="div-while">{{ $t_c('特为您奉上生日礼金') }}</div>
          <div class="div-color bless">
            {{ birthday.donateAmount }}
            {{ envState.vite_currency_map[globalState.language === 'zh' ? 'value' : 'type'] }}
          </div>
          <div class="div-while">-{{ birthday.multipleWater }}{{ $t_c('倍流水即可提现') }}-</div>
          <div class="div-while">{{ $t_c('祝您：') }}</div>
          <div class="div-color bless">{{ $t_c('顺心顺意，一本万利！') }}</div>
          <div @click="birthdayBtn" class="div-btn">
            {{ $t_c('立即领取') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useDialog from '@/hook/useDialog';
import useProxy from '@/hook/useCurrentInstance';
import VipTable from './component/vip/VipTable.vue';

const site = useSite();
const userState = useUserState();
const globalState = useGlobalState();
const couponsData = reactive<VipAPI.accountVipPrivilegesData>({} as VipAPI.accountVipPrivilegesData);
const nowVipLevel = ref<number>(1);
const nextVipLevel = ref<number>(1);
const vipBarTxtColorIndex = ref<number>(0);
const depositMinShow = ref<boolean>(false);
const validbetMinShow = ref<boolean>(false);
const birthdayFlog = ref<boolean>(false);
const buttonShow = ref<number>(0);
const ruleScopeDtos = reactive<VipAPI.ruleScopeDtosType[]>([]);
const venueName = ref<string>('');
const birthday = reactive<VipAPI.accountBirthdayData>({} as VipAPI.accountBirthdayData);
const router = useRouter();
const { messageTip } = useDialog();
const proxy = useProxy();
const envState = useEnvState();

onMounted(() => init());

const init = async () => {
  nowVipLevel.value = userState.vipData.accountLevel;
  nextVipLevel.value = nowVipLevel.value + 1;
  vipBarTxtColorIndex.value = userState.vipData.accountLevel;

  setValidMin(userState.vipData.activityLevelList);

  api.vip.getVipPrivileges().then(res => {
    if (res.code) return;
    Object.assign(couponsData, res.data);
    buttonShow.value = res.data.buttonShow;
    // getCouponUseRange(couponsData);
  });
  api.vip.getBirthday().then(res => {
    if (res.code) return;
    Object.assign(birthday, res.data);
  });
};

const setValidMin = (arr: VipAPI.ActivityLevelList[]) => {
  if (arr.length) {
    const maxIndex =
      (userState.userInfo.mbrLevel as number) + 1 > arr.length - 1
        ? arr.length - 1
        : (userState.userInfo.mbrLevel as number) + 1;
    // promoteSign 0 累计投注 1 累计充值 2全部
    const { depositMin, validbetMin, promoteSign } = arr[maxIndex];
    depositMinShow.value = !!(depositMin || depositMin === 0) && [1, 2].includes(promoteSign);
    validbetMinShow.value = !!(validbetMin || validbetMin === 0) && [0, 2].includes(promoteSign);
  }
};

const getCouponUseRange = (activeCoupon: VipAPI.accountVipPrivilegesData) => {
  if (Object.keys(activeCoupon).length && activeCoupon.rule) {
    ruleScopeDtos.length = 0;
    ruleScopeDtos.push(...JSON.parse(activeCoupon.rule).ruleScopeDtos);

    const auditCatsItem = ruleScopeDtos.filter(_ => _.accountLevel === nowVipLevel.value);
    const { depotCatDtoList } = activeCoupon;

    return (
      auditCatsItem[0] &&
      auditCatsItem[0].auditCats.map(({ catId, depots }) => {
        const catName = depotCatDtoList.find(_ => _.catId === catId)?.catName;
        return {
          catId,
          catName,
          depots:
            depots &&
            depots
              .map(({ depotId }) => depotCatDtoList.find(_ => _.catId === catId && _.depotId === depotId))
              .filter(_ => !!_),
        };
      })
    );
  }
};

//- 生日礼金领取
const birthdayBtn = async () => {
  const res = await api.vip.getActApply({ activityId: birthday.activityId });
  if (res.code === 0) {
    birthdayFlog.value = false;
    proxy.$_tip.show({
      mainContent: lang('生日礼金领取成功！'),
      SubContent: lang('可在交易记录中查询领取进度，或联系客服查询。'),
    });
    birthday.isBirthday = false;
  } else {
    proxy.$_tip.show({
      mainContent: lang('生日礼金领取失败'),
      SubContent: lang('请联系客服查询。'),
    });
  }
};

const validbetMinValue = computed(() => {
  if (Object.keys(userState.vipData).length) {
    if (userState.vipData.accountLevel === 10) return 100;

    if (
      userState.vipData.validbet > userState.vipData.activityLevelList[userState.vipData.accountLevel + 1].validbetMin
    ) {
      return 100;
    } else {
      return (
        (userState.vipData.validbet /
          userState.vipData.activityLevelList[userState.vipData.accountLevel + 1].validbetMin) *
        100
      );
    }
  }
  return 100;
});

const dataArray = computed(() => {
  return getCouponUseRange(couponsData);
});

const btnClick = async () => {
  const res = await api.vip.getActApply({ activityId: couponsData.id, catId: venueName.value });
  if (res.code === 0) {
    api.vip.getVipPrivileges().then((res: VipAPI.accountVipPrivilegesRes) => {
      if (res.code === 0) {
        Object.assign(couponsData, res.data);
        buttonShow.value = res.data.buttonShow;
        getCouponUseRange(couponsData);
      }
    });
    messageTip({ message: lang('领取成功') });
  } else {
    messageTip({ message: res.msg });
  }
};

const getValidbet = (type: string, fromRate = false) => {
  if (Object.keys(userState.vipData).length) {
    let filterVal = null;
    if (userState.vipData.accountLevel === userState.vipData.activityLevelList.length - 1) {
      // 最高级
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
    if (type === 'top') return filterVal.depositMin;
    if (fromRate) return Math.min(userState.vipData.validbet / filterVal.validbetMin, 1);
    return filterVal.validbetMin;
  }
  return null;
};

/* 礼品 */
const giftList = [
  { title: lang('节日礼品'), desc: lang('VIP5享有'), icon: 'vip_gift_1' },
  { title: lang('商务秘书'), desc: lang('VIP6享有'), icon: 'vip_gift_2' },
  { title: lang('奢华旅游'), desc: lang('VIP7享有'), icon: 'vip_gift_3' },
];

const levelBg = `url(${useImgPath('profile/vip_bg.png')})`;
</script>

<style lang="scss" scoped>
.exclusive-vip {
  padding: 10px 0 28px !important;
  font-size: 16px;

  .banner {
    width: 100%;
    height: 330px;
  }

  .header {
    position: relative;

    .header_top {
      @include flex(flex-start);

      .header-left {
        .normal-show-container {
          @include flex(flex-start);

          .level-bg {
            width: 100px;
            height: 92px;
            background-image: v-bind(levelBg);
            background-size: 100% 100%;
            position: relative;

            .level-num {
              position: absolute;
              bottom: 8px;
              left: 50%;
              top: 18px;
              transform: translateX(-50%);
              color: var(--u_v_19);
              font-size: 36px;
            }
          }

          .level-txt {
            font-size: 28px;
            font-weight: bold;
            color: var(--u_v_18);
            margin-left: 20px;
          }
        }

        img {
          width: 100%;
          height: auto;
        }
      }

      .birthday_icon {
        margin-left: 84px;
        position: relative;
        cursor: pointer;

        span {
          font-size: 13px;
          font-weight: 600;
          color: var(--u_v_18);
          position: absolute;
          left: 29px;
          bottom: 12px;
          width: 100%;
        }
      }

      .header_top_pos {
        position: absolute;
        color: var(--u_v_17);
        font-size: 24px;
        right: 0px;
        cursor: pointer;
        top: 5px;
      }
    }

    .header_bottom {
      margin-top: 40px;
      @include flex(flex-start, column);

      .row-right {
        @include flex();
        font-size: 20px;
        color: var(--u_v_20);

        .vip_bg {
          margin-left: 6px;
          width: 52px;
          height: 18px;
          @include flex(center);
          font-size: 16px;
          background: var(--u_v_21);
          border-radius: 5px;
          color: var(--u_v_15);

          img {
            width: 33px;
            margin-right: 2px;
          }
        }
      }
    }

    .line-row {
      width: 940px;
      margin-top: 14px;

      .level_container {
        width: 100%;
        padding: 0 5px;
        @include flex();
        margin-top: 12px;
        font-size: 20px;
        color: var(--u_v_18);
        font-weight: 600;
      }
    }
  }
}

:deep(.el-select) {
  width: 420px;
  height: 40px;

  .el-input__inner {
    font-size: 16px;
    color: #646464;
    text-align: center;
    text-align: left;
    font-size: 14px;
    height: 40px;

    &::-webkit-input-placeholder {
      color: var(--u_v_18);
      text-align: center;
    }
  }

  .el-input__wrapper,
  .el-input.is-focus .el-input__wrapper {
    box-shadow: var(--u_v_22) !important;
  }

  .el-input .el-select__caret {
    color: var(--u_v_18);
    font-size: 18px;
    font-weight: bold;
  }
}

.data-box {
  background-color: var(--u_v_12);
  border-radius: 10px;
  padding: 20px 30px 35px;
  margin: 18px 20px;

  .data_box_title {
    @include flex(flex-start);
    margin-bottom: 33px;

    & > span {
      color: var(--u_v_18);
      font-size: 26px;
      font-weight: 500;
      margin-right: 10px;
    }

    .data_box_desc {
      @include flex(flex-start);
      background: var(--u_v_23);
      width: 274px;
      height: 30px;
      border-radius: 15px;
      font-size: 20px;
    }
  }

  &.vip-box {
    &:nth-child(3) {
      padding-bottom: 39px;
    }
  }

  .dark-bg {
    // background: rgba($c-22, 0.3);
    border-radius: 4px;
    height: 35px;
    line-height: 35px;
    box-sizing: border-box;
    min-width: 120px;
    text-align: center;
  }

  .box-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--u_v_18);

    &.vip-title {
      text-align: center;
      line-height: 40px;
      height: 40px;
      background: var(--u_v_24);
      border-radius: 10px 10px 0px 0px;
    }
  }

  .box-no-data {
    text-align: center;
    margin-bottom: 20px;
    color: #f2c488;
  }

  .box-no-data-div {
    text-align: center;

    span {
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #f2c488;
      color: #f2c488;
      cursor: pointer;
    }
  }
}

.text-center {
  text-align: center;

  &.vip-center {
    padding: 15px 15px 20px;
    background-color: var(--u_v_15);
    border-radius: 0 0 10px 10px;
    &.no-border {
      border-radius: 0;
    }
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.pl-0,
.px-0 {
  padding-left: 0;
}

.pr-0,
.px-0 {
  padding-right: 0;
}

.col {
  position: relative;
  flex-grow: 1;
  flex-basis: 0;
}

.vip-ico-wrap {
  max-height: 50px;

  .img-fluid {
    height: 50px;
    max-width: 100%;
  }
}

.font-weight-bolder,
.vip-promote {
  margin-top: 5px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  color: var(--u_v_18);
}

.fs-0-7 {
  text-align: center;
  color: var(--u_v_17);
  font-size: 14px;
  height: 32px;
}

.vip-promote-label {
  font-size: 14px;
  text-align: center;
}

.bottom-btn-group {
  padding: 30px 30px 39px;
  @include flex(flex-start);
  position: relative;
  background-color: var(--u_v_15);
  border-radius: 0 0 10px 10px;

  &:before {
    height: 1px;
    width: 90%;
    transform: translateX(-50%);
    background: var(--u_v_25);
    position: absolute;
    top: 0;
    left: 50%;
    content: '';
    opacity: 0.6;
  }

  .g-button {
    margin: 0 auto;
  }

  .venue {
    margin-left: 40px;

    .venue-btn {
      width: 152px;
      height: 40px;
      background: var(--u_v_26);
      border-radius: 6px;
      font-weight: 600;
    }
  }
}

.dialog-div {
  :deep(.el-dialog) {
    width: 600px !important;
  }

  .el-dialog__body {
    height: 521px !important;
    box-sizing: border-box;
    overflow-y: auto;
  }
}

.unbing-time-div {
  text-align: center;
  font-size: 16px;
}

.unbing-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;

  .unbing-div {
    display: inline-block;
    width: 160px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px dashed #000;
    margin-right: 20px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
}

.birthday-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;

  .birthday-bg {
    position: fixed;
    display: inline-block;
    width: 400px;
    height: 510px;
    top: 23%;
    left: 50%;
    transform: translateX(-50%);
  }

  .close-dialog-btn {
    position: absolute;
    right: -40px;
    top: 0;
    font-size: 35px;
    cursor: pointer;
  }

  .birthday-inner-box {
    position: fixed;
    width: 400px;
    height: 510px;
    top: 23%;
    left: 50%;
    transform: translateX(-50%);

    .birthday-inner {
      width: 300px;
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
    }
  }

  .div-while {
    color: var(--u_v_1);
  }

  .div-color {
    font-size: 14px;
    color: var(--u_v_1);

    .gold-text {
      color: var(--u_v_2);
      font-size: 16px;
    }

    &.bless {
      color: var(--u_v_2);
      font-weight: bold;
      font-size: 18px;
    }
  }

  .div-btn {
    margin-top: 10px;
    margin: 10px auto 0;
    width: 200px;
    height: 35px;
    line-height: 35px;
    border-radius: 50px;
    background: var(--u_v_3);
    font-size: 18px;
    color: var(--u_v_4);
    font-weight: bold;
    cursor: pointer;
  }
}

.validbet-progress {
  :deep(.el-progress-bar__inner) {
    background: linear-gradient(270deg, #77a2c1 0%, #5884b8 100%);
  }
}

/* 礼物 */
.gift-title {
  @include flex(flex-start);
  padding-left: 20px;

  img {
    width: 35px;
    height: 35px;
    margin-right: 3px;
  }

  span {
    font-size: 26px;
    color: var(--u_v_9);
    font-weight: 500;
  }
}

.gift-container {
  @include flex();

  .gift-list {
    width: 315px;
    height: 150px;
    margin-top: 30px;
    background: var(--u_v_15);
    border: 2.94516px solid var(--u_v_15);
    box-shadow: var(--u_v_16);
    backdrop-filter: blur(5.15402px);
    border-radius: 7.36289px;
    position: relative;
    @include flex(flex-start, column, wrap, flex-start);
    padding: 20px 0 0 20px;

    span {
      color: var(--u_v_17);
      font-size: 14px;
      font-weight: 500;

      &:first-child {
        color: var(--u_v_18);
        font-size: 20px;
        font-weight: bold;
      }
    }

    img {
      width: 191px;
      // height: 159px;
      position: absolute;
      right: 0;
      bottom: -25px;
    }
    &:last-child {
      img {
        bottom: -35px;
      }
    }
  }
}

//- 2好模块差异
.exclusive-vip {
  &.template_2_002 {
    .data-box {
      .header {
        .header_top {
          .header-left {
            .level-num {
              color: #ea4e3d;
            }
          }
          .header_top_pos {
            background: linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .header_bottom {
          .row-right {
            .vip_bg {
              color: #fff;
            }
          }
          .line-row {
            &:deep(.el-progress-bar__inner) {
              background: linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%) !important;
            }
          }
        }
      }
      .data_box_title {
        .data_box_desc {
          color: #fff;
        }
      }
      .bottom-btn-group {
        &:before {
          background: linear-gradient(
            270deg,
            rgba(228, 231, 244, 0) 0%,
            #cdd3f1 52.58%,
            rgba(229, 232, 249, 0) 102.03%
          ) !important;
        }
        &:deep(.el-select) {
          .el-input__wrapper {
            background: #161e2b;
            box-shadow: none !important;
            .el-input__inner {
              color: #fff;
            }
          }
        }
        .venue {
          .venue-btn {
            border: 0px;
          }
        }
      }
      .vip_table {
        &:deep(.vipinfo-inner) {
          border-bottom: 1px solid #273546;
          .vipinfo-inner-level {
            box-shadow: none;
            background: #1d2936;
          }
        }
      }
      .gift-container {
        .gift-list {
          img {
            width: 191px;
            height: 150px;
            top: 0px;
          }
          &:nth-child(2) {
            img {
              top: -5px;
            }
          }
        }
      }
    }
  }
  &.vi,
  &.ms,
  &.en {
    .gift-list {
      span:nth-child(1) {
        font-size: 15px;
      }
      span:nth-child(2) {
        font-size: 13px;
      }
    }
  }
  &.template_2_003 {
    .line-row {
      &:deep(.el-progress-bar__inner) {
        background: #fd8803 !important;
      }
    }
    .vip-center {
      box-shadow: 0px 4px 14px rgba(207, 212, 225, 0.4);
      border: 0.5px solid #e6e8f3;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .data_box_desc {
      img {
        width: 24px;
        margin: 0 3px;
      }
    }
    .exclusive {
      box-shadow: 0px 4px 14px rgba(207, 212, 225, 0.4);
      border: 0.5px solid #e6e8f3;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      .vip-center {
        box-shadow: none;
        border: none;
        border-radius: 0;
      }
      .bottom-btn-group {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        &:deep(.el-select) {
          .el-input__wrapper {
            border: 0.5px solid #e6e8f3;
            border-radius: 8px;
          }
        }
        .venue {
          .venue-btn {
            border: none;
            background: linear-gradient(135deg, #ffb762 0%, #fd8803 100%);
          }
        }
      }
    }
    .data-box {
      padding: 20px 20px 35px;
      .gift-list {
        div {
          &:first-child {
            color: #414655;
          }
        }
      }
    }
  }
}
</style>
