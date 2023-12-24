<template>
  <div v-show="tableData.length !== 0" class="table-wrapper">
    <el-table v-show="tableData.length !== 0" class="betting-table" :data="tableData" max-height="550" style="width: 100%">
      <el-table-column header-align="left" :label="$t('时间')" width="180">
        <template slot-scope="scope">
          <span>
            {{ formateTime(scope.row.createTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="auditAddType" :label="$t('优惠类型')" width="180">
        <template slot-scope="scope">
					{{ auditAddType(scope.row.auditAddType) }}
				</template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="actualArrival" :label="$t('优惠金额')">
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
    // 奖补状态 <!-- status :0 拒绝 1 通过 2待处理 -->
    reward (val) {
			if (val === 0) {
				return this.$t('拒绝')
			} else if (val === 1) {
				return this.$t('通过')
			} else {
				return this.$t('待处理')
			}
    },
    // 奖补类型 <!-- 类型 0 优惠添加 1 额度补回 2 入款冲销 3 其他  4代理充值 -->
    auditAddType (val) {
			if (val === 0) {
				return this.$t('优惠添加')
			} else if (val === 1) {
				return this.$t('额度补回')
			} else if (val === 2) {
				return this.$t('入款冲销')
			} else if (val === 3) {
				return this.$t('其他')
			} else {
				return this.$t('代理充值')
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
</style>
