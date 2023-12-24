<template>
  <div class="my-friend-wrapper">
    <div class="title" @click="$emit('update:componentName', 'Recommend')">
      &lt; &nbsp;
      <span class="title-text">{{ $t('我的好友') }}</span>
    </div>
    <div class="content">
      <!-- 表单 -->
      <el-form :model="friendForm" ref="friendForm" label-width="200px" class="search-myfriend">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="firstDepositTime" :label="$t('首存时间')">
              <!-- popper-class="black-bg" -->
              <el-date-picker
                @change="changeDepositTime"
                type="daterange"
                :range-separator="$t('至')"
                :start-placeholder="$t('开始日期')"
                :end-placeholder="$t('结束日期')"
                v-model="firstDepositTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="incomeStatisticsTime" :label="$t('收益统计时间')">
              <!-- popper-class="black-bg" -->
              <el-date-picker
                @change="changeGetTime"
                type="daterange"
                :range-separator="$t('至')"
                :start-placeholder="$t('开始日期')"
                :end-placeholder="$t('结束日期')"
                v-model="incomeStatisticsTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="subLoginName" :label="$t('好友账号')">
              <el-input
                class="friend-account"
                v-model="friendForm.subLoginName"
                :placeholder="$t('请输入好友账号')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button class="btn search-btn" type="primary" @click="submitForm">{{ $t('查询') }}</el-button>
          <el-button class="btn reset-btn" @click="clearFom">{{ $t('重置') }}</el-button>
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
        :pageNo.sync="pageNo"
        :loading="loading"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import CommonTable from "./CommonTable.vue";
import { dataTime } from "@/plugins/auth";
import { mapMutations } from "vuex";
export default {
  name: "MyFriend",
  components: {
    CommonTable,
  },
  created() {
    this._getFriendRebateList();
  },
  watch: {
    pageNo() {
      this._getFriendRebateList();
    },
  },
  data() {
    return {
      firstDepositTime: "",
      incomeStatisticsTime: "",
      tableData: [],
      reloadTotal: false,
      friendForm: {
        subLoginName: "",
        firstChargeStartTime: "",
        startTime: "",
        endTime: "",
      },
      tableLabel: [
        { label: this.$t("好友账号"), prop: "subLoginName" },
        { label: this.$t("首存时间"), prop: "firstChargeTime" },
        { label: this.$t("首存收益"), prop: "firstChargeReward" },
        { label: this.$t("投注收益"), prop: "validBetReward" },
				{ label: this.$t("VIP等级收益"), prop: "vipReward" },
				{ label: this.$t("好友充值收益"), prop: "friendChangeReward" },
      ],
      pageNo: 1,
      total: 0,
      loading: false,
    };
  },
  methods: {
    ...mapMutations('global', ['set_sub_login_name']),
    submitForm() {
      this.pageNo = 1;
      this.reloadTotal = !this.reloadTotal;
      this._getFriendRebateList();
    },
    async _getFriendRebateList() {
      this.friendForm.firstChargeStartTime && (this.friendForm.firstChargeStartTime = this.friendForm.firstChargeStartTime.split(' ')[0] + ' 00:00:00');
      this.friendForm.firstChargeEndTime && (this.friendForm.firstChargeEndTime = this.friendForm.firstChargeEndTime.split(' ')[0] + ' 23:59:59');
      this.friendForm.startTime && (this.friendForm.startTime = this.friendForm.startTime.split(' ')[0] + ' 00:00:00');
      this.friendForm.endTime && (this.friendForm.endTime = this.friendForm.endTime.split(' ')[0] + ' 23:59:59');
      this.tableData = [];
      this.loading = true;
      const requestData = {
        pageNo: this.pageNo,
        pageSize: 5,
        ...this.friendForm,
      }
      if (this.friendForm.firstChargeStartTime || this.friendForm.startTime) {
        requestData.showAll = 0;
      }
      const res = await this.$http.getFriendRebateList(requestData);
      this.loading = false;
      if (res.data.code) return;
      res.data.msg.list.forEach(item => {
        item.firstChargeTime == 0 && (item.firstChargeTime = '-')
      })
      this.tableData = res.data.msg.list;
      this.total = res.data.msg.totalCount;
    },
    getFriendDetail(val) {
      this.set_sub_login_name(val);
      this.$emit("update:componentName", "MyFriendDetail");
    },
    changeDepositTime(val) {
      this.friendForm.firstChargeStartTime = val
        ? dataTime(val[0])
        : "";
      this.friendForm.firstChargeEndTime = val ? dataTime(val[1]) : "";
    },
    changeGetTime(val) {
      this.friendForm.startTime = val ? dataTime(val[0]) : "";
      this.friendForm.endTime = val ? dataTime(val[1]) : "";
    },
    clearFom() {
      this.firstDepositTime = "";
      this.incomeStatisticsTime = "";
      Object.keys(this.friendForm).forEach(key => {
        this.friendForm[key] = ""
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../css/myFriend.scss';
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
    color: #f6b56a;
  }
  .el-date-table td.in-range div {
    background-color: #f6b56a;
  }
  .el-date-table td.start-date span,
  .el-date-table td.end-date span {
    background-color: #4b4d5e;
  }
}
</style>
