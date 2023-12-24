<template>
  <div class="my-friend-detail-wrapper">
    <div class="friend-account">
      <div class="title" @click="$emit('update:componentName', 'MyFriend')">
        &lt; &nbsp;
        <span class="title-text">{{ $t('好友详情') }}</span>
      </div>
      <div class="account-info">
        <div class="account-info_left">
          <img src="../img/avatar.png" alt="" />
          <div>
            <div class="friend-name">
              <span>{{ friendDetailData.subLoginName || '' }}</span>
              <span class="level">vip{{ friendDetailData.vipLevel }}</span>
            </div>
            <div class="logo-date">{{ $t('最近登陆') }}：{{ friendDetailData.lastLoginTime }}</div>
          </div>
        </div>
        <div class="account-info_right">
          <div class="box">
            <div class="box-title">{{ $t('首存金额') }}</div>
            <div class="amount">{{ $tt('currencySymbol') }}{{ friendDetailData.firstCharge || '0.00' }}</div>
          </div>
          <div class="box">
            <div class="box-title">{{ $t('累计充值') }}</div>
            <div class="amount">{{ $tt('currencySymbol') }}{{ friendDetailData.totalDeposit || '0.00' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="statistics-time">
      <div class="date-title">{{ $t('收益统计时间') }}</div>
      <div class="date-search">
        <!-- popper-class="black-bg" -->
        <el-date-picker
          type="daterange"
          :start-placeholder="$t('开始日期')"
          :end-placeholder="$t('结束日期')"
          v-model="timeList"
        ></el-date-picker>
        <div class="search-btn-group">
          <div class="btn search-btn" @click="search">{{ $t('查询') }}</div>
          <div class="btn reset-btn" @click="reset">{{ $t('重置') }}</div>
        </div>
      </div>
      <div class="date-box">
        <div
          v-for="(item, index) in dateList"
          :key="index"
          @click="chooseBtn(item.value, index)"
          :class="{ btn: true, on: currentIndex === index }"
        >
          {{ item.name }}
        </div>
      </div>

      <div class="record-list-container">
        <div :class="`record-list-item record-list-item-${index + 1}`" v-for="(item, index) in recordList" :key="index">
          <span class="record-list-text"> {{ item.txt }} （{{ $tt('currencySymbol') }}） </span>
          <span class="record-list-number">
            {{ item.money && item.money.toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTime, dataTime } from "@/plugins/auth.js";
import { mapState } from "vuex";

export default {
  name: "MyFriendDetail",
  created() {
    this.timer[0] = this.timeList[0] + " 00:00:00";
    this.timer[1] = this.timeList[1] + " 23:59:59";
    this._getFriendRebateDetails({
      startTime: this.timer[0],
      endTime: this.timer[1],
    });
  },
  data() {
    return {
      // dateList: [this.$t("昨天"), this.$t("本周"), this.$t("上周"), this.$t("本月")],
      dateList: [
        { name: this.$t('昨天'), value: '昨天' },
        { name: this.$t('本周'), value: '本周' },
        { name: this.$t('上周'), value: '上周' },
        { name: this.$t('本月'), value: '本月' },
      ],
      currentIndex: 0,
      timeList: getTime("昨天"),
      timer: [],
      recordList: [
        { txt: this.$t("真人"), money: 0, label: "zrValidBetReward" },
        { txt: this.$t("电子"), money: 0, label: "dzValidBetReward" },
        { txt: this.$t("电竞"), money: 0, label: "djValidBetReward" },
        { txt: this.$t("体育"), money: 0, label: "tyValidBetReward" },
        { txt: this.$t("棋牌"), money: 0, label: "qpValidBetReward" },
        { txt: this.$t("彩票"), money: 0, label: "cpValidBetReward" },
      ],
      friendDetailData: {},
    };
  },
  computed: {
    ...mapState({
      subLoginName: state => state.global.subLoginName
    }),
  },
  methods: {
    chooseBtn(name, index) {
      this.currentIndex = index;
      this.timeList = getTime(name);
      this.timer = [];
      this.timer[0] = this.timeList[0] + " 00:00:00";
      this.timer[1] = this.timeList[1] + " 23:59:59";

      this._getFriendRebateDetails({
        startTime: dataTime(this.timeList[0] + " 00:00:00"),
        endTime: dataTime(this.timeList[1] + " 23:59:59"),
      });
    },
    async _getFriendRebateDetails(data = {}) {
      data.startTime = data.startTime.split(' ')[0] + " 00:00:00";
      data.endTime = data.endTime.split(' ')[0] + " 23:59:59";
      const res = await this.$http.getFriendRebateDetails({
        subLoginName: this.subLoginName,
        ...data,
      });
      if (res.data.code) return;
      if (res.data.msg) {
        this.friendDetailData = res.data.msg;
        this.recordList.forEach((item) => {
          item.money = this.friendDetailData[item.label] || 0;
        });
      }
    },
    //- 查询好友详情
    search() {
      if (typeof this.timeList[0] === 'string') {
        this._getFriendRebateDetails({
          startTime: dataTime(this.timeList[0] + " 00:00:00"),
          endTime: dataTime(this.timeList[1] + " 23:59:59"),
        });
      } else {
        this._getFriendRebateDetails({
          startTime: dataTime(this.timeList[0]),
          endTime: dataTime(this.timeList[1]),
        });
      }

    },
    reset() {
      this.timeList = getTime("昨天");
      this.currentIndex = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../css/myFriendDetail.scss';
</style>
