<template>
  <div>
    <el-table
        v-show="tableData.length !== 0"
        :data="tableData"
        max-height="550"
        style="width: 100%">
      <el-table-column
          label="会员账号"
          prop="loginName">
      </el-table-column>
      <el-table-column
          label="下级类型">
        <template slot-scope="scope">
          <span>
            {{ scope.row.agyflag | agentType }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
          prop="childNum"
          label="下级人数">
      </el-table-column>
      <el-table-column
          prop="validPayoutFromChild"
          label="下级累计有效输赢">
      </el-table-column>
      <el-table-column
          prop="validPayoutForSelf"
          label="下级自身累计有效输赢">
      </el-table-column>
      <el-table-column
          prop="rebateTotal"
          label="代理所得佣金">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "agemtList",
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  filters: {
    agentType(val) {
      return val === 1 ? '代理会员' : '直属会员'
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-table {
  // color: #AF8C70;
  background:  $c-fc;
  &::before {
    display: none;
  }
  tr {
    background:  $c-fc;
  }
}
/deep/ .el-table th.is-leaf {
  border: 0;
  background:  $c-fc;
  text-align: center;
}
/deep/.el-table__header-wrapper {
  border-radius: 10px;
  margin-top: 20px;
}
/deep/.has-gutter tr th {
  color: #666;
   background: linear-gradient(90deg, #D9B47D 0%, #FBE7C4 53.02%, #D9B47D 100%) !important;
  font-size: 16px;
  text-align: center;
}
/deep/.el-table__body-wrapper tr td {
  text-align: center;
  border-bottom: 0;
}
</style>