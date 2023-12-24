<template>
  <div class="get-more-container">
    <div class="self-content">
      <div class="get-more-title" @click="$emit('update:componentName', 'Recommend')">
        &lt; &nbsp;
        <span class="text">{{ $t('收益日报') }}</span>
      </div>
      <div class="search-container">
        <div class="search-left">
          <div class="search-left_top">
            <span class="date-text">{{ $t('首存时间') }}</span>
            <div :class="{ 'date-btn': true, on: currentSelect === 'date' }" @click="currentSelect = 'date'">
              {{ $t('日') }}
            </div>
            <div :class="{ 'date-btn': true, on: currentSelect === 'month' }" @click="currentSelect = 'month'">
              {{ $t('月') }}
            </div>
          </div>
          <!-- popper-class="black-bg" -->
          <el-date-picker
            :editable="false"
            :format="currentSelect === 'month' ? 'yyyy-MM' : 'yyyy/MM/dd'"
            class="search-left_bottom"
            v-model="searchDate"
            type="date"
            :placeholder="$t('选择日期')"
          >
          </el-date-picker>
        </div>
        <div class="search-btn-group">
          <div class="btn search-btn" @click="_searchRecord">{{ $t('查询') }}</div>
          <div class="btn reset-btn" @click="resetSetting">{{ $t('重置') }}</div>
        </div>
      </div>
    </div>
    <!-- 公共表格组件 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :pageNo.sync="pageNo"
      :total="total"
      :loading="loading"
    ></common-table>
  </div>
</template>

<script>
  import CommonTable from "./CommonTable.vue";
  import { dataTime, timedelta } from "@/plugins/auth";
  export default {
    name: "GetMore",
    components: {
      CommonTable,
    },
    created() {
      this._getFriendRebateRewardReportForDay('getAll');
    },
    watch: {
      pageNo() {
        this.currentSelect === "date"
          ? this._getFriendRebateRewardReportForDay()
          : this._getFriendRebateRewardReportForMonth();
      },
      currentSelect() {
        this.pageNo = 1;
      },
    },
    data() {
      return {
        currentSelect: "date",
        searchDate: dataTime(new Date(new Date() - 86400000), 'Y-M-D'),
        tableLabel: [
          { label: this.$t("时间"), prop: "time" },
          { label: this.$t("好友数量"), prop: "num" },
          { label: this.$t("首存收益"), prop: "firstChargeReward" },
          { label: this.$t("投注收益"), prop: "validBetReward" },
          { label: this.$t("VIP等级收益"), prop: "vipReward" },
          { label: this.$t("好友充值收益"), prop: "friendChangeReward" },
        ],
        tableList: [],
        pageNo: 1,
        total: 0,
        loading: false,
      };
    },
    methods: {
      async _searchRecord() {
        if (!this.searchDate) return this.messageTip({ message: this.$t('请先选择查询时间') });
        this.tableList = [];
        this.currentSelect === "date"
          ? this._getFriendRebateRewardReportForDay()
          : this._getFriendRebateRewardReportForMonth();
      },
      async _getFriendRebateRewardReportForDay(type) {
        this.loading = true;
        const startTime = new Date();
        startTime.setFullYear(new Date().getFullYear() - 1);

        const res = await this.$http.getFriendRebateRewardReportForDay({
          pageNo: this.pageNo,
          pageSize: 5,
          startTime: dataTime(this.searchDate || startTime, "Y-M-D"),
          endTime: type ? dataTime(new Date(new Date() - 86400000), "Y-M-D") : dataTime(this.searchDate || startTime, "Y-M-D"),
        });
        this.loading = false;
        if (res.data.code) return;
        this.tableList = res.data.msg.list.reverse();
        this.total = res.data.msg.totalCount;
      },

      async _getFriendRebateRewardReportForMonth() {

        this.loading = true;
        const year = new Date(this.searchDate).getFullYear();
        const month = new Date(this.searchDate).getMonth();

        const res = await this.$http.getFriendRebateRewardReportForMonth({
          pageNo: this.pageNo,
          pageSize: 5,
          startTime: dataTime(new Date(year, month, 1), "Y-M-D"),
          endTime: dataTime(new Date(year, month + 1, 0), "Y-M-D"),
        });

        this.loading = false;
        if (res.data.code) return;
        this.tableList = res.data.msg.list.reverse();
        this.total = res.data.msg.totalCount;
      },
      //- 重制按钮点击
      resetSetting() {
        this.searchDate = '';
        this._getFriendRebateRewardReportForDay('getAll');
      }
    },
    computed: {
      tableData() {
        return this.tableList.map((item, index) => {
          item.num = item.num + `(${item.rnum})`;
          return item;
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../css/getMore.scss';
</style>
<style lang="scss">
  .black-bg {
    background-color: #4b4d5e;
    border: none;
    color: #fff;
    .popper__arrow:after,
    .popper__arrow {
      border-bottom-color: #4b4d5e !important;
    }

    .el-date-picker__header-label,
    .el-picker-panel__icon-btn {
      color: #fff;
    }
    .el-date-table th {
      color: #fff;
    }
    .el-date-table td.current:not(.disabled) span {
      background-color: #f6b56a;
    }
    .el-date-table td.today span {
      color: #fff !important;
    }
  }
</style>
