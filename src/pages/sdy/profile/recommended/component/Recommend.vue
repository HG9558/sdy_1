<template>
<div>
  <div class="content-title">
    <div class="content-title_inner">
      <div @click="$emit('changeUrl')" class="title">
        <img class="en-title"  :src="require(`../../img/header/recommended.png`)" style="" alt="">
      </div>
    </div>
  </div>
  <div class="recommend-wrapper">
    <div class="amount-wrapper">
      <div class="item">
        <div class="amount-inner">
          <div class="title">昨日收益（元）</div>
          <div class="amount">￥{{ rebateSummary.ydActualReward }}</div>
          <div class="cumulativeAmount">
            累计金额：{{ rebateSummary.sumActualReward }}元
          </div>
        </div>
      </div>
      <div class="item">
        <div class="amount-inner">
          <div class="title">昨日首存款返利（元）</div>
          <div class="amount">￥{{ rebateSummary.ydFirstChargeReward }}</div>
          <div class="cumulativeAmount">
            累计金额：{{ rebateSummary.sumFirstChargeReward }}元
          </div>
        </div>
      </div>
      <div class="item">
        <div class="amount-inner">
          <div class="title">昨日有效投注额返利（元）</div>
          <div class="amount">￥{{ rebateSummary.ydValidBetReward }}</div>
          <div class="cumulativeAmount">
            累计金额：{{ rebateSummary.sumValidBetReward }}元
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="top">
          <button class="btn top-btn" @click="$emit('openDialog', 'rule')">
            规则说明
          </button>
          <button class="btn top-btn" @click="$emit('openDialog', 'proportion')">
            比例
          </button>
        </div>
        <div class="bottom">
          <button class="btn bottom-btn" @click="$emit('update:componentName', 'MyFriend')">
            我的好友
          </button>
          <button class="btn bottom-btn" @click="$emit('openDialog', 'promote')">
            立即推广
          </button>
        </div>
      </div>
    </div>
    <div class="daily-earnings">
      <div class="earnings-title">
        <div>收益日报</div>
        <div class="more" @click="$emit('update:componentName', 'GetMore')">
          更多>>
        </div>
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
  created () {
    this.init();
  },
  data () {
    return {
      tableList: [],
      tableLabel: [
        { label: "时间", prop: "time" },
        { label: "好友数量", prop: "num" },
        { label: "首存收益", prop: "firstChargeReward" },
        { label: "投注收益", prop: "validBetReward" },
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
    init () {
      this._getFriendRebateRewardReportForDay();
      this._getFriendRebateSummary();
    },
    async _getFriendRebateSummary () {
      const res = await this.$http.getFriendRebateSummary();
      if (res.data.code) return;
      Object.keys(res.data.msg).forEach((key) => {
        this.rebateSummary[key] = res.data.msg[key] || "0.00";
      });
    },
    async _getFriendRebateRewardReportForDay () {
      this.loading = true;
      const startTime = new Date();
      startTime.setHours(0, 0, 0);
      startTime.setFullYear(new Date().getFullYear() - 1);
      const res = await this.$http.getFriendRebateRewardReportForDay({
        pageNo: 1,
        pageSize: 10,
        startTime: dataTime(startTime),
        endTime: dataTime(new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1)),
      });
      this.loading = false;
      if (res.data.code) return;
      this.tableList = res.data.msg.list.reverse();
    },
  },
  computed: {
    tableData () {
      return this.tableList.map((item, index) => {
        item.num = item.num + `(${item.rnum})`
        return item;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/recommend.scss";
.en-title {
    width:501px;
    right: 200px;
    position: relative;
    top: 11px;
}
</style>
