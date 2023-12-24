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

    <div>操作步骤:</div>
    <div class="setup">
      <div>1.登录您自己设备上的数字人民币APP；</div>
      <div>2.进入转账页，将该信息复制到收款方;</div>
      <div>3.入款成功联系客服查询进度；</div>
      <div>4.请严格按照页面显示的金额转账,请勿修改金额会导致慢到账。</div>
      <div class="attention">
        注：切勿保存该卡号，如发现没有提交订单直接转款的，平台有理由不给上分。
      </div>
      <div class="attention">
        付款账户姓名与注册姓名需保持一致，否则会导致无法自动到账。
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
  name: 'EcnyPaymentDialog',
  props: {
    bankDialogData: Object,
    curRmbChannel: Object
  },
  computed: {
    renderList () {
      const temp = JSON.parse(JSON.stringify(this.bankDialogData))
      const data = [
              { realName: '收款姓名：' },
              { bankAccount: '数字人民币编号：' },
              { depositAmount: '充值金额：' },
              { depositPostscript: ['附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：', '(必须正确填写)'] }
      ];
      return data.map(item => {
        console.log('Object.entries(item)[0][1]:', Object.entries(item)[0][1])
        return {
          label: Object.entries(item)[0][1],
          value: temp[Object.entries(item)[0][1]]
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
