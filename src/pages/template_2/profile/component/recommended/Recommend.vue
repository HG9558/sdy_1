<template>
  <div>
    <div :class="['recommend-wrapper', site]">
      <div :class="['amount-wrapper', globalState.language]">
        <div class="item">
          <div class="amount-inner">
            <div class="title">{{ $t_c('昨日收益') }}({{ envState.vite_currency_map.value }})</div>
            <div class="amount">￥{{ rebateSummary.ydActualReward }}</div>
            <div class="cumulativeAmount">
              {{ $t_c('累计金额') }}：{{ rebateSummary.sumActualReward }} {{ envState.vite_currency_map.value }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="amount-inner">
            <div class="title">{{ $t_c('昨日首存款返利') }}({{ envState.vite_currency_map.value }})</div>
            <div class="amount">￥{{ rebateSummary.ydFirstChargeReward }}</div>
            <div class="cumulativeAmount">
              {{ $t_c('累计金额') }}：{{ rebateSummary.sumFirstChargeReward }} {{ envState.vite_currency_map.value }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="amount-inner">
            <div class="title">{{ $t_c('昨日有效投注额返利') }}({{ envState.vite_currency_map.value }})</div>
            <div class="amount">￥{{ rebateSummary.ydValidBetReward }}</div>
            <div class="cumulativeAmount">
              {{ $t_c('累计金额') }}：{{ rebateSummary.sumValidBetReward }} {{ envState.vite_currency_map.value }}
            </div>
          </div>
        </div>
        <div class="btns">
          <div class="top">
            <button :class="['btn top-btn', globalState.language]" @click="emit('openDialog', 'rule')">
              {{ $t_c('规则说明') }}
            </button>
            <button :class="['btn top-btn', globalState.language]" @click="emit('openDialog', 'proportion')">
              {{ $t_c('比例') }}
            </button>
          </div>
          <div class="bottom">
            <button
              :class="['btn friend_bottom_btn', globalState.language]"
              @click="emit('currentComponentNameClick', 'MyFriend')">
              {{ $t_c('我的好友') }}
            </button>
            <button :class="['btn friend_bottom_btn', globalState.language]" @click="emit('openDialog', 'promote')">
              {{ $t_c('立即推广') }}
            </button>
          </div>
        </div>
      </div>
      <div class="daily-earnings">
        <div class="earnings-title">
          <div>{{ $t_c('收益日报') }}</div>
          <div class="more" @click="emit('currentComponentNameClick', 'GetMore')">{{ $t_c('更多') }}>></div>
        </div>
        <!-- 表格组件 -->
        <div class="line"></div>
        <common-table :loading="loading" :showPagination="false" :tableData="tableData" :tableLabel="tableLabel" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CommonTable from './CommonTable.vue';
import { dataTime } from '@/hook/useAuth';
import { ref, reactive, onMounted, computed } from 'vue';
import { api } from '@/api';
import { lang } from '@/i18n';
import { useSite } from '@/hook/usePath';
// import { useGlobalState,useEnvState } from '@/stores';

const site = useSite();
const emit = defineEmits(['currentComponentNameClick', 'openDialog']);
const tableList = ref<FriendAPI.getFriendRebateRewardReportForDayList[]>([]);
const globalState = useGlobalState();
const loading = ref(false);
const envState = useEnvState()
const tableLabel = [
  { label: lang('时间'), prop: 'time' },
  { label: lang('好友数量'), prop: 'num' },
  { label: lang('首存收益'), prop: 'firstChargeReward' },
  { label: lang('投注收益'), prop: 'validBetReward' },
];

const rebateSummary = reactive<{ [key: string]: number | string }>({
  ydActualReward: '0.00',
  ydFirstChargeReward: '0.00',
  ydValidBetReward: '0.00',
  sumActualReward: '0.00',
  sumFirstChargeReward: '0.00',
  sumValidBetReward: '0.00',
});

const tableData = computed(() => {
  return tableList.value.map((item: FriendAPI.getFriendRebateRewardReportForDayList) => {
    item.num = item.num + +`(${item.rnum})`;
    return item;
  });
});

onMounted(() => {
  _getFriendRebateRewardReportForDay();
  _getFriendRebateSummary();
});

const _getFriendRebateSummary = async () => {
  const res = await api.friendsRecommend.getFriendRebateSummary();
  if (res.code) return;
  Object.keys(res.msg).forEach(key => {
    rebateSummary[key as keyof typeof rebateSummary] = res.msg[key as keyof typeof res.msg] ?? '0.00';
  });
};
const _getFriendRebateRewardReportForDay = async () => {
  loading.value = true;
  const startTime = new Date();
  startTime.setHours(0, 0, 0);
  startTime.setFullYear(new Date().getFullYear() - 1);
  const res = await api.friendsRecommend.getFriendRebateRewardReportForDay({
    pageNo: 1,
    pageSize: 10,
    startTime: dataTime(startTime.getTime().toString(), 'Y-M-D H:i:s'),
    endTime: dataTime(
      new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime().toString(),
      'Y-M-D H:i:s'
    ),
  });
  loading.value = false;
  if (res.code) return;
  tableList.value = res.msg.list.reverse();
};
</script>

<style lang="scss" scoped>
.recommend-wrapper {
  margin: 20px;
  .amount-wrapper {
    height: 185px;
    border: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 31px 30px;
    box-sizing: border-box;
    background: var(--u_friend_15);
    border-radius: 10px;
    &:not(.zh, .zh_tw) {
      .item {
        margin-right: 15px;
      }

      &.vi {
        .title {
          font-size: 12px;
        }
        .cumulativeAmount {
          font-size: 12px;
        }
      }
    }
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        font-size: 16px;
        color: var(--u_friend_1);
      }
      .cumulativeAmount {
        font-size: 14px;
        color: var(--u_friend_3);
      }
      .amount {
        font-size: 24px;
        color: var(--u_friend_2);
        font-weight: 600;
        margin: 10px 0;
      }
      &:after {
        display: flex;
        content: '';
        width: 1px;
        height: 130px;
        background: var(--u_friend_7);
        margin-left: 20px;
      }
    }
    .btns {
      color: var(--u_friend_6);
      width: 19%;
      font-size: 12px;
      .top {
        display: flex;
      }
      .bottom {
        display: flex;
      }
      .btn {
        width: 80px;
        height: 36px;
        border: 1px solid var(--u_friend_4);
        background-color: transparent;
        border-radius: 4px;
        text-align: center;
        font-weight: 600;
        &.top-btn {
          color: var(--u_friend_5);
          &:nth-child(2) {
            margin-left: 10px;
          }
        }
        &.vi {
          width: 90px !important;
        }
        &.friend_bottom_btn {
          width: 82px;
          height: 38px;
          background: var(--u_friend_14);
          border-color: 0;
          margin-top: 20px;
          color: var(--u_friend_6);
          &:nth-child(2) {
            margin-left: 10px;
          }
        }
      }
    }
  }
  .daily-earnings {
    margin-top: 40px;
    padding: 20px;
    background: var(--u_friend_15);
    border-radius: 10px;
    .earnings-title {
      display: flex;
      justify-content: space-between;
      color: var(--u_friend_8);
      cursor: pointer;
      font-size: 18px;
      .more {
        font-size: 16px;
        font-weight: 500;
        color: var(--u_friend_14);
      }
    }
    .line {
      margin: 15px 0;
      opacity: 0.1;
      border: 1px solid var(--u_friend_16);
      width: 100%;
      height: 1px;
    }
  }
}

.recommend-wrapper {
  &.template_2_002 {
    .amount-wrapper {
      .item {
        .amount-inner {
          .amount {
            background: linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
        }
      }
      .btns {
        .bottom {
          .friend_bottom_btn {
            border: none;
          }
        }
      }
    }
    .daily-earnings {
      .earnings-title {
        .more {
          background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
}
</style>
