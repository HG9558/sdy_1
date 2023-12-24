<template>
  <div>
    <div class="top-div">
      <div class="head-container">
        <div class="head-left">
          <div class="head-left-top">记录查询 <span>(当前系统支持查询最近45日的投注记录)</span></div>
          <div class="head-left-bottom">
            <div class="plat-name">平台:</div>
            <el-form class="bog betting-form" ref="form" :model="form">
              <el-form-item>
                <el-select popper-class="bog" @change="getTableList" v-model="selectValue" placeholder="请选择需要查询的平台">
                  <el-option v-for="item in form.region" :key="item.id" :label="item.catName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="head-right">
          <div class="head-right-top">日期选择</div>
          <div class="head-date-div">
           <el-date-picker class="date-picker clear-icon" v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="dateChange" :clearable="false">
           </el-date-picker>
          <!-- <el-button @click="queryBtn" class="inquire bog">查询</el-button> -->
          </div>
          <div class="head-right-bottom">
            <div class="date-div">
              <div class="date-btn" v-for="(item, index) in dateButtom" :key="index" @click="chooseBtn(item.name, index)" :class="{ 'active': active === index }">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-div" style="position: relative;">
      <div class="bottom-div-inner">
        <div class="bottom-top-div">
          <div>
            <span>笔数: {{ totalData.counts }}</span>
          </div>
          <div>
            <span>总投注: {{ totalData.bet }}</span>
          </div>
          <div>
            <span>总有效投注: {{ totalData.validBet }}</span>
          </div>
          <div>
            <span>输/赢: {{ totalData.payout }}</span>
          </div>
        </div>

        <el-table v-show="tableData.length !== 0" class="betting-table" :data="tableData" style="width: 100%" max-height="500"  @row-click="rowClick" ref="multipleTable">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单号" style="width: 235px;">
                  <span class="order-number">{{ props.row.id || "请联系客服" }}</span>
                  <span style="margin-left: 10px; cursor: pointer;float: right;" v-clipboard:copy="props.row.id" v-clipboard:success="firstCopySuccess" v-clipboard:error="firstCopyError">复制</span>
                </el-form-item>

                <el-form-item style="text-align: center;" label="状态">
                  <span>{{ props.row.status }}</span>
                </el-form-item>

                <el-form-item :label="props.row.odds ? '赔率' : ''" style="">
                  <span v-if="props.row.odds">{{ props.row.odds }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.payoutTime" style="text-align: center;" label="派彩时间">
                  <span>{{ props.row.payoutTime }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.payoutTime" style="text-align: center;" label="玩法类型">
                  <span>{{ props.row.playType }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.leagueName" style="text-align: center;" label="联赛名称">
                  <span>{{ props.row.leagueName }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.betScore" style="text-align: center;" label="下注比分">
                  <span>{{ props.row.betScore }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.team" style="text-align: center;" label="比赛队伍">
                  <span>{{ props.row.team }}</span>
                </el-form-item>


                <!-- <el-form-item style="color: #f9cb91;" v-show="isShowPreSettle(props.row)">
                  <div>
                   <span @click="setOrderPreSettle(props.row)" style="cursor: pointer;border: 1px solid #7c5d3e; border-radius: 4px; padding: 2px 5px; "> 提前结算</span>
                  </div>
                </el-form-item> -->
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="betTime" header-align="left" label="投注时间" width="180">
          </el-table-column>
          <el-table-column prop="gameName" label="投注内容" width="180">
          </el-table-column>
          <el-table-column prop="bet" label="投注金额"> </el-table-column>
          <el-table-column prop="validBet" label="有效投注金额"> </el-table-column>
          <el-table-column prop="payout" label="输/赢">
            <template slot-scope="scope">
              <span v-if="scope.row.status !== '已结算'">-</span>
              <span v-else :style="{
                color: `${scope.row.payout > 0 ? '#00AB5D' : '#FF3A3A'}`,
              }">{{
                scope.row.payout > 0
                  ? `+${scope.row.payout}`
                  : `${scope.row.payout}`
              }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="no-data-div" v-show="tableData.length === 0">
          <span>投注时间</span>
          <span>投注内容</span>
          <span>投注金额</span>
          <span>输/赢</span>
        </div>
        <div class="no-data-img" v-show="shwoNodata">
          <img width="98" src="../img/no_data.png" alt="" />
          <span>暂无数据</span>
        </div>
        <div class="no-data-gif" v-show="showLoding">
          <img width="450" src="../img/load.gif" alt="" />
        </div>
      </div>
      <Pagination :pagination="paginationList" @change="paginationChange" v-show="!!tableData.length" />
    </div>
    <global-dialog :showDialog.sync="showDialog" :hasSelfFooter="true">
      <div style="text-align: center">是否确认提前付款</div>
      <el-button class="self-footer" type="primary" @click="handleSumbitOrder" :loading="dialogLoading">确定</el-button>
    </global-dialog>
  </div>
</template>

<script>

import Pagination from "commonComponent/Pagination";
import { getTime, dataTime  } from "@/plugins/auth.js";
import debounce from "lodash/debounce";
export default {
  name: "BettingRecord",
  components: {
    Pagination,
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this.init();
      }
    },
  },
  data () {
    return {
      showLoding: false,
      shwoNodata: false,
      showDialog: false,
      dialogLoading: false,
      form: {
        region: [],
      },
      selectValue: "",
      dateButtom: [
        { name: "今天" },
        { name: "昨天" },
        { name: "本周" },
        { name: "本月" },
      ],
      active: 0,
      tableData: [],
      search: {
        key: "",
        current: 1,
        limit: 10,
      },
      paginationTotal: 0,
      timeList: [getTime('今天')[0] + ' 00:00:00' ,getTime('今天')[1] + ' 23:59:59'],
      totalData: {},
      timer: [getTime('今天')[0] + ' 00:00:00' ,getTime('今天')[1] + ' 23:59:59'],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > new Date(getTime('今天')[0] + ' 23:59:59') || time.getTime() < new Date(getTime('近45天')[0] + ' 00:00:00').getTime()
        },
      },
      dateArr: [
        [getTime('今天')[0] + ' 00:00:00' ,getTime('今天')[1] + ' 23:59:59'],
        [getTime('昨天')[0] + ' 00:00:00' ,getTime('昨天')[1] + ' 23:59:59'],
        [getTime('本周')[0] + ' 00:00:00' ,getTime('今天')[1] + ' 23:59:59'],
        [getTime('本月')[0] + ' 00:00:00' ,getTime('今天')[1] + ' 23:59:59'],
      ]
    };
  },
  computed: {
    paginationList () {
      return {
        currentPage: this.search.current,
        pageSize: this.search.limit,
        total: this.paginationTotal,
      };
    },
  },
  methods: {
    init () {
      this.getTableList();
      this._getBettingRecordList()
    },
    async _getBettingRecordList () {
      this.$http.getBettingRecordList({ terminal: 0 }).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.form.region = res.data.tGmCats;
            const all = { catName: "全部", id: "" };
            this.form.region.unshift(all);
          }
        }
      });
    },
    // 分页函数
    paginationChange ({ current = 1, size = 10 }) {
      this.search.current = current;
      this.search.limit = size;
      this.getTableList();
    },
    // 获取数据
    getTableList: debounce(
      function () {
        // 列表加载图，列表为空
        this.tableData = []
        this.totalData = 0

        // 查询按钮
        const data = {
          pageSize: this.search.limit,
          pageNo: this.search.current,
          gameCatId: this.selectValue || "",
          betStrTime: this.timer[0],
          betEndTime: this.timer[1]
        };

        this.shwoNodata = false;
        this.showLoding = true;
        this.$http.getBettingRecordDataList(data)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.tableData = res.data.page.list;
                this.totalData = res.data.total;
                this.paginationTotal = res.data.page.totalCount;
              }
            }
            this.showLoding = false;
            if (this.tableData.length === 0) this.shwoNodata = true;
          })
          .catch(() => {
            this.showLoding = false;
          });
      },
      300,
      { leading: true, trailing: false }
    ),
    // 切换时间
    chooseBtn (name, index) {
      if (String(this.timer) === String(this.dateArr[index]) && (index === this.active)) {
        // 防止重复点击获取数据
        return;
      } else {
        this.search.current = 1;
        this.active = index;
        this.$set(this.timer, 0, this.dateArr[index][0])
        this.$set(this.timer, 1, this.dateArr[index][1])
        this.getTableList();
      }
    },
    firstCopySuccess () {
      this.messageTip({ message: "复制成功", type: "success" });
    },
    firstCopyError (e) {
      this.messageTip({ message: e, type: "error" });
    },
    isShowPreSettle (row) {
      const { status, platformCode, gameName, playType } = row
      return status === '未结算' && platformCode === 'SBOD' && gameName === '足球' && ['让球', '大小盘	', '上半场.独赢盘','上半场.让球', '全场.独赢盘', '上半场.大小盘'].includes(playType)
    },
    setOrderPreSettle( row ) {
      this.currentRow = row
      this.showDialog = true 
    },
   handleSumbitOrder() {
      this.dialogLoading = true
      const { platformCode } = this.currentRow
      if (platformCode === 'XM') this.setPanda()
      if (platformCode === 'SBOD') this.setShaBa()
    },
    setPanda() {
      const { id, bet, estimatedPayout } = this.currentRow
      const params = {
        siteCode: process.env.VUE_APP_APP_CODE,
        userName: this.userInfo.loginName,
        orderNo: id,
        settleAmount: bet ? Number(bet) : '',
        deviceType: 2,
        frontSettleAmount: estimatedPayout ? Number(estimatedPayout) : '',
      }
      this.$http
          .orderPreSettle(params)
          .then((res) => {
            if (res.data.code === 0) {
              this.getTableList()
            }
            this.closeDialog()
          })
          .catch(() => {
            this.closeDialog()
          });
    },
    closeDialog() {
      this.dialogLoading = false;
      this.showDialog = false;
    },
   // 沙巴提前结算
    setShaBa() {
      const { id } = this.currentRow
      this.shaBaParams = {
        siteCode: process.env.VUE_APP_APP_CODE,
        userName: this.userInfo.loginName,
      }
      this.getCashoutPrice(id)
    },
    // 获取实时兑现价格相关信息
    getCashoutPrice(id) {
      const params = {
        ...this.shaBaParams,
        transIds: id.split('_')[1] 
      }
      this.$http.getCashoutPrice(params)
        .then(res => {
          const { message, msgCode } = res.data
          if (msgCode == 200) { // 接口返回非预期错误取反
            const { cashoutStatus, cashoutPrice, transId } = message.priceInfo && message.priceInfo[0]
            switch (cashoutStatus) {
              case 1: {
                this.sellBack(cashoutPrice, transId)
                break
              }
              case 2: {
                this.$message('目前不支持兑现')
                this.closeDialog()
                break
              }
               case 3: {
                this.$message('这张注单不能兑现')
                this.closeDialog()
                break
              }
              case 4: {
                this.$message('ticketNotFound')
                this.closeDialog()
                break
              }
            }
          } else {
            this.$message.error('此注单不支持兑现,请稍后再试')
            this.closeDialog()
          }
        })
        .catch(() => {
          this.closeDialog()
        })
    },
    // 兑现注单
    sellBack(cashoutPrice, transId) {
      const params = {
        cashoutPrice,
        ...this.shaBaParams,
        transId
      }
      this.$http.sellBack(params)
        .then(res => {
          const { msgCode, message } = res.data
          if (msgCode == 200) {
            const { sellingStatus, newCashoutPriceInfo } = message
            const newCashoutPrice = newCashoutPriceInfo && newCashoutPriceInfo[0] && newCashoutPriceInfo[0].cashoutPrice
            if (sellingStatus === 5) {
              if (!newCashoutPrice && newCashoutPrice !== 0) {
                this.closeDialog()
                return
              }
              this.sellBack(newCashoutPrice, transId)
              return
            }
            if (sellingStatus === 1) this.checkSellingStatus(transId)
            else if(sellingStatus === 2) this.getTableList()
            else {
              this.$message.error('兑现注单失败,请稍后再试')
              this.closeDialog()
            }
          } else {
            this.$message.error('兑现注单失败,请稍后再试')
            this.closeDialog()
          }
        })
        .catch(() => {
          this.closeDialog()
        })
    },
    // 获取兑现票据的状态
    checkSellingStatus(transId) {
      const params = {
        ...this.shaBaParams,
        transId
      }
      this.$http.checkSellingStatus(params)
        .then(res => {
          const { msgCode, message } = res.data
          if (msgCode == 200) {
            const { sellingStatus } = message
            if (sellingStatus === 1) this.checkSellingStatus(transId)
            else if (sellingStatus === 2) this.getTableList()
            else {
              this.$message.error('获取兑现票据的状态失败,请稍后再试')
              this.closeDialog()
            }
          } else {
            this.$message.error('获取兑现票据的状态失败,请稍后再试')
            this.closeDialog()
          }
        })
        .catch(() => {
          this.closeDialog()
        })
    },
     rowClick (row) {
      this.$refs.multipleTable.toggleRowExpansion(row, row.listStatus)
      row.listStatus = !row.listStatus
    },
    dateChange () {
      this.timer = [
        dataTime(this.timer[0], "Y-m-d H:i:s"),
        dataTime(this.timer[1], "Y-m-d H:i:s")
      ]
      const index = this.dateArr.findIndex(item => item[0] === this.timer[0] && item[1] === this.timer[1])
      this.active = index >=0 ? index : null
      this.getTableList();
      this._getBettingRecordList();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>