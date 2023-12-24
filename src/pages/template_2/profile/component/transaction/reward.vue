<template>
  <div>
    <el-table
      v-show="tableData.length !== 0"
      class="betting-table"
      :data="tableData"
      max-height="550"
      @expand-change="expandChange"
      :row-class-name="expandFun"
      style="width: 100%">
      <el-table-column header-align="center" :label="$t_c('时间')" width="180">
        <template #default="scope">
          <span>
            {{ formateTime(scope.row.createTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="auditAddType" :label="$t_c('优惠类型')" width="180">
        <template #default="scope">
          {{ auditAddType(scope.row.auditAddType) }}
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="actualArrival" :label="$t_c('优惠金额')">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="status" type="expand">
        <template #default="props">
          <div class="expend-container">
            <div class="expend-container_row">
              <div>
                <span class="label">{{ $t_c('订单号') }}:</span>
                <span>{{ props.row.orderNo }}</span>
              </div>
              <div>
                <span class="label">{{ $t_c('类型') }}:</span>
                <span>{{ $t_c('奖补') }}</span>
              </div>
            </div>
            <div class="expend-container_row">
              <div>
                <span class="label">{{ $t_c('优惠金额') }}:</span>
                <span>{{ props.row.actualArrival }}</span>
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

const expandArr = ref<string[]>([]);

const expandFun = (rowData: { row: DepositType.requestApiListDataList; rowIndex: number }) =>
  expandArr.value.includes(rowData.row.orderNo) ? `expanded_row ${useSite()}` : '';

const expandChange = (_row: DepositType.requestApiListDataList, expandList: DepositType.requestApiListDataList[]) =>
  (expandArr.value = expandList.map(_ => _.orderNo));

// 奖补状态 <!-- status :0 拒绝 1 通过 2待处理 -->
const reward = (val: number) => {
  if (val === 0) {
    return lang('拒绝');
  } else if (val === 1) {
    return lang('通过');
  } else {
    return lang('待处理');
  }
};

// 奖补类型 <!-- 类型 0 优惠添加 1 额度补回 2 入款冲销 3 其他  4代理充值 -->
const auditAddType = (val: number) => {
  if (val === 0) {
    return lang('优惠添加');
  } else if (val === 1) {
    return lang('额度补回');
  } else if (val === 2) {
    return lang('入款冲销');
  } else if (val === 3) {
    return lang('其他');
  } else {
    return lang('代理充值');
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
