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
      <el-table-column header-align="center" :label="$t_c('时间')">
        <template #default="scope">
          <span>
            {{ formateTime(scope.row.applicationTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="catName" :label="$t_c('游戏类型')"> </el-table-column>
      <el-table-column header-align="center" align="center" prop="depotName" :label="$t_c('游戏平台')">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="validbet" :label="$t_c('有效投注')">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="amount" :label="$t_c('结算金额')"> </el-table-column>
      <el-table-column header-align="center" align="center" prop="status" type="expand">
        <template #default="props">
          <div class="expend-container">
            <div class="expend-container_row">
              <div>
                <span class="label">{{ $t_c('审核时间') }}:</span>
                <span>{{ formateTime(props.row.auditTime) }}</span>
              </div>
              <div>
                <span class="label">{{ $t_c('类型') }}:</span>
                <span>{{ $t_c('返水') }}</span>
              </div>
            </div>
            <div class="expend-container_row">
              <div>
                <span class="label">{{ $t_c('结算金额') }}:</span>
                <span>{{ props.row.amount }}</span>
              </div>
              <div>
                <span class="label">{{ $t_c('状态') }}:</span>
                <span :style="{ color: statusColor(props.row.status) }">{{ reward(props.row.status) }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
import { ref } from 'vue';

defineProps<{
  tableData: DepositType.requestApiListDataList[];
}>();

const expandArr = ref<number[]>([]);

const expandFun = (rowData: { row: DepositType.requestApiListDataList; rowIndex: number }) =>
  expandArr.value.includes(rowData.row.id) ? `expanded_row ${useSite()}` : '';

const expandChange = (_row: DepositType.requestApiListDataList, expandList: DepositType.requestApiListDataList[]) =>
  (expandArr.value = expandList.map(_ => _.id));

// 状态 <!-- 反水：0 拒绝 or 未通过 1成功 or 已使用 2待处理 3 可使用 4已失效 -->
const reward = (val: number) => {
  if (val === 0) {
    return lang('拒绝');
  } else if (val === 1) {
    return lang('已发放');
  } else if (val === 3) {
    return lang('可使用');
  } else if (val === 4) {
    return lang('已失效');
  } else {
    return lang('申请中');
  }
};

const formateTime = (val: string) => {
  if (val && val.indexOf('.') !== -1) {
    return val.split('.')[0];
  } else {
    return val;
  }
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
</script>
