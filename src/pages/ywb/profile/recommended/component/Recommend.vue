<template>
  <div>
    <div :class="['content-title', 'content-title']">
      <div class="content-title_inner">
        <div :class="['en-title', 'recommended']">
          <div class="en-title-content">
            <i></i>
            <span>{{ $t('好友推荐') }}</span>
            <i></i>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="recommend-wrapper">
      <div class="amount-wrapper">
        <div class="item">
          <div class="amount-inner">
            <div class="title">{{ $t('昨日收益') }}</div>
            <div class="amount">{{ rebateSummary.ydActualReward }}{{ $tt('currencySymbol') }}</div>
            <div class="cumulativeAmount">
              {{ $t('累计收益') }}：{{ rebateSummary.sumActualReward }}{{ $tt('currencySymbol') }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="amount-inner">
            <div class="title">{{ $t('昨日首存款返利') }}</div>
            <div class="amount">{{ rebateSummary.ydFirstChargeReward }}{{ $tt('currencySymbol') }}</div>
            <div class="cumulativeAmount">
              {{ $t('累计金额') }}：{{ rebateSummary.sumFirstChargeReward }}{{ $tt('currencySymbol') }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="amount-inner">
            <div class="title">{{ $t('昨日有效投注额返利') }}</div>
            <div class="amount">{{ rebateSummary.ydValidBetReward }}{{ $tt('currencySymbol') }}</div>
            <div class="cumulativeAmount">
              {{ $t('累计金额') }}：{{ rebateSummary.sumValidBetReward }}{{ $tt('currencySymbol') }}
            </div>
          </div>
        </div>
        <div class="btns">
          <div class="top">
            <button class="btn top-btn" @click="$emit('openDialog', 'rule')">{{ $t('规则说明') }}</button>
            <button class="btn top-btn" @click="$emit('openDialog', 'proportion')">{{ $t('比例') }}</button>
          </div>
          <div class="bottom">
            <button class="btn bottom-btn" @click="$emit('update:componentName', 'MyFriend')">
              {{ $t('我的好友') }}
            </button>
            <button class="btn bottom-btn" @click="$emit('openDialog', 'promote')">{{ $t('立即推广') }}</button>
          </div>
        </div>
      </div>
      <div class="daily-earnings">
        <div class="earnings-title">
          <div>{{ $t('收益日报') }}</div>
          <div class="more" @click="$emit('update:componentName', 'GetMore')">{{ $t('更多') }}>></div>
        </div>
        <!-- 表格组件 -->
        <common-table :loading="loading" :showPagination="false" :tableData="tableData" :tableLabel="tableLabel" />
      </div>
    </div>
  </div>
</template>

<script>
import CommonTable from "./CommonTable.vue";
import { dataTime } from "@/plugins/auth";

export default {
  name: "Recommend",
  components: {
    CommonTable,
  },
  created() {
    this.init();
  },
  data() {
    return {
      tableList: [],
      tableLabel: [
        { label: this.$t("时间"), prop: "time" },
        { label: this.$t("好友数量"), prop: "num" },
        { label: this.$t("首存收益"), prop: "firstChargeReward" },
        { label: this.$t("投注收益"), prop: "validBetReward" },
				{ label: this.$t("VIP等级收益"), prop: "vipReward" },
				{ label: this.$t("好友充值收益"), prop: "friendChangeReward" },
      ],
      rebateSummary: {
        ydActualReward: "0.00",
        ydFirstChargeReward: "0.00",
        ydValidBetReward: "0.00",
        sumActualReward: "0.00",
        sumFirstChargeReward: "0.00",
        sumValidBetReward: "0.00",
      },
      loading: false,
    };
  },
  methods: {
    init() {
      this._getFriendRebateRewardReportForDay();
      this._getFriendRebateSummary();
    },
    async _getFriendRebateSummary() {
      const res = await this.$http.getFriendRebateSummary();
      if (res.data.code) return;
      Object.keys(res.data.msg).forEach((key) => {
        this.rebateSummary[key] = res.data.msg[key] || "0.00";
      });
    },
    async _getFriendRebateRewardReportForDay() {
      this.loading = true;
      const startTime = new Date();
      startTime.setHours(0, 0, 0);
      startTime.setFullYear(new Date().getFullYear() - 1);
      const res = await this.$http.getFriendRebateRewardReportForDay({
        pageNo: 1,
        pageSize: 10,
        startTime: dataTime(startTime),
        endTime: dataTime(new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)),
      });
      this.loading = false;
      if (res.data.code) return;
      this.tableList = res.data.msg.list.reverse();
    },
  },
  computed: {
    tableData() {
      return this.tableList.map((item, index) => {
        item.num = item.num + `(${item.rnum})`
        return item;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../css/recommend.scss';
</style>
