<template>
  <div class="table-wrapper">
    <el-table v-show="tableData.length !== 0" class="betting-table" :data="tableData" max-height="500" style="width: 100%">
      <el-table-column header-align="left" label="时间" width="180" class="date-label">
        <template slot-scope="scope">
          <span>
            {{ formateTime(scope.row.createTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="depositTypeName" label="充值类型" width="180">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="depositAmount" label="充值金额">
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
    // 状态 <!-- status :0 拒绝 1 通过 2待处理 -->
    reward (val) {
      if (val === 0) {
        return '失败'
      } else if (val === 1) {
        return '成功'
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
      if (status === 0) {
        return '#FF0008'
      } else if (status === 1) {
        return '#00C265'
      } else {
        return '$c-1f'
      }
    }
  }

}
</script>

<style lang="scss">
.betting-table {
  /deep/.el-table__header-wrapper {
    border-radius: 10px;
  }
  /deep/.has-gutter tr th {
    color: #3B4165;
    font-size: 16px;
    text-align: center;
    background: $c-18815;
  }
  /deep/.el-table__body-wrapper tr td {
    text-align: center;
    border-bottom: 0;
    background-color: transparent;
  }
}
.table-wrapper {
  background:  rgba(77, 97, 141, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 917px;
  box-sizing: border-box;
}
</style>