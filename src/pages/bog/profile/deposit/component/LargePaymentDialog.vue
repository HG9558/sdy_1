<template>
  <div class="dialog-wrapper">
    <div class="dialog-content" v-for="(item,index) in renderList" :key="index">
      <div>
        <span class="title" v-html="Array.isArray(item.label)?item.label[0] : item.label "></span>
        <span class="text"> {{ item.value }}</span>
        <span v-if="Array.isArray(item.label)" class="required-text">{{ item.label[1] }}</span>
      </div>
      <div class="copy" v-clipboard:copy="item.value" v-clipboard:error="onCopyError" v-clipboard:success="onCopySuccess">
        <img class="copy-img" src="../../img/deposit/copy.png" alt="">
        <span class="copy-text"> 点击复制 </span>
      </div>
    </div>

    <div v-if="curRmbChannel && curRmbChannel.label === '支付宝'">
      <div>操作步骤:</div>
      <div class="setup">
        <div>1.登录您自己设备上的支付宝账号;</div>
        <div>2.在支付宝首页点击【转账】按钮，然后选择【转到银行卡】;</div>
        <div>
          3.复制下方姓名、卡号、金额，到支付宝对应填写，并点击【下一步】
        </div>
        <div>
          4.复制下方附言，填写至支付宝“备注”一栏，并确认转账完成付款；
        </div>
        <div>
          5.入款成功后，联系客服查询进度。
        </div>
        <div>
          6.请严格按照页面显示的金额转账,请勿修改金额会导致慢到账
        </div>
        <div class="attention">
          注：切勿保存该卡号，如发现没有提交订单直接转款的，平台有理由不给上分。
        </div>
      </div>
    </div>
    <div v-else>
      <div>操作步骤:</div>
      <div class="setup">
        <div>1.登录您自己设备上的银行APP或银行官网;</div>
        <div>2.进入转账页，将该信息复制到收款方;</div>
        <div>3.入款成功<span class="service">联系客服</span>查询进度。</div>
        <div>4.请严格按照页面显示的金额转账,请勿修改金额会导致慢到账</div>
        <div class="attention">
          注：切勿保存该卡号，如发现没有提交订单直接转款的，平台有理由不给上分。
        </div>
        <div class="attention"> 付款账户姓名与注册姓名需保持一致，否则会导致无法自动到账。</div>
      </div>

    </div>
    <!-- <div class="btns">
      <el-button class="bog deposit-btn self-left-btn" type="success" @click="">已完成充值</el-button>
      <el-button class="bog deposit-btn self-right-btn" @click="gotoUrl" type="danger">充值问题需要协助</el-button>
    </div> -->

  </div>
</template>

<script>
export default {
  name: 'LargePaymentDialog',
  props: {
    bankDialogData: Object,
    curRmbChannel: Object
  },
  computed: {
    renderList () {
      const temp = JSON.parse(JSON.stringify(this.bankDialogData))
      const data = [{ realName: '收款姓名：' }, { bankAccount: '银行卡号：' }, { bankBranch: '开户网点：' }, { depositAmount: '充值金额：' }, { depositPostscript: ['附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：', '(必须正确填写)'] }];
      return data.map(item => {
        return {
          label: Object.entries(item)[0][1],
          value: temp[Object.entries(item)[0][0]]
        }
      })
    }
  },
  methods: {
    gotoUrl () {
    },
    onCopySuccess () {
      this.messageTip({ message: "复制成功！", type: "success" });
    },
    onCopyError () {
      this.messageTip({ message: "复制失败！" });
    }
  }
}
</script>

<style lang="scss">
@import "../css/dialog.scss";
</style>