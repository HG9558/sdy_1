<template>
  <div class="table-wrapper">
    <el-table v-show="tableData.length !== 0" class="betting-table" :data="tableData" style="width: 100%">
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

<style lang="scss">
.table-wrapper {
  background: $c-ff1;
  border-radius: 10px;
  padding: 20px;
  width: 917px;
  box-sizing: border-box;
  .has-gutter .gutter {
    background-color: $c-ff1;
  }
}
</style>