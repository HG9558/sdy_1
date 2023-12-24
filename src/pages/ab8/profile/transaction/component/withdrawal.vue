<template>
  <div class="table-wrapper">
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
      <el-table-column header-align="center" align="center" prop="cuidan" label="预计到帐">
        <template  v-if="time === 0"  slot-scope="scope">
          {{ addTime(scope.row.createTime,time) | formatDate('HH:mm:ss') }}
        </template>
        <template  v-if="time !== 0"   slot-scope="scope">
          <template v-if="isReminders(scope.row.createTime,time)" >
           <div class="btn" v-if="scope.row.cuiCount<1&&scope.row.status !== 0&&scope.row.status !== 1">
              <el-button class="clear-btn bog" @click="remindersClick(scope.row)">催单</el-button>
            </div>
            <div class="btn" v-else>
              <el-button class="clear-btn bog grey">催单</el-button>
            </div>
          </template>
          <template v-else-if="scope.row.status == 7" >
            <span>——</span>
          </template>
          <template v-else >
            {{ addTime(scope.row.createTime,time) | formatDate('HH:mm:ss') }}
          </template>
        </template>
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
    },
    time: {
      type: Number,
      default: 0
    },
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
        return '#61B2F9'
      } else {
        return '#3D4957'
      }
    },
    remindersClick (item) {
      this.$http.cuiDanWithdraw(item.id)
      .then((res) => {
        if (res.status === 200) {
           this.$emit('getDataList')
          if (res.data.code === 0) {
              this.messageTip({ message: '催单成功' });
          }else{
             this.messageTip({ message: '催单失败请稍后再试！！！' });
          }
        }
      })
    },
    addTime(time,minute){
      let t = new Date(time),
      t_s = t.getTime()
      t.setTime(t_s + 1000 * 60 *minute)
      return t
    },
    isReminders(time,minute) {
      let t = new Date(),
      t1 = this.addTime(time,minute)
     return t > t1
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
  .btn{
    display: flex;
    justify-content: center;
  }
  /deep/.el-button{
    width: 89px;
    font-size: 14px;
    font-weight: 600;
    &.grey{
     background: #C4CEE1;
    }
  }
}
</style>