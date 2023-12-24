<template>
  <div :class="['top-div', 'transaction-wrapper', site]">
    <span class="date-span">{{ $t_c('日期') }}:</span>
    <div class="filter-content">
      <div class="date-div">
        <el-date-picker
          class="date-picker"
          v-model="timer"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t_c('开始日期')"
          :end-placeholder="$t_c('结束日期')"
          :default-time="[
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59),
          ]"
          :clearable="false">
        </el-date-picker>
        <el-button @click="queryBtnClick" class="inquire">{{ $t_c('查询') }}</el-button>
      </div>
      <div class="date-box">
        <div class="date-btn" v-for="(item, index) in dateBtnArr" :key="index">
          <button @click="chooseBtn(item.type, index)" :class="{ 'btn-active': active === index }">
            {{ item.name }}
          </button>
        </div>
      </div>
    </div>

    <div class="transaction-type-items">
      <div class="no-data-div">
        <span
          :class="{ 'active-span': activeSpan === item.mark }"
          v-for="item in tranList"
          :key="item.mark"
          style="position: relative"
          @click="changeSpan(item)">
          {{ item.name }}
          <span class="bot"></span>
        </span>
      </div>
      <div class="bottom-div-inner">
        <deposit v-if="activeSpan === 0 && tableData.length !== 0" :tableData="tableData" @reloadTable="getDataList" />
        <withdrawal
          v-if="activeSpan === 1 && tableData.length !== 0"
          :tableData="tableData"
          :time="remindersTime"
          @getDataList="getDataList" />
        <reward v-if="activeSpan === 2 && tableData.length !== 0" :tableData="tableData" />
        <discount v-if="activeSpan === 3 && tableData.length !== 0" :tableData="tableData" />
        <rebate v-if="activeSpan === 4 && tableData.length !== 0" :tableData="tableData" />
        <LastRebate v-if="activeSpan === 5 && tableData.length !== 0" :tableData="tableData" />
        <div class="no-data-img" v-if="shwoNodata">
          <emptyVue :imgWidth="210"></emptyVue>
          <span class="no-data-text">{{ $t_c('暂无数据') }}</span>
        </div>

        <SelfLoading class="no-data-gif" :showLoading="showLoading" />
      </div>
      <div class="pagination-container" v-if="!!tableData.length">
        <PaginationComponent class="pagination-class" :pagination="paginationList" @change="paginationChange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PaginationComponent from 'commonComponent/Pagination/index.vue';
import { getTime, dataTime } from '@/utils';
import reward from './component/transaction/reward.vue';
import deposit from './component/transaction/deposit.vue';
import withdrawal from './component/transaction/withdrawal.vue';
import rebate from './component/transaction/rebate.vue';
import discount from './component/transaction/discount.vue';
import LastRebate from './component/transaction/LastRebate.vue';
import emptyVue from 'commonComponent/empty/empty.vue';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { api } from '@/api';
import { lang } from '@/i18n';
import { useSite } from '@/hook/usePath';

const site = useSite();
const showLoading = ref<boolean>(false);
const shwoNodata = ref<boolean>(false);
const active = ref<number>(0);
const activeSpan = ref<number>(0);
const paginationTotal = ref<number>(0);
const remindersTime = ref<number>(0);
const tableData = reactive<DepositType.requestApiListDataList[]>([]);
const timeList: string[] = getTime('今天');

const search = reactive({
  key: '',
  current: 1,
  limit: 10,
});
const dateBtnArr = [
  { name: lang('今天'), type: '今天' },
  { name: lang('三天内'), type: '三天内' },
  { name: lang('一周内七天'), type: '一周内七天' },
  { name: lang('近30天'), type: '近30天' },
];

const tranList = [
  { name: lang('充值'), mark: 0 },
  { name: lang('提现'), mark: 1 },
  { name: lang('优惠'), mark: 3 },
  { name: lang('奖补'), mark: 2 },
  { name: lang('返水'), mark: 4 },
  { name: lang('返利'), mark: 5 },
];

const timer = ref<(string | Date)[]>([
  new Date(new Date(new Date().toLocaleDateString()).getTime()),
  new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1),
]);

onMounted(() => getDataList());

const getDataList = async () => {
  tableData.length = 0;
  let data: DepositType.requestApiListParams = {
    pageSize: search.limit,
    pageNo: search.current,
    startTime: dataTime(timer.value[0], 'Y-m-d H:i:s'),
    entTime: dataTime(timer.value[1], 'Y-m-d H:i:s'),
  };
  shwoNodata.value = false;
  showLoading.value = true;
  const requestApiList = [
    'getTransactionDataList',
    'getwdAppRecordList',
    'getTransactionDataList',
    'getBonusListList',
    'getdepotWaterDetailList',
    'rewardList',
  ];

  (activeSpan.value === 0 || activeSpan.value === 2) && (data.mark = activeSpan.value);
  try {
    const res = (await api.deposit[requestApiList[activeSpan.value] as keyof typeof api.deposit](data as any)) as
      | DepositType.requestApiListRes
      | DepositType.wdApplyListRes
      | DepositType.depotWaterDetailListRes;
    showLoading.value = false;

    if (res.code) return;
    const result =
      (res as DepositType.requestApiListRes).res ||
      (res as DepositType.wdApplyListRes).page ||
      (res as DepositType.depotWaterDetailListRes).data ||
      res.msg;
    tableData.push(...result.list);
    paginationTotal.value = result.totalCount;
    remindersTime.value = (res as DepositType.wdApplyListRes).time || 0;
    if (tableData.length === 0) shwoNodata.value = true;
  } catch (error) {
    console.log(error);
    showLoading.value = false;
  }
};

const queryBtnClick = () => getDataList();

const chooseBtn = (name: string, index: number) => {
  // 切换时间
  active.value = index;
  timeList.length = 0;
  timeList.push(...getTime(name));

  timer.value[0] = timeList[0] + ' 00:00:00';
  timer.value[1] = timeList[1] + ' 23:59:59';
};

const changeSpan = (item: { mark: number }) => {
  activeSpan.value = item.mark;
  search.current = 1;
  getDataList();
};

const paginationList = computed(() => {
  return {
    currentPage: search.current,
    pageSize: search.limit,
    total: paginationTotal.value,
  };
});

const paginationChange = ({ current = 1, size = 10 }) => {
  search.current = current;
  search.limit = size;
  getDataList();
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  :deep(.el-table__inner-wrapper) {
    &:before {
      display: none;
    }
  }

  :deep(tr) {
    height: 48px;
  }

  &:deep(.el-table__header-wrapper) {
    .el-table__header {
      thead {
        tr {
          background-color: var(--u_br_4);
          height: 48px;
          .el-table__cell {
            background: var(--u_br_4);
            color: var(--u_br_1);

            &:first-child {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }

            &:last-child {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
            }
          }
        }
      }
    }
  }

  &:deep(.el-table__body-wrapper) {
    background-color: var(--u_br_3);

    tr {
      td {
        border: none;
        padding-left: 0px;
        color: var(--u_br_1);
        margin-bottom: 5px;

        &:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        &:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }

    .el-scrollbar {
      height: 466px;
    }

    .el-table__empty-block {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      min-height: 466px;
    }

    .el-table__body {
      padding-bottom: 20px;

      tr:nth-child(even) {
        background-color: var(--u_s_4);
      }
    }
  }

  &:deep(.expanded_row) {
    td {
      border-top: 1px solid var(--u_br_15) !important;
      border-left: none !important;
      border-right: none !important;
      &:first-child {
        border-left: 1px solid var(--u_br_15) !important ;
        border-bottom-left-radius: 0 !important;
      }
      &:last-child {
        border-right: 1px solid var(--u_br_15) !important ;
        border-bottom-right-radius: 0 !important;
      }
    }
    & + tr:not(.el-table__row) {
      td {
        border: 1px solid var(--u_br_15) !important;
        border-top: none !important ;
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
      }
    }
    &.template_2_002 {
      & + tr:not(.el-table__row) {
        background: var(--u_br_13);
        &:hover {
          background: var(--u_br_13);
        }
      }
    }
  }

  &:deep(.el-table__expanded-cell) {
    background-color: var(--u_br_13);
    .expend-container {
      @include flex(flex-start, column);
      align-items: flex-start;
      padding: 15px 20px;
      .expend-container_row {
        width: 100%;
        &:first-child {
          margin-bottom: 10px;
        }
        @include flex(flex-start);
        & > div {
          width: 33%;
          @include flex(flex-start);
          .label {
            color: var(--u_br_14);
            margin-right: 5px;
          }
        }
        .cancel_withdraw_btn {
          border-radius: 4px;
          cursor: pointer;
          margin-left: 10px;
          height: 30px;
          @include flex(center);
          padding: 0 10px;
          background: var(--u_br_17);
          color: var(--u_br_18);
        }
      }
    }
  }
}

.top-div {
  padding: 0 24px 24px;
  position: relative;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  .date-div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;

    &:deep(.el-range-editor) {
      width: 350px;

      &.el-input__wrapper {
        box-shadow: none;
        padding: 0 !important;
      }

      .el-range-input {
        width: 160px;
        height: 40px;
        border: 1px solid var(--u_br_12);
        border-radius: 8px;
      }

      .el-range-separator {
        padding: 0 10px;
      }
    }

    &:deep(.el-range__icon) {
      display: none;
    }
  }

  .date-span {
    display: block;
    color: var(--u_br_1);
    padding: 20px 20px 0;
    font-size: 14px;
  }

  .filter-content {
    display: flex;
    margin-top: 8px;
    justify-content: space-between;
    padding: 0px 20px;
    .date-box {
      display: flex;
      .date-btn {
        margin-right: 10px;
        flex-shrink: 0;
        &:last-child {
          margin-right: 0;
        }
        button {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: var(--u_br_1);
          line-height: 24px;
          background: var(--u_br_11);
          border: 1px solid var(--u_br_2);
          padding: 0 15px;
          border-radius: 8px;
          min-width: 75px;
        }
        .btn-active {
          color: var(--u_br_11);
          border: 0;
          background: var(--u_br_7);
          font-weight: 600;
        }
      }
    }

    .inquire {
      width: 75px;
      height: 40px;
      font-size: 14px;
      font-weight: 600;
      border: 0;
      color: var(--u_br_11);
      background: var(--u_br_7);
      border: 1px solid var(--u_br_12);
      border-radius: 8px;
      margin-left: 10px;
    }
  }
}
.transaction-type-items {
  max-height: 635px;
  border-radius: 16px;
  margin: 20px 20px 28px 20px;
  padding-bottom: 28px;
  .no-data-div {
    display: flex;
    justify-content: space-around;
    text-align: center;
    height: 48px;
    margin-top: 20px;
    line-height: 48px;

    span {
      font-size: 16px;
      color: var(--u_cou_3);
      display: inline-block;
      width: 135px;
      height: 48px;
      cursor: pointer;

      .bot {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 42px;
        height: 3px;
        border-radius: 4px 4px 0 0;
      }

      &.active-span {
        color: var(--u_br_1);

        &::after {
          background: var(--u_cou_4);
        }
      }
    }

    .active-span {
      color: var(--u_cou_2);
      font-size: 18px;
      font-weight: 500;

      .bot {
        background: var(--u_cou_4);
      }
    }
  }

  .pagination-container {
    padding: 0 20px 20px 0;
    background: var(--u_s_2);
  }

  .bottom-div-inner {
    background: var(--u_br_3);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0 20px;
  }

  .no-data-img {
    text-align: center;
    display: flex;
    min-height: 500px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--u_br_2);
    margin: 0px;

    .no-data-text {
      margin-top: 10px;
    }
  }

  .no-data-gif {
    margin-top: 0;
    min-height: 450px;
    @include flex(center);
  }
}

//-2号模板差异
.transaction-wrapper {
  &.template_2_002 {
    .filter-content {
      .date-div {
        &:deep(.el-input__wrapper) {
          background: transparent !important;
          .el-range-input {
            background: #3d5477;
            color: #fff;
            border: none;
          }
          .el-range-separator {
            color: #fff;
          }
        }
        &:deep(.el-button) {
          background: linear-gradient(114.69deg, #ff00ff -22.42%, #0088ff 136.15%);
          border: none;
        }
      }
      .date-box {
        .date-btn {
          button {
            background: #3d5477;
            border: none;
            &.btn-active {
              background: linear-gradient(114.69deg, #ff00ff -22.42%, #0088ff 136.15%);
            }
          }
        }
      }
    }
    .transaction-type-items {
      .no-data-div {
        .active-span {
          background: linear-gradient(135deg, #33d6fc 0%, #127dfe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .pagination-container {
        background: #273546;
      }
      .bottom-div-inner {
        .table-wrapper {
          &:deep(.el-table__inner-wrapper) {
            background: #273546;
            .el-table__header-wrapper {
              border: 1px solid #202837;
              border-radius: 10px;
              tr {
                .el-table__cell {
                  background: #202837;
                  border: 1px solid #202837;
                }
              }
            }
          }
          &:deep(.el-table__body-wrapper) {
            .el-table__body {
              -webkit-border-vertical-spacing: 4px;
              tbody {
                background: #273546;
                .el-table__row {
                  background: #1d2936;
                  height: 48px;
                  &:nth-child(2n) {
                    background: #37485e;
                  }
                  &:hover {
                    td {
                      background-color: #37485e;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    :deep(.el-icon) {
      color: #b1b7ca;
      font-size: 16px;
    }
  }
}
//3号模版
.transaction-wrapper {
  &.template_2_003 {
    :deep() {
      .el-date-editor {
        background-color: transparent;
      }
      .el-date-table-cell__text {
        color: #fff !important;
      }
      .inquire {
        border: none;
      }
    }
  }
}
</style>
