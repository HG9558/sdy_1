<template>
  <div class="national-agent">
    <div class="national-agent-top">
      <div class="agent-top">
        <div class="agent-line">
          <div class="top-title">{{$t('推广链接')}}</div>
          <div class="top-text">{{copyUrl}}</div>
          <div class="btn-box">
            <el-button class="yszjl" v-clipboard:copy="copyUrl" v-clipboard:success="handleCopy" v-clipboard:error="handleCopyErr" type="primary" size="small" style="margin-top: 50px">复制链接</el-button>
          </div>
        </div>
        <div class="line"></div>
        <div class="agent-qr">
          <div class="top-title">{{$t('推广二维码')}}</div>
          <div v-if="!agentInfo.codeId" class="no-qr-code">{{$t('加载中...')}}</div>
          <qr-Code v-else :class="{'qrcode': agentInfo.codeId}" :codeUrl="copyUrl"></qr-Code>
        </div>
      </div>
    </div>

    <div class="agent-box">
      <template v-if="agentInfo.agyflag === 1">
        <div class="date-btns">
          <el-button v-for="(item, i) in btnList" :key="i" :type="item.val === activeVal ? 'primary' : ''" :class="{onBtn: item.val === activeVal,yszjl:true,defBtn:true}" size="small" style="padding: 4px 8px" @click="handleDateChange(item.val)">
            {{item.text}}
          </el-button>
        </div>
        <div class="agent-text">
          <span>{{$t('本月下级总有效输赢：')}}{{agentData.validPayoutFromChild | Fval}}</span>
          <span>{{$t('佣金比例：')}}{{agentData.commissionRatioSub ? `${agentData.commissionRatioSub}%` : 0}}</span>
          <span>{{$t('本月自身有效输赢：')}}{{agentData.validPayoutForSelf | Fval}}</span>
          <span>{{$t('佣金比例：')}}{{agentData.commissionRatio ? `${agentData.commissionRatio}%` : 0}}</span>
          <span class="agent-rule" @click="isShowRule = true">{{$t('返利规则')}}</span>
        </div>
        <div class="agent-data">
          <div class="data-item" v-for="(item, i) in agentList" :key="i">
            <p class="item-text">{{item.text}}</p>
            <p class="item-val">{{item.val || 0}}</p>
          </div>
        </div>
        <div class="agent-list">
          <div class="agent-seach">
            <el-input class="yszjl agent-input" v-model="params.loginName" size="small" style="width: 190px" :placeholder="$t('下级账号')"></el-input>
            <el-button class="yszjl" size="small" type="primary" style="margin-left: 20px;" @click="handleSearch">{{$t('查询')}}</el-button>
          </div>
          <div class="agent-seach-data">
            <agentList v-if="tableData.length > 0" :tableData="tableData" />
            <div class="no-data-img" v-else>
              <img src="../../discount/img/no_data.png" alt="" />
              <span>{{$t('暂无数据')}}</span>
            </div>
            <Pagination :pagination="paginationList" @change="paginationChange" />
          </div>
        </div>
      </template>
      <template v-else>
        <div>{{$t('您还不是代理会员')}}</div>
        <div class="tips-box">
          <p>{{$t('成为代理会员，可以享受自身返利以及自己下级的返佣，快快加入吧！')}}</p>
          <p>{{$t('成为代理会员需自身满足1000存款，并且下级会员存款累计满1000您才能晋升为代理会员')}}</p>
        </div>
        <el-button type="primary" :class="{grey: !agentInfo.isApply,yszjl:true,'agent-btn':true}" :disabled="!agentInfo.isApply" @click="_handleAgent">
          {{$t('申请成为代理会员')}}
        </el-button>
      </template>
      <div class="agent-bg"></div>
    </div>

    <global-dialog class="agent-dialog" :showDialog.sync="isShowRule" :title="$t('返利规则')" :hasSelfFooter="true" width="550px">
      <div class="agent-dialog-content">
        <h1>{{$t('代理有效输赢计算')}}</h1>
        <p>{{$t('1.直属会员有效输赢')}}</p>
        <p>{{$t('直属会员的正负盈利总数，计入上级代理的有效输赢值')}}</p>
        <p>{{$t('2.次级代理有效输赢')}}</p>
        <p>{{$t('次级代理总有效输赢值为负，计入上级的有效输赢值')}}</p>
        <p>{{$t('次级代理总有效输赢值为正，不计入上级的有效输赢值')}}</p>
        <p>{{$t('3.代理自身输赢值（分开计算，有不同比例）')}}</p>
        <p>{{$t('代理有效输赢值=直属会员有效输赢值+次级代理有效输赢值')}}</p>
        <p>{{$t('代理自身输赢值')}}</p>
        <h1>{{$t('代理拥挤计算')}}</h1>
        <p>{{$t('1.自身输赢佣金比例')</p>
      </div>
    </global-dialog>
  </div>
</template>

<script>
import agentList from './agentList.vue'
import Pagination from "commonComponent/Pagination";
import QrCode from 'commonComponent/QrCode'
export default {
  name: 'NationalAgent',
  data () {
    return {
      agentData: {},
      btnList: [
        { text: this.$t('本月'), val: 1 },
        { text: this.$t('上月'), val: 2 },
        { text: this.$t('上上月'), val: 3 }
      ],
      activeVal: 1,
      agentList: [
        { text: this.$t('本月代理佣金'), key: 'rebateFromChildActual' },
        { text: this.$t('本月自身佣金'), key: 'rebate' },
        { text: this.$t('本月奖金'), key: 'bonusAmountExfromChildTotal' },
        { text: this.$t('本月可获得佣金'), key: 'rebateTotal' },
      ],
      params: {
        pageNo: 1,
        pageSize: 10,
        loginName: ''
      },
      paginationTotal: 0,
      tableData: [],
      isShowRule: false,
    }
  },
  components: {
    agentList,
    Pagination,
    QrCode
  },
  watch: {
    agentInfo (val) {
      const { agyflag } = this.agentInfo
      if (agyflag === 1) {
        this._getRebateInfo()
      }
    }
  },
  computed: {
    agentInfo () {
      return this.$store.state.normal.agentInfoData
    },
    copyUrl () {
      const { origin } = location
      const { codeId } = this.agentInfo
      return !codeId ? this.$t('加载中...') : `${origin}#/login/register?codeId=${codeId}`
    },
    paginationList () {
      return {
        currentPage: this.params.pageNo,
        pageSize: this.params.pageSize,
        total: this.paginationTotal
      }
    }
  },
  filters: {
    Fval (val) {
      return val || 0
    }
  },
  methods: {
    handleSearch () {
      this.params.pageNo = 1
      this._getRebateInfo()
    },
    paginationChange ({ current = 1, size = 10 }) {
      this.tableData = []
      this.params.pageNo = current
      this.params.pageSize = size
      this._getRebateInfo()
    },
    handleDateChange (val) {
      this.activeVal = val
      this.params.pageNo = 1
      this._getRebateInfo()
    },
    setTime () {
      const dd = new Date()
      const zeroFn = val => val > 9 ? val : `0${val}`
      const year = dd.getFullYear()
      let month = dd.getMonth() + 1
      switch (this.activeVal) {
        case 2:
          month = month - 1
          break
        case 3:
          month = month - 2
          break
      }
      const lastDate = new Date(year, month, 0)
      const createTime = `${year}-${zeroFn(month)}`
      return {
        createTime,
        createTimeStart: `${createTime}-01`,
        createTimeEnd: `${createTime}-${zeroFn(lastDate.getDate())}`
      }
    },
    async _getRebateInfo () {
      const params = {
        ...this.params,
        ...this.setTime()
      }
      const res = await this.$http.qryRebateInfo(params);

      const { code, data } = res.data
      if (!code) {
        const { childList } = data
        const agentList = []
        this.agentData = data

        for (let i of this.agentList) {
          agentList.push({ ...i, val: data[i.key] })
        }
        this.agentList = agentList
        if (childList) {
          const { totalCount, list } = childList
          this.paginationTotal = totalCount
          this.tableData = list
        }
      }
    },
    async _getAgentInfo () {
      const res = await this.$http.getAgentInfo()
      if (!res.data.code) return;
      const { data } = res.data
      this.agentInfo = data
    },
    async _handleAgent () {
      const { isApply } = this.agentInfo
      if (isApply) {
        const res = await this.$http.applyMbrAgent();
        if (res.data.code) {
          return this.messageTip({ message: res.data.msg })
        }
        this._getAgentInfo()
      }
    },
    handleCopy () {
      this.messageTip({
        message: this.$t('复制成功！'),
        type: "success",
        duration: 2000
      })
    },
    handleCopyErr () {
      this.messageTip({
        message: this.$t('复制失败！'),
        duration: 2000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
