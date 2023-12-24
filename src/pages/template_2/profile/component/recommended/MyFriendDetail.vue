<template>
  <div :class="['my-friend-detail-wrapper', site]">
    <div class="friend-account">
      <div class="account-info">
        <div class="account-info_left">
          <img :src="useImgPath(`profile/friend_detail_avatar.png`)" />
          <div>
            <div class="friend-name">
              <span>{{ friendDetailData.subLoginName || '' }}</span>
              <div class="vip-lvl">
                <img :src="useImgPath('user/header_vip_icon.png')" alt="" />
                <span>{{ friendDetailData.vipLevel }}</span>
              </div>
            </div>
            <div class="logo-date">{{ $t_c('最近登陆') }}：{{ friendDetailData.lastLoginTime }}</div>
          </div>
        </div>
        <div :class="['account-info_right', globalState.language]">
          <div class="box">
            <div class="box-title">{{ $t_c('首存金额') }}</div>
            <div>{{ envState.vite_currency_map.symbol }} {{ friendDetailData.firstCharge || '0.00' }}</div>
          </div>
          <div class="box">
            <div class="box-title">{{ $t_c('累计充值') }}</div>
            <div>{{ envState.vite_currency_map.symbol }} {{ friendDetailData.totalDeposit || '0.00' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="statistics-time">
      <div class="date-title">{{ $t_c('收益统计时间') }}</div>
      <div class="line"></div>
      <div class="date-search">
        <el-date-picker
          type="daterange"
          range-separator="-"
          :start-placeholder="$t_c('开始日期')"
          :end-placeholder="$t_c('结束日期')"
          v-model="timeList"
          :clearable="false"
          :prefix-icon="customPrefix"></el-date-picker>
        <div class="search-btn-group">
          <div class="btn search-btn" @click="search">{{ $t_c('查询') }}</div>
          <div class="btn reset-btn" @click="reset">{{ $t_c('重置') }}</div>
        </div>
      </div>
      <div :class="['date-box', globalState.language]">
        <div
          v-for="(item, index) in dateList"
          :key="index"
          @click="chooseBtn(item.type, index)"
          :class="{ btn: true, on: currentIndex === index }">
          {{ item.name }}
        </div>
      </div>

      <div class="record-list-container">
        <div :class="`record-list-item record-list-item-${index + 1}`" v-for="(item, index) in recordList" :key="index">
          <span class="record-list-text">
            {{ item.txt }} ( {{ envState.vite_currency_map[globalState.language === 'zh' ? 'value' : 'type'] }})
          </span>
          <span class="record-list-number">
            {{ item.money && item.money.toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getTime, dataTime } from '@/hook/useAuth';
import { ref, reactive, onMounted, shallowRef, h } from 'vue';
// import { useEnvState, useGlobalState } from '@/stores';
import { api } from '@/api';
import { useImgPath } from '@/hook/usePath';
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';

const site = useSite();
const customPrefix = shallowRef({
  render() {
    return h('p', '');
  },
});
const globalState = useGlobalState();
const envState = useEnvState()
const dateList = ref([
  {
    name: lang('昨天'),
    type: '昨天',
  },
  {
    name: lang('本周'),
    type: '本周',
  },
  {
    name: lang('上周'),
    type: '上周',
  },
  {
    name: lang('本月'),
    type: '本月',
  },
]);
const currentIndex = ref(0);
const timeList = ref(getTime('昨天'));
const timer = ref<string[]>([]);
const recordList = ref([
  { txt: lang('真人'), money: 0, label: 'zrValidBetReward' },
  { txt: lang('电子'), money: 0, label: 'dzValidBetReward' },
  { txt: lang('电竞'), money: 0, label: 'djValidBetReward' },
  { txt: lang('体育'), money: 0, label: 'tyValidBetReward' },
  { txt: lang('棋牌'), money: 0, label: 'qpValidBetReward' },
  { txt: lang('彩票'), money: 0, label: 'cpValidBetReward' },
]);
const friendDetailData = reactive({} as FriendAPI.getFriendRebateDetailsMsg);

onMounted(() => {
  timer.value[0] = timeList.value[0] + ' 00:00:00';
  timer.value[1] = timeList.value[1] + ' 23:59:59';
  _getFriendRebateDetails({
    startTime: timer.value[0],
    endTime: timer.value[1],
  });
});

const chooseBtn = (name: string, index: number) => {
  currentIndex.value = index;
  timeList.value = getTime(name);
  timer.value = [];
  timer.value[0] = timeList.value[0] + ' 00:00:00';
  timer.value[1] = timeList.value[1] + ' 23:59:59';

  _getFriendRebateDetails({
    startTime: dataTime(timeList.value[0] + ' 00:00:00'),
    endTime: dataTime(timeList.value[1] + ' 23:59:59'),
  });
};

const _getFriendRebateDetails = async (data: { startTime: string; endTime: string }) => {
  data.startTime = data.startTime.split(' ')[0] + ' 00:00:00';
  data.endTime = data.endTime.split(' ')[0] + ' 23:59:59';
  const res = await api.friendsRecommend.getFriendRebateDetails({
    subLoginName: globalState.subLoginName,
    ...data,
  });
  if (res.code) return;
  if (res.msg) {
    Object.assign(friendDetailData, res.msg);
    recordList.value.forEach(item => {
      item.money = friendDetailData[item.label as keyof typeof friendDetailData] || 0;
    });
  }
};
//- 查询好友详情
const search = () => {
  if (typeof timeList.value[0] === 'string') {
    _getFriendRebateDetails({
      startTime: dataTime(timeList.value[0] + ' 00:00:00'),
      endTime: dataTime(timeList.value[1] + ' 23:59:59'),
    });
  } else {
    _getFriendRebateDetails({
      startTime: dataTime(timeList.value[0]),
      endTime: dataTime(timeList.value[1]),
    });
  }
};
const reset = () => {
  timeList.value = getTime('昨天');
  currentIndex.value = 0;
};

const real = `url(${useImgPath('profile/friend_detail_real.png')})`;
const elec = `url(${useImgPath('profile/friend_detail_elec.png')})`;
const esport = `url(${useImgPath('profile/friend_detail_esport.png')})`;
const sport = `url(${useImgPath('profile/friend_detail_sport.png')})`;
const chesse = `url(${useImgPath('profile/friend_detail_chesse.png')})`;
const lottery = `url(${useImgPath('profile/friend_detail_lottery.png')})`;
</script>

<style lang="scss" scoped>
.my-friend-detail-wrapper {
  .friend-account {
    width: 100%;
    background: var(--u_friend_17);
    border-radius: 16px;
    padding: 20px 20px;
    box-sizing: border-box;
    margin-top: 20px;
    .account-info {
      display: flex;
      justify-content: space-between;
      .account-info_left {
        display: flex;
        align-items: center;
        img {
          width: 88px;
          margin-right: 20px;
        }
        .friend-name {
          color: var(--u_friend_31);
          font-size: 18px;
          display: flex;
          align-items: center;
          .vip-lvl {
            width: 35px;
            height: 16px;
            background: var(--u_friend_33);
            background-position: 3px center;
            border-radius: 7px;
            font-size: 12px;
            font-weight: 500;
            color: var(--h_u_5);
            background-size: 15px 9px;
            @include flex(center);
            padding-right: 5px;
            margin-left: 10px;
            padding-left: 2px;
            img {
              width: 15px;
              margin-right: 2px;
            }
          }
        }
        .logo-date {
          color: var(--u_friend_32);
          margin-top: 7px;
        }
      }
      .account-info_right {
        display: flex;
        color: var(--u_friend_34);
        font-weight: 600;
        font-size: 18px;
        &:not(.zh, .zh_tw) {
          .box {
            width: auto;
            padding: 0 10px;
          }
        }
        .box {
          width: 130px;
          height: 80px;
          border: 1px solid var(--u_friend_32);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .box-title {
            color: var(--u_friend_35);
            font-size: 14px;
            margin-bottom: 8px;
            font-weight: 500;
          }
          &:first-child {
            margin-right: 20px;
          }
        }
      }
    }
  }
  .statistics-time {
    width: 100%;
    background: var(--u_friend_17);
    border-radius: 16px;
    padding: 20px 20px;
    box-sizing: border-box;
    margin-top: 20px;
    .date-title {
      color: var(--u_friend_30);
      font-weight: 500;
      font-size: 18px;
    }
    .line {
      margin: 15px 0 20px;
      height: 1px;
      background-color: var(--u_friend_36);
      opacity: 0.1;
      width: 100%;
    }
    .date-search {
      display: flex;
      align-items: center;
      &:deep(.el-date-editor) {
        width: 300px;
        height: 40px;
        flex-grow: 0;
        border: 1px solid var(--u_friend_32);
        border-radius: 8px;
      }
      .search-btn-group {
        margin-left: 30px;
        display: flex;
        align-items: center;
        .btn {
          width: 134px;
          height: 40px;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          line-height: 40px;
          color: var(--u_friend_26);
          margin-right: 18px;
          font-weight: 600;
        }
        .search-btn {
          background: var(--u_friend_25);
        }
        .reset-btn {
          background: var(--u_friend_27);
        }
      }
    }
    .date-box {
      display: flex;
      align-items: center;
      margin-top: 20px;
      &:not(.zh, .zh_tw) {
        .btn {
          width: auto;
          padding: 0 10px;
        }
      }
      .btn {
        border-radius: 4px;
        margin-right: 10px;
        width: 62px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0px 4px 18px rgba(207, 212, 225, 0.54);
        color: var(--u_friend_30);
        &.on {
          background: var(--u_friend_25);
          color: var(--u_friend_26);
        }
      }
    }
  }
  .record-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 40px;
    .record-list-item {
      margin-bottom: 20px;
      width: 32%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      box-sizing: border-box;
      padding: 20px 0 0 20px;
      position: relative;
      background-size: 100% 100%;
      color: var(--u_friend_26);
      .record-list-text {
        font-size: 16px;
      }
      .record-list-number {
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 28px;
        line-height: 39px;
      }
    }
  }
}

//-2号模板差异
.my-friend-detail-wrapper {
  &.template_2_002 {
    .friend-account {
      .account-info {
        .logo-date {
          color: #878ea6;
        }
        .friend-name {
          .vip-lvl {
            background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
          }
        }
        .account-info_right {
          .box {
            border: 1px solid #22a7fe;
            .box-title {
              color: #fff;
            }
            div {
              &:last-child {
                background: linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }
      }
    }
    .statistics-time {
      .date-search {
        &:deep(.el-date-editor) {
          background: #161e2b;
          border: 1px solid transparent;
          box-shadow: none;
          .el-icon {
            color: #fff;
          }
          .el-range-input {
            color: #fff;
            &::-webkit-input-placeholder {
              color: #fff !important;
            }
          }
          .el-range-separator {
            color: #fff;
          }
        }
      }
      .date-box {
        .btn {
          box-shadow: none;
          background: #3d5477;
          &.on {
            background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
          }
        }
      }
    }
  }
  &.template_2_003 {
    .statistics-time {
      .date-search {
        &:deep(.el-date-editor) {
          border: 1px solid #e6e9f1;
        }
      }
      .date-box {
        .btn {
          &.on {
            background: linear-gradient(135deg, #ffb762 0%, #fd8803 100%);
          }
        }
      }
    }
    .friend-account {
      .account-info_left {
        .logo-date {
          color: #505679;
        }
      }
    }
  }
}
.record-list-item {
  &.record-list-item-1 {
    background-image: v-bind(real);
  }
  &.record-list-item-2 {
    background-image: v-bind(elec);
  }
  &.record-list-item-3 {
    background-image: v-bind(esport);
  }
  &.record-list-item-4 {
    background-image: v-bind(sport);
  }
  &.record-list-item-5 {
    background-image: v-bind(chesse);
  }
  &.record-list-item-6 {
    background-image: v-bind(lottery);
  }
}
</style>
