<template>
  <div :class="['recommend-wrapper-table', site]">
    <table class="table-container">
      <thead>
        <tr>
          <th v-for="(item, index) in tableLabel" :key="index">
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td
            v-for="(renderItem, index) in labelList"
            @click="cellClick(renderItem, item[renderItem as keyof typeof item])"
            :class="{ sbuStyle: renderItem === 'subLoginName' }"
            :key="index">
            {{ item[renderItem as keyof typeof item] || '-' }}
          </td>
        </tr>
        <tr v-if="loading || !tableData.length">
          <td class="no-border" :colspan="tableLabel.length">
            <SelfLoading class="recommend-load" :showLoading="loading" />
            <div v-if="!loading">
              <emptyVue :imgWidth="300"></emptyVue>
              <div class="no-data">{{ $t_c('暂无数据') }}</div>
            </div>
          </td>
        </tr>
        <template v-if="showSummary && tableData.length">
          <tr class="c-f">
            <td>{{ $t_c('小计') }}：</td>
            <td>-</td>
            <td>{{ depositTotal }}</td>
            <td>{{ betTotal }}</td>
          </tr>
          <tr class="c-f">
            <td>{{ $t_c('总计') }}：</td>
            <td>-</td>
            <td>{{ totalData.firstChargeReward }}</td>
            <td>{{ totalData.validBetReward }}</td>
          </tr>
        </template>
      </tbody>
    </table>

    <PaginationComponent
      class="common-page"
      v-if="props.showPagination"
      :pagination="{ currentPage: pageNo as number, pageSize: 5, total: total }"
      :total="total"
      @change="handleCurrentChange" />
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { onMounted, watch, reactive, computed, toRaw } from 'vue';
import PaginationComponent from 'commonComponent/Pagination/index.vue';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import emptyVue from 'commonComponent/empty/empty.vue';
import { useSite } from '@/hook/usePath';

const site = useSite();
const emit = defineEmits(['update:pageNo', 'getFriendDetail']);
const totalData = reactive({
  firstChargeReward: 0,
  validBetReward: 0,
});
const props = withDefaults(
  defineProps<{
    tableData: FriendAPI.getFriendRebateRewardReportForDayList[] | FriendAPI.getFriendRebateList[];
    tableLabel: FriendAPI.tableLabelType[];
    friendForm?: FriendAPI.getFriendRebateFriendsRewardSummaryParams;
    showPagination?: boolean;
    reloadTotal?: boolean;
    pageNo?: number;
    total?: number;
    showSummary?: boolean;
    loading: boolean;
  }>(),
  {
    showPagination: true,
    total: 0,
    showSummary: false,
  }
);

onMounted(() => {
  props.showPagination && _getFriendRebateFriendsRewardSummary();
});

watch(
  () => props.reloadTotal,
  () => {
    _getFriendRebateFriendsRewardSummary();
  }
);

const labelList = computed(() => {
  return props.tableLabel.map(item => item.prop);
});

const depositTotal = computed(() => {
  if (props.showSummary) {
    const tempList = toRaw(props.tableData) as FriendAPI.getFriendRebateList[] &
      FriendAPI.getFriendRebateRewardReportForDayList[];
    return tempList
      .reduce(
        (pre, next) => {
          pre.firstChargeReward = pre?.firstChargeReward + next?.firstChargeReward;
          return pre;
        },
        { firstChargeReward: 0 }
      )
      .firstChargeReward.toFixed(2);
  } else {
    return null;
  }
});

const betTotal = computed(() => {
  if (props.showSummary) {
    const tempList = toRaw(props.tableData) as FriendAPI.getFriendRebateList[] &
      FriendAPI.getFriendRebateRewardReportForDayList[];

    return tempList
      .reduce(
        (pre, next) => {
          pre.validBetReward = pre.validBetReward + next.validBetReward;
          return pre;
        },
        { validBetReward: 0 }
      )
      .validBetReward.toFixed(2);
  } else {
    return null;
  }
});

const handleCurrentChange = ({ current }: { current: number }) => {
  emit('update:pageNo', current as number);
};

const cellClick = (item: string, subLoginName: string | number) => {
  if (item !== 'subLoginName') return;
  emit('getFriendDetail', subLoginName);
};

const _getFriendRebateFriendsRewardSummary = async () => {
  const res = await api.friendsRecommend.getFriendRebateFriendsRewardSummary(
    props.friendForm as FriendAPI.getFriendRebateFriendsRewardSummaryParams
  );
  if (res.code) return;
  Object.assign(totalData, res.msg);
};
</script>

<style lang="scss" scoped>
@import '../../css/table.scss';
</style>
