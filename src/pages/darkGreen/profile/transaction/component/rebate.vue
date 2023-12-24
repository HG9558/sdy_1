<template>
  <div v-show="tableData.length !== 0" class="table-wrapper">
    <el-table v-show="tableData.length !== 0" class="betting-table" :data="tableData" max-height="550" style="width: 100%">
      <el-table-column header-align="left" :label="$t('时间')" width="160">
        <template slot-scope="scope">
          <span>
            {{ formateTime(scope.row.applicationTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="catName" :label="$t('游戏类型')" width="120">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="depotName" :label="$t('游戏平台')" width="180">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="validbet" :label="$t('有效投注')" width="120">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="amount" :label="$t('结算金额')" width="180">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="status" :label="$t('状态')" width="100">
        <template slot-scope="scope">
          <span :style="{'color': statusColor(scope.row.status)}">
						{{ reward(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('审核时间')" width="170">
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
    border-radius: 10px;
    margin-top: 20px;
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
