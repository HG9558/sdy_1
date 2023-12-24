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
      <el-table-column header-align="center" :label="$t_c('时间')" width="160">
        <template #default="scope">
          <span>
            {{ formatDate(scope.row.time, 'YY-MM-DD') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="type" :label="$t_c('返利类型')"> </el-table-column>
      <el-table-column header-align="center" align="center" prop="reward" :label="$t_c('返利金额')"> </el-table-column>
      <el-table-column header-align="center" align="center" prop="status" :label="$t_c('状态')">
        <template #default="scope">
          <span :style="{ color: statusColor(scope.row.status) }">
            {{ reward(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
import { formatDate } from 'utils/date';
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
