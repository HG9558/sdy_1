<template>
  <div :class="['betting-record-wrapper', 'share-recode-wrapper', site]">
    <div class="top-div">
      <div class="head-container">
        <div :class="['head-left', globalState.language]">
          <div class="head-left-top">
            <span>{{ $t_c('记录查询') }}</span> ({{ $t_c('当前系统支持查询最近30日的投注记录') }})
          </div>
          <div class="head-left-bottom">
            <div class="date-div">
              <div class="date-btn left" :class="{ active: isShareRecode }" @click="isShareRecode = true">
                {{ $t_c('晒单') }}
              </div>
              <div class="date-btn" :class="{ active: !isShareRecode }" @click="isShareRecode = false">
                {{ $t_c('跟单') }}
              </div>
            </div>
          </div>
        </div>
        <div class="head-right">
          <div class="head-right-top">{{ $t_c('日期选择') }}</div>
          <div class="head-right-bottom">
            <div class="date-div">
              <div
                class="date-btn"
                v-for="(item, index) in dateBottom"
                :key="index"
                @click="chooseBtn(item.type, index)"
                :class="{ active: active === index }">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-div" style="position: relative">
      <div :class="['bottom-div-inner', !tableData.length && 'all-radius']">
        <div class="bottom-top-div">
          <div>
            <span>{{ $t_c('笔数') }}: {{ totalData.totalCount }}</span>
          </div>
          <div>
            <span>{{ $t_c('流水') }}: {{ totalData.betTotal }}</span>
          </div>
          <div>
            <span>{{ $t_c('总有效投注') }}: {{ totalData.validBetTotal }}</span>
          </div>
          <div>
            <span>{{ $t_c('输/赢') }}: {{ totalData.payOutTotal }}</span>
          </div>
        </div>

        <el-table class="betting-table" :data="tableData" style="width: 100%" @row-click="rowClick" ref="multipleTable">
          <span slot="empty"></span>
          <el-table-column prop="betTime" :label="$t_c('下注时间')" width="180">
            <template #default="scope">
              <img :src="useImgPath('profile/share_record_bao.png')" alt="" class="bao" v-show="scope.row.type == 8" />
              <span> {{ scope.row.betTime }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="gameName" :label="$t_c('下注内容')" width="180"> </el-table-column>
          <el-table-column prop="bet" :label="$t_c('下注金额')"> </el-table-column>
          <el-table-column prop="validBet" :label="$t_c('有效投注金额')" width="220"> </el-table-column>
          <el-table-column prop="payout" :label="$t_c('输/赢')">
            <template #default="scope">
              <span
								v-if="scope.row.statusValue === 1"
                :style="{
                  color: `${scope.row.payout > 0 ? '#00AB5D' : '#FF3A3A'}`,
                }"
                >{{ scope.row.payout > 0 ? `+${scope.row.payout}` : `${scope.row.payout}` }}
							</span>
							<span v-else>-</span>
						</template>
          </el-table-column>
          <el-table-column type="expand">
            <template #default="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item :label="$t_c('订单号')" style="width: 235px">
                  <span class="order-number">{{ props.row.id || $t_c('请联系客服') }}</span>
                  <span @click="copy(props.row.id)">{{ $t_c('复制') }}</span>
                </el-form-item>

                <el-form-item style="text-align: center" :label="$t_c('状态')">
                  <span>{{ props.row.status }}</span>
                </el-form-item>

                <el-form-item :label="props.row.odds ? $t_c('赔率') : ''">
                  <span v-if="props.row.odds" style="color: #f9cb91">{{ props.row.odds }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.payoutTime" style="text-align: center" :label="$t_c('派彩时间')">
                  <span>{{ props.row.payoutTime }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.payoutTime" style="text-align: center" :label="$t_c('玩法类型')">
                  <span>{{ props.row.playType }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.leagueName" style="text-align: center" :label="$t_c('联赛名称')">
                  <span>{{ props.row.leagueName }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.betScore" style="text-align: center" :label="$t_c('下注比分')">
                  <span>{{ props.row.betScore }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.team" style="text-align: center" :label="$t_c('比赛队伍')">
                  <span>{{ props.row.team }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <template #empty>
            <div class="no-data-img" v-if="shwoNodata">
              <emptyVue :imgWidth="211"></emptyVue>
              <span class="no-data-text">{{ $t_c('还没有任何投注记录') }}</span>
            </div>
            <SelfLoading class="no-data-gif" :showLoading="showLoding" />
          </template>
        </el-table>
      </div>
      <div class="pagination-container" v-show="!!tableData.length">
        <PaginationComponent class="pagination-class" :pagination="paginationList" @change="paginationChange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getTime } from '@/utils';
import { onMounted, ref, reactive, watch } from 'vue';
import { api } from '@/api';
import type { TableInstance } from 'element-plus';
import { useImgPath, useSite } from '@/hook/usePath';
import { useClipboard } from '@vueuse/core';
import useDialog from '@/hook/useDialog';
import emptyVue from 'commonComponent/empty/empty.vue';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import PaginationComponent from 'commonComponent/Pagination/index.vue';
import { lang } from '@/i18n';
// import { useGlobalState } from '@/stores';

const site = useSite();
const showLoding = ref<boolean>(false);
const shwoNodata = ref<boolean>(false);
const tableData = reactive<LiveAPI.getListShownBetLogsForUserParamsDataCountList[]>([]);
const totalData = reactive<LiveAPI.getListShownBetLogsForUserParamsDataCount>(
  {} as LiveAPI.getListShownBetLogsForUserParamsDataCount
);
const isShareRecode = ref<boolean>(true);
const search = reactive({ key: '', current: 1, limit: 10 });
const timeList: string[] = getTime('今天');
const paginationTotal = ref<number>(0);
const form = reactive<LiveAPI.FormBetType>({ region: [] });
const active = ref<number>(0);
const multipleTable = ref<TableInstance>();
const { copy, copied } = useClipboard();
const { messageTip } = useDialog();
const globalState = useGlobalState();
const dateBottom = [
  { name: lang('今天'), type: '今天' },
  { name: lang('昨天'), type: '昨天' },
  { name: lang('本周'), type: '本周' },
  { name: lang('近30天'), type: '近30天' },
];
const paginationList = reactive({
  currentPage: search.current,
  pageSize: search.limit,
  total: paginationTotal,
});

onMounted(() => {
  init();
});

watch(copied, _ => {
  if (_) messageTip({ message: lang('复制成功！') });
});

watch(isShareRecode, () => init());

const init = () => {
  getTableList();
  _getBettingRecordList();
};

const _getBettingRecordList = async () => {
  const res = await api.deposit.getBettingRecordList({ url: 0 });
  if (res.code === 0) {
    form.region = res.tGmCats;
    const all = { catName: '全部', id: '' };
    form.region.unshift(all);
  }
};

const getTableList = async () => {
  tableData.length = 0;
  Object.keys(totalData).forEach(key => delete totalData[key]);

  const params: { pageSize: number; pageNo: number; [key: string]: any } = {
    pageSize: search.limit,
    pageNo: search.current,
  };
  params[isShareRecode.value ? 'betStartTime' : 'startTime'] = timeList[0] + ' 00:00:00';
  params[isShareRecode.value ? 'betEndTime' : 'endTime'] = timeList[1] + ' 23:59:59';
  shwoNodata.value = false;
  showLoding.value = true;
  try {
    const res = isShareRecode.value
      ? await api.live.getListShownBetLogsForUser(params)
      : await api.live.getListFollowBetLogsForUser(params);

    const { code, data } = res;
    if (!code) {
      const { count, totalCount, list } = data;
      tableData.push(...list);
      Object.assign(totalData, count, { totalCount });
      paginationTotal.value = totalCount;
    }
    showLoding.value = false;
    if (tableData.length === 0) shwoNodata.value = true;
  } catch (error) {
    showLoding.value = false;
  }
};

// 切换时间
const chooseBtn = (name: string, index: number) => {
  if (String(timeList) === String(getTime(name)) && index === active.value) {
    // 防止重复点击获取数据
    return;
  } else {
    search.current = 1;
    active.value = index;
    timeList.length = 0;
    timeList.push(...getTime(name));
    getTableList();
  }
};

const rowClick = (row: any) => {
  multipleTable.value?.toggleRowExpansion(row, row.listStatus);
  row.listStatus = !row.listStatus;
};

// 分页函数
const paginationChange = ({ current = 1, size = 10 }) => {
  search.current = current;
  search.limit = size;
  getTableList();
};
</script>

<style lang="scss" scoped>
:deep(.order-number) {
  display: inline-block;
  width: 135px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.top-div {
  border-radius: 16px;
  padding: 20px 30px 0px;
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  .betting-form {
    :deep(.el-form-item__label) {
      text-align: left;
      width: 45px !important;
    }
  }
}

:deep(.el-form-item__content) {
  margin-left: 0 !important;

  span:last-child {
    color: var(--u_s_1);
  }
}

.bottom-div {
  min-height: 400px;
  border-radius: 20px;
  padding: 28px 30px 40px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  .bottom-div-inner {
    background: var(--u_s_2);
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
    color: var(--u_s_3);

    div {
      line-height: 50px;
      display: inline-block;
      height: 100%;
      max-width: 200px;
      min-width: 200px;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      overflow: hidden;
      word-break: break-all;
      font-size: 14px;
    }
  }
}

.betting-table {
  &:deep(.el-table__row) {
    height: 50px;

    &:nth-child(even) {
      background-color: var(--u_s_4);
    }
  }

  &:deep(.el-table__header-wrapper) {
    .el-table__header {
      thead {
        tr {
          .el-table__cell {
            background: var(--u_s_5);
            color: #414655;

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

  &:deep(.el-table__inner-wrapper) {
    &:before {
      display: none;
    }
  }

  &:deep(.el-table__body-wrapper) {
    background-color: var(--u_s_2);

    tr {
      td {
        border: none;
        padding-left: 0px;
        color: var(--u_s_3);
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
      height: 526px;

      .el-table__expanded-cell {
        background: var(--u_s_6);
        padding: 20px !important;

        &.el-table__cell {
          &:hover {
            background-color: var(--u_s_6) !important;
          }
        }
      }
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

/* 改版样式添加 */
.head-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .head-left {
    flex-shrink: 0;
    &:not(.zh, .zh_tw) {
      max-width: 400px;
    }
    .head-left-top {
      margin-bottom: 8px;
      font-size: 14px;
      color: var(--u_s_7);

      span {
        font-size: 14px;
        color: var(--u_s_8);
      }
    }

    .head-left-bottom {
      display: flex;
      align-items: center;
      width: 290px;

      .date-btn {
        width: 138px;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
      }

      &.left {
        margin-right: 10px;
      }
    }
  }

  .head-right {
    .head-right-top {
      color: var(--u_s_9);
      font-size: 14px;
      margin-bottom: 8px;
    }
  }

  .date-div {
    display: flex;
    align-items: center;

    .date-btn {
      color: var(--u_s_10);
      margin-left: 15px;
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      background: var(--u_s_11);
      border: 1px solid var(--u_s_12);
      padding: 0 15px;
      font-size: 14px;
      border-radius: 10px;
      cursor: pointer;

      &.active {
        font-weight: bold;
        border: none;
        color: var(--u_s_13);
        background: var(--u_s_14);
      }

      &:first-child {
        margin-left: 0;
      }
    }
  }
}

.pagination-container {
  padding: 0 20px 20px 0;
  background: var(--u_s_2);
}

.bao {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin: -2px 8px 0 0;
}

.share-recode-wrapper {
  &.template_2_002 {
    .date-btn {
      background: #3d5477;
      border: none;
    }
    .head-right-top {
      color: #fff;
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
                  color: #fff;
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
                tr {
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
                    background-color: #37485e;
                    .el-form {
                      .el-form-item {
                        .el-form-item__label {
                          color: #878ea6;
                        }
                      }
                    }
                  }
                  &:hover {
                    background-color: #37485e;
                  }
                }
              }
            }
          }
        }
      }
    }
    .pagination-container {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}

.share-recode-wrapper {
  &.template_2_003 {
    .head-left-bottom {
      background-color: transparent;
    }
    .bottom-div {
      padding: 28px 30px 0px;
    }
  }
}
</style>
