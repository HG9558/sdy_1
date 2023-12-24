<template>
  <div class="my-friend-detail-wrapper">
    <div class="friend-account">
      <div class="title" @click="$emit('update:componentName', 'MyFriend')">
        &lt; &nbsp;
        <span class="title-text"> 好友详情 </span>
      </div>
      <div class="account-info">
        <div class="account-info_left">
          <img src="../img/avatar.png" alt="" />
          <div>
            <div class="friend-name">
              <span>{{ friendDetailData.subLoginName || '' }}</span>
              <span class="level">vip{{ friendDetailData.vipLevel }}</span>
            </div>
            <div class="logo-date">最近登陆：{{ friendDetailData.lastLoginTime }}</div>
          </div>
        </div>
        <div class="account-info_right">
          <div class="box">
            <div class="box-title">首存金额</div>
            <div class="amount">¥{{ friendDetailData.firstCharge || '0.00' }}</div>
          </div>
          <div class="box">
            <div class="box-title">累计充值</div>
            <div class="amount">¥{{ friendDetailData.totalDeposit || '0.00' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="statistics-time">
      <div class="date-title">收益统计时间</div>
      <div class="date-search">
        <!-- popper-class="black-bg" -->
        <el-date-picker
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="timeList"
        ></el-date-picker>
        <div class="search-btn-group">
          <div class="btn search-btn" @click="search">查询</div>
          <div class="btn reset-btn" @click="reset">重置</div>
        </div>
      </div>
      <div class="date-box">
        <div
          v-for="(item, index) in dateList"
          :key="index"
          @click="chooseBtn(item, index)"
          :class="{ btn: true, on: currentIndex === index }"
        >
          {{ item }}
        </div>
      </div>

      <div class="record-list-container">
        <div :class="`record-list-item record-list-item-${index + 1}`" v-for="(item, index) in recordList" :key="index">
          <span class="record-list-text"> {{ item.txt }} (MYR) </span>
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
      dateList: ["昨天", "本周", "上周", "本月"],
      currentIndex: 0,
      timeList: getTime("昨天"),
      timer: [],
      recordList: [
        { txt: "真人", money: 0, label: "zrValidBetReward" },
        { txt: "电子", money: 0, label: "dzValidBetReward" },
        { txt: "电竞", money: 0, label: "djValidBetReward" },
        { txt: "体育", money: 0, label: "tyValidBetReward" },
        { txt: "棋牌", money: 0, label: "qpValidBetReward" },
        { txt: "彩票", money: 0, label: "cpValidBetReward" },
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
