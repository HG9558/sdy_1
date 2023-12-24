<template>
  <div>
    <el-table v-show="tableData.length !== 0" class="betting-table" :data="tableData" max-height="550" style="width: 100%">
      <el-table-column header-align="center" :label="$t('时间')" width="160">
        <template slot-scope="scope">
          <span>
            {{ scope.row.time | formatDate('YY-MM-DD') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="type" :label="$t('返利类型')">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="reward" :label="$t('返利金额')">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="status" :label="$t('状态')">
        <template slot-scope="scope">
          <span :style="{'color': statusColor(scope.row.status)}">
            {{ reward(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "LastRebate",
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
        return this.$t('拒绝')
      } else if (val === 1) {
        return this.$t('已发放')
      } else if (val === 3) {
        return this.$t('可使用')
      } else if (val === 4) {
        return this.$t('已失效')
      } else {
        return this.$t('申请中')
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
    border-radius: 10px;
    margin-top: 20px;
  }
   /deep/ .has-gutter {
     background: linear-gradient(90deg, #D9B47D 0%, #FBE7C4 53.02%, #D9B47D 100%) !important;
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
