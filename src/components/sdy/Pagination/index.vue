<template>
  <el-pagination :current-page="pagination.currentPage" :page-size="pagination.pageSize" :total="pagination.total" :page-sizes="sizeOptions" layout="total, prev, pager, next, jumper" style="margin-top: 20px; text-align: right" @size-change="handleSizeChange" :page-count="pagination.total" @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    pagination: {
      type: Object,
      default () {
        return {
          currentPage: 1,
          pageSize: this.sizeOptions[0],
          total: 0
        }
      }
    }
  },
  data () {
    return {
      sizeOptions: [10]
    }
  },
  methods: {
    // pageSize 改变时会触发
    handleSizeChange (val) {
      this.$emit('change', {
        current: this.pagination.currentPage,
        size: val
      })
    },
    // currentPage 改变时会触发
    handleCurrentChange (val) {
      this.$emit('change', {
        current: val,
        size: this.pagination.pageSize
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./index.scss"
</style>
