<template>
  <div :class="['get-more-container', site]">
    <div class="self-content">
      <div class="search-container">
        <div class="search-left">
          <div :class="['search-left_top', globalState.language]">
            <span class="date-text">{{ $t_c('首存时间') }}</span>
            <div
              :class="['date-btn', currentSelect === 'date' && 'on', globalState.language]"
              @click="currentSelect = 'date'">
              {{ $t_c('日') }}
            </div>
            <div
              :class="['date-btn', currentSelect === 'month' && 'on', globalState.language]"
              @click="currentSelect = 'month'">
              {{ $t_c('月') }}
            </div>
          </div>
          <el-date-picker
            class="date-picker get-more-date"
            v-model="searchDate"
            type="date"
            :clearable="false"
            :format="currentSelect === 'month' ? 'YYYY/MM' : 'YYYY/MM/DD'">
          </el-date-picker>
        </div>
        <div class="search-btn-group">
          <div class="btn search-btn" @click="_searchRecord">{{ $t_c('查询') }}</div>
          <div class="btn reset-btn" @click="resetSetting">{{ $t_c('重置') }}</div>
        </div>
      </div>
    </div>
    <!-- 公共表格组件 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      v-model:pageNo="pageNo"
      :total="total"
      :loading="loading"></common-table>
  </div>
</template>

<script lang="ts" setup>
import CommonTable from './CommonTable.vue';
import { dataTime } from '@/hook/useAuth';
import { onMounted, watch, ref, computed } from 'vue';
import useDialog from '@/hook/useDialog';
import { api } from '@/api';
import { lang } from '@/i18n';
import { useSite } from '@/hook/usePath';
// import { useGlobalState } from '@/stores';

const site = useSite();
const { messageTip } = useDialog();
const currentSelect = ref('date');
const searchDate = ref(dataTime(new Date(new Date().getTime() - 86400000).toDateString(), 'Y-M-D'));
const tableLabel = ref([
  { label: lang('时间'), prop: 'time' },
  { label: lang('好友数量'), prop: 'num' },
  { label: lang('首存收益'), prop: 'firstChargeReward' },
  { label: lang('投注收益'), prop: 'validBetReward' },
]);
const tableList = ref<FriendAPI.getFriendRebateRewardReportForDayList[]>([]);
const pageNo = ref(1);
const total = ref(0);
const loading = ref(false);
const globalState = useGlobalState();

onMounted(() => {
  _getFriendRebateRewardReportForDay('getAll');
});

watch(pageNo, () => {
  currentSelect.value === 'date' ? _getFriendRebateRewardReportForDay() : _getFriendRebateRewardReportForMonth();
});

watch(currentSelect, () => {
  pageNo.value = 1;
});

const tableData = computed(() => {
  return tableList.value.map(item => {
    item.num = item.num + +`(${item.rnum})`;
    return item;
  });
});

const _searchRecord = async () => {
  if (!searchDate.value) return messageTip({ message: lang('请先选择查询时间') });
  tableList.value = [];
  currentSelect.value === 'date' ? _getFriendRebateRewardReportForDay() : _getFriendRebateRewardReportForMonth();
};
const _getFriendRebateRewardReportForDay = async (type?: string) => {
  loading.value = true;
  const startTime = new Date();
  startTime.setFullYear(new Date().getFullYear() - 1);

  const res = await api.friendsRecommend.getFriendRebateRewardReportForDay({
    pageNo: pageNo.value,
    pageSize: 5,
    // startTime: dataTime(this.searchDate || startTime, "Y-M-D"),
    endTime: type ? dataTime(new Date(), 'Y-M-D') : dataTime(searchDate.value || startTime, 'Y-M-D'),
  } as FriendAPI.getFriendRebateRewardReportForDayParams);
  loading.value = false;
  if (res.code) return;
  tableList.value = res.msg.list.reverse();
  total.value = res.msg.totalCount;
};

const _getFriendRebateRewardReportForMonth = async () => {
  loading.value = true;
  const year = new Date(searchDate.value).getFullYear();
  const month = new Date(searchDate.value).getMonth();

  const res = await api.friendsRecommend.getFriendRebateRewardReportForMonth({
    pageNo: pageNo.value,
    pageSize: 5,
    startTime: dataTime(new Date(year, month, 1), 'Y-M-D'),
    endTime: dataTime(new Date(year, month + 1, 0), 'Y-M-D'),
  });

  loading.value = false;
  if (res.code) return;
  tableList.value = res.msg.list.reverse();
  total.value = res.msg.totalCount;
};
//- 重制按钮点击
const resetSetting = () => {
  searchDate.value = '';
  _getFriendRebateRewardReportForDay('getAll');
};
</script>

<style scoped lang="scss">
@import '../../css/getMore.scss';
</style>
