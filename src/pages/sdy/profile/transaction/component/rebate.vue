<template>
  <div>
    <el-table v-show="tableData.length !== 0" class="betting-table" :data="tableData" max-height="550" style="width: 100%">
      <el-table-column header-align="center" label="时间" width="160">
        <template slot-scope="scope">
          <span>
            {{ formateTime(scope.row.applicationTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="catName" label="游戏类型">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="depotName" label="游戏平台">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="validbet" label="有效投注">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="amount" label="结算金额">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <span :style="{'color': statusColor(scope.row.status)}">
            {{ reward(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="审核时间">
        <template slot-scope="scope">
          <span>
            {{ formateTime(scope.row.auditTime) }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "reward",
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {
    // 状态 <!-- 反水：0 拒绝 or 未通过 1成功 or 已使用 2待处理 3 可使用 4已失效 -->
    reward (val) {
      if (val === 0) {
        return '拒绝'
      } else if (val === 1) {
        return '已发放'
      } else if (val === 3) {
        return '可使用'
      } else if (val === 4) {
        return '已失效'
      } else {
        return '申请中'
      }
    },
    formateTime (val) {
      if (val && val.indexOf('.') !== -1) {
        return val.split('.')[0]
      } else {
        return val
      }
    },
    statusColor (status) {
      if (status === 0) {
        return '#FF3A3A'
      } else if (status === 1) {
        return '#00AB5D'
      } else {
        return '#F9CB91'
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.betting-table {
  /deep/.el-table__header-wrapper {
    margin-top: 20px;
  }
  /deep/ .has-gutter {
    background: linear-gradient(
      90deg,
      #d9b47d 0%,
      #fbe7c4 53.02%,
      #d9b47d 100%
    ) !important;
  }
  /deep/.has-gutter tr th {
    color: #666;
    font-size: 16px;
    text-align: center;
  }
  /deep/.el-table__body-wrapper tr td {
    text-align: center;
    border-bottom: 0;
  }
}
</style>