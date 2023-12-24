<template>
  <div>
    <el-table v-show="tableData.length !== 0" class="betting-table" :data="tableData" max-height="550" style="width: 100%">
      <el-table-column header-align="left" :label="$t('时间')" width="180">
        <template slot-scope="scope">
          <span>
            {{ formateTime(scope.row.createTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="drawingAmount" :label="$t('申请额度')" width="180">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="actualArrival" :label="$t('实际提现')" width="180">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="handlingCharge" :label="$t('转账手续费')" width="160">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="cuidan" :label="$t('预计到帐')" width="180">
        <template  v-if="time === 0"  slot-scope="scope">
          {{ addTime(scope.row.createTime,time) | formatDate('HH:mm:ss') }}
        </template>
        <template  v-if="time !== 0"   slot-scope="scope">
          <template v-if="isReminders(scope.row.createTime,time)" >
           <div class="btn" v-if="scope.row.cuiCount<1&&scope.row.status !== 0&&scope.row.status !== 1&&scope.row.status !== 9">
              <el-button class="clear-btn yszjl" @click="remindersClick(scope.row)">{{$t('催单')}}</el-button>
            </div>
            <div class="btn" v-else>
              <el-button class="clear-btn yszjl grey">{{$t('催单')}}</el-button>
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
			<el-table-column header-align="center" align="center" prop="status" :label="$t('状态')" width="120px">
				<template slot-scope="scope">
					<template v-if="scope.row.status === 8">
						<span :style="{'color': statusColor(scope.row.status)}">
							{{ reward(scope.row.status) }}
						</span>
						<el-button class="withdrawalCancel bog" @click="withdrawalCancelClick(scope.row)">{{$t('申请取消')}}</el-button>
					</template>
					<span v-else :style="{'color': statusColor(scope.row.status)}">
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
        return this.$t('拒绝')
      } else if (val === 1) {
        return this.$t('成功')
      } else if (val === 2) {
        return this.$t('待处理')
      } else if (val === 3) {
        return this.$t('出款中')
      } else if (val === 4) {
        return this.$t('人工审核中')
      } else if (val === 5) {
        return this.$t('自动出款中')
      } else if (val === 6) {
        return this.$t('审核中')
      }else if(val === 7) {
        return this.$t('失败')
			} else if (val === 8) {
				return this.$t('处理中')
			} else if (val === 9) {
				return this.$t('取消提款')
			} else {
				return this.$t('待处理')
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
			if (status === 0 || status === 7 || status === 9) {
        return '#FF0008'
      } else if (status === 1) {
        return '#00C265'
      } else {
        return '$c-1f'
      }
    },
    remindersClick (item) {
       this.showLoding = true;
      this.$http.cuiDanWithdraw(item.id)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
           this.$emit('getDataList')
              this.messageTip({ message: this.$t('催单成功') });
          }else{
             this.messageTip({ message: this.$t('催单失败请稍后再试！！！') });
          }
        }
        this.showLoding = false;
      })
    },
		withdrawalCancelClick(item) {
			this.$http.withdrawalCancel({ id: item.id, status: 9 }).then(res => {
				if (res.status === 200) {
					if (res.data.code === 0) {
						item.status = 9
						this.messageTip({ message: this.$t('操作成功') })
					}else{
						this.messageTip({ message: res.data.msg })
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
    color: #3B4165;
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
    background: #6470A4;
    color: #E8EDF9;
    &.grey{
     background:  rgba(100,112,164, 0.8);

    }
		&.withdrawalCancel {
      width: auto;
      padding: 0 6px;
			margin: 5px auto 0 auto;
			background: linear-gradient(180deg, #26C97F 0%, #31AA74 100%);
			color: #ffffff;
		}
  }
}
</style>
