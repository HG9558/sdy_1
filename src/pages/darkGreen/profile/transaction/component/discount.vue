<template>
  <div v-show="tableData.length !== 0" class="table-wrapper">
    <el-table class="betting-table" :data="tableData" max-height="500" style="width: 100%">
      <el-table-column header-align="left" :label="$t('时间')" width="180">
        <template slot-scope="scope">
          <span>
            {{ formateTime(scope.row.applicationTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmplName" header-align="center" align="center" :label="$t('优惠类型')" width="180">
      </el-table-column>
      <el-table-column prop="bonusAmount" header-align="center" align="center" :label="$t('彩金/奖品')">
        <template slot-scope="scope">
          <span>
            {{ scope.row.prizetype === 1 ? scope.row.prizename : scope.row.bonusAmount }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="status" header-align="center" align="center" :label="$t('状态')">
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
  name: "discount",
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
    // 状态 <!-- 优惠 status: 0 拒绝 or 未通过 1成功 or 已使用 2待处理 3 可使用 4已失效 -->
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
</style>
