<template>
  <div>
    <el-table v-show="tableData.length !== 0" class="betting-table" :data="tableData" max-height="550" style="width: 100%">
      <el-table-column header-align="left" label="时间" width="180">
        <template slot-scope="scope">
          <span>
            {{ formateTime(scope.row.createTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="drawingAmount" label="申请额度" width="180">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="actualArrival" label="实际提现">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="handlingCharge" label="转账手续费">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="status" label="状态">
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
    // 状态 <!-- status: 提款状态(0 拒绝 1 通过 2待处理 3 出款中 4自动出款人工审核 5自动出款中) -->
    reward (val) {
      if (val === 0) {
        return '拒绝'
      } else if (val === 1) {
        return '成功'
      } else if (val === 2) {
        return '待处理'
      } else if (val === 3) {
        return '出款中'
      } else if (val === 4) {
        return '人工审核中'
      } else if (val === 5) {
        return '自动出款中'
      } else if (val === 6) {
        return '审核中'
      }else if(val === 7) {
        return '失败'
      } else {
        return '待处理'
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
      if (status === 0 || status === 7) {
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
  /deep/.has-gutter tr th {
    color: $c-4d;
    font-size: 16px;
    text-align: center;
  }
  /deep/.el-table__body-wrapper tr td {
    text-align: center;
    border-bottom: 0;
  }
}
</style>