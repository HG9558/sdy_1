<template>
  <div :class="['my-friend-wrapper', site]">
    <div class="content">
      <!-- 表单 -->
      <el-form :model="friendForm" ref="friendFormRef" class="search-myfriend">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="firstDepositTime" :label="$t_c('首存时间')">
              <el-date-picker
                class="date-picker friend-picker clear-icon"
                v-model="firstDepositTime"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t_c('开始日期')"
                :end-placeholder="$t_c('结束日期')"
                @change="changeDepositTime"
                :clearable="false"
                :prefix-icon="customPrefix">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="incomeStatisticsTime" :label="$t_c('收益统计时间')">
              <el-date-picker
                class="date-picker friend-picker clear-icon"
                v-model="incomeStatisticsTime"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t_c('开始日期')"
                :end-placeholder="$t_c('结束日期')"
                @change="changeGetTime"
                :clearable="false"
                :prefix-icon="customPrefix">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="subLoginName" :label="$t_c('好友账号')">
              <el-input
                class="friend-account"
                v-model="friendForm.subLoginName"
                :placeholder="$t_c('请输入好友账号')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="btns-wrapper">
          <el-button class="btn search-btn" type="primary" @click="submitForm">{{ $t_c('查询') }}</el-button>
          <el-button class="btn reset-btn" @click="clearFom">{{ $t_c('重置') }}</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <common-table
        :showSummary="true"
        :reloadTotal="reloadTotal"
        @getFriendDetail="getFriendDetail"
        :tableData="tableData"
        :friendForm="friendForm"
        :tableLabel="tableLabel"
        v-model:pageNo="pageNo"
        :loading="loading"
        :total="total" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CommonTable from './CommonTable.vue';
import { dataTime } from '@/hook/useAuth';
import { onMounted, ref, reactive, watch, shallowRef, h } from 'vue';
// import { useGlobalState } from '@/stores';
import { api } from '@/api';
import { lang } from '@/i18n';
import { useSite } from '@/hook/usePath';

const site = useSite();
const customPrefix = shallowRef({
  render() {
    return h('p', '');
  },
});
const emit = defineEmits(['currentComponentNameClick']);
const globalState = useGlobalState();
const firstDepositTime = ref('');
const incomeStatisticsTime = ref('');
const tableData = ref<FriendAPI.getFriendRebateList[]>([]);
const reloadTotal = ref(false);
const pageNo = ref(1);
const total = ref(0);
const loading = ref(false);
const friendFormRef = ref();
const requestData = reactive({} as FriendAPI.getFriendRebateListParams);
const friendForm = reactive({
  subLoginName: '',
  firstChargeStartTime: '',
  startTime: '',
  endTime: '',
  firstChargeEndTime: '',
});

const tableLabel = ref([
  { label: lang('好友账号'), prop: 'subLoginName' },
  { label: lang('首存时间'), prop: 'firstChargeTime' },
  { label: lang('首存收益'), prop: 'firstChargeReward' },
  { label: lang('投注收益'), prop: 'validBetReward' },
]);

onMounted(() => {
  _getFriendRebateList();
});

watch(pageNo, () => {
  _getFriendRebateList();
});

const submitForm = () => {
  pageNo.value = 1;
  reloadTotal.value = !reloadTotal.value;
  _getFriendRebateList();
};
const _getFriendRebateList = async () => {
  friendForm.firstChargeStartTime &&
    (friendForm.firstChargeStartTime = friendForm.firstChargeStartTime.split(' ')[0] + ' 00:00:00');
  friendForm.firstChargeEndTime &&
    (friendForm.firstChargeEndTime = friendForm.firstChargeEndTime.split(' ')[0] + ' 23:59:59');
  friendForm.startTime && (friendForm.startTime = friendForm.startTime.split(' ')[0] + ' 00:00:00');
  friendForm.endTime && (friendForm.endTime = friendForm.endTime.split(' ')[0] + ' 23:59:59');
  tableData.value = [];
  loading.value = true;
  Object.assign(requestData, {
    pageNo: pageNo.value,
    pageSize: 5,
    ...friendForm,
  });

  if (friendForm.firstChargeStartTime || friendForm.startTime) {
    requestData.showAll = 0;
  }

  const res = await api.friendsRecommend.getFriendRebateList(requestData);

  loading.value = false;

  if (res.code) return;

  res.msg.list.forEach((item: FriendAPI.getFriendRebateList) => {
    item.firstChargeTime == 0 && (item.firstChargeTime = '-');
  });
  tableData.value = res.msg.list;
  total.value = res.msg.totalCount;
};
const getFriendDetail = (val: string) => {
  globalState.set_sub_login_name(val);
  emit('currentComponentNameClick', 'MyFriendDetail');
};
const changeDepositTime = (val: string[]) => {
  friendForm.firstChargeStartTime = val ? dataTime(val[0]) : '';
  friendForm.firstChargeEndTime = val ? dataTime(val[1]) : '';
};
const changeGetTime = (val: string[]) => {
  friendForm.startTime = val ? dataTime(val[0]) : '';
  friendForm.endTime = val ? dataTime(val[1]) : '';
};
const clearFom = () => {
  firstDepositTime.value = '';
  incomeStatisticsTime.value = '';
  Object.keys(friendForm).forEach(key => {
    friendForm[key as keyof typeof friendForm] = '';
  });
};
</script>

<style lang="scss" scoped>
@import '../../css/myFriend.scss';
</style>
