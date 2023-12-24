<template>
  <div>
    <div class="top-div">
      <span class="date-span">日期:</span>
      <div class="filter-content">
        <div class="date-div">
           <el-date-picker class="date-picker" v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <el-button @click="queryBtn" class="inquire bog">查询</el-button>
        </div>
        <div class="date-box">
          <div class="date-btn" v-for="(item, index) in dateButtom" :key="index">
            <button @click="chooseBtn(item.name, index)" :class="{ 'btn-active': active === index }">
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>

      <div class="transaction-type-items">
        <div class="no-data-div">
          <span :class="{ 'active-span': activeSpan === item.mark }" v-for="item in tranList" :key="item.mark" style="position: relative" @click="changeSpan(item)">
            {{ item.name }}
            <span class="bot"></span>
          </span>
        </div>
         <div class="bottom-div-inner">
        <deposit v-show="activeSpan === 0 && tableData.length !== 0" :tableData="tableData" />
        <withdrawal v-show="activeSpan === 1 && tableData.length !== 0" :tableData="tableData" :time="remindersTime"  @getDataList="getDataList" />
        <reward v-show="activeSpan === 2 && tableData.length !== 0" :tableData="tableData" />
        <discount v-show="activeSpan === 3 && tableData.length !== 0" :tableData="tableData" />
        <rebate v-show="activeSpan === 4 && tableData.length !== 0" :tableData="tableData" />
        <LastRebate v-show="activeSpan === 5 && tableData.length !== 0" :tableData="tableData" />
        <div class="no-data-img" v-show="shwoNodata">
          <img src="../withdrawal/img/no_data.png" alt="" />
          <span>暂无数据</span>
        </div>
        <div class="no-data-gif" v-show="showLoding">
          <img style="width: 150px;" src="../img/load.gif" alt="" />
        </div>
        </div>
        <Pagination :pagination="paginationList" @change="paginationChange" v-show="!!tableData.length" />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "commonComponent/Pagination";
import { getTime, dataTime } from "@/plugins/auth.js";
import reward from "./component/reward.vue";
import deposit from "./component/deposit.vue";
import withdrawal from "./component/withdrawal.vue";
import rebate from "./component/rebate.vue";
import discount from "./component/discount.vue";
import LastRebate from "./component/LastRebate.vue";
import debounce from "lodash/debounce";
export default {
  name: "Transaction",
  components: {
    Pagination,
    reward,
    deposit,
    withdrawal,
    rebate,
    discount,
    LastRebate,
  },
  data () {
    return {
      showLoding: false,
      shwoNodata: false,
      dateButtom: [
        { name: "今天" },
        { name: "三天内" },
        { name: "一周内七天" },
        { name: "近30天" },
      ],
      active: 0,
      activeSpan: 0,
      tableData: [],
      search: {
        key: "",
        current: 1,
        limit: 10,
      },
      paginationTotal: 0,
      timeList: getTime("今天"),
      totalData: {},
      value1: [
        new Date(new Date(new Date().toLocaleDateString()).getTime()),
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
        ),
      ],
      tranList: [
        { name: "存款", mark: 0 },
        { name: "提款", mark: 1 },
        { name: "优惠", mark: 3 },
        { name: "奖补", mark: 2 },
        { name: "返水", mark: 4 },
        { name: "返利", mark: 5 },
      ],
      remindersTime: 0,
    };
  },
  computed: {
    paginationList () {
      return {
        currentPage: this.search.current,
        pageSize: this.search.limit,
        total: this.paginationTotal,
      };
    },
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this.getDataList();
      },
    },
  },
  methods: {
    queryBtn: debounce(
      function () {
        // 查询按钮
        this.getDataList();
      },
      300,
      { leading: true, trailing: false }
    ),
    // 数据接口列表请求接口调用方法
    async getDataList () {
      this.tableData = [];
      let data = {
        pageSize: this.search.limit,
        pageNo: this.search.current,
        startTime: dataTime(this.value1[0], "Y-m-d H:i:s"),
        entTime: dataTime(this.value1[1], "Y-m-d H:i:s"),
      };
      this.shwoNodata = false;
      this.showLoding = true;
      
      const requestApiList = ['getTransactionDataList', 'getwdAppRecordList', 'getTransactionDataList', 'getBonusListList', 'getdepotWaterDetailList', 'rewardList'];

      (this.activeSpan === 0 || this.activeSpan === 2) && (data.mark = this.activeSpan);
      try {
        const res = await this.$http[requestApiList[this.activeSpan]](data);
        this.showLoding = false;
        if (res.data.code) return;
        const result = res.data.res || res.data.page || res.data.data || res.data.msg;
        this.tableData = result.list;
        this.paginationTotal = result.totalCount;
        this.remindersTime = res.data.time || 0;
        if (this.tableData.length === 0) this.shwoNodata = true;
      } catch (error) {
        console.log(error)
        this.showLoding = false;
      }
    },
    changeSpan (item) {
      this.tableData = [];
      this.activeSpan = item.mark;
      this.search.current = 1;
      this.getDataList();
    },
    paginationChange ({ current = 1, size = 10 }) {
      // this.tableData = []
      this.search.current = current;
      this.search.limit = size;
      this.getDataList();
    },
    chooseBtn (name, index) {
      // 切换时间
      this.active = index;
      this.timeList = getTime(name);
      this.value1 = [];
      this.value1[0] = this.timeList[0] + " 00:00:00";
      this.value1[1] = this.timeList[1] + " 23:59:59";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
