<template>
  <div class="betting-record-wrapper">
    <div class="top-div">
      <div class="head-container">
        <div class="head-left">
          <div class="head-left-top">
            <span>记录查询</span> (当前系统支持查询最近30日的投注记录)
          </div>
          <div class="head-left-bottom">
            <div class="date-div">
              <div class="date-btn left" :class="{ active: isShareRecode }" @click="isShareRecode = true">晒单</div>
              <div class="date-btn" :class="{ active: !isShareRecode }"  @click="isShareRecode = false">跟单</div>
            </div>
          </div>
        </div>
        <div class="head-right">
          <div class="head-right-top">日期选择</div>
          <div class="head-right-bottom">
            <div class="date-div">
              <div class="date-btn" v-for="(item, index) in dateButtom" :key="index" @click="chooseBtn(item.name, index)" :class="{ active: active === index }">
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
            <span>笔数: {{ totalData.totalCount }}</span>
          </div>
          <div>
            <span>流水: {{ totalData.betTotal }}</span>
          </div>
          <div>
            <span>总有效投注: {{ totalData.validBetTotal }}</span>
          </div>
          <div>
            <span>输/赢: {{ totalData.payOutTotal }}</span>
          </div>
        </div>

        <el-table class="betting-table" :data="tableData" style="width: 100%" max-height="500"  @row-click="rowClick" ref="multipleTable">
          <span slot="empty"></span>
          <el-table-column prop="betTime" label="下注时间" width="200">
            <template slot-scope="scope">
              <img src="../img/bao.png" alt="" class="bao" v-show="scope.row.type == 8" />
              <span> {{scope.row.betTime}} </span>
            </template>
          </el-table-column>
          <el-table-column prop="gameName" label="下注内容" width="180">
          </el-table-column>
          <el-table-column prop="bet" label="下注金额"> </el-table-column>
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
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单号" style="width: 235px;">
                  <span class="order-number">{{
                    props.row.id || "请联系客服"
                  }}</span>
                  <span style="margin-left: 10px; color: #f9cb91; cursor: pointer;float: right;" v-clipboard:copy="props.row.id" v-clipboard:success="firstCopySuccess" v-clipboard:error="firstCopyError">复制</span>
                </el-form-item>

                <el-form-item style="text-align: center;" label="状态">
                  <span style="color: #f9cb91;">{{ props.row.status }}</span>
                </el-form-item>

                <el-form-item :label="props.row.odds ? '赔率' : ''">
                  <span v-if="props.row.odds" style="color: #f9cb91;">{{ props.row.odds }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.payoutTime" style="text-align: center;" label="派彩时间">
                  <span style="color: #f3cc9a;">{{ props.row.payoutTime }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.payoutTime" style="text-align: center;" label="玩法类型">
                  <span style="color: #f3cc9a;">{{ props.row.playType }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.leagueName" style="text-align: center;" label="联赛名称">
                  <span style="color: #f3cc9a;">{{ props.row.leagueName }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.betScore" style="text-align: center;" label="下注比分">
                  <span style="color: #f3cc9a;">{{ props.row.betScore }}</span>
                </el-form-item>

                <el-form-item v-if="props.row.team" style="text-align: center;" label="比赛队伍">
                  <span style="color: #f3cc9a;">{{ props.row.team }}</span>
                </el-form-item>

                <!-- <el-form-item style="color: #f9cb91;" v-show="props.row.isShowPreSettle">
                  <div>
                   <span @click="setOrderPreSettle(props.row)" style="cursor: pointer;border: 1px solid #ecc18b; border-radius: 4px; padding: 2px 5px; "> 提前结算</span>
                  </div>
                </el-form-item> -->
              </el-form>
            </template>
          </el-table-column>

        </el-table>

        <!-- <div class="data-type" v-show="tableData.length === 0">
          <span>下注时间</span>
          <span>下注内容</span>
          <span>下注金额</span>
          <span>输/赢</span>
        </div> -->

        <div class="no-data-img" v-show="shwoNodata">
          <img src="../img/no_data.png" alt="" style="width: 98px" />
          <span class="no-data-text">还没有任何投注记录</span>
        </div>
        <div class="no-data-gif" v-show="showLoding">
          <img style="width: 150px;" src="../img/load.gif" alt="" />
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
import { getTime } from "@/plugins/auth.js";
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
      },
    },
    isShareRecode () {
      this.init()
    }
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
        { name: "近30天" },
      ],
      active: 0,
      tableData: [],
      search: {
        key: "",
        current: 1,
        limit: 10,
      },
      paginationTotal: 0,
      timeList: getTime("今天"),
      totalData: {},
      currentRow: {},
      shaBaParams: {},
      isShareRecode: true,
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
      this._getBettingRecordList();
      // this.shaBaParams = {
      //   siteCode: process.env.VUE_APP_APP_CODE,
      //   userName: this.userInfo.loginName,
      // }
    },
    async _getBettingRecordList () {
      this.$http.getBettingRecordList({ terminal: 0 }).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.form.region = res.data.tGmCats;
            const all = {
              catName: "全部",
              id: "",
            };
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
        this.tableData = [];
        this.totalData = 0;

        // 查询按钮
        let params = {}
        if (this.isShareRecode) { // 晒单
          params = {
            pageSize: this.search.limit,
            pageNo: this.search.current,
            betStartTime: this.timeList[0] + " 00:00:00",
            betEndTime: this.timeList[1] + " 23:59:59",
          }
        } else { // 跟单
          params = {
            pageSize: this.search.limit,
            pageNo: this.search.current,
            startTime: this.timeList[0] + " 00:00:00",
            endTime: this.timeList[1] + " 23:59:59",
          }
        }
        this.shwoNodata = false;
        this.showLoding = true;

        this.$http[this.isShareRecode ? 'getListShownBetLogsForUser' : 'getListFollowBetLogsForUser'](params)
          .then((res) => {
            const { code, data } = res.data
            if (!code) {
                const { count, totalCount, list } = data
                this.tableData = list;
                this.totalData = {...count, totalCount,};
                this.paginationTotal = totalCount;
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
      if (String(this.timeList) === String(getTime(name)) && (index === this.active)) {
        // 防止重复点击获取数据
        return;
      } else {
        this.search.current = 1;
        this.active = index;
        this.timeList = getTime(name);
        this.getTableList();
      }
    },
    firstCopySuccess () {
      this.messageTip({ message: "复制成功", type: "success" });
    },
    firstCopyError (e) {
      this.messageTip({ message: e, type: "error" });
    },
    // isShowPreSettle (row) {
    //   const { status, platformCode, gameName, playType } = row
    //   const arr = ['让球', '大小盘	', '上半场.独赢盘','上半场.让球', '全场.独赢盘', '上半场.大小盘']
    //   return status === '未结算' && platformCode === 'SBOD' && gameName === '足球' && arr.includes(playType)
    // },
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
    judgeShowCashOut(list) {
      let ids = '', isIds = true, sbodIndexList = []
      list.map((item, index) => {
        const arr = item.id.split('_')
        if (arr[0] === 'sbod') {
          ids += (arr[1] + ',')
          sbodIndexList.push(index)
        }
      })
      ids = ids.slice(0, ids.length - 1)
      this.getCashoutPrice(ids, isIds, sbodIndexList)
    },
    // 沙巴提前结算
    setShaBa() {
      const { id } = this.currentRow
      this.getCashoutPrice(id)
    },
    // 获取实时兑现价格相关信息
    getCashoutPrice(id, bool = false, sbodIndexList = []) {
      const params = {
        ...this.shaBaParams,
        transIds: bool ? id : id.split('_')[1]
      }
      this.$http.getCashoutPrice(params)
        .then(res => {
          const { message, msgCode } = res.data
          if (msgCode == 200) {
            if (bool) {
              const priceInfoList = message.priceInfo
              sbodIndexList.map((val, index) => {
                this.$set(this.tableData, val, {...this.tableData[index], isShowPreSettle: priceInfoList[index].cashoutStatus === 1})
              })
              return
            }
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
            return
          } 
          if (!bool) {
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
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
