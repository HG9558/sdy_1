<template>
  <div :class="['betting-record-wrapper', site]">
    <div class="top-div">
      <div class="head-container">
        <div :class="['head-left', globalState.language]">
          <div class="head-left-top">
            <span class="search-text">{{ $t_c('记录查询') }}</span>
            <!-- ({{ $t_c('当前支持查询最近45日的投注记录') }}) -->
          </div>
          <div class="head-left-bottom">
            <div :class="['plat-name', globalState.language]">{{ $t_c('平台') }}:</div>
            <el-form :class="['betting-form', globalState.language]" ref="form" :model="form">
              <el-form-item>
                <el-select
                  popper-class="bog"
                  @change="getTableList"
                  v-model="selectValue"
                  :placeholder="$t_c('请选择需要查询的平台')">
                  <el-option v-for="item in region" :key="item.id" :label="item.catName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="head-right">
          <div class="head-date-label">{{ $t_c('日期选择') }}</div>
          <div :class="['head-date-div', globalState.language]">
            <el-date-picker
              class="date-picker clear-icon"
              v-model="timer"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              :prefix-icon="customPrefix"
              :default-time="defaultTime2"
              format="YYYY/MM/DD HH:mm:ss"
              @change="dateChange">
            </el-date-picker>
          </div>

          <div :class="['head-right-bottom', globalState.language]">
            <div :class="['date-div', globalState.language]">
              <div
                class="date-btn"
                v-for="(item, index) in dateButtom"
                :key="index"
                @click="chooseBtn(item.name, index)"
                :class="{ active: active === index }">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['bottom-div']" style="position: relative">
      <div :class="['bottom-div-inner', !tableData.length && 'all-radius']">
        <div class="bottom-top-div">
          <div>
            <span>{{ $t_c('笔数') }}: {{ totalData.counts }}</span>
          </div>
          <div>
            <span>{{ $t_c('总投注') }}: {{ totalData.bet }}</span>
          </div>
          <div>
            <span>{{ $t_c('总有效投注') }}: {{ totalData.validBet }}</span>
          </div>
          <div>
            <span>{{ $t_c('输/赢') }}: {{ totalData.payout }}</span>
          </div>
        </div>

        <el-table
          class="betting-table"
          :data="tableData"
          style="width: 100%"
          max-height="500"
          @row-click="() => {}"
          ref="multipleTable">
          <template #empty>
            <div class="no-data-img" v-if="shwoNodata">
              <emptyVue :imgWidth="211"></emptyVue>
              <span class="no-data-text">{{ $t_c('还没有任何投注记录') }}</span>
            </div>
            <SelfLoading class="no-data-gif" :showLoading="showLoding" />
          </template>
          <el-table-column prop="betTime" :label="`${$t_c('投注时间')}`" width="180">
            <template #default="scope">
              <span> {{ scope.row.betTime }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="gameName" :label="`${$t_c('投注内容')}`" width="180"> </el-table-column>
          <el-table-column prop="bet" :label="`${$t_c('投注金额')}`"></el-table-column>
          <el-table-column prop="validBet" :label="`${$t_c('有效投注金额')}`" width="220"> </el-table-column>
          <el-table-column prop="payout" :label="`${$t_c('输/赢')}`">
            <template #default="scope">
              <span
                v-if="scope.row.statusValue === 1"
                :style="{
                  color: `${scope.row.payout > 0 ? '#37AA4A' : '#F90000'}`,
                }"
                >{{ scope.row.payout > 0 ? `+${scope.row.payout}` : `${scope.row.payout}` }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template #default="props">
              <div v-if="props.row.odds?.indexOf(',') === -1">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item :label="`${$t_c('订单号')}：`" style="width: 240px">
                    <span class="order-number">{{ props.row.id || $t_c('请联系客服') }}</span>
                    <span
                      class="copy_txt"
                      style="margin-left: 10px; color: #23a8ff; cursor: pointer; float: right"
                      @click="copy(props.row)"
                      >{{ $t_c('复制') }}</span
                    >
                  </el-form-item>

                  <el-form-item style="text-align: center" :label="`${$t_c('状态')}：`">
                    <span style="color: #23a8ff">{{ props.row.status }}</span>
                  </el-form-item>

                  <el-form-item :label="props.row.odds ? $t_c('赔率') : ''">
                    <span v-if="props.row.odds" style="color: #23a8ff">{{ props.row.odds }}</span>
                  </el-form-item>

                  <el-form-item v-if="props.row.payoutTime" style="text-align: center" :label="$t_c('派彩时间：')">
                    <span style="color: #23a8ff">{{ props.row.payoutTime }}</span>
                  </el-form-item>

                  <el-form-item v-if="props.row.playType" style="text-align: center" :label="$t_c('玩法类型：')">
                    <span style="color: #23a8ff">{{ props.row.playType }}</span>
                  </el-form-item>

                  <el-form-item v-if="props.row.leagueName" style="text-align: center" :label="$t_c('联赛名称：')">
                    <span style="color: #23a8ff">{{ props.row.leagueName }}</span>
                  </el-form-item>

                  <el-form-item v-if="props.row.betScore" style="text-align: center" :label="$t_c('下注比分：')">
                    <span style="color: #23a8ff">{{ props.row.betScore }}</span>
                  </el-form-item>

                  <el-form-item v-if="props.row.resultScore" style="text-align: center" :label="$t_c('赛果比分：')">
                    <span style="color: #23a8ff">
                      {{
                        props.row.halfResultScore
                          ? `${$t_c('半')}(${props.row.halfResultScore}) ${$t_c('全')}(${props.row.resultScore})`
                          : props.row.resultScore
                      }}
                    </span>
                  </el-form-item>

                  <el-form-item v-if="props.row.team" style="text-align: center" :label="$t_c('比赛队伍：')">
                    <span style="color: #23a8ff">{{ props.row.team }}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else>
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item :label="`${$t_c('订单号')}：`" style="width: 240px">
                    <span class="order-number">{{ props.row.id || $t_c('请联系客服') }}</span>
                    <span
                      style="margin-left: 10px; color: #23a8ff; cursor: pointer; float: right"
                      @click="copy(props.row)"
                      >{{ $t_c('复制') }}</span
                    >
                  </el-form-item>

                  <el-form-item style="text-align: center" :label="`${$t_c('状态')}：`">
                    <span style="color: #23a8ff">{{ props.row.status }}</span>
                  </el-form-item>

                  <el-form-item v-if="props.row.payoutTime" style="text-align: center" :label="$t_c('派彩时间：')">
                    <span style="color: #23a8ff">{{ props.row.payoutTime }}</span>
                  </el-form-item>
                </el-form>
                <el-form
                  label-position="left"
                  inline
                  class="demo-table-expand"
                  v-for="(_item, index) in props.row.odds?.split(',')"
                  :key="'chuanguan-' + index"
                  style="border-top: 1px solid rgba(255, 255, 255, 0.3)">
                  <el-form-item :label="props.row.odds && props.row.odds.split(',')[index] ? $t_c('赔率：') : ''">
                    <span v-if="props.row.odds" style="color: #23a8ff">{{ props.row.odds?.split(',')[index] }}</span>
                  </el-form-item>
                  <el-form-item
                    v-if="props.row.playType && props.row.playType.split(',')[index]"
                    style="text-align: center"
                    :label="$t_c('玩法类型：')">
                    <span style="color: #23a8ff">{{ props.row.playType.split(',')[index] }}</span>
                  </el-form-item>
                  <el-form-item
                    v-if="props.row.leagueName && props.row.leagueName.split(',')[index]"
                    style="text-align: center"
                    :label="$t_c('联赛名称：')">
                    <span style="color: #23a8ff">{{ props.row.leagueName.split(',')[index] }}</span>
                  </el-form-item>
                  <el-form-item
                    v-if="props.row.betScore && props.row.betScore.split(',')[index]"
                    style="text-align: center"
                    :label="$t_c('下注比分：')">
                    <span style="color: #23a8ff">{{ props.row.betScore.split(',')[index] }}</span>
                  </el-form-item>
                  <el-form-item
                    v-if="props.row.resultScore && props.row.resultScore.split(',')[index]"
                    style="text-align: center"
                    :label="$t_c('赛果比分：')">
                    <span style="color: #23a8ff">
                      {{
                        props.row.halfResultScore && props.row.halfResultScore.split(',')[index]
                          ? `半(${props.row.halfResultScore.split(',')[index]}) 全(${
                              props.row.resultScore.split(',')[index]
                            })`
                          : props.row.resultScore.split(',')[index]
                      }}
                    </span>
                  </el-form-item>
                  <el-form-item
                    v-if="props.row.team && props.row.team.split(',')[index]"
                    style="text-align: center"
                    :label="$t_c('比赛队伍：')">
                    <span style="color: #23a8ff">{{ props.row.team.split(',')[index] }}</span>
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <PaginationComponent
        class="pagination-class"
        :pagination="paginationList"
        @change="paginationChange"
        v-show="!!tableData.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, shallowRef, h, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { dataTime, getTime } from '@/hook/useAuth';
import useDialog from '@/hook/useDialog';
import { api } from '@/api';
import emptyVue from 'commonComponent/empty/empty.vue';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import PaginationComponent from 'commonComponent/Pagination/index.vue';
import { useClipboard } from '@vueuse/core';
import { lang } from '@/i18n';
// import { useGlobalState } from '@/stores';
import { useSite } from '@/hook/usePath';

const site = useSite();
const { copy, copied } = useClipboard();
const { messageTip } = useDialog();
const customPrefix = shallowRef({
  render() {
    return h('p', '');
  },
});
const showLoding = ref(false);
const shwoNodata = ref(false);
const selectValue = ref('');
const active = ref(0);
const paginationTotal = ref(0);
const multipleTable = ref();
const globalState = useGlobalState();
const form = reactive({
  region: [],
});
const region = ref<DepositType.TGmCat[]>([]);
const tableData = ref<any[]>([]);
const search = reactive({
  key: '',
  current: 1,
  limit: 10,
});

const dateButtom = reactive([
  { name: lang('今天') },
  { name: lang('昨天') },
  { name: lang('本周') },
  { name: lang('本月') },
]);

const timer = ref([getTime('今天')[0] + ' 00:00:00', getTime('今天')[1] + ' 23:59:59']);
const totalData = reactive({} as DepositType.BettingRecordDataListTotal);
const defaultTime2: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)];

const dateArr = reactive([
  [getTime('今天')[0] + ' 00:00:00', getTime('今天')[1] + ' 23:59:59'],
  [getTime('昨天')[0] + ' 00:00:00', getTime('昨天')[1] + ' 23:59:59'],
  [getTime('本周')[0] + ' 00:00:00', getTime('今天')[1] + ' 23:59:59'],
  [getTime('本月')[0] + ' 00:00:00', getTime('今天')[1] + ' 23:59:59'],
]);

const paginationList = reactive({
  currentPage: search.current,
  pageSize: search.limit,
  total: paginationTotal,
});

watch(copied, _ => {
  if (_) messageTip({ message: lang('复制成功！') });
});

const init = () => {
  getTableList();
  _getBettingRecordList();
};

onMounted(() => {
  init();
});

const _getBettingRecordList = async () => {
  const res = await api.deposit.getBettingRecordList({ url: 0 });
  if (res.code === 0) {
    region.value = res.tGmCats;
    region.value.unshift({
      catName: lang('全部'),
      id: '',
    });
  }
};
// 分页函数
const paginationChange = ({ current = 1, size = 10 }) => {
  search.current = current;
  search.limit = size;
  getTableList();
};

// 获取数据
const getTableList = useDebounceFn(
  () => {
    // 列表加载图，列表为空
    tableData.value = [];
    Object.keys(totalData).map(key => delete totalData[key]);
    // 查询按钮
    const data = {
      pageSize: search.limit,
      pageNo: search.current,
      gameCatId: selectValue.value || '',
      betStrTime: timer.value[0],
      betEndTime: timer.value[1],
    };
    shwoNodata.value = false;
    showLoding.value = true;
    api.deposit
      .getBettingRecordDataList(data)
      .then((res: DepositType.getBettingRecordDataListResType) => {
        if (res.code === 0) {
          tableData.value = res.page.list;
          Object.assign(totalData, res.total);
          paginationTotal.value = res.page.totalCount;
        }
        showLoding.value = false;
        if (tableData.value.length === 0) shwoNodata.value = true;
      })
      .catch(() => {
        showLoding.value = false;
      });
  },
  300,
  { maxWait: 5000 }
);
// 切换时间
const chooseBtn = (_name: string, index: number) => {
  if (String(timer) === String(dateArr[index]) && index === active.value) {
    // 防止重复点击获取数据
    return;
  } else {
    search.current = 1;
    active.value = index;
    timer.value[0] = dateArr[index][0];
    timer.value[1] = dateArr[index][1];
    getTableList();
  }
};

const dateChange = () => {
  timer.value = [dataTime(timer.value[0], 'Y-m-d H:i:s'), dataTime(timer.value[1], 'Y-m-d H:i:s')];
  const index = dateArr.findIndex(item => item[0] === timer.value[0] && item[1] === timer.value[1]);
  active.value = index >= 0 ? index : 0;
  getTableList();
  _getBettingRecordList();
};
</script>

<style lang="scss" scoped>
.top-div {
  border-radius: 16px;
  padding: 20px 10px 20px;
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  .betting-form {
    .el-form-item__label {
      text-align: left;
      width: 45px !important;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
    &:not(.zh, .zh_tw) {
      margin-top: 5px;
    }
  }
}

.bottom-div {
  min-height: 400px;
  border-radius: 20px;
  padding: 0px 10px 70px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  .bottom-div-inner {
    background: var(--u_br_3);
    border-radius: 8px 8px 0 0;
    box-sizing: border-box;
    overflow-x: hidden;
    padding: 0 20px;
    &.all-radius {
      border-radius: 8px;
    }
  }
  .bottom-top-div {
    height: 50px;
    display: flex;
    justify-content: space-between;
    div {
      line-height: 50px;
      display: inline-block;
      height: 100%;
      max-width: 200px;
      min-width: 200px;
      color: var(--u_br_1);
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      overflow: hidden;
      word-break: break-all;
      font-size: 14px;
    }
  }
  .betting-table {
    &:deep(.el-table__header-wrapper) {
      .el-table__header {
        thead {
          tr {
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
        height: 566px;
      }
      .el-table__empty-block {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        min-height: 566px;
      }
      .el-table__body {
        padding-bottom: 20px;
      }
    }
  }
  .no-data-gif {
    text-align: center;
    // padding-top: 63px;
    line-height: 487px;
    margin-top: 0;
  }
  .no-data-img {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--u_br_2);
    margin: 0px;
    .no-data-text {
      margin-top: 10px;
    }
  }
}

/* 改版样式添加 */

.head-container {
  @include flex(space-between);
  align-items: flex-end;
  .head-left {
    &:not(.zh, .zh_tw) {
      max-width: 300px;
    }
    flex-shrink: 0;
    .head-left-top {
      margin-bottom: 8px;
      font-size: 14px;
      color: var(--u_br_2);
      .search-text {
        color: var(--u_br_1);
      }
    }
    .head-left-bottom {
      display: flex;
      align-items: center;
      width: 290px;
      height: 40px;
      border: 1px solid var(--u_br_12);
      border-radius: 8px;
      .plat-name {
        width: 52px;
        text-align: center;
        height: 100%;
        font-size: 14px;
        color: var(--u_br_1);
        line-height: 40px;
        &:not(.zh, .zh_tw) {
          width: auto;
          padding: 0 5px;
        }
      }
      .el-form-item {
        margin-bottom: 0;
        .el-select {
          width: 100%;
          &:hover {
            .el-input__wrapper {
              box-shadow: none;
              width: auto;
              padding: 0;
            }
          }
        }
      }
      .el-form {
        flex: 1;
        &:deep(.el-input) {
          &.is-focus {
            box-shadow: none !important;
            .el-input__wrapper {
              box-shadow: none !important;
            }
          }
          .el-input__wrapper {
            border: 0px;
            box-shadow: none !important;
            .el-input__inner {
              border: none;
              color: var(--u_br_2);
            }
          }
        }
      }
    }
  }
  .head-right {
    position: relative;
    flex-grow: 1;
    margin-left: 15px;
    @include flex(flex-start);
    .head-date-label {
      position: absolute;
      color: #808293;
      top: -26px;
      left: 8px;
    }
    .head-date-div {
      position: relative;
      &:deep(.el-range-editor) {
        width: 400px;
        &.el-input__wrapper {
          box-shadow: none;
          display: table;
        }
        .el-range-input {
          height: 40px;
          border: 1px solid var(--u_br_12);
          border-radius: 8px;
        }
        .el-range-separator {
          padding: 10px;
        }
        .el-range__icon {
          display: none;
        }
      }
      &.vi,
      &.ms {
        &:deep(.el-range-editor) {
          width: 400px;
        }
      }
      &.en {
        &:deep(.el-range-editor) {
          width: 390px;
        }
      }
    }
    .head-right-bottom {
      flex-shrink: 0;
      &:not(.zh, .zh_tw) {
        transform: translateX(-40px);
      }
      .date-div {
        display: flex;
        align-items: center;
        &:not(.zh, .zh_tw) {
          .date-btn {
            width: auto;
            padding: 0 5px;
            &.active {
              width: auto;
            }
          }
        }
        .date-btn {
          width: 50px;
          height: 40px;
          text-align: center;
          color: var(--u_br_1);
          margin-left: 15px;
          height: 40px;
          line-height: 40px;
          background: var(--u_br_11);
          border: 1px solid var(--u_br_12);
          border-radius: 8px;
          cursor: pointer;
          &.active {
            color: var(--u_br_11);
            font-weight: bold;
            background: var(--u_br_7);
            box-shadow: 0px 4px 18px rgba(207, 212, 225, 0.54);
            border: 0px;
            width: 52px;
            height: 42px;
          }
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
}

.is-left {
  text-align: left !important;
  .cell {
    margin-left: 8px;
  }
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
  position: absolute;
  bottom: 20px;
  right: 30px;
}

.el-pagination__jump {
  color: pink;
  .el-input__inner {
    background: rgba(188, 169, 151, 0.2);
    border-radius: 4px;
    color: pink;
  }
}

.demo-table-expand {
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  border: none;
  padding-left: 30px;
  background: var(--u_br_4);
  .el-form-item {
    display: flex;
    align-items: center;
    margin-right: 50px;
    &:deep(.el-form-item__label) {
      color: var(--u_br_8);
    }
    &:deep(.el-form-item__content) {
      display: flex;
      flex-wrap: nowrap !important;
      .order-number {
        color: var(--u_br_1);
        width: 132px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

//- 2号模板差异
.betting-record-wrapper {
  &.template_2_002 {
    .top-div {
      .head-container {
        .head-left {
          .head-left-bottom {
            background: #3d5477;
            border: 1px solid transparent;
            .betting-form {
              &:deep(.el-form-item) {
                .el-select {
                  .el-input__wrapper {
                    background: #3d5477 !important;
                    .el-input__inner {
                      color: #b1b7ca;
                    }
                    .el-input__suffix {
                      color: #b1b7ca;
                    }
                  }
                }
              }
            }
          }
        }
        .head-right {
          .head-right-top {
            color: #fff;
          }
          .head-date-div {
            &:deep(.el-date-editor) {
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
          }
          .head-right-bottom {
            .date-div {
              .date-btn {
                background: #3d5477;
                color: #fff;
                box-shadow: none;
                border: 0px;
                &.active {
                  background: linear-gradient(114.69deg, #ff00ff -22.42%, #0088ff 136.15%);
                }
              }
            }
          }
        }
      }
    }
    .bottom-div {
      .bottom-div-inner {
        .betting-table {
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
            &:before {
              display: none;
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
                tr {
                  .el-table__expanded-cell {
                    padding: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.betting-record-wrapper {
  &.template_2_003 {
    .betting-form {
      &:deep(.el-form-item) {
        .el-select {
          .el-input__wrapper {
            background: transparent !important;
          }
        }
      }
    }
    .head-left-bottom {
      background-color: #fff;
    }
    :deep() {
      .el-date-editor {
        background-color: transparent;
      }
      .el-range-input {
        background-color: #fff;
      }
    }
  }
}
</style>
