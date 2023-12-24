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
      <el-table-column header-align="center" align="center" prop="cuidan" label="预计到帐">
        <template  v-if="time === 0"  slot-scope="scope">
          {{ addTime(scope.row.createTime,time) | formatDate('HH:mm:ss') }}
        </template>
        <template  v-if="time !== 0"   slot-scope="scope">
          <template v-if="isReminders(scope.row.createTime,time)" >
           <div class="btn" v-if="scope.row.cuiCount<1&&scope.row.status !== 0&&scope.row.status !== 1">
              <el-button class="clear-btn bog" @click.native.stop="remindersClick(scope.row)">催单</el-button>
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
          <span :style="{'color': statusColor(scope.row.status, scope.row), 'cursor': statusCoursor(scope.row), 'text-decoration': statusTextDera(scope.row)}"  @click="showPaybus(scope.row)">
            {{ reward(scope.row.status, scope.row) }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!--提款申请-->
    <global-dialog :showDialog.sync="showDialog" :step.sync="step" title="提款申请" :hasSelfFooter="true" width="700px">
      <!--<AddBankCard :tabActive="tabActive" :showDialog.sync="showDialog" />-->
      <PaybusStep :showDialog.sync="showDialog"
                  :paybusData="paybusData"
                  :step.sync="step"
                  @getDataList="getDataList"
      />
    </global-dialog>
  </div>
</template>

<script>
import PaybusStep from "../../withdrawal/component/PaybusStep"

export default {
  name: "reward",
  components: {
    PaybusStep
  },
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
    return {
      showDialog: false,
      paybusData: {
        id: "",
        dingdan: "",
        tkfs: "paybus提款",
        tkkh: "",
        tkje: "",
        tksj: "",
      },
      step: 2,
    }
  },
  methods: {
    showPaybus (row) {
      if (row.methodType === 4 && row.status !== 0 &&  row.status !== 1) {
        this.paybusData = {
          id: row.id,
          dingdan: row.orderNo,
          tkfs: "paybus提款",
          tkkh: row.cardNo,
          tkje: row.drawingAmount,
          tksj: row.createTime,
        }
        if (row.status === 2){
          this.step = 2
        }
        if (row.status === 3) {
          this.step = 3
        }
        if (row.status === 1) {
          this.step = 4
        }
        this.showDialog = true
      }
    },
    // 状态 <!-- status: 提款状态(0 拒绝 1 通过 2待处理 3 出款中 4自动出款人工审核 5自动出款中) -->
    reward (val, row) {
      if (row.methodType === 4 && (row.status === 2 ||  row.status === 3)) {
        return '确认收款'
      }
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
    statusCoursor (row) {
      if (row.methodType === 4 && (row.status === 2 ||  row.status === 3)) {
        return 'pointer'
      }
      return 'auto'
    },
    statusTextDera(row) {
      if (row.methodType === 4 && (row.status === 2 ||  row.status === 3)) {
        return 'underline'
      }
      return 'none'
    },
    statusColor (status, row) {
      if (row.methodType === 4 && (row.status === 2 ||  row.status === 3)) {
        return '#FF3D00'
      }
      if (status === 0 || status === 7) {
        return '#FF3A3A'
      } else if (status === 1) {
        return '#00AB5D'
      } else {
        return '#F9CB91'
      }
    },
    remindersClick (item) {
       this.showLoding = true;
      this.$http.cuiDanWithdraw(item.id)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
           this.$emit('getDataList')
              this.messageTip({ message: '催单成功' });
          }else{
             this.messageTip({ message: '催单失败请稍后再试！！！' });
          }
        }
        this.showLoding = false;
      })
    },
    getDataList () {
      this.$emit('getDataList')
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
    padding: 0;
    width: 89px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
    background: #A58970;
    color: #fff;
    &.grey{
     background:  rgba(188, 169, 151, 0.8);

    }
  }
}
</style>
