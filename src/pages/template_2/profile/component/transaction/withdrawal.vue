<template>
  <div class="table-wrapper">
    <el-table
      v-show="tableData.length !== 0"
      class="betting-table"
      :data="tableData"
      max-height="550"
      @expand-change="expandChange"
      :row-class-name="expandFun"
      style="width: 100%">
      <el-table-column header-align="center" label="时间" width="180">
        <template #default="scope">
          <span>
            {{ formateTime(scope.row.createTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="drawingAmount" :label="$t_c('申请额度')" width="180">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="actualArrival" :label="$t_c('实际提现')">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="handlingCharge" :label="$t_c('转账手续费')">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="cuidan" :label="$t_c('预计到帐')">
        <template v-if="time === 0" #default="scope">
          {{ formatDate(addTime(scope.row.createTime, time), 'HH:mm:ss') }}
        </template>
        <template v-if="time !== 0" #default="scope">
          <template v-if="isReminders(scope.row.createTime, time)">
            <div :class="['btn', useSite()]" v-if="scope.row.cuiCount < 1 && ![0, 1, 9].includes(scope.row.status)">
              <el-button class="clear-btn reminder_btn" @click="remindersClick(scope.row.id)">{{
                $t_c('催单')
              }}</el-button>
            </div>
            <div :class="['btn', useSite()]" v-else>
              <el-button class="clear-btn disabled reminder_btn">{{ $t_c('催单') }}</el-button>
            </div>
          </template>

          <template v-else-if="scope.row.status == 7">
            <span>——</span>
          </template>

          <template v-else>
            {{ formatDate(addTime(scope.row.createTime, time), 'HH:mm:ss') }}
          </template>
        </template>
      </el-table-column>
      <!-- <el-table-column header-align="center" align="center" prop="status" :label="lang('状态')" > -->
      <el-table-column header-align="center" align="center" prop="status" type="expand">
        <template #default="props">
          <div class="expend-container">
            <div class="expend-container_row">
              <div>
                <span class="label">{{ $t_c('订单号') }}:</span>
                <span>{{ props.row.cardNo }}</span>
              </div>
              <div>
                <span class="label">{{ $t_c('类型') }}:</span>
                <span>{{ $t_c('提现') }}</span>
              </div>
            </div>
            <div class="expend-container_row">
              <div>
                <span class="label">{{ $t_c('提现金额') }}:</span>
                <span>{{ props.row.drawingAmount }}</span>
              </div>
              <div>
                <span class="label">{{ $t_c('状态') }}:</span>
                <span :style="{ color: statusColor(props.row.status) }">{{ reward(props.row.status) }}</span>
                <span
                  class="cancel_withdraw_btn"
                  v-if="props.row.status === 8"
                  @click="_withdrawalCancelClick(props.row)"
                  >{{ $t_c('申请取消') }}</span
                >
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useUserState } from '@/stores';
import type ElTable from 'element-plus/es/components/table';
import { formatDate } from 'utils/date';
import { ref } from 'vue';

defineProps<{
  tableData: DepositType.requestApiListDataList[];
  time: number;
}>();

const { messageTip } = useDialog();
const expandArr = ref<number[]>([]);
const userState = useUserState();

const reward = (val: number) => {
  const o = {
    0: lang('拒绝'),
    1: lang('成功'),
    2: lang('待处理'),
    3: lang('出款中'),
    4: lang('人工审核中'),
    5: lang('自动出款中'),
    6: lang('审核中'),
    7: lang('失败'),
    8: lang('处理中'),
    9: lang('取消提款'),
  };
  return o[val as keyof typeof o] ?? lang('待处理');
};

const expandFun = (rowData: { row: DepositType.requestApiListDataList; rowIndex: number }) =>
  expandArr.value.includes(rowData.row.id) ? `expanded_row ${useSite()}` : '';

const expandChange = (_row: DepositType.requestApiListDataList, expandList: DepositType.requestApiListDataList[]) =>
  (expandArr.value = expandList.map(_ => _.id));

const isReminders = (time: any, minute: any) => new Date() > addTime(time, minute);

const emits = defineEmits(['getDataList']);

const remindersClick = async (id: number) => {
  const res = await api.deposit.cuiDanWithdraw(id);
  messageTip({ message: res.code === 0 ? lang('催单成功') : lang('催单失败请稍后再试！！！') });
  if (res.code === 0) emits('getDataList');
};

const formateTime = (val: string) => {
  if (val && val.indexOf('.') !== -1) {
    return val.split('.')[0];
  } else {
    return val;
  }
};

const addTime = (time: string, minute: number) => {
  let t = new Date(time),
    t_s = t.getTime();
  t.setTime(t_s + 1000 * 60 * minute);
  return t;
};

const statusColor = (status: number) => {
  if (status === 0) {
    return '#FF3A3A';
  } else if (status === 1) {
    return '#00AB5D';
  } else {
    return '#F9CB91';
  }
};

const _withdrawalCancelClick = async (_: DepositType.requestApiListDataList) => {
  const res = await api.deposit.withdrawalCancel({ id: _.id, status: 9 });
  messageTip({ message: res.code ? res.msg : lang('操作成功') });
  if (res.code === 0) {
    _.status = 9;
    expandArr.value.length = 0;
    userState._getCenterMoney();
  }
};
</script>

<style lang="scss" scoped>
.betting-table {
  :deep(.has-gutter) {
    background: linear-gradient(90deg, #d9b47d 0%, #fbe7c4 53.02%, #d9b47d 100%);
    border-radius: 4px !important;

    tr th {
      font-size: 16px;
      text-align: center;
    }
  }

  :deep(.el-table__body-wrapper tr td) {
    text-align: center;
    border-bottom: 0;
  }

  .btn {
    display: flex;
    justify-content: center;
  }

  :deep(.el-button) {
    width: 89px;
    height: 30px;
    font-size: 14px;
    color: var(--u_br_11);
    font-weight: 400;
    background: var(--u_br_16);
    &.disabled {
      background: var(--u_br_19);
    }
  }
}

.template_2_002.btn {
  .el-button {
    border: none;
  }
}
</style>
