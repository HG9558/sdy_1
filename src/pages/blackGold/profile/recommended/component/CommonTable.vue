<template>
  <div class="recommend-wrapper-table">
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
          @click="cellClick(renderItem, item[renderItem])"
          :class="{ sbuStyle: renderItem === 'subLoginName' }"
          v-for="(renderItem, index) in labelList"
          :key="index"
        >
          {{ item[renderItem] || '-' }}
        </td>
      </tr>
      <tr v-if="loading || !tableData.length">
        <td class="no-border img-container" :colspan="tableLabel.length">
          <!-- 弹窗组件 -->
          <Loading :showLoading="loading" class="recommend-load" />
          <img v-if="!loading" class="no-data-img" src="../../img/no_data.png" alt="" />
          <div>{{ $t('暂无数据') }}</div>
        </td>
      </tr>
      <template v-if="showSummary && tableData.length">
        <tr class="c-f">
          <td>{{ $t('小计') }}：</td>
          <td>-</td>
          <td>{{ depositTotal }}</td>
          <td>{{ betTotal }}</td>
          <td>{{ vipRewardTotal }}</td>
          <td>{{ friendChangeRewardTotal }}</td>
        </tr>
        <tr class="c-f">
          <td>{{ $t('总计') }}：</td>
          <td>-</td>
          <td>{{ totalData.firstChargeReward }}</td>
          <td>{{ totalData.validBetReward }}</td>
          <td>{{ totalData.vipReward }}</td>
          <td>{{ totalData.friendChangeReward }}</td>
        </tr>
      </template>
      </tbody>
    </table>

    <el-pagination
      v-if="showPagination"
      class="common-page"
      align="right"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNo"
      layout="total, prev, pager, next"
      :total="total"
      :page-size="5"
    >
    </el-pagination>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";

  export default {
    name: "Table",
    created() {
      this.showPagination && this._getFriendRebateFriendsRewardSummary();
    },
    props: {
      tableData: Array,
      tableLabel: Array,
      friendForm: Object,
      showPagination: {
        type: Boolean,
        default: true,
      },
      reloadTotal: {
        type: Boolean,
      },
      pageNo: Number,
      total: {
        type: Number,
        default: 0,
      },
      showSummary: {
        type: Boolean,
        default: false,
      },
      loading: Boolean,
    },
    watch: {
      reloadTotal(val) {
        this._getFriendRebateFriendsRewardSummary();
      }
    },
    data() {
      return {
        totalData: {
          firstChargeReward: 0,
          validBetReward: 0,
        },
      };
    },
    methods: {
      ...mapMutations(["SET_SUBLOGINNAME"]),
      handleCurrentChange(page) {
        this.$emit("update:pageNo", page);
      },
      cellClick(item, subLoginName) {
        if (item !== "subLoginName") return;
        this.$emit("getFriendDetail", subLoginName);
      },
      async _getFriendRebateFriendsRewardSummary() {
        const res = await this.$http.getFriendRebateFriendsRewardSummary(this.friendForm);
        if (res.data.code) return;
        this.totalData = res.data.msg;
      },
    },
    computed: {
      labelList() {
        return this.tableLabel.map((item) => item.prop);
      },
      depositTotal() {
        if (this.showSummary) {
          return this.tableData.reduce(
            (pre, next) => {
              pre.firstChargeReward =
                pre?.firstChargeReward + next?.firstChargeReward;
              return pre;
            },
            { firstChargeReward: 0 }
          ).firstChargeReward.toFixed(2);
        } else {
          return null;
        }
      },
      betTotal() {
        if (this.showSummary) {
          return this.tableData.reduce(
            (pre, next) => {
              pre.validBetReward = pre.validBetReward + next.validBetReward;
              return pre;
            },
            { validBetReward: 0 }
          ).validBetReward.toFixed(2);
        } else {
          return null;
        }
      },
      vipRewardTotal() {
        if (this.showSummary) {
          return this.tableData.reduce(
            (pre, next) => {
              pre.vipReward = pre.vipReward + next.vipReward;
              return pre;
            },
            { vipReward: 0 }
          ).vipReward.toFixed(2);
        } else {
          return null;
        }
      },
      friendChangeRewardTotal() {
        if (this.showSummary) {
          return this.tableData.reduce(
            (pre, next) => {
              pre.friendChangeReward = pre.friendChangeReward + next.friendChangeReward;
              return pre;
            },
            { friendChangeReward: 0 }
          ).friendChangeReward.toFixed(2);
        } else {
          return null;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../css/table.scss';
</style>
